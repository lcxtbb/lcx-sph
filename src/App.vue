<template>
  <Header></Header>
  <router-view></router-view>
  <Footer v-show="$route.meta.isShow"></Footer>
</template>

<script setup>
// import { useRoute } from 'vue-router';
import Footer from './components/Footer.vue';
import Header from './components/Header.vue';
import { onMounted } from 'vue';
import { useMenuStore } from './store/useMenuStore';


//拿到 pinia 的 函数，请求数据
const {getCategoryList, getBanner, getFloor} = useMenuStore()

onMounted(() => {
  // console.log('跟组件')
  getCategoryList()
  getBanner()
  getFloor()
})
</script>

<style>

* {
  margin: 0;
  padding: 0;
}

body {
  width: 100% !important;
  /* overflow: hidden; */
}
</style>