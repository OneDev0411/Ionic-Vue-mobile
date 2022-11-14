<template>
  <base-layout page-title="ProfilePage">
    <template v-slot:header>
      <ion-header>
        <ion-toolbar>
          <div class="toolbar">
            <ion-buttons>
              <ion-back-button></ion-back-button>
            </ion-buttons>

            <ion-title class="title">Add Supporters</ion-title>
          </div>
        </ion-toolbar>
      </ion-header>
    </template>
    <template v-slot:default>
      <div class="root">
        <div class="search_div">
          <ion-searchbar
            class="search_bar"
            v-model="searchText"
            placeholder="Search"
          />
        </div>
        <div>
          <div class="item" v-for="supporter in supporters" :key="supporter.id">
            <img class="avatar" :src="supporter.avatar" />
            <div>
              <ion-label class="name">{{ supporter.name }}</ion-label>
              <ion-label class="role">{{ supporter.role }}</ion-label>
            </div>
          </div>
        </div>
      </div>
    </template>
  </base-layout>
</template>

<script>
import { IonToolbar, IonBackButton, IonSearchbar } from '@ionic/vue'
import { SUPPORTER_DATA } from './mockup.tsx'

export default {
  setup() {},
  components: {
    IonToolbar,
    IonBackButton,
    IonSearchbar,
  },
  data() {
    return {
      supporters: [],
    }
  },
  methods: {
    async handleSupport() {
      this.$router.replace('/settings/profile')
    },
  },
  mounted() {
    this.$nextTick(async () => {
      this.supporters = SUPPORTER_DATA
    })
  },
}
</script>

<style scoped>
.toolbar {
  display: flex;
}
.search_bar {
  --border-radius: 8px !important;
}
.root {
  padding: 20px;
}
.title {
  text-align: center;
  margin-right: 40px;
}
.avatar {
  width: 49px;
  height: 49px;
  border-radius: 50%;
  margin-right: 12px;
}
.name {
  font-weight: 500;
  font-size: 16px;
  line-height: 130%;
  color: #212325;
}
.role {
  font-weight: 500;
  font-size: 12px;
  line-height: 130%;
  color: #787c80;
}
.search_div {
  margin-bottom: 23px;
}
.item {
  display: flex;
  border-bottom: 1px solid #e9ecf0;
  padding-top: 10px;
  padding-bottom: 10px;
  align-items: center;
}
</style>
