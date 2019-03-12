<template>
    <div>
        <div class="topBar">
            <img @click="goBack" src="@/static/image/login/err.png" alt="">
            <p>注册</p>
            <p>
                <router-link :to="{name:'login'}">立即登录</router-link>
            </p>
        </div>
        <div class="logo">
            LOGO
        </div>
        <router-link :to="{name:'personRegist'}">
            <div class="regist" style="background: #0094ff;" @click="personRegist">
                <img src="@/static/image/login/people.png" alt="">
                <p>个人注册</p>
            </div>
        </router-link>
        <router-link :to="{name:'companyRegister'}">
            <div class="regist" style="border:1px solid #999;margin-top:40px" @click="companyRegist">
                <img src="@/static/image/login/company.png" alt="">
                <p style="color:#333">企业注册</p>
            </div>
        </router-link>
        <router-link :to="{name:'userAgreement'}">
            <div class="agreement">
                查看《用户协议》
            </div>
        </router-link>
    </div>
</template>

<script>
    export default {
      name: "register",
      methods:{
          goBack(){
            this.$router.go('-1')
          },
          personRegist(){
            window.localStorage.setItem('personRegistInfo',JSON.stringify({"info":0}))
          },
          companyRegist(){
            window.localStorage.setItem('personRegistInfo',JSON.stringify({"info":1}))
          }
      }
    }
</script>

<style scoped>
    .topBar{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width:100%;
        padding:15px 0;
    }
    .topBar img{
        width:14px;
        height: 14px;
        margin-left:15px;
    }
    .topBar p:first-of-type{
        color:#000;
        font-size:16px;
        position: fixed;
        width:50px;
        left:50%;
        margin-left:-25px;
        text-align: center;
        letter-spacing: 2px;
        /*font-weight: bold;*/
    }
    .topBar p:last-of-type{
        margin-right: 15px;
        color:#0094ff;
        font-size:16px;
    }
    a{
        color:#0094ff;
        letter-spacing: 1px;
    }
    /*logo样式*/
    .logo{
        margin:0 auto;
        margin-top:50px;
        width:90px;
        height: 90px;
        color:#fff;
        background: #0094ff;
        border-radius:20px;
        font-size: 24px;
        text-align: center;
        line-height: 100px;
    }
    /*注册按钮*/
    .regist{
        display: flex;
        justify-content: center;
        align-items: center;
        width:75%;
        padding: 8px 0;
        margin:0 auto;
        margin-top:60px;
        border-radius:30px;
    }
    .regist img{
        width:20px;
        height: 20px;
    }
    .regist p{
        color:#fff;
        font-size:18px;
        margin-left:12px;
        letter-spacing: 1px;
    }
    /*用户协议*/
    .agreement{
        width:140px;
        margin:0 auto;
        margin-top:30px;
        text-align: center;
        color:#999;
        font-size: 15px;
    }
</style>
