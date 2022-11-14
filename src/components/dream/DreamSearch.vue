<template>
  <ion-grid class="dream-search-container">
    <ion-row>
      <ion-col @click="toggleShowSearchBar">
        <ion-searchbar
          v-model="searchText"
          :debounce="1000"
          class="searchbar"
          placeholder="Search"
          show-clear-button="never"
          @input="handleInput"
        />
      </ion-col>
    </ion-row>
    <ion-modal
      :is-open="showSearchBar"
      @click.self="toggleShowSearchBar"
    >
      <div class="inner-content">
        <ion-grid class="dream-search-container">
          <ion-row>
            <ion-col>
              <ion-searchbar
                v-model="searchText"
                :debounce="1000"
                ref="mainSearchInput"
                class="searchbar"
                placeholder="Search"
                show-clear-button="never"
                @ionInput="handleInput"
              />
              />
            </ion-col>
          </ion-row>
          <ion-row v-if="searchText.length > 0 && dreams.length > 0" class="search-suggestions">
            <ion-col>
              <ion-card>
                <ion-row
                  v-for="dream in dreams"
                  :key="dream.id"
                >
                  <ion-col>
                    <router-link :to="{ name: 'dreamDetail', params: { id: dream.id } }">
                      <ion-row class="ion-align-items-center result-row">
                        <ion-col size="auto" class="img-col">
                            <ion-img :src="dream.image" alt="" class="result-img" />
                        </ion-col>
                        <ion-col>
                          <ion-text class="result-text">{{ dream.title }}</ion-text>
                        </ion-col>
                      </ion-row>
                    </router-link>
                  </ion-col>
                </ion-row>
              </ion-card>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
    </ion-modal>
  </ion-grid>
</template>

<script>
import {
  IonText,
  IonRow,
  IonCol,
  IonSearchbar,
  IonGrid,
  IonCard,
  IonImg,
  IonModal
} from '@ionic/vue'

export default {
  name: 'DreamSearch',
  components: {
    IonText,
    IonRow,
    IonCol,
    IonSearchbar,
    IonGrid,
    IonCard,
    IonImg,
    IonModal
  },
  emits: ['change'],
  props: {
    dreams: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      searchText: '',
      showSearchBar: false
    }
  },
  methods: {
    toggleShowSearchBar () {
      this.showSearchBar = !this.showSearchBar
      if (this.showSearchBar) {
        // we wait for the component to be mounted
        setTimeout(() => {
          this.$refs.mainSearchInput.$el.setFocus()
        }, 500)
      }
    },
    handleInput (event) {
      if (event.target.value === '') {
        this.toggleShowSearchBar()
      }
      this.$emit('change', event, event.target.value)
    }
  }
}
</script>

<style scoped>
ion-grid, ion-row, ion-col{
  padding: 0;
}
ion-row {
  padding: 0 20px;
}

ion-modal {
  --height: 100%;
  --background: #1A181E66;

}
.inner-content {
  height: 100vh;
}
ion-searchbar.searchbar{
  --color: #212325;
  margin: 20px 0 5px;
  font-size: 16px;
  line-height: 24px;
  padding: 0;
  --background: #FFFFFF;
  position: relative;
}
.sc-ion-searchbar-md-h {
  overflow: hidden;
  box-shadow: none;
  border: 1px solid #D1D1D6;
  border-radius: 8px;
}
ion-row.search-suggestions {
  /*padding: 0 20px;*/
  position: absolute;
  top: 70px;
  z-index: 100;
  width: 100%;
}
ion-card {
  background: #FFFFFF;
  box-shadow: 0px 6px 16px rgba(38, 31, 64, 0.16);
  border-radius: 16px;
  margin: 0;
}
.result-row {
  padding: 20px;
}
.result-row:active {
  background: #CFC5F3;
}
.result-text {
  font-size: 16px;
  line-height: 20px;
  font-weight: 500;
  color: #212325;
}
ion-row.result-row {
  --border: #B6A8ED;
  border-bottom: 0.5px solid #B6A8ED;
}
ion-img::part(image) {
  width: 64px;
  height: 54px;
  margin-right: 16px;
  border-radius: 8px;
  object-fit: fill;
}
.dream-search-container {
  position: relative;
}
modal-wrapper.ion-overlay-wrapper {
  background: #1A181E66;
  animation: none;
}
</style>
