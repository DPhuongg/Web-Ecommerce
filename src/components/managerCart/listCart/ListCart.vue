<template>
  <div class="container">
    <div class="p-8 flex items-center">
      <!-- <img src="@/assets/images/cart_2.png" class="w-[140px] h-[70px] object-cover mr-2"> -->
      <h2 class="text-[26px] font-semibold m-0">Giỏ Hàng Của Bạn</h2>
    </div>
  </div>

  <div class="bg-[#EFEFEF]">
    <div class="container bg-[#fff]">
      <a-table :columns="columns" :data-source="cartItems" row-key="id">
        <template v-slot:bodyCell="{ column, record }">
          <template v-if="column.key === 'checkbox'">
            <a-checkbox class="w-[25px] h-[25px] mr-3" v-model:checked="record.selected" @change="handleCheckboxChange(record.id, $event)" />
          </template>

          <template v-else-if="column.key === 'attributes'">
            <div>
              <div v-for="(attribute) in record.productDetails.list_product_item" :key="attribute.id">
               <span class="text-[#8A8A8A] uppercase"> {{ attribute.value }}</span>
              </div>
            </div>
          </template>

          <template v-if="column.key === 'shop_name'">
            <div class="flex flex-col">
              {{ record.shopDetails.name }}
              <a href="#" @click="applyDiscountCode(record.shopDetails.id)" class="text-[13px] text-[#FB884B] underline mt-2">Mã giảm giá</a>
            </div>
          </template>

          <template v-else-if="column.key === 'image'">
            <img :src="record.productDetails.image" alt="Product Image" class="w-[60px] h-[60px] object-cover rounded-md p-1" />
          </template>

          <template v-else-if="column.key === 'actions'">
            <a href="#" @click.prevent="deleteCart(record.id)">
              <TrashIcon class="w-[15px] h-[15px]"></TrashIcon>
            </a>
          </template>

          <template v-else-if="column.key === 'quantity'">
            <div class="quantity-controls">
              <button @click="decreaseQuantity(record.id)" class="text-[20px]">-</button>
              <input v-model.number="record.quantity" min="1" style="width: 60px; text-align: center" class="outline-none" />
              <button @click="increaseQuantity(record.id)" class="text-[20px]">+</button>
            </div>
          </template>

          <template v-else>
            {{ record[column.dataIndex] }}
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useCartStore } from '@/stores/cartStore';
import { TrashIcon } from '@/assets/icons/icon.js';

const cartStore = useCartStore();
const cartItems = ref([]);

onMounted(async () => {
  await cartStore.fetchCartItems();
  cartItems.value = cartStore.cartItems;
});

const removeItem = cartStore.removeItem;

const decreaseQuantity = (id) => {
  const item = cartItems.value.find((i) => i.id === id);
  if (item && item.quantity > 1) {
    item.quantity -= 1;
  }
};

const increaseQuantity = (id) => {
  const item = cartItems.value.find((i) => i.id === id);
  if (item) {
    item.quantity += 1;
  }
};

const columns = [
  {
    title: 'Chọn',
    key: 'checkbox',
    dataIndex: 'id'
  },
  {
    title: 'Tên Shop',
    dataIndex: ['shopDetails', 'name'],
    key: 'shop_name',
  },
  {
    title: 'Sản phẩm',
    dataIndex: ['productDetails', 'name'],
    key: 'product_name',
    slots: { customRender: 'name' }
  },

  {
    title: 'Hình ảnh',
    key: 'image',
    dataIndex: ['productDetails', 'image']
  },

  {
    title: 'Phân loại',
    key: 'attributes',
    dataIndex: ['productDetails', 'list_product_item']
  },
  {
    title: 'Số lượng',
    dataIndex: 'quantity',
    key: 'quantity'
  },
  {
    title: 'Giá',
    dataIndex: ['productDetails', 'price'],
    key: 'price',
    slots: { customRender: 'price' }
  },
  {
    title: 'Thao tác',
    key: 'actions',
    scopedSlots: { customRender: 'actions' }
  }
];

const cartTotalPrice = cartStore.cartTotalPrice;
</script>

<style scoped lang="scss">
@import './style.scss';
</style>
