<template>
  <div class="grid grid-cols-4 gap-6">
    <div class="db__item bg-[#F0F4F8] p-5 rounded-lg">
      <div class="flex justify-between items-center">
        <span class="text-[18px] font-medium">Sản phẩm</span>
        <div class="p-2 bg-[#E0DCFE] rounded-md">
          <ShopIcon class="w-[20px] h-[20px]"></ShopIcon>
        </div>
      </div>
      <p class="mt-3 text-[28px] font-bold">118</p>
      <button class="mt-2 text-[15px] text-[#7A7A7A]">Chi tiết</button>
    </div>

    <div class="db__item bg-[#F0F4F8] p-5 rounded-lg">
      <div class="flex justify-between items-center">
        <span class="text-[18px] font-medium">Danh mục</span>
        <div class="p-2 bg-[#E0DCFE] rounded-md">
          <ListIcon class="w-[20px] h-[20px]"></ListIcon>
        </div>
      </div>
      <p class="mt-3 text-[28px] font-bold">132</p>
      <button class="mt-2 text-[15px] text-[#7A7A7A]">Chi tiết</button>
    </div>

    <div class="db__item bg-[#F0F4F8] p-5 rounded-lg">
      <div class="flex justify-between items-center">
        <span class="text-[18px] font-medium">Đơn hàng</span>
        <div class="p-2 bg-[#E0DCFE] rounded-md">
          <ReceiptIcon class="w-[20px] h-[20px]"></ReceiptIcon>
        </div>
      </div>
      <p class="mt-3 text-[28px] font-bold">99</p>
      <button class="mt-2 text-[15px] text-[#7A7A7A]">Chi tiết</button>
    </div>
    <div class="db__item bg-[#F0F4F8] p-5 rounded-lg">
      <div class="flex justify-between items-center">
        <span class="text-[18px] font-medium">Nhãn hiệu</span>
        <div class="p-2 bg-[#E0DCFE] rounded-md">
          <CopyrightIcon class="w-[20px] h-[20px]"></CopyrightIcon>
        </div>
      </div>
      <p class="mt-3 text-[28px] font-bold">99</p>
      <button class="mt-2 text-[15px] text-[#7A7A7A]">Chi tiết</button>
    </div>
  </div>
</template>

<script setup>
import { ShopIcon, ListIcon, ReceiptIcon, CopyrightIcon } from '@/assets/icons/icon.js';
</script>
<style scoped lang="scss">
.db {
  border-left: 3px solid ;
  &__item {
    box-shadow:
      rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
      rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  }
}
</style>
