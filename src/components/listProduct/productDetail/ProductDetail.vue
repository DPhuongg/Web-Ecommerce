<template>
  <div v-if="productData.dataSource" class="bg-[#EFEFEF]">
    <div class="pt-14 pb-14">
      <div class="container bg-[#fff] p-12 rounded-md">
        <div class="flex justify-between">
          <div class="w-[45%]">
            <div v-if="productData?.dataSource?.images?.length > 0" class="border border-[#D6D6D6] rounded-lg overflow-hidden mb-6">
              <img :src="productData.dataSource.images[pos]" alt="Ảnh đại diện" class="w-full h-auto object-cover rounded-md aspect-square" />
            </div>
            <div class="flex">
              <img
                v-for="(image, index) in productData.dataSource.images"
                :key="index"
                :src="image"
                alt="Ảnh nhỏ"
                class="aspect-square w-16 h-16 object-cover cursor-pointer border border-gray-300 rounded-md hover:border-blue-500 mr-1"
                @click="selectImage(index)"
              />
            </div>
          </div>

          <div class="w-[50%]">
            <p class="text-[25px] font-medium">{{ productData.dataSource.description }}</p>
            <div class="mt-3 flex justify-between">
              <div class="flex items-center">
                <span class="underline text-[#FEC700] text-[18px] mr-1">{{ productData.dataSource.average_rate }}</span>
                <ul class="flex items-center">
                  <StartIcon class="w-[20px] h-[20px]"></StartIcon>
                  <StartIcon class="w-[20px] h-[20px]"></StartIcon>
                  <StartIcon class="w-[20px] h-[20px]"></StartIcon>
                  <StartIcon class="w-[20px] h-[20px]"></StartIcon>
                  <StartIcon class="w-[20px] h-[20px]"></StartIcon>
                </ul>
              </div>

              <div>
                <span class="text-[17px] mr-2">{{ formatNumber(productData.dataSource.total_sold) }}</span>
                <span class="text-[16px] text-[#8A8A8A] italic">Đánh giá</span>
              </div>

              <div>
                <span class="text-[17px] mr-2"> {{ formatNumber(productData.dataSource.quantity_rate) }}</span>
                <span class="text-[16px] text-[#8A8A8A] italic">Đã bán</span>
              </div>
            </div>

            <p class="mt-6 text-[28px] text-[#F45449] font-medium">{{ formatCurrency(productData.price) }}</p>

            <div class="mt-3">
              <div v-for="(item, index) in productData.dataSource.attribute_and_value" :key="index">
                <h3 class="text-[16px] font-medium">{{ item.attribute }}</h3>
                <ul class="flex flex-wrap mt-3 mb-3">
                  <li v-for="value in item.values" :key="value.id">
                    <button
                      class="w-auto mr-5 text-[16px] text-[#868686] border border-[#D2D2D2] p-2 pl-3 pr-3 rounded-lg hover:border-[#F45449]"
                      :class="{
                        selected: isSelected(value.id, item.attribute),
                        'text-[#0397D6] font-medium border border-[#EE4D2D]': isSelected(value.id, item.attribute)
                      }"
                      @click="selectValue(value, item.attribute)"
                    >
                      {{ value.value }}
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            <div class="flex items-center mt-10">
              <span class="text-[16px] mr-3 font-semibold">Số lượng</span>
              <button class="border border-[#D2D2D2] pl-2 pr-2 text-[18px]" @click="decreaseQuantity" :disabled="quantity <= 1">-</button>
              <input
                v-model.number="currentQuantity"
                type="number"
                @blur="validateInput"
                min="1"
                :max="productData.quantity"
                class="w-[40px] text-center outline-none border border-[#D2D2D2] text-[18px]"
              />
              <button
                class="border border-[#D2D2D2] pl-2 pr-2 text-[18px] mr-3"
                @click="increaseQuantity"
                :disabled="currentQuantity >= productData.quantity"
              >
                +
              </button>
              <p class="text-[16px]">{{ productData.quantity }} sản phẩm sẵn có</p>
            </div>

            <div class="mt-10">
              <button class="bg-[#63B899] text-[#fff] p-3 pl-4 pr-4 rounded-lg text-[16px] font-medium mr-10" @click="handleAction">
                Thêm mới giỏ hàng
              </button>

              <a-button class="h-[48px] bg-[#63B899] text-[#fff] p-3 pl-4 pr-4 rounded-lg text-[16px] font-medium" type="primary" @click="showModal"
                >Đánh giá</a-button
              >
              <a-modal v-model:visible="isModalVisible" title="Cập nhật đánh giá" @ok="handleOk" @cancel="handleCancel">
                <a-form>
                  <a-form-item label="Rate">
                    <a-rate v-model:value="form.rate" />
                  </a-form-item>
                  <a-form-item label="Comment">
                    <a-textarea v-model:value="form.comment" rows="4" />
                  </a-form-item>
                </a-form>
              </a-modal>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="pt-1 pb-14">
      <div class="container bg-[#fff] p-12 rounded-md">
        <h3 class="text-[20px] font-medium mb-3">ĐÁNH GIÁ SẢN PHẨM</h3>
        <div class="mb-5">
          <span class="text-[30px] font-semibold text-[#EE4D2D] mr-4">{{ productData.aveStart }}</span>
          <span class="text-[20px] text-[#EE4D2D] font-medium">trên 5</span>
          <ul class="flex">
            <li class="w-[25px] h-[25px]"><StartIcon></StartIcon></li>
            <li class="w-[25px] h-[25px]"><StartIcon></StartIcon></li>
            <li class="w-[25px] h-[25px]"><StartIcon></StartIcon></li>
            <li class="w-[25px] h-[25px]"><StartIcon></StartIcon></li>
            <li class="w-[25px] h-[25px]"><StartIcon></StartIcon></li>
          </ul>
        </div>

        <div>
          <div v-if="productData.comments.length">
            <div v-for="comment in productData.comments" :key="comment.id" class="comment p-3">
              <div class="flex items-center">
                <img src="@/assets/images/user_2.png" class="w-[25px] h-[25px]" />
                <p class="ml-2 text-[16px]">{{ comment.fullName }}</p>
              </div>
              <p class="mt-2 text-[13px] text-[#7A7A7A]">{{ format(new Date(comment.createdAt), 'dd/MM/yyyy HH:mm:ss') }}</p>
              <a-rate :value="comment.rateStars" allow-half disabled />
              <p class="text-[#7A7A7A] mt-3 text-[15px] mb-3">{{ comment.content }}</p>
              <hr />
            </div>
          </div>

          <div v-else>
            <p>No comments available.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed, ref, watch, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { useProductDetailStore } from '@/stores/productDetailStore';
