<template>
  <div class="home">
    <Slider></Slider>

    <div class="home__box">
      <div class="container">
        <div class="home__inner">
          <div class="home__left">
            <a-button type="primary" style="margin-bottom: 16px" @click="toggleMenu" class="home__fillter">
              <MenuUnfoldOutlined v-if="!state.menuVisible" />
              <MenuFoldOutlined v-else />
              Bộ lọc
            </a-button>
            <span class="home__title">Tất cả sản phẩm</span>
          </div>
          <div class="home-right">
            <span class="home__label">Sắp xếp theo</span>
            <select v-model="selectedOption" id="example-select" style="width: 200px" class="home__select">
              <option value="default">Mặc định</option>
              <option value="asc">Giá tăng dần</option>
              <option value="desc">Giá giảm dần</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <div class="home__boxTwo">
      <div class="container">
        <div class="home__innerTwo">
          <div style="width: 256px" v-if="state.menuVisible">
            <a-menu
              class="home__item"
              v-model:openKeys="state.openKeys"
              v-model:selectedKeys="state.selectedKeys"
              mode="inline"
              theme="dark"
              :inline-collapsed="state.collapsed"
              :items="items"
              @click="handleClick"
            ></a-menu>
          </div>

          <div class="home__items">
            <ListProduct></ListProduct>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Slider from '@/components/slider/TheSlider.vue';
import ListProduct from '@/components/listProduct/ListProduct.vue';
import { ref } from 'vue';

import { reactive, watch, h } from 'vue';
import { FontSizeOutlined, TrademarkOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue';
const state = reactive({
  menuVisible: false,
  collapsed: false,
  selectedKeys: [0],
  openKeys: ['sub1'],
  preOpenKeys: ['sub1']
});
const items = reactive([
  {
    key: 'sub1',
    icon: () => h(FontSizeOutlined),
    label: 'Thương Hiệu',
    title: 'Thương Hiệu',
    children: [
      {
        key: '1',
        label: 'Nike',
        title: 'Nike'
      },
      {
        key: '2',
        label: 'Puma',
        title: 'Puma'
      },
      {
        key: '3',
        label: 'Adidas',
        title: 'Adidas'
      },
      {
        key: '4',
        label: 'Converse',
        title: 'Converse'
      }
    ]
  },
  {
    key: 'sub2',
    icon: () => h(TrademarkOutlined),
    label: 'Size',
    title: 'Size',
    children: [
      {
        key: '5',
        label: '36',
        title: '36'
      },
      {
        key: '6',
        label: '37',
        title: '37'
      },
      {
        key: '7',
        label: '38',
        title: '38'
      },
      {
        key: '8',
        label: '39',
        title: '39'
      },
      {
        key: '9',
        label: '40',
        title: '40'
      },
      {
        key: '10',
        label: '41',
        title: '41'
      }
    ]
  }
]);
watch(
  () => state.openKeys,
  (_val, oldVal) => {
    state.preOpenKeys = oldVal;
  }
);

const toggleMenu = function () {
  state.menuVisible = !state.menuVisible;
  if (!state.menuVisible) {
    state.preOpenKeys = state.openKeys;
    state.openKeys = [];
  } else {
    state.openKeys = state.preOpenKeys;
  }
};

const handleClick = function (e) {
  const selectedKey = e.key;
  const selectedIndex = state.selectedKeys.indexOf(selectedKey);
  if (selectedIndex > -1) {
    state.selectedKeys.splice(selectedIndex, 1);
  } else {
    state.selectedKeys.push(selectedKey);
  }
};

const selectedOption = ref('default');
</script>

<style scoped lang="scss">
@import './homeUser.scss';
</style>
