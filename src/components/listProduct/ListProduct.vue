<template>
  <div class="product">
    <div v-if="isLoading"></div>

    <div v-if="error">{{ error }}</div>

    <div v-if="!isLoading && !error" class="grid grid-cols-4 gap-4 p-5">
      <div v-for="product in products" :key="product.id" class="product__item rounded-md overflow-hidden">
        <div class="relative w-full overflow-hidden h-[300px]">
          <img v-bind:src="product.image" alt="Product Image" class="w-full h-full object-cover" />
          <div class="absolute top-0 right-0 p-2 text-[15px] bg-[#FE8383] text-[#ffff] rounded-md font-normal bg-opacity-80">
            -{{ product.rating.rate }} %
          </div>
        </div>
        <div class="p-4">
          <h4 class="text-[18px] font-medium truncate mb-1">{{ product.title }}</h4>
          <p class="text-[21px] font-semibold text-[#EE4D2D]">
            <!-- {{ product.price }} -->
            {{ formatCurrency(product.price) }}
          </p>

          <div class="flex justify-between items-center mt-3 mb-2">
            <ul class="flex">
              <li class="w-[15px] h-[15px]"><StartIcon></StartIcon></li>
              <li class="w-[15px] h-[15px]"><StartIcon></StartIcon></li>
              <li class="w-[15px] h-[15px]"><StartIcon></StartIcon></li>
              <li class="w-[15px] h-[15px]"><StartIcon></StartIcon></li>
              <li class="w-[15px] h-[15px]"><StartIcon></StartIcon></li>
            </ul>
            <p class="italic font-normal">Đã bán {{ product.rating.count }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { productStore } from '@/stores/products';
import { StartIcon } from '@/assets/icons/icon.js';

const store = productStore();
const products = ref([]);
const isLoading = ref(false);
const error = ref(null);

onMounted(async () => {
  isLoading.value = store.isLoading;
  error.value = store.error;
  await store.fetchProducts();
  products.value = store.products;
  // console.log(products);
  isLoading.value = store.isLoading;
  error.value = store.error;
});

const formatCurrency = (value) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
};
</script>

<style scoped lang="scss">
@import './listProduct.scss';
</style>
