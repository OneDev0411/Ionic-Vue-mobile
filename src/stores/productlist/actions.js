export default {
  setFavouriteProduct(id, status) {
    this.productList.find((product) => product.id === id).isFavour = !status;
  },
  buyProduct(id) {
    this.productList.find((product) => product.id === id).isBought = true;
  },
};
