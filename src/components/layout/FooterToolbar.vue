<template>
  <ion-toolbar>
    <ion-grid>
      <ion-row>
        <ion-col>
          <ion-button fill="clear" router-link="/landing" class="no-left-padding">
            <ion-icon slot="icon-only" :icon="homeIcon"></ion-icon>
          </ion-button>
        </ion-col>
        <ion-col>
          <ion-button fill="clear" router-link="/marketplace-home" class="no-left-padding">
            <ion-icon slot="icon-only" :icon="walletIcon"></ion-icon>
          </ion-button>
        </ion-col>
        <ion-col> </ion-col>
        <ion-col>
          <ion-button fill="clear" router-link="/notifications" class="no-right-padding">
            <ion-icon slot="icon-only" :icon="notificationsIcon"></ion-icon>
          </ion-button>
        </ion-col>
        <ion-col>
          <router-link :to="{ name: 'profile', params: { id: userStore.id } }"
            ><ion-button fill="clear" class="no-right-padding">
              <ion-icon slot="icon-only" :icon="personIcon"></ion-icon> </ion-button
          ></router-link>
        </ion-col>
      </ion-row>
    </ion-grid>
  </ion-toolbar>
</template>

<script>
import { IonToolbar } from "@ionic/vue";
import {
  home,
  homeOutline,
  wallet,
  walletOutline,
  notifications,
  notificationsOutline,
  person,
  personOutline,
} from "ionicons/icons";
import { useUser } from "../../stores/user";
export default {
  components: {
    IonToolbar,
  },
  setup() {
    const userStore = useUser();
    return { userStore };
  },
  data() {
    return {
      activePage: "home",
    };
  },
  computed: {
    homeIcon() {
      if (this.$route.name == "landing") {
        return home;
      }
      return homeOutline;
    },
    notificationsIcon() {
      if (this.$route.name == "notifications") {
        return notifications;
      }
      return notificationsOutline;
    },
    walletIcon() {
      if (this.$route.name == "wallet") {
        return wallet;
      }
      return walletOutline;
    },
    personIcon() {
      if (this.$route.name == "profile") {
        return person;
      }
      return personOutline;
    },
  },
};
</script>

<style scoped>
ion-toolbar {
  border-radius: 40px 40px 0px 0px;
  overflow: visible;
  --background: white;
  box-shadow: 0 -1px 2px #a0a0a0;
  /* url("../../../public/assets/stars/Stars.png") 0 0/100% 100% no-repeat; */
}
ion-button {
  --color: var(--ion-color-primary);
  --border-radius: 100%;
}

@media only screen and (max-width: 350px) {
  .no-left-padding {
    --padding-start: 0;
  }
  .no-right-padding {
    --padding-end: 0;
  }
  ion-toolbar {
    height: 65px;
    border-radius: 40px 40px 0px 0px;
    overflow: visible;
    --background: white;
  }
  ion-icon {
    font-size: 24px;
  }
}
</style>
