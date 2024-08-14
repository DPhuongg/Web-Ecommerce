<template>
  <a-table :columns="columns" :data-source="data" row-key="id" :pagination="pagination" @change="handleTableChange">
    <template #bodyCell="{ column, record }">
      <span v-if="column.key === 'action'" class="flex">
        <a href="#" @click.prevent="editCategory(record.id, record.status, record.name)" class="mr-4">
          <EditIcon class="w-[15px] h-[15px]"></EditIcon>
        </a>
        <a-divider type="vertical" />
        <a href="#" @click.prevent="deleteCategory(record.id)">
          <TrashIcon class="w-[15px] h-[15px]"></TrashIcon>
        </a>
      </span>

      <span v-else-if="column.key === 'status'">
        <span v-if="record.status">
          <CheckIcon class="w-[20px] h-[20px]" />
        </span>
        <span v-else>
          <CloseIcon class="w-[20px] h-[20px]" />
        </span>
      </span>

      <span v-else-if="column.key === 'createdAt' || column.key === 'modifiedAt'">
        {{ record[column.dataIndex] }}
      </span>
      <span v-else>
        {{ record[column.dataIndex] }}
      </span>
    </template>
  </a-table>
</template>

<script setup>
import { ref, onMounted, reactive, watch } from 'vue';
import apiServices from '@/domain/apiServices';
import { format } from 'date-fns';
import { TrashIcon, EditIcon, CheckIcon, CloseIcon } from '@/assets/icons/icon.js';
import Swal from 'sweetalert2';
const reverse = ref(false);

const columns = [
  {
    title: 'STT',
    dataIndex: 'stt',
    key: 'stt'
  },
  {
    title: 'Tên danh mục',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status'
  },
  {
    title: 'Ngày tạo',
    dataIndex: 'createdAt',
    key: 'createdAt'
  },
  {
    title: 'Chỉnh sửa lần cuối',
    dataIndex: 'modifiedAt',
    key: 'modifiedAt'
  },
  {
    title: 'Thao tác',
    key: 'action'
  }
];

// Tạo reactive state để lưu dữ liệu bảng
const data = ref([]);
const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0
});

// Hàm để gọi API và lấy dữ liệu
const fetchData = async (page = 1, pageSize = 10) => {
  try {
    const response = await apiServices.getAllCategory();
    let allData = response.data.data.map((item, index) => {
      return {
        stt: index + 1,
        ...item,
        createdAt: format(item.createdAt, 'dd/MM/yyyy'),
        modifiedAt: format(item.modifiedAt, 'dd/MM/yyyy HH:mm:ss')
      };
    });

    if (props.inputSearch !== '') {
      allData = allData.filter((item) => item.name.toLowerCase().includes(props.inputSearch.toLowerCase()));
    }

    pagination.total = allData.length;
    if (reverse.value) {
      data.value = allData.reverse().slice((page - 1) * pageSize, page * pageSize);
    } else {
      data.value = allData.slice((page - 1) * pageSize, page * pageSize);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// Xử lý thay đổi bảng
const handleTableChange = function (paginationInfo) {
  const { current, pageSize } = paginationInfo;
  pagination.current = current;
  fetchData(current, pageSize);
};

const deleteCategory = async (id) => {
  const result = await Swal.fire({
    title: 'Bạn chắc chắn muốn xóa danh mục này?',
    text: 'Bạn sẽ không thể hoàn tác thao tác này!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Xác nhận!'
  });

  if (result.isConfirmed) {
    try {
      await apiServices.deleteCategory(id);
      fetchData(pagination.current, pagination.pageSize);
      await Swal.fire({
        title: 'Deleted!',
        text: 'Your category has been deleted.',
        icon: 'success'
      });
    } catch (error) {
      console.error('Error deleting category:', error);
      await Swal.fire({
        title: 'Error!',
        text: 'There was an error deleting the category.',
        icon: 'error'
      });
    }
  }
};

const editCategory = async (id, status, name) => {
  const { value: formValues } = await Swal.fire({
    title: 'Thay đổi thông tin danh mục',
    html:
      '<input id="swal-input1" class="swal2-input" placeholder="Tên danh mục mới" value="' +
      name +
      '">' +
      `<select id="swal-input2" class="swal2-input">` +
      `<option value="true" ${status === true ? 'selected' : ''}>Active</option>` +
      `<option value="false" ${status === false ? 'selected' : ''}>Inactive</option>` +
      `</select>`,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: 'Xác nhận',
    cancelButtonText: 'Hủy',
    preConfirm: () => {
      return [document.getElementById('swal-input1').value, document.getElementById('swal-input2').value];
    }
  });

  if (formValues) {
    const [categoryName, selectedStatus] = formValues;
    await apiServices.editCategory(id, categoryName, selectedStatus);
    fetchData(pagination.current, pagination.pageSize);
    await Swal.fire({
      title: 'Saved!',
      text: 'Your category has been saved.',
      icon: 'success'
    });
  }
};

const props = defineProps({
  inputValue: String,
  categoryId: {
    type: Number,
    required: false
  },
  refresh: Boolean,
  inputSearch: String
});
const addCategory = async (newValue) => {
  try {
    await apiServices.addCategory(newValue);
    fetchData(pagination.current, pagination.pageSize);
    reverse.value = true;
    await Swal.fire({
      title: 'Thành công!',
      text: 'Sản phẩm của bạn đã được thêm.',
      icon: 'success'
    });
    reverse.value = false;
  } catch (error) {
    console.error('Error deleting category:', error);
    await Swal.fire({
      title: 'Error!',
      text: 'Bạn thử lại sau nhé',
      icon: 'error'
    });
  }
};

const handleCategoryIdChange = async (newId) => {
  try {
    const response = await apiServices.getCategory(newId);
    const item = response.data.data;

    const formattedData = {
      stt: 1,
      ...item,
      createdAt: format(item.createdAt, 'dd/MM/yyyy'),
      modifiedAt: format(item.modifiedAt, 'dd/MM/yyyy HH:mm:ss')
    };
    pagination.total = formattedData.length;
    data.value = [formattedData];
  } catch (error) {
    console.error('Error fetching category:', error);
  }
};

watch(
  () => props.inputValue,
  (newValue) => {
    addCategory(newValue);
  }
);

watch(
  () => props.categoryId,
  (newId) => {
    handleCategoryIdChange(newId);
  }
);

watch(
  () => props.refresh,
  () => {
    fetchData(pagination.current, pagination.pageSize);
  }
);

watch(
  () => props.inputSearch,
  () => {
    fetchData(pagination.current, pagination.pageSize);
  }
);

// Gọi hàm fetchData khi component được mount
onMounted(() => fetchData(pagination.current, pagination.pageSize));
</script>
