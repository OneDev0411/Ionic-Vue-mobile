<template>
  <div class="root">
    <div class="display_flex">
      <div class="display_flex">
        <img class="avatar" :src="data.avatar" />
        <ion-label class="name">
          {{ data.name }}
        </ion-label>
      </div>
      <ion-label class="date">Created: {{ data.date }}</ion-label>
    </div>

    <img class="image" :src="data.image" />

    <div class="display_flex">
      <ion-label class="title">{{ data.title }}</ion-label>
      <ion-button class="more_btn" :id="data.id">
        <ion-icon name="ellipsis-vertical" class="more-icon"></ion-icon>
      </ion-button>
    </div>
    <div>
      <ion-label class="desc">
        {{ data.desc }}
        <ion-label class="more">Read More</ion-label>
      </ion-label>
    </div>
    <div class="card">
      <div class="grid">
        <ion-label class="text">Completed</ion-label>
        <ion-label class="text2">
          $30,000
          <ion-label class="text3">/$30,300</ion-label>
        </ion-label>
        <ion-label class="text4">Last activity: 12/02/2021</ion-label>
      </div>
      <div>
        <div class="circle-wrap ion-float-right">
          <div class="circle">
            <div class="mask full">
              <div class="fill"></div>
            </div>
            <div class="mask half">
              <div class="fill"></div>
            </div>
            <div class="inside-circle">100%</div>
            <!-- <div class="inside-circle">{{ percentage }}%</div> -->
          </div>
        </div>
      </div>
    </div>
    <ion-modal
      :trigger="data.id"
      :initial-breakpoint="0.2"
      :breakpoints="[0, 0.2, 0.4]"
    >
      <div class="detail_modal_container">
        <button class="setting_btn" @click="handleFinancier">
          <img src="/assets/icon/edit.svg" class="align" />
          Financier List
        </button>
        <button class="setting_btn" @click="handleWithdraw">
          <img src="/assets/icon/hand.svg" class="align" />
          Withdraw Funds
        </button>
      </div>
    </ion-modal>
  </div>
</template>

<script>
import { IonLabel, IonModal } from '@ionic/vue'
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  methods: {
    async handleFinancier () {
      this.$router.replace('/user/financiers')
    },
    async handleWithdraw () {
      this.$router.replace('/user/withdraw')
    }
  },
  components: {
    IonLabel,
    IonModal
  },
  computed: {
    rotation () {
      // if (this.total) {
      //   return ((this.funded / this.total) * 180).toFixed(0) + 'deg'
      // }
      return '180deg'
    }
  }
})
</script>

<style scoped>
.root {
  background: #ffffff;
  box-shadow: 0px 4px 15px rgba(14, 12, 18, 0.08);
  border-radius: 16px;
  padding: 20px;
}
.avatar {
  width: 18px;
  height: 18px;
  margin-right: 5px;
}
.display_flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.image {
  border-radius: 16px;
  margin-top: 20px;
  width: 100%;
  margin-bottom: 20px;
}
.card {
  background: linear-gradient(97.99deg, #15b932 -1.97%, #b6d11b 99.08%);
  box-shadow: 0px 0px 14px rgba(0, 110, 73, 0.04);
  border-radius: 16px;
  width: 100%;
  height: 114px;
  padding: 15px;
  margin-top: 22px;
  display: flex;
  justify-content: space-between;
}
.desc {
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  color: #323538;
  margin-top: 8px;
}
.more {
  color: #59d1d4;
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
}
.title {
  font-weight: 700;
  font-size: 16px;
  line-height: 140%;
  color: #212325;
}
.more_btn {
  --background: #transparent;
  --box-shadow: none;
  color: #000;
  height: fit-content;
}
.more-icon {
  width: 20px;
  height: 20px;
}
.name {
  font-weight: 500;
  font-size: 12px;
  line-height: 130%;
  color: #787c80;
}
.grid {
  display: grid;
}
.date {
  font-weight: 400;
  font-size: 12px;
  line-height: 130%;
  color: #787c80;
}
.text {
  font-weight: 400;
  font-size: 12px;
  line-height: 130%;
  color: #ffffff;
  display: block;
}
.text2 {
  font-weight: 700;
  font-size: 28px;
  line-height: 130%;
  color: #ffffff;
  display: block;
}
.text3 {
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  color: #ffffff;
  opacity: 0.6;
}
.text4 {
  font-weight: 500;
  font-size: 14px;
  line-height: 130%;
  color: #ffffff;
  display: block;
}

.circle-wrap {
  width: 78px;
  height: 78px;
  background: #ace8e9;
  border-radius: 50%;
}
.circle-wrap .circle .mask,
.circle-wrap .circle .fill {
  width: 78px;
  height: 78px;
  position: absolute;
  border-radius: 50%;
}

.circle-wrap .circle .mask {
  clip: rect(0px, 78px, 78px, 39px);
}

.circle-wrap .inside-circle {
  width: 66px;
  height: 66px;
  border-radius: 50%;
  background: #8bc34a;
  line-height: 65px;
  text-align: center;
  margin-top: 6px;
  margin-left: 6px;
  color: #ffff;
  position: absolute;
  z-index: 100;
  font-weight: 700;
  font-size: 18px;
}

/* color animation */

/* 3rd progress bar */
.mask .fill {
  clip: rect(0px, 39px, 78px, 0px);
  background-color: #ffff;
  border-radius: 5px;
}

.mask.full,
.circle .fill {
  animation: fill ease-in-out 3s;
  transform: rotate(v-bind(rotation));
}

.funded {
  font-weight: 700;
  font-size: 28px;
}
.total {
  font-weight: 400;
  font-size: 14px;
  opacity: 0.6;
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
