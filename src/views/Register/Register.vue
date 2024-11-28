<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>注册新用户
        <span class="go">我有账号，去 <router-link to="/login">登陆</router-link>
        </span>
      </h3>
      <div class="content">
        <label>手机号:</label>
        <input type="text" placeholder="请输入你的手机号" v-model="formVi.phone">
        <span class="error-msg" v-show="!phoneRex">手机号不合法</span>
      </div>
      <div class="content">
        <label>验证码:</label>
        <input type="text" placeholder="请输入验证码" v-model="formVi.verification">
        <button style="width: 100px; height: 38px;" @click="getCode">获取验证码</button>
        <span class="error-msg" v-show="!verificationRex">验证码不合法</span>
      </div>
      <div class="content">
        <label>登录密码:</label>
        <input type="password" placeholder="请输入你的登录密码" v-model="formVi.password">
        <span class="error-msg" v-show="!passwordRex">登陆密码需要为6位数字及以上</span>
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input type="password" placeholder="请输入确认密码" v-model="formVi.conpassword">
        <span class="error-msg" v-show="!conpasswordRex">确认密码需要和登陆密码一致</span>
      </div>
      <div class="controls">
        <input name="m1" type="checkbox" v-model="formVi.agree">
        <span>同意协议并注册《尚品汇用户协议》</span>
        <span class="error-msg" v-show="!agreeRex">同意协议是必须的</span>
      </div>
      <div class="btn">
        <button @click="userRegister">完成注册</button>
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive } from 'vue';
import { reqGetCode, reqRegister } from '../../api';
import { useRouter } from 'vue-router';

//拿到路由的实例
const router = useRouter()

//表单的数据
const formVi = reactive({
  phone: '',
  verification: '',
  password: '',
  conpassword: '',
  agree: true
})

//表单数据验证
const phoneRex = computed(() => /^1[3-9]\d{9}$/.test(formVi.phone))
const verificationRex = computed(() => /^\d{6}$/.test(formVi.verification))
const passwordRex = computed(() => /^\d{6,}$/.test(formVi.password))
const conpasswordRex = computed(() => formVi.password === formVi.conpassword)
const agreeRex = computed(() => formVi.agree)


//获取验证码
const getCode = async () => {
  const phoneRegex = /^1[3-9]\d{9}$/
  if (phoneRegex.test(formVi.phone)) {
    const res = await reqGetCode(formVi.phone)
    console.log(res)
    if (res.code === 200) {
      formVi.verification = res.data
    }
  } else {
    console.log('手机号不合法')
  }
}

//用户注册
const userRegister = async () => {
  console.log(phoneRex)
  if (phoneRex.value && verificationRex.value && passwordRex.value && conpasswordRex.value && agreeRex.value) {
    const res = await reqRegister({
      phone: formVi.phone,
      password: formVi.password,
      code: formVi.verification
    })
    console.log(res)
    if(res.code === 200) {
      router.push({name:'login'})
    }
  }else {
    console.log(654645)
  }
}
</script>

<style lang="scss" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>