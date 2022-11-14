<template>
  <ion-modal
    :is-open="open"
    class="auto-height"
    @click.self="$emit('closeModal')"
  >
    <div class="inner-content">
      <ion-grid>
        <ion-row>
          <ion-col>
            <div class="confirmation-text-head">
              {{ textHead }}
            </div>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <div class="confirmation-text-main">
              {{ textMain }}
            </div>
          </ion-col>
        </ion-row>
        <ion-row class="ion-justify-content-between ion-align-items-center">
          <ion-col size="auto">
            <ion-button fill="clear" class="" @click="$emit('onClose')">
              {{ cancelText ? cancelText : 'Cancel' }}
            </ion-button>
          </ion-col>
          <ion-col size="auto">
            <ion-button fill="clear" :class="dangerAction ? 'color-red' : ''" @click="$emit('onOkay')">
              {{ okayText ? okayText : 'Yes' }}
            </ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
    </div>
  </ion-modal>
</template>

<script>
import {
  IonButton,
  IonCol,
  IonGrid,
  IonModal,
  IonRow
} from '@ionic/vue'

export default {
  name: 'ConfirmationModalWithTextBtn',
  props: {
    open: {
      type: Boolean,
      default: false
    },
    textHead: {
      type: String,
      default: 'Yes'
    },
    textMain: {
      type: String,
      default: 'Cancel'
    },
    okayText: {
      type: String,
      default: 'Yes'
    },
    cancelText: {
      type: String,
      default: 'No'
    },
    dangerAction: {
      type: Boolean,
      default: false
    }
  },
  emits: ['onOkay', 'onClose'],
  components: {
    IonButton,
    IonCol,
    IonGrid,
    IonModal,
    IonRow
  }
}
</script>

<style scoped>
ion-row, ion-col{
  padding: 0;
}
ion-modal {
  --height: auto;
  --width: 90%;
  --border-radius: 16px;
  --box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  background: #1A181E66;

}
ion-modal::part(backdrop) {
  background: #1A181E66;
}
.inner-content {
  padding: 20px;
  background: #F9F8FF;
}
.confirmation-text-head {
  text-align: center;
  font-size: 18px;
  line-height: 25px;
  font-weight: 700;
  margin-bottom: 6px;
}
.confirmation-text-main {
  text-align: center;
  font-size: 16px;
  line-height: 20px;
  font-weight: 500;
  margin-bottom: 40px;
  color: #323538;
}
ion-button {
  background-color: transparent;
  background: transparent;
  --background: transparent;
  color: #787C80;
}
.color-red {
  color: #FF6363;
}
</style>
