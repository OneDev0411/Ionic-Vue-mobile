<template>
  <ion-modal
    :is-open="open"
    class="auto-height"
    @click.self="$emit('closeModal')"
  >
    <div class="inner-content">
      <ion-grid>
        <ion-row class="ion-justify-content-between ion-align-items-center">
          <ion-col size="auto">
            <ion-text class="problem-header">
              Supporters
            </ion-text>
          </ion-col>
          <ion-col size="auto">
            <ion-icon
              :icon="closeOutline"
              size="large"
              @click="$emit('closeModal')"
            />
          </ion-col>
        </ion-row>
        <ion-row class="search-row">
          <ion-col>
            <ion-searchbar
              v-model="searchText"
              :debounce="1000"
              class="searchbar"
              show-clear-button="never"
              @input="handleSearch"
            />
          </ion-col>
        </ion-row>
        <div>
          <ion-content
            :scroll-events="true"
            class="scrollable"
          >
            <ion-row>
              <ion-col>
                <ion-list lines="none">
                  <ion-item
                    v-for="(supporter, index) in milestoneSupporters"
                    :key="index"
                  >
                    <ion-img
                      :src="supporter.image"
                      class="supporter-img"
                    />
                    <ion-label
                      class="supporter-name"
                    >
                      {{ supporter.name }}
                    </ion-label>
                  </ion-item>
                </ion-list>
              </ion-col>
            </ion-row>
          </ion-content>
        </div>

    <!--          </ion-virtual-scroll>-->
      </ion-grid>
    </div>
  </ion-modal>
</template>

<script>
import {
  IonCol,
  IonGrid,
  IonModal,
  IonRow,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonText,
  IonContent,
  IonSearchbar,
  IonImg
} from '@ionic/vue'
import {
  checkmarkOutline,
  closeOutline
} from 'ionicons/icons'

const dummyMilestoneSupporters = [
  {
    image: 'https://drive.google.com/uc?id=1KfZlKh0G0KB1MsuqOtWm2HljVDlrLibc',
    name: 'Lois Suarzez'
  },
  {
    image: 'https://drive.google.com/uc?id=1rJ2k2UA7Mk6vJApySQtvGweWrmSdUE1O',
    name: 'Jordan Sam'
  },
  {
    image: 'https://drive.google.com/uc?id=14rKXlB8kgwn_Wfe2DJ5aLy0IA-zCRU-d',
    name: 'Jonathan William'
  },
  {
    image: 'https://drive.google.com/uc?id=1A3HbQgjFqr5J3UXkuvTgi9TogJKfrQtx',
    name: 'Michael David'
  },
  {
    image: 'https://drive.google.com/uc?id=17Lmy-XkyQv9WjbSo_tvJreDrgwtD05r2',
    name: 'Jennifer Mary'
  },
  {
    image: 'https://drive.google.com/uc?id=1bOA2AHKTAsiBH8h6IUwJ_FVRJxMAQpuT',
    name: 'Elizabeth Lisa'
  },
  {
    image: 'https://drive.google.com/uc?id=1rNChVaNfPBF4AQ0u4AV_ewGipsr43wIu',
    name: 'William Richard'
  }
]

export default {
  name: 'DreamMilestoneSupporters',
  props: {
    open: {
      type: Boolean,
      default: false
    },
    confirmationText: {
      type: String
    }
  },
  emits: ['closeModal', 'reportItem'],
  components: {
    IonCol,
    IonGrid,
    IonModal,
    IonRow,
    IonList,
    IonItem,
    IonLabel,
    IonIcon,
    IonText,
    IonContent,
    IonImg,
    IonSearchbar
  },
  setup () {
    return {
      checkmarkOutline,
      closeOutline
    }
  },
  data () {
    return {
      searchText: '',
      showReportConfirmation: false,
      selectedReason: ''
    }
  },
  computed: {
    milestoneSupporters () {
      if(this.searchText === ''){
        return dummyMilestoneSupporters
      } else {
        return dummyMilestoneSupporters.filter(a=> a.name.toLowerCase().includes(this.searchText.toLowerCase()))
      }

    }
  },
  methods: {
    handleSearch (event) {
      this.searchText = event.target.value
    }
  }
}
</script>

<style scoped>
ion-row, ion-col{
  padding: 0;
}
ion-modal {
  --height: fit-content;
  --width: 90%;
  --border-radius: 16px;
  --box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  background: #1A181E66;

}
ion-modal::part(backdrop) {
  background: #1A181E66;
}
.inner-content {
  padding: 20px;
  background: #F9F8FF;
  max-height: 90vh;
}
ion-searchbar.searchbar{
  --color: #212325;
  /*height: 50px;*/
  --border-radius: 8px;
  --icon-color: #787C80;
  --placeholder-color: #D1D1D6;
  --border: #D1D1D6;
  border: 1px solid #D1D1D6;
  border-radius: 8px;
  margin: 20px 0 5px;
  font-size: 16px;
  line-height: 24px;
  padding: 0;
  --background: #FFFFFF;
  position: relative;
  --box-shadow: none;
}
ion-content.scrollable {
  height: 300px;
}
ion-text.problem-header {
  margin-bottom: 20px;
  font-size: 16px;
  line-height: 20px;
  font-weight: 700;
}
ion-list {
  background: transparent;
}
ion-item{
  --background: #F9F8FF;
  border-bottom: 1px solid #E9ECF0;
  padding: 10px 0;
}
ion-img.supporter-img::part(image) {
  border-radius: 50%;
  width: 42px;
  height: 42px;

}
.supporter-name {
  margin-left: 16px;
  font-size: 16px;
  line-height: 20px;
  font-weight: 500;
  color: #212325;
}
</style>
