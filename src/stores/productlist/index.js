import { defineStore } from "pinia";
import getters from "./getters.js";
import actions from "./actions.js";

export const useProductList = defineStore("productList", {
  // arrow function recommended for full type inference
  state: () => {
    return {
      productList: [
        {
          id: 1,
          imgSrc: "../assets/marketplace/productlist/product01.png",
          isFavour: true,
          isFreeShipping: false,
          isNew: false,
          rating: "4.9",
          isBought: false,
        },
        {
          id: 2,
          imgSrc: "../assets/marketplace/productlist/product02.png",
          isFavour: true,
          isFreeShipping: false,
          isNew: false,
          rating: "4.2",
          isBought: true,
        },
        {
          id: 3,
          imgSrc: "../assets/marketplace/productlist/product03.png",
          isFavour: false,
          isFreeShipping: false,
          isNew: true,
          rating: "4.1",
          isBought: false,
        },
        {
          id: 4,
          imgSrc: "../assets/marketplace/productlist/product04.png",
          isFavour: false,
          isFreeShipping: false,
          isNew: false,
          rating: "4.9",
          isBought: false,
        },
        {
          id: 5,
          imgSrc: "../assets/marketplace/productlist/product05.png",
          isFavour: false,
          isFreeShipping: true,
          isNew: false,
          rating: "4.8",
          isBought: true,
        },
        {
          id: 6,
          imgSrc: "../assets/marketplace/productlist/product06.png",
          isFavour: false,
          isFreeShipping: true,
          isNew: true,
          rating: "4.8",
          isBought: false,
        },
        {
          id: 7,
          imgSrc: "../assets/marketplace/productlist/product07.png",
          isFavour: false,
          isFreeShipping: true,
          isNew: true,
          rating: "4.8",
          isBought: false,
        },
        {
          id: 8,
          imgSrc: "../assets/marketplace/productlist/product08.png",
          isFavour: false,
          isFreeShipping: false,
          isNew: true,
          rating: "4.8",
          isBought: false,
        },
      ],
    };
  },
  getters,
  actions,
});
