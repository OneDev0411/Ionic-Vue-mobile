<template>
  <ion-modal
    :is-open="open"
    :initial-breakpoint="0.25"
    class="auto-height"
    @click.self="$emit('closeModal')"
  >
    <div class="menu-container">
      <ion-grid>
        <ion-row>
          <ion-col>
            <ion-list lines="none">
              <ion-item v-if="!isSelf" @click="reportComment">
                <ion-icon
                  class="item-icon"
                  :icon="alertCircleOutline"
                />
                <ion-label>
                  Report Comment
                </ion-label>
              </ion-item>
              <ion-item v-else @click="hideComment">
                <ion-icon
                  class="item-icon"
                  :icon="alertCircleOutline"
                />
                <ion-label>
                  Hide Comment
                </ion-label>
              </ion-item>
              <ion-item @click="deleteComment">
                <img
                  class="item-icon"
                  src="../../assets/icons/delete.svg" alt=""
                >
                <ion-label class="danger-text">
                  Delete Comment
                </ion-label>
              </ion-item>
            </ion-list>
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
  IonItem,
  IonLabel,
  IonList,
  IonModal
} from '@ionic/vue'
import {
  alertCircleOutline
} from 'ionicons/icons'

export default {
  name: 'CommentMenu',
  props: {
    open: {
      type: Boolean,
      default: false
    },
    isSelf: {
      type: Boolean,
      required: true
    }
  },
  emits: ['closeModal', 'deleteComment', 'reportComment', 'hideComment'],
  components: {
    IonGrid,
    IonCol,
    IonLabel,
    IonList,
    IonItem,
    IonModal
  },
  setup () {
    return {
      alertCircleOutline
    }
  },
  data () {
    return {
      showReportCommentConfirmationModal: false
    }
  },
  methods: {
    deleteComment () {
      this.$emit('closeModal')
      this.$emit('deleteComment')
    },
    hideComment () {
      this.$emit('closeModal')
      this.$emit('hideComment')
    },
    reportComment () {
      this.$emit('reportComment')
      this.$emit('closeModal')
    }
  }
}
</script>

<style scoped>
ion-grid,ion-row,ion-col {
  padding: 0;
}
ion-grid {
  padding: 20px 20px 0;
}
ion-modal {
  /*--height: fit-content;*/
  --width: 100%;
  --border-radius: 16px;
  --box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  background: #1A181E66;
}
/*ion-modal::part(backdrop) {*/
/*  background: #1A181E66;*/
/*}*/
/*ion-content.menu-container {*/
/*  !*padding: 45px 20px 40px;*!*/

/*  --padding-top: 45px;*/
/*  --padding-bottom: 40px;*/
/*  --padding-start: 20px;*/
/*  --padding-end: 20px;*/
/*}*/
ion-list {
  margin-top: 20px;
}
.item-icon {
  margin-right: 12px;
}
ion-item {
  --backgound: #FFFFFF;
  border-bottom: 1px solid #E9ECF0;
}
ion-button {
  text-transform: none;
}
.danger-text {
  color: #FF6363;
}
</style>
