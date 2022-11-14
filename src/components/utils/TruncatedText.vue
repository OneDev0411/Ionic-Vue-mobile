<template>
  <div v-if="text">
    <div v-if="text.length <= limit">{{ text }}</div>
    <div v-else>
      <ion-text v-if="showMore" :class="textClassname">
        {{ text }} <a href="#" @click.prevent="showMore = false">Read Less</a>
      </ion-text>
      <div v-else>
        <ion-text :class="textClassname">{{ text.substring(0, limit) }}... </ion-text>
        <a href="#" @click.prevent="showMore = true" :class="linkClassname">Read More</a>
      </div>
    </div>
  </div>
</template>

<script>
import { IonText } from '@ionic/vue'
export default {
  props: {
    text: {
      type: String,
      default: "",
    },
    limit: {
      type: Number,
      default: 40,
    },
    textClassname: {
      type: String,
      default: ""
    },
    linkClassname: {
      type: String,
      default: ""
    }
  },
  components: {
    IonText
  },
  data() {
    return {
      showMore: false,
    };
  },
};
</script>
