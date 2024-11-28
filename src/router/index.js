import { createRouter, createWebHashHistory } from "vue-router";
import { routes } from "./router"
import { useTokenStore } from "../store/useTokenStore";


const router = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { top: 0 }
    },
})


//路由守卫
router.beforeEach((to, from, next) => {
    const { token } = useTokenStore()
    // console.log(token)

    if (token) {
        //如果登录，去登陆页面不放行
        if (to.name === 'login' || to.name === 'register') {
            next('/')
        } else {
            next()
        }
    } else {                //如果未登录
        // next()
        let toPath = to.name
        console.log(toPath)
        if(to.fullPath.indexOf('/pay') !== -1 || to.fullPath.indexOf('/trade') !== -1 || to.fullPath.indexOf('/center') !== -1) {
            next(`/login?rediect=${toPath}`)
            // console.log(`/login?rediect=${toPath}`)
        }else {
            next()
        }
    }

})

export default router