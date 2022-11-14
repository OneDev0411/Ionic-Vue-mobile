<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-item>
					<ion-button class="arrow-back" fill="clear" @click="() => this.$router.replace('create-dream')">
						<ion-icon :icon="chevronBackSharp" ></ion-icon>
					</ion-button>
					<ion-title>Support by Product or Service</ion-title>
				</ion-item>
			</ion-toolbar>
		</ion-header>
		<ion-content class="search-result">
			<ion-searchbar placeholder="search" :debounce="1000" class="input-search" v-model="keyword" @ionChange="searchSupporter($event)"></ion-searchbar>
			<ion-row>
				<ion-row>
					<ion-item v-for="product in results" :key="product.id" class="product-item">
						<ion-thumbnail class="product-img">
							<ion-img :src="product.src"></ion-img>
						</ion-thumbnail>
						<div style="width: 200px;">
							<ion-title class="product-part" >{{product.name}}</ion-title>
							<ion-title  class="product-name">{{product.job}}</ion-title>
							<ion-title class="prodcut-price">{{ product.price }}</ion-title>
						</div>
						<ion-button v-if="product.added" @click="diselectSupporter(product.id)" class="after-selected">Added <ion-icon :icon="checkmarkOutline"></ion-icon> </ion-button>
						<ion-button v-else fill="clear" @click="selectSupporter(product.id)" class="previous-selected">Add</ion-button>
					</ion-item>
				</ion-row>
			</ion-row>
		</ion-content>
		<ion-footer class="ion-no-border">
			<ion-button v-if="addedFlag" shape="round" class="add-button" @click="add">Add Products & Services</ion-button>
			<ion-button v-else shape="round" class="add-button" disabled>Add Products & Services</ion-button>
		</ion-footer>
	</ion-page>
</template>

<script>
import { useDreams } from '@/stores/dreams'
import {
  IonPage,
  IonHeader,
  IonTitle,
  IonIcon,
  IonFooter,
  IonToolbar,
  IonSearchbar,
  IonThumbnail,
  IonContent
} from '@ionic/vue'

import { chevronBackSharp, checkmarkOutline, closeOutline, mailOutline, paperPlaneOutline, copyOutline } from 'ionicons/icons'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  components: {
    IonPage,
    IonHeader,
    IonTitle,
    IonIcon,
    IonFooter,
    IonToolbar,
    IonSearchbar,
    IonThumbnail,
    IonContent
  },
  setup () {
    const supporters = [{
      id: 'Item1',
      name: 'Elctronic',
      job: 'BMW M1000RR...',
      src: '../assets/product/Rectangle39373.png',
      price: '$500',
      added: false
    }, {
      id: 'Item2',
      name: 'Elctronic',
      job: 'Lamborghini Huracán',
      src: '../assets/product/Rectangle39373(1).png',
      price: '$500',
      added: false
    }, {
      id: 'Item3',
      name: 'Elctronic',
      job: 'Ferrari LaFerrari | Sup...',
      src: '../assets/product/Rectangle39373(2).png',
      price: '$500',
      added: false
    }, {
      id: 'Item4',
      name: 'Elctronic',
      job: 'Maruti Suzuki Cars Pr...',
      src: '../assets/product/Rectangle39373(3).png',
      price: '$500',
      added: false
    }, {
      id: 'Item5',
      name: 'Elctronic',
      job: 'HERCULES Defender 2...',
      src: '../assets/product/Rectangle39373(4).png',
      price: '$500',
      added: false
    }, {
      id: 'Item6',
      name: 'Elctronic',
      job: 'BUGATTI Chiron L’ÉBÉ',
      src: '../assets/product/Rectangle39373(5).png',
      price: '$500',
      added: false
    }]
    const results = ref(supporters)
    const dreamStore = useDreams()
    return {
      chevronBackSharp,
      checkmarkOutline,
      closeOutline,
      mailOutline,
      paperPlaneOutline,
      copyOutline,
      supporters,
      results,
      dreamStore
    }
  },
  created () {
    this.allFiltered()
  },
  watch: {
    results (value) {
      for (let i = 0; i < value.length; i++) {
        if (value[i].added === true) {
          this.addedFlag = true
        } else {
          this.addedFlag = false
        }
      }
    }
  },
  data () {
    return {
      searchResult: false,
      allFilter: false,
      keyword: '',
      addedResult: [],
      addedFlag: false
    }
  },
  methods: {
    addedFiltered () {
      this.allFilter = true
    },
    allFiltered () {
      this.allFilter = false
    },
    searchSupporter (event) {
      this.searchResult = true
      const query = event.target.value.toLowerCase()
      this.results = this.supporters.filter(supporter => supporter.name.toLowerCase().indexOf(query) > -1 || supporter.job.toLowerCase().indexOf(query) > -1)
    },
    selectSupporter (id) {
      this.addedFlag = true
      const selected = this.results.find(item => item.id === id)
      const selectedIndex = this.results.indexOf(selected)
      this.results[selectedIndex].added = true
      this.addedResult.push(selected)
    },
    diselectSupporter (id) {
      const diselected = this.results.find(item => item.id === id)
      const diselectedIndex = this.results.indexOf(diselected)
      this.results[diselectedIndex].added = false
      this.addedResult = this.addedResult.filter(item => item.added === true)

      if (this.addedResult.length === 0) {
        this.addedFlag = false
      }
    },
    showInviteModal () {
      this.showModal = !this.showModal
    },
    add () {
      this.dreamStore.addProduct(this.addedResult)
      this.$router.replace('/product-loading')
    }
  }
})
</script>

<style scoped>
.input-search {
	padding: 12px 16px;
	width: 100%;
	height: 48px;
	--border-radius: 8px;
	margin-top: 10px;
	--background-color: #FFFFFF;
}
.ion-no-border {
	width: 100%;
	height: 120px;
	border-radius: 16px 16px 0px 0px;
	background-color: #F9F8FF;
	border: 1px solid #D1D1D6;
	backdrop-filter: blur(10px);
}
.add-button {
	background-color: #E7E2F9;
	--border-radius: 16px;
	width: 80%;
	height: 50px;
	margin-left: 10%;
	margin-top: 30px;
}
.arrow-back {
  font-size: 16px;
  --color: black;
  text-align: center;
}
.product-img {
	width: 90px;
	height: 90px;
}
.product-item {
	width: 100%;
	--background-color: #F3F1FC;
	--display: flex;
	--align-items: center;
	--justify-content: space-between;
}
.product-name {
	font-family: 'Manrope';
	font-style: normal;
	font-weight: 500;
	font-size: 16px;
	line-height: 130%;
}
.product-part {
	font-family: 'Manrope';
	font-style: normal;
	font-weight: 500;
	font-size: 12px;
	line-height: 130%;
}

.search-result {
	--width: 100%;
}
ion-button {
	text-transform: none;
}
.after-selected {
	--background: #31265A;
	color: #FFFFFF;
	--border-radius: 8px;
	/* --margin-right: 10px; */
}
.previous-selected {
	width: 52px;
	height: 26px;
	border: 1px solid #31265A;
	border-radius: 8px;
	padding: 4px 12px;
	--margin-right: 10px;
}
.prodcut-price {
	margin-top: 20px;
	font-family: 'Manrope';
	font-style: normal;
	font-weight: 600;
	font-size: 14px;
	line-height: 140%;
	color: #866EE1;
}
</style>
