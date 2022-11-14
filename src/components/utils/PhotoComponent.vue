<template>
  <div @click="takePhoto">
    <slot>
      <ion-item>
        <ion-button size="default">
          <ion-icon slot="start" :icon="cameraOutline"></ion-icon>
          Take Photo
        </ion-button>
      </ion-item>
    </slot>
  </div>
</template>

<script>
import { IonIcon } from "@ionic/vue";
import { cameraOutline } from "ionicons/icons";
import { Camera, CameraResultType } from "@capacitor/camera"; // CameraSource
import { decode } from "base64-arraybuffer";

export default {
  emits: ["imageLoaded"],
  components: { IonIcon },
  setup() {
    return { cameraOutline };
  },
  data() {
    return {
      imagePreviewUrl: "",
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
      imageData.dataUrl =
        `data:image/${photo.format};base64,` + photo.base64String;
      imageData.raw = photo.base64String;
      this.$emit("imageLoaded", imageData);
    },
  },
};
</script>
