import { defineStore } from "pinia";
import { ref } from "vue";
import { reqAddUpdShopCar, reqDetail } from "../api";
import { getUUID } from "../utils/uuid_token";
// import { persist } from 'pinia-plugin-persistedstate';

export const useDetailStore = defineStore('detail', () => {

    //唯一的uuid值，放在请求头中
    const uuid_token = ref(getUUID())

    //detail 数据详情
    const detailData = ref({})

    //发送请求获取数据
    const getDetail = async (id) => {
        const res = await reqDetail(id)
        if (res.code === 200) {
            // console.log(res.data)
            detailData.value = res.data
        }
        console.log(detailData.value)
    }

    //添加购物车的请求
    const addShopCar = async (id, num) => {
        const res = await reqAddUpdShopCar(id, num)
        // console.log(res)
        if (res.code === 200) {
            return 'ok'
        }
        return Promise.reject(new Error('fal'))
    }

    // 添加购物车展示的详情数据
    return {
        detailData,
        getDetail,
        addShopCar,
        uuid_token
    }
}
// {
//     persist:{
//         enabled:true,
//         // key:"demo",
//         storage:sessionStorage,
//  }
// }
) 