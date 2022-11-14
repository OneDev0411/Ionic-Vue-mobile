<template>
  <ion-page>
    <ion-header>
      <ion-row class="search-box">
        <div style="width: 100%" class="header-toolbar">
          <div class="search-bar">
            <ion-searchbar
              class="input-search"
              color="white"
              placeholder="search"
              v-model="keyword"
            ></ion-searchbar>
            <div class="option-icon">
              <img :src="optionsIcon" class="icon-stick" />
            </div>
          </div>
          <div class="market-icons">
            <img class="profile-icon" :src="profileImage" />
            <div class="person-badge"></div>
            <img class="market-icon" :src="buyImage" />
            <div class="bucket-badge">{{ bucketNum }}</div>
          </div>
        </div>
      </ion-row>
    </ion-header>
    <ion-content class="search-result">
      <ion-row class="market-buttons">
        <div>
          <ion-button class="bag-button">
            <img :src="iconImageBag" />
            <ion-label class="button-label">Categories</ion-label>
          </ion-button>
        </div>
        <div>
          <ion-button class="group-button">
            <img :src="iconImageGroup" class="group-icon" />
            <ion-label class="button-label">Selling</ion-label>
          </ion-button>
        </div>
      </ion-row>
      <ion-row class="ion-row">
        <img :src="brand1" style="z-index: 0; width: 100%" />
        <ion-label class="image-overflow-brand">Promotional Banner</ion-label>
        <ion-button fill="clear" class="image-overflow-button"> Buy Now </ion-button>
        <img :src="brand2" class="image-overflow-img" />
      </ion-row>
      <ion-row class="ion-row">
        <ProductList :productType="tredingProduct" :images="trendingProductImages" />
      </ion-row>
      <ion-row class="ion-row">
        <img :src="brandImage" style="z-index: 0; height: 290px; width: 350px; margin-left: 20px" />
        <div class="brand-image">
          <ion-button fill="clear" class="brand-overflow-button"> Recommended Product </ion-button>
          <span class="view-brand">View the brand</span>
        </div>
      </ion-row>
      <ion-row class="recommend-product">
        <ProductList :productType="recommendProduct" :images="recommendProductImages" />
      </ion-row>
      <ion-row class="smart-phones">
        <ProductList :productType="smartPhones" :images="recommendProductImages" />
      </ion-row>
      <ion-row class="sponsored">
        <div class="sponsor-title">
          <ion-icon :icon="paperPlaneOutline"></ion-icon>
          <span class="sponsor">Sponsored</span>
        </div>
        <ion-row v-for="item in sponsored" :key="item.id" class="each-sponsor">
          <ion-thumbnail class="sponsor-img">
            <ion-img :src="item.src"></ion-img>
          </ion-thumbnail>
          <ion-col class="sponsor-detail">
            <ion-text class="sponsor-name">{{ item.name }}</ion-text>
            <ion-title class="sponsor-price">{{ item.price }}</ion-title>
          </ion-col>
          <div style="border: 1px solid #d1d1d6; width: 100%; margin-top: 12px"></div>
        </ion-row>
      </ion-row>
      <ion-row class="smart-phones">
        <div class="row-type">
          <ion-label class="deal-type">Latest deals</ion-label>
          <span class="see-button">See All</span>
        </div>
        <ion-segment :scrollable="true" class="supporter-list">
          <div v-for="image in deals" :key="image.id" class="each-card">
            <ion-thumbnail class="deal-img">
              <img :src="image.src" />
            </ion-thumbnail>
            <img class="overlap-img" :src="`../assets/marketplace/deals/overlap.png`" />
            <ion-label class="overlap-percent">{{ image.percent }}</ion-label>
            <ion-label class="product-name">{{ image.name }}</ion-label>
          </div>
        </ion-segment>
      </ion-row>
      <ion-row class="supporters-row">
        <div class="row-type">
          <ion-label class="supporters">See what your favorite supporter bought</ion-label>
          <span class="see-button">See All</span>
        </div>
        <ion-segment :scrollable="true" class="supporter-list">
          <div class="each-supporter" v-for="supporter in supporters" :key="supporter.id">
            <ion-thumbnail class="supporter-image">
              <img :src="supporter.src" />
            </ion-thumbnail>
            <ion-label class="supporter-name">{{ supporter.name }}</ion-label>
          </div>
        </ion-segment>
      </ion-row>
      <ion-row class="ion-row">
        <ProductList :productType="recommendProduct" :images="recommend" />
      </ion-row>
    </ion-content>
    <ion-footer class="ion-no-border">
      <footer-component />
    </ion-footer>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonRow,
  IonCol,
  IonIcon,
  IonButton,
  IonLabel,
  IonImg,
  IonText,
  IonThumbnail,
} from "@ionic/vue";

