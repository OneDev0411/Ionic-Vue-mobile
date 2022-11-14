<template>
  <base-card boxed-image>
    <template v-slot:image>
      <ion-img :src="dream.image" @click="navigateToDetail"></ion-img>
    </template>
    <template v-slot:header>
      <ion-card-header style="padding-top: 0" class="low-side-padding-header">
        <dream-header :dream="dream"></dream-header>
      </ion-card-header>
    </template>

    <template v-slot:content>
      <ion-card-content>
        <ion-grid>
          <ion-row>
            <ion-col>
              <ion-row class="ion-justify-content-between">
                <ion-col size="auto">
                  <router-link :to="{ name: 'dreamDetail', params: { id: dream.id } }">
                    <ion-card-title class="dream-header">{{ dream.title }}</ion-card-title>
                  </router-link>
                </ion-col>
                <ion-col size="auto">
                  <ion-icon :icon="ellipsisVerticalOutline" @click="toggleShowDreamMenu"></ion-icon>
                </ion-col>
              </ion-row>

            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col class="center-align-col">
              <truncated-text :text="dream.description" :limit="50"></truncated-text>
            </ion-col>
          </ion-row>
          <dream-fund-widget :funded="funded" :total="required" ></dream-fund-widget>
          <dream-functional
            :dream="dream"
            @shareDream="toggleShareDreamModal"
            @supportDream="toggleShowSupportDreamModal"
          />
        </ion-grid>
      </ion-card-content>
    </template>
    <dream-support-modal
      :open="isSupportDreamModalOpen"
      :dream="dream"
      @likeDream="setLike"
      @closeModal="toggleShowSupportDreamModal"
    />
    <dream-menu
      :open="showDreamMenu"
      :isSelf="false"
      :dream="dream"
      @closeModal="toggleShowDreamMenu"
      @shareDream="toggleShareDreamModal"
      @reportDream="toggleShowReportModal"
    />
    <dream-share-modal
      :open="showShareDreamModal"
      :dream="dream"
      @closeModal="toggleShareDreamModal"
    />
    <report-dream
      :open="showReportDreamModal"
      :dream="dream"
      :report-item="`dream`"
      @closeModal="toggleShowReportModal"
      @showReportSuccess="toggleShowDreamReportSuccessModal"
    />
    <notice-modal
      :open="showDreamReportSuccessModal"
      :type="`success`"
      :text="`This dream has been reported`"
      showDreamReportSuccessModal
      @closeModal="showDreamReportSuccessModal = !showDreamReportSuccessModal"
    />
    <notice-modal
      :open="showUserBlockedSuccessModal"
      :type="`success`"
      :text="`This user has been blocked`"
      @closeModal="showUserBlockedSuccessModal = !showUserBlockedSuccessModal"
    />
  </base-card>
</template>

<script>
import { IonCardContent, IonCardHeader, IonCardTitle, IonImg } from '@ionic/vue'
import { ellipsisVerticalOutline } from 'ionicons/icons'
import { defineComponent } from 'vue'
import BaseCard from '../layout/BaseCard.vue'
import DreamHeader from './DreamHeader.vue'
import DreamFunctional from './DreamFuntional.vue'
import DreamSupportModal from './DreamSupportModal.vue'
import DreamFundWidget from '../../components/dream/DreamFundWidget.vue'
import { useDreams } from '../../stores/dreams'
import { getRelativePast } from '../../helpers/time'
import DreamMenu from './DreamMenu'
import DreamShareModal from './DreamShareModal'
import ReportDream from './Report'
import NoticeModal from '../base/NoticeModal'
import TruncatedText from "../../components/utils/TruncatedText.vue";

export default defineComponent({
  props: ['id'],
  components: {
    NoticeModal,
    ReportDream,
    DreamShareModal,
    DreamMenu,
    DreamSupportModal,
    IonCardContent,
    IonCardHeader,
    DreamFunctional,
    IonCardTitle,
    IonImg,
    BaseCard,
    DreamHeader,
    DreamFundWidget,
    TruncatedText
  },
  data () {
    return {
      isSupportDreamModalOpen: false,
      showDreamMenu: false,
      showDreamReportSuccessModal: false,
      showShareDreamModal: false,
      showReportDreamModal: false,
      showUserBlockedSuccessModal: false
    }
  },
  setup () {
    const dreamStore = useDreams()
    return {
      ellipsisVerticalOutline,
      dreamStore,
      getRelativePast
    }
  },
  computed: {
    dream () {
      return this.dreamStore.getDreamById(this.id)
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
  methods: {
    async setLike () {
      await this.dreamStore.setLike({
        id: this.dream.id
      })
      this.supportOptions = false
    },
    navigateToDetail () {
      this.$router.push({ name: 'dreamDetail', params: { id: this.id } })
    },
    toggleShowSupportDreamModal () {
      this.isSupportDreamModalOpen = !this.isSupportDreamModalOpen
    },
    toggleShowDreamMenu () {
      this.showDreamMenu = !this.showDreamMenu
    },
    toggleShareDreamModal () {
      this.showShareDreamModal = !this.showShareDreamModal
    },
    toggleShowReportModal () {
      this.showReportDreamModal = !this.showReportDreamModal
    },
    toggleShowDreamReportSuccessModal () {
      this.showDreamReportSuccessModal = !this.showDreamReportSuccessModal
    },
    toggleShowUserBlockedSuccessModal () {
      this.showUserBlockedSuccessModal = !this.showUserBlockedSuccessModal
    }
  }
})
</script>

<style scoped>
ion-grid, ion-col {
  padding: 0;
}
ion-card-content {
  padding: 0
}

ion-icon {
  color: #212325;
}
.card-header-center-text,
.card-content-center-text {
  text-align: center;
}
.low-side-padding-header {
  padding: 0;
}
ion-progress-bar {
  height: 7px;
  border-radius: 4px;
}
trauncated-text {
  font-size: 14px;
  line-height: 21px;
}
ion-card-title.dream-header {
  font-size: 16px;
  line-height: 140%;
  font-weight: 700;
  text-decoration: none;
  /*color: ;*/
}
@media only screen and (max-width: 350px) {
  ion-card-header {
    padding-left: 0px;
    padding-right: 0px;
  }
  ion-grid {
    padding-left: 0px;
    padding-right: 0px;
  }
}
</style>
