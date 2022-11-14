<template>
  <base-layout page-title="Delete Account">
    <ion-grid>
      <ion-row>
        <ion-col>
          <ion-item>
            <ion-text>
              <p>
                Warning: This will delete all of your data and cannot be undone.
              </p>
            </ion-text>
          </ion-item>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <ion-item>
            <ion-label position="stacked" color="primary">
              Are you sure you want to delete your account?
            </ion-label>
          </ion-item>
        </ion-col>
      </ion-row>

      <ion-row v-if="!deleteEnabled">
        <ion-col>
          <ion-button
            fill="solid"
            shape="round"
            color="primary"
            @click="enableDelete"
          >
            Yes, delete my account
          </ion-button>
        </ion-col>
      </ion-row>

      <ion-row v-if="deleteEnabled">
        <ion-col>
          <ion-item>
            <ion-label position="stacked" color="primary"
              >Please type your pasword to confirm:</ion-label
            >
            <ion-input
              v-model="password"
              type="password"
              color="tertiary"
            ></ion-input>
          </ion-item>
        </ion-col>
      </ion-row>

      <ion-row v-if="deleteEnabled">
        <ion-col>
          <ion-button
            fill="solid"
            shape="round"
            color="primary"
            @click="deleteAccount"
            >Delete</ion-button
          >
        </ion-col>
      </ion-row>
    </ion-grid>
  </base-layout>
</template>

<script>
import { IonLabel, IonInput, IonText } from "@ionic/vue";
import { useUser } from "../../stores/user";
import { trashOutline } from "ionicons/icons";

export default {
  components: {
    IonLabel,
    IonInput,
    IonText,
  },
  setup() {
    const userStore = useUser();
    return { userStore, trashOutline };
  },
  data() {
    return {
      password: "",

      deleteEnabled: false,
    };
  },
  methods: {
    async deleteAccount() {
      if (this.newPassword !== this.confirmPassword) {
        alert("Passwords do not match");
        return;
      }
      const result = await this.userStore.deleteUser(this.password);
      if (result.status === 200) {
        alert("User deleted!");
        await this.userStore.logout();
      } else {
        alert(result.data.detail);
      }
    },
    enableDelete() {
      this.deleteEnabled = true;
    },
  },
};
</script>

<style scoped>
.invalid {
  --color: var(--ion-color-danger);
}
</style>
