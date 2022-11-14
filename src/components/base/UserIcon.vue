<template>
  <ion-col size="auto">
    <img
      v-if="user.profilePhoto"
      :src="user.profilePhoto"
      class="rounded-thumbnail"
      :class="noBorder ? 'no-border': ''"
      :style="imgStyle"
    />
    <ion-icon
      v-else
      :icon="personCircleOutline"
      :style="iconStyle"
    />
  </ion-col>
</template>

<script>
import {
  IonIcon
} from '@ionic/vue'
import {
  personCircleOutline
} from 'ionicons/icons'

export default {
  name: 'UserIcon',
  props: {
    user: {
      type: Object,
      default: () => {}
    },
    size: {
      type: Number,
      default: 33
    },
    noBorder: {
      type: Boolean,
      default: false
    }
  },
  components: {
    IonIcon
  },
  setup () {
    return {
      personCircleOutline
    }
  },
  computed: {
    iconStyle() {
      return {
        'font-size': `${this.size}px`
      }
    },
    imgStyle() {
      return `width: ${this.size}px; height: ${this.size}px`
    }
  }
}
</script>

<style scoped>
ion-col{
  padding: 0;
}
.rounded-thumbnail {
  border-radius: 100%;
  border: solid white 2px;
}
.no-border {
  border: none;
}
.rounded-thumbnail.size-18 {
  --size: 18px;
}
.user-avatar {
  font-size: 33px;
}
.user-avatar.size-18 {
  font-size: 18px;
}
</style>
