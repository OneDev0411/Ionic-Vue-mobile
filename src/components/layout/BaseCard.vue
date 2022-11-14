<template>
  <ion-card>
    <slot name="header"></slot>
    <ion-thumbnail :class="boxedImage ? 'boxed' : 'full-width'">
      <slot name="image"></slot>
    </ion-thumbnail>
    <slot name="content"></slot>
    <slot></slot>
  </ion-card>
</template>

<script>
import { IonCard, IonThumbnail } from '@ionic/vue'

import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    boxedImage: {
      type: Boolean,
      default: false
    }
  },
  components: {
    IonCard,
    IonThumbnail
  },
  setup () {
    return {}
  }
})
</script>

<style scoped>
ion-card {
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0px 4px 15px rgba(14, 12, 18, 0.08);
}
.full-width {
  width: 100%;
  --size: 250px;
}
.boxed {
  width: 100%;
  max-width: 500px;
  margin: 20px 0;
  --border-radius: 16px;
  /*--size: 200px;*/
  height: 204px;
}
@media only screen and (max-width: 350px) {
  ion-card {
    margin-left: 4px;
    margin-right: 4px;
  }
}
</style>