import { optionsOutline, personOutline, cartOutline, paperPlaneOutline } from "ionicons/icons";

import ProductList from "../../components/marketplace/ProductList.vue";
import FooterComponent from "../../components/layout/FooterComponent.vue";

export default {
  components: {
    IonIcon,
    IonPage,
    IonRow,
    IonButton,
    ProductList,
    IonLabel,
    IonCol,
    IonImg,
    IonText,
    IonThumbnail,
    FooterComponent,
  },
  setup() {
    return {
      optionsOutline,
      personOutline,
      cartOutline,
      paperPlaneOutline,
    };
  },
  data() {
    return {
      iconImageBag: "../assets/marketplace/Bag.png",
      iconImageGroup: "../assets/marketplace/Group.png",
      brand1: "../assets/marketplace/rectangle-1.png",
      brand2: "../assets/marketplace/rectangle-2.png",
      tredingProduct: "Trending Products",
      recommendProduct: "Recommended Product",
      smartPhones: "Smart Phones",
      bucketNum: 5,
      profileImage: "../assets/marketplace/Profile.png",
      buyImage: "../assets/marketplace/Buy.png",
      optionsIcon: "../assets/marketplace/optionIcon.png",
      brandImage: "../assets/marketplace/brandImage.png",
      trendingProductImages: [
        {
          id: "item1",
          name: "Beyou Facewash...",
          price: "$587.00",
          src: "../assets/marketplace/trendingProducts/item(1).png",
        },
        {
          id: "item2",
          name: "Cocooil Organic B...",
          price: "$487.00",
          src: "../assets/marketplace/trendingProducts/item(2).png",
        },
        {
          id: "item3",
          name: "Chelsie Boot",
          price: "$5487.00",
          src: "../assets/marketplace/trendingProducts/item(3).png",
        },
        {
          id: "item2",
          name: "Classy high heels",
          price: "$5487.00",
          src: "../assets/marketplace/trendingProducts/item(4).png",
        },
      ],
      recommendProductImages: [
        {
          id: "item1",
          name: "Beyou Facewash...",
          price: "$587.00",
          src: "../assets/marketplace/recommendSupport/item(1).png",
        },
        {
          id: "item2",
          name: "Cocooil Organic B...",
          price: "$487.00",
          src: "../assets/marketplace/recommendSupport/item(2).png",
        },
        {
          id: "item3",
          name: "Selling a car witho...",
          price: "$5487.00",
          src: "../assets/marketplace/recommendSupport/item(3).png",
        },
        {
          id: "item2",
          name: "BMW Motorbike...",
          price: "$5487.00",
          src: "../assets/marketplace/recommendSupport/item(4).png",
        },
      ],
      sponsored: [
        {
          id: "item1",
          name: 'AVITA Essential 14 Celeron N4020 256GB SSD 14" Full HD Laptop...',
          price: "$500.00",
          src: "../assets/marketplace/sponsored.png",
        },
        {
          id: "item1",
          name: 'AVITA Essential 14 Celeron N4020 256GB SSD 14" Full HD Laptop...',
          price: "$500.00",
          src: "../assets/marketplace/sponsored.png",
        },
        {
          id: "item1",
          name: 'AVITA Essential 14 Celeron N4020 256GB SSD 14" Full HD Laptop...',
          des: 'SSD 14" Full HD Laptop...',
          price: "$500.00",
          src: "../assets/marketplace/sponsored.png",
        },
      ],
      deals: [
        {
          id: "item1",
          name: "Bluetooth Stereo Headphones",
          percent: "60%",
          src: "../assets/marketplace/deals/deal(1).png",
        },
        {
          id: "item2",
          name: "Bluetooth Stereo Headphones",
          percent: "60%",
          src: "../assets/marketplace/deals/deal(2).png",
        },
        {
          id: "item3",
          name: "Do you really need an air fryer?",
          percent: "60%",
          src: "../assets/marketplace/deals/deal(3).png",
        },
        {
          id: "item4",
          name: "Bluetooth Stereo Headphones",
          percent: "60%",
          src: "../assets/marketplace/deals/deal(1).png",
        },
        {
          id: "item5",
          name: "Bluetooth Stereo Headphones",
          percent: "60%",
          src: "../assets/marketplace/deals/deal(2).png",
        },
        {
          id: "item6",
          name: "Do you really need an air fryer?",
          percent: "60%",
          src: "../assets/marketplace/deals/deal(3).png",
        },
      ],
      recommend: [
        {
          id: "item1",
          name: "Beyou Facewash...",
          price: "$587.00",
          src: "../assets/marketplace/recommendSupport/item(1).png",
        },
        {
          id: "item2",
          name: "Cocooil Organic B...",
          price: "$487.00",
          src: "../assets/marketplace/recommendSupport/item(2).png",
        },
        {
          id: "item3",
          name: "Selling a car witho...",
          price: "$5487.00",
          src: "../assets/marketplace/recommendSupport/item(3).png",
        },
        {
          id: "item4",
          name: "BMW Motorbike...",
          price: "$5487.00",
          src: "../assets/marketplace/recommendSupport/item(4).png",
        },
        {
          id: "item5",
          name: "Selling a car witho...",
          price: "$5487.00",
          src: "../assets/marketplace/recommendSupport/item(5).png",
        },
        {
          id: "item6",
          name: "Selling a car witho...",
          price: "$5487.00",
          src: "../assets/marketplace/recommendSupport/item(6).png",
        },
      ],
      supporters: [
        {
          id: "Item1",
          name: "William Benjamin",
          src: "../assets/supporters/Charles.png",
        },
        {
          id: "Item2",
          name: "John Christopher",
          src: "../assets/supporters/Gerald.png",
        },
        {
          id: "Item3",
          name: "Margaret Nancy",
          src: "../assets/supporters/jonas.png",
        },
        {
          id: "Item4",
          name: "Timothy Jonathan",
          src: "../assets/supporters/Phillip.png",
        },
        {
          id: "Item5",
          name: "	Alexander Jerry",
          src: "../assets/supporters/Wesley.png",
        },
      ],
    };
  },
};
</script>

