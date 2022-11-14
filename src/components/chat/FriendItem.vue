<template>
  <ion-item-sliding>
    <ion-item>
      <router-link
        v-if="user.id"
        :to="{ name: 'profile', params: { id: user.id } }"
      >
        <ion-thumbnail
          slot="start"
          v-if="user.profilePhoto"
          class="rounded-thumbnail"
        >
          <img :src="user.profilePhoto" />
        </ion-thumbnail>
        <ion-icon
          v-else
          slot="start"
          :icon="personCircleOutline"
          size="large"
        ></ion-icon>
      </router-link>
      <ion-label class="ion-text-wrap">
        <router-link
          v-if="user.id"
          :to="{ name: 'chatDetail', params: { id: user.id } }"
        >
          <ion-text color="primary">
            <h2>
              Have a chat with <b>{{ user.displayName }}</b>
            </h2>
          </ion-text>
          <ion-text color="primary">
            <h4>Last mesage:</h4>
          </ion-text>
        </router-link>
      </ion-label>
    </ion-item>
    <ion-item-options side="end">
      <ion-item-option @click="rejectFriendRequest(user.id)">
        <ion-icon :icon="trashOutline" size="large"></ion-icon>
      </ion-item-option>
    </ion-item-options>
  </ion-item-sliding>
</template>

<script>
import {
  personCircleOutline,
  trashOutline,
  checkmarkCircleOutline,
} from "ionicons/icons";
import {
  IonItemSliding,
  IonItemOption,
  IonItemOptions,
  IonText,
  IonLabel,
  IonThumbnail,
} from "@ionic/vue";
export default {
  components: {
    IonItemSliding,
    IonItemOption,
    IonItemOptions,

    IonText,
    IonLabel,
    IonThumbnail,
  },
  props: {
    user: {
      type: Object,
      required: true,
    },
    rejectFriendRequest: {
      type: Function,
      required: true,
    },
  },
  setup() {
    return {
      personCircleOutline,
      trashOutline,
      checkmarkCircleOutline,
    };
  },
};
</script>

<style scoped>
.rounded-thumbnail {
  --border-radius: 100%;
  border: solid white 5px;
  --size: 64px;
}
</style>
