<template>
  <ion-modal :is-open="isOpened">
    <ion-content scrollX="true" scrollY="true">
      <swiper
        :space-between="50"
        :initial-slide="startingIndex"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
        class="dark-background"
      >
        <swiper-slide v-for="image in images" :key="image">
          <div class="full-height">
            <ion-button class="fixed-pos" fill="clear" @click="closeSlider">
              <ion-icon slot="icon-only" :icon="chevronBackOutline"></ion-icon>
            </ion-button>
            <ion-button
              v-if="isSelf"
              class="fixed-pos shift-right"
              fill="clear"
              @click="deleteImage(image)"
            >
              <ion-icon slot="icon-only" :icon="trashOutline"></ion-icon>
            </ion-button>
            <img class="center-vertically" :src="image" />
          </div>
        </swiper-slide>
      </swiper>
    </ion-content>
  </ion-modal>
</template>

<script>
import { IonModal, IonContent, IonIcon } from "@ionic/vue";
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

import { chevronBackOutline, trashOutline } from "ionicons/icons";
// Import Swiper styles
import "swiper/css";
export default {
  components: { IonModal, IonContent, Swiper, SwiperSlide, IonIcon },
  props: ["images", "isOpened", "startingIndex", "isSelf"],
  emits: ["clickClose", "clickRemove"],
  setup() {
    return { chevronBackOutline, trashOutline };
  },
  data() {
    return {};
  },
  methods: {
    // setOpen(value) {
    //   this.isOpened = value;
    // },
    closeSlider() {
      this.$emit("clickClose");
    },
    deleteImage(image) {
      this.$emit("clickRemove", image);
      this.$emit("clickClose");
    },
    onSwiper(swiper) {
      console.log(swiper);
    },
    onSlideChange() {
      console.log("slide change");
    },
  },
  unmounted() {
    this.closeSlider();
  },
};
</script>

<style scoped>
.center-vertically {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
.full-height {
  height: 100vh;
}
.dark-background {
  background-color: var(--ion-color-primary);
}
.fixed-pos {
  position: absolute;
  z-index: 10;
  color: white;
}
.shift-right {
  right: 0px;
  top: 0px;
}
</style>
