<template>
  <swiper
    :space-between="20"
    :initial-slide="startingIndex"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
    class="dark-background"
  >
    <swiper-slide v-for="dream in dreams" :key="dream.id">
      <base-card class="reduced-height">
        <template v-slot:image>
          <ion-img :src="dream.image"></ion-img>
          <ion-grid>
            <ion-row>
              <ion-col class="padded">
                <ion-text>
                  <h4>
                    <b>
                      {{ dream.title }}
                    </b>
                  </h4>
                </ion-text>
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col>
                <ion-button
                  class="profile-button"
                  fill="clear"
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
            </ion-row>
            <ion-row>
              <ion-col>
                <ion-button
                  fill="clear"
                  class="card-header-btn no-left-padding"
                  @click="setLike(dream.id)"
                >
                  <ion-icon
                    v-if="dream.like"
                    class="card-header-icon"
                    :icon="star"
                  ></ion-icon>
                  <ion-icon
                    v-else
                    :icon="starOutline"
                    class="card-header-icon"
                  ></ion-icon>
                  {{ dream.total_likes }}
                </ion-button>
              </ion-col>
              <ion-col>
                <router-link
                  :to="{
                    name: 'dreamDetail',
                    params: { id: dream.id },
                    hash: '#comments',
                  }"
                >
                  <ion-button
                    fill="clear"
                    class="card-header-btn no-left-padding"
                  >
                    <ion-icon
                      :icon="chatbubbleOutline"
                      class="card-header-icon"
                    ></ion-icon>
                    {{ commentsLength }}
                  </ion-button>
                </router-link>
              </ion-col>
            </ion-row>
          </ion-grid>
        </template>
        <template v-slot:header>
          <div></div>
        </template>
        <template v-slot:content>
          <div></div>
        </template>
      </base-card>
    </swiper-slide>
  </swiper>
</template>

<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'

import {
  chevronBackOutline,
  trashOutline,
  chatbubbleOutline,
  starOutline,
  star,
  personCircleOutline
} from 'ionicons/icons'

import BaseCard from '../../layout/BaseCard.vue'
// Import Swiper styles
import 'swiper/css'
import { useDreams } from '../../../stores/dreams'

export default {
  components: {
    Swiper,
    SwiperSlide,

    BaseCard
  },
  props: ['dreams', 'startingIndex'],
  setup () {
    const dreamStore = useDreams()
    return {
      dreamStore,
      chevronBackOutline,
      trashOutline,
      personCircleOutline,
      chatbubbleOutline,
      starOutline,
      star
    }
  },
  data () {
    return {}
  },
  methods: {
    onSwiper (swiper) {
      console.log(swiper)
    },
    onSlideChange () {
      console.log('slide change')
    },
    navigateToProfile (user) {
      this.$router.push({
        name: 'profile',
        params: { id: user.id }
      })
    },
    async setLike (id) {
      await this.dreamStore.setLike({
        id
      })
    }
  },
  computed: {
    commentsLength (id) {
      return this.dreamStore.getDreamComments(id).length
    }
  }
}
</script>

<style scoped>
/* .center-vertically {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
} */
ion-grid {
  position: absolute;
  bottom: 0;
}
.reduced-height {
  height: 230px;
}

.dark-background {
  background-color: rgb(241 241 241);
}
.rounded-thumbnail {
  --border-radius: 100%;
  border: solid white 1px;
  /* transform: translate(0%, -115%); */
  --size: 24px;
}
ion-text {
  color: var(--ion-color-primary-contrast);
}
ion-icon {
  font-size: 24px;
}
ion-col {
  padding: 0;
  height: 46px;
}
ion-col.padded {
  padding-left: 11px;
}
ion-grid {
  margin-right: 20px;
}
.profile-button {
  color: var(--ion-color-primary-contrast);
}
ion-button {
  color: var(--ion-color-primary-contrast);
}
.card-header-icon {
  font-size: 24px;
}
</style>
