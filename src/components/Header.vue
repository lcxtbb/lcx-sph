<template>
    <header class="header">
        <div class="top">
            <div class="container">
                <div class="loginList">
                    <p>尚品汇欢迎您！</p>
                    <p v-if="!user.name">
                        <span>请</span>
                        <a @click="loginTap">登录</a>
                        <a @click="registerTap" class="register">免费注册</a>
                    </p>
                    <p v-else>
                        <router-link to="/center">{{ user.userName }}</router-link>
                        <a class="register" @click="logOut">退出</a>
                    </p>
                </div>
                <div class="typeList">
                    <a @click="toOrderInfo">我的订单</a>
                    <a @click="toShopCar">我的购物车</a>
                    <a href="###">我的尚品汇</a>
                    <a href="###">尚品汇会员</a>
                    <a href="###">企业采购</a>
                    <a href="###">关注尚品汇</a>
                    <a href="###">合作招商</a>
                    <a href="###" style="border-right: none;">商家后台</a>
                </div>
            </div>
        </div>
        <div class="bottom">
            <div class="image">
                <a title="尚品汇" @click="router.push({name: 'home'})">
                    <img src="../assets/header/logo.png">
                </a>
            </div>
            <div class="searchArea">
                <form action="###" class="searchForm">
                    <input type="text" id="autocomplete" v-model="searchWord"/>
                    <button type="button" @click="searchTap">搜索</button>
                </form>
            </div>
        </div>
    </header>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useSearchStore } from '../store/useSearchStore';
import { storeToRefs } from 'pinia';
import { useTokenStore } from '../store/useTokenStore';

//从pinia 拿到数据和函数，改变search 的value值
const {clearSearch} = useSearchStore()
const { headerSearch } = storeToRefs(useSearchStore())
const { user } = storeToRefs(useTokenStore())
const { changeToken, changeUser } = useTokenStore()

//获得当前路由实例
const route = useRoute()

//获得 路由实例
const router = useRouter()

//登录 路由跳转
const loginTap = () => {
    router.push('/login')
}

//注册 路由跳转
const registerTap = () => {
    router.push('/register')
}

//搜索 路由跳转
const searchTap = () => {
    //如果没有数据，传undefind，即为不传
    const location = {params: {keyword: searchWord.value || undefined}, name:'search'}

    //如果此时有query参数，一起传去
    route.query ? location.query = route.query : 1

    router.push(location)

    console.log(route.query,route.params)
}

//input 的数据
const searchWord = ref('')

//观察pinia中的数据，如果改变，赋值input框为空
watch(() => headerSearch.value, () => {
    // console.log(1111)
    searchWord.value = ''
    clearSearch('1')
})

//跳转购物车
const toShopCar = () => {
    router.push({name: 'shopcar'})
}

//跳转订单页面
const toOrderInfo = () => {
    router.push({name: 'trade'})
}

//退出登录
const logOut = () => {
    changeToken('')
    changeUser({})
    router.push({name: 'home'})
}

</script>

<style lang="scss">

.header {
    width: 100%;

    .top {
        height: 30px;
        line-height: 30px;
        background-color: #eaeaea;

        .container {
            width: 1200px;
            margin: 0 auto;
            font-size: 12px;
            display: flex;
            justify-content: space-between;

            .loginList {


                display: flex;
                gap: 20px;

                a {
                    padding: 0 5px;
                }

                .register {
                    border-left: 1px solid gray;
                }
            }

            .typeList {
                a {
                    padding: 0 10px;
                    border-right: 1px solid gray;
                }
            }
        }
    }

    .bottom {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .image {

            img {
                width: 175px;
                margin: 25px 45px;
            }
        }

        .searchArea {

            input {
                box-sizing: border-box;
                width: 490px;
                height: 32px;
                padding: 0px 4px;
                border: 2px solid #ea4a36;
            }

            input:focus {
                outline: none;
            }

            button {
                height: 32px;
                width: 68px;
                background-color: #ea4a36;
                border: none;
                color: #fff;
                cursor: pointer;
            }
        }
    }
}
</style>