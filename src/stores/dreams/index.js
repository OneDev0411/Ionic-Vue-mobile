import { defineStore } from "pinia";
//import getters from "./getters.js";
import actions from "./actions.js";
import getters from "./getters.js";

export const useDreams = defineStore("dreams", {
  // arrow function recommended for full type inference
  state: () => {
    return {
      dreams: [
        {
          // "title", "userDisplayname", "profilePhoto", "image", "id"]
          // all these properties will have their type inferred automatically
          id: 1,
          title: "testStore Title",
          user: {
            id: 3,
            displayName: "testFirst",
            profilePhoto:
              "https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y",
          },

          image:
            "https://www.worldatlas.com/r/w1200/upload/97/1a/45/shutterstock-1476612089.jpg",
          progress: 0.3,
          description:
            "Some dream description. Keep close to Nature's star... and break clear away, once in awhile, and climb a mountain or spend a week in the woods. Wash your spirit clean.",
          tags: ["testTab", "wohooo"],
          bookmark: false,

          milestones: [
            {
              id: 1,
              title: "test",
              date: new Date(),
              description: "alalalalla",
              completed: true,
            },
            {
              id: 2,
              title: "test2",
              date: new Date(),
              description: "alalalalla",
              completed: false,
            },
          ],
        },
        {
          // "title", "userDisplayname", "profilePhoto", "image", "id"]
          // all these properties will have their type inferred automatically
          id: 2,
          title: "testStore Title",
          bookmark: false,
          user: {
            id: 2,
            displayName: "testFirst",
            profilePhoto:
              "https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y",
          },

          image:
            "https://www.worldatlas.com/r/w1200/upload/97/1a/45/shutterstock-1476612089.jpg",
          progress: 0.7,
          description:
            "Some dream description. Keep close to Nature's star... and break clear away, once in awhile, and climb a mountain or spend a week in the woods. Wash your spirit clean.",

          milestones: [
            {
              id: 3,
              title: "test",
              date: new Date(),
              description: "alalalalla",
              completed: false,
            },
            {
              id: 4,
              title: "test2",
              date: new Date(),
              description: 'alalalalla',
              completed: false
            }
          ]
        }
      ],
      supporters: [
        {
          id: 'Item1',
          name: 'Chalres',
          job: 'freelancer',
          src: '../assets/supporters/Charles.png',
          added: false
        },
        {
          id: 'Item2',
          name: 'Gerald',
          job: 'freelancer',
          src: '../assets/supporters/Gerald.png',
          added: false
        },
        {
          id: 'Item3',
          name: 'jonas',
          job: 'freelancer',
          src: '../assets/supporters/jonas.png',
          added: false
        },
        {
          id: 'Item4',
          name: 'Phillip',
          job: 'freelancer',
          src: '../assets/supporters/Phillip.png',
          added: false
        },
        {
          id: 'Item5',
          name: 'Wesley',
          job: 'freelancer',
          src: '../assets/supporters/Wesley.png',
          added: false
        }, {
          id: 'Item6',
          name: 'Willard',
          job: 'freelancer',
          src: '../assets/supporters/Willard.png',
          added: false
        },
        {
          id: 'Item7',
          name: 'Willie',
          job: 'freelancer',
          src: '../assets/supporters/Willie.png',
          added: false
        },
        {
          id: 'Item8',
          name: 'Charlesy',
          job: 'freelancer',
          src: '../assets/supporters/Charles.png',
          added: false
        },
        {
          id: 'Item9',
          name: 'Chalre',
          job: 'freelancer',
          src: '../assets/supporters/Charles.png',
          added: false
        }
      ],
      comments: [],
      products: [
        {
          id: 'Item0',
          name: '2023 Honda HR-V',
          category: 'Electronics',
          src: 'https://drive.google.com/uc?id=1Z13NivrUIVRPcdIoOLscNx6dEwBm9Bzc',
          price: '$500.00',
          added: false
        },
        {
          id: 'Item1',
          name: 'Lamborghini Huracán',
          category: 'Electronics',
          src: 'https://drive.google.com/uc?id=18SyZLIagnsan240O7CFGypsER9V4xiW9',
          price: '$500.00',
          added: true
        },
        {
          id: 'Item2',
          name: 'Ferrari LaFerrari | Sup...',
          category: 'Electronics',
          src: 'https://drive.google.com/uc?id=1Vu8zZruH2avqKJm3CLdYIIe7XL3QrPoi',
          price: '$500.00',
          added: true
        },
        {
          id: 'Item3',
          name: 'Maruti Suzuki Cars Pr...',
          category: 'Electronics',
          src: 'https://drive.google.com/uc?id=1mEJUx35kDWWdbTPDDIw53heEV0_LJK0r',
          price: '$500.00',
          added: true
        },
        {
          id: 'Item4',
          name: 'Chevolet Salad',
          category: 'Electronics',
          src: 'https://drive.google.com/uc?id=16ekJ26cy5zqLGnXbEfE-xhgNzYUmP2jf',
          price: '$500.00',
          added: false
        }
      ],
      Image: []
    }
  },
  getters,
  actions
})
