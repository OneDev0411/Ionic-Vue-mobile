<template>
  <ion-content>
    <base-layout page-title="Dream Detail">
      <div v-if="dream">
        <ion-grid class="dream-details-main-grid">
          <ion-row  class="dream-img">
              <ion-col>
                <ion-img class="main-img" :src="dream.image" />
              </ion-col>
            </ion-row>
          <ion-row class="ion-justify-content-between ion-align-items-center">
            <ion-col size="auto">
              <ion-card-title class="dream-header-text">{{ dream.title }}</ion-card-title>
            </ion-col>
            <ion-col size="auto">

              <ion-button
                class="ion-float-right end-button"
                fill="flat"
                id="dream-options"
                @click="toggleShowDreamMenu"
              >
                <ion-icon
                  :icon="ellipsisVertical"
                  class="dream-header-icon"
                />
              </ion-button>
            </ion-col>
          </ion-row>
          <router-link :to="{ name: 'profile', params: { id: dream.user.id } }">
            <ion-row class="ion-justify-content-start ion-align-items-center">
              <UserIcon
                :user="dream.user"
                :size="18"
              />
              <ion-col size="auto">
                <ion-text class="display-name">
                  {{ dream.user.displayName }}
                </ion-text>
              </ion-col>
            </ion-row>
          </router-link>

          <ion-row>
            <dream-fund-widget :funded="funded" :total="required"></dream-fund-widget>
          </ion-row>

          <ion-row>
            <ion-col class="">
              <truncated-text :text="dream.description" :limit="90"></truncated-text>
            </ion-col>
          </ion-row>


          <ion-row class="support-btn-row">
              <ion-col class="support-btn-col">
                <ion-button
                  class="support-btn"
                  @click="toggleShowSupportDreamModal"
                >
                  Support
                </ion-button>
              </ion-col>
              <ion-col class="support-btn-col-alt">
                <ion-button class="support-btn-alt" @click="toggleShareDreamModal">
                  Share
                </ion-button>
              </ion-col>
            </ion-row>

          <ion-row
            v-if="dream.milestones && dream.milestones.length > 0"
            class="ion-align-items-center ion-justify-content-between"
          >
            <ion-col size="auto">
              <ion-text class="milestone-head">
                Milestones
              </ion-text>
            </ion-col>
            <ion-col v-if="isSelf" size="auto">
              <ion-button fill="clear" class="plus-icon-btn">
                <img src="../../assets/icons/plus_squared.svg" class="" />
              </ion-button>
            </ion-col>
          </ion-row>
          <ion-row
            v-for="milestone in dream.milestones"
            :key="milestone.id"
          >
            <DreamMilestone
              :milestone="milestone"
              :id="dream.id"
              :is-self="isSelf"
            />
          </ion-row>


          <div id="comments">
            <ion-row class="ion-justify-content-between ion-align-items-center">
              <ion-col size="auto">
                <ion-text class="comment-head">
                  Comments
                </ion-text>
              </ion-col>
              <ion-col size="auto">
                <ion-buttons class="ion-align-items-center">
                  <ion-button fill="clear" class="card-header-btn" @click="setLike">
                    <img
                      v-if="!dream.like"
                      class="card-header-icon"
                      src="../../assets/icons/star.svg" alt=""
                    >
                    <img
                      v-else
                      class="card-header-icon"
                      src="../../assets/icons/star-filled.svg"
                      alt=""
                    >
                    {{ dream.total_likes }}
                  </ion-button>

                  <ion-button fill="clear" class="card-header-btn" :router-link="{ name: 'dreamDetail', params: { id: dream.id }, hash: '#comments' }">
                    <img
                      class="card-header-icon"
                      src="../../assets/icons/chat.svg"
                      alt=""
                    >
                    {{ comments.length }}
                  </ion-button>

