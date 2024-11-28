<template>
  <div class="swiper-container1">
    <div class="swiper-wrapper" id="swiper-wrapper">
      <!-- <div class="swiper-slide">
        <img src="../images/s1.png">
      </div> -->

      <Swiper :slidesPerView="5" :autoplay="{ delay: 10000, disableOnInteraction: true }" :navigation="false"
        :pagination="false" :modules="modules" @slideChange="onSlideChange">
        <swiper-slide v-for="(item, index) in props.images" :key="index">
          <img :src="item.imgUrl" />
        </swiper-slide>
      </Swiper>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script setup>
import { defineProps, nextTick, watch } from 'vue';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/vue';
import { Autoplay, Navigation, Pagination, Scrollbar } from "swiper/modules";


// Swiper 用到的属性
let modules = [Autoplay, Navigation, Pagination, Scrollbar];

//从父组件传来的数据
const props = defineProps({
  images: {
    typeof: Array
  }
})

const onSlideChange = () => {
  console.log(111)
}

// watch(() => props.images, () => {
//   nextTick(() => {
//     const swiper = useSwiper()
//     console.log(swiper)
//   })
// })
</script>

<style lang="scss" scoped>
.swiper-container1 {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;
  position: relative;

  // .swiper-slide-active img{
  //   // border: 2px solid #f60;
  //   // padding: 1px;
  //   background-color: #f60
  // }


  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      &:hover {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 10px;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;

    &::after {
      font-size: 12px;
    }
  }
}
</style>