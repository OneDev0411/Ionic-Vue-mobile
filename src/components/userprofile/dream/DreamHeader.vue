<template>
  <ion-grid>
    <ion-row class="center-items">
      <ion-col>
        <ion-button
          class="profile-button"
          fill="clear"
          size="small"
          @click="navigateToProfile(dream.user)"
        >
          <ion-thumbnail
            v-if="dream.user.profilePhoto"
            class="rounded-thumbnail"
          >
            <img :src="dream.user.profilePhoto" />
          </ion-thumbnail>
          <ion-icon v-else :icon="personCircleOutline"></ion-icon>
          {{ dream.user.displayName }}
        </ion-button>
      </ion-col>
      <ion-col>
        <ion-text>Created: {{ getRelativePast(dream.date_added) }}</ion-text>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script>
import { IonThumbnail, IonText } from '@ionic/vue'
import { personCircleOutline } from 'ionicons/icons'

import { useDreams } from '../../../stores/dreams'
import { getRelativePast } from '../../../helpers/time'

export default {
  props: ['dream'],
  components: {
    IonThumbnail,
    IonText
  },
  setup () {
    const dreamStore = useDreams()
    return {
      dreamStore,
      personCircleOutline,
      getRelativePast
    }
  },
  data () {
    return {
      bookmarkValue: false
    }
  },
  methods: {
    navigateToProfile (user) {
      this.$router.push({
        name: 'profile',
        params: { id: user.id }
      })
    }
  }
}
</script>

<style scoped>
.rounded-thumbnail {
  --border-radius: 100%;
  border: solid white 1px;
  /* transform: translate(0%, -115%); */
  --size: 26px;
  --font-size: 26px;
}
.profile-button {
  color: rgb(145, 145, 145);
}
.center-items {
  display: flex;
  align-items: center;
  justify-content: center;
}

ion-text {
  font-size: 15px;
}
@media only screen and (max-width: 350px) {
  .card-header-icon {
    font-size: 18px;
  }
  .card-header-btn {
    font-size: 14px;
    --padding-start: 6px;
    --padding-end: 0;
  }
}
</style>