<!--                  <ion-button fill="clear" class="card-header-btn" @click="$emit('shareDream')">-->
<!--                    <img src="../../assets/icons/share.svg" alt="" height="20">-->
<!--                  </ion-button>-->
                </ion-buttons>

              </ion-col>
            </ion-row>
            <div
              v-for="comment in comments"
              :key="comment.id"
            >
              <dream-comment
                :is-self="isSelf"
                :comment="comment"
              />
            </div>
          </div>

          <edit-dream-modal
            :open="showEditDreamModal"
            :dream="dream"
            @closeModal="toggleShowEditDreamModal"
          />
          <dream-support-modal
            :open="isSupportDreamModalOpen"
            :dream="dream"
            @likeDream="setLike"
            @closeModal="toggleShowSupportDreamModal"
          />
          <dream-menu
            :open="showDreamMenu"
            :dream="dream"
            :isSelf="isSelf"
            @editDream="toggleShowEditDreamModal"
            @editSupporters="toggleShowEditSupportersModal"
            @closeModal="toggleShowDreamMenu"
            @reportDream="toggleShowReportModal"
            @shareDream="toggleShareDreamModal"
          />
          <dream-share-modal
            :open="showShareDreamModal"
            :dream="dream"
            @closeModal="toggleShareDreamModal"
          />
          <report-dream
            :open="showReportDreamModal"
            :dream="dream"
            :confirmationText="`Are you sure you want to report this Dream?`"
            @reportItem="reportDream"
            @closeModal="toggleShowReportModal"
          />
          <MilestoneSupporters
            :open="showEditSupportersModal"
            :dream="dream"
            @closeModal="toggleShowEditSupportersModal"
          />
          <notice-modal
            :open="showDreamReportSuccessModal"
            :type="`success`"
            :text="`This dream has been reported`"
            @closeModal="toggleShowDreamReportSuccessModal"
          />
          <notice-modal
            :open="showDreamDeletedNotice"
            :type="`success`"
            :text="`Milestones Reported`"
            @closeModal="toggleDreamDeletedNotice"
          />

        </ion-grid>
        <CommentInput :user={} :dream="dream"  />
      </div>
      <ion-title v-else> No dream found HIonGrid,
      </ion-title>
    </base-layout>
  </ion-content>
</template>

<script>
import {
  IonTitle,
  IonText,
  IonCardTitle,
  IonContent,
  IonImg,
  IonButtons,
} from '@ionic/vue'
import {
  personCircleOutline,
  ellipsisVertical,
  chatbubbleEllipsesOutline,
  starOutline,
  star,
  bookmarkOutline,
  alertCircleOutline,
  bookmark,
  checkmarkOutline,
} from 'ionicons/icons'
import { useDreams } from '../../stores/dreams'
import { useUser } from '../../stores/user'
import DreamComment from '../../components/dream/DreamComment.vue'
import DreamShareModal from '../../components/dream/DreamShareModal'
import { getRelativePast } from '../../helpers/time'
import DreamFundWidget from '../../components/dream/DreamFundWidget.vue'
import CommentInput from '../../components/base/CommentInput'
import DreamMenu from '../../components/dream/DreamMenu'
import Report from '../../components/dream/Report'
import NoticeModal from '../../components/base/NoticeModal'
import DreamSupportModal from '../../components/dream/DreamSupportModal'
import UserIcon from '../../components/base/UserIcon'
import TruncatedText from "../../components/utils/TruncatedText.vue";
import DreamMilestone from "../../components/dream/DreamMilestone";
import EditDreamModal from "../../components/dream/EditDreamModal";
import BaseLayout from "../../components/layout/BaseLayout";
import MilestoneSupporters from "../../components/dream/MilestoneSupporters_userview";

export default {
  components: {
    EditDreamModal,
    DreamMilestone,
    DreamSupportModal,
    DreamMenu,
    CommentInput,
    IonTitle,
    DreamComment,
    DreamShareModal,
    DreamFundWidget,
    MilestoneSupporters,
    BaseLayout,
    IonCardTitle,
    IonText,
    NoticeModal,
    ReportDream: Report,
    IonContent,
    UserIcon,
    IonImg,
    TruncatedText,
    IonButtons
  },
  setup () {
    const dreamStore = useDreams()
    const userStore = useUser()
    return {
      dreamStore,
      userStore,
      personCircleOutline,
      getRelativePast,
      ellipsisVertical,
      chatbubbleEllipsesOutline,
      starOutline,
      star,
      bookmarkOutline,
      bookmark,
      alertCircleOutline,
      checkmarkOutline,
    }
  },
  computed: {
    comments () {
      return this.dreamStore.getDreamComments(this.dream.id)
    },
    dream () {
      return this.dreamStore.getDreamById(this.$route.params.id)
    },
    funded () {
      let total = 0
      if (this.dream.milestones) {
        this.dream.milestones.forEach((milestone) => {
          total += parseFloat(milestone.amount_funded)
        })
      }
      return total
    },
    required () {
      let total = 0
      if (this.dream.milestones) {
        this.dream.milestones.forEach((milestone) => {
          total += parseFloat(milestone.amount_required)
        })
      }
      return total
    }
  },
  data () {
    return {
      isSelf: true,
      updatedProgress: 0,
      isSupportDreamModalOpen: false,
      showEditDreamModal: false,
      showEditSupportersModal: false,
      showShareDreamModal: false,
      showDreamMenu: false,
      showReportDreamModal: false,
      showDreamReportSuccessModal: false,
      showDreamDeletedNotice: false
    }
  },
  methods: {
    editSupporters () {
      this.$router.push({  name: 'supporters' })
    },
    updateProgress () {
      this.dreamStore.setProgress({
        id: this.dream.id,
        value: this.updatedProgress
      })
    },
    async setLike () {
      await this.dreamStore.setLike({
        id: this.dream.id
      })
      this.isSupportDreamModalOpen = false
    },
    async reportDream (evt, reason) {
      await this.dreamStore.reportDream({id: this.dream.id, reason })
      this.toggleShowDreamReportSuccessModal()
    },
    toggleDreamDeletedNotice () {
      this.showDreamDeletedNotice = !this.showDreamDeletedNotice
    },
    toggleShowEditDreamModal () {
      this.showEditDreamModal=!this.showEditDreamModal
    },
    toggleShowEditSupportersModal () {
      this.showEditSupportersModal=!this.showEditSupportersModal
    },
    toggleShowSupportDreamModal () {
      this.isSupportDreamModalOpen = !this.isSupportDreamModalOpen
    },
    toggleShowDreamMenu () {
      this.showDreamMenu = !this.showDreamMenu
    },
    toggleShowReportModal () {
      this.showReportDreamModal = !this.showReportDreamModal
    },
    toggleShowDreamReportSuccessModal () {
      this.showDreamReportSuccessModal = !this.showDreamReportSuccessModal
    },
    toggleShareDreamModal () {
      this.showShareDreamModal = !this.showShareDreamModal
    }
  },
  mounted () {
    this.$nextTick(async () => {
      await this.dreamStore.loadAllDreams()
      await this.dreamStore.loadDreamComments(this.$route.params.id)
      this.updatedProgress = this.dream.progress
      // this.isSelf = this.dream.user.id === this.userStore.id
      this.isSupportDreamModalOpen = this.$route.query.support
    })
  },
  updated () {
    this.$nextTick(() => {
      if (this.$route.hash) {
        const el = document.querySelector(this.$route.hash)
        el && el.scrollIntoView()
      }
    })
  }
}
</script>

