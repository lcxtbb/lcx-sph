export const routes = [
    {
        path: "/addcartsuccess/:num",
        name: "addcartsuccess",
        component: () => import("../views/AddCartSuccess/AddCartSuccess.vue"),
        //路由元信息用在app里的footer中
        meta: { isShow: true }
    },
    {
        path: "/home",
        name: "home",
        component: () => import("../views/Home/Home.vue"),
        meta: { isShow: true }
    },
    {
        path: "/search/:keyword?",      // params 可以传，也可以不传
        name: "search",
        component: () => import("../views/Search/Search.vue"),
        meta: { isShow: true }
    },
    {
        path: "/login",
        name: "login",
        component: () => import("../views/Login/Login.vue"),
        meta: { isShow: false }
    },
    {
        path: "/register",
        name: "register",
        component: () => import("../views/Register/Register.vue"),
        meta: { isShow: false }
    },
    {
        path: '/',
        redirect: "/home"
    },
    {
        path: "/detail/:skuid",
        name: "detail",
        component: () => import("../views/Detail/Detail.vue"),
        meta: { isShow: true }
    },
    {
        path: "/shopcar",
        name: "shopcar",
        component: () => import("../views/ShopCart/ShopCar.vue"),
        meta: { isShow: true }
    },
    {
        path: "/trade",
        name: "trade",
        component: () => import("../views/Trade/Trade.vue"),
        meta: { isShow: true },
        beforeEnter: (to, from, next) => {
            if(from.path.indexOf('/shopcar') !== -1 || from.path.indexOf('/login') !== -1) {
                next()
            }else {
                next(false)
            }
            console.log(from.path)
        }
    },
    {
        path: "/pay/:orderId?",
        name: "pay",
        component: () => import("../views/Pay/Pay.vue"),
        meta: { isShow: true },
        beforeEnter: (to, from, next) => {
            if(from.path.indexOf('/trade') !== -1) {
                next()
            }else {
                next(false)
            }
        }
    },
    {
        path: "/center",
        name: "center",
        component: () => import("../views/Center/Center.vue"),
        meta: { isShow: true },
        children:[
            {
                path: "myorder",
                name: "myorder",
                component: () => import("../views/Center/MyOrder.vue")
            },
            {
                path: "grouporder",
                name: "grouporder",
                component: () => import("../views/Center/GroupOrder.vue")
            }
        ],
        redirect: "/center/myorder"
    },

]