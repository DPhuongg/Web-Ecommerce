import { defineStore } from 'pinia';
import apiServices from '@/domain/apiServices';
import Swal from 'sweetalert2';
import _ from 'lodash';
import router from '@/router/index.js';

export const useVoucherStore = defineStore('vouchers', {
  state: () => ({
    vouchers: [],
    detail: {
      name: '',
      country: '',
      province: '',
      district: '',
      commune: '',
      address_detail: ''
    },
    totalElements: 10,
    currentPage: 1,
    pageSize: 10
  }),
  actions: {
    updatePagination({ currentPage }) {
      this.currentPage = currentPage;
      this.fetchWarehouses(this.currentPage);
    },

    async fetchVouchers(page = 1) {
      const response = await apiServices.getAllVoucher();
      // const reversedData = _.reverse(_.clone(response.data.data.content));
      const data = response.data.data;

      this.vouchers = _.map(data, (item, index) => ({
        ...item,
        stt: (page - 1) * this.pageSize + index + 1
      }));
      // this.totalElements = response.data.data.totalElements;
    }
  }
});
