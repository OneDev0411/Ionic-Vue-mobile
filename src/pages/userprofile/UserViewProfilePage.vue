<template>
  <base-layout page-title="ProfilePage">
    <template v-slot:header>
      <ion-header>
        <ion-toolbar>
          <div class="toolbar">
            <ion-buttons>
              <ion-back-button></ion-back-button>
            </ion-buttons>

            <ion-title class="title">User Profile</ion-title>
          </div>
        </ion-toolbar>
      </ion-header>
    </template>
    <template v-slot:default>
      <ion-content>
        <!-- <div class="crop">
            <ion-img v-if="!!user.backgroundPhoto" :src="user.backgroundPhoto" />
          </div> -->

        <ion-grid class="root">
          <ion-row class="avatar-div">
            <ion-col size="4" class="avatar-div">
              <ion-thumbnail
                v-if="!!userStore.profilePhoto"
                class="rounded-thumbnail"
              >
                <ion-img :src="userStore.profilePhoto" />
              </ion-thumbnail>

              <ion-icon
                v-else
                :icon="personCircleOutline"
                class="large-icon"
              ></ion-icon>
            </ion-col>
            <ion-col class="height">
              <ion-row class="space">
                <ion-col>
                  <ion-label class="text1">
                    {{ userStore.displayName }}
                  </ion-label>
                  <ion-label class="text2">Accountant</ion-label>
                </ion-col>
                <ion-col class="col1">
                  <!-- <ion-button class="more_btn" id="user_detail_modal"> -->
                  <ion-icon
                    id="user_detail_modal"
                    name="ellipsis-vertical"
                    class="more-icon"
                  ></ion-icon>
                  <!-- </ion-button> -->
                </ion-col>
              </ion-row>
              <div class="space">
                <div class="fit_width">
                  <ion-label class="text3">116</ion-label>
                  <ion-label class="text6">Supporters</ion-label>
                </div>
                <div class="fit_width">
                  <ion-label class="text3">500</ion-label>
                  <ion-label class="text6">Supporting</ion-label>
                </div>
                <div class="fit_width">
                  <ion-label class="text3">20</ion-label>
                  <ion-label class="text6">Dreams</ion-label>
                </div>
              </div>
            </ion-col>
          </ion-row>

          <!-- <ion-row>
              <photo-slider
                :images="storyImages"
                :is-opened="photoSliderOpened"
                :starting-index="photoSliderIndex"
                :is-self="isSelf"
                @click-close="setSliderOpen(false)"
                @click-remove="removeStoryPhoto"
              ></photo-slider>
            </ion-row> -->

          <ion-row>
            <ion-col class="center-align-col">
              <ion-thumbnail
                class="boxed-thumbnail"
                v-for="(image, index) in storyImages"
                :key="image"
                @click="triggerPhotoModal(index)"
              >
                <ion-img :src="image" />
              </ion-thumbnail>
              <photo-component
                v-if="showAddStoryButton"
                @image-loaded="addStoryPhoto"
              >
                <ion-button fill="clear" class="profile-story-button">
                  <ion-icon :icon="addCircle" class="medium-icon"></ion-icon>
                </ion-button>
              </photo-component>
            </ion-col>
          </ion-row>

          <ion-row>
            <ion-label class="text4">
              I started this dream because I just started a new family with
              kids. I've been struggling...
              <ion-label class="text5">Read More</ion-label>
            </ion-label>
          </ion-row>
          <ion-row>
            <button @click="handleSupport" class="support-btn">
              Follow me
            </button>
            <button class="chat-btn">
              <ion-icon
                class="chat-icon"
                name="chatbubble-ellipses-outline"
              ></ion-icon>
            </button>
          </ion-row>
          <!-- <ion-row>
              <dream-filter-tabs
                @tab-selected="setTab"
                :selectable="['My Dreams', 'Funded Dreams', 'Achieved']"
              ></dream-filter-tabs>
            </ion-row>
            <ion-row>
              <ion-col size="12">
                <dream-list :user-id="user.id"></dream-list>
              </ion-col>
            </ion-row> -->
        </ion-grid>
        <dream-filter-tabs
          @tab-selected="setTab"
          :selectable="['My Dreams', 'Funded Dreams', 'Achieved']"
        ></dream-filter-tabs>
        <ion-grid v-if="selectedTab === 'My Dreams'">
          <ion-row v-for="dream in dreams" :key="dream.id">
            <ion-col>
              <dream-card :id="dream.id" :boxed-image="true"></dream-card>
            </ion-col>
          </ion-row>
        </ion-grid>
        <ion-grid class="root" v-else-if="selectedTab === 'Funded Dreams'">
          <ion-row class="margin" v-for="data in fundedDreams" :key="data.id">
            <ion-col>
              <FundedDreamCard :data="data"></FundedDreamCard>
            </ion-col>
          </ion-row>
        </ion-grid>
        <ion-grid class="root" v-else>
          <ion-row class="margin" v-for="data in achievedDreams" :key="data.id">
            <ion-col>
              <AchievedCard :data="data"></AchievedCard>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-content>
      <ion-modal
        class="detail_modal"
        :is-open="isOpenDetailModal"
        :initial-breakpoint="0.4"
        :breakpoints="[0, 0.4, 0.5]"
      >
        <div class="detail_modal_container">
          <button class="setting_btn radius" @click="handleEdit">
            <img src="/assets/icon/save.svg" />
            Save Profile
          </button>
          <button class="setting_btn" @click="handleEditSupporter">
            <img src="/assets/icon/hand.svg" />
            Report Profile
          </button>
        </div>
      </ion-modal>
      <ion-modal class="save_modal" :is-open="isOpenConfirmModal">
        <div class="save_modal_container">
          <img src="/assets/avatars/userprofile/confirm.png" class="img1" />
          <ion-label class="text1">
            User Profile Saved
          </ion-label>
        </div>
      </ion-modal>
      <ion-modal class="save_modal" :is-open="isOpenReportModal">
        <div class="save_modal_container">
           <ion-label>Please select</ion-label>
        </div>
      </ion-modal>
    </template>
  </base-layout>
