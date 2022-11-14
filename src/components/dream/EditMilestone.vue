<template>
  <ion-modal
    :is-open="open"
    class="auto-height"
    @click.self="$emit('closeModal')"
  >
    <ion-content class="inner-content">
      <div class="inner-div">
        <ion-grid>
        <ion-row>
          <ion-col>
            <ion-label class="input-label" position="stacked">
              Name
            </ion-label>
            <ion-item>
              <ion-input v-model="editedMilestone.title" placeholder="Milestone Title"></ion-input>
            </ion-item>
          </ion-col>
        </ion-row>
        <ion-row class="textarea-row">
          <ion-col class="dream-item">
            <ion-label position="stacked" class="input-label">Description:</ion-label>
            <ion-item style="height: 130px;">
              <ion-textarea
                v-model="editedMilestone.description"
                rows="6"
                placeholder="Write Description, be clear..."
              />
            </ion-item>
          </ion-col>
        </ion-row>

        <ion-row>

          <ion-col size="5.5">
            <ion-label class="input-label" position="stacked">Start Date</ion-label>
            <ion-item button="true" @click="toggleShowStartDate">
              <ion-label>{{ editedMilestone.startDate }}</ion-label>
              <ion-text></ion-text>
              <ion-icon :icon="calendarOutline"></ion-icon>
              <ion-modal :is-open="isStartDateOpen" class="datetime-modal" :initial-breakpoint="0.3" handle-behavior="cycle">
                <ion-button fill="clear" class="confirm-button" @click="confirmStartDate">Confirm</ion-button>
                <ion-datetime
                  :value="editedMilestone.startDate"
                  v-model="editedMilestone.startDate"
                  ref="customStartDate"
                  presentation="date"
                  prefer-wheel="true"
                  class="datetime-picker"
                >
                </ion-datetime>
              </ion-modal>
            </ion-item>
          </ion-col>
          <ion-col offset="1" size="5.5">
            <ion-label class="input-label" position="stacked">End Date:</ion-label>
            <ion-item button="true" @click="toggleShowEndDate">
              <ion-label>{{ editedMilestone.endData }}</ion-label>
              <ion-text></ion-text>
              <ion-icon :icon="calendarOutline"></ion-icon>
              <ion-modal :is-open="isEndDateOpen" :initial-breakpoint="0.3" handle-behavior="cycle">
                <ion-button fill="clear" class="confirm-button" @click="confirmEndDate">Confirm</ion-button>
                <ion-datetime
                  presentation="date"
                  :value="editedMilestone.endData"
                  v-model="editedMilestone.endData"
                  ref="customEndDate"
                  prefer-wheel="true"
                  class="datetime-picker"
                >
                </ion-datetime>
              </ion-modal>
            </ion-item>
          </ion-col>
        </ion-row>
        <ion-row class="ion-align-items-center ion-justify-content-between">
          <ion-col size="auto" class="ion-align-items-center">
            <ion-text class="milestone-funded-amount">$120.00</ion-text>
            <ion-text class="milestone-funded-text">Milestone Funded</ion-text>
          </ion-col>
          <ion-col size="auto">
            <ion-button :router-link="`/fund/${milestone.id}`" fill="clear" @click="$emit('closeModal')">
              <img src="../../assets/icons/plus_squared.svg" class="" />
            </ion-button>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-button
              class="base-btn"
              @click="editMilestone"
            >
              Done
            </ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
      </div>
    </ion-content>
  </ion-modal>
</template>

<script>
import {
  IonButton,
  IonCol,
  IonGrid,
  IonInput,
  IonModal,
  IonRow,
  IonTextarea,
  IonLabel,
  IonText,
  IonDatetime
} from "@ionic/vue";
import  {
  calendarOutline
} from 'ionicons/icons'

export default {
  name: "EditMilestone",
  props: {
    open: {
      type: Boolean,
      default: false
    },
    milestone: {
      type: Object,
      required: true
    }
  },
  emits: ['closeModal'],
  components: {
    IonCol,
    IonGrid,
    IonModal,
    IonRow,
    IonInput,
    IonTextarea,
    IonButton,
    IonLabel,
    IonText,
    IonDatetime
  },
  setup () {
    return {
      calendarOutline
    }
  },
  beforeMount () {
    this.$nextTick(async () => {
      this.editedMilestone = {
        ...this.editedMilestone,
        ...this.milestone
      }
    })
  },
  watch: {
    dreamStartDate (value) {
      this.validateForm()
      return value
    },
    dreamEndDate (value) {
      this.validateForm()
      return value
    },
  },
  data () {
    return {
      isEndDateOpen: false,
      isStartDateOpen: false,
      editedMilestone: {
        name: '',
        description: '',
        startDate: '',
        endData: '',
        amount_funded: 0,
        amount_required: 0,
        supporters: [],
        productSupporters: []
      }
    }
  },
  methods: {
    editMilestone () {
      this.dreamStore.editMilestone({id: this.milestone.id, milestone: this.editedMilestone})
      this.$emit('closeModal')
    },
    toggleShowEndDate () {
      this.isEndDateOpen=!this.isEndDateOpen
    },
    toggleShowStartDate () {
      this.isStartDateOpen=!this.isStartDateOpen
    },
    validateForm () {
      if (this.milestone.title && this.milestone.description && this.milestone.startDate && this.milestone.endData) {
        this.allRequired = true
      } else {
        this.allRequired = false
      }
    }
  }
}
</script>

<style scoped>
ion-grid,ion-row, ion-col{
  padding: 0;
}
ion-row {
  margin-bottom: 20px;
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
  background: #F9F8FF;
  max-height: 90vh;
  --height: 530px;
  height: 530px;
}
.inner-div {
  padding: 20px;
}
ion-label.input-label {
  font-size: 16px;
  line-height: 20px;
  font-weight: 400;
  color: #787C80;
  margin-bottom: 8px;
}
ion-item {
  background: #FFFFFF;
  color: #212325;
  border-radius: 8px;
  border: 1px solid #D1D1D6;
}
ion-input, ion-textarea {
  --color: #212325;
}
.milestone-funded-amount {
  font-size: 18px;
  line-height: 25px;
  font-weight: 700;
}
.milestone-funded-text {
  font-size: 14px;
  line-height: 25px;
  font-weight: 400;
  margin-left: 16px;
}
</style>
