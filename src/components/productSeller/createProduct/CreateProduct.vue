<template>
  <div class="product flex p-8 justify-between bg-[#ffff]">
    <div class="w-[65%]">
      <h2 class="text-[22px] font-bold mb-8">Thông tin sản phẩm</h2>
      <input class="input input--one w-full uppercase" placeholder="Sản phẩm A" />
      <h2 class="pt-6 pb-3 text-[16px] font-normal">Mô tả sản phẩm</h2>
      <textarea
        class="input textarea textarea--one w-full h-[200px] p-3 outline-none"
        placeholder="Nhập mô tả sản phẩm"
        v-model="productDescription"
      ></textarea>
      <h3 class="pt-6 pb-3 text-[16px] font-normal mb-3">Ảnh mô tả sản phẩm</h3>

      <div class="flex w-full flex-wrap">
        <div class="relative w-[60px] h-[60px] mr-5" v-for="(image, index) in imagePreviews" :key="index">
          <img :src="image" class="product__thumbnail w-full h-full mr-10" />
          <CloseIcon @click="removeImage(index)" class="absolute w-[20px] h-[20px] top-[-10px] right-[-6px]"></CloseIcon>
        </div>
      </div>

      <div
        class="mt-8 px-3 z-30 py-3 bg-rose-400 rounded-md text-white relative font-semibold font-sans after:-z-20 after:absolute after:h-1 after:w-1 after:bg-rose-800 after:left-5 overflow-hidden after:bottom-0 after:translate-y-full after:rounded-md after:hover:scale-[300] after:hover:transition-all after:hover:duration-700 after:transition-all after:duration-700 transition-all duration-700 [text-shadow:3px_5px_2px_#be123c;] hover:[text-shadow:2px_2px_2px_#fda4af] text-[16px] w-[150px]"
      >
        <p class="text-center text-[#fff] font-medium">Chọn ảnh</p>
        <input type="file" class="absolute inset-0 opacity-0" @change="handleImageUpload" />
      </div>
    </div>

    <div class="w-[30%] mt-[65px]">
      <select v-model="status" class="input input--one w-full">
        <option value="open">Mở bán</option>
        <option value="close">Dừng bán</option>
      </select>

      <p class="pt-6 pb-3 text-[16px] font-normal">Nhãn hiệu sản phẩm</p>
      <select v-model="selectedBrand" class="input input--one w-full">
        <option v-for="brand in brands" :key="brand.value" :value="brand.value">
          {{ brand.label }}
        </option>
      </select>

      <p class="pt-6 pb-3 text-[16px] font-normal">Danh mục sản phẩm</p>
      <select v-model="selectedCategories" class="input input--one w-full">
        <option v-for="category in categories" :key="category" :value="category">
          {{ category }}
        </option>
      </select>

      <label class="block mt-5 mb-3 text-[16px]" for="input-price">Giá nhập</label>
      <input class="input input--one w-full" type="number" id="input-price" v-model="inputPrice" placeholder="Nhập giá nhập..." min="0" />

      <label class="block mt-5 mb-3 text-[16px]" for="sale-price">Giá bán</label>
      <input class="input input--one w-full" type="number" id="sale-price" v-model="salePrice" placeholder="Nhập giá bán..." min="0" />

      <div class="flex justify-between mt-9">
        <button class="button button--one">Tạo mới</button>
        <button class="button button--two underline">Quay lại</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { CloseIcon } from '@/assets/icons/icon.js';

const status = ref('open');

const imagePreviews = ref([
  'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
  'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
  'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg'
]);

const brands = ref([
  { value: 'apple', label: 'Apple' },
  { value: 'samsung', label: 'Samsung' },
  { value: 'sony', label: 'Sony' },
  { value: 'lg', label: 'LG' }
]);

const categories = ref(['Electronics', 'Fashion', 'Home Appliances', 'Books', 'Toys']);

function removeImage(index) {
  imagePreviews.value.splice(index, 1);
}

function handleImageUpload(event) {
  const files = event.target.files;
  for (let i = 0; i < files.length; i++) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreviews.value.push(e.target.result);
    };
    reader.readAsDataURL(files[i]);
  }
}
</script>
<style scoped lang="scss">
@import './style.scss';
</style>
