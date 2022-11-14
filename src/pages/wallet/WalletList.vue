<template>
  <base-layout page-title="Wallets">
    <template v-slot:default>
      <ion-grid>
        <ion-row v-for="wallet in wallets" :key="wallet.id">
          <ion-col>
            <ion-item :router-link="`/wallet/${wallet.id}`">
              <ion-icon :icon="cardOutline" slot="start"></ion-icon>
              <ion-grid>
                <ion-row>
                  <ion-text>
                    <h6 style="margin: 0">
                      <b>{{ wallet.name }}</b>
                    </h6>
                  </ion-text>
                </ion-row>
                <ion-row>
                  <truncated-text :text="wallet.description" :limit="20"></truncated-text>
                </ion-row>
              </ion-grid>
            </ion-item>
          </ion-col>
        </ion-row>

        <ion-modal
          ref="addWallet"
          :isOpen="addWallet"
          handle-behavior="cycle"
          @didDismiss="addWallet = false"
        >
          <ion-content class="ion-padding">
            <ion-grid>
              <ion-row>
                <ion-col>
                  <ion-item>
                    <ion-label position="floating">Name</ion-label>
                    <ion-input
                      placeholder="Wallet name"
                      type="text"
                      v-model="name"
                    ></ion-input>
                  </ion-item>
                </ion-col>
              </ion-row>
              <ion-row>
                <ion-col>
                  <ion-item>
                    <ion-label position="floating">Description</ion-label>
                    <ion-input
                      placeholder="Wallet description"
                      type="text"
                      v-model="description"
                    ></ion-input>
                  </ion-item>
                </ion-col>
              </ion-row>
              <ion-row>
                <!-- cancel button -->
                <ion-col>
                  <ion-button color="danger" expand="block" @click="addWallet = false">
                    Cancel
                  </ion-button>
                </ion-col>
                <!-- add button -->
                <ion-col>
                  <ion-button color="success" expand="block" @click="addNewWallet">
                    Add
                  </ion-button>
                </ion-col>
              </ion-row>
            </ion-grid>
          </ion-content>
        </ion-modal>
      </ion-grid>
    </template>
    <template v-slot:footer>
      <ion-button fill="outline" class="footer-button" @click="addWallet = true">
        Add new wallet
      </ion-button>
    </template>
  </base-layout>
</template>

<script>
import { IonText, IonModal, IonContent, IonInput, IonLabel } from "@ionic/vue";
import { cardOutline } from "ionicons/icons";
import { useWallets } from "../../stores/wallets";
import TruncatedText from "../../components/utils/TruncatedText.vue";
export default {
  components: {
    IonText,
    TruncatedText,
    IonModal,
    IonContent,
    IonInput,
    IonLabel,
  },
  setup() {
    const walletStore = useWallets();
    return {
      walletStore,
      cardOutline,
    };
  },
  data() {
    return {
      wallets: [],
      addWallet: false,
      name: "",
      description: "",
    };
  },
  computed: {},
  methods: {
    async addNewWallet() {
      await this.walletStore.createWallet({
        name: this.name,
        description: this.description,
      });
      this.addWallet = false;
    },
  },
  mounted() {
    this.$nextTick(async () => {
      await this.walletStore.loadWallets();
      this.wallets = this.walletStore.wallets;
    });
  },
};
</script>

<style scoped>
ion-icon {
  font-size: 48px;
  color: var(--ion-color-primary);
}
ion-item {
  --background: #f3f1fc;
}
.footer-button {
  margin-bottom: 30px;
  margin-left: 20px;
  margin-right: 20px;
  --border-radius: 15px;
  height: 50px;
}
</style>
