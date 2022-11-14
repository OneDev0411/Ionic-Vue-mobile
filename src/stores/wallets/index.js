import { defineStore } from "pinia";
import getters from "./getters.js";
import actions from "./actions.js";

export const useWallets = defineStore("wallets", {
  // arrow function recommended for full type inference
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      wallets: [
        // {
        //   id: "1",
        //   name: "Wallet 1",
        //   description: "This is wallet 1",
        //   created_at: Date(),
        //   updated_at: Date(),
        //   amount: "100",
        // },
      ],
    };
  },
  getters: getters,
  actions: actions,
});
