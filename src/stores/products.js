import { defineStore } from 'pinia';
import apiServices from '@/domain/apiServices';


export const productStore = defineStore('products', {
  state: () => ({
    products: [],
    totalElements: 0,
    currentPage: 1,
    pageSize: 10,
    itemCount: 0
  }),

  actions: {
    async fetchProducts() {
      const response = await apiServices.getAllProduct();
      this.products = response.data.data.productResponses;
    },

    async fetchCart() {
      const response = await apiServices.quantityCart();
      this.itemCount = response.data.data;
    }
  }
});
