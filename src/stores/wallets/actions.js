import endpoints from "../../helpers/endpoints";
import { requestManager } from "../../helpers/requestManager";

export default {
  async loadWallets() {
    const response = await requestManager.get(endpoints.myWallets);
    if (response.status === 200) {
      console.log("loadWallets", response.data);
      this.wallets = response.data;
    }
  },
  async createWallet({ name, description }) {
    const response = await requestManager.post(endpoints.wallets, {
      name,
      description,
    });
    if (response.status === 201) {
      console.log("createWallet", response.data);
      this.wallets.push(response.data);
    }
  },
  async pay({
    amount,
    card_number,
    card_holder,
    exp_month,
    exp_year,
    cvv,
    comment,
    dream_id,
  }) {
    const response = await requestManager.post(endpoints.payment, {
      amount,
      card_number,
      card_holder,
      exp_month,
      exp_year,
      cvv,
      comment,
      dream_id,
    });
    if (response.status === 200) {
      if (response.data.redirect) {
        console.log("redirecting to ", response.data.redirect);
        return response.data.redirect;
      } else {
        return "success";
      }
    }
  },
};
