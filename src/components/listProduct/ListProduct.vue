<template>
  <div class="product">
    <div class="grid grid-cols-5 gap-5 p-5">
      <div v-for="product in productData.dataSource" :key="product.id" class="product__item rounded-md overflow-hidden">
        <div class="relative w-full overflow-hidden aspect-square">
          <img v-bind:src="product.images[0]" alt="Product Image" class="w-full h-full object-cover" />
          <div class="absolute top-0 right-0 p-2 text-[13px] bg-[#FE8383] text-[#ffff] rounded-md font-normal bg-opacity-80">
            -{{ product.average_rate }}%
          </div>
        </div>
        <div class="p-4">
          <h4 class="text-[16px] font-medium truncate mb-1">{{ product.description }}</h4>
          <p class="text-[18px] font-semibold text-[#EE4D2D]">
            <!-- {{ product.price }} -->
            {{ formatCurrency(product.min_price) }}
          </p>

          <div class="flex justify-between items-center mt-3 mb-2">
            <a-rate class="custom-rate w-[47%] flex" :value="product.average_rate" :disabled="true" />
            <p class="italic font-normal w-[45%] text-[13px]">Đã bán {{ product.total_sold }}</p>
          </div>
        </div>
      </div>
    </div>

    <a-pagination v-model:current="current" simple :total="50" class="mb-[30px] mt-[20px]" />
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { productStore } from '@/stores/products';
import { StartIcon } from '@/assets/icons/icon.js';

const store = productStore();

const productData = computed(() => ({
  dataSource: store.products,
  totalElements: store.totalElements,
  currentPage: store.currentPage,
  pageSize: store.pageSize
}));

const formatCurrency = (value) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
};

onMounted(async () => {
  store.fetchProducts();
});
</script>

<style scoped lang="scss">
@import './listProduct.scss';
</style>