import { productStore } from '@/stores/products';
import { StartIcon } from '@/assets/icons/icon.js';
import Swal from 'sweetalert2';
import apiServices from '@/domain/apiServices';
import { format } from 'date-fns';

const route = useRoute();
const id = route.params.id;
const productDetail = useProductDetailStore();
const store = productStore();
const currentQuantity = ref(1);

const productData = computed(() => ({
  dataSource: productDetail.product,
  price: productDetail.price,
  quantity: productDetail.quantity,
  itemId: productDetail.itemId,
  aveStart: productDetail.aveStart,
  comments: productDetail.comments
}));

function formatNumber(number) {
  if (number >= 1000 && number < 1000000) {
    return (number / 1000).toFixed(1).replace('.0', '') + 'k';
  } else if (number >= 1000000) {
    return (number / 1000000).toFixed(1).replace('.0', '') + 'M';
  } else {
    return number;
  }
}

const formatCurrency = (value) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
};

const selectedValues = ref({});

// Hàm kiểm tra xem giá trị có được chọn không
const isSelected = (valueId, attribute) => {
  return selectedValues.value[attribute] === valueId;
};

const allAttributesSelected = () => {
  const attributes = productData.value.dataSource.attribute_and_value.map((item) => item.attribute);
  return attributes.every((attribute) => selectedValues.value[attribute] !== undefined);
};

