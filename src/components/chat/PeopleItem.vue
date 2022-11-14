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
          :to="{ name: 'profile', params: { id: user.id } }"
        >
          <ion-text color="primary">
            <h2>
              Click to wiew <b>{{ user.displayName }}</b> profile
            </h2>
          </ion-text>
        </router-link>
      </ion-label>
    </ion-item>
  </ion-item-sliding>
</template>

<script>
import {
  personCircleOutline,
  trashOutline,
  checkmarkCircleOutline,
} from "ionicons/icons";
import { IonItemSliding, IonText, IonLabel, IonThumbnail } from "@ionic/vue";
export default {
  components: {
    IonItemSliding,

    IonText,
    IonLabel,
    IonThumbnail,
  },
  props: {
    user: {
      type: Object,
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
