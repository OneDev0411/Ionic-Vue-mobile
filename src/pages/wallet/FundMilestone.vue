<template>
  <base-layout page-title="Fund Milestone">
    <template v-slot:default>
      <ion-grid>
        <ion-row class="interval-row">
          <ion-col>
            <ion-item>
              <ion-select
                value="interval"
                placeholder="Interval"
                @ionChange="setInterval($event.detail.value)"
              >
                <ion-select-option value="once">Fund Once</ion-select-option>
                <ion-select-option value="daily">Daily</ion-select-option>
                <ion-select-option value="weekly">Weekly</ion-select-option>
                <ion-select-option value="biweekly">Biweekly</ion-select-option>
                <ion-select-option value="monthly">Monthly</ion-select-option>
              </ion-select>
            </ion-item>
          </ion-col>
        </ion-row>

        <ion-row class="amount-btn-row">
          <ion-col>
            <ion-button
              size="large"
              expand="full"
              class="white-button white-button-left"
              @click="setAmount(50)"
              >$50</ion-button
            >
          </ion-col>
          <ion-col>
            <ion-button
              size="large"
              expand="full"
              class="white-button"
              @click="setAmount(100)"
              >$100</ion-button
            >
          </ion-col>
        </ion-row>
        <ion-row class="amount-btn-row">
          <ion-col>
            <ion-button
              size="large"
              expand="full"
              class="white-button white-button-left"
              @click="setAmount(500)"
              >$500</ion-button
            >
          </ion-col>
          <ion-col>
            <ion-button
              size="large"
              expand="full"
              class="white-button"
              @click="setAmount(1000)"
              >$1000</ion-button
            >
          </ion-col>
        </ion-row>

        <ion-row>
          <ion-col>
            <div class="hr-container">
              <hr class="hr" />
              <div class="hr-text-container">
                <ion-text class="hr-text">or</ion-text>
              </div>
            </div>
          </ion-col>
        </ion-row>

        <ion-row>
          <ion-col>
            <ion-item class="amount-input">
              <ion-input
                v-model="amount"
                placeholder="$0.00"
                type="number"
              />
            </ion-item>
          </ion-col>
        </ion-row>

        <ion-row>
          <ion-col>
            <ion-label class="input-label" position="stacked">
              Leave a comment
            </ion-label>
            <ion-item>
              <ion-textarea rows="10" v-model="comment"></ion-textarea>
            </ion-item>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-label class="info-text" position="stacked">
              <ion-text class="u-color-red">*</ion-text>iDreamers is charging for the transactions</ion-label
            >
          </ion-col>
        </ion-row>
      </ion-grid>
    </template>
    <template v-slot:footer>
      <ion-button
        class="footer-button"
        @click="navigateToPayment"
        :disabled="donateDisabled"
      >
        Donate
      </ion-button>
    </template>
  </base-layout>
</template>

<script>
import { getRelativePast } from "../../helpers/time";

import { useWallets } from "../../stores/wallets";
import { IonSelect, IonSelectOption, IonInput, IonLabel, IonTextarea, IonText } from "@ionic/vue";
import BaseLayout from "../../components/layout/BaseLayout";
export default {
  components: {
    IonSelect,
    IonSelectOption,
    IonInput,
    IonLabel,
    IonTextarea,
    IonText,
    BaseLayout
  },
  setup() {
    const walletStore = useWallets();
    return {
      getRelativePast,
      walletStore,
    };
  },
  data() {
    return {
      interval: "weekly",
      amount: 0,
      comment: "",
      donateDisabled: true,
    };
  },
  computed: {},
  watch: {
    amount() {
      this.donateDisabled = !(this.amount > 0);
    },
  },
  methods: {
    setInterval(interval) {
      this.interval = interval;
    },
    setAmount(amount) {
      this.amount = amount;
    },
    navigateToPayment() {
      this.$router.push({
        name: "pay",
        query: {
          amount: this.amount,
          comment: this.comment,
          interval: this.interval,
          dream: this.$route.params.id,
        },
      });
    },
  },

  mounted() {},
};
</script>

<style scoped>
ion-grid, ion-row, ion-col {
  padding: 0;
}
ion-button {
  margin: 0;
}
ion-grid {
  padding: 20px;
}
.footer-button {
  margin-bottom: 30px;
  margin-left: 20px;
  margin-right: 20px;
  --border-radius: 15px;
  height: 50px;
}
ion-item {
  border-radius: 8px;
}
ion-button.white-button {
  --background: #ffffff;
  --color: #000000;
  --border-radius: 8px;
  --border-color: #E9ECF0;
  border: 1px solid #E9ECF0;
  --box-shadow: none;
  font-size: 14px;
  line-height: 18px;
  font-weight: 400;
  height: 60px;
  overflow: hidden;
}
.white-button-left {
  margin-right: 10px;
}
.amount-btn-row {
  padding-bottom: 10px;
}
.hr-container {
  position: relative;
}
.hr {
  border-bottom: 1px solid #ccc;
  margin: 10px 0;
  width: 100%;
}
.position {

}
.hr-text-container {
  position: absolute;
  background: #F9F8FF;
  top: -10px;
  left: calc(50% - 15px);
  display: inline-block;
  height: 20px;
  width: 20px;
  text-align: center;
}
ion-text.hr-text {
  font-size: 12px;
  line-height: 15px;

}

ion-label.input-label {
  font-size: 16px;
  line-height: 20px;
  font-weight: 400;
  color: #787C80;
  margin-bottom: 8px;
}
ion-item {
  background: #FFFFFF;
  color: #212325;
  border-radius: 8px;
  border: 1px solid #D1D1D6;
}
ion-item.amount-input {
  text-align: center;
  margin: 20px 0 40px;
  font-size: 18px;
  line-height: 25px;
  font-weight: 700;
  color: #787C80;
}
ion-textarea {
  font-size: 16px;
  line-height: 20px;
}
ion-select{
  width: 100%;
}
ion-input, ion-textarea {
  --color: #212325;
}
.interval-row {
  padding-bottom: 40px;
}
.info-text {
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
}
.u-color-red {
  color: #FF6363;
}

</style>
