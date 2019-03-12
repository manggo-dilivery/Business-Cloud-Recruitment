<template>
    <div class="container">
        <topNav title="忘记密码"></topNav>
        <div class="infoList">
            <div class="infoItem">
                <input v-model="email" type="email" placeholder="请输入邮箱">
                <img src="@/static/image/login/inputCancel.png" @click="cancelName" alt="">
            </div>
            <div class="infoItem">
                <input v-model='code' type="text" placeholder="请输入收到的邮箱验证码">
                <div class="pswd">
                    <img src="@/static/image/login/inputCancel.png" @click="cancelPswd" alt="">
                    <p v-if="showPswd==1" @click="yzCode" class="yzCode">获取验证码</p>
                    <p v-if="showPswd==3" @click="fresh" class="fresh">重新发送</p>
                    <p v-if="showPswd==2" v-model="time" class="yzNum">{{time}}S</p>
                </div>
            </div>
            <div class="infoItem">
                <input v-model='pswd' v-if="showPswd1" type="password" name="name" placeholder="新密码（6-20位字母、数字或符号）">
                <input v-model='pswd' v-if="!showPswd1" type="text" placeholder="新密码（6-20位字母、数字或符号）">
                <div class="pswd">
                    <img src="@/static/image/login/inputCancel.png" @click="cancelPswd" alt="">
                    <img @click="showPswd1=false" v-if="showPswd1" src="@/static/image/login/closeEye.png" alt="">
                    <img @click="showPswd1=true" v-if="!showPswd1" src="@/static/image/login/openEye.png" alt="">
                </div>
            </div>
            <div class="infoItem">
                <input v-model='pswd2' v-on:blur="onblur" v-if="showPswd2" type="password" name="name" placeholder="再次输入新密码">
                <input v-model='pswd2' v-on:blur="onblur" v-if="!showPswd2" type="text" name="name" placeholder="再次输入新密码">
                <div class="pswd">
                    <img src="@/static/image/login/inputCancel.png" @click="cancelPswd2" alt="">
                    <img @click="showPswd2=false" v-if="showPswd2" src="@/static/image/login/closeEye.png" alt="">
                    <img @click="showPswd2=true" v-if="!showPswd2" src="@/static/image/login/openEye.png" alt="">
                </div>
            </div>
        </div>
        <div class="next" @click="goNext">
            完成
        </div>
    </div>
</template>

<script>
  import { Toast } from 'mint-ui';
  export default {
    name: "personRegist",
    data(){
      return{
        email:'',
        pswd:'',
        pswd2:'',
        code:'',
        time:60,
        showPswd:1,
        showPswd1:true,
        showPswd2:true,
      }
    },
    methods:{
      cancelName(){
        this.email=''
      },
      cancelPswd(){
        this.pswd=''
      },
      cancelPswd2(){
        this.pswd2=''
      },
      yzCode(){
        this.showPswd = 2;
        if(!/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(this.name)){
          this.showPswd = 1;
          Toast({message:"邮箱格式错误", position:top, duration:3000});
          return
        }
        this.$axios.get('/business/pass/email?email='+this.email).then(res=>{
          Toast({message:res.data.message, position:top, duration:3000})
        }).catch(err=>{
          Toast({message:err.data.message, position:top, duration:3000})
        })
        var interval = setInterval(function () {
          var num = this.time;
          if(num == 0){
            this.showPswd = 3;
            this.time = 60;
            clearInterval(interval)
            return;
          }
          this.time = this.time-1
        }.bind(this),1000)
      },
      fresh(){
        this.showPswd = 2;
        if(!/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(this.name)){
          Toast({message:"邮箱格式错误", position:top, duration:3000});
          return
        }
        this.$axios.get('/business/pass/email?email='+this.email).then(res=>{
          Toast({message:res.data.message, position:top, duration:3000})
        }).catch(err=>{
          Toast({message:err.data.message, position:top, duration:3000})
        })
        var interval = setInterval(function () {
          var num = this.time;
          if(num == 0){
            this.showPswd = 3;
            this.time = 60;
            clearInterval(interval)
            return;
          }
          this.time = this.time-1
        }.bind(this),1000)
      },
      onblur(){
        if(this.pswd!=this.pswd2){
          Toast({message:"两次输入的密码不一致", position:top, duration:3000})
          return;
        }
      },
      goNext(){
        let userName = this.email;
        let password = this.pswd;
        let code = this.code;
        if(userName==''){
          Toast({message:"用户名不能为空", position:top, duration:3000});
          return
        };
        if(code==''){
          Toast({message:"验证码不能为空", position:top, duration:3000});
          return
        };
        if(!(/^[\x21-\x7E]{6,20}$/.test(password))){
          Toast({message:"密码格式错误", position:top, duration:3000})
          return;
        }
        this.$axios.post('/business/pass/forget/password?username='+userName+'&password='+
        password+'&code='+code).then(res=>{
          if(res.data.code==200){
            Toast({message:res.data.message, position:top, duration:3000})
            this.$router.push({path:'/login'})
          }else{
            Toast({message:res.data.message, position:top, duration:3000})
          }
        })
      },
    }
  }
</script>

<style scoped>
    .container{
        padding-top: 40px;
    }
    .infoList{
        width:90%;
        margin:0 auto;
        margin-top:10px;
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
    .next{
        display: block;
        width:88%;
        margin:0 auto;
        margin-top:60px;
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
    .pswd{
        display: flex;
        align-items: center;
    }
    .pswd img:last-child{
        width:20px;
        height: 10px;
        margin-left:10px;
    }
    .mark{
        width:100%;
        height: 100%;
        position: fixed;
        top:0;
        left:0;
        background: rgba(0,0,0,0.6);
    }
    /*验证码样式*/
    .yzCode{
        width:90px;
        border:1px solid #ddd;
        text-align: center;
        padding: 5px 0;
        border-radius:5px;
        color:#888;
        font-size:14px;
    }
    .yzCode:active{
        background: #eee;
    }
    .fresh{
        width:90px;
        border:1px solid #f83139;
        text-align: center;
        padding: 5px 0;
        border-radius:5px;
        color:#f83139;
        font-size:14px;
    }
    .yzNum{
        width:90px;
        border:1px solid #ddd;
        text-align: center;
        padding: 5px 0;
        border-radius:5px;
        color:#888;
        font-size:14px;
    }
</style>
