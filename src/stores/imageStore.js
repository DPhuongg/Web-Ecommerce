import { defineStore } from 'pinia';
import apiServices from '@/domain/apiServices';
import Swal from 'sweetalert2';
import router from '@/router/index.js';
import _ from 'lodash';


export const useImageStore = defineStore('image', {
  state: () => ({
    image:[],
  }),

  actions: {
    // async fetchAttributeProduct(id) {
    //   const response = await apiServices.getListAttributeProduct(id);
    //   console.log("có vô không thì bảo",response.data.data)
    //   this.attributes = response.data.data;
    // },

    // createFormData() {
    //   const formData = new FormData();
    //   formData.append('name', this.attributesForm.name);
    //   formData.append('product_id', this.attributesForm.product_id);

    //   return formData;
    // },

    async upLoadImage(image) {
      const response = await apiServices.upLoadImage();
    //   if (response.data.code === 200) {
    //     Swal.fire({
    //       position: 'top-end',
    //       icon: 'success',
    //       title: 'Thêm thuộc tính mới thành công',
    //       showConfirmButton: false,
    //       timer: 1500
    //     });
    //   }
    },
    async upLoadImageText(image) {
        const response = await apiServices.upLoadImageText();
      //   if (response.data.code === 200) {
      //     Swal.fire({
      //       position: 'top-end',
      //       icon: 'success',
      //       title: 'Thêm thuộc tính mới thành công',
      //       showConfirmButton: false,
      //       timer: 1500
      //     });
      //   }
      },
  }
});
