<template>
  <ion-content>
    <ion-modal
      :is-open="open"
      :initial-breakpoint="0.25"
      class="auto-height"
      @click.self="$emit('closeModal')"
    >
      <div class="menu-container">
        <ion-grid>
          <ion-row v-if="isSelf">
            <ion-col>
              <ion-list lines="none">
                <ion-item @click="editMilestone">
                  <img class="item-icon" src="../../assets/icons/edit.svg" alt="">
                  <ion-label>
                    Edit Milestone
                  </ion-label>
                </ion-item>
                <ion-item class="delete-milestone" @click="deleteMilestone">
                  <ion-icon
                    class="item-icon delete-milestone-icon"
                    :icon="trashOutline"
                  />
                  <ion-label>
                    Delete Milestone
                  </ion-label>
                </ion-item>
              </ion-list>
            </ion-col>
          </ion-row>
          <ion-row v-else>
            <ion-col>
              <ion-list lines="none">
                <ion-item @click="viewSupporters">
                  <ion-icon
                    class="item-icon"
                    placeholder="Search"
                    :icon="eyeOutline"
                  />
                  <ion-label>
                    View Supporters
                  </ion-label>
                </ion-item>
                <ion-item @click="reportMilestone">
                  <ion-icon
                    class="item-icon"
                    :icon="alertCircleOutline"
                  />
                  <ion-label>
                    Report Milestone
                  </ion-label>
                </ion-item>
              </ion-list>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
    </ion-modal>
  </ion-content>
</template>

<script>
import {
  IonContent,
  IonModal,
  IonGrid,
  IonRow,
  IonCol,
  IonList,
  IonItem,
  IonLabel
} from '@ionic/vue'
import {
  alertCircleOutline,
  eyeOutline,
  trashOutline
} from "ionicons/icons";

export default {
  name: 'DreamMilestoneMenu',
  props: {
    open: {
      type: Boolean,
      default: false
    },
    isSelf: {
      type: Boolean,
      default: false
    }
  },
  emits: ['closeModal', 'showSupporters'],
  setup () {
    return {
      alertCircleOutline,
      eyeOutline,
      trashOutline
    }
  },
  components: {
    IonContent,
    IonModal,
    IonGrid,
    IonRow,
    IonCol,
    IonList,
    IonItem,
    IonLabel
  },
  data () {
    return {
    }
  },
  methods: {
    editMilestone () {
      this.$emit('closeModal')
      this.$emit('editMilestone')
    },
    deleteMilestone () {
      this.$emit('closeModal')
      this.$emit('deleteMilestone')
    },
    viewSupporters () {
      this.$emit('closeModal');
      this.$emit('showSupporters');
    },
    reportMilestone () {
      this.$emit('closeModal');
      this.$emit('reportMilestone');
    },
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
/*ion-content.menu-container {*/
/*  --padding-top: 35px;*/
/*  --padding-bottom: 30px;*/
/*  --padding-start: 20px;*/
/*  --padding-end: 20px;*/

/*  border-radius: 16px 16px 0 0;*/
/*}*/

ion-list {
  margin-top: 20px;
  /*font-size: 15px;*/
  /*line-height: 20px;*/
  /*color: #212325;*/
}
ion-icon.item-icon {
  margin-right: 12px;
}
img.item-icon {
  margin-right: 12px;
}
ion-item {
  --backgound: #FFFFFF;
  border-bottom: 1px solid #E9ECF0;
}

ion-button {
  text-transform: none;
}
.delete-milestone {
  color: #FF6363;
}
.delete-milestone-icon {
  color: #FF6363;
}
</style>
