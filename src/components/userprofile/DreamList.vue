<template>
  <ion-list v-if="dreams.length">
    <router-link
      v-for="dream in dreams"
      :key="dream.id"
      :to="{ name: 'dreamDetail', params: { id: dream.id } }"
    >
      <ion-item>
        <ion-thumbnail slot="start">
          <img :src="dream.image" />
        </ion-thumbnail>
        <ion-label class="ion-text-wrap">
          <ion-text color="primary">
            <h4 class="bold">{{ dream.title }}</h4>
          </ion-text>
          <p>{{ fixDescriptionLen(dream.description) }}</p>
          <ion-progress-bar
            color="primary"
            :value="dream.progress"
          ></ion-progress-bar>
        </ion-label>
      </ion-item>
    </router-link>
  </ion-list>
  <div v-else>
    <h6>Nothing here yet...</h6>
    <ion-button
      v-if="isSelf"
      fill="outline"
      class="create-dream-toolbar-button"
      color="secondary"
      router-link="/create-dream"
      >Create a Dream</ion-button
    >
  </div>
</template>

<script>
import {
  IonList,
  IonLabel,
  IonText,
  IonThumbnail,
  IonProgressBar,
} from "@ionic/vue";
import { useUser } from "../../stores/user";
import { useDreams } from "../../stores/dreams";

export default {
  props: ["userId"],
  components: {
    IonList,
    IonLabel,
    IonText,
    IonThumbnail,
    IonProgressBar,
  },
  setup() {
    const userStore = useUser();
    const dreamStore = useDreams();
    return { userStore, dreamStore };
  },
  methods: {
    fixDescriptionLen(text) {
      if (text.length <= 73) {
        return text;
      } else {
        return text.slice(0, 70) + "...";
      }
    },
    async loadDreams() {
      if (this.isSelf) {
        await this.dreamStore.loadUserDreams();
      } else {
        await this.dreamStore.loadUserDreams(this.userId);
      }
    },
  },
  computed: {
    dreams() {
      return this.dreamStore.getUserDreams(this.userId);
    },
    isSelf() {
      return this.userStore.id == this.userId;
    },
  },
  async mounted() {
    this.$nextTick(async () => {
      await this.loadDreams();
    });
  },
};
</script>

<style scoped></style>
