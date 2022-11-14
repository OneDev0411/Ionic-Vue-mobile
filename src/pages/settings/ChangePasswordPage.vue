<template>
  <base-layout page-title="Security">
    <ion-grid>
      <ion-row>
        <ion-col>
          <ion-item>
            <ion-label
              position="stacked"
              color="primary"
              :class="oldPasswordError ? 'invalid' : ''"
              >Old Password: {{ oldPasswordError }}</ion-label
            >
            <ion-input
              v-model="oldPassword"
              type="password"
              color="tertiary"
              :class="oldPasswordError ? 'invalid' : ''"
            ></ion-input>
          </ion-item>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <ion-item>
            <ion-label
              position="stacked"
              color="primary"
              :class="newPasswordError ? 'invalid' : ''"
              >New Password: {{ newPasswordError }}</ion-label
            >
            <ion-input
              v-model="newPassword"
              type="password"
              color="tertiary"
              :class="newPasswordError ? 'invalid' : ''"
            ></ion-input>
          </ion-item>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <ion-item>
            <ion-label
              position="stacked"
              color="primary"
              :class="confirmPasswordError ? 'invalid' : ''"
              >Confirm Password: {{ confirmPasswordError }}</ion-label
            >
            <ion-input
              v-model="confirmPassword"
              type="password"
              color="tertiary"
              :class="confirmPasswordError ? 'invalid' : ''"
            ></ion-input>
          </ion-item>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <ion-button
            fill="solid"
            shape="round"
            color="primary"
            @click="changePassword"
            >Save</ion-button
          >
        </ion-col>
      </ion-row>
    </ion-grid>
  </base-layout>
</template>

<script>
import { IonLabel, IonInput } from "@ionic/vue";
import { useUser } from "../../stores/user";
import { createOutline, saveOutline } from "ionicons/icons";

export default {
  components: {
    IonLabel,
    IonInput,
  },
  setup() {
    const userStore = useUser();
    return { userStore, createOutline, saveOutline };
  },
  data() {
    return {
      oldPassword: "",
      oldPasswordError: "",

      newPassword: "",
      newPasswordError: "",

      confirmPassword: "",
      confirmPasswordError: "",
    };
  },
  methods: {
    async changePassword() {
      if (this.newPassword !== this.confirmPassword) {
        alert("Passwords do not match");
        return;
      }
      const result = await this.userStore.changePassword(
        this.oldPassword,
        this.newPassword,
        this.confirmPassword
      );
      if (result.status === 200) {
        alert("Password changed successfully");
        await this.userStore.login(this.userStore.username, this.newPassword);
      } else {
        alert("Password change failed");
        this.oldPasswordError = result.data.old_password
          ? result.data.old_password[0]
          : "";
        this.newPasswordError = result.data.password
          ? result.data.password[0]
          : "";
        this.confirmPasswordError = result.data.password2
          ? result.data.password2[0]
          : "";
      }
    },
  },
};
</script>

<style scoped>
.invalid {
  --color: var(--ion-color-danger);
}
</style>
