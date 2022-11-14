<template>
  <ion-grid>
    <ion-row class="ion-justify-content-between ion-align-items-center">
      <ion-col>
        <router-link :to="{ name: 'profile', params: { id: dream.user.id } }">
            <ion-row class="ion-justify-content-start ion-align-items-center">
              <UserIcon
                :user="dream.user"
                :size="18"
              />
              <ion-col size="auto">
                <ion-text class="display-name">
                  {{ dream.user.displayName }}
                </ion-text>
              </ion-col>
            </ion-row>
        </router-link>
      </ion-col>
      <ion-col size="auto">
        <ion-text class="created-date">Created: {{ getRelativePast(dream.date_added) }}</ion-text>
      </ion-col>
    </ion-row>

  </ion-grid>
</template>

<script>
import { IonText } from '@ionic/vue'
import { personCircleOutline } from 'ionicons/icons'

import { useDreams } from '../../stores/dreams'
import { getRelativePast } from '../../helpers/time'
import UserIcon from '../base/UserIcon'

export default {
  props: {
    dream: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    UserIcon,
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
  }
}
</script>

<style scoped>
ion-grid, ion-col {
  padding: 0;
}
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
  font-size: 12px;
  line-height: 15px;
  font-weight: 400;
  color: #787C80;
}
ion-text.display-name {
  font-weight: 500;
  margin-left: 5px;
}
.card-header-icon {
  font-size: 18px;
}
@media only screen and (max-width: 350px) {
  .card-header-btn {
    font-size: 14px;
    --padding-start: 6px;
    --padding-end: 0;
  }
}
</style>
