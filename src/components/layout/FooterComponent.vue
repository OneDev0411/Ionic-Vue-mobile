<template>
  <ion-footer class="ion-no-border" :class="keyboardOpen ? 'hide-if-keyboard' : ''">
    <div class="wrapper">
      <ion-button
        fill="solid"
        class="add-dream"
        color="secondary"
        router-link="/create-dream"
      >
        <ion-icon
          slot="icon-only"
          :icon="add"
          class="add-dream-icon"
          fill="solid"
        ></ion-icon>
      </ion-button>
    </div>

    <footer-toolbar></footer-toolbar>
  </ion-footer>
</template>

<script>
import FooterToolbar from "./FooterToolbar.vue";
import { IonFooter } from "@ionic/vue";
import { add } from "ionicons/icons";
import { Keyboard } from "@capacitor/keyboard";
export default {
  components: {
    IonFooter,

    FooterToolbar,
  },
  data() {
    return {
      add,
      keyboardOpen: false,
    };
  },
  mounted() {
    Keyboard.addListener("keyboardDidShow", () => {
      this.keyboardOpen = true;
    });
    Keyboard.addListener("keyboardDidHide", () => {
      this.keyboardOpen = false;
    });
  },
};
</script>

<style scoped>
ion-footer {
  overflow: visible;
}
ion-toolbar {
  border-radius: 40px 40px 0px 0px;
  overflow: visible;
}
ion-button {
  --border-radius: 100%;
}
.add-dream {
  opacity: 1;
  margin: 0 auto;
  left: 50%;
  position: absolute;
  transform: translate(-50%, -20%);
  width: 8vh;
  height: 8vh;
  overflow: visible;
  z-index: 20;
  padding: 0;
}
.add-dream-icon {
  --ionicon-stroke-width: 80px;
}
.wrapper {
  position: absolute;
  z-index: 19;
  width: 100%;
}
.hide-if-keyboard {
  display: none;
}
</style>
