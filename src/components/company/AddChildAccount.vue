<template>
  <div class="account" :class="className">
    <topNav title="添加子账户"></topNav>
    <div class="expBody">
      <div class="lineWrap">
        <div class="line">
          <div class="left">请输入用户名</div>
          <div class="right">
            <el-input v-model="userName" placeholder="请输入用户名"></el-input>
          </div>
        </div>
      </div>
      <div class="lineWrap">
        <div class="line">
          <div class="left">请输入密码</div>
          <div class="right">
            <el-input v-model="password" placeholder="请输入密码" show-password type="password"></el-input>
          </div>
        </div>
      </div>
      <div class="lineWrap">
        <div class="line">
          <div class="left">请输入电话</div>
          <div class="right">
            <el-input v-model="phoneNum" placeholder="请输入电话" type="number"></el-input>
          </div>
        </div>
      </div>
      <div class="lineWrap">
        <div class="line">
          <div class="left">请输入邮箱</div>
          <div class="right">
            <el-input v-model="email" placeholder="请输入邮箱" type="email"></el-input>
          </div>
        </div>
      </div>
      <div class="lineWrap">
        <div class="line">
          <div class="left">请输入微信号</div>
          <div class="right">
            <el-input v-model="wxNum" placeholder="请输入微信号"></el-input>
          </div>
        </div>
      </div>
      <div class="lineWrap">
        <div class="line">
          <div class="left">请选择地址</div>
          <div class="right">
            <el-input v-model="address" placeholder="请选择地址"></el-input>
          </div>
        </div>
      </div>
      <el-button type="primary" @click="addAccount">确定添加</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      userName: '',
      password: '',
      phoneNum: '',
      email: '',
      wxNUm: '',
      address: ''
    }
  },
  methods: {
    addAccount(){
      return;
      let info = JSON.parse(localStorage.getItem("loginInfo"));
      let url = `/business/education/save?admissionTime=${this.inTime}&competition=${encodeURIComponent(this.competition)}&discipline=${encodeURIComponent(this.major)}&education=${encodeURIComponent(this.education)}&graduationTime=${this.outTime}&hobby=${encodeURIComponent(this.hobby)}&learnaccount=${encodeURIComponent(this.account)}&schoolName=${encodeURIComponent(this.schoolName)}&uid=${info.uid}&status=1`;
      this.$axios.post(url)
        .then((res)=>{
          if (res.data.code === 200) {
              this.$router.push('/center')
          } else {
            this.$message({
              type: 'success',
              message: res.data.message,
              type: 'error'
            });
            console.warn(res.data.message);
          }
        })
        .catch(err=>console.warn(err));
    }
  },
  computed: {
    mode(){
      return this.$store.state.viewMode;
    },
    className(){
      return `account-${this.$store.state.viewMode}`
    }
  }
}
</script>

<style scoped>
.account {
  background: #efefef;
  width: 100%;
  height: 100%;
  position: relative;
  overflow:hidden;
  font-family: PingFang-SC-Bold;
}
.expBody{
  position: absolute;
  top: 41px;
  bottom: 0;
  overflow-x: hidden;
  overflow-y: auto;
  width: 100%;
  background-color: #f1f2f6;
  padding-bottom:60px;
}
.lineWrap{
  clear:both;
  float: left;
  background-color: #fff;
  padding-left: 3%;
  width: 100%;
}
.line{
  clear:both;
  float: left;
  width: 100%;
  border-bottom: 1px solid #eee;
  padding-top:27px;
  padding-bottom: 26px;
  padding-right: 3%;
}
.account-min .line{
  padding-top:10px;
  padding-bottom: 10px;
  padding-right: 3%;
}
.line .left{
  clear:both;
  float: left;
  font-size: 30px;
  height: 50px;
  line-height: 50px;
  width: 50%;
  min-width:300px;
}
.account-min .line .left {
  font-size: 16px;
  height: 40px;
  line-height: 40px;
  width: 50%;
  min-width: 100px;
}
.line .right{
  float:left;
  padding-top:10px;
  width: 50%;
  min-width:300px;
}
.account-min .line .right {
  padding: 0;
  width: 50%;
  min-width: 100px;
}
.name {
  text-overflow: ellipsis;
  overflow: hidden;
}
.account /deep/ .el-button{
  width: 100%;
  height: 85px;
  font-size: 34px;
  margin-top:60px;
  position: absolute;
  left: 0;
  bottom: 0;
}
.account-min /deep/ .el-button{
  width: 100%;
  height: 60px;
  font-size: 20px;
}
</style>