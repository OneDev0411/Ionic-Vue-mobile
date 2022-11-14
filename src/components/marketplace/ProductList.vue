<template>
  <ion-page>
    <ion-row>
      <ion-label class="product-type">{{ productType }}</ion-label>
      <router-link class="see-button" to="/marketplace/product-listing"> See All </router-link>
    </ion-row>
    <div class="card-list">
      <div v-for="image in images" :key="image.id" class="each-card">
        <img :src="image.src" class="product-img" />
        <ion-label class="product-name">{{ image.name }}</ion-label>
        <span class="prodcut-price">{{ image.price }}</span>
      </div>
    </div>
  </ion-page>
</template>

<script>
export default {
  props: ["images", "productType"],
};
</script>

<style scoped>
.product-type {
	font-family: 'Manrope';
	font-style: normal;
	font-weight: 700;
	font-size: 19px;
	line-height: 140%;
	color: #212325;
	width: 80%;
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
ion-row {
  width: 100%;
  margin-top: 10px;
  margin-left: 15px;
  padding-right: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}
.card-list {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  margin-left: 15px;
  margin-right: 15px;
  width: 100%;
}
.product-img {
  width: 170px;
  height: 126px;
  margin: 0px;
}
.product-name {
  font-family: "Manrope";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 130%;
  color: #212325;
  display: inline-block;
  width: 100%;
  margin-top: 5px;
  margin-left: 9px;
}
.prodcut-price {
  font-family: "Manrope";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 140%;
  color: #866ee1;
  margin-top: 3px;
  margin-left: 9px;
}
ion-col {
  margin-top: 20px;
}
.each-card {
  width: 170px;
  height: 185px;
  margin-bottom: 20px;
  margin-right: 10px;
  margin-left: 0px;
  padding: 0px;
  background-color: #ffffff;
  border-radius: 8px;
}
</style>
