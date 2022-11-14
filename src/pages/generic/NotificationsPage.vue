<template>
  <base-layout page-title="Notifications">
    <dream-filter-tabs
      @tab-selected="setTab"
      :selectable="['All', 'Invites', 'Dreams', 'Orders']"
    ></dream-filter-tabs>
    <ion-list>
      <ion-item-sliding v-for="notification in notifications" :key="notification.id">
        <ion-grid>
          <ion-row>
            <ion-col size="1">
              <ion-icon :icon="informationCircleOutline" size="large"></ion-icon>
            </ion-col>
            <ion-col>
              <ion-text class="ion-text-wrap">
                <h5 style="margin-top: 3px">
                  {{ getNotificationText(notification) }}
                </h5>
              </ion-text>
            </ion-col>

            <ion-col size="2">
              <ion-label>
                <ion-text color="secondary">
                  <p>
                    {{ getRelativePast(Date.parse(notification.created)) }}
                  </p>
                </ion-text>
              </ion-label>
            </ion-col>
          </ion-row>
        </ion-grid>
        <!-- <ion-text color="primary">
            <h4 class="bold">{{ notification.title }}</h4>
          </ion-text>
          <p>{{ notification.description }}</p> -->
        <ion-item-options side="end">
          <ion-item-option @click="remove(notification.id)">
            <ion-icon :icon="trashOutline" size="large"></ion-icon>
          </ion-item-option>
        </ion-item-options>
      </ion-item-sliding>
    </ion-list>
  </base-layout>
</template>

<script>
import { useNotifications } from "../../stores/notification";
import {
  IonItemSliding,
  IonList,
  IonLabel,
  IonText,
  IonItemOption,
  IonItemOptions,
} from "@ionic/vue";
import { informationCircleOutline, trashOutline } from "ionicons/icons";

import { getRelativePast } from "../../helpers/time";
import DreamFilterTabs from "../../components/landingpage/DreamFilterTabs.vue";
export default {
  setup() {
    const notificationStore = useNotifications();
    return {
      notificationStore,
      informationCircleOutline,
      trashOutline,
      getRelativePast,
    };
  },
  components: {
    IonItemSliding,
    IonList,
    IonLabel,
    IonText,
    IonItemOption,
    IonItemOptions,
    DreamFilterTabs,
  },
  data() {
    return {
      selectedTab: "All",
    };
  },
  methods: {
    remove(id) {
      console.log(id);
      this.notificationStore.removeNotification(id);
    },
    setTab(tabName) {
      console.log("setTab", tabName);
      this.selectedTab = tabName;
    },
    getNotificationText(notification) {
      if (notification.verb === "invited") {
        return `You were invited to join the dream "${notification.title}"`;
      } else if (notification.verb === "dream") {
        return `You were invited to join the dream "${notification.title}"`;
      } else if (notification.verb === "order") {
        return `You were invited to join the dream "${notification.title}"`;
      } else if (notification.verb === "bookmarked dream") {
        return `${notification.user_display_name} bookmarked your dream "${notification.target.title}"`;
      } else if (notification.verb === "commented dream") {
        return `${notification.user_display_name} comented on your dream "${notification.target.title}"`;
      } else if (notification.verb === "liked dream") {
        return `${notification.user_display_name} liked your dream "${notification.target.title}"`;
      } else {
        return "";
      }
    },
  },
  computed: {
    notifications() {
      if (this.selectedTab == "Invites") {
        return this.notificationStore.getNotifications.filter(
          (notification) => notification.type == "invite"
        );
      } else if (this.selectedTab == "Dreams") {
        return this.notificationStore.getNotifications.filter(
          (notification) => notification.type == "dream"
        );
      } else if (this.selectedTab == "Orders") {
        return this.notificationStore.getNotifications.filter(
          (notification) => notification.type == "order"
        );
      } else {
        return this.notificationStore.getNotifications;
      }
    },
  },
  mounted() {
    this.$nextTick(async () => {
      await this.notificationStore.loadNotifications();
    });
  },
};
</script>

<style scoped>
.bold {
  font-weight: bold;
}
ion-list {
  --ion-item-background: var(--ion-background-color);
}
</style>