</template>

<script>
import {
  notificationsOutline,
  settingsOutline,
  createOutline,
  personCircleOutline,
  personAddOutline,
  chatbubbleEllipsesOutline,
  flagOutline,
  starOutline,
  addCircle,
  person,
} from 'ionicons/icons'
import {
  IonImg,
  IonContent,
  IonThumbnail,
  IonToolbar,
  IonBackButton,
  // IonTitle,
  alertController,
  IonModal,
} from '@ionic/vue'
import DreamFilterTabs from '../../components/userprofile/DreamFilterTabs.vue'
import DreamCard from '../../components/userprofile/dream/DreamCard.vue'
import { useDreams } from '../../stores/dreams'
import { useUser } from '../../stores/user'
import { useUsers } from '../../stores/users'
// import DreamList from '../../components/userprofile/DreamList.vue'
import PhotoComponent from '../../components/utils/PhotoComponent.vue'
// import PhotoSlider from '../../components/layout/PhotoSlider.vue'
import FundedDreamCard from '../../components/userprofile/FundedDreamCard.vue'
import AchievedCard from '../../components/userprofile/AchievedCard.vue'
import { FUNDED_DREAMS_DATA, ACHIEVED_DATA } from './mockup.tsx'

export default {
  setup() {
    const userStore = useUser()
    const otherUserStore = useUsers()
    const dreamStore = useDreams()
    return {
      personCircleOutline,
      notificationsOutline,
      settingsOutline,
      createOutline,
      chatbubbleEllipsesOutline,
      personAddOutline,
      flagOutline,
      addCircle,
      starOutline,
      userStore,
      otherUserStore,
      person,
      dreamStore,
    }
  },
  components: {
    // DreamList,
    IonImg,
    IonContent,
    DreamFilterTabs,
    IonThumbnail,
    IonToolbar,
    IonBackButton,
    // IonTitle,
    PhotoComponent,
    DreamCard,
    // PhotoSlider
    FundedDreamCard,
    AchievedCard,
    IonModal,
  },
  data() {
    return {
      selectedTab: 'My Dreams',
      user: {},
      isSelf: false,
      photoSliderOpened: false,
      photoSliderIndex: 0,
      storyImages: [],
      isFriend: false,
      dreams: [],
      fundedDreams: [],
      achievedDreams: [],
    }
  },
  methods: {
    async handleEditProfile() {
      this.$router.replace('/edit/profile')
    },
    async handleSupporters() {
      this.$router.replace('/user/supporters')
    },
    async handleFavorites() {
      this.$router.replace('/user/favorites')
    },
    async handleSupport() {
      // this.$router.replace('/settings/profile')
      this.$router.replace('/marketplace/lists')
    },
    editBackgroundPhoto(image) {
      this.userStore.updateBackgroundPhoto(image.dataUrl)
    },

    async getUser() {
      if (this.userStore.id == this.$route.params.id) {
        return this.userStore
      } else {
        return await this.otherUserStore.getUserById(this.$route.params.id)
      }
    },
    setSliderOpen(value) {
      this.photoSliderOpened = value
    },
    triggerPhotoModal(index) {
      this.photoSliderIndex = index
      this.setSliderOpen(true)
    },
    async addStoryPhoto(image) {
      await this.userStore.addStoryPhoto(image)
      this.photoSliderIndex = this.userStore.storyImages.length - 1
      await this.getStoryPhotos()
      this.setSliderOpen(true)
    },
    removeStoryPhoto(image) {
      this.userStore.removeStoryPhoto(image)
    },
    async getStoryPhotos() {
      if (this.isSelf) {
        this.storyImages = await this.userStore.getStoryImages()
      } else {
        this.storyImages = await this.otherUserStore.getStoryImages(
          this.$route.params.id,
        )
      }
    },
    async sendFriendRequest() {
      const response = await this.otherUserStore.sendFriendRequest(
        this.$route.params.id,
      )
      const alert = await alertController.create({
        cssClass: 'my-custom-class',
        header: 'Friend request',
        subHeader: 'Details',
        message: response,
        buttons: ['OK'],
      })
      await alert.present()
      // const { role } = await alert.onDidDismiss()
    },
    async checkFriendship() {
      const response = await this.otherUserStore.checkFriendship(
        this.$route.params.id,
      )
      return response
    },
    async removeFriend() {
      const response = await this.otherUserStore.removeFriend(
        this.$route.params.id,
      )
      const alert = await alertController.create({
        cssClass: 'my-custom-class',
        header: 'Friend request',
        subHeader: 'Details',
        message: response,
        buttons: ['OK'],
      })
      await alert.present()
      // const role = await alert.onDidDismiss()
    },
    setTab(tabName) {
      this.selectedTab = tabName
    },
  },
  computed: {
    showAddStoryButton() {
      return this.isSelf && this.userStore.storyImages.length < 5
    },
  },
  mounted() {
    this.$nextTick(async () => {
      this.dreams = this.dreamStore.getDreamById(this.$route.params.id)
      this.fundedDreams = FUNDED_DREAMS_DATA
      this.achievedDreams = ACHIEVED_DATA
      this.dreams = this.dreamStore.getBookmarkedDreams
      if (this.searchText !== '') {
        this.dreams = this.dreams.filter((dream) =>
          dream.title?.toLowerCase().includes(this.searchText.toLowerCase()),
        )
      }
      await this.dreamStore.loadAllDreams()
      this.user = await this.getUser()
      this.isSelf = this.userStore.id === this.$route.params.id
      if (!this.isSelf) {
        this.isFriend = await this.checkFriendship()
      }
      await this.getStoryPhotos()
    })
  },
}
</script>

