<template>
  <ion-grid>
    <ion-modal
      :is-open="open"
      class="auto-height"
      @click.self="$emit('closeModal')"
    >
      <div class="inner-content">
        <ion-grid>
          <ion-row>
            <ion-col>
              <ion-text class="problem-header">
                {{ headText }}
              </ion-text>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <ion-list lines="none">
                <ion-item
                  v-for="(reason, index) in reasonForReporting"
                  :key="index"
                  @click="selectReason(reason)"
                >
                  <ion-label
                    class="report-reason "
                    :class="reason === selectedReason ? 'report-reason-selected' : '' "
                  >
                    {{ reason }}
                  </ion-label>
                  <ion-icon
                    v-if="selectedReason === reason" :icon="checkmarkOutline"
                  />
                </ion-item>
              </ion-list>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <ion-button
                class="base-btn"
                :disabled="selectedReason === ''"
                @click="continueToReport"
              >
                Continue
              </ion-button>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <ion-button
                class="base-btn base-btn-outline"
                @click="$emit('closeModal')"
              >
                Cancel
              </ion-button>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
    </ion-modal>

    <confirmation-modal
      :open="showReportConfirmation"
      :text="confirmationText ? confirmationText : `Are you sure you want to report this?`"
      @onOkay="report"
      @onClose="toggleShowReportConfirmation"
    />
  </ion-grid>
</template>

<script>
import {
  IonButton,
  IonCol,
  IonGrid,
  IonModal,
  IonRow,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonText
} from '@ionic/vue'
import {
  checkmarkOutline
} from 'ionicons/icons'
import ConfirmationModal from '../base/ConfirmationModal'
export default {
  name: 'ReportDream',
  props: {
    open: {
      type: Boolean,
      default: false
    },
    confirmationText: {
      type: String
    },
    headText: {
      type: String,
      default: `Please select a problem`
    }
  },
  emits: ['closeModal', 'reportItem'],
  components: {
    ConfirmationModal,
    IonButton,
    IonCol,
    IonGrid,
    IonModal,
    IonRow,
    IonList,
    IonItem,
    IonLabel,
    IonIcon,
    IonText
  },
  setup () {
    return {
      checkmarkOutline
    }
  },
  data () {
    return {
      showReportConfirmation: false,
      selectedReason: '',
      reasonForReporting: [
        'Sexual Activity',
        'Harassment',
        'Bullying',
        'Violence',
        'Misinformation',
        'Copy Violations',
        'Fraud User',
        'Inappropriate Content Involving a Minor'
      ]
    }
  },
  methods: {
    continueToReport () {
      this.toggleShowReportConfirmation()
      this.$emit('closeModal')
    },
    report () {
      // TODO: Report item here
      this.toggleShowReportConfirmation()
      this.$emit('reportItem', this.$event, this.selectedReason)
    },
    selectReason (reason) {
      this.selectedReason = reason
    },
    toggleShowReportConfirmation () {
      this.showReportConfirmation = !this.showReportConfirmation
    }
  }
}
</script>

<style scoped>
ion-grid,ion-row, ion-col{
  padding: 0;
}
ion-grid {
  margin: 0;
}
ion-modal {
  --height: fit-content;
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
ion-button.base-btn-outline {
  margin-top: 16px;
  --color: #787C80;
  --background-focused: none;
  --background-hover: none;
  --border-color: #D1D1D6;
  --background: #FFFFFF;
  border: 1px solid #D1D1D6;
  border-radius: 16px;
}
ion-text.problem-header {
  margin-bottom: 20px;
  font-size: 16px;
  line-height: 20px;
  font-weight: 700;
}
ion-list {
  background: transparent;
}
ion-label.report-reason {
  font-size: 16px;
  line-height: 20px;
  padding: 5px 0;
}
ion-label.report-reason-selected {
  color: #866EE1;
  font-weight: 700;
  line-height: 22px;
}
</style>
