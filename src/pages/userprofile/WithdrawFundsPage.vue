<template>
  <base-layout page-title="WithdrawFundsPage">
    <template v-slot:header>
      <ion-header class="header">
        <ion-toolbar class="header">
          <ion-title class="title">Withdraw Funds</ion-title>
        </ion-toolbar>
      </ion-header>
    </template>
    <template v-slot:default>
      <div class="container">
        <div class="confirmDiv">
          <img
            class="confirmImg"
            src="/assets/avatars/userprofile/confirm.png"
          />
        </div>
        <div class="confirmDiv">
          <ion-label class="title">DREAM ACHIEVED!</ion-label>
        </div>
        <img class="image" src="/assets/avatars/userprofile/car.png" />
        <div class="card">
          <div class="grid">
            <ion-label class="text">Buying a New Car</ion-label>
            <ion-label class="text2">
              $30,000
              <ion-label class="text3">/$30,300</ion-label>
            </ion-label>
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
        <div class="btn_div">
          <button class="withdraw_btn">Withdraw Funds</button>
          <button class="create_btn">Create Another Dream</button>
        </div>
      </div>
    </template>
  </base-layout>
</template>

<script>
import { IonLabel } from '@ionic/vue'
import { FUNDED_DREAMS_DATA } from './mockup.tsx'

export default {
  setup() {},
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  components: {
    IonLabel,
  },
  data() {
    return {
      fundedDreams: [],
    }
  },
  computed: {
    rotation() {
      // if (this.total) {
      //   return ((this.funded / this.total) * 180).toFixed(0) + 'deg'
      // }
      return '180deg'
    },
  },
  mounted() {
    this.$nextTick(async () => {
      this.fundedDreams = FUNDED_DREAMS_DATA
    })
  },
}
</script>

<style scoped>
.header {
  height: 0px !important;
}
.container {
  padding: 20px;
}
.title {
  font-weight: 700;
  font-size: 32px;
  line-height: 120%;
  text-align: center;
  color: #866ee1;
}
.confirmImg {
  width: 92px;
  height: 92px;
}
.image {
  border-radius: 16px;
  width: 100%;
  margin-top: 40px;
}
.confirmDiv {
  width: 100%;
  text-align: center;
}
.card {
  background: linear-gradient(97.99deg, #15b932 -1.97%, #b6d11b 99.08%);
  box-shadow: 0px 0px 14px rgba(0, 110, 73, 0.04);
  border-radius: 16px;
  width: 100%;
  height: 114px;
  padding: 23px 21px;
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
.withdraw_btn {
  padding: 11px 30px;
  height: 50px;
  background: #866ee1;
  border-radius: 16px;
  border: 1px solid #866ee1;
  color: #fff;
  width: 100%;
}
.create_btn {
  padding: 11px 30px;
  height: 50px;
  background: #fff;
  border-radius: 16px;
  border: 1px solid #866ee1;
  color: #31265a;
  margin-top: 16px;
  width: 100%;
}
.btn_div {
  margin-top: 50px;
  width: 100%;
}
</style>
