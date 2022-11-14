<template>
  <base-layout :content-loaded="contentLoaded" page-title="Verify your email">
    <template v-slot:default>
      <ion-grid>
        <ion-row>
          <ion-col>
            <h3 style="margin-bottom: 10px">
              <b>We have sent a validation code to your email</b>
            </h3>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-item>
              <ion-input
                inputmode="numeric"
                maxlength="1"
                v-model="code1"
                ref="code1"
                @keyup="gotoNextField('code2')"
              ></ion-input>
            </ion-item>
          </ion-col>
          <ion-col>
            <ion-item>
              <ion-input
                inputmode="numeric"
                maxlength="1"
                v-model="code2"
                ref="code2"
                @keyup="gotoNextField('code3')"
              ></ion-input>
            </ion-item>
          </ion-col>
          <ion-col>
            <ion-item>
              <ion-input
                inputmode="numeric"
                maxlength="1"
                v-model="code3"
                ref="code3"
                @keyup="gotoNextField('code4')"
              ></ion-input>
            </ion-item>
          </ion-col>

          <ion-col>
            <ion-item
              ><ion-input
                inputmode="numeric"
                maxlength="1"
                v-model="code4"
                ref="code4"
                @keyup="gotoNextField('code5')"
              ></ion-input
            ></ion-item>
          </ion-col>
          <ion-col>
            <ion-item
              ><ion-input
                inputmode="numeric"
                maxlength="1"
                v-model="code5"
                ref="code5"
                @keyup="gotoNextField('code6')"
              ></ion-input
            ></ion-item>
          </ion-col>
          <ion-col>
            <ion-item
              ><ion-input
                inputmode="numeric"
                maxlength="1"
                v-model="code6"
                ref="code6"
              ></ion-input
            ></ion-item>
          </ion-col>
        </ion-row>
        <ion-row></ion-row>
        <!-- 5 minutes countdown -->
        <ion-row v-if="countdown">
          <ion-col>
            <ion-button
              color="primary"
              expand="block"
              style="margin-top: 10px"
              fill="flat"
              disabled
            >
              Resend code in: {{ displayCountdown }}
            </ion-button>
          </ion-col>
        </ion-row>
        <!-- resend -->
        <ion-row v-if="!countdown">
          <ion-col>
            <ion-button
              @click="requestEmail"
              color="primary"
              expand="block"
              style="margin-top: 10px"
              fill="flat"
            >
              Resend Code
            </ion-button>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-button
              @click="validateCode"
              color="primary"
              expand="block"
              :disabled="!code1 || !code2 || !code3 || !code4 || !code5 || !code6"
            >
              Validate Code
            </ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
    </template>
    <template v-slot:footer> <div></div></template>
  </base-layout>
</template>

<script>
import { useUser } from "../../stores/user";
import { IonInput } from "@ionic/vue";

export default {
  setup() {
    const userStore = useUser();
    return {
      userStore,
    };
  },
  data() {
    return {
      contentLoaded: false,
      countdown: 0,
      code1: "",
      code2: "",
      code3: "",
      code4: "",
      code5: "",
      code6: "",
    };
  },
  components: {
    IonInput,
  },
  methods: {
    async requestEmail() {
      await this.userStore.requestEmailValdiation();
      await this.setCountdown();
    },
    gotoNextField(ref) {
      const input = this.$refs[ref];
      if (input) {
        input.$el.setFocus();
      }
    },
    async validateCode() {
      const result = await this.userStore.validateEmail(
        this.code1 + this.code2 + this.code3 + this.code4 + this.code5 + this.code6
      );
      if (result.status === 201) {
        this.$router.replace("/settings/profile");
      } else {
        alert("Invalid code");
      }
    },
    async setCountdown() {
      // 5 minutes countdown

      this.countdown = 5 * 60;
      const interval = setInterval(() => {
        this.countdown--;
        if (this.countdown === 0) {
          clearInterval(interval);
        }
      }, 1000);
    },
  },
  computed: {
    displayCountdown() {
      var minutes = Math.floor(this.countdown / 60);
      var seconds = this.countdown % 60;
      return `${minutes}:${seconds}`;
    },
  },
  mounted() {
    this.userStore.setCSRFToken();
    this.contentLoaded = true;
    this.$nextTick(async () => {
      await this.requestEmail();
    });
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
}
</style>
