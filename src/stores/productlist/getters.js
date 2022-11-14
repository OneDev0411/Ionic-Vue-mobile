export default {
  getProductList: (state) => state.productList,
  getNewProductList: (state) => state.productList.filter((item) => !!item.isNew),
  getTopProductList: (state) =>
    [...state.productList].sort((left, right) => right.rating - left.rating),
  getFreeShippingProductList: (state) => state.productList.filter((item) => !!item.isFreeShipping),
};
