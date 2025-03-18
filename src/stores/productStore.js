import { defineStore } from 'pinia';
import apiServices from '@/domain/apiServices';
import Swal from 'sweetalert2';
import _ from 'lodash';
import router from '@/router/index.js';

export const useProductStore = defineStore('product', {
  state: () => ({
    totalElements: 0,
    currentPage: 1,
    pageSize: 10
  }),
  actions: {
    updatePagination({ currentPage }) {
      console.log(currentPage);
      this.currentPage = currentPage;
      this.fetchProducts(this.currentPage);
    },

    async fetchProducts(sort = '', page = 1) {
      console.log('Page:', page);
      const response = await apiServices.getAllProduct(sort, page);
      console.log('await reponse.fetchProducts(props.option);', sort, (page = 1));
      const reversedData = _.reverse(_.clone(response.data.data));

      this.products = _.map(reversedData, (item, index) => ({
        ...item,
        stt: index + 1
      }));
      this.totalElements = response.data.data.totalPages * 10;
    },

    async detailProduct(id) {
      const response = await apiServices.getDetailProduct(id);
      this.detail = response.data.data;
      // router.push({ name: 'warehouse-edit' });
      router.push({ name: 'product-edit', params: { id } });
    }
  }
});
