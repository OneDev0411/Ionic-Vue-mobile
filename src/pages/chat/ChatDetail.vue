<template>
  <base-layout :page-title="'Chat with'">
    <template v-slot:header>
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-back-button></ion-back-button>
          </ion-buttons>

          <ion-title> Chat with {{ otherUser.displayName }}</ion-title>
          <ion-buttons slot="end">
            <ion-button @click="startCall">Call</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
    </template>
    <template v-slot:default>
      <call-overlay
        :isOpened="callStatus"
        :recievedMessage="rtcMessage"
        :sendMessage="sendRTCMessage"
        @close="endCall"
      ></call-overlay>
      <ion-grid id="chatwindow" ref="chatwindow">
        <ion-row v-for="message in messages" :key="message">
          <ion-col
            :offset="getOffset(message.sender_id)"
            size="9"
            class="message"
            :class="getClassName(message.sender_id)"
          >
            <span class="user_name">{{ message.sender }}:</span>
            <br />
            <span>{{ message.message }}</span>
            <div class="time">{{ getRelativePast(message.created) }}</div>
          </ion-col>
        </ion-row>
      </ion-grid>
    </template>
    <template v-slot:footer>
      <div class="message-input-box">
        <ion-item class="ion-float-left full-width-box">
          <ion-label position="stacked" color="secondary"
            >Send something to:</ion-label
          >
          <ion-textarea
            rows="3"
            cols="50"
            color="tertiary"
            placeholder="Type message here"
            v-model="message"
          ></ion-textarea>
        </ion-item>
        <ion-button
          class="ion-float-right fill-container"
          expand="block"
          color="success"
          @click="sendMessage"
        >
          <ion-icon slot="icon-only" :icon="send"></ion-icon>
        </ion-button>
      </div>

      <footer-component></footer-component>
    </template>
  </base-layout>
</template>

