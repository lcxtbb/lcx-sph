import { defineStore } from "pinia";
import { ref } from "vue";
import { reqCategoryList, reqFloorList, reqGetBanner } from "../api";


export const useMenuStore = defineStore('Menu', () => {

    //定义三级菜单显示状态
    const menuShow = ref(true)

    //改变三级菜单显示状态
    const changeMenu = (val) => {
        menuShow.value = val
    } 

    //定义三级菜单数据
    const categoryList = ref([])

    //拿到三级菜单数据
    const getCategoryList = async () => {
        const res = await reqCategoryList()
        if (res.code === 200) {
            categoryList.value = res.data
        }
        console.log(categoryList.value)
    }

    //banner轮播图数据
    const bannerList = ref([])

    //banner轮播图数据请求
    const getBanner = async () => {
        const res = await reqGetBanner()
        if(res.code === 200){
            bannerList.value = res.data  
        }
    }

    //floor数据
    const floorList = ref([])

    //floor数据的请求
    const getFloor = async () => {
        const res = await reqFloorList()
        if(res.code === 200) {
            floorList.value = res.data
            console.log(floorList.value)
        }
    }
    
    return {
        menuShow,
        changeMenu,
        categoryList,
        getCategoryList,
        getBanner,
        bannerList,
        floorList,
        getFloor
    }
})