import { defineStore } from 'pinia';
import apiServices from '@/domain/apiServices';

import axios from 'axios';

export const productStore = defineStore('products', {
  state: () => ({
    products: [],
    totalElements: 0,
    currentPage: 1,
    pageSize: 10
  }),

  actions: {
    async fetchProducts(keyword='',sort='',fromPrice='', toPrice='',brandId='', selectedCategories='', selectStar='') {
      try {
        const response = await apiServices.getAllProduct(keyword,sort, fromPrice,toPrice,brandId,selectedCategories, selectStar);
        this.products = response.data.data.productResponses;
        console.log(this.products);
      } catch (err) {
        this.error = 'Faliled';
        console.log(err);
      } finally {
        this.isLoading = false; // Đặt lại trạng thái loading
      }
    }
  }
});
