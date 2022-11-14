import { defineStore } from "pinia";
import getters from "./getters.js";
import actions from "./actions.js";

export const useUsers = defineStore("users", {
  // arrow function recommended for full type inference
  state: () => {
    return {
      users: [
        {
          // all these properties will have their type inferred automatically
          id: 2,
          displayName: "UserNo2",
          username: "testusername2",

          firstName: "testFirst",
          lastName: "testLast",
          fullName: "testFirst testLast",
          location: "Bucharest",
          profilePhoto:
            "https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y",
          backgroundPhoto:
            "https://media-cdn.tripadvisor.com/media/photo-p/0b/31/fd/5d/seaside.jpg",
          storyImages: [
            "https://thumbs.dreamstime.com/b/vertical-panorama-country-road-9905521.jpg",
            "https://cdn.vox-cdn.com/thumbor/MZRJnpwAMIHQ5-XT4FwNv0rivw4=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/19397812/1048232144.jpg.jpg",
          ],
        },
        {
          // all these properties will have their type inferred automatically
          id: 3,
          displayName: "testFirst",

          username: "testusername4",

          firstName: "testFirst",
          lastName: "testLast",
          fullName: "testFirst testLast",
          location: "Bucharest",
          profilePhoto:
            "https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y",
          backgroundPhoto:
            "https://media-cdn.tripadvisor.com/media/photo-p/0b/31/fd/5d/seaside.jpg",
          storyImages: [
            "https://thumbs.dreamstime.com/b/vertical-panorama-country-road-9905521.jpg",
            "https://cdn.vox-cdn.com/thumbor/MZRJnpwAMIHQ5-XT4FwNv0rivw4=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/19397812/1048232144.jpg.jpg",
          ],
        },
        {
          id: 4,
          displayName: "testFirst",
          username: "testusername5",

          firstName: "testFirst",
          lastName: "testLast",
          fullName: "testFirst testLast",
          location: "Bucharest",
          profilePhoto:
            "https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y",
          storyImages: [
            "https://thumbs.dreamstime.com/b/vertical-panorama-country-road-9905521.jpg",
            "https://cdn.vox-cdn.com/thumbor/MZRJnpwAMIHQ5-XT4FwNv0rivw4=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/19397812/1048232144.jpg.jpg",
          ],
        },
      ],
    };
  },
  getters: getters,
  actions: actions,
});
