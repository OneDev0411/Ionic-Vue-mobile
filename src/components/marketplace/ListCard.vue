<template>
  <div class="root">
    <div class="div">
      <button class="more_btn" @click="setOpenDeatilModal(true)">
        <img src="/assets/icon/more_vertical.svg" />
      </button>
    </div>

    <img class="image" :src="data.image" />

    <div class="display_flex">
      <ion-label class="name">{{ data.name }}</ion-label>
    </div>
    <div class="display_flex">
      <div>
        <ion-label class="price">${{ data.price }}</ion-label>
        <ion-label class="text">
          {{ ` ` }}
          <img src="/assets/icon/dot.svg" class="dot" />
          {{ ` ` }}
          {{ data.status }}
        </ion-label>
      </div>
      <div>
        <ion-label class="date">Listed on:{{ data.date }}</ion-label>
      </div>
    </div>
    <ion-modal
      :is-open="isOpenDetailModal"
      :initial-breakpoint="0.3"
      :breakpoints="[0, 0.3, 0.5]"
    >
      <div class="detail_modal_container">
        <button class="setting_btn">
          <ion-icon name="eye-outline" class="icon1"></ion-icon>
          View listing
        </button>
        <button class="setting_btn" @click="setOpenSocialModal">
          <img src="/assets/icon/share.svg" class="align" />
          Share
        </button>
        <button class="setting_btn" @click="setDeleteModalOpen">
          <img src="/assets/icon/active_delete.svg" class="align" />
          Delete
        </button>
      </div>
    </ion-modal>
    <ion-modal class="save_modal" :is-open="isOpenDeleteModal">
      <div class="save_modal_container">
        <ion-label class="text2">
          Are you sure?
        </ion-label>
        <ion-label class="text3">
          Removing this listed image be
        </ion-label>
        <ion-label class="text3">
          undone!
        </ion-label>
        <div class="btn_div">
          <button class="styled_btn grey" @click="setDeleteModalOpen">
            Cancel
          </button>
          <button class="styled_btn red" @click="handleDelete">
            Delete
          </button>
        </div>
      </div>
    </ion-modal>

    <ion-modal class="save_modal" :is-open="isOpenConfirmModal">
      <div class="save_modal_container">
        <img src="/assets/avatars/userprofile/confirm.png" class="img1" />
        <ion-label class="text1">
          Successfully Deleted
        </ion-label>
      </div>
    </ion-modal>

    <ion-modal class="save_modal" :is-open="isOpenSocialModal">
      <div class="save_modal_container">
        <ion-label class="text2">
          Share this link via
        </ion-label>
        <div class="display_flex margin_top20">
          <button class="social_btn">
            <img class="img2" src="/assets/icon/facebook.svg" />
            <ion-label>Facebook</ion-label>
          </button>
          <button class="social_btn">
            <img class="img2" src="/assets/icon/instagram.svg" />
            <ion-label>Instagrm</ion-label>
          </button>
          <button class="social_btn">
            <img class="img2" src="/assets/icon/twitter.svg" />
            <ion-label>twitter</ion-label>
          </button>
        </div>
        <div class="link_div">
          <div class="display_flex">
            <img src="/assets/icon/link.svg" />
            <ion-label class="link">hqFfFkdkawdadaQ</ion-label>
          </div>
          <button class="copy_btn">
            <img src="/assets/icon/copy.svg" />
          </button>
        </div>
      </div>
    </ion-modal>
  </div>
</template>

<script>
import { IonLabel, IonModal } from '@ionic/vue'
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      isOpenDetailModal: false,
      isOpenDeleteModal: false,
      isOpenSocialModal: false,
    }
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async handleFinancier() {
      this.$router.replace('/user/financiers')
    },
    async handleWithdraw() {
      this.$router.replace('/user/withdraw')
    },
    setOpenSocialModal() {
      this.isOpenSocialModal = true
      this.isOpenDetailModal = false
    },
    setOpenDeatilModal(data) {
      this.isOpenDetailModal = data
    },
    setDeleteModalOpen() {
      this.isOpenDeleteModal = true
      this.isOpenDetailModal = false
    },
    handleDelete() {
      this.isOpenDeleteModal = false
      this.isOpenConfirmModal = true
    },
  },
  components: {
    IonLabel,
    IonModal,
  },
})
</script>

<style scoped>
.root {
  background: #ffffff;
  box-shadow: 0px 4px 15px rgba(14, 12, 18, 0.08);
  border-radius: 16px;
  padding: 20px;
}
.margin_top20 {
  margin-top: 20px;
}
.img2 {
  justify-content: center;
}
.social_btn {
  display: grid;
  height: 52px;
  background: transparent;
  border: none;
  color: #d1d1d6;
  text-align: center;
  align-items: center;
  justify-content: center;
  justify-items: center;
  justify-self: center;
}
.name {
  font-weight: 700;
  font-size: 16px;
  line-height: 140%;
  color: #1a181e;
  margin-bottom: 7px;
}
.price {
  font-weight: 700;
  font-size: 16px;
  line-height: 140%;
  color: #866ee1;
}
.text {
  font-weight: 400;
  font-size: 16px;
  line-height: 130%;
  text-align: right;
  color: #787c80;
}
.date {
  font-weight: 400;
  font-size: 14px;
  line-height: 140%;
  text-align: right;
  color: #787c80;
}
.display_flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.image {
  border-radius: 8px;
  width: 100%;
  margin-bottom: 10px;
}
.title {
  font-weight: 700;
  font-size: 16px;
  line-height: 140%;
  color: #212325;
}
.more_btn {
  z-index: 2;
  background: #fff;
  box-shadow: none;
  border-radius: 50%;
  color: #212325;
  height: 28px;
  width: 28px;
  margin-top: 10px;
}
.more-icon {
  width: 20px;
  height: 20px;
}
.dot {
  margin-bottom: 4px;
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
.setting_btn:last-child {
  border-radius: 0px 0px 16px 16px;
  border-bottom: 0px solid #e9ecf0;
}
.setting_btn:first-child {
  border-radius: 16px 16px 0px 0px;
}
ion-text {
  font-family: 'Manrope';
  color: #ffff;
}
ion-modal::part(content) {
  border-radius: 16px 16px 0px 0px;
  box-shadow: 0px 4px 45px rgba(0, 0, 0, 0.25);
  background-color: #f9f8ff;
}
.detail_modal_container {
  padding: 45px 20px 40px 20px;
}
.align {
  vertical-align: sub;
  margin-right: 10px;
}
.icon1 {
  vertical-align: middle;
  margin-right: 10px;
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
.red {
  color: #ff6363;
}
.img1 {
  width: 36px;
  height: 36px;
  margin-bottom: 20px;
  justify-self: center;
}
.text1 {
  font-weight: 600;
  font-size: 18px;
  line-height: 140%;
  text-align: center;
  color: #212325;
}
.div {
  height: 0px;
  padding-right: 10px;
  justify-content: flex-end;
  display: flex;
}
.link_div {
  border: 1px solid #d1d1d6;
  width: 100%;
  height: 45px;
  border-radius: 8px;
  margin-top: 40px;
  display: flex;
  align-items: center;
  padding-left: 16px;
  justify-content: space-between;
}
.link {
  font-weight: 400;
  font-size: 16px;
  line-height: 130%;
  color: #212325;
}
.copy_btn {
  height: 48px;
  width: 54px;
  background: #866ee1;
  border-radius: 8px;
}

@keyframes fill {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(v-bind(rotation));
  }
}
</style>
