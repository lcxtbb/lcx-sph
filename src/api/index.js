import mockRequest from "./mockReq";
import request from "./request";


//三级菜单联动接口
export const reqCategoryList = () => request.get(`/product/getBaseCategoryList`)

//banner轮播图数据
export const reqGetBanner = () => mockRequest.get(`/banner`)

//floor数据
export const reqFloorList = () => mockRequest.get(`/floor`)

//获取搜索模块数据
export const reqSearchInfo = data => request({url:"/list", method:"post", data})

//获取产品信息详情的接口
export const reqDetail = data => request({url: `/item/${data}`, method: "get"})

//添加/更新购物车的商品
export const reqAddUpdShopCar = (id,num) => request({url: `/cart/addToCart/${ id }/${ num }`, method: 'post'})

//获取购物车列表
export const reqShopCarList = () => request({url: "/cart/cartList", method: "get"})

//删除购物车商品
export const reqDeleteCar = data => request({url: `/cart/deleteCart/${data}`, method: 'delete'})

//切换商品选中状态
export const reqChecked = (id,num) => request({url: `/cart/checkCart/${id}/${num}`, method: 'get'})

//注册获取验证码
export const reqGetCode = data => request({url: `/user/passport/sendCode/${data}`, method: 'get'})

//注册接口
export const reqRegister = data => request({url:"/user/passport/register", data, method: 'post'})

//登录接口
export const reqLogin = data => request({url:"/user/passport/login", data, method: 'post'})

//获取用户信息
export const reqUserInfo = () => request({url: "/user/passport/auth/getUserInfo", method: 'get'})

// //获取用户地址信息
// export const reqAdress = () => request({url: "/user/userAddress/auth/findUserAddressList", method: 'get'})

//获取用户地址信息,mock
export const reqAdress = () => mockRequest({url: "/adress", method: 'get'})

//获取订单交易信息
export const reqOrderInfo = () => request({url: "/order/auth/trade", method: 'get'})

//提交订单请求
export const reqSubOrder = (data,tradeNo) => request({url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: 'post'})

//获得订单信息请求
export const reqPayInfo = orderId => request({url: `/payment/weixin/createNative/${orderId}`, method: 'get'})

//获取个人中心请求
export const reqMyOrder = (page, limit) => request({url: `/order/auth/${page}/${limit}`, method: 'get'})