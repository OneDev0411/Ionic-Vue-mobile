<template>
  <base-layout page-title="Wallet Detail">
    <ion-grid>
      <ion-row>
        <ion-col>
          <h3>
            <b>{{ wallet.name }}</b>
          </h3>
        </ion-col>
        <ion-col size="3" class="ion-float-right center-text">
          <ion-text>Created: {{ getRelativePast(wallet.created_at) }}</ion-text>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <p>
            <truncated-text :text="wallet.description" :limit="50"></truncated-text>
          </p>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <ion-grid class="gradient">
            <ion-row>
              <ion-col>
                <ion-text> <h1 class="white-text">Balance:</h1></ion-text>
              </ion-col>
              <ion-col>
                <ion-text class="ion-float-right">
                  <h1 class="white-text">
                    <b>{{ parseFloat(wallet.amount).toLocaleString() }}$</b>
                  </h1>
                </ion-text>
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-col>
      </ion-row>
    </ion-grid>
  </base-layout>
</template>

<script>
import { getRelativePast } from "../../helpers/time";

import TruncatedText from "../../components/utils/TruncatedText.vue";
import { useWallets } from "../../stores/wallets";
import { IonText } from "@ionic/vue";
export default {
  components: { TruncatedText, IonText },
  setup() {
    const walletStore = useWallets();
    return {
      getRelativePast,
      walletStore,
    };
  },
  data() {
    return {
      wallet: {},
    };
  },
  computed: {},
  methods: {},

  mounted() {
    this.$nextTick(() => {
      console.log(this.wallet);
      this.wallet = this.walletStore.getWalletById(this.$route.params.id);
      console.log(this.wallet);
    });
  },
};
</script>

<style scoped>
.gradient {
  background: linear-gradient(97.99deg, #866ee1 -1.97%, #59d1d4 99.08%);
  box-shadow: 0px 0px 12.4px rgba(0, 110, 73, 0.04);
  border-radius: 13.2857px;
}
.white-text {
  color: #fff;
}
</style>
