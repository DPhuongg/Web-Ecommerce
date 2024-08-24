<template>
  <div>
    <a-button type="primary" @click="showModal">+ Thêm mới</a-button>
    <a-modal v-model:visible="visible" title="Basic Modal" @ok="handleOk">

       <p>Mã sản phẩm</p>
      <a-input v-model:value="formData.sku_code" placeholder="Basic usage" />

        <div v-for="(item, index) in attributeProductStore.attributes" :key="index">
        <p class="pt-6 pb-3 text-[16px] font-normal">{{ item.name }}</p>
        <a-select
            v-model:value="tempAttributeValues[index]"
            show-search
            placeholder="Chọn nhãn hiệu"
            style="width: 100%"
            :options="attributeValues[index]"
            :filter-option="(input, option) => option.label.toLowerCase().includes(input.toLowerCase())"
            @change="handleLoadAttributeValue"
            @click="fetchAttributeValue(item.id)"
        ></a-select>
        </div>
      <p style="margin-top: 10px;">Giá bán</p>
      <a-input v-model:value="formData.price" placeholder="Basic usage" />
      <p style="margin-top: 10px;">Giá nhập</p>
      <a-input v-model:value="formData.import_price" placeholder="Basic usage" />
    </a-modal>
  </div>
</template>
<script setup>
import { onMounted, reactive,ref, watch, defineProps, defineComponent } from 'vue';
import { useAttributeProductStore } from '@/stores/attributeProductStore';// Đảm bảo rằng bạn đã nhập store đúng cách
import {useAttributeValuesStore} from '@/stores/attributeValuesStore';

const props = defineProps({
  idProduct: {
    type: Object,
    default: () => ({})
  }
});

const attributeProductStore =  useAttributeProductStore();
const attributeValuesStore = useAttributeValuesStore();
const productData = ref({ dataSource: [] });
const attributeValues = ref([])
const tempAttributeValues = ref([])
// const tempValues = ref
const formData = reactive({
    price:0,
    sku_code:'',
    product_id:props.idProduct,
    import_price:0,
    list_product_item:[],
})


const fetchAttribute = async () => {
//   await store.fetchProducts('', props.option);
//   productData.value.dataSource = store.products;
};

const handleLoadAttributeValue = async () => {
    console.log("aaaaaaaaaaaaaaaaaaaattributeValues", tempAttributeValues)
}

const fetchAttributeValue = async (id) => {
    await attributeValuesStore.fetchAttributeValues(id)
    attributeValues.value.push(attributeValuesStore.attributeValues);
    console.log("attributeValues.value", attributeValues.value)
}
 
// Sử dụng `watch` để theo dõi sự thay đổi của `props.idProduct`
watch(() => props.idProduct, fetchAttribute, { immediate: true });

const visible = ref(false);

const showModal = () => {
  visible.value = true;
};

const handleOk = (e) => {
  tempAttributeValues.value.forEach(value => {
  formData.list_product_item.push({"attribute_value_id":value})
  console.log("formmmmmmmmmmmmmmmm data", formData);
});
};


onMounted(async () => {
  await attributeProductStore.fetchAttributeProduct(props.idProduct);
  console.log("culi chạy việc vặt",props.idProduct, attributeProductStore.attributes)
});
</script>
