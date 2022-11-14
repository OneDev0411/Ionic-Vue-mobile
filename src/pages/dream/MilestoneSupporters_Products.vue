<template>
  <base-layout pageTitle="Support By Product or Service">
    <ion-content>
      <div class="inner-content">
        <div class="innermost-container">
          <ion-searchbar
            v-model="keyword"
            placeholder="Search product & service"
            :debounce="1000"
            class="input-search"
            @ionChange="searchProducts($event)"
          />
            <ion-row>
                <ion-item
                  v-for="product in products"
                  :key="product.id"
                  class="product-item"
                  lines="none"
                >
                  <ion-col size="auto">
                    <ion-thumbnail class="product-img">
                      <ion-img :src="product.src"></ion-img>
                    </ion-thumbnail>
                  </ion-col>
                  <ion-col>
                    <ion-title class="product-category">{{product.category}}</ion-title>

                    <ion-title class="product-name" >{{product.name}}</ion-title>
                    <ion-row class="price-row ion-justify-content-between ion-align-items-center">
                      <ion-col size="auto">
                        <ion-text class="product-price">
                          {{ product.price }}
                        </ion-text>
                      </ion-col>
                      <ion-col size="auto">
                        <ion-button v-if="product.added" @click="diselectProduct(product.id)" class="after-selected">Added <ion-icon :icon="checkmarkOutline"></ion-icon> </ion-button>
                        <ion-button v-else fill="clear" @click="selectProduct(product.id)" class="previous-selected">Add</ion-button>
                      </ion-col>
                    </ion-row>
                  </ion-col>
                </ion-item>
            </ion-row>
        </div>
      </div>
      </ion-content>
    <template v-slot:footer>
      <ion-footer class="ion-no-border add-button-container">
        <ion-button
          shape="round"
          class="add-button"
          id="open-invite-modal"
          :disabled="!addedFlag"
          @click="addProductService"
        >
          Add Supporters
        </ion-button>
      </ion-footer>

    </template>
  </base-layout>
</template>

<script>
import {
	IonTitle,
	IonIcon,
	IonFooter,
	IonSearchbar,
  IonImg,
  IonThumbnail,
  IonContent,
  IonText
} from '@ionic/vue';

import { chevronBackSharp, checkmarkOutline, closeOutline, mailOutline, paperPlaneOutline, copyOutline, addCircleOutline, linkOutline } from 'ionicons/icons'
import { defineComponent } from 'vue'
import { useDreams } from '../../stores/dreams';
import BaseLayout from "../../components/layout/BaseLayout";

export default defineComponent({
  components: {
    BaseLayout,
		IonTitle,
		IonIcon,
		IonFooter,
		IonSearchbar,
    IonImg,
    IonThumbnail,
    IonContent,
    IonText
  },
	setup() {
		const dreamStore = useDreams()
		return {
			chevronBackSharp,
			checkmarkOutline,
			closeOutline,
			mailOutline,
			paperPlaneOutline,
			copyOutline,
			addCircleOutline,
			dreamStore,
			linkOutline
		}
	},
  beforeMount() {
    this.addedResult = this.results.filter(a => a.added)
  },
  computed: {
    products () {
      return this.dreamStore.getMilestoneProducts
    },
    results () {
      return this.products.slice()
    }
  },
  watch: {
		products (value) {
			for(let i = 0; i < value.length; i++) {
				if(value[i].added == true) {
					this.addedFlag = true
				} else {
					this.addedFlag = false
				}
			}
		}
	},
	data() {
		return{
			searchResult: false,
			keyword: '',
			addedFlag: false,
			addedResult: [],
		}
	},
	methods: {
    searchProducts(event) {
			this.searchResult = true;
			const query = event.target.value.toLowerCase();
      this.results = this.products.filter(supporter => supporter.name.toLowerCase().indexOf(query) > -1 || supporter.job.toLowerCase().indexOf(query) > -1);
		},
		selectProduct(id) {
			this.addedFlag = true
			const selected = this.products.find(item => item.id == id);
			const selectedIndex = this.products.indexOf(selected);
			this.products[selectedIndex].added = true
			this.addedResult.push(selected)

		},
		diselectProduct(id) {
			const diselected = this.products.find(item => item.id == id);
			const diselectedIndex = this.products.indexOf(diselected);
			this.products[diselectedIndex].added = false
			this.addedResult = this.addedResult.filter(item => item.added == true)

			if (this.addedResult.length == 0) {
				this.addedFlag = false
			}
		},
		addProductService() {
      this.$router.go(-1)
		}
	}
});
</script>

<style scoped>
ion-row, ion-col{
  padding: 0;
}
ion-modal {
  --height: auto;
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
}
.share-header {
  text-align: center;
  font-size: 18px;
  line-height: 25px;
  color: #323538;
  font-weight: 700;
}
ion-button.action-btn {
  flex-flow: column;
  height: 72px;
}
ion-icon.action-btn-icon {
  font-size: 12px;
  line-height: 15px;
  font-weight: 500;
}
ion-text.action-btn-text {
  font-size: 14px;
  line-height: 140%;
  font-weight: 400;
  color: #787C80;

}
ion-button {
  text-transform: none;
}

.input-search {
  --color: #212325;
  --border-radius: 8px;
  --icon-color: #787C80;
  --placeholder-color: #D1D1D6;
  --border: #D1D1D6;
  border: 1px solid #D1D1D6;
  border-radius: 8px;
  font-size: 16px;
  line-height: 24px;
  padding: 0;
  --background: #FFFFFF;
  position: relative;
  --box-shadow: none;
  width: 100%;
  margin-bottom: 20px;
}
.product-img {
  height: 90px;
  width: 90px;
  border-radius: 8px;
}
.product-category {
  color: #787C80;
  font-weight: 400;
  font-size: 12px;
  line-height: 130%;
}
.product-name {
  font-weight: 700;
  font-size: 16px;
  line-height: 140%;
  color: #1A181E;
}

.product-item {
  width: 100%;
  --display: flex;
  --align-items: center;
  --justify-content: space-between;
  --background: #F3F1FC;
  --border-radius: 8px;
  margin-bottom: 20px;
  padding: 10px 0;
  --padding-start: 10px;
  --inner-padding-end: 10px;
  --padding-top: 10px;
  --padding-bottom: 10px;

}
.price-row {
  margin-top: 20px;
}
.product-price{
  margin-left: 20px;
}
.after-selected {
  --background: #31265A;
  color: #FFFFFF;
  --border-radius: 8px;
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 130%;
}
.previous-selected {
  width: 52px;
  height: 26px;
  border: 1px solid #31265A;
  color: #31265A;
  border-radius: 8px;
  padding: 4px 12px;
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 130%;
}

.add-button-container {
  position: absolute;
  bottom: 0;
  width: 100%;
}
.add-button {
  background-color: #E7E2F9;
  --border-radius: 16px;
  height: 50px;
  width: 100%;
}
</style>
