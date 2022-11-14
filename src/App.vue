<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { defineComponent } from "vue";
import { useUser } from "./stores/user";

export default defineComponent({
  name: "App",
  components: {
    IonApp,
    IonRouterOutlet,
  },
  setup() {
    const userStore = useUser();
    userStore.setCSRFToken();
  },
});
</script>

<style>
@font-face {
  font-family: 'Manrope';
  src: local('Manrope'), url('./assets/fonts/Manrope-VariableFont_wght.ttf') format('ttf');
}
a {
  text-decoration: none;
}
ion-app {
  font-family: 'Manrope', sans-serif;
}

ion-button.base-btn {
  --padding-top: 15px;
  --padding-bottom: 15px;
  --border-radius: 16px;
  --box-shadow: none;
  height: 50px;
  margin: 0;
  font-size: 16px;
  line-height: 28px;
  text-transform: capitalize;
  font-weight: 700;
  width: 100%;
}
ion-button.base-btn-outline {
  margin-top: 16px;
  --color: #787C80;
  --background-focused: none;
  --background-hover: none;
  --border-color: #D1D1D6;
  --background: #FFFFFF;
  border: 1px solid #D1D1D6;
  border-radius: 16px;
}
</style>
<style scoped>
ion-item {
  --background: #f9f8ff;
}
</style>
