<template>
  <div class="childAccounts" :class='className'>
    <topNav title="子账户管理"></topNav>
    <div class="body">
      <div class="content">
        <div class="card">
          <div class="title">
            <img src="@/static/image/company/account.png" alt="">
            <span></span>
          </div>
          <div class="sepline"></div>
          <div class="line">
            <span>电话：</span>
            <span></span>
          </div>
          <div class="line">
            <span>邮箱：</span>
            <span></span>
          </div>
          <div class="line">
            <span>微信：</span>
            <span></span>
          </div>
          <div class="line">
            <span>地址：</span>
            <span></span>
          </div>
          <label class="ibg"></label>
        </div>
        <el-button type="primary" @click="addAccount">添加子账户</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {}
  },
  computed:{
    className(){
      return `childAccounts-${this.$store.state.viewMode}`
    }
  },
  methods:{
    addAccount(){
      this.$router.push('/addchildaccount')
    }
  }
}
</script>

<style scoped>
.childAccounts {
  background: #f1f2f6;
  width: 100%;
  height: 100%;
  position: relative;
  overflow:hidden;
  font-family: PingFang-SC-Bold;
}
.body{
  position: absolute;
  top: 41px;
  bottom: 0;
  overflow-x: hidden;
  overflow-y: auto;
  width: 100%;
  padding-bottom:60px;
}
.content{
  min-width: 300px;
  margin: 0 auto;
  height: 100%;
  width: 690px;
}
.card{
  padding: 40px 60px;
  background-color: #fff;
  margin-top:30px;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
}
.childAccounts-min .card{
  padding: 20px 30px;
  margin-top: 20px;
}
.ibg{
  display: block;
  background-color:#0094ff;
  transform:  rotate(-45deg);
  width: 92px;
  height: 52px;
  left:-34px;
  top: -14px;
  position: absolute;
  box-shadow: 0 1px 1px #ccc;
}
.childAccounts-min .ibg {
  width: 46px;
  height: 26px;
  left:-17px;
  top: -7px;
}
.title{
  padding-bottom: 26px;
  border-bottom: 1px solid #eee;
  width: 100%;
  color: #0094ff;
  font-size: 32px;
  line-height: 32px;
}
.childAccounts-min .title{
  padding-bottom: 10px;
  font-size: 18px;
  line-height: 18px;
}
.title img {
  width: 38px;
  height: 39px;;
}
.childAccounts-min .title img {
  width: 24px;
  height: 24px;
}
.sepline{
  height: 10px;
  width: 100%;
}
.childAccounts-min .sepline{
  height: 5px;
}
.line{
  font-size: 28px;
  color: #666;
  line-height: 34px;
  padding: 5px 0;
}
.childAccounts-min .line{
  font-size: 14px;
  line-height: 20px;
}
.childAccounts /deep/ .el-button{
  width: 100%;
  height: 85px;
  font-size: 34px;
  margin-top:60px;
}
.childAccounts-min /deep/ .el-button{
  width: 100%;
  height: 60px;
  font-size: 20px;
}
</style>