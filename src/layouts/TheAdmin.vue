<template>
  <div>
    <TheHeader></TheHeader>
    <div class="container">
      <div class="row">
        <div class="col-sm-3">SIDER BAR</div>
        <div class="col-sm-9">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TheHeader from '../components/TheHeader/TheHeader.vue';

export default {
  components: {
    TheHeader
  }
};
</script>
