<template>
  <ion-list>
    <ion-item-sliding v-for="comment in comments" :key="comment.id">
      <ion-item>
        <ion-thumbnail
          v-if="comment.user.profilePhoto"
          class="rounded-thumbnail"
        >
          <img :src="comment.user.profilePhoto" />
        </ion-thumbnail>
        <ion-icon
          v-else
          :icon="personCircleOutline"
          class="user-avatar"
          size="large"
        ></ion-icon>
        <ion-label class="ion-text-wrap">
          <ion-text color="primary">
            <h4 class="bold">{{ comment.user.displayName }}</h4>
          </ion-text>
          <p>{{ comment.comment }}</p>
          <ion-text color="secondary">
            <p>{{ getRelativePast(comment.date_added) }}</p>
          </ion-text>
        </ion-label>
      </ion-item>
      <ion-item-options side="end" v-if="isSelf">
        <ion-item-option @click="remove(comment.id)">
          <ion-icon :icon="trashOutline" size="large"></ion-icon>
        </ion-item-option>
      </ion-item-options>
    </ion-item-sliding>
  </ion-list>
</template>

<script>
import {
  IonList,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonLabel,
  IonText,
  IonThumbnail
} from '@ionic/vue'
import { trashOutline, personCircleOutline } from 'ionicons/icons'
import { useDreams } from '../../../stores/dreams'
import { getRelativePast } from '../../../helpers/time'
export default {
  props: ['id', 'isSelf'],
  components: {
    IonList,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonLabel,

    IonText,
    IonThumbnail
  },
  setup () {
    const dreamStore = useDreams()
    return { trashOutline, personCircleOutline, dreamStore, getRelativePast }
  },
  data () {
    return {}
  },
  computed: {
    comments () {
      return this.dreamStore.getDreamComments(this.id)
    }
  },
  methods: {
    async remove (id) {
      await this.dreamStore.removeDreamComment(id)
    },
    async loadDreamComments () {
      await this.dreamStore.loadDreamComments(this.id)
    }
  },
  mounted () {
    this.$nextTick(async () => {
      await this.loadDreamComments()
    })
  }
}
</script>

<style scoped>
.rounded-thumbnail {
  --border-radius: 100%;
  border: solid white 3px;
  --size: 56px;
}
</style>
