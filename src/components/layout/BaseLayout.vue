<template>
  <ion-page>
    <slot name="header" v-if="contentLoaded">
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-back-button class="ion-chevron-left" icon="chevron-back-outline" :router-link="-1" />
          </ion-buttons>

          <ion-title class="ion-text-center ion-no-padding"> {{ pageTitle }}</ion-title>
        </ion-toolbar>
        <ion-icon class="back-icon" :src="backIcon" />
      </ion-header>
    </slot>

    <ion-content v-if="contentLoaded">
      <slot>Test</slot>
    </ion-content>
    <ion-content v-else>
      <ion-spinner class="screen-center" color="primary"></ion-spinner>
    </ion-content>
    <slot name="footer" v-if="contentLoaded">
      <footer-component></footer-component>
    </slot>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonHeader,
  IonTitle,
  IonBackButton,
  IonButtons,
  IonContent,
  IonToolbar,
  IonSpinner,
} from "@ionic/vue";
import FooterComponent from "./FooterComponent.vue"
export default {
  props: {
    pageTitle: {
      type: String,
      default: "",
    },
    contentLoaded: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    IonPage,
    IonButtons,
    IonHeader,
    IonTitle,
    IonBackButton,
    IonContent,
    IonToolbar,
    FooterComponent,
    IonSpinner,
  },
  data() {
    return {
      backIcon: "../assets/marketplace/productlist/back-icon.svg",
    };
  },
};
</script>

<style scoped>
ion-spinner.screen-center {
  width: 5em;
  height: 5em;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
ion-icon.back-icon {
   position: absolute;
   top: 20px;
   left: 20px;
   z-index: 10;
   pointer-events: none;
 }

ion-title {
  font-weight: 500;
  font-size: 18px;
  line-height: 25px;
  text-align: center;
  color: #212325;
  margin-right: 3rem;
}


</style>
