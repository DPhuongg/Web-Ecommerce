<template>
  <div class="flex items-center justify-center">
    <div class="warehouseDetail bg-[#ffff] p-3 flex w-[70%] justify-between">
      <div class="w-[45%] flex justify-center items-center relative overflow-hidden">
        <!-- <video autoplay muted loop class="w-full h-full top-[-10%] left-0 absolute">
          <source src="@/assets/videos/Warehouse.mp4" type="video/mp4" />
        </video> -->
        <img src="@/assets/images/warehouse_1.png" class="w-full h-[400px] object-cover" />
      </div>

      <div class="w-[50%] p-5">
        <h1 class="text-[23px] font-semibold mb-5">Thêm mới kho hàng</h1>
        <form @submit.prevent="handleSubmit">
          <div>
            <label for="name">Tên kho</label>
            <input type="text" v-model="form.name" id="name" required placeholder="Kho A..." />
          </div>
          <div>
            <label for="country">Quốc gia</label>
            <input type="text" v-model="form.country" id="country" required placeholder="Việt Nam..." />
          </div>
          <div>
            <label for="province">Tỉnh / Thành phố</label>
            <input type="text" v-model="form.province" id="province" required placeholder="Hà Nội..." />
          </div>
          <div>
            <label for="district">Huyện</label>
            <input type="text" v-model="form.district" id="district" required placeholder="Hoài Đức..." />
          </div>
          <div>
            <label for="commune">Xã</label>
            <input type="text" v-model="form.commune" id="commune" required placeholder="Abc..." />
          </div>
          <div>
            <label for="address_detail">Địa chỉ chi tiết</label>
            <input type="text" v-model="form.address_detail" id="address_detail" required placeholder="Số nhà, Ngõ, ......" />
          </div>
          <button class=" button text-[17px] font-medium w-[90%] bg-[#69C3A3] text-[#fff] rounded-xl p-1 mt-2" type="submit">Thêm mới</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useWarehouseStore } from '@/stores/warehouseStore';

const warehouseStore = useWarehouseStore();

const form = reactive({
  name: '',
  country: '',
  province: '',
  district: '',
  commune: '',
  address_detail: ''
});

const handleSubmit = () => {
  console.log('Trước khi gửi lên server')
  console.log(form);
  warehouseStore.addWarehouse(form);
}
</script>

<style scoped lang="scss">
@import './style.scss';
</style>
