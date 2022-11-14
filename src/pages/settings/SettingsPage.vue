<template>
  <base-layout page-title="Settings">
    <ion-grid>
      <ion-row>
        <ion-col>
          <ion-item>
            <ion-button
              expanded="full"
              class="full-width left"
              fill="flat"
              color="secondary"
              router-link="/settings/profile"
            >
              <ion-icon slot="start" :icon="personCircleOutline"></ion-icon>
              <span class="left"> Personal details </span>
              <ion-icon slot="end" :icon="chevronForwardOutline"></ion-icon>
            </ion-button>
          </ion-item>
        </ion-col>
      </ion-row>

      <ion-row>
        <ion-col>
          <ion-item>
            <ion-button
              expanded="full"
              class="full-width left"
              fill="flat"
              color="secondary"
            >
              <ion-icon slot="start" :icon="notificationsOutline"></ion-icon>
              <span class="left"> Notifications settings </span>
              <ion-icon slot="end" :icon="chevronForwardOutline"></ion-icon>
            </ion-button>
          </ion-item>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <ion-item
            ><ion-button
              expanded="full"
              class="full-width left"
              fill="flat"
              color="secondary"
              router-link="/settings/change-password"
            >
              <ion-icon slot="start" :icon="lockClosedOutline"></ion-icon>
              <span class="left"> Security </span>
              <ion-icon slot="end" :icon="chevronForwardOutline"></ion-icon> </ion-button
          ></ion-item>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <ion-item>
            <ion-button
              expanded="full"
              class="full-width"
              fill="flat"
              color="secondary"
              router-link="/settings/help"
            >
              <ion-icon slot="start" :icon="helpCircleOutline"></ion-icon>
              <span class="left"> Help </span>
              <ion-icon slot="end" :icon="chevronForwardOutline"></ion-icon>
            </ion-button>
          </ion-item>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <ion-item
            ><ion-button
              expanded="full"
              class="full-width"
              fill="flat"
              color="secondary"
              router-link="/terms"
            >
              <ion-icon slot="start" :icon="documentTextOutline"> </ion-icon>
              <span class="left"> Terms & conditions </span>
              <ion-icon slot="end" :icon="chevronForwardOutline"></ion-icon> </ion-button
          ></ion-item>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <ion-item>
            <ion-button
              expanded="full"
              class="full-width left"
              fill="flat"
              color="secondary"
              router-link="/privacy-policy"
            >
              <ion-icon slot="start" :icon="documentLockOutline"></ion-icon>
              <span class="left"> Privacy Policy </span>
              <ion-icon slot="end" :icon="chevronForwardOutline"></ion-icon>
            </ion-button>
          </ion-item>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <ion-item>
            <ion-button
              expanded="full"
              class="full-width left"
              fill="flat"
              color="secondary"
              router-link="/settings/delete-account"
            >
              <ion-icon slot="start" :icon="documentLockOutline"></ion-icon>
              <span class="left"> Delete Account </span>
              <ion-icon slot="end" :icon="chevronForwardOutline"></ion-icon>
            </ion-button>
          </ion-item>
        </ion-col>
      </ion-row>
      <ion-row></ion-row>
      <ion-row>
        <ion-col>
          <ion-button
            expanded="full"
            class="full-width"
            fill="outline"
            color="danger"
            @click="logout"
          >
            Sign out</ion-button
          >
        </ion-col>
      </ion-row>
    </ion-grid>
    <template v-slot:footer> <div></div></template>
  </base-layout>
</template>

<script>
import {
  createOutline,
  briefcaseOutline,
  notificationsOutline,
  lockClosedOutline,
  helpCircleOutline,
  documentTextOutline,
  documentLockOutline,
  chevronForwardOutline,
  personCircleOutline,
} from "ionicons/icons";
import { useUser } from "../../stores/user";
export default {
  components: {},
  setup() {
    const userStore = useUser();
    return {
      userStore,
      personCircleOutline,
      createOutline,
      briefcaseOutline,
      notificationsOutline,
      lockClosedOutline,
      helpCircleOutline,
      documentTextOutline,
      documentLockOutline,
      chevronForwardOutline,
    };
  },
  methods: {
    async logout() {
      await this.userStore.logout();
      this.$router.replace("login");
    },
  },
};
</script>
<style scoped>
.ion-page {
  --ion-background-color: white;
}

.full-width {
  width: 100%;
}
.bold {
  font-weight: bold;
}
.center {
  text-align: center;
}
.left {
  text-align: left;
  margin-right: auto;
}

.center-align-col {
  text-align: center;
  display: flex;
  justify-content: center;
}
.rounded-thumbnail {
  --border-radius: 100%;
  padding: 2px;
  border: solid var(--ion-color-secondary) 3px;

  --size: 128px;
}
ion-button {
  height: 5.4vh;
}
</style>
