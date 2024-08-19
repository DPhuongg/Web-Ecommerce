<template>
  <div class="">
    <div class="container">
      <div class="flex items-center pt-8">
        <!-- <img src="@/assets/images/cart_2.png" class="w-[140px] h-[70px] object-cover mr-2"> -->
        <h2 class="text-[26px] font-semibold m-0 text-[#2A7E6F]">Giỏ Hàng Của Bạn</h2>
      </div>
    </div>
  </div>

  <!--  :data-source="cartData.dataSource"-->
  <div class="mt-[30px] mb-[40px]">
    <div class="cart container">
      <a-table
        :columns="columns"
        :data-source="cartData.dataSource"
        row-key="id"
        :pagination="{
          total: cartData.totalElements,
          current: cartData.currentPage,
          pageSize: cartData.pageSize
        }"
        @change="handleTableChange"
      >
        <template v-slot:bodyCell="{ column, record }">
          <template v-if="column.key === 'checkbox'">
            <a-checkbox
              class="w-[25px] h-[25px] mr-3"
              v-model:checked="record.selected"
              @change="handleCheckboxChange(record.id, $event.target.checked)"
            />
          </template>

          <template v-else-if="column.key === 'attributes'">
            <div>
              <div v-for="attribute in record.productDetails.list_product_item" :key="attribute.id">
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

          <template v-else-if="column.key === 'price'">
            {{ formatCurrency(record.productDetails.price * record.quantity) }}
          </template>

          <template v-else-if="column.key === 'actions'">
            <a href="#" @click.prevent="deleteCart(record.id)">
              <TrashIcon class="w-[15px] h-[15px]"></TrashIcon>
            </a>
          </template>

          <template v-else-if="column.key === 'quantity'">
            <div class="quantity-controls">
              <button @click="decreaseQuantity(record)" class="text-[20px]">-</button>
              <input v-model.number="record.quantity" min="1" style="width: 60px; text-align: center" class="outline-none" />
              <button @click="increaseQuantity(record)" class="text-[20px]">+</button>
            </div>
          </template>

          <template v-else>
            {{ record[column.dataIndex] }}
          </template>
        </template>
      </a-table>
    </div>
  </div>

  <div class="cart__payment fixed left-0 bottom-0 w-full bg-[#EEEEEE]">
    <div class="container z-30 flex justify-end pt-[25px] pb-[25px] items-center">
      <span class="text-[22px] font-medium mr-4">Tổng thanh toán</span>
      <span class="text-[25px] text-[#F45449] font-medium mr-[40px]">{{ cartData.total }}</span>
      <button class="text-[#fff] bg-[#2A7E6F] p-3 pl-5 pr-5 rounded-lg">Thanh toán</button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useCartStore } from '@/stores/cartStore';
import { TrashIcon } from '@/assets/icons/icon.js';

const cartStore = useCartStore();

const columns = [
  {
    title: 'Chọn',
    key: 'checkbox',
    dataIndex: 'id'
  },
  {
    title: 'Tên Shop',
    dataIndex: ['shopDetails', 'name'],
    key: 'shop_name'
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
    key: 'price'
  },
  {
    title: 'Thao tác',
    key: 'actions',
    scopedSlots: { customRender: 'actions' }
  }
];

const formatCurrency = (value) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
};

const cartData = computed(() => ({
  dataSource: cartStore.cartItems,
  totalElements: cartStore.totalElements,
  currentPage: cartStore.currentPage,
  pageSize: cartStore.pageSize,
  total: formatCurrency(cartStore.totalPrice)
}));

const handleTableChange = (pagination) => {
  cartStore.updatePagination({
    currentPage: pagination.current
  });
};

const handleCheckboxChange = (id, checked) => {
  console.log(checked);
  const item = cartStore.cartItems.find((item) => item.id === id);

  if (item) {
    const itemTotalPrice = item.quantity * item.productDetails.price;

    if (checked) {
      cartStore.totalPrice += itemTotalPrice;
    } else {
      cartStore.totalPrice -= itemTotalPrice;
      if (cartStore.totalPrice < 0) {
        cartStore.totalPrice = 0;
      }
    }
  }
};

const removeItem = cartStore.removeItem;

const decreaseQuantity = (record) => {
  const item = cartStore.cartItems.find((i) => i.id === record.id);
  if (item && item.quantity > 1) {
    const previousTotalPrice = item.quantity * item.productDetails.price;
    item.quantity -= 1;
    const newTotalPrice = item.quantity * item.productDetails.price;

    if (item.selected) {
      cartStore.totalPrice -= previousTotalPrice - newTotalPrice;
    }
  }
};

const increaseQuantity = (record) => {
  const item = cartStore.cartItems.find((i) => i.id === record.id);
  if (item) {
    const previousTotalPrice = item.quantity * item.productDetails.price;
    item.quantity += 1;
    const newTotalPrice = item.quantity * item.productDetails.price;

    if (item.selected) {
      cartStore.totalPrice += newTotalPrice - previousTotalPrice;
    }
  }
};

const cartTotalPrice = cartStore.cartTotalPrice;

onMounted(async () => {
  await cartStore.fetchCartItems();
  cartItems.value = cartStore.cartItems;
});
</script>

<style scoped lang="scss">
@import './style.scss';
</style>
