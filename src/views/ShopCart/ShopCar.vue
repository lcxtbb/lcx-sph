<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(item, index) in carList" :key="item.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="item.isChecked === 1" @change="updateCheck(item)">
          </li>
          <li class="cart-list-con2">
            <img :src="item.imgUrl">
            <div class="item-msg">{{ item.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ item.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a class="mins" @click="handler('min', -1, item)">-</a>
            <input autocomplete="off" type="text" :value="item.skuNum" minnum="1" class="itxt"
              @change="handler('change', $event.target.value * 1, item)">
            <a class="plus" @click="handler('add', 1, item)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ item.skuNum * item.skuPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteCar(item)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllCheck" @change="allCheck">
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllCheck">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>0</span>件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ carSum }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" @click="toTrade">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { reqChecked, reqDeleteCar, reqShopCarList } from '../../api';
import { useDetailStore } from '../../store/useDetailStore';
import { useRouter } from 'vue-router';

//拿到路由实例
const router = useRouter()

//从pinia中拿到数据和函数
const { addShopCar } = useDetailStore()

//定义购物车列表数组
const carList = ref([])

//获取购物车列表的数据
const getCarData = async () => {
  const res = await reqShopCarList()
  console.log(res)
  if (res.code === 200) {
    //如果res.data[0]为空，则carist为空数组
    carList.value = res.data[0]?.cartInfoList || []
  }
}

//删除购物车商品
const deleteCar = async (item) => {
  const res = await reqDeleteCar(item.skuId)
  if (res.code === 200) {
    getCarData()
  }
}

//购物车总价
const carSum = computed(() => carList.value.reduce((acc, cur) => {
  return acc + cur.skuNum * cur.skuPrice
}, 0))

//判断购物车是否全选
const isAllCheck = computed(() => carList.value.every(item => item.isChecked === 1))

//修改购物车的数量
let handler = async (val, num, item) => {
  // console.log(num,item.id,item.skuNum)
  let disNum
  switch (val) {
    case "add":
      disNum = num
      break;

    case "min":
      disNum = item.skuNum > 1 ? num : 0
      break;

    case "change":
      //如果 不是数字，小于1，不是整数
      if (typeof num !== 'number' || num < 1 || !Number.isInteger(num)) {
        disNum = 0
      } else {
        disNum = num - item.skuNum
      }
      break;
  }

  try {
    await addShopCar(item.skuId, disNum)
    getCarData()
  } catch (err) {
    console.log(err)
  }
}
// 节流函数，开始触发
function throt(func, wait) {
  let con, args
  let perviows = 0
  return function () {
    con = this, args = arguments
    let now = +new Date()
    if (now - perviows > wait) {
      func.apply(con, args)
      perviows = now
    }
  }
}
// handler = throt(handler, 1000)

//修改购物车商品选中状态
const updateCheck = async (val) => {
  let id = val.skuId, num = val.isChecked === 1 ? 0 : 1
  let res = await reqChecked(id, num)
  if (res.code === 200) {
    getCarData()
  }
  // console.log(id,num)
}

//删除全部勾选物品
const deleteAllCheck = async () => {
  //获取选中的商品的所有skuid
  let promises = carList.value.filter(item => item.isChecked === 1).map(item => reqDeleteCar(item.skuId))
  await Promise.all(promises)
  getCarData()
}

//全选购物车商品
const allCheck = async () => {
  //num 为传给服务器的值，若商品全选num为0，发送服务器改为不选，若不全选num则为1。numNo与num相反，为了过滤出选择或者不选的对象
  let num = isAllCheck.value ? 0 : 1, numNo = num === 1 ? 0 : 1
  let promises = carList.value.filter(item => item.isChecked === numNo).map(item => reqChecked(item.skuId,num))
  await Promise.all(promises)
  getCarData()

}

//跳转到结算页面
const toTrade = () => {
  router.push({name: 'trade'})
}

//生命周期
onMounted(() => {
  getCarData()
  // console.log(carList.value)
})
</script>

<style lang="scss" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      &>div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;

      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        &>li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;
    margin-bottom: 10px;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>