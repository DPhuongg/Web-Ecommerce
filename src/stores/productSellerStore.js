import { defineStore } from 'pinia';
import apiServices from '@/domain/apiServices';
import Swal from 'sweetalert2';
import router from '@/router/index.js';
import _ from 'lodash';


export const useProductStore = defineStore('products', {
  state: () => ({
    products: [],
    totalElements: 0,
    currentPage: 1,
    pageSize: 10,
    productForm: {
      name: '',
      description: '',
      status: '1',
      brandId: '',
      categoryIds: [],
      images: []
    }
  }),

  actions: {
    updatePagination({ currentPage }) {
      this.currentPage = currentPage;
      this.fetchProducts(this.currentPage);
    },

    async fetchProducts(page = 1, searchQuery = '') {
      const response = await apiServices.getListProduct(page, this.pageSize, searchQuery);
      const content = response.data.data.productResponses;

      this.products = _.map(content, (product, index) => ({
        ...product,
        stt: (page - 1) * this.pageSize + index + 1
      }));

      console.log( this.products);

      this.totalElements = response.data.data.totalPages * this.pageSize;
    },

    createFormData() {
      const formData = new FormData();

      formData.append('name', this.productForm.name);
      formData.append('description', this.productForm.description);
      formData.append('status', this.productForm.status);
      formData.append('brandId', this.productForm.brandId);

      // formData.append('categoryIds', JSON.stringify(this.productForm.categoryIds));
      this.productForm.categoryIds.forEach((id) => {
        formData.append('categoryIds', id);
      });

      this.productForm.images.forEach((image) => {
        formData.append('images', image); // Lấy tên tệp từ đối tượng File
      });

      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }
      return formData;
    },

    async addProduct(product) {
      this.productForm = { ...product };
      console.log(this.productForm);
      const formData = this.createFormData();
      const response = await apiServices.createProduct(formData);
      if (response.data.code === 200) {
        router.push({ name: 'menu-4' });
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Thêm mới sản phẩm thành công',
          showConfirmButton: false,
          timer: 1500
        });
      }
    }
  }
});
