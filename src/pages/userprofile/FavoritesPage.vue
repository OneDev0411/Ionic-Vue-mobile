<template>
  <base-layout page-title="ProfilePage">
    <template v-slot:header>
      <ion-header>
        <ion-toolbar>
          <div class="toolbar">
            <ion-buttons>
              <ion-back-button></ion-back-button>
            </ion-buttons>

            <ion-title class="title">Favourite List</ion-title>
          </div>
        </ion-toolbar>
      </ion-header>
    </template>
    <template v-slot:default>
      <ion-content>
        <div class="root">
          <ion-searchbar
            class="search_bar"
            v-model="searchText"
            placeholder="Search"
          />

          <ion-row class="margin" v-for="dream in dreams" :key="dream.id">
            <ion-col>
              <dream-card :id="dream.id" :boxed-image="true"></dream-card>
            </ion-col>
          </ion-row>
        </div>
      </ion-content>
    </template>
  </base-layout>
</template>

<script>
import { IonContent, IonToolbar, IonBackButton, IonSearchbar } from '@ionic/vue'
import DreamCard from '../../components/userprofile/dream/DreamCard.vue'
import { useDreams } from '../../stores/dreams'

export default {
  setup() {
    const dreamStore = useDreams()
    return {
      dreamStore,
    }
  },
  components: {
    IonContent,
    IonToolbar,
    IonBackButton,
    DreamCard,
    IonSearchbar,
  },
  data() {
    return {
      dreams: [],
    }
  },
  mounted() {
    this.$nextTick(async () => {
      await this.dreamStore.loadAllDreams()
      this.dreams = this.dreamStore.dreamListBookmarked
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
</style>
