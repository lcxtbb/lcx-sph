<template>
  <div class="spec-preview">
    <template v-if="props.images">
      <img :src="props.images.skuDefaultImg" />
    </template>
    <div class="event" @mousemove="handler($event)"></div>
    <div class="big">
      <template v-if="props.images">
        <img :src="props.images.skuDefaultImg" ref="big"/>
      </template>
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script setup>
import { defineProps, ref, watch } from 'vue';

//从父组件传来的数据
const props = defineProps({
  images: {
    typeof: Object
  }
})
//拿到元素的实例
let mask = ref(null)
let big = ref(null)
// console.log(mask.value.clienttWidth)

// watch(() => props.images, () => {
//   console.log(props.images)
// })

//放大镜鼠标移动操作
const handler = (evt) => {
  //左边的距离
  let left = evt.offsetX - mask.value.clientWidth / 2
  //右边的距离
  let top = evt.offsetY - mask.value.clientHeight / 2

  left = left <= 0
    ? mask.offsetWidth / 2 : left > mask.value.clientWidth
      ? mask.value.clientWidth : left

  top = top <= 0
    ? mask.offsetHeight / 2 : top > mask.value.clientHeight
      ? mask.value.clientHeight : top

  mask.value.style.left = left + 'px'
  mask.value.style.top = top + 'px'
  big.value.style.left = -2 * left + 'px'
  big.value.style.top = -2 * top + 'px'
  // big.value.style.left =  -2 * mask.value.style.left + 'px'
  
}
</script>

<style lang="scss" scoped>
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover~.mask,
  .event:hover~.big {
    display: block;
  }
}
</style>