import { defineStore } from "pinia";
import { ref } from "vue";

export const useTokenStore = defineStore('token', () => {
    
    //定义用户的token
    const token = ref('')

    //改变token
    const changeToken = (val) => {
        token.value = val
        console.log(token.value)
    }

    //定义用户登录的信息
    const user = ref({})

    //修改登录信息
    const changeUser = (val) => {
        user.value = {
            ...val,
            userName: 'lcx'
        }
        console.log(user.value)
    }

    return {
        token,
        changeToken,
        user,
        changeUser
    }
},
{
    persist: true
}
)