<style scoped>
ion-page {
  background-color: #f9f8ff;
}
.search-box {
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.header-toolbar {
  width: 100%;
  display: flex;
  align-items: center;
}
.search-bar {
  width: 250px;
  display: flex;
  justify-content: left;
  align-items: center;
  margin-left: 15px;
}
.input-search {
  width: 300px;
  height: 45px;
  background-color: #ffffff;
  --border: 1px solid #e9ecf0;
  --border-radius: 8px;
  margin-left: 15px;
  padding: 0px;
  z-index: 5;
}
.icon-stick {
  font-size: 24px;
  margin-top: 5px;
  margin-right: 0px;
  margin-left: 15px;
}
.option-icon {
  width: 42px;
  z-index: 5;
  margin-left: -50px;
  border-left: 0.5px solid #e9ecf0;
}
.shop-icons {
  display: flex;
  justify-content: center;
  align-items: center;
}
.ion-badge-account {
  --background: #ff6363;
}
.market-icons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 30px;
}
.profile-icon {
  margin-left: 15px;
  width: 21.12px;
  height: 26.49px;
}
.market-icon {
  margin-left: 20px;
  width: 29.33px;
  height: 28.66px;
}
.person-badge {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: #ff6363;
  margin-top: -25px;
  margin-left: -6px;
}
.bucket-badge {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  text-align: center;
  font-size: 10px;
  background-color: #866ee1;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: -10px;
  margin-top: -15px;
  z-index: 5;
}
.button-label {
  text-transform: none;
  margin-left: 20px;
  font-family: "Manrope";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 176.52%;
}
.market-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px;
}
.bag-button {
  width: 170px;
  height: 48px;
  margin-left: 10px;
  padding: 0px;
  --border-radius: 10px;
  --display: flex;
}
.group-button {
  width: 170px;
  height: 48px;
  margin-right: 10px;
  padding: 0px;
  --border-radius: 10px;
  --display: flex;
}
.group-icon {
  margin-left: -40px;
}
.ion-row {
  margin-left: 15px;
  margin-right: 15px;
  padding: -15px;
}
.image-overflow-button {
  position: absolute;
  width: 105px;
  height: 37px;
  margin-top: 130px;
  margin-left: 40px;
  border-radius: 8px;
  background: #31265a;
  font-size: 16px;
  z-index: 10;
  justify-content: space-between;
  align-items: center;
  color: #ffffff;
  text-transform: none;
}
.image-overflow-brand {
  position: absolute;
  width: 177px;
  height: 72px;
  margin-top: 30px;
  margin-left: 40px;
  font-family: "Manrope";
  font-style: normal;
  font-weight: 800;
  font-size: 28px;
  line-height: 130%;
  z-index: 10;
  color: #ffffff;
  text-transform: none;
}
.image-overflow-img {
  position: absolute;
  margin-left: 205px;
  margin-top: 35px;
  z-index: 10;
}
.brand-image {
  width: 289px;
  height: 77px;
  margin-left: 51px;
  margin-top: -65px;
  background: #212325;
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  z-index: 10;
  text-align: center;
}
.brand-overflow-button {
  padding: 6px 10px;
  gap: 10px;
  width: 249px;
  height: 33px;
  text-transform: none;
  background: #212325;
  border: 0.5px dashed #383838;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin: 10px 20px;
  color: #ffffff;
  font-family: "Manrope";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 130%;
}
.view-brand {
  font-family: "Manrope";
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 140%;
  color: #ffffff;
  width: 249px;
  height: 14px;
}
.recommend-product {
	margin-top: 18px;
	margin-left: 20px;
	background-color: black;
}
.smart-phones {
	margin-top: 28px;
	margin-left: 15px;
	margin-right: 15px;
	padding: -15px;
}
.sponsored {
  margin-left: 0px;
  padding-left: 20px;
  margin-top: 40px;
  background-color: #e9ecf0;
}
.sponsor {
  font-family: "Manrope";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  color: #4e5256;
  margin-left: 3px;
}
.sponsor-title {
  margin-left: 15px;
  margin-bottom: 20px;
  margin-top: 20px;
}
.sponsor-name {
  font-family: "Manrope";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 140%;

  width: 100%;
  margin-right: -20px;
}
.sponsor-price {
  font-family: "Manrope";
  font-style: normal;
  font-weight: 450;
  font-size: 12px;
  line-height: 150%;
  margin-top: 12px;
  margin-left: -20px;
  color: #866ee1;
}
.each-sponsor {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0px;
  gap: 10px;
  --background-color: #e9ecf0;
  width: 350px;
  height: 72px;
  margin-bottom: 22px;
  margin-left: 10px;
}
.sponsor-img {
  width: 70px;
  height: 70px;
}
.sponsor-detail {
  width: 60%;
  padding-left: 20px;
  padding: 0%;
  margin-left: 10px;
}
.deal-type {
  font-family: "Manrope";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 140%;
  color: #212325;
  width: 80%;
  margin-left: 15px;
}
.each-card {
  width: 112px;
  height: 196px;
  padding: 6px;
  margin-right: 14px;
  background-color: #ffffff;
  border-radius: 8px;
}
.deal-img {
  width: 100px;
  height: 126px;
}
.overlap-img {
  width: 45px;
  height: 22px;
  position: absolute;
  margin-left: 50px;
  margin-top: -120px;
}
.overlap-percent {
  position: absolute;
  font-family: "Manrope";
  font-style: normal;
  font-weight: 700;
  font-size: 13px;
  line-height: 130%;
  /* color: #FFFFFF; */
  color: black;
  margin-left: 60px;
  margin-top: -118px;
}
.see-button {
  font-family: "Manrope";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 130%;
  color: #866ee1;
  margin-top: 5px;
  width: 20%;
}
.row-type {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.product-name {
  font-family: "Manrope";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 130%;
  color: #212325;
  display: inline-block;
  text-align: left;
  width: 88px;
  margin-top: 5px;
}
.supporters-row {
  margin-top: 30px;
  margin-left: 20px;
}
.supporters {
  font-family: "Manrope";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 130%;
  color: #212325;
  width: 70%;
  margin-left: 10px;
}
.each-supporter {
  height: 110px;
  margin-right: 20px;
}
.supporter-list {
  margin-left: 10px;
  margin-top: 10px;
}
.supporter-name {
  font-family: "Manrope";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 130%;
  color: #212325;
  width: 68px;
  text-align: center;
  word-wrap: break-word;
  margin-top: 5px;
  margin-top: 8px;
}
.supporter-image {
  width: 70px;
  height: 70px;
  --border-radius: 16px;
}
</style>
