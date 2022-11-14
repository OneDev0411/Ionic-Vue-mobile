<template>
  <ion-grid>
    <ion-row class="dream-fulfilment">
      <ion-col size="auto">
        <ion-grid>
          <ion-row>
            <ion-col>
              <ion-text class="text-head"> Dream Fulfillment Progress </ion-text>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <ion-text class="funded">
                ${{ (funded ? funded : 0).toLocaleString() }}
              </ion-text>
              <ion-text class="total">
                / ${{ (total ? total : 0).toLocaleString() }}
              </ion-text>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col class="last-activity">
              <ion-text class> Last activity: {{ lastActive }} </ion-text>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-col>
      <ion-col size="auto" style="margin: auto">
        <div class="circle-wrap ion-float-right">
          <div class="circle">
            <div class="mask full">
              <div class="fill"></div>
            </div>
            <div class="mask half">
              <div class="fill"></div>
            </div>
            <div class="inside-circle">{{ percentage }}%</div>
          </div>
        </div>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script>
import { IonText } from '@ionic/vue'
import { getRelativePast } from '../../helpers/time'
export default {
  props: {
    funded: {
      type: Number,
      default: 75
    },
    total: {
      type: Number,
      default: 1000
    },
    updated: {
      type: String,
      default: '01/01/2020'
    }
  },
  components: { IonText },
  computed: {
    percentage () {
      if (this.total) {
        return ((this.funded / this.total) * 100).toFixed(0)
      }
      return 100
    },
    rotation () {
      if (this.total) {
        return ((this.funded / this.total) * 180).toFixed(0) + 'deg'
      }
      return '180deg'
    },
    lastActive () {
      return getRelativePast(this.updated)
    }
  }
}
</script>

<style scoped>
ion-row.dream-fulfilment {
  margin: 20px 0;
  background: linear-gradient(97.99deg, #866ee1 -1.97%, #59d1d4 99.08%);
  box-shadow: 0px 0px 12.4px rgba(0, 110, 73, 0.04);
  border-radius: 15px;
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
  background: #59d1d4;
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

ion-text.funded {
  font-weight: 700;
  font-size: 28px;
  line-height: 36px;
}
ion-text.total {
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  opacity: 0.6;
}
ion-text {
  color: #FFF;
}
ion-text.dream-fulfilment {
  font-size: 12px;
  line-height: 16px;
}

ion-text.last-activity {
  font-size: 14px;
  line-height: 18px;
  font-weight: 500;
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
