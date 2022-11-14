<template>
  <ion-row v-for="comment in comments" :key="comment.id">
    <ion-col>
      <ion-row>
        <ion-col size="1">
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
            size="small"
          ></ion-icon>
        </ion-col>
        <ion-col class="center-align-col">
          <b>{{ comment.user.displayName }}</b>
        </ion-col>
        <ion-col>
          <ion-button
            size="small"
            class="ion-float-right no-padding-end"
            fill="flat"
          >
            <ion-icon :icon="ellipsisVertical"></ion-icon>
          </ion-button>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col offset="1" class="grey-background">
          <p>{{ comment.comment }}</p>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col offset="1">
          <ion-text color="secondary">
            <p>{{ getRelativePast(comment.date_added) }}</p>
          </ion-text>
        </ion-col>
      </ion-row>
    </ion-col>

    <!-- <ion-item-options side="end" v-if="isSelf">
        <ion-item-option @click="remove(comment.id)">
          <ion-icon :icon="trashOutline" size="large"></ion-icon>
        </ion-item-option>
      </ion-item-options> -->
  </ion-row>
</template>

<script>
import { IonText, IonThumbnail } from '@ionic/vue'
import {
  trashOutline,
  personCircleOutline,
  ellipsisVertical
} from 'ionicons/icons'
import { useDreams } from '../../../stores/dreams'
import { getRelativePast } from '../../../helpers/time'
export default {
  props: ['id', 'isSelf'],
  components: {
    IonText,
    IonThumbnail
  },
  setup () {
    const dreamStore = useDreams()
    return {
      trashOutline,
      personCircleOutline,
      ellipsisVertical,
      dreamStore,
      getRelativePast
    }
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
  --size: 33px;
}
.grey-background {
  background-color: #dcd9e6;
  border-radius: 8px;
}
/* ion-row {
  background-color: #ffff;
}
ion-button {
  --background: #ffff;
} */

.center-align-col {
  margin: auto;
  margin-left: 6px;
}
.no-padding-end {
  --padding-end: 0;
}
</style>
