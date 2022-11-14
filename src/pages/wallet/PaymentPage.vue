<template>
  <base-layout page-title="Confirm Payment">
    <template v-slot:default>
      <ion-grid>
        <ion-row>
          <ion-col>
            <ion-item>
              <ion-label position="floating">Card number</ion-label>
              <ion-input
                placeholder="0000 0000 0000 0000"
                type="number"
                v-model="card_number"
              ></ion-input>
            </ion-item>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-item>
              <ion-label position="floating">Expiration date</ion-label>
              <ion-input placeholder="MM/YY" type="text" v-model="exp_date"></ion-input>
            </ion-item>
          </ion-col>
          <ion-col>
            <ion-item>
              <ion-label position="floating">CVV</ion-label>
              <ion-input placeholder="000" type="number" v-model="cvv"></ion-input>
            </ion-item>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-item>
              <ion-label position="floating">Name on card</ion-label>
              <ion-input placeholder="John Doe" type="text"></ion-input>
            </ion-item>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-item>
              <ion-label position="stacked">Amount</ion-label>
              <ion-input type="number">{{ amount }}</ion-input>
            </ion-item>
          </ion-col>
        </ion-row>
      </ion-grid>
      <ion-modal
        ref="modal"
        :isOpen="paymentModal"
        :initial-breakpoint="0.95"
        handle-behavior="cycle"
        @didDismiss="paymentModal = false"
      >
        <ion-content class="ion-padding">
          <iframe
            class="webPage"
            :src="redirectUrl"
            style="width: 100%; height: 100%"
          ></iframe>
        </ion-content>
      </ion-modal>
    </template>
    <template v-slot:footer>
      <ion-button class="footer-button" @click="confirmPay"> Confirm </ion-button>
    </template>
  </base-layout>
</template>

<script>
import { getRelativePast } from "../../helpers/time";

import { useWallets } from "../../stores/wallets";
import { IonInput, IonLabel, IonModal, IonContent } from "@ionic/vue";
export default {
  components: { IonInput, IonLabel, IonModal, IonContent },
  setup() {
    const walletStore = useWallets();
    return {
      getRelativePast,
      walletStore,
    };
  },
  data() {
    return {
      interval: "once",
      amount: 0,
      comment: "",
      card_number: "",
      card_holder: "",
      exp_date: "",

      cvv: "",
      paymentModal: false,
      redirectUrl: "",
    };
  },
  computed: {
    exp_month() {
      return this.exp_date.split("/")[0];
    },
    exp_year() {
      return this.exp_date.split("/")[1];
    },
  },
  methods: {
    async confirmPay() {
      const result = await this.walletStore.pay({
        amount: parseFloat(this.amount) * 100,
        comment: this.comment,
        card_number: this.card_number,
        card_holder: this.card_holder,
        exp_month: this.exp_month,
        exp_year: this.exp_year,
        cvv: this.cvv,
        dream_id: this.$route.query.dream,
      });
      if (result === "success") {
        alert("Payment successful");
        this.$router.push("/");
      } else {
        this.redirectUrl = result;
        this.paymentModal = true;
      }
    },
  },

  mounted() {
    this.$nextTick(() => {
      this.amount = this.$route.query.amount;
    });
  },
};
</script>

<style scoped>
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
.white-button {
  --background: #ffffff;
  --color: #000000;
  --border-radius: 8px;
}
</style>