<script>
import {
  IonHeader,
  IonTitle,
  // IonBackButton,
  IonButtons,
  IonToolbar,
  IonBackButton,
  IonLabel,
  IonTextarea,
  alertController,
  // IonText,
  // IonThumbnail,
} from "@ionic/vue";
import FooterComponent from "../../components/layout/FooterComponent.vue";
import { send } from "ionicons/icons";
import endpoints from "../../helpers/endpoints";
import { getRelativePast } from "../../helpers/time";
import { useUser } from "../../stores/user";
import { useUsers } from "../../stores/users";
import { useChat } from "../../stores/chat";
import CallOverlay from "../../components/chat/CallOverlay.vue";
export default {
  components: {
    IonTitle,
    IonHeader,
    IonToolbar,
    IonButtons,

    IonBackButton,

    IonLabel,
    IonTextarea,
    FooterComponent,

    CallOverlay,
  },
  setup() {
    const userStore = useUser();
    const usersStore = useUsers();
    const chatStore = useChat();
    return {
      send,
      endpoints,
      getRelativePast,
      userStore,
      chatStore,
      usersStore,
    };
  },
  data() {
    return {
      message: "",
      messages: [],
      roomUrl: "",
      chatSocket: null,
      currentUser: this.userStore.id,
      connection: null,
      rtcMessage: {},
      callStatus: false,
    };
  },
  computed: {
    otherUser() {
      return this.usersStore.getUserById(this.$route.params.id);
    },
  },
  methods: {
    async getChatRoom() {
      const room = await this.chatStore.getChatRoom(this.$route.params.id);
      this.roomUrl = `wss://${this.endpoints.host}/ws/chat/room/${room.name}/`;
      console.log(this.roomUrl);
    },
    async sendMessage() {
      await this.chatSocket.send(
        JSON.stringify({
          message: this.message,
          sender: this.userStore.displayName,
          type: "chat_message",
          sender_id: this.userStore.id,
        })
      );
      this.message = "";
      this.rtcMessage = {};
      console.log("message sent");
    },
    async sendRTCMessage(data) {
      data.sender = this.userStore.displayName;
      data.sender_id = this.userStore.id;
      await this.chatSocket.send(JSON.stringify(data));
      console.log(" rtc message sent");
    },
    onMessage(event) {
      var message = JSON.parse(event.data);

      if (message.type === "chat_message") {
        this.messages.push(message);
      } else if (message.type === "start_call") {
        if (message.sender_id != this.currentUser) {
          this.presentCallAlert();
        }
      } else if (message.type === "call_accepted") {
        this.callStatus = true;
      } else if (message.type === "call_rejected") {
        this.callStatus = false;
      } else if (message.type === "call_end") {
        this.callStatus = false;
      }

      this.rtcMessage = message;
      // if (message.type == "candidate") {
      //   this.onCandidate(message.candidate);
      // } else if (message.type == "answer") {
      //   this.onAnswer(message.answer, message.sender);
      // } else if (message.type == "offer") {
      //   this.onOffer(message.offer, message.sender);
      // }
    },
    startCall() {
      this.callStatus = true;
      this.sendRTCMessage({
        message: "start_call",
        sender: this.userStore.displayName,
        type: "start_call",
      });
    },
    acceptCall() {
      this.callStatus = true;
      this.sendRTCMessage({
        message: "call_accepted",
        sender: this.userStore.displayName,
        type: "call_accepted",
      });
    },
    rejectCall() {
      this.callStatus = false;
      this.sendRTCMessage({
        message: "call_rejected",
        sender: this.userStore.displayName,
        type: "call_rejected",
      });
      this.message = "rejected call";
      this.sendMessage();
      this.message = "";
    },
    endCall() {
      this.callStatus = false;
      this.sendRTCMessage({
        message: "call_end",
        sender: this.userStore.displayName,
        type: "call_end",
      });
    },
    onClose() {
      console.error("Chat socket closed unexpectedly");
    },
    fromSelf(id) {
      return id == this.currentUser;
    },
    getClassName(id) {
      if (this.fromSelf(id)) {
        return "mymessage";
      } else {
        return "othermessage";
      }
    },
    getOffset(id) {
      if (this.fromSelf(id)) {
        return "3";
      } else {
        return "0";
      }
    },

    async presentCallAlert() {
      const rejectCallHandler = this.rejectCall;
      const acceptCallHandler = this.acceptCall;
      const alert = await alertController.create({
        cssClass: "my-custom-class",
        header: "Incoming call!",
        message: "Message <strong>text</strong>!!!",
        buttons: [
          {
            text: "Decline",
            role: "cancel",
            cssClass: "secondary",
            id: "cancel-button",
            handler: rejectCallHandler,
          },
          {
            text: "Answer",
            id: "confirm-button",
            handler: acceptCallHandler,
          },
        ],
      });
      return alert.present();
    },

    //////////////////
    // hasUserMedia() {
    //   navigator.getUserMedia =
    //     navigator.getUserMedia ||
    //     navigator.webkitGetUserMedia ||
    //     navigator.mozGetUserMedia ||
    //     navigator.msGetUserMedia;
    //   return !!navigator.getUserMedia;
    // },
    // onOffer(offer, name) {
    //   //when somebody wants to call us
    //   const connectedUser = name;
    //   console.log("connectedUser", connectedUser, this.userStore.id);
    //   console.log("offer", offer);
    //   if (connectedUser == this.userStore.id) {
    //     return;
    //   } else {
    //     this.connection.setRemoteDescription(new RTCSessionDescription(offer));
    //     var localthis = this;
    //     this.connection.createAnswer(
    //       function (answer) {
    //         //make an offer to the other person
    //         localthis.connection.setLocalDescription(answer);

    //         localthis.chatSocket.send(
    //           JSON.stringify({
    //             type: "answer",
    //             answer: answer,
    //             sender: localthis.userStore.id,
    //           })
    //         );
    //       },
    //       function (error) {
    //         alert("oops...error", error);
    //       }
    //     );
    //   }
    // },
    // onAnswer(answer, connectedUser) {
    //   //when another user answers to our offer
    //   if (connectedUser == this.userStore.id) {
    //     return;
    //   }
    //   this.connection.setRemoteDescription(new RTCSessionDescription(answer));
    // },
    // onCandidate(candidate) {
    //   //when we got ice candidate from another user
    //   console.log("canditate", candidate);
    //   this.connection.addIceCandidate(new RTCIceCandidate(candidate));
    // },
    // makeOffer() {
    //   //make an offer
    //   var localthis = this;
    //   this.connection.createOffer(
    //     function (offer) {
    //       console.log(offer);
    //       localthis.chatSocket.send(
    //         JSON.stringify({
    //           type: "offer",
    //           offer: offer,
    //           sender: localthis.userStore.id,
    //         })
    //       );

    //       localthis.connection.setLocalDescription(offer);
    //     },
    //     function (error) {
    //       alert("An error has occurred. ", error);
    //     }
    //   );
    // },
    // async startRTC() {
    //   // const constraints = {
    //   //   video: true,
    //   //   audio: true,
    //   // };
    //   // const promise = navigator.mediaDevices.getUserMedia(constraints);
    //   // const peerConnection = new RTCPeerConnection(configuration);
    //   // const dataChannel = peerConnection.createDataChannel();

    //   if (this.hasUserMedia()) {
    //     navigator.getUserMedia =
    //       navigator.getUserMedia ||
    //       navigator.webkitGetUserMedia ||
    //       navigator.mozGetUserMedia ||
    //       navigator.msGetUserMedia;

    //     //get both video and audio streams from user's camera
    //     var video = this.$refs.rtcvideo;
    //     var localthis = this;
    //     const stream = await navigator.mediaDevices.getUserMedia({
    //       video: true,
    //       audio: true,
    //     });
    //     video.srcObject = stream;
    //     // navigator.getUserMedia(
    //     //   { video: true, audio: true },
    //     //   function (stream) {
    //     //     //insert stream into the video tag
    //     //     localthis.connection.addStream(stream);
    //     //   },
    //     //   function (err) {
    //     //     console.log(err);
    //     //   }
    //     // );

    //     localthis.connection = new RTCPeerConnection({
    //       iceServers: [
    //         {
    //           urls: "stun:stun.l.google.com:19302",
    //         },
    //       ],
    //     });
    //     console.log(localthis.connection);
    //     localthis.connection.onicecandidate = (event) => {
    //       if (event.candidate) {
    //         this.chatSocket.send(
    //           JSON.stringify({
    //             type: "candidate",
    //             candidate: event.candidate,
    //           })
    //         );
    //       }
    //     };
    //     localthis.connection.onaddstream = (event) => {
    //       video.srcObject = event.stream;
    //       console.log("got remote stream");
    //     };
    //     //establishing peer connection
    //     //...
    //     //end of establishing peer connection

    //     // var dataChannel = localthis.connection.createDataChannel(
    //     //   "myChannel",
    //     //   dataChannelOptions
    //     // );
    //     // here we can start sending direct messages to another peer
    //   } else {
    //     alert("Error. WebRTC is not supported!");

    //     // this.connection.ondatachannel = (event) => {
    //     //   event.channel.onopen = () => {
    //     //     console.log("data channel opened");
    //     //   };
    //     //   event.channel.onmessage = (event) => {
    //     //     console.log("got message", event.data);
    //     //   };
    //     // };
    //     // this.connection.createOffer().then((offer) => {
    //     //   this.connection.setLocalDescription(offer);
    //     //   this.chatSocket.send(
    //     //     JSON.stringify({
    //     //       sdp: offer,
    //     //     })
    //     //   );
    //     // });
    //     // this.connection.onaddstream = (event) => {
    //     //   console.log("got remote stream", event.stream);
    //   }
    // },
  },

  mounted() {
    this.$nextTick(async () => {
      await this.getChatRoom();
      this.chatSocket = new WebSocket(this.roomUrl);
      this.chatSocket.onmessage = this.onMessage;
      this.chatSocket.onclose = this.onClose;
    });

    //this.startRTC();
  },
};
</script>

<style scoped>
.message-input-box {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.full-width-box {
  width: 100%;
}
.fill-container {
  height: 100%;
  margin: 0;
  padding: 0;
}
.user_name {
  color: #afafaf;
}
.message {
  padding: 10px !important;
  transition: all 250ms ease-in-out !important;
  border-radius: 10px !important;
  margin-bottom: 4px !important;
}
.mymessage {
  background: rgb(115, 115, 233);
  color: #000 !important;
  border-top-right-radius: 0px !important;
}
.othermessage {
  background: #dcdcdc !important;
  color: #000 !important;
  border-top-left-radius: 0px !important;
}
.time {
  color: #afafaf;
  float: right;
  font-size: small;
}
.message_row {
  background-color: #fff;
}
</style>
