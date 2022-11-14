<template>
  <ion-grid class="outer-grid">
    <ion-card
      v-if="milestone"
      class="milestone-card"
    >
      <ion-grid>
        <ion-grid class="inner-grid">
            <ion-row class="ion-justify-content-between ion-align-items-center">
              <ion-col size="auto">
                <ion-text class="milestone-title">
                  {{ milestone.title.substring(0, 35) }}
                </ion-text>
              </ion-col>
              <ion-col size="auto">
                <ion-button
                  size="small"
                  class="ion-float-right menu-button"
                  fill="clear"
                  @click="showMilestoneMenu=!showMilestoneMenu"
                >
                  <ion-icon slot="icon-only" :icon="ellipsisVertical"/>
                </ion-button>
              </ion-col>
            </ion-row>
            <ion-row class="milestone-description-row">
              <ion-col>
                <truncated-text
                  :text="milestone.description"
                  :limit="50"
                  :text-classname="`milestone-text`"
                  :link-classname="`milestone-text-link`"
                />
              </ion-col>
            </ion-row>
            <ion-row class="supporter-row ion-justify-content-start ion-align-items-center">
              <ion-col >
                <SupporterImages
                  :users="dummyUsers"
                />
              </ion-col>
              <ion-col style="margin: auto" size="auto">
                <ion-text color="secondary" class="supporter-text supporter-text-main"> {{ dummyUsers.length }} </ion-text>
                <ion-text class="supporter-text"> Suporters </ion-text>
              </ion-col>
              <ion-col v-if="isSelf" size="auto">
                <ion-button fill="clear" class="plus-icon-btn" :router-link="{ name: 'editMilestoneSupporters', params: { id: milestone.id} }">
                  <img src="../../assets/icons/plus_squared.svg" class="" />
                </ion-button>
              </ion-col>
            </ion-row>
          <ion-row class="supporter-row ion-justify-content-start ion-align-items-center">
            <ion-col >
              <SupporterImages
                :users="dummyUsers"
              />
            </ion-col>
            <ion-col style="margin: auto" size="auto">
              <ion-text color="secondary" class="supporter-text supporter-text-main"> {{ dummyUsers.length }} </ion-text>
              <ion-text class="supporter-text"> Products & Services </ion-text>
            </ion-col>
            <ion-col v-if="isSelf" size="auto">
              <ion-button fill="clear" class="plus-icon-btn" :router-link="{ name: 'editMilestoneSupportProducts', params: { id: milestone.id} }">
                <img src="../../assets/icons/plus_squared.svg" class="" />
              </ion-button>
            </ion-col>
          </ion-row>
            <ion-row class="progress-bar-row">
              <ion-col>
                <ion-progress-bar
                  color="secondary"
                  :value="progress(milestone)"
                />
              </ion-col>
            </ion-row>

            <ion-row class="completion-status">
              <ion-col>
                <ion-label class="milestone-completion-percentage">{{ (progress(milestone) * 100).toFixed() }}% completed</ion-label>
              </ion-col>
            </ion-row>
            <ion-row class="milestone-funded-row">
              <ion-col class="ion-align-items-center">
                <ion-text class="milestone-funded-label-amount">
                  ${{ milestone.amount_funded }}
                </ion-text>
                <ion-text class="milestone-funded-label-text">
                  Milestone Funded
                </ion-text>
              </ion-col>
            </ion-row>
          </ion-grid>
        <ion-row class="milestone-date-row ion-justify-content-between ion-align-items-center">
          <ion-col size="auto" >
            <ion-text class="milestone-date-relative">{{ getRelativePast(milestone.date) }}</ion-text>
          </ion-col>
          <ion-col size="auto">
            <ion-text>{{ format(new Date(milestone.date), 'MM/dd/yy') }}
            to {{ format(new Date(), 'MM/dd/yy') }}</ion-text>
          </ion-col>
        </ion-row>
      </ion-grid>

      <DreamMilestoneMenu
        :open="showMilestoneMenu"
        :is-self="isSelf"
        @showSupporters="toggleShowMilestoneSupporters"
        @deleteMilestone="toggleDeleteMilestoneModal"
        @reportMilestone="toggleShowReportMilestoneModal"
        @editMilestone="toggleShowEditMilestoneModal"
        @closeModal="toggleShowMilestoneMenu"
      />
      <DreamMilestoneSupporters
        :open="showMilestoneSupporters"
        @closeModal="toggleShowMilestoneSupporters"
      />
      <EditMilestone
        :open="showEditMilestoneModal"
        :milestone="milestone"
        @closeModal="toggleShowEditMilestoneModal"
      />
      <confirmation-modal-new
        :open="showDeleteMilestoneModal"
        :textHead="`Are you sure?`"
        :textMain="`Removing this report milestone be undone!`"
        :confirmText="`Delete`"
        :cancelText="`Cancel`"
        danger-action
        @onOkay="deleteMilestone(milestone.id)"
        @onClose="toggleDeleteMilestoneModal"
      />
      <ReportMilestone
        :open="showReportMilestoneModal"
        :confirmation-text="`Are you sure you want to report this Milestone?`"
        :head-text="`Please select the issue`"
        @reportItem="reportMilestone"
        @closeModal="toggleShowReportMilestoneModal"
      />
      <notice-modal
        :open="showMilestoneDeletedNotice"
        :type="`success`"
        :text="`Milestone successfully deleted!`"
        @closeModal="toggleMilestoneDeletedNotice"
      />
    </ion-card>
  </ion-grid>