<style scoped>
ion-content {
  padding: 20px;
  background: #F9F8FF;
}
ion-grid.dream-details-main-grid {
  padding: 20px;
}
ion-row,ion-col {
  padding: 0;
}
.full-width {
  width: 100%;
  --size: 200px;
}
.center-align-col {
  text-align: center;
  display: flex;
  justify-content: center;
}
ion-img.main-img::part(image) {
  width: 100%;
  height: auto;
  border-radius: 16px;
}
.no-right-padding {
  --padding-end: 0 !important;
}
.rounded-button {
  --border-radius: 16px;
  height: 50px;
  width: 100%;
}
.contrast {
  --background: var(--ion-color-primary-contrast);
  --color: var(--ion-color-primary);
}
.like-button-position {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 2;
}
.like-button-unclicked {
  --border-radius: 23px;
  --padding-start: 10px;
  --padding-end: 10px;
  --color: var(--ion-color-primary-contrast);
  --border-color: var(--ion-color-primary-contrast);
}
.like-button-clicked {
  --border-radius: 23px;
  --border-color: var(--ion-color-primary-contrast);
}
.end-button {
  height: 100%;
}
ion-row.dream-img {
  padding-bottom: 20px;
}

ion-card-title.dream-header-text {
  font-size: 22px;
  line-height: 30px;
  font-weight: 600;
  text-decoration: none;
  color: #212325;
}

.dream-header-icon{
  color: #212325;
}

ion-text.display-name {
  font-weight: 500;
  margin-left: 8px;
  font-size: 14px;
  line-height: 20px;
  color: #4E5256;
}
ion-text.dream-text-main {
  font-size: 14px;
  line-height: 210%;
  font-weight: 400;
  color: #323538;
}
ion-row.support-btn-row {
  padding: 20px 0 40px;
}
ion-col.support-btn-col {
  padding-right: 10px;
}
ion-col.support-btn-col-alt {
  padding-left: 10px;
}
ion-button.support-btn {
  --padding-top: 15px;
  --padding-bottom: 15px;
  margin: 0;
  font-size: 16px;
  line-height: 28px;
  text-transform: capitalize;
  --border-radius: 8px;
  --font-weight: 700;
  --box-shadow: none;
  width: 100%;
  height: 50px;
}
ion-button.support-btn-alt {
  width: 100%;
  --padding-top: 15px;
  --padding-bottom: 15px;
  --padding-start: 10px;
  --padding-end: 5px;
  margin: 0;
  font-size: 16px;
  line-height: 28px;
  text-transform: capitalize;
  --background: #FFFFFF;
  --border-radius: 8px;
  --font-weight: 700;
  --box-shadow: none;
  --color: #31265A;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #31265A;
  height: 50px;
}
ion-button.support-btn-alt ion-icon {
  margin-left: 10px;
}
ion-text.milestone-head{
  padding: 20px 0 12px;
  font-size: 22px;
  line-height: 30px;
  font-weight: 600;
}
ion-text.comment-head {
  font-size: 22px;
  line-height: 33px;
  font-weight: 700;
}

.card-header-icon {
  font-size: 24px;
  margin-right: 7.5px;
}
.card-header-btn {
  font-size: 16px;
}
.plus-icon-btn {
  --padding-start: 20px;
  --padding-end: 0;
  --padding-top: 0;
  --padding-bottom: 0;
}
</style>
