<template>
    <TypeNav/>
</template>

<script setup>
import { onMounted } from 'vue';
import TypeNav from '../../components/TypeNav.vue';
import { useMenuStore } from '../../store/useMenuStore';

// 从 pinia 拿到数据，改变菜单状态
const { changeMenu } = useMenuStore()

//生命周期
onMounted(() => {
    changeMenu(false)
})

</script>