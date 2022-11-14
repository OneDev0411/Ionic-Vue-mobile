<template>
  <ion-modal :is-open="isOpened">
    <ion-content scrollX="false" scrollY="false">
      <swiper
        :space-between="0"
        :autoplay="autoplay"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
        class="dark-background"
      >
        <swiper-slide v-for="image in images" :key="image">
          <div class="full-height">
            <img class="center-vertically" :src="image" />
          </div>
          <div class="menu">
            <ion-grid>
              <ion-row>
                <ion-col>
                  <ion-text style="color: #fffefe7a">{{ welcomeMessage[0] }}</ion-text>
                </ion-col>
              </ion-row>
              <ion-row>
                <ion-col>
                  <ion-text style="color: white">{{ welcomeMessage[1] }}</ion-text>
                </ion-col>
              </ion-row>
              <ion-row>
                <ion-col>
                  <ion-text style="color: #19ffdb">{{ welcomeMessage[2] }}</ion-text>
                </ion-col>
              </ion-row>
              <ion-row><ion-col></ion-col> </ion-row>
              <ion-row> <ion-col></ion-col> </ion-row>
              <ion-row><ion-col></ion-col> </ion-row>
              <ion-row>
                <ion-col>
                  <ion-button
                    @click="setSelected('register')"
                    expand="block"
                    class="account-creation"
                  >
                    Create Account</ion-button
                  >
                </ion-col>
              </ion-row>

              <ion-row>
                <ion-col>
                  <ion-button
                    @click="setSelected('login')"
                    fill="outline"
                    expand="block"
                    class="sign-in"
                    >Sign in</ion-button
                  >
                </ion-col>
              </ion-row>
            </ion-grid>
          </div>
        </swiper-slide>
      </swiper>
    </ion-content>
  </ion-modal>
</template>

<script>
import { IonModal, IonContent, IonText } from "@ionic/vue";
import { chevronBackOutline, trashOutline } from "ionicons/icons";

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
import SwiperCore, { Autoplay } from "swiper";
SwiperCore.use([Autoplay]);

// Import Swiper styles
import "swiper/css";

export default {
  components: {
    IonModal,
    IonContent,
    Swiper,
    SwiperSlide,

    IonText,
  },
  props: ["images", "isOpened"],
  emits: ["clickClose", "clickRemove"],
  setup() {
    return { chevronBackOutline, trashOutline };
  },
  data() {
    return {
      autoplay: {
        delay: 10000,
        //disableOnInteraction: false
      },
      welcomeMessage: {
        0: "Anything is possible.",
        1: "Dream! Reach Out!",
        2: "Achive!",
      },
      messageChoices: [
        { 0: "Anything is possible.", 1: "Dream! Reach Out!", 2: "Achive!" },
        { 0: "Get Support and", 1: "Help Fund other", 2: "Dreams!" },
        { 0: "Easily Track your", 1: "Goals &", 2: "Achivements!" },
      ],
    };
  },
  methods: {
    setSelected(selected) {
      this.$emit("clickClose", selected);
    },
    deleteImage(image) {
      this.$emit("clickRemove", image);
      this.$emit("clickClose");
    },
    onSwiper(swiper) {
      console.log(swiper);
    },
    onSlideChange() {
      const random = Math.floor(Math.random() * this.messageChoices.length);
      this.welcomeMessage = this.messageChoices[random];
      console.log("slide change");
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,700");
.center-vertically {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
.full-height {
  height: 100vh;
}
.menu {
  position: absolute;
  bottom: 20px;
  width: 100%;
}

ion-text {
  font-size: 2.2rem;
  font-family: "Roboto";
}
ion-button {
  font-family: "Roboto";
}
.account-creation {
  --color: var(--ion-color-primary);
  --background: var(--ion-color-primary-contrast);
  --border-color: white;
}
.sign-in {
  --color: white;
  --border-color: white;
}
</style>
