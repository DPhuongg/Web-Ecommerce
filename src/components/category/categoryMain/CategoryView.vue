<template>
  <div class="category bg-[#EFEFEF] p-8">
    <h2 class="text-[25px] font-bold mb-6">Danh mục sản phẩm</h2>
    <div class="flex justify-between mb-10 relative">
      <div class="flex items-center">
        <input
          class="category__input w-[250px] h-[35px] rounded-lg mr-2 p-3"
          placeholder="Giày thể thao.."
          @focus="handleFocus"
          v-model="searchQuery"
          @blur="hideList()"
          @keyup.enter="handleAction"
        />
        <SearchIcon @click="handleAction" class="w-[20px] h-[20px]"></SearchIcon>
      </div>

      <!-- thẻ div if -->

      <div v-if="filteredCategories.length && show" class="category__filter absolute top-[38px] left-0 z-10 bg-[#DCE8EB] overflow-hidden">
        <ul>
          <li
            v-for="category in filteredCategories"
            :key="category.id"
            @click="selectCategory(category)"
            class="w-[245px] h-auto p-3 pl-5 pb-3"
          >
            {{ category.name }}
          </li>
        </ul>
      </div>

      <div class="flex items-center">
        <button @click="handleAddNew" class="flex w-[140px] h-[40px] items-center text-[16px] bg-[#0397D6] text-[#fff] p-4 rounded-md mr-3">
          <span class="mr-2">Thêm mới</span>
          <AddIcon class="w-[20px] h-[20px]"></AddIcon>
        </button>
        <button @click="refreshData" class="flex w-[120px] h-[40px] items-center text-[16px] bg-[#0397D6] text-[#fff] p-4 rounded-md">
          <span class="mr-2">Reresh</span>
          <RefreshIcon class="w-[20px] h-[20px]"></RefreshIcon>
        </button>
      </div>
    </div>
    <TableCategory :input-value="inputValue" :category-id="selectedCategoryId" :refresh="refresh" :input-search="inputSearch"></TableCategory>
  </div>
</template>

<script setup>
import { SearchIcon, AddIcon, RefreshIcon } from '@/assets/icons/icon.js';
import TableCategory from '../tableCategory/TableCategory.vue';
import Swal from 'sweetalert2';
import { ref, computed } from 'vue';
import apiServices from '@/domain/apiServices';
import _ from 'lodash';

const searchQuery = ref('');
const inputValue = ref('');
const categories = ref([]);
const isFetched = ref(false);
const show = ref(false);
const selectedCategoryId = ref(null);
const refresh = ref(false);
const inputSearch = ref('');

const handleAddNew = async () => {
  const { value: text } = await Swal.fire({
    input: 'textarea',
    inputLabel: 'Nhập tên danh mục mới',
    inputPlaceholder: 'Danh mục a...',
    inputAttributes: {
      'aria-label': 'Danh mục a...'
    },
    showCancelButton: true
  });
  if (text) {
    inputValue.value = text;
  }
};

const fetchCategories = async () => {
  const response = await apiServices.getAllCategory();
  categories.value = _.map(response.data.data, (item) => ({
    id: item.id,
    name: item.name
  }));
  isFetched.value = true;
};

const handleFocus = function () {
  show.value = true;
  if (!isFetched.value) {
    fetchCategories();
  }
};

const filteredCategories = computed(() => {
  if (!searchQuery.value) return [];
  return categories.value.filter((category) => category.name.toLowerCase().includes(searchQuery.value.toLowerCase()));
});

const hideList = () => {
  setTimeout(() => {
    show.value = false;
  }, 100);
};

const selectCategory = (category) => {
  selectedCategoryId.value = category.id;
  searchQuery.value = category.name;
  /// đang ở đoạn này
  console.log(selectedCategoryId.value);
  console.log(searchQuery.value);
  show.value = false;
};

const refreshData = () => {
  searchQuery.value = '';
  inputSearch.value = '';
  refresh.value = !refresh.value;
};

const handleAction = () => {
  inputSearch.value = searchQuery.value;
  show.value = false;
};
</script>

<style scoped lang="scss">
.category {
  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;

  &__input:focus {
    outline: none;
    border: 2px solid #435d7d;
  }

  &__filter {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }
}

ul li:hover {
  background-color: #eeeeee;
  cursor: pointer;
}
</style>
