<template>
  <ion-card style="width: 100%">
    <ion-list>
      <ion-item class="ion-no-padding" text-wrap lines="none">
        <ion-button
          slot="end"
          fill="clear"
          class="card-action-btn favour-btn"
          @click="toggleFavour"
        >
          <ion-thumbnail class="star-thumbnail">
            <ion-img :src="product.isFavour ? favourStarSvg : normalStarSvg" />
          </ion-thumbnail>
        </ion-button>
        <ion-button
          class="cart-btn"
          :color="product.isBought ? 'success' : 'primary'"
          @click="buyProduct"
        >
          <ion-thumbnail class="cart-thumbnail">
            <ion-img :src="cartSvg" />
          </ion-thumbnail>
        </ion-button>

        <ion-thumbnail class="product-thumbnail">
          <ion-img class="product-img" :src="product.imgSrc" />
          <ion-img v-if="product.isNew" class="product-substract" :src="substractSvg" />
        </ion-thumbnail>
        <ion-label class="img-info">
          <p class="product-caption">Store Name</p>
          <p class="product-name">Apple macbook air 2014</p>
          <p class="product-price">$220.00 <span>$220.00</span></p>
          <ion-text class="product-rating-wrapper">
            <ion-img size="md" :src="ratingStarSvg" />
            <span class="product-rating">{{ product.rating }}</span>
            <ion-img
              v-if="product.isFreeShipping"
              class="free-shipping-img"
              size="md"
              :src="freeShippingSvg"
            />
            <span v-if="product.isFreeShipping" class="free-shipping">Free Shipping</span>
          </ion-text>
        </ion-label>
      </ion-item>
    </ion-list>
  </ion-card>
</template>
<script>
import { star, cartOutline } from "ionicons/icons";
import { defineComponent } from "vue";
import { useProductList } from "../../stores/productlist";

export default defineComponent({
  setup() {
    const productListStore = useProductList();
    return {
      productListStore,
    };
  },
  data() {
    return {
      star,
      cartOutline,
      freeShippingSvg: "../assets/marketplace/free-shipping.svg",
      favourStarSvg: "../assets/marketplace/favour-star.svg",
      ratingStarSvg: "../assets/marketplace/rating-star.svg",
      normalStarSvg: "../assets/marketplace/normal-star.svg",
      substractSvg: "../assets/marketplace/substract.svg",
      cartSvg: "../assets/marketplace/productlist/cart.svg",
    };
  },
  props: {
    product: {
      type: String,
      required: true,
    },
  },
  methods: {
    toggleFavour() {
      this.productListStore.setFavouriteProduct(this.product.id, this.product.isFavour);
    },
    buyProduct() {
      this.productListStore.buyProduct(this.product.id);
    },
  },
});
</script>

<style scoped>
ion-card {
  border: 1px solid #dbd4f6;
  border-radius: 16px;
  box-shadow: none;
  padding: 0.625rem;
  font-family: "Manrope";
  font-style: normal;
  margin: 10px 0;
}

ion-item {
  --padding-end: 0px;
  --inner-padding-end: 0px;
}
.free-shipping-img {
  width: 18px;
  height: 18px;
  margin-left: 10px;
}

ion-text .free-shipping {
  font-weight: 700;
  font-size: 10px;
  line-height: 100%;
  color: #0dab30;
  margin-left: 3px;
}
.label {
  margin: 0;
}
.item-inner {
  padding-right: 0px !important;
}

.favour-btn {
  position: absolute;
  right: 0;
  top: 0;
  margin: 0;
}
.card-action-btn {
  width: 34px;
  height: 34px;
  --border-radius: 8px;
}
.cart-btn {
  position: absolute;
  right: 0;
  bottom: 0;
  margin: 0;
}

ion-thumbnail.product-thumbnail {
  margin: 0;
  max-width: 104px;
  height: 104px;
  width: 100%;
  margin-right: 1rem;
  position: relative;
}

ion-thumbnail.cart-thumbnail {
  width: 18px;
  height: 18px;
}

ion-thumbnail.product-thumbnail .product-substract {
  position: absolute;
  top: 0;
  width: 30px;
  height: 30px;
}

ion-thumbnail.product-thumbnail .product-img {
  border-radius: 16px;
}

ion-thumbnail.star-thumbnail {
  width: 18px;
  height: 17px;
}

ion-list {
  padding: 0;
}

.item-native {
  padding: 0 !important;
}

.img-label {
  display: flex;
  flex-direction: column;
}

.img-info {
  margin: 0;
}
.img-info p {
  margin: 0;
}

.img-info .product-caption {
  font-weight: 400;
  font-size: 12px;
  line-height: 130%;
  color: #b8b8b8;
}

.img-info .product-price {
  font-weight: 700;
  font-size: 14px;
  line-height: 130%;
  color: #866ee1;
  margin-top: 0.67rem;
}

.img-info .product-name {
  font-weight: 700;
  font-size: 16px;
  line-height: 140%;
  color: #212325;
}

.img-info .product-price span {
  font-family: "Manrope";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 160%;
  color: #b8b8b8;
  text-decoration: line-through;
  margin-left: 0.375rem;
}

.product-rating-wrapper {
  display: flex;
  align-items: center;
  margin-top: 3.67px;
}
.img-info .product-rating {
  font-weight: 500;
  font-size: 14px;
  line-height: 140%;
  color: #212325;
  margin-left: 4.33px;
}
</style>
