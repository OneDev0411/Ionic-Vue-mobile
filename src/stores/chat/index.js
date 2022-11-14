import { defineStore } from "pinia";
import getters from "./getters.js";
import actions from "./actions.js";

export const useChat = defineStore("chat", {
  // arrow function recommended for full type inference
  state: () => {
    return {
      rooms: [],
    };
  },
  getters: getters,
  actions: actions,
});
