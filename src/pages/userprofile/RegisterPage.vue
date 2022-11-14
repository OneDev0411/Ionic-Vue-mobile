<template>
  <base-layout page-title="Register" :content-loaded="contentLoaded">
    <template v-slot:header>
      <div></div>
    </template>
    <template v-slot:default>
      <ion-grid>
        <ion-row>
          <ion-col size="12">
            <h1 style="margin-bottom: 10px">
              <b>Create Account</b>
            </h1>
          </ion-col>
          <ion-col size="12" style="padding-top: 0"
            ><h6 style="margin-top: 0px">Manage Your Dreams</h6></ion-col
          >
        </ion-row>

        <ion-row>
          <ion-col>
            <ion-item>
              <ion-label v-if="usernameError" position="floating" class="invalid">
                {{ usernameError }}
              </ion-label>
              <ion-icon :icon="personOutline" slot="start"></ion-icon>
              <ion-input v-model="username" placeholder="User Name"></ion-input>
            </ion-item>
          </ion-col>
        </ion-row>

        <!-- email -->
        <ion-row>
          <ion-col>
            <ion-item>
              <ion-label v-if="emailError" position="floating" class="invalid">
                {{ emailError }}
              </ion-label>
              <ion-icon :icon="mailOutline" slot="start"></ion-icon>
              <ion-input v-model="email" placeholder="Email" type="email"></ion-input>
            </ion-item>
          </ion-col>
        </ion-row>

        <!-- <ion-row>
          <ion-col>
            <ion-item>
              <ion-label position="floating" :class="first_nameError ? 'invalid' : ''"
                >First Name: {{ first_nameError }}</ion-label
              >
              <ion-input v-model="first_name"></ion-input>
            </ion-item>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-item>
              <ion-label position="floating" :class="last_nameError ? 'invalid' : ''"
                >Last Name: {{ last_nameError }}</ion-label
              >
              <ion-input v-model="last_name"></ion-input>
            </ion-item>
          </ion-col>
        </ion-row> -->

        <!-- password-->
        <ion-row>
          <ion-col size="12" style="padding-bottom: 0">
            <ion-item>
              <ion-label v-if="passwordError" position="floating" class="invalid">{{
                passwordError
              }}</ion-label>
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
        </ion-row>

        <!-- repeat password -->
        <ion-row>
          <ion-col size="12" style="padding-bottom: 0">
            <ion-item>
              <ion-label v-if="password2Error" position="floating" class="invalid">{{
                password2Error
              }}</ion-label>
              <ion-icon :icon="lockClosedOutline" slot="start"></ion-icon>

              <ion-input
                v-if="!passwordVisible"
                v-model="password2"
                type="password"
                placeholder="Repeat Password"
              ></ion-input>
              <ion-input
                v-else
                v-model="password2"
                type="text"
                placeholder="Repeat Password"
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
        </ion-row>

        <!-- term and conditions-->
        <ion-row style="align-items: center">
          <ion-col size="1">
            <ion-checkbox v-model="agreedToTerms"></ion-checkbox>
          </ion-col>
          <ion-col size="11">
            <ion-text>
              I agree to the
              <router-link to="/terms">Terms of Service</router-link> &
              <router-link to="/privacy-policy">Privacy Policy</router-link>
            </ion-text>
          </ion-col>
        </ion-row>

        <ion-row>
          <ion-col>
            <ion-button @click="register" class="full-width">Create Account</ion-button>
          </ion-col>
        </ion-row>

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
              ><ion-icon :icon="logoFacebook" slot="start"></ion-icon> Sign in
              with Facebook</ion-button
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
              >Already have an account?

              <router-link to="/login">Sign in</router-link>
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
import { IonInput, IonLabel, IonText, IonCheckbox } from "@ionic/vue";
import {
  eyeOutline,
  eyeOffOutline,
  lockClosedOutline,
  personOutline,
  logoFacebook,
  logoGoogle,
  mailOutline,
} from "ionicons/icons";
export default {
  setup() {
    const userStore = useUser();
    return {
      userStore,
      eyeOutline,
      eyeOffOutline,
      lockClosedOutline,
      mailOutline,
      personOutline,
      logoFacebook,
      logoGoogle,
    };
  },
  components: {
    IonInput,
    IonLabel,
    IonText,
    IonCheckbox,
  },
  data() {
    return {
      contentLoaded: true,
      username: "",
      usernameError: "",

      email: "",
      emailError: "",

      first_name: "",
      first_nameError: "",

      last_name: "",
      last_nameError: "",

      password: "",
      passwordError: "",

      password2: "",
      password2Error: "",

      agreedToTerms: false,
      passwordVisible: false,
    };
  },
  methods: {
    async register() {
      if (this.password !== this.password2) {
        alert("Passwords do not match");
        return;
      }
      if (this.agreedToTerms === false) {
        alert("You must agree to the terms of service and privacy policy");
        return;
      }
      if (this.username.length < 5) {
        this.usernameError = "Username must be at least 5 characters";
        return;
      }
      this.contentLoaded = false;
      console.log("Register", this.password, this.password2);
      const result = await this.userStore.register({
        username: this.username,
        email: this.email,
        first_name: this.first_name,
        last_name: this.last_name,
        password: this.password,
        password2: this.password2,
      });
      if (result.status === 201) {
        await this.userStore.login(this.username, this.password);
        this.$router.push("/email-validation");
      } else {
        this.usernameError = result.data.username ? result.data.username[0] : "";
        this.emailError = result.data.email ? result.data.email[0] : "";
        this.first_nameError = result.data.first_name ? result.data.first_name[0] : "";
        this.last_nameError = result.data.last_name ? result.data.last_name[0] : "";
        this.passwordError = result.data.password ? result.data.password[0] : "";
        this.password2Error = result.data.password2 ? result.data.password2[0] : "";
      }
      this.contentLoaded = true;
    },
    socialLogin(provider) {
      // this.userStore.socialLogin(provider);
      alert(`${provider} Sign In Coming Soon!`);
    },
    showPassword() {
      this.passwordVisible = !this.passwordVisible;
    },
  },
};
</script>

<style scoped>
.invalid {
  --color: var(--ion-color-danger);
}
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
