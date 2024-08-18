import { defineStore } from 'pinia';
import apiServices from '@/domain/apiServices';
import _ from 'lodash';
import axios from 'axios';

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartItems: []
  }),

  actions: {
    async fetchCartItems() {
      try {
        const response = await apiServices.getAllCart();
        const content = response.data.data.content;
        console.log(content);

        const promises = _.map(content, async (item) => {
          console.log(item);
          const [productResponse, shopResponse] = await Promise.all([
            apiServices.getItemCart(item.productItemId),
            apiServices.getShopById(item.shopId)
          ]);

          return {
            ...item,
            productDetails: productResponse.data.data,
            shopDetails: shopResponse.data.data
          };
        });

        // Chờ tất cả các promises hoàn thành
        this.cartItems = await Promise.all(promises);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    },

    increaseQuantity(index) {
      this.cartItems[index].quantity++;
    },

    decreaseQuantity(index) {
      if (this.cartItems[index].quantity > 1) {
        this.cartItems[index].quantity--;
      }
    },

    removeItem(index) {
      this.cartItems.splice(index, 1);
    }
  },

  getters: {
    cartTotalPrice(state) {
      return state.cartItems.reduce((total, item) => {
        return total + item.quantity * item.productDetails.price;
      }, 0);
    }
  }
});
