<template>
    <div class="pagination" @click="pageClick($event)">
        <button :data-info="pageNow > 1 ? pageNow - 1 : 1">上一页</button>
        <button v-if="s > 1" :data-info="1">1</button>
        <button v-if="s > 2" :data-info="1">···</button>

        <button v-for="(item, index) in count" :key="index" :data-info="item" :class="item === pageNow ? 'active' : ''">{{ item
            }}</button>

        <button v-if="e < totalPage -1" :data-info="totalPage">···</button> 
        <button v-if="e < totalPage" :data-info="totalPage">{{ totalPage }}</button>
        <button :data-info="pageNow < totalPage ? pageNow + 1 : totalPage">下一页</button>

        <button style="margin-left: 30px">共 {{ props.total }} 条</button>

        <div>开始--{{ s }}  结束--{{e}}  总共--{{ totalPage }}</div>
    </div>
</template>

<script setup>
import { defineProps, onMounted, ref, watch, defineEmits } from 'vue';

//父组件传来的数据
const props = defineProps({
    // pageNo: {
    //     typeof: Number
    // },
    pageSize: {
        typeof: Number
    },
    total: {
        typeof: Number
    },
    continues: {
        typeof: Number
    }
})
const emits = defineEmits(['pageEvent'])

//页面总数
const totalPage = ref(0)

//开始页码和结束页码,页码差的数组,当前页面
let s = ref(0)
let e = ref(0)
let count = ref([])
let pageNow = 1

//生成相近页面的函数
const snumAndenum = () => {
    // console.log(props.total)
    totalPage.value = Math.ceil(props.total / props.pageSize)
    //连续开始页码和结束页码
    if (totalPage.value < props.continues) {
        s.value = 1
        e.value = totalPage.value
    } else {
        s.value = pageNow - Math.floor(props.continues / 2)
        e.value = pageNow + Math.floor(props.continues / 2)
        // console.log(e.value,props.continues)
        //如果开始页小于1 
        if (s.value < 1) {
            // console.log('acb')
            s.value = 1
            e.value = props.continues
        } else if (e.value > totalPage.value) {          //如果结束页面大于总共页面
            s.value = totalPage.value - props.continues + 1
            e.value = totalPage.value
        }
    }
    count.value = Array.from({ length: e.value - s.value + 1 }, (_, index) => index + s.value)
    // console.log(s.value,e.value,totalPage)
}


//页码点击事件
const pageClick = (evt) => {
    // console.log(evt.target.dataset.info)
    if (evt.target.dataset.info) {
        pageNow = Number(evt.target.dataset.info)
        snumAndenum()
        emits('pageEvent', pageNow)
        // console.log(132465)
    }
}

//监听事件
watch(() => props.total, () => {
    //重置当前页码，发送事件
    pageNow = 1
    snumAndenum() 
    emits('pageEvent', pageNow)
})

//生命周期
onMounted(() => {
    snumAndenum()
})
</script>

<style lang="scss" scoped>
.pagination {

    // text-align: center;
    button {
        margin: 0 5px;
        background-color: #f4f4f5;
        color: #606266;
        outline: none;
        border-radius: 2px;
        padding: 0 4px;
        vertical-align: top;
        display: inline-block;
        font-size: 13px;
        min-width: 35.5px;
        height: 28px;
        line-height: 28px;
        cursor: pointer;
        box-sizing: border-box;
        text-align: center;
        border: 0;

        &[disabled] {
            color: #c0c4cc;
            cursor: not-allowed;
        }

        &.active {
            cursor: not-allowed;
            background-color: #409eff;
            color: #fff;
        }
    }
}
</style>