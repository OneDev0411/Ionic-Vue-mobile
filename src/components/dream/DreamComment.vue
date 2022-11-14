<template>
  <ion-grid v-if="comment" class="dream-comments-container">
    <ion-row class="ion-justify-content-between ion-align-items-center">
      <ion-col  size="auto">
        <ion-row class="ion-justify-content-start ion-align-items-center">
          <UserIcon :user="comment.user" />
          <ion-col  size="auto" class="center-align-col">
            <ion-text  class="display-name">{{ comment.user.displayName }}</ion-text>
          </ion-col>
        </ion-row>
      </ion-col>
      <ion-col size="auto">
        <ion-row class="ion-justify-content-start ion-align-items-center">
          <ion-col size="auto">
            <ion-text class="created-date">{{ getRelativePast(comment.date_added) }}</ion-text>
          </ion-col>
          <ion-col size="auto">
            <ion-button
              size="small"
              class="ion-float-right no-padding-end"
              fill="flat"
              @click="toggleShowCommentMenu"
            >
              <ion-icon
                :icon="ellipsisVertical"
                class="more-icon"
              />
            </ion-button>
          </ion-col>
        </ion-row>
      </ion-col>
    </ion-row>
    <ion-row>
      <ion-col class="comment-main-container">
        <ion-text class="comment-main">{{ comment.comment }}</ion-text>
      </ion-col>
    </ion-row>
    <ion-row class="favorite-btn-container">
      <ion-col>
        <ion-button
          fill="clear"
          class="favorite-btn"
        >
          <ion-row class="ion-justify-content-start ion-align-items-center">
            <ion-col size="auto">
              <ion-icon
                v-if="true"
                class="favorite-btn-icon"
                :icon="star"
              />
              <ion-icon
                v-else
                :icon="starOutline"
                class="card-header-icon"
              />
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col size="auto">
              <ion-text class="favorite-btn-text">Favorite</ion-text>
            </ion-col>
          </ion-row>
        </ion-button>
      </ion-col>
    </ion-row>
    <comment-menu
      :open="showCommentMenu"
      :comment="comment"
      :is-self="isSelf"
      @closeModal="toggleShowCommentMenu"
      @deleteComment="toggleDeleteCommentConfirmation"
      @hideComment="hideComment"
      @reportComment="toggleShowReportModal"
    />
    <report-modal
      :open="showReportComment"
      :confirmationText="`Are you sure you want to report this Comment?`"
      @closeModal="toggleShowReportModal"
      @reportItem="reportComment"
    />
    <confirmation-modal-new
      :open="deleteCommentConfirmation"
      :textHead="`Are you sure?`"
      :textMain="`Removing this report comment be undone!`"
      :confirmText="`Delete`"
      :cancelText="`Cancel`"
      danger-action
      @onOkay="remove(comment.id)"
      @onClose="toggleDeleteCommentConfirmation"
    />
    <notice-modal
      :open="showCommentReportedSuccess"
      :type="`success`"
      :text="`Comment Reported`"
      @closeModal="toggleShowCommentReportSuccessModal"
    />
    <notice-modal
      :open="showCommentDeletedSuccessModal"
      :type="`success`"
      :text="`Successfully Deleted`"
      @closeModal="toggleShowCommentDeletedSuccess"
    />
    <notice-modal
      :open="showCommentHiddenModal"
      :type="`success`"
      :text="`The comment has been hidden`"
      @closeModal="toggleCommentHiddenModal"
    />
  </ion-grid>
</template>

<script>
import { IonText } from '@ionic/vue'
import {
  ellipsisVertical,
  starOutline,
  star
} from 'ionicons/icons'
import { useDreams } from '../../stores/dreams'
import { getRelativePast } from '../../helpers/time'
import UserIcon from '../base/UserIcon'
import CommentMenu from './CommentMenu'
import ConfirmationModalNew from '../base/ConfirmationModalWithTextBtn'
import ReportModal from './Report'
import NoticeModal from '../base/NoticeModal'

export default {
  props: {
    comment: {
      type: Object,
      required: true,
    },
    isSelf: {
      type: Boolean,
      required: true
    }
  },
  components: {
    CommentMenu,
    ConfirmationModalNew,
    UserIcon,
    IonText,
    ReportModal,
    NoticeModal
  },
  setup () {
    const dreamStore = useDreams()
    return {
      ellipsisVertical,
      starOutline,
      star,
      dreamStore,
      getRelativePast
    }
  },
  data () {
    return {
      deleteCommentConfirmation: false,
      showCommentDeletedSuccessModal: false,
      showCommentHiddenModal: false,
      showReportComment: false,
      showCommentReportedSuccess: false,
      showCommentMenu: false,
    }
  },
  methods: {
    async remove () {
      this.toggleDeleteCommentConfirmation()
      this.dreamStore.deleteComment(this.comment.id)
      this.toggleShowCommentDeletedSuccess()
    },
    hideComment () {
      this.dreamStore.hideComment()
      this.toggleCommentHiddenModal()
    },
    reportComment (evt, reason) {
      this.dreamStore.reportComment({id: this.comment.id, reason });
      this.toggleShowCommentReportSuccessModal()
    },
    toggleCommentHiddenModal () {
      this.showCommentHiddenModal=!this.showCommentHiddenModal
    },
    toggleShowCommentMenu () {
      this.showCommentMenu = !this.showCommentMenu
    },
    toggleShowReportModal () {
      this.showReportComment = !this.showReportComment
    },
    toggleShowCommentReportSuccessModal () {
      this.showCommentReportedSuccess = !this.showCommentReportedSuccess
    },
    toggleDeleteCommentConfirmation () {
      this.deleteCommentConfirmation = !this.deleteCommentConfirmation
    },
    toggleShowCommentDeletedSuccess () {
      this.showCommentDeletedSuccessModal = !this.showCommentDeletedSuccessModal
    }
  }
}
</script>

<style scoped>
ion-grid, ion-row, ion-col {
  padding: 0;
}
.rounded-thumbnail, user-avatar {
  --border-radius: 100%;
  border: solid white 3px;
  --size: 33px;
}
.grey-background {
  background-color: #dcd9e6;
  border-radius: 8px;
}
ion-grid.dream-comments-container {
  padding-top: 40px;
}
.center-align-col {
  margin: auto;
  margin-left: 6px;
}
.no-padding-end {
  --padding-end: 0;
}
ion-text.display-name {
  font-size: 14px;
  line-height: 22px;
  font-weight: 700;
  text-transform: capitalize;
  margin-left: 5px;
  color: #212325;
}
ion-text.created-date {
  font-size: 12px;
  line-height: 15px;
  font-weight: 400;
  /*margin-left: 5px;*/
  color: #787C80;
}
ion-icon.more-icon {
  color: #212325;
}
.comment-main-container {
  background-color: #F3F1FC;
  border-radius: 8px;
  margin-left: 40px;
  padding: 10px;
}
ion-text.comment-main {
  font-size: 14px;
  line-height: 21px;
  font-weight: 400;
  color: #4E5256;
}
.favorite-btn-container {
  margin-left: 40px;
}
.favorite-btn-text {
  font-size: 12px;
  line-height: 15px;
  font-weight: 500;
  padding-left: 10px;
  color: #787C80;
}
.favorite-btn {
 --padding-start: 0;
  --padding-end: 0;
}
</style>
