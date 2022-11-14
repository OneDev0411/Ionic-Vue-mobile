<template>
  <ion-modal
    :is-open="open"
    class="auto-height"
    @click.self="$emit('closeModal')"
  >
    <div class="inner-content">
      <ion-grid>
        <ion-row>
          <ion-col class="ion-text-center">
            <img
              v-if="type === 'success'"
              src="../../assets/icons/checkmark-green.png"
              alt=""
              class="notice-icon"
            />
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <div class="confirmation-text">
              {{ text }}
            </div>
          </ion-col>
        </ion-row>
      </ion-grid>
    </div>
  </ion-modal>
</template>

<script>
import {
  IonCol,
  IonGrid,
  IonModal,
  IonRow
} from '@ionic/vue'

export default {
  name: 'NoticeModal',
  props: {
    type: {
      type: String,
      default: 'success'
    },
    open: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: 'Yes'
    },
    okayText: {
      type: String,
      default: 'Yes'
    },
    cancelText: {
      type: String,
      default: 'No'
    }
  },
  emits: ['closeModal'],
  components: {
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
.confirmation-text {
  text-align: center;
  padding: 0 10px;
  font-size: 18px;
  line-height: 25px;
  font-weight: 700;
}
.notice-icon {
  margin-bottom: 20px;
  width: 36px;
  height: 36px;
}
</style>
