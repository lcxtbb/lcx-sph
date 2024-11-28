<template>
    <TypeNav/>
    <ListContainer/>
    <Recommend/>
    <Rank/>
    <Like/>
    <Floor v-for="(item, index) in floorList" :key="item.id" :list="item"/>
    <Brand/>
</template>

<script setup>
import ListContainer from './LIstContainer/ListContainer.vue';
import Recommend from './Recommend/Recommend.vue';
import TypeNav from '../../components/TypeNav.vue';
import Rank from './Rank/Rank.vue';
import Like from './Like/Like.vue';
import Floor from './Floor/Floor.vue';
import Brand from './Brand/Brand.vue';
import { useMenuStore } from '../../store/useMenuStore';
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { reqUserInfo } from '../../api';
import { useTokenStore } from '../../store/useTokenStore';
import { ElMessage } from 'element-plus';


//从 pinia 拿到 函数
const { changeMenu } = useMenuStore()
const {floorList} = storeToRefs(useMenuStore())
const { changeUser, changeToken, token } = useTokenStore()

//获得登录信息的数据存在pinia中
const getUser = async () => {
    const res = await reqUserInfo()
    console.log(res)
    if(res.code === 200) {
        changeUser(res.data)
    }
    if(res.code === 208 && res.message === '未登陆' && token){
        ElMessage({
            message: 'TOKEN失效',
            type: 'error'
        })
        changeUser({})
        changeToken('')
    }
}

//生命周期函数
onMounted(() => {
    changeMenu(true)
    getUser()
})

</script>