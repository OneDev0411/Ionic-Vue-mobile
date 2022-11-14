<template>
  <base-layout :content-loaded="contentLoaded">
    <template v-slot:header>
      <div></div>
    </template>
    <template v-slot:default>
      <onboarding-modal
        :is-opened="onboardingOpened"
        :images="images"
        @clickClose="closeOnboadring"
      />
      <ion-grid>
        <ion-row>
          <ion-col size="12">
            <h1 style="margin-bottom: 10px"><b>Welcome Back</b></h1>
          </ion-col>
          <ion-col size="12" style="padding-top: 0"
            ><h6 style="margin-top: 0px">Manage Your Dreams</h6></ion-col
          >
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-item>
              <ion-icon :icon="personOutline" slot="start"></ion-icon>
              <ion-input v-model="username" placeholder="User Name"></ion-input>
            </ion-item>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12" style="padding-bottom: 0">
            <ion-item>
              <ion-icon :icon="lockClosedOutline" slot="start"></ion-icon>

              <ion-input
                v-if="!passwordVisible"
                v-model="password"
                type="password"
                placeholder="Password"
              ></ion-input>
              <ion-input
                v-else
                v-model="password"
                type="text"
                placeholder="Password"
              ></ion-input>
              <ion-button
                slot="end"
                fill="clear"
                class="iconButton"
                @click="showPassword"
              >
                <ion-icon
                  v-if="passwordVisible"
                  class="iconEye"
                  :icon="eyeOutline"
                  slot="icon-only"
                ></ion-icon>
                <ion-icon
                  v-else
                  class="iconEye"
                  :icon="eyeOffOutline"
                  slot="icon-only"
                ></ion-icon>
              </ion-button>
            </ion-item>
          </ion-col>
          <ion-col size="12" style="padding-top: 0"
            ><ion-text style="margin-top: 0px">
              <h6>Forgot password?</h6>
            </ion-text>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col
            ><ion-button
              class="full-width"
              @click.prevent="login"
              :disabled="!username || !password"
              >Sign In</ion-button
            >
          </ion-col>
        </ion-row>

        <!-- social sign in -->
        <!-- <ion-row style="align-items: center">
          <ion-col>
            <div class="separator" style="float: right"></div>
          </ion-col>
          <ion-col class="ion-text-center" size="1">
            <ion-text>OR</ion-text>
          </ion-col>
          <ion-col>
            <div class="separator" style="float: left"></div>
          </ion-col>
        </ion-row>

        <ion-row>
          <ion-col
            ><ion-button
              class="full-width social-login"
              fill="outline"
              @click.prevent="socialLogin('facebook')"
              ><ion-icon :icon="logoFacebook" slot="start"></ion-icon> Sign in with
              Facebook</ion-button
            >
          </ion-col>
        </ion-row>

        <ion-row>
          <ion-col
            ><ion-button
              class="full-width social-login"
              fill="outline"
              @click.prevent="socialLogin('google')"
              ><ion-icon :icon="logoGoogle" slot="start"></ion-icon>Sign in with
              Google</ion-button
            >
          </ion-col>
        </ion-row> -->

        <ion-row>
          <ion-col class="ion-text-center">
            <ion-text
              >You don't have an account?

              <router-link to="/register">Sign up</router-link>
            </ion-text>
          </ion-col>
        </ion-row>
      </ion-grid>
    </template>
    <template v-slot:footer> <div></div></template>
  </base-layout>
</template>

<script>
import { useUser } from "../../stores/user";
import OnboardingModal from "../../components/layout/OnboardingModal.vue";
import { IonInput, IonText } from "@ionic/vue";
import {
  eyeOutline,
  eyeOffOutline,
  lockClosedOutline,
  personOutline,
  logoFacebook,
  logoGoogle,
} from "ionicons/icons";
export default {
  setup() {
    const userStore = useUser();
    return {
      userStore,
      eyeOutline,
      eyeOffOutline,
      lockClosedOutline,
      personOutline,
      logoFacebook,
      logoGoogle,
    };
  },
  data() {
    return {
      contentLoaded: false,
      username: "",
      password: "",
      passwordVisible: false,
      onboardingOpened: true,
      images: [
        "../assets/onboarding-1.png",
        "../assets/onboarding-2.png",
        "../assets/onboarding-3.png",
      ],
    };
  },
  components: {
    IonInput,
    IonText,
    OnboardingModal,
  },
  methods: {
    async login() {
      this.contentLoaded = false;
      const response = await this.userStore.login(this.username, this.password);
      if (response) {
        console.log("Login sucessful, Redirecting to Home Page");
        this.$router.replace("landing");
      } else {
        console.log("Login failed");
      }
      this.contentLoaded = true;
    },
    closeOnboadring(selected) {
      if (selected == "login") {
        this.onboardingOpened = false;
      } else if (selected == "register") {
        this.onboardingOpened = false;
        this.$router.replace("register");
      }
    },
    showPassword() {
      this.passwordVisible = !this.passwordVisible;
    },
    async socialLogin() {
      // this.userStore.socialLogin(provider);
      // alert(`${provider} Sign In Coming Soon!`);
      alert("There was an issue with the social login. Please try again later.");
    },
  },
  mounted() {
    this.userStore.setCSRFToken();
    this.contentLoaded = true;
  },
};
</script>

<style scoped>
.full-width {
  width: 100%;
  height: 40px;
  --border-radius: 10px;
}

ion-item {
  margin-bottom: 10px;
  background: transparent;
  border: 2px solid var(--ion-color-medium-tint);
  border-radius: 10px;
}
ion-item.item-has-focus {
  border: 2px solid var(--ion-color-secondary) !important;
}

.iconEye {
  font-size: 24px;
}
ion-text {
  color: var(--ion-color-medium-tint);
}
.separator {
  height: 1px;
  background-color: var(--ion-color-medium-tint);
  width: 120px;
}
.social-login {
  --border-width: 1px;
  --border-color: black;
  --background: var(--ion-item-background);
}
</style>
