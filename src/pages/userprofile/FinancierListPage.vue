<template>
  <base-layout page-title="FinancierListPage">
    <template v-slot:header>
      <ion-header>
        <ion-toolbar>
          <div class="toolbar">
            <ion-buttons>
              <ion-back-button></ion-back-button>
            </ion-buttons>

            <ion-title class="title">Financier List</ion-title>
          </div>
        </ion-toolbar>
      </ion-header>
    </template>
    <template v-slot:default>
      <ion-content>
        <div class="root">
          <ion-grid>
            <ion-row class="margin" v-for="data in fundedDreams" :key="data.id">
              <ion-col>
                <FundedDreamCard :data="data"></FundedDreamCard>
              </ion-col>
            </ion-row>
          </ion-grid>
        </div>
      </ion-content>
    </template>
  </base-layout>
</template>

<script>
import { IonContent, IonToolbar, IonBackButton } from '@ionic/vue'
import { FUNDED_DREAMS_DATA } from './mockup.tsx'
import FundedDreamCard from '../../components/userprofile/FundedDreamCard.vue'

export default {
  setup() {},
  components: {
    FundedDreamCard,
    IonContent,
    IonToolbar,
    IonBackButton,
  },
  data() {
    return {
      fundedDreams: [],
    }
  },
  mounted() {
    this.$nextTick(async () => {
      this.fundedDreams = FUNDED_DREAMS_DATA
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
.crop {
  width: auto;
  height: 20%;
  overflow: hidden;
}
.margin:first-child {
  margin-top: 0px;
}
.margin {
  margin-top: 20px;
}
.title {
  text-align: center;
  margin-right: 40px;
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
