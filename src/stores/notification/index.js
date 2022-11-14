import { defineStore } from "pinia";
import getters from "./getters.js";
import actions from "./actions.js";

export const useNotifications = defineStore("notifications", {
  // arrow function recommended for full type inference
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      notifications: [
        {
          id: 1,
          title: "hey there!",
          description: "something happend!",
          date: new Date("Sun Apr 03 2022 19:24:29 GMT+0300"),
          type: "info",
        },
        {
          id: 2,
          title: "Notification",
          description: "dont forget too read this",
          date: new Date("Sun Apr 03 2022 19:24:35 GMT+0300"),
          type: "order",
        },
        {
          id: 3,
          title: "Old stuff",
          description: "yeah, pretty old",
          date: new Date("Sun Apr 03 2022 19:24:40 GMT+0300"),
          type: "dream",
        },
        {
          id: 4,
          title: "New stuff",
          description: "yeah, pretty old",
          date: new Date("Sun Apr 03 2022 19:24:40 GMT+0300"),
          type: "invite",
        },
      ],
    };
  },
  getters: getters,
  actions: actions,
});
