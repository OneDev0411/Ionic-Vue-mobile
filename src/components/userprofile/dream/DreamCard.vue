<template>
  <base-card>
    <template v-slot:image>
      <ion-img :src="dream.image" @click="navigateToDetail"></ion-img>
    </template>
    <template v-slot:header>
      <ion-card-header style="padding-top: 0;" class="low-side-padding-header">
        <dream-header :dream="dream"></dream-header>
      </ion-card-header>
    </template>

    <template v-slot:content>
      <ion-card-content>
        <ion-grid>
          <ion-row>
            <ion-col class="title_div">
              <!-- <router-link
                :to="{ name: 'dreamDetail', params: { id: dream.id } }"
              > -->
              <ion-card-title>{{ dream.title }}</ion-card-title>
              <!-- </router-link> -->
              <ion-button class="more_btn" @click="setOpenDeatilModal(true)">
                <ion-icon name="ellipsis-vertical" class="more-icon"></ion-icon>
              </ion-button>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col class="center-align-col">
              <truncated-text
                :text="dream.description"
                :limit="50"
              ></truncated-text>
            </ion-col>
          </ion-row>
          <ion-row>
            <dream-fund-widget
              :funded="funded"
              :total="required"
            ></dream-fund-widget>
            <!-- <ion-col>
              <ion-progress-bar
                color="secondary"
                :value="dream.progress / 100"
              ></ion-progress-bar>
            </ion-col>
          </ion-row>
          <ion-row> </ion-row>
          <ion-row>
            <ion-col> {{ dream.progress.toFixed(1) }}% Complete </ion-col> -->
          </ion-row>
          <ion-row>
            <dream-funtional :dream="dream"></dream-funtional>
          </ion-row>
        </ion-grid>
      </ion-card-content>
      <ion-modal
        class="detail_modal"
        :is-open="isOpenDetailModal"
        :initial-breakpoint="0.4"
        :breakpoints="[0, 0.4, 0.5]"
      >
        <div class="detail_modal_container">
          <div class="button_div">
            <button class="icon_button black">
              <img
                src="/assets/icon/save.svg"
                class="icon"
                @click="setSaveModalOpen(true)"
              />
              Save List
            </button>
            <button class="icon_button black" @click="setCopyModalOpen(true)">
              <img src="/assets/icon/link.svg" class="icon" />
              Copy Link
            </button>
            <button class="icon_button red">
              <img
                src="/assets/icon/delete.svg"
                @click="setDeleteModalOpen(true)"
                class="icon"
              />
              Delete Dream
            </button>
          </div>

          <button class="setting_btn radius" @click="handleEdit">
            <img src="/assets/icon/edit.svg" />
            Edit Dream
          </button>
          <button class="setting_btn" @click="handleEditSupporter">
            <img src="/assets/icon/hand.svg" />
            Edit Supporters
          </button>
        </div>
      </ion-modal>
      <ion-modal class="save_modal" :is-open="isOpenSaveModal">
        <div class="save_modal_container">
          <img src="/assets/avatars/userprofile/confirm.png" class="img1" />
          <ion-label class="text1">Dream Saved</ion-label>
        </div>
      </ion-modal>
      <ion-modal class="save_modal" :is-open="isOpenCopyModal">
        <div class="save_modal_container">
          <img src="/assets/avatars/userprofile/confirm.png" class="img1" />
          <ion-label class="text1">
            This notification link has been copy
          </ion-label>
        </div>
      </ion-modal>
      <ion-modal class="save_modal" :is-open="isOpenDeleteModal">
        <div class="save_modal_container">
          <ion-label class="text2">
            Are you sure?
          </ion-label>
          <ion-label class="text3">
            Removing this Dream
          </ion-label>
          <ion-label class="text4">
            cannot be undone!
          </ion-label>
          <div class="btn_div">
            <button class="styled_btn grey" @click="setDeleteModalOpen(false)">
              Cancel
            </button>
            <button class="styled_btn red" @click="handleDelete()">
              Delete
            </button>
          </div>
        </div>
      </ion-modal>
      <ion-modal class="save_modal" :is-open="isOpenConfirmModal">
        <div class="save_modal_container">
          <img src="/assets/avatars/userprofile/confirm.png" class="img1" />
          <ion-label class="text1">
            Dream successfully deleted!
          </ion-label>
        </div>
      </ion-modal>
      <ion-modal class="save_modal" :is-open="isOpenEditModal">
        <div class="save_modal_container">
          <img src="/assets/avatars/userprofile/car.png" class="img3" />
          <div class="div3">
            <ion-label class="text5">Enter your dream</ion-label>
            <ion-input
              class="input-div"
              v-model="title"
              type="text"
            ></ion-input>
          </div>
          <div class="div3">
            <ion-label class="text5">Description</ion-label>
            <ion-textarea
              class="textarea"
              v-model="description"
              type="text"
              row="20"
            ></ion-textarea>
          </div>
          <button @click="handleSave()" class="save_btn">
            Save
          </button>
        </div>
      </ion-modal>
    </template>
  </base-card>
</template>

