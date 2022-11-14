<template>
  <base-layout page-title="Product List">
    <ion-header>
      <SearchBox />
      <ProductListTabs
        @tab-selected="setTab"
        :selectable="['Best Match', 'Top Sell', 'New', 'Free Shipping']"
      />
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item
          class="product-item"
          text-wrap
          lines="none"
          v-for="(product, index) in productList"
          :key="product.imgSrc"
          :style="index === productList.length - 1 && 'margin-bottom: 130px'"
        >
          <ProductCard :product="product" />
        </ion-item>
      </ion-list>
    </ion-content>
  </base-layout>
</template>

<script>
import ProductListTabs from "../../components/marketplace/ProductListTabs.vue";
import SearchBox from "../../components/marketplace/SearchBox.vue";
import ProductCard from "../../components/marketplace/ProductCard.vue";
import { useProductList } from "../../stores/productlist";

export default {
  setup() {
    const productListStore = useProductList();
    return {
      productListStore,
    };
  },
  data() {
    return {
      selectedTab: "Best Match",
      curProductList: [],
    };
  },
  computed: {
    productList() {
      switch (this.selectedTab) {
        case "Best Match":
          return this.productListStore.getProductList;
        case "Top Sell":
          return this.productListStore.getTopProductList;
        case "New":
          return this.productListStore.getNewProductList;
        case "Free Shipping":
          return this.productListStore.getFreeShippingProductList;
        default:
          return this.productListStore.getProductList;
      }
    },
  },
  components: {
    ProductListTabs,
    SearchBox,
    ProductCard,
  },
  methods: {
    setTab(tabName) {
      this.selectedTab = tabName;
    },
  },
  mounted() {
    // this.myProductList = this.productListStore.$state.productList,
  },
};
</script>

<style>
ion-header {
  border-top: 1px solid #e9ecf0;
}

ion-header::after {
  background: none !important;
}

ion-item.product-item {
  --background: #f9f8ff;
}

ion-list {
  padding: 0 !important;
}
</style>
