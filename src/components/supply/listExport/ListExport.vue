<template>
  <div class="seller bg-[#EFEFEF] p-9">
    <h1 class="text-[25px] font-bold mb-6">Danh sách xuất kho</h1>

    <div class="mb-8 flex">
      <div class="flex items-center mr-[50px]">
        <input
          class="category__input w-[200px] h-[35px] rounded-lg mr-2 p-3"
          placeholder="Tên..."
          @focus="handleFocus"
          v-model="searchQuery"
          @blur="hideList()"
          @keyup.enter="handleAction"
        />
        <!-- <SearchIcon @click="handleAction" class="w-[20px] h-[20px]"></SearchIcon> -->
      </div>

      <div class="flex items-center">
        <input
          class="category__input w-[200px] h-[35px] rounded-lg mr-2 p-3"
          placeholder="Mã..."
          @focus="handleFocus"
          v-model="searchQuery"
          @blur="hideList()"
          @keyup.enter="handleAction"
        />
        <!-- <SearchIcon @click="handleAction" class="w-[20px] h-[20px]"></SearchIcon> -->
      </div>

      <button class="text-[15px] ml-[80px] text-[#fff] bg-[#69C3A3] p-2 font-medium rounded-lg px-4">Tìm kiếm</button>
    </div>

    <div>
      <a-table :columns="columns" @change="handleTableChange">
        <template #bodyCell="{ column, record }">
          <span v-if="column.key === 'actions'" class="flex">
            <a href="#" @click.prevent="viewSellerDetails(record.id)">
              <EyeIcon class="w-[15px] h-[15px] mr-3"></EyeIcon>
            </a>
            <a-divider type="vertical" />
            <a href="#" @click.prevent="editSeller(record.id)" class="mr-4">
              <EditIcon class="w-[15px] h-[15px]"></EditIcon>
            </a>
            <a-divider type="vertical" />
            <a href="#" @click.prevent="deleteSeller(record.id)">
              <TrashIcon class="w-[15px] h-[15px]"></TrashIcon>
            </a>
          </span>
          <span v-else-if="column.key === 'create_at'">
            {{ format(record[column.dataIndex], 'dd/MM/yyyy HH:mm:ss') }}
          </span>
          <span v-else>
            {{ record[column.dataIndex] }}
          </span>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { SearchIcon, AddIcon, EditIcon, TrashIcon, EyeIcon } from '@/assets/icons/icon.js';
// import { useSellersStore } from '@/stores/accountSellerStore';
import { format } from 'date-fns';
// import router from '@/router/index.js';

// const sellersStore = useSellersStore();

const columns = [
  { title: 'STT', dataIndex: 'stt', key: 'stt' },
  { title: 'Tên sản phẩm', dataIndex: 'name', key: 'name' },
  { title: 'Mã SKU', dataIndex: 'sku_code', key: 'sku_code' },
  { title: 'Ngày tạo', dataIndex: 'create_at', key: 'create_at' },
  { title: 'Số lượng', dataIndex: 'quantity', key: 'quantity' },
  { title: 'Thao tác', key: 'actions' }
];

// const sellerData = computed(() => ({
//   dataSource: sellersStore.sellers,
//   totalElements: sellersStore.totalElements,
//   currentPage: sellersStore.currentPage,
//   pageSize: sellersStore.pageSize
// }));

// const handleTableChange = (pagination) => {
//   sellersStore.updatePagination({
//     currentPage: pagination.current
//   });
// };

// const viewSellerDetails = (id) => {
//   sellersStore.getSellerById(id);
// };

// const deleteWarehouse = (id) => {
//   warehouseStore.deleteWarehouse(id);
// };

// const editWarehouse = (id) => {
//   warehouseStore.detailWarehouse(id);
// };

// const handleAddNew = () => {
//   router.push({ name: 'menu-11' });
// };

onMounted(async () => {
  sellersStore.fetchSellers();
});
</script>

<style scoped lang="scss">
.seller {
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 10px;
  overflow: hidden;
}

.button{

}
</style>
