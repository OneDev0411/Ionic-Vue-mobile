<template>
  <ion-col>
    <ion-buttons>
      <ion-button fill="clear" class="card-header-btn" @click="setLike">
        <ion-icon
          v-if="dream.like"
          class="card-header-icon color"
          :icon="star"
        ></ion-icon>
        <ion-icon
          v-else
          :icon="starOutline"
          class="card-header-icon"
        ></ion-icon>
        {{ dream.total_likes }}
      </ion-button>

      <router-link
        :to="{
          name: 'dreamDetail',
          params: { id: dream.id },
          hash: '#comments',
        }"
      >
        <ion-button fill="clear" class="card-header-btn grey">
          <ion-icon
            :icon="chatbubbleOutline"
            class="card-header-icon grey"
          ></ion-icon>
          {{ commentsLength }}
        </ion-button>
      </router-link>

      <!-- <ion-col offset>
    <ion-button fill="clear" @click="setBookmark" class="card-header-btn">
      <ion-icon
        v-if="dream.bookmark"
        slot="icon-only"
        class="card-header-icon no-right-padding"
        :icon="bookmark"
      ></ion-icon>
      <ion-icon
        v-else
        slot="icon-only"
        class="card-header-icon ion-float-right"
        :icon="bookmarkOutline"
      ></ion-icon>
    </ion-button>
  </ion-col> -->

      <ion-button fill="clear" router-link="/chat" class="card-header-btn">
        <!-- <ion-icon
          class="card-header-icon"
          :icon="shareSocialOutline"
        ></ion-icon> -->
        <img src="/assets/icon/out.svg" />
      </ion-button>
    </ion-buttons>
  </ion-col>
  <ion-col>
    <router-link
      :to="{
        name: 'dreamDetail',
        params: { id: dream.id },
        query: { support: true },
      }"
    >
      <ion-button class="ion-float-right">Support</ion-button>
    </router-link>
  </ion-col>
</template>

<script>
import { IonButtons } from '@ionic/vue'
import {
  starOutline,
  chatbubbleOutline,
  bookmarkOutline,
  shareSocialOutline,
  bookmark,
  star
} from 'ionicons/icons'

import { useDreams } from '../../../stores/dreams'

export default {
  props: ['dream'],
  components: {
    IonButtons
  },
  setup () {
    const dreamStore = useDreams()
    return {
      starOutline,
      chatbubbleOutline,
      bookmarkOutline,
      shareSocialOutline,

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
.card-header-icon {
  font-size: 24px;
}
.color {
  color: #866ee1;
}
.card-header-btn {
  font-size: 16px;
}

.grey {
  color: #787c80;
}

@media only screen and (max-width: 350px) {
  .card-header-icon {
    font-size: 18px;
  }
  .card-header-btn {
    font-size: 14px;
  }
}
</style>
