<template>
  <ion-row class="ion-justify-content-between ion-align-items-center">
    <ion-col size="auto">
      <ion-buttons class="ion-align-items-center">
        <ion-button fill="clear" class="card-header-btn" @click="setLike">
          <img
            v-if="!dream.like"
            class="card-header-icon"
            src="../../assets/icons/star.svg" alt=""
          >
          <img
            v-else
            class="card-header-icon"
            src="../../assets/icons/star-filled.svg"
            alt=""
          >
          {{ dream.total_likes }}
        </ion-button>

        <ion-button fill="clear" class="card-header-btn" :router-link="{ name: 'dreamDetail', params: { id: dream.id }, hash: '#comments' }">
          <img
            class="card-header-icon"
            src="../../assets/icons/chat.svg"
            alt=""
          >
          {{ commentsLength }}
        </ion-button>

        <ion-button fill="clear" class="card-header-btn" @click="$emit('shareDream')">
          <img src="../../assets/icons/share.svg" alt="" height="20">
        </ion-button>
      </ion-buttons>
    </ion-col>
    <ion-col size="auto">
        <ion-button v-if="!dream.like" class="ion-float-right support-btn" @click="$emit('supportDream')"> Support </ion-button>
        <ion-button
          v-else
          class="support-btn-alt"
          @click="$emit('supportDream')"
        >
          Supporting
          <ion-icon
            size="small"
            :icon="checkmarkOutline"
          />
        </ion-button>
    </ion-col>
  </ion-row>
</template>

<script>
import { IonButtons } from '@ionic/vue'
import {
  starOutline,
  chatbubbleEllipsesOutline,
  checkmarkOutline,
  bookmarkOutline,
  shareOutline,
  bookmark,
  star
} from 'ionicons/icons'

import { useDreams } from '../../stores/dreams'

export default {
  props: ['dream'],
  emits: ['supportDream', 'shareDream'],
  components: {
    IonButtons
  },
  setup () {
    const dreamStore = useDreams()
    return {
      starOutline,
      chatbubbleEllipsesOutline,
      bookmarkOutline,
      shareOutline,
      checkmarkOutline,
      dreamStore,
      bookmark,
      star
    }
  },
  data () {
    return {
      bookmarkValue: false
    }
  },
  methods: {
    async setBookmark () {
      await this.dreamStore.setBookmark({
        id: this.dream.id
      })
    },
    async setLike () {
      await this.dreamStore.setLike({
        id: this.dream.id
      })
    },
    commentOnDream () {
      this.$router.push({
        name: 'dreamDetail',
        params: { id: this.dream.id },
        hash: '#comments'
      })
    }
  },
  computed: {
    commentsLength () {
      return this.dreamStore.getDreamComments(this.dream.id).length
    }
  }
}
</script>

<style scoped>
ion-icon {
  margin-right: 5px;
}
ion-button.support-btn {
  /*padding: 15px 30px;*/

  --padding-top: 15px;
  --padding-bottom: 15px;
  margin: 0;
  font-size: 14px;
  line-height: 18px;
  text-transform: capitalize;
  --border-radius: 8px;
  --font-weight: 600;
  --box-shadow: none;
}

ion-button.support-btn-alt {
  --padding-top: 15px;
  --padding-bottom: 15px;
  --padding-start: 10px;
  --padding-end: 5px;
  margin: 0;
  font-size: 14px;
  line-height: 18px;
  text-transform: capitalize;
  --background: #FFFFFF;
  --border-radius: 8px;
  --font-weight: 600;
  --box-shadow: none;
  --color: #31265A;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid #31265A;
}
ion-button.support-btn-alt ion-icon {
  margin-left: 10px;
}

.card-header-icon {
  font-size: 24px;
  margin-right: 7.5px;
}
.card-header-btn {
  font-size: 16px;
}

@media only screen and (max-width: 350px) {
  .card-header-icon {
    font-size: 18px;
    color: var(--ion-color-primary);
  }
  .card-header-btn {
    font-size: 14px;
  }
}
</style>
