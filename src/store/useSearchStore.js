import { defineStore } from "pinia";
import { ref } from "vue";

export const useSearchStore = defineStore('search', () => {

    //定义 控制 header组件搜索值 的数据
    const headerSearch = ref('1')

    //改变 控制header组件搜索值 的函数
    const clearSearch = (val) => {
        headerSearch.value = val
    }

    return {
        headerSearch,
        clearSearch
    }
})