<script>
import {
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonImg,
  IonModal,
  IonInput,
  IonTextarea
} from '@ionic/vue'
// import {} from "ionicons/icons";
import { defineComponent } from 'vue'
import BaseCard from '../../layout/BaseCard.vue'
import DreamHeader from './DreamHeader.vue'
import DreamFuntional from './DreamFuntional.vue'
import { useDreams } from '../../../stores/dreams'
import { getRelativePast } from '../../../helpers/time'

import DreamFundWidget from '../../../components/dream/DreamFundWidget.vue'

export default defineComponent({
  props: ['id'],
  components: {
    IonCardContent,
    IonCardHeader,
    DreamFuntional,
    IonCardTitle,
    IonImg,
    BaseCard,
    DreamHeader,
    DreamFundWidget,
    IonModal,
    IonInput,
    IonTextarea
  },
  data () {
    return {
      isOpenSaveModal: false,
      isOpenDetailModal: false,
      isOpenCopyModal: false,
      isOpenConfirmModal: false,
      isOpenEditModal: false,
      title: 'I want a new Mercedes',
      description:
        'A dream is a succession of images, ideas, emotions, and sensations that usually occur involuntarily in the mind during certain stages of sleep. Human spend about two hours dreaming per'
    }
  },
  methods: {
    navigateToDetail () {
      // this.$router.push({ name: 'dreamDetail', params: { id: this.id } })
    },
    setSaveModalOpen (isOpenSaveModal) {
      this.isOpenSaveModal = isOpenSaveModal
      this.isOpenDetailModal = false
    },
    setOpenDeatilModal (data) {
      this.isOpenDetailModal = data
    },
    setCopyModalOpen (data) {
      this.isOpenCopyModal = data
      this.isOpenDetailModal = false
    },
    setDeleteModalOpen (data) {
      this.isOpenDeleteModal = data
      this.isOpenDetailModal = false
    },
    handleDelete () {
      this.isOpenDeleteModal = false
      this.isOpenConfirmModal = true
    },
    handleEdit () {
      this.isOpenEditModal = true
      this.isOpenDetailModal = false
    },
    handleEditSupporter () {
      this.isOpenDetailModal = false
      this.$router.replace('/user/edit/supporters')
    }
  },
  setup () {
    const dreamStore = useDreams()
    return {
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
  }
})
</script>

<style scoped>
.card-header-center-text,
.card-content-center-text {
  text-align: center;
}
.low-side-padding-header {
  padding-left: 4px;
  padding-right: 4px;
  padding-bottom: 0;
}
ion-progress-bar {
  height: 7px;
  border-radius: 4px;
}
.more_btn {
  --background: #transparent;
  --box-shadow: none;
  color: #000;
  height: fit-content !important;
  padding: 0px !important;
  width: fit-content !important;
}
.more-icon {
  width: 20px;
  height: 20px;
}
.title_div {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.detail_modal::part(content) {
  border-radius: 16px 16px 0px 0px;
  box-shadow: 0px 4px 45px rgba(0, 0, 0, 0.25);
  background-color: #f9f8ff;
}
.detail_modal_container {
  padding: 45px 20px 40px 20px;
}
.icon_button {
  padding: 12px 0px;
  background: #ffffff;
  border-radius: 16px;
  width: 108px;
  height: 72px;
  font-weight: 400;
  font-size: 14px;
  line-height: 140%;
  display: grid;
  align-items: center;
}

.black {
  color: #212325;
}
.red {
  color: #ff6363;
}
.button_div {
  display: flex;
  justify-content: space-between;
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
  display: flex;
  width: 100%;
  align-items: center;
  text-align: start;
}
.setting_btn:last-child {
  border-radius: 0px 0px 16px 16px;
  border-bottom: 0px solid #e9ecf0;
}
.radius {
  margin-top: 20px;
  border-radius: 16px 16px 0px 0px;
}

.icon {
  justify-self: center;
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
.text1 {
  font-weight: 600;
  font-size: 18px;
  line-height: 140%;
  text-align: center;
  color: #212325;
}
.img1 {
  width: 36px;
  height: 36px;
  margin-bottom: 20px;
  justify-self: center;
}

.img3 {
  width: 100%;
  border-radius: 16px;
}

.btn_div {
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
}
.styled_btn {
  background: transparent;
  border: none;
  font-weight: 700;
  font-size: 16px;
  line-height: 140%;
}
.grey {
  color: #787c80;
}
.text2 {
  font-weight: 700;
  font-size: 18px;
  line-height: 140%;
  display: block;
  color: #323538;
}
.text3 {
  font-weight: 500;
  font-size: 16px;
  line-height: 130%;
  display: block;
  color: #323538;
}
.textarea {
  border: 1px solid #83dcdf;
  border-radius: 8px;
  background: #fff;
  height: 150px;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #212325;
}
.input-div {
  padding: 12px 16px;
  border: 1px solid #83dcdf;
  border-radius: 8px;
  background: #ffffff;
  height: 48px;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #212325;
}
.text5 {
  font-weight: 400;
  font-size: 16px;
  line-height: 130%;
  color: #b8b8b8;
  margin-top: 23px;
}
.save_btn {
  height: 50px;
  left: 20px;
  top: 532px;
  padding: 11px 109px;
  background: #866ee1;
  border-radius: 16px;
  margin-top: 41px;
  color: #fff;
}
.div3 {
  text-align: left;
  margin-top: 23px;
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
