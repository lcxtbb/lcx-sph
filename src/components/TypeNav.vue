<template>
    <div class="typeNav">
        <div class="container">
            <div @mouseleave="leaveIndex" @mouseenter="enterMenu">
                <h2 class="all">全部商品分类</h2>
                <Transition name="sort">
                    <div class="sort" v-show="menuShow">
                        <div class="all-sort-list2" @click="goSearch($event)">
                            <div class="item" v-for="(c1, index) in categoryList" :key="c1.cacategoryId"
                                :class="{ currentBkc: currentIndex === index }">
                                <h3 @mouseenter="mouseChange(index)">
                                    <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{
                                        c1.categoryName }}</a>
                                </h3>
                                <div class="item-list clearfix" v-show="currentIndex === index ? true : false">
                                    <div class="subitem" v-for="(c2, index) in c1.categoryChild" :key="c2.categoryId">
                                        <dl class="fore">
                                            <dt>
                                                <a :data-categoryName="c1.categoryName"
                                                    :data-category2Id="c2.categoryId">{{
                                                        c2.categoryName }}</a>
                                            </dt>
                                            <dd>
                                                <em v-for="(c3, index) in c2.categoryChild" :key="c3.categoryId">
                                                    <a :data-categoryName="c1.categoryName"
                                                        :data-category3Id="c3.categoryId">{{ c3.categoryName }}</a>
                                                </em>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Transition>
            </div>
            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>

        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, defineProps } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMenuStore } from '../store/useMenuStore';
import { storeToRefs } from 'pinia';


//定义当前组件的路由实例
const route = useRoute()

//定义router实例
const router = useRouter()

//从pinia拿到数据，控制菜单隐藏显示,菜单数据
const { menuShow, categoryList } = storeToRefs(useMenuStore())
const { changeMenu } = useMenuStore()

//定义 鼠标移入的index
const currentIndex = ref(-1)

//定义 鼠标移入事件 添加背景
let mouseChange = (index) => {
    currentIndex.value = index
    // console.log(11)
}
// mouseChnage 函数节流
mouseChange = throt(mouseChange, 20)

//定义鼠标移入事件,控制菜单显示
const enterMenu = () => {
    changeMenu(true)
}

//定义 鼠标移出事件 移除背景
const leaveIndex = () => {
    currentIndex.value = -1
    route.fullPath.includes('search') ? changeMenu(false) : 1
    // console.log(route.fullPath.includes('search'), route.fullPath)

}

// 节流函数，开始触发，最后一次不触发
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


// 事件委派，路由跳转
const goSearch = (event) => {

    // 获取自定义属性
    let { category1id, category2id, category3id, categoryname } = event.target.dataset

    console.log(category1id, category2id, category3id, categoryname, event.target.dataset)

    if (categoryname) {
        //要传递的名字参数
        let query = { categoryName: categoryname }

        //跳转的地址
        let location = { name: 'search' }
        if (category1id) {
            //要传递的id参数
            query.category1Id = category1id

        } else if (category2id) {
            //要传递的id参数
            query.category2Id = category2id

        } else {
            //要传递的id参数
            query.category3Id = category3id
        }
        // 将参数合并在地址中
        location.query = query

        //如果有params，一起传出
        route.params ? location.params = route.params : 1

        router.push(location)

        //路由跳转之后,将菜单显示改为false
        changeMenu(false)
    }

}

</script>

<style lang="scss" scoped>
.typeNav {
    border-bottom: 2px solid salmon;

    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        position: relative;

        h2 {
            text-align: center;
            color: white;
            width: 210px;
            height: 45px;
            line-height: 45px;
            background-color: red;
        }

        .nav {

            a {
                margin: 0 20px;
                font-size: 16px;
            }
        }

        .sort {
            position: absolute;
            left: 0;
            top: 46px;
            width: 210px;
            height: 461px;
            z-index: 999;
            background-color: #fafafa;
            box-sizing: border-box;
            // overflow-x: hidden;

            .all-sort-list2 {

                .item {

                    h3 {
                        line-height: 28px;
                        font-size: 14px;
                        font-weight: 400;
                        overflow: hidden;
                        padding: 0 20px;
                        margin: 0;

                        a {
                            color: #333;
                        }

                        a:hover {
                            text-decoration: none;
                            color: #333 !important;
                        }
                    }

                    .item-list {
                        // display: none;
                        position: absolute;
                        width: 734px;
                        min-height: 460px;
                        background: #f7f7f7;
                        left: 210px;
                        border: 1px solid #ddd;
                        top: 0;
                        box-sizing: border-box;
                        z-index: 9999 !important;

                        .subitem {
                            float: left;
                            width: 650px;
                            padding: 0 4px 0 8px;

                            dl {
                                border-top: 1px solid #eee;
                                padding: 6px 0;
                                overflow: hidden;
                                zoom: 1;

                                &.fore {
                                    border-top: 0;
                                }

                                dt {
                                    float: left;
                                    width: 54px;
                                    line-height: 22px;
                                    text-align: right;
                                    padding: 5px 6px 0 0;
                                    font-weight: 700;
                                }

                                dd {
                                    min-height: 22px;
                                    align-items: center;
                                    display: flex;
                                    flex-wrap: wrap;
                                    width: 500px;
                                    padding: 3px 0 0;
                                    overflow: hidden;

                                    em {
                                        height: 14px;
                                        line-height: 14px;
                                        padding: 0 8px;
                                        margin-top: 3px;
                                        border-left: 1px solid #ccc;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        .sort-enter-from,
        .sort-leave-to {
            opacity: 0;
            transform: translateY(20px);
        }

        // .sort-enter-to {
        //     opacity: 1;
        // }

        .sort-enter-active,
        .sort-leave-active {
            transition: all 0.3s linear;
        }
    }
}


.currentBkc {
    background-color: #c5d3e8;
}
</style>