// chọn hoặc bỏ chọn giá trị
const selectValue = (value, attribute) => {
  if (selectedValues.value[attribute] === value.id) {
    delete selectedValues.value[attribute];
  } else {
    selectedValues.value[attribute] = value.id;
  }

  // console.log('Selected Values:', selectedValues.value);

  if (allAttributesSelected()) {
    const attributeOrder = productData.value.dataSource.attribute_and_value.map((item) => item.attribute);
    const orderedValues = attributeOrder.map((attribute) => selectedValues.value[attribute]);
    const validValues = orderedValues.filter((value) => value !== undefined && value !== null);

    const valuesIds = validValues.join(',');

    productDetail.fetchProductItem(id, valuesIds);
  } else {
    productDetail.setQuantity();
  }
};

const handleAction = async () => {
  if (allAttributesSelected()) {
    const res = await apiServices.addCart(productData.value.itemId, currentQuantity.value);
    if (res.data.code === 200) {
      Swal.fire({
        title: 'Thành công!',
        text: 'Sản phẩm đã được thêm vào giỏ hàng',
        icon: 'success'
      });
      selectedValues.value = {};
      currentQuantity.value = 1;
      await store.fetchCart();
      await productDetail.fetchProducts(id);
    }
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Bạn vui lòng chọn tất cả thuộc tính!'
    });
  }
};

// Đảm bảo currentQuantity không vượt quá quantity có sẵn
watch(
  () => productData.value.quantity,
  (newQuantity) => {
    if (currentQuantity.value > newQuantity) {
      currentQuantity.value = newQuantity;
    }
  }
);

function increaseQuantity() {
  if (currentQuantity.value < productData.value.quantity) {
    currentQuantity.value++;
  }
}

function decreaseQuantity() {
  if (currentQuantity.value > 1) {
    currentQuantity.value--;
  }
}

function validateInput(event) {
  const input = event.target;
  let value = Number(input.value);
  if (value < 1) {
    value = 1;
  }

  if (value > productData.value.quantity) {
    value = productData.value.quantity;
  }
  currentQuantity.value = value;
}

const pos = ref(0);
// Hàm xử lý khi chọn ảnh
const selectImage = (index) => {
  pos.value = index;
};

const form = reactive({
  rate: 0,
  comment: ''
});

const isModalVisible = ref(false);

const showModal = async () => {
  const res = await apiServices.checkPurchase(id);
  if (res.data.code === 200) {
    isModalVisible.value = true;
    const res2 = await apiServices.getCommentById(id);
    if (res2.data.code === 200) {
      form.rate = res2.data.data[0].rateStars;
      form.comment = res2.data.data[0].content;
    } else if (res2.data.code === 500) {
      form.rate = 0;
      form.comment = '';
    }
  } else if (res.data.code === 500) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Sản phẩm chưa có trong lịch sử mua hàng của bạn!'
    });
  }
};

const handleOk = async () => {
  Swal.fire({
    title: 'Loading...',
    text: 'Vui lòng chờ...',
    icon: 'info',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });
  isModalVisible.value = false;
  const res2 = await apiServices.getCommentById(id);
  console.log(res2);
  let res
  if (res2.data.code === 200) {
    res = await apiServices.updateComment(id, form.comment, form.rate);
    console.log(res);
  } else if (res2.data.code === 500) {
    res = await apiServices.addComment(id, form.comment, form.rate);
  }
  Swal.close();
  if (res.data.code === 200) {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Đánh giá thành công!',
      showConfirmButton: false,
      timer: 1500
    });
    await productDetail.fetchAveStart(id);
    await productDetail.fetchComments(id);
  }
};

const handleCancel = () => {
  isModalVisible.value = false;
};

onMounted(async () => {
  await productDetail.fetchProducts(id);
  await productDetail.fetchAveStart(id);
  await productDetail.fetchComments(id);
});
</script>
