<template>
    <div class="login">
        <div class="topBar">
            <img @click="goBack" src="@/static/image/login/arrowLeft.png" alt="">
            <router-link :to="{name:'registerOption'}">
                <p>注册</p>
            </router-link>
        </div>
        <div class="logo">
            LOGO
        </div>
        <div class="infoList">
            <div class="infoItem">
                <input v-model="name" type="text" name="name" placeholder="请输入用户名、邮箱、手机号">
                <img src="@/static/image/login/inputCancel.png" @click="cancelName" alt="">
            </div>
            <div class="infoItem">
                <input v-model='pswd' v-if="showPswd" type="password" name="name" placeholder="密码（6-20位字母、数字或符号）">
                <input v-model='pswd' v-if="!showPswd" type="text" placeholder="密码（6-20位字母、数字或符号）">
                <div class="pswd">
                    <img src="@/static/image/login/inputCancel.png" @click="cancelPswd" alt="">
                    <img @click="show" v-if="showPswd" src="@/static/image/login/closeEye.png" alt="">
                    <img @click="hide" v-if="!showPswd" src="@/static/image/login/openEye.png" alt="">
                </div>
            </div>
            <div class="infoItem">
                <input v-model="invatationCode" type="text" name="name" placeholder="请输入邀请码">
                <img @click="cancelCode" src="@/static/image/login/inputCancel.png" alt="">
            </div>
        </div>
        <div class="next" @click="doLogin">
            登录
        </div>
        <router-link :to="{name:'forgetPswd'}">
            <div class="forgetPswd">
                <p>忘记密码</p>
            </div>
        </router-link>

    </div>
</template>

<script>
  import { Toast } from 'mint-ui';
  export default {
    name: "login",
    data(){
      return {
        name: '',
        pswd: '',
        email: '',
        invatationCode: '',
        place: '',
        showPswd: true,
        showPicker: false,
      }
    },
    created(){},
    methods: {
      goBack(){
        this.$router.go('-1')
      },
      show() {
        this.showPswd = false
      },
      hide() {
        this.showPswd = true
      },
      cancelName() {
        this.name = ''
      },
      cancelPswd() {
        this.pswd = ''
      },
      cancelEmail() {
        this.email = ''
      },
      cancelCode() {
        this.invatationCode = ''
      },
      doLogin() {
        let username = this.name;
        let password = this.pswd;
        let code = this.invatationCode;
        if(username==''){
          Toast({message: "用户名不能为空", position: top, duration: 3000})
        }
        if (!(/^[\x21-\x7E]{6,20}$/.test(password))) {
          Toast({message: "密码格式错误", position: top, duration: 3000})
        }
        this.$axios.post('/business/pass/login?username='+username+'&password='+password
        +'&invitedCode='+code).then(res=>{
          console.log(res.data.data)
          if(res.data.code==200){
            Toast({message: res.data.message, position: top, duration: 3000})
            localStorage.setItem("loginInfo", JSON.stringify(res.data.data));
            this.$router.push({path:'/'});
            // this.$router.go(0);
              // window.location.reload()
          }else{
            Toast({message: res.data.message, position: top, duration: 3000})
            return
          }
        })
      },
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
        width:8px;
        margin-left:15px;
    }
    .topBar p{
        margin-right: 15px;
        color:#0094ff;
        font-size:16px;
    }
    .logo{
        margin:0 auto;
        margin-top:30px;
        width:90px;
        height: 90px;
        color:#fff;
        background: #0094ff;
        border-radius:20px;
        font-size: 23px;
        text-align: center;
        line-height: 90px;
    }

    .infoList{
        width:90%;
        margin:0 auto;
        margin-top:40px;
    }
    .infoItem{
        padding: 13px 0;
        border-bottom:1px solid #eee;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .infoItem input{
        width:260px;
        height: 30px;
        font-size:15px;
        margin-left:5px;
    }
    input::-webkit-input-placeholder {
        /* placeholder颜色  */
        color: #aab2bd;
        font-size:15px;
        letter-spacing: 1px;
    }
    .infoItem img{
        width:15px;
        height: 15px;
        margin-right:5px;
    }
    .pswd{
        display: flex;
        align-items: center;
    }
    .pswd img:last-child{
        width:20px;
        height: 10px;
        margin-left:10px;
    }
    .next{
        display: block;
        width:88%;
        margin:0 auto;
        margin-top:50px;
        background: #0094ff;
        border:none;
        outline: none;
        height: 40px;
        color:#fff;
        font-size:18px;
        border-radius:5px;
        text-align: center;
        line-height: 40px;
    }
    .next:active{
        background: #0083ee;
    }
    .forgetPswd{
        width:88%;
        margin:0 auto;
        margin-top:14px;
        display: flex;
        justify-content: flex-end;
    }
    .forgetPswd p{
        color:#0094ff;
        margin-right:3px;
    }
</style>
