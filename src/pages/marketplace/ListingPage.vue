<template>
  <base-layout page-title="ProfilePage">
    <template v-slot:header>
      <ion-header>
        <ion-toolbar>
          <div class="toolbar">
            <ion-buttons>
              <ion-back-button></ion-back-button>
            </ion-buttons>

            <ion-title class="title">Listings</ion-title>
          </div>
        </ion-toolbar>
      </ion-header>
    </template>
    <template v-slot:default>
      <ion-content>
        <div class="root">
          <div class="search_div" @click="handleSearch">
            <ion-icon name="search-outline"></ion-icon>
            <ion-label class="search_text">Search your listings</ion-label>
          </div>

          <ion-row class="margin" v-for="item in items" :key="item.id">
            <ion-col>
              <list-card :data="item"></list-card>
            </ion-col>
          </ion-row>
        </div>
      </ion-content>
    </template>
  </base-layout>
</template>

<script>
import { IonContent, IonToolbar, IonBackButton } from '@ionic/vue'
import ListCard from '../../components/marketplace/ListCard.vue'
import { PRODUCT_DATA } from './mockup.tsx'

export default {
  components: {
    IonContent,
    IonToolbar,
    IonBackButton,
    ListCard,
  },
  data() {
    return {
      items: [],
    }
  },
  methods: {
    async handleSearch() {
      this.$router.replace('/marketplace/lists/search')
    },
  },
  mounted() {
    this.$nextTick(async () => {
      this.items = PRODUCT_DATA
      // await this.dreamStore.loadAllDreams()
      // this.dreams = this.dreamStore.dreamListBookmarked
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
.title {
  text-align: center;
  margin-right: 40px;
}
.margin {
  margin-top: 20px;
}
ion-content {
  --padding: 20px;
}
.search_bar {
  --border-radius: 8px !important;
}
.search_div {
  background: #ffffff;
  border: 1px solid #e9ecf0;
  border-radius: 8px;
  padding: 10px 16px;
  display: flex;
  align-items: center;
}
.search_text {
  font-size: 16px;
  line-height: 24px;
  color: #d1d1d6;
  margin-left: 12px;
}
</style>
