<template>
  <div class="listProduct bg-[var(--color-five)] p-8">
    <h2 class="text-[25px] font-bold mb-6">Danh mục kho hàng</h2>

    <div class="mb-8 flex justify-between">
      <div class="flex items-center">
        <input
          class="category__input w-[250px] h-[35px] rounded-lg mr-2 p-3"
          placeholder="Tên sản phẩm..."
          @focus="handleFocus"
          v-model="searchQuery"
          @blur="hideList()"
          @keyup.enter="handleAction"
        />
        <SearchIcon @click="handleAction" class="w-[20px] h-[20px]"></SearchIcon>
      </div>

      <div>
        <button @click="handleAddNew" class="flex w-[140px] h-[40px] items-center text-[16px] bg-[#0397D6] text-[#fff] p-4 rounded-md mr-3">
          <span class="mr-2">Thêm mới</span>
          <AddIcon class="w-[20px] h-[20px]"></AddIcon>
        </button>
      </div>
    </div>

    <div>
      <a-table :columns="columns" :data-source="dataSource" row-key="id" @change="handleTableChange">
        <template #bodyCell="{ column, record }">
          <span v-if="column.key === 'actions'" class="flex">
            <a href="#" @click.prevent="editItem(record.id)" class="mr-4">
              <EditIcon class="w-[15px] h-[15px]"></EditIcon>
            </a>
            <a-divider type="vertical" />
            <a href="#" @click.prevent="deleteItem(record.id)">
              <TrashIcon class="w-[15px] h-[15px]"></TrashIcon>
            </a>
          </span>

          <span v-else-if="column.key === 'createdAt' || column.key === 'modifiedAt'">
            {{ format(record[column.dataIndex], 'dd/MM/yyyy HH:mm:ss') }}
          </span>

          <span v-else-if="column.key === 'image'">
            <img :src="record[column.dataIndex]" alt="Product Image" class="w-[50px] h-[50px] object-cover" />
          </span>

          <span v-else-if="column.key === 'detail'">
            <a href="#" @click.prevent="detailItem(record.id)" class="underline text-[#3884E1]"> Chi tiết </a>
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
import { ref } from 'vue';
import { format } from 'date-fns';
import { SearchIcon, AddIcon, EditIcon, TrashIcon } from '@/assets/icons/icon.js';
import router from '@/router/index.js';

// const dataSource = computed(() => warehouseStore.warehouses);

const columns = ref([
  { title: 'Tên', dataIndex: 'name', key: 'name' },
  { title: 'Ảnh', dataIndex: 'image', key: 'image' },
  { title: 'Nhãn hiệu', dataIndex: 'brand', key: 'brand' },
  { title: 'Danh mục', dataIndex: 'category', key: 'category' },
  { title: 'Ngày tạo', dataIndex: 'createdAt', key: 'createdAt' },
  { title: 'Ngày sửa', dataIndex: 'modifiedAt', key: 'modifiedAt' },
  { title: ' Xem chi tiết', dataIndex: 'detail', key: 'detail' },
  { title: 'Thao tác', key: 'actions' }
]);

const dataSource = ref([
  {
    id: 1,
    name: 'Sản phẩm A',
    image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    brand: 'Nhãn hiệu A',
    category: 'Danh mục A',
    createdAt: '2024-08-01 16:45:52.000',
    modifiedAt: '2024-08-02 16:45:52.000'
  }
]);

const handleTableChange = (pagination, filters, sorter) => {
  console.log('Table changed:', { pagination, filters, sorter });
};

const editItem = (id) => {
  console.log('Edit item with id:', id);
  router.push({ name: 'product-detail', params: { id } });
};

const deleteItem = (id) => {
  console.log('Edit item with id:', id);
};
</script>

<style scoped lang="scss">
@import './style.scss';
</style>
