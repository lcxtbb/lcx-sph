<template>
  <div class="cart-complete-wrap">
    <div class="cart-complete" v-if="skuInfo">
      <h3><i class="sui-icon icon-pc-right"></i>商品已成功加入购物车！</h3>
      <div class="goods">
        <div class="left-good">
          <div class="left-pic">
            <img :src="skuInfo.skuDefaultImg">
          </div>
          <div class="right-info">
            <p class="title">{{ skuInfo.skuName }}</p>
            <p class="attr">{{ skuInfo?.skuDesc }} 数量：{{ route.params.num }}</p>
          </div>
        </div>
        <div class="right-gocart">
          <a class="sui-btn btn-xlarge" @click="toDetail">查看商品详情</a>
          <a @click="toShopCar">去购物车结算 > </a>
        </div>
      </div>
    </div>
    <div v-else>
      <h1 style="height: 50px; line-height: 50px; text-align: center;">没有数据哦</h1>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useDetailStore } from '../../store/useDetailStore';
import { useRoute, useRouter } from 'vue-router';
import ShopCar from '../ShopCart/ShopCar.vue';

//从pinia拿到数据，用计算属性解构
const { detailData } = useDetailStore()
const skuInfo = computed(() => detailData.skuInfo )

//拿到当前路由，全部路由的实例
const route = useRoute()
const router = useRouter()

//返回购物车详情
const toDetail = () => {
  router.go(-1)
}

//去购物车
const toShopCar = () => {
  router.push({name: 'shopcar'})
}
</script>

<style lang="scss" scoped>
  .cart-complete-wrap {
    background-color: #f4f4f4;

    .cart-complete {
      width: 1200px;
      margin: 0 auto;

      h3 {
        font-weight: 400;
        font-size: 16px;
        color: #6aaf04;
        padding-top: 15px;
        padding-bottom: 15px;
        margin: 0;

        .icon-pc-right {
          background-color: #fff;
          border: 2px solid #6aaf04;
          padding: 3px;
          margin-right: 8px;
          border-radius: 15px;
        }
      }

      .goods {
        overflow: hidden;
        padding: 10px 0;

        .left-good {
          float: left;

          .left-pic {
            border: 1px solid #dfdfdf;
            width: 60px;
            float: left;
            img {
              width: 60px;
              height: 60px;
            }
          }

          .right-info {
            color: #444;
            float: left;
            margin-left: 10px;

            .title {
              width: 100%;
              line-height: 28px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              font-size: 14px;
            }

            .attr {
              color: #aaa;
            }
          }
        }

        .right-gocart {
          float: right;

          a {
            padding: 7px 36px;
            font-size: 15px;
            line-height: 22px;
            color: #333;
            background-color: #eee;
            text-decoration: none;
            box-sizing: border-box;
            border: 1px solid #e1e1e1;
          }

          a:hover {
            background-color: #f7f7f7;
            border: 1px solid #eaeaea;
          }

          a:active {
            background-color: #e1e1e1;
            border: 1px solid #d5d5d5;
          }

          .btn-danger {
            background-color: #e1251b;
            color: #fff;
          }

          .btn-danger:hover {
            background-color: #e1251b;
          }
        }

      }
    }
  }
</style>