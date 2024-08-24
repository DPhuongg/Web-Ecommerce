<template>
  <div>
    <a-button type="primary" @click="showModal">+ Thêm mới</a-button>
    <a-modal v-model:visible="visible" title="Basic Modal" @ok="handleOk">
       <p>Mã sản phẩm</p>
      <a-input v-model:value="formData.sku_code" placeholder="Basic usage" />
        <div v-for="(item, index) in attributeProductStore.attributes" :key="index">
        <p class="pt-6 pb-3 text-[16px] font-normal">{{ item.name }}</p>
        <a-select
            v-model:value="idValue[index]"
            show-search
            placeholder="Chọn nhãn hiệu"
            style="width: 100%"
            :options="attributeValues[index]"
            :filter-option="(input, option) => option.label.toLowerCase().includes(input.toLowerCase())"
            @change="handleLoadAttributeValue(index)"
            @click="fetchAttributeValue(item.id,index)"
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
import {useProductItemStore} from '@/stores/productItemStore';
import { eventBusProductItem } from '@/utils/eventBusHeader.js'; 
import { useRoute } from 'vue-router';
const idValue = ref([])
const route = useRoute();
const props = defineProps({
  idProduct: {
    type: Object,
    default: () => ({})
  }
});

const productItemStore = useProductItemStore();
const attributeProductStore =  useAttributeProductStore();
const attributeValuesStore = useAttributeValuesStore();
const productData = ref({ dataSource: [] });
const attributeValues = ref([])
const tempAttributeValues = ref([])
const temp =ref()
const productId = ref()
const propsCopy  = ref()
// const tempValues = ref
const formData = reactive({
    price: 0,
    sku_code: '',
    product_id: productId, // Trực tiếp sử dụng `props.idProduct`
    import_price: 0,
    list_product_item: [],
});


const fetchAttribute = async () => {
//   await store.fetchProducts('', props.option);
//   productData.value.dataSource = store.products;
};

const handleLoadAttributeValue = async (index) => {
    console.log("idValue[index]", idValue)
    console.log("idValue[index] 2222 index ", index)
    console.log("idValue[index] 2222", idValue.value)
    tempAttributeValues.value[index] = idValue.value[index]
    console.log("aaaaaaaaaaaaaaaaaaaattributeValues", idValue.value[index])
}

const fetchAttributeValue = async (id,index) => {
    await attributeValuesStore.fetchAttributeValues(id)
    temp.value = attributeValuesStore.attributeValues.map((value) => ({
    value: value.id,
    label: value.value
  }));
    attributeValues.value[index] = temp.value
    console.log("attributeValues.value", attributeValues.value[index])
}
 
// Sử dụng `watch` để theo dõi sự thay đổi của `props.idProduct`
watch(() => props.idProduct, fetchAttribute, { immediate: true });

const visible = ref(false);

const showModal = () => {
  visible.value = true;
};

const handleOk = async (e) => {
    formData.list_product_item  =[]
      visible.value = false;
      console.log("vào tempAttributeValues",tempAttributeValues.value)
      console.log("formmmmmmmmmmmmmmmm data khánh à", formData);
    //   tempAttributeValues.value.forEach(value => {
    //       formData.list_product_item.push({"attribute_value_id":value})
    //      console.log("formmmmmmmmmmmmmmmm data khánh", formData);
    //   }
    //  );
    //  tempAttributeValues.value.forEach((value, index) => {
        // formData.list_product_item.push({"attribute_value_id":value})
//   console.log(`Index: ${index}, Value: ${value}`);
//   });
  for (let index = 0; index < tempAttributeValues.value.length; index++) {
    formData.list_product_item.push({"attribute_value_id":tempAttributeValues.value[index]})
    // console.log(`Element at index ${index}:`, element);
    // Xử lý phần tử element theo nhu cầu của bạn
}
  // Thực hiện các thao tác cần thiết tại đây
      formData.product_id = route.params.id
            console.log("chó phương",tempAttributeValues.value );
      await productItemStore.addProductItem(formData)
      visible.value = false;
};

onMounted(async () => {
  await attributeProductStore.fetchAttributeProduct(route.params.id);
//    formData.product_id = route.params.id
//    productId = route.params.id
  console.log("culi chạy việc vặt", formData.product_id );
});
</script>