</template>

<script>
import {
  IonProgressBar,
  IonLabel,
  IonText,
  IonCard,
  IonGrid
} from "@ionic/vue";
import {
  trashOutline,
  personCircleOutline,
  checkmarkCircleSharp,
  checkmarkCircleOutline,
  ellipseOutline,
  ellipsisVertical,
} from "ionicons/icons";
import { format } from 'date-fns'
import TruncatedText from "../../components/utils/TruncatedText.vue";
import DreamMilestoneMenu from "./DreamMilestoneMenu";
import DreamMilestoneSupporters from "./DreamMilestoneSupporters";
import Report from "./Report";
import { getRelativePast } from '../../helpers/time'
import { useDreams } from "../../stores/dreams";
import { useUser } from "../../stores/user";
import { useUsers } from "../../stores/users";
import NoticeModal from "../base/NoticeModal";
import EditMilestone from "./EditMilestone";
import SupporterImages from "../utils/SupporterImages";
import ConfirmationModalWithTextBtn from "../base/ConfirmationModalWithTextBtn";
export default {
  props: {
    id: {
      type: Number,
      required: true
    },
    milestone: {
      type: Object,
      required: true
    },
    isSelf: {
      type: Boolean,
      required: true
    }
  },
  components: {
    SupporterImages,
    EditMilestone,
    NoticeModal,
    DreamMilestoneSupporters,
    DreamMilestoneMenu,
    TruncatedText,
    IonProgressBar,
    IonLabel,
    IonText,
    IonCard,
    IonGrid,
    ReportMilestone: Report,
    ConfirmationModalNew: ConfirmationModalWithTextBtn
  },
  setup() {
    const dreamStore = useDreams();
    const userStore = useUser();
    const thirdUserStore = useUsers();
    return {
      trashOutline,
      personCircleOutline,
      checkmarkCircleSharp,
      checkmarkCircleOutline,
      ellipseOutline,
      ellipsisVertical,
      dreamStore,
      thirdUserStore,
      userStore,
      format,
      getRelativePast
    };
  },
  data() {
    return {
      milestones: [],
      showEditMilestoneModal: false,
      showDeleteMilestoneModal: false,
      showMilestoneDeletedNotice: false,
      showMilestoneMenu: false,
      showMilestoneSupporters: false,
      showReportMilestoneModal: false,
      dummyUsers: []
    };
  },
  computed: {
  },
  async mounted () {
    this.dummyUsers = await this.getDummyUsers();
  },
  methods: {
    deleteMilestone () {
      this.dreamStore.deleteMilestone(this.milestone.id)
      this.toggleDeleteMilestoneModal()
      this.toggleMilestoneDeletedNotice()
    },
    async getDummyUsers () {
      let dummyUserId = []

      // random user Ids both with and without profile pic
      const userArr = [1,32,12, 30, 8, 23, 15, 31, 12, 172, 140, 151, 152, 153, 154, 155]
      const numberOfUsers = Math.floor(Math.random() * (5 - 1) + 1);
      for (let i = 0;i < numberOfUsers; i++){
        const randID = userArr[Math.floor(Math.random() * (15 - 0) + 0)];
        dummyUserId.push(randID)
      }
      return await Promise.all(dummyUserId.map(async (id)=> await this.thirdUserStore.getUserById(id)))
    },
    progress(milestone) {
      if (milestone.amount_required && milestone.amount_funded) {
        const milestoneProgress = parseFloat(milestone.amount_funded) / parseFloat(milestone.amount_required)
        if (isNaN(milestoneProgress)) return 1
        return milestoneProgress
      } else {
        return 1;
      }
    },
    async reportMilestone (evt, reason) {
      await this.dreamStore.reportMilestone({id: this.milestone.id, reason })
      this.toggleMilestoneDeletedNotice()
    },
    async setStatus(id) {
      await this.dreamStore.setMilestoneStatus({
        id: this.id,
        milestoneId: id,
      });
    },
    toggleDeleteMilestoneModal () {
      this.showDeleteMilestoneModal=!this.showDeleteMilestoneModal
    },
    toggleShowEditMilestoneModal () {
      this.showEditMilestoneModal=!this.showEditMilestoneModal
    },
    toggleShowMilestoneSupporters () {
      this.showMilestoneSupporters=!this.showMilestoneSupporters
    },
    toggleShowReportMilestoneModal () {
      this.showReportMilestoneModal=!this.showReportMilestoneModal
    },
    toggleShowMilestoneMenu () {
      this.showMilestoneMenu=!this.showMilestoneMenu
    },
    toggleMilestoneDeletedNotice () {
      this.showMilestoneDeletedNotice=!this.showMilestoneDeletedNotice
    }
  }
};
</script>

