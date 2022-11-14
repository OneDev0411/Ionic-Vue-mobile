export default {
  getWalletById: (state) => (id) => {
    console.log("getWalletById", id);
    console.log("getWalletById", state.wallets);
    return state.wallets.find((wallet) => wallet.id == id);
  },
};
