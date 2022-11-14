<template>
  <ion-page>
    <ion-row class="search-box-wrapper">
      <div class="header-toolbar">
        <div class="search-bar">
          <ion-searchbar
            class="input-search"
            color="white"
            placeholder="Search"
            v-model="keyword"
            search-icon=" search "
          />
          <div class="option-icon">
            <img :src="optionsIcon" class="icon-stick" />
          </div>
          <div class="search-icon">
            <img :src="searchIcon" class="icon-stick" />
          </div>
        </div>
        <div class="market-icons">
          <img class="market-icon" :src="buyImage" />
          <div class="bucket-badge">{{ bucketNum }}</div>
        </div>
      </div>
    </ion-row>
  </ion-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      bucketNum: 5,
      buyImage: "../assets/marketplace/Buy.png",
      optionsIcon: "../assets/marketplace/optionIcon.png",
      searchIcon: "../assets/marketplace/productlist/search-icon.svg",
    };
  },
});
</script>

<style>
.searchbar-search-icon {
  color: green;
}
.header-toolbar {
  width: 100%;
  display: flex;
  align-items: center;
}

button.searchbar-clear-button {
  right: 55px !important;
}

.search-box-wrapper {
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}

ion-icon.searchbar-search-icon {
  display: none !important;
}
.search-bar {
  width: 325px;
  height: 50px;
  display: flex;
  justify-content: left;
  align-items: center;
}
.input-search {
  width: 325px;
  height: 50px;
  background-color: #ffffff;
  --border: 1px solid #e9ecf0;
  --border-radius: 8px;
  margin-left: 15px;
  padding: 0px;
  z-index: 5;
  --box-shadow: none !important;
  background: #ffffff;
  /* Stroke */

  border: 1px solid #e9ecf0;
  border-radius: 8px;
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

.searchbar-input {
  padding-left: 44px !important;
}
.search-icon {
  position: absolute;
  left: 16px;
  z-index: 5;
}
.shop-icons {
  display: flex;
  justify-content: center;
  align-items: center;
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
  width: 29.33px;
  height: 28.66px;
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
</style>
