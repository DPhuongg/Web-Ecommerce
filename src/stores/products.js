import { defineStore } from 'pinia';
import apiServices from '@/domain/apiServices';

import axios from 'axios';

export const productStore = defineStore('products', {
  state: () => ({
    products: [],
    isLoading: false,
    error: null
  }),

  actions: {
    async fetchProducts() {
      this.isLoading = true;
      this.error = null;
      try {
        // const response = await apiServices.getAllProduct();
        const response = await axios.get('http://localhost:3000/products');
        this.products = response.data;
      } catch (err) {
        this.error = 'Faliled';
        console.log(err);
      } finally {
        this.isLoading = false; // Đặt lại trạng thái loading
      }
    }
  }
});
