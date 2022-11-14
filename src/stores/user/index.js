import { defineStore } from "pinia";
import getters from "./getters.js";
import actions from "./actions.js";

export const useUser = defineStore("user", {
  // arrow function recommended for full type inference
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      id: 1,
      isAuthenticated: false,
      isLoaded: false,
      displayName: "UserProfile1123",
      username: "testusername",

      firstName: "testFirst",
      lastName: "testLast",
      location: "Bucharest",
      profilePhoto:
        "https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y",
      backgroundPhoto:
        "https://media-cdn.tripadvisor.com/media/photo-p/0b/31/fd/5d/seaside.jpg",
      storyImages: [],
    };
  },
  getters: getters,
  actions: actions,
});