<style scoped>
.toolbar {
  display: flex;
}
.root {
  padding: 20px;
}
.margin {
  margin-top: 20px;
}
.margin:first-child {
  margin-top: 0px;
}
.crop {
  width: auto;
  height: 20%;
  overflow: hidden;
}
.more_btn {
  --background: #transparent;
  --box-shadow: none;
  color: #000;
  height: fit-content;
}
.left-align-col {
  text-align: left;
}
.right-align-col {
  text-align: right;
}
.center-align-col {
  text-align: center;
  display: flex;
  justify-content: center;
}
.rounded-thumbnail {
  --border-radius: 100%;
  border: solid white 5px;
  /* transform: translate(0%, -60%); */
  --size: 106px;
}
.boxed-thumbnail {
  --border-radius: 25%;
  --size: 64px;
  margin: 5px;
  box-shadow: 2px 2px 4px var(--ion-color-primary);
}

.background-edit {
  transform: translate(110%, -150%);
  --ionicon-stroke-width: 56px;
}
.reduced-with {
  width: 1px;
  overflow: visible;
}
.reduced-height {
  height: 1px;
  overflow: visible;
}
.radius {
  margin-top: 20px;
  border-radius: 16px 16px 0px 0px;
}
.bold {
  font-weight: bold;
}
.certer-align {
  text-align: center;
}
.large-icon {
  width: 106px;
  height: 106px;
  color: var(--ion-color-primary);
}
.medium-icon {
  font-size: 64px;
  color: var(--ion-color-primary);
}
.profile-story-button {
  height: 64px;
  width: 64px;
  --padding-start: 0;
  --padding-end: 0;
}
.space {
  justify-content: space-between;
  display: flex;
}
.save_modal::part(content) {
  border-radius: 16px 16px 16px 16px;
  box-shadow: 0px 4px 45px rgba(0, 0, 0, 0.25);
  background-color: #f9f8ff;
  width: 310px;
  height: fit-content;
}
.save_modal_container {
  padding: 20px;
  display: grid;
  text-align: center;
}
.img1 {
  width: 36px;
  height: 36px;
  margin-bottom: 20px;
  justify-self: center;
}
.text1 {
  font-weight: 700;
  font-size: 18px;
  line-height: 140%;
  color: #212325;
  display: block;
}
.text2 {
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  color: #787c80;
  display: block;
}
.text3 {
  font-weight: 500;
  font-size: 16px;
  line-height: 130%;
  color: #212325;
  display: block;
}
.text4 {
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  color: #787c80;
}
.text5 {
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  color: #59d1d4;
}
.text6 {
  font-weight: 400;
  font-size: 12px;
  line-height: 130%;
  color: #787c80;
  display: block;
}
.avatar-div {
  justify-content: center;
  display: flex;
  align-items: center;
}
.support-btn {
  padding: 11px 30px;
  background: #866ee1;
  color: #fff;
  font-weight: 700;
  font-size: 16px;
  border: none;
  border-radius: 8px !important;
  width: 158px;
  height: 50px;
  margin-top: 20px;
}
.chat-btn {
  width: 55px;
  height: 50px;
  border: 1px solid #787c80;
  background: transparent;
  border-radius: 8px !important;
  margin-left: 12px;
  margin-top: 20px;
}
.chat-icon {
  color: #787c80;
  width: 20px;
  height: 20px;
}
.col1 {
  text-align: end;
}
.more-icon {
  width: 20px;
  height: 20px;
}
.title {
  text-align: center;
  margin-right: 40px;
}
.height {
  height: fit-content;
}
.detail_modal_container {
  padding: 45px 20px 40px 20px;
}
.setting_btn {
  background: #fff;
  height: 50px;
  color: #212325;
  font-weight: 400;
  font-size: 14px;
  line-height: 140%;
  padding: 0px 20px;
  border: none;
  border-bottom: 1px solid #e9ecf0;
  margin: 0px;
  display: block;
  width: 100%;
  text-align: start;
}
.setting_btn:last-child {
  border-radius: 0px 0px 16px 16px;
  border-bottom: 0px solid #e9ecf0;
}
.setting_btn:first-child {
  border-radius: 16px 16px 0px 0px;
}
ion-modal::part(content) {
  border-radius: 16px 16px 0px 0px;
  box-shadow: 0px 4px 45px rgba(0, 0, 0, 0.25);
  background-color: #f9f8ff;
}
.fit_width {
  width: fit-content;
}
.icon1 {
  vertical-align: sub;
}

@media only screen and (max-width: 350px) {
  .no-left-padding {
    --padding-start: 0;
  }
  .no-right-padding {
    --padding-end: 0;
  }
  .background-edit {
    transform: translate(50%, -150%);
    --ionicon-stroke-width: 56px;
  }
  ion-icon {
    font-size: 24px;
  }
  ion-title {
    padding-right: 30px;
    padding-left: 30px;
  }
}
</style>
