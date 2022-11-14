import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import { IonicVue } from "@ionic/vue";

/* Core CSS required for Ionic components to work properly */
import "@ionic/vue/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/vue/css/normalize.css";
import "@ionic/vue/css/structure.css";
import "@ionic/vue/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/vue/css/padding.css";
import "@ionic/vue/css/float-elements.css";
import "@ionic/vue/css/text-alignment.css";
import "@ionic/vue/css/text-transformation.css";
import "@ionic/vue/css/flex-utils.css";
import "@ionic/vue/css/display.css";

/* Theme variables */
import "./theme/variables.css";

import BaseLayout from "./components/layout/BaseLayout.vue";
import TruncatedText from "./components/utils/TruncatedText.vue";
import { createPinia } from "pinia";
import { SplashScreen } from "@capacitor/splash-screen";
import {
  IonGrid,
  IonRow,
  IonButton,
  IonItem,
  IonIcon,
  IonCol,
} from "@ionic/vue";
setTimeout(() => {
  SplashScreen.hide();
}, 2000);

const app = createApp(App);
app.use(IonicVue);
app.use(createPinia());
app.use(router);

app.component("base-layout", BaseLayout);
app.component("ion-grid", IonGrid);
app.component("ion-row", IonRow);
app.component("ion-col", IonCol);
app.component("ion-button", IonButton);
app.component("ion-item", IonItem);
app.component("ion-icon", IonIcon);
app.component("truncated-text", TruncatedText);
router.isReady().then(() => {
  app.mount("#app");
});
