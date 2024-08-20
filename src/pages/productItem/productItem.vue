<template>
<div class="product-item">
  <div class="product-item__container">
    <div class="product-item__title">Thông tin chi tiết {{productStore.product.name}} theo mã sản phẩm</div>

   <a-table :columns="columns1" :data-source="productStore.product.attribute_and_value" :pagination="false">
    <!-- <template #headerCell="{ column }">
      <template v-if="column.key === 'name'">
        <span>
          <smile-outlined />
          STT
        </span>
      </template>
    </template> -->

    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'name'">
        <a>
          {{ record.attribute }}
        </a>
      </template>
      <template v-else-if="column.key === 'tags'">
        <span>
          <a-tag
            v-for="tag in record.values"
            :key="tag"
            :color="tag.value === 'loser' ? 'volcano' : tag.value.length > 5 ? 'geekblue' : 'green'"
          >
            {{ tag.value.toUpperCase() }}
          </a-tag>
        </span>
      </template>
      <template v-else-if="column.key === 'action'">
        <span>
          <a-button type="primary" block style="width: 100px; font-size: 12px; margin: 2px;">thêm giá trị</a-button>
          <a-button danger block style="width: 100px; font-size: 12px; margin: 2px;">xoá thuộc tính</a-button>
        </span>
      </template>
    </template>
  </a-table>
    <!-- Kết thúc bảng thuộc tính và giá trị -->
    <div class="product-item__add-attribute-container">
      <a-button @click="handleClick" style="width: 200px; font-size: 12px; " type="primary" block>Thêm thuộc tính</a-button>
    </div>

    <a-table :columns="columns2" :data-source="data2">
    <template #headerCell="{ column }">
      <template v-if="column.key === 'name'">
        <span>
          <smile-outlined />
          STT
        </span>
      </template>
    </template>

    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'name'">
        <a>
          {{ record.key }}
        </a>
      </template>
      <template v-else-if="column.key === 'tags'">
        <span>
          <a-tag
            v-for="tag in record.tags"
            :key="tag"
            :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
          >
            {{ tag.toUpperCase() }}
          </a-tag>
        </span>
      </template>
      <template v-else-if="column.key === 'action'">
        <span class="flex">
            <a-divider type="vertical" />
            <a href="#" @click.prevent="editItem(record.id)" class="mr-4">
            <EditIcon class="w-[15px] h-[15px]" />
            </a>
            <a-divider type="vertical" />
            <a href="#" @click.prevent="deleteItem(record.id)">
            <TrashIcon class="w-[15px] h-[15px]" />
            </a>
        </span>
      </template>
    </template>
  </a-table>

  </div>
</div>



</template>

<script setup>

import { ref, computed, onMounted , reactive} from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { useAttributeProductStore } from '@/stores/attributeProductStore';
import Swal from 'sweetalert2';
import { useRoute } from 'vue-router';
import { SearchIcon, AddIcon, EditIcon, TrashIcon, EyeIcon } from '@/assets/icons/icon.js';
import { useProductStore } from '@/stores/productSellerStore';




const productStore = useProductStore();
const useAttributeProductStore = useAttributeProductStore();

const route = useRoute();
const id = ref(route.params.id);
const attribute = reactive({
  name:'',
  product_id:id,
})

const columns1 = [
  // {
  //   name: 'STT',
  //   dataIndex: 'name',
  //   key: 'name',
  // },
  {
    title: 'Thuộc tính',
    dataIndex: 'address',
    key: 'name',
  },
  {
    title: 'Giá trị',
    key: 'tags',
    dataIndex: 'tags',
  },
  {
    title: 'Action',
    key: 'action',
  },
];


const columns2 = [
  {
    name: 'STT',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Mã sản phẩm',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Tên sản phẩm',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Giá trị',
    key: 'tags',
    dataIndex: 'tags',
  },
  {
    title: 'Action',
    key: 'action',
  },
];
const data1 = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

const data2 = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

const attributeValue = reactive({
  attribute: productStore.product.attribute_and_value
});


const handleClick = async (id) => {
  const { value: text } = await Swal.fire({
    input: 'textarea',
    inputLabel: 'Nhập tên thuộc tính mới',
    inputPlaceholder: 'Thuộc tính a...',
    inputAttributes: {
      'aria-label': 'Thuộc tính a...'
    },
    showCancelButton: true
  });
  
    if (isConfirmed && text) {
    inputValue.value = text;
    attribute.name = text
    useAttributeProductStore.addAttributeProduct(attribute);
  }
};




onMounted(async () => {
  await productStore.fetchProduct(id.value);
  console.log("productStore.product.attribute_and_value ", productStore.product.attribute_and_value)
});

</script>

<style scoped lang="scss">
@import './productItem.scss';
</style>
