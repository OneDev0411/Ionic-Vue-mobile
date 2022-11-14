<template>
  <base-layout page-title="ProfilePage">
    <template v-slot:header>
      <ion-header>
        <ion-toolbar>
          <div class="toolbar">
            <ion-buttons>
              <ion-back-button></ion-back-button>
            </ion-buttons>

            <div class="search_div">
              <div class="div1">
                <ion-icon name="search-outline"></ion-icon>
                <ion-input
                  placeholder="Search your listings"
                  v-model="searchText"
                ></ion-input>
              </div>
              <button class="delete_btn" v-if="searchText">
                <ion-icon class="delete_icon" name="add-outline"></ion-icon>
              </button>
            </div>
          </div>
        </ion-toolbar>
      </ion-header>
    </template>
    <template v-slot:default>
      <ion-content>
        <div class="root">
          <div class="div2">
            <ion-label class="search_desc">Search history</ion-label>
            <button @click="handleDeleteHistory" class="delete_btn">
              <img v-if="searchItem" src="/assets/icon/active_delete.svg" />
              <img v-else src="/assets/icon/inactive_delete.svg" />
            </button>
          </div>
          <div class="history_div">
            <div class="search_item" v-for="item in searchItem" :key="item">
              {{ item }}
            </div>
          </div>
        </div>
      </ion-content>
    </template>
  </base-layout>
</template>

<script>
import {
  IonLabel,
  IonContent,
  IonToolbar,
  IonBackButton,
  IonInput,
} from '@ionic/vue'

export default {
  components: {
    IonLabel,
    IonContent,
    IonToolbar,
    IonBackButton,
    IonInput,
  },
  data() {
    return {
      searchText: '',
      searchItem: [
        'Laptop',
        'Watch',
        'Fan',
        'Headphone',
        'Mouse pad',
        'Bluetooth headphone',
        'Light',
        'BMW Car',
      ],
    }
  },
  methods: {
    async handleDeleteHistory() {
      this.searchItem = []
    },
  },
  mounted() {
    this.$nextTick(async () => {
      this.searchItem = [
        'Laptop',
        'Watch',
        'Fan',
        'Headphone',
        'Mouse pad',
        'Bluetooth headphone',
        'Light',
        'BMW Car',
      ]
      // await this.dreamStore.loadAllDreams()
      // this.dreams = this.dreamStore.dreamListBookmarked
    })
  },
}
</script>

<style scoped>
.toolbar {
  display: flex;
  padding-right: 20px;
}
.root {
  padding: 20px;
}
.delete_btn {
  border: none;
  background: transparent;
  box-shadow: none;
}
.search_item {
  padding: 4px 8px 8px;
  background: #f3f1fc;
  border-radius: 8px;
  height: 28px;
  font-weight: 400;
  font-size: 12px;
  line-height: 130%;
  color: #323538;
  white-space: pre;
  margin-right: 10px;
  margin-bottom: 10px;
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
  margin-top: 3px;
  height: 44px;
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.delete_icon {
  color: #212325;
  height: 20px;
  width: 20px;
}
.search_desc {
  font-weight: 700;
  font-size: 16px;
  line-height: 140%;
  color: #212325;
}
.div1 {
  display: flex;
  width: 100%;
  align-items: center;
}
.div2 {
  align-items: center;
  display: flex;
  justify-content: space-between;
}
.search_text {
  font-size: 16px;
  line-height: 24px;
  color: #d1d1d6;
  margin-left: 12px;
}
.history_div {
  display: flex;
  margin-top: 10px;
  flex-flow: wrap;
}
</style>