<style scoped>
ion-grid.outer-grid {
  margin-top: 12px;
}
ion-grid,ion-col, ion-row {
  padding: 0;
}
ion-grid.inner-grid {
  padding: 20px
}
ion-row.milestone-description-row {
  padding: 8px 0 0;
}
ion-card.milestone-card {
  background: #f9f8ff;
  border: 0.5px solid #b6a8ed;
  border-radius: 16px;
  margin: 0 0 20px;
  overflow: hidden;
}
ion-progress-bar {
  height: 7px;
  border-radius: 20px;
}
ion-icon.supporter {
  font-size: 52px;
  margin: -5px;
}
.supporter-text {
  font-size: 14px;
  line-height: 22px;
  color: #787C80;
}
.supporter-text-main {
  font-weight: 700;
  color: #00ff00;
}
.milestone-title {
  font-size: 18px;
  line-height: 27px;
  font-weight: 700;
  color: #212325;
}
.menu-button {
  --padding-start: 0;
  --padding-end: 0;
  margin: 0;
  color: #212325;
}
.milestone-text {
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
  color: #4E5256;
  padding: 8pc 0 20px;

}
.milestone-text-link {
  color: #59D1D4;
}
ion-text.milestone-funded-label {
  font-size: 12px;
  line-height: 18px;
}
ion-row.supporter-row {
  padding: 20px 0;
}
ion-row.completion-status {
  padding-top: 8px;
}
ion-text.milestone-completion-percentage {
  font-size: 12px;
  line-height: 18px;
  color: #212325;
}
ion-row.milestone-funded-row {
  padding: 20px 0 0;
}
ion-text.milestone-funded-label-amount {
  font-size: 18px;
  line-height: 27px;
  font-weight: 700;
  color: #31265A;
}
ion-text.milestone-funded-label-text {
  font-size: 14px;
  line-height: 22px;
  font-weight: 400;
  color: #787C80;
  margin-left: 15px;
}
ion-row.milestone-date-row {
  background: #F3F1FC;
  border: 0.5px solid #B6A8ED;
  border-radius: 0px 0px 16px 16px;
  font-size: 16px;
  line-height: 24px;
  color: #787C80;
  padding: 20px
}
ion-text.milestone-date-relative {
  color: #866EE1;
}
.plus-icon-btn {
  --padding-start: 20px;
  --padding-end: 0;
  --padding-top: 0;
  --padding-bottom: 0;
}
</style>
