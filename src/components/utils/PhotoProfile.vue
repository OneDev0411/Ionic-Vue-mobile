<template>
  <ion-button class="ion-no-padding ion-no-margin" size="default" color="light" @click="takePhoto">
    <ion-thumbnail slot="end" justify-content-center>
      <ion-img :src="cameraIcon"></ion-img>
    </ion-thumbnail>
  </ion-button>
</template>

<script>
import { cameraOutline } from "ionicons/icons";
import { Camera, CameraResultType } from "@capacitor/camera"; // CameraSource
import { decode } from "base64-arraybuffer";

export default {
  emits: ["imageLoaded"],
  setup() {
    return { cameraOutline };
  },
  data() {
    return {
      imagePreviewUrl: "",
      cameraIcon: "../assets/icon/camera-icon.svg",
    };
  },
  methods: {
    async takePhoto() {
      const photo = await Camera.getPhoto({
        quality: 70,
        //source: CameraSource.Camera,
        allowEditing: true,
        resultType: CameraResultType.Base64,
      });
      const imageData = {};
      imageData.blob = new Blob([new Uint8Array(decode(photo.base64String))], {
        type: `image/${photo.format}`,
      });
      imageData.dataUrl = `data:image/${photo.format};base64,` + photo.base64String;
      imageData.raw = photo.base64String;
      this.$emit("imageLoaded", imageData);
    },
  },
};
</script>

<style scoped>
ion-button {
  position: absolute;
  right: 3px;
  bottom: 1px;
  --box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.15);
  --border-radius: 100%;
}
ion-thumbnail {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
}
ion-icon {
  color: #787c80;
}
ion-img {
  width: 20px;
  height: 19px;
}
</style>
