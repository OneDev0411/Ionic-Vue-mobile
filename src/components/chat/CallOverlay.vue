<template>
  <ion-modal :is-open="modalState" ref="rtcContainer">
    <ion-content class="dark-background">
      <video autoplay :srcObject="localvideo" class="userVideo"></video>
      <video autoplay :srcObject="remotevideo" class="peerVideo"></video>

      <div class="fix-footer">
        <ion-grid>
          <ion-row>
            <ion-col>
              <ion-button color="danger" class="auto-margin" @click="endCall">
                End call
              </ion-button>
            </ion-col>
            <!-- <ion-col>
              <ion-button color="danger" class="auto-margin"> Mute </ion-button>
            </ion-col>
            <ion-col>
              <ion-button color="danger" class="auto-margin">
                Video
              </ion-button>
            </ion-col>-->
          </ion-row>
        </ion-grid>
      </div>
    </ion-content>
  </ion-modal>
</template>

<script>
//import { } from "ionicons/icons";
import { useUser } from "../../stores/user";
import { IonModal, IonContent, IonCol } from "@ionic/vue"; // IonIcon
export default {
  components: { IonModal, IonContent, IonCol },
  props: ["isOpened", "sendMessage", "recievedMessage"],
  emits: [],
  setup() {
    const userStore = useUser();
    return { userStore };
  },
  data() {
    return {
      connection: null,
      localvideo: null,
      remotevideo: null,
      RTCConfig: {
        iceServers: [
          {
            urls: "stun:stun.l.google.com:19302",
          },
        ],
      },
    };
  },
  methods: {
    async startCall() {
      if (!this.localvideo) {
        await this.setLocalMedia();
        await this.connection.addStream(this.localvideo);
      } else {
        await this.connection.addStream(this.localvideo);
      }
    },
    async setLocalMedia() {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      console.log("stream", stream);
      this.localvideo = stream;
    },
    async onIceCandidate(event) {
      if (event.candidate) {
        await this.sendMessage({
          type: "candidate",
          candidate: event.candidate,
        });
      }
    },
    onAddStream(event) {
      console.log("onAddStream", event);
      this.remotevideo = event.stream;
    },
    async onCandidate(candidate) {
      if (this.connection) {
        await this.connection.addIceCandidate(new RTCIceCandidate(candidate));
      }
    },
    async onAnswer(answer, connectedUser) {
      // make connection only if message is not from self
      console.log(
        "answer from connectedUser",
        connectedUser,
        this.userStore.id
      );
      if (connectedUser != this.userStore.id) {
        await this.connection.setRemoteDescription(
          new RTCSessionDescription(answer)
        );
      }
    },
    async onOffer(offer, connectedUser) {
      // make connection only if message is not from self
      console.log("offer from connectedUser", connectedUser);
      if (connectedUser != this.userStore.id) {
        await this.connection.setRemoteDescription(
          new RTCSessionDescription(offer)
        );
        const answer = await this.connection.createAnswer();
        await this.connection.setLocalDescription(answer);
        await this.sendMessage({
          type: "answer",
          answer: answer,
        });
      }
    },
    async makeOffer() {
      console.log("makeOffer");
      const offer = await this.connection.createOffer();
      await this.connection.setLocalDescription(offer);
      await this.sendMessage({
        type: "offer",
        offer: offer,
      });
    },
    endCall() {
      this.$emit("close");
    },
  },
  computed: {
    message() {
      return this.recievedMessage;
    },
    modalState() {
      return this.isOpened;
    },
  },
  watch: {
    message(newValue) {
      console.log(newValue);
      if (newValue.type == "candidate") {
        this.onCandidate(newValue.candidate);
      } else if (newValue.type == "answer") {
        this.onAnswer(newValue.answer, newValue.sender_id);
      } else if (newValue.type == "offer") {
        this.onOffer(newValue.offer, newValue.sender_id);
      } else if (newValue.type == "call_accepted") {
        console.log("Call accepted");
        console.log("connectedUser", newValue.sender_id, this.userStore.id);
        if (newValue.sender_id == this.userStore.id) {
          this.makeOffer();
        }
      } else if (newValue.type == "call_rejected") {
        if (newValue.sender_id != this.userStore.id) {
          this.$emit("close");
        }
      } else if (newValue.type == "call_end") {
        if (newValue.sender_id != this.userStore.id) {
          this.$emit("close");
        }
      }
    },
    modalState(newValue) {
      if (newValue) {
        this.startCall();
      } else {
        this.connection.close();
        this.connection = null;
      }
    },
  },
  mounted() {
    this.connection = new RTCPeerConnection(this.RTCConfig);
    this.connection.onicecandidate = this.onIceCandidate;
    this.connection.onaddstream = this.onAddStream;

    this.$nextTick(async () => {
      await this.startCall();
    });
  },
};
</script>

<style scoped>
.dark-background {
  background-color: var(--ion-color-primary);
  position: relative;
}
.fix-footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  align-items: center;
  z-index: 10;
}

.userVideo {
  height: 160px;
  border-radius: 7%;
  position: fixed;
  bottom: 60px;
  left: 5px;
  z-index: 10;
}

.peerVideo {
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 8;
}
</style>
