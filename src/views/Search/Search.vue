<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-if="searchParams.categoryName">{{ searchParams.categoryName }}<i
                @click="removeBreadOne" style="font-size: 12px;">x</i>
            </li>
            <li class="with-x" v-if="searchParams.keyword">{{ searchParams.keyword }}<i @click="removeBreadTwo"
                style="font-size: 12px;">x</i>
            </li>
            <li class="with-x" v-if="searchParams.trademark">{{ searchParams.trademark.split(':')[1] }}<i
                @click="removeBreadThr" style="font-size: 12px;">x</i>
            </li>
            <li class="with-x" v-for="(item, index) in searchParams.props" :key="index">{{ item.split(':')[1] }}<i
                @click="removeBreadFor(index)" style="font-size: 12px;">x</i>
            </li>
          </ul>
        </div>
        <!--selector-->
        <SearchSelector :tmList="searchInfo.trademarkList" :arrList="searchInfo.attrsList" @tradeEvent="tradeEvent"
          @saleEvent="saleEvent" />
        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: has1 }" @click="comSort">
                  <a>综合
                    <span v-show="has1 && hasAsc">⬆</span>
                    <span v-show="has1 && hasDesc">⬇</span>
                  </a>
                </li>
                <li :class="{ active: !has1  }" @click="priceSort">
                  <a>价格
                    <span v-show="!has1 && hasAsc">⬆</span>
                    <span v-show="!has1 && hasDesc">⬇</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="(item, index) in searchInfo.goodsList">
                <div class="list-wrap">
                  <div class="p-img">
                    <a @click="toDetail(item.id)"><img v-lazy="item.defaultImg" /></a>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥ </em>
                      <i> {{ item.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】">
                      {{ item.title }}
                    </a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <Pagination :pageSize="10" :total="searchInfo.total" :continues ="5" @pageEvent="swithPage"/>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import SearchSelector from './SearchSelector/SearchSelector.vue'
import { computed, onBeforeMount, onMounted, reactive, ref, watch } from 'vue';
import TypeNav from '../../components/TypeNav.vue';
import { useMenuStore } from '../../store/useMenuStore';
import { reqSearchInfo } from '../../api';
import { useRoute, useRouter } from 'vue-router';
import { useSearchStore } from '../../store/useSearchStore';
import Pagination from '../../components/Pagination.vue';
import { useDetailStore } from '../../store/useDetailStore';

//定义search组件的数据
let searchInfo = ref({})

//定义带给服务器的参数
const searchParams = reactive({
  "category1Id": "",             //一级分类的id
  "category2Id": "",             //二级分类id
  "category3Id": "",             //三级分类id
  "categoryName": "",            //分类的名字
  "keyword": "",                 //关键字
  "order": "1:desc",             //排序,初始状态为综合降序
  "pageNo": 1,                   //分页器
  "pageSize": 10,                //每一页展示的和数据
  "props": [],                   //平台售卖属性的参数
  "trademark": ""                //品牌
})

//拿到当前路由和路由的实例
const route = useRoute()
const router = useRouter()


//数据请求的函数
const getSearchInfo = async (params) => {
  const res = await reqSearchInfo(params)
  if (res.code === 200) {
    searchInfo.value = res.data
  }
  console.log(searchInfo.value)
}

//监听路径变化从新发送请求
watch(() => route.fullPath, () => {
  //整理传给服务器的数据
  // console.log(route.fullPath)
  searchParams.keyword = ''
  searchParams.category1Id = ''
  searchParams.category2Id = ''
  searchParams.category3Id = ''
  Object.assign(searchParams, route.params, route.query)
  getSearchInfo(searchParams)
})

// 从 pinia 拿到数据，改变菜单状态。改变header组件的input框的val，发送请求获得detail数据
const { changeMenu } = useMenuStore()
const { clearSearch } = useSearchStore()
// const { getDetail } = useDetailStore()

//删除query面包屑
const removeBreadOne = () => {
  //属性为 undefined 则发送请求不会带此字段
  searchParams.categoryName = undefined
  searchParams.category1Id = undefined
  searchParams.category2Id = undefined
  searchParams.category3Id = undefined
  // getSearchInfo(searchParams)
  router.push({ name: 'search', params: route.params })
}

//删除params面包屑
const removeBreadTwo = () => {
  searchParams.keyword = undefined
  router.push({ name: 'search', query: route.query })
  //改变store的值，从而改变header组件的input框的val
  clearSearch('2')
}

//删除trademark面包屑
const removeBreadThr = () => {
  // console.log(111)
  searchParams.trademark = undefined
  getSearchInfo(searchParams)
}

//删除售卖属性面包屑
const removeBreadFor = (index) => {
  searchParams.props.splice(index, 1)
  // console.log(searchParams.props)
  getSearchInfo(searchParams)
}

//子组件传给父组件的品牌事件
const tradeEvent = (data) => {
  console.log(data)
  searchParams.trademark = `${data.tmId}:${data.tmName}`
  getSearchInfo(searchParams)
}

//子组件传给父组件的售卖属性事件
const saleEvent = (id, data) => {
  //整理参数格式
  let props = `${id.attrId}:${data}:${id.attrName}`
  if (searchParams.props.indexOf(props) === -1) {
    searchParams.props.push(props)
  }
  // console.log(searchParams.props)
  getSearchInfo(searchParams)
}

//判断排序的升降和种类
const has1 = computed(() => searchParams.order.includes('1'))
const hasDesc = computed(() => searchParams.order.includes('desc'))
const hasAsc = computed(() => searchParams.order.includes('asc'))

//综合排序
const comSort = () => {
  //三目判断
  searchParams.order = has1.value
    ? hasDesc.value 
      ? '1:asc' 
      : '1:desc'
    : '1:desc';
  // console.log(searchParams.order,hasDesc.value)
  getSearchInfo(searchParams)
}

//价格排序
const priceSort = () => {
  searchParams.order = !has1.value
    ? hasDesc.value
      ?'2:asc'
      :'2:desc'
    :'2:desc'

    getSearchInfo(searchParams)
}

//子组件传给父组件的事件
const swithPage = (val) => {
  // console.log(val)
  searchParams.pageNo = val
  getSearchInfo(searchParams)
}

//跳转商品详情页面
const toDetail = (val) => {
  // console.log(val)
  router.push({name: 'detail', params: {"skuid": val}})
}

//在数据挂载之前，改变传给服务器的参数
onBeforeMount(() => {
  Object.assign(searchParams, route.params, route.query)
})

//生命周期
onMounted(() => {
  //改变菜单状态为不显示
  changeMenu(false)
  //发送数据的请求
  getSearchInfo(searchParams)
})

</script>

<style lang="scss" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>