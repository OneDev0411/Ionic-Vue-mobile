<template>
  <base-layout>
    <template v-slot:header>
      <div></div>
    </template>
    <template v-slot:default>
      <!-- search field -->
      <DreamSearch :dreams="dreams" @change="setSearchText" />
      <ion-item>
        <dream-filter-tabs
          @tab-selected="setTab"
          :selectable="['All', 'Recent', 'Popular', 'Saved']"
        ></dream-filter-tabs>
      </ion-item>
      <ion-grid>
        <ion-row v-for="dream in dreams" :key="dream.id">
          <ion-col>
            <dream-card :id="dream.id" :boxed-image="true"></dream-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </template>
  </base-layout>
</template>

<script>
import DreamFilterTabs from '../../components/landingpage/DreamFilterTabs.vue'
import DreamCard from '../../components/dream/DreamCard.vue'
import { personCircleOutline } from 'ionicons/icons'
import { useUser } from '../../stores/user'
import { useDreams } from '../../stores/dreams'
import DreamSearch from '../../components/dream/DreamSearch'

export default {
  setup () {
    const userStore = useUser()
    const dreamStore = useDreams()
    return { personCircleOutline, userStore, dreamStore }
  },
  data () {
    return {
      selectedTab: 'All',
      searchText: ''
      // searchResult: []
    }
  },
  components: {
    DreamSearch,
    DreamFilterTabs,
    DreamCard
  },
  computed: {
    dreams () {
      let dreams = []
      if (this.selectedTab === 'All') {
        dreams = this.dreamStore.getAllDreams
      } else if (this.selectedTab === 'Recent') {
        dreams = this.dreamStore.getRecentDreams
      } else if (this.selectedTab === 'Popular') {
        dreams = this.dreamStore.getPoplarDreams
      } else if (this.selectedTab === 'Saved') {
        dreams = this.dreamStore.getBookmarkedDreams
      } else {
        dreams = this.dreamStore.getAllDreams
      }
      if (this.searchText !== '') {
        dreams = dreams.filter((dream) =>
          dream.title.toLowerCase().includes(this.searchText.toLowerCase())
        )
      }
      return dreams
    }
  },
  methods: {
    setTab (tabName) {
      this.selectedTab = tabName
    },
    setSearchText (evt, s) {
      this.searchText = s
    }
  },
  mounted () {
    this.$nextTick(async () => {
      await this.dreamStore.loadAllDreams()
    })
  }
}
</script>

<style scoped>
ion-row, ion-col{
  padding: 0;
}
ion-item {
  --background: #f9f8ff;
}
ion-button.create-dream-toolbar-button {
  --border-radius: 15px !important;
}
.header-text {
  margin-right: 5%;
  color: var(--ion-color-secondary-tint);
}
.rounded-thumbnail {
  --border-radius: 100%;
  border: solid white 2px;

  --size: 32px;
}
ion-searchbar.searchbar{
  --color: #D1D1D6;
  margin: 20px 0;
  font-size: 16px;
  line-height: 24px;
  padding: 0;
}
.sc-ion-searchbar-md-h {
  overflow: hidden;
  box-shadow: none;
  border: 1px solid #D1D1D6;
  border-radius: 8px;
}
</style>
