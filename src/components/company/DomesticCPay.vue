<template>
  <div class="global" :class="className">
    <topNav title="企业会员付款"></topNav>
    <div class="payMenu">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">全球企业会员</el-menu-item>
        <el-menu-item index="2" >国内企业会员</el-menu-item>
      </el-menu>
    </div>
    <div class="payBody">
      <div class="paySection" style="margin-top:0">
        <div class="payContent">
          <div class="contentLine">
            <span>账号：{{account}}</span>
          </div>
          <div class="contentLine">
            <span style='margin-right: 50px'>余额：￥{{balance}}</span>
          </div>
          <div class="sepline" style="margin-top: 20px"></div>
        </div>
        <div class="payContent">
          <div class="contentLine" style="margin-top: 20px;">
            <p>充值金额</p>
          </div>
          <div class="contentLine" style="padding-bottom: 20px; margin-left: -10px;">
            <div v-for="(item,index) in vipData" :key="index" 
              class="payItem payItem2" :class="{selected: vipValue===item.money}" 
              @click="chooseVip(item.money)">
              <p>{{item.money}}<span>人民币</span></p>
              <div class="sepline"></div>
              <p>{{item.text}}</p>
              <label class="ibg">
                <i class="el-icon-check i-check"></i>
              </label>
            </div>
          </div>
          <div class="contentLine">
            <img class="remindImg" src="@/static/image/pay/horn.png" alt="">
            <div class="reminding">注：全球企业会员付费期间可与国内外企业及国内外会员/非会员免费通信</div>
          </div>
        </div>
      </div>
      <div class="paySection" style="padding-left: 2%;">
        <div class="payContent">
          <div class="contentLine" style="padding-bottom: 20px; margin-left: -10px;">
            <div v-for="(item,index) in payWayData" :key="index"
              class="payWay" :class="{selected: payWayValue===item.value}" 
              @click="choosePayWay(item.value)">
              <div :class="item.value"></div>
              <div :style="item.textStyle">{{item.text}}</div>
              <label class="ibg">
                <i class="el-icon-check i-check"></i>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="accounts">
        <div class="payContent">
          <div class="contentLine">
            <p>应付<span>{{total}}</span>美元</p>
          </div>
        </div>
      </div>
      <el-button type="primary" @click="submit">立即充值</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      activeIndex: '2',
      vipData: [
        { money: 2999, text: '半年'},
        { money: 5999, text: '1年'}
      ],
      payWayData: [
        { text: "支付宝", value: "zfb" },
        { text: "微信支付", value: "wx" },
        { text: "VISA支付", value: "visa" },
        { text: "Apple Pay", value: "ipay" },
        { text: "银联支付", value: "card" }
      ],
      vipValue: 0,
      payWayValue: '',
      account: '',
      balance: ''
    }
  },
  computed:{
    currentUserInfo(){
      return JSON.parse(localStorage.getItem("loginInfo"));
    },
    total(){
      return this.vipValue;
    },
    className(){
      return `global-${this.$store.state.viewMode}`
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      if (key == 1) {
        this.$router.push('/globalcpay')
      }
    },
    choosePayWay(val){
      this.payWayValue = val;
    },
    chooseVip(val){
      this.vipValue = val;
    },
    submit(){
      if (this.vipValue === 0) {
        this.$message({
          message: `请选择充值内容！`,
          showClose: true,
          type: "error"
        })
        return;
      }
      if (this.payWayValue === "") {
        this.$message({
          message: `请选择充值方式！`,
          showClose: true,
          type: "error"
        })
        return;
      }

      this.$message({
        message: `${this.vipValue}-${this.payWayValue}`,
        showClose: true
      })
    }
  },
  created(){
    this.$axios.get(`/business/vip/get/${this.currentUserInfo.uid}`)
      .then(res=>{
        let data = res.data.data;
        this.account = data.number;
        this.balance = data.balance;
        this.gold = data.gold;
      })
      .catch(err=>console.warn(err));
  }
}
</script>

<style scoped>
.global{
  width: 100%;
  height: 100%;
  position: relative;
  overflow:hidden;
  font-family: PingFang-SC-Bold;
}
.payMenu{
  position: absolute;
  top: 40px;
  overflow: hidden;
  width: 100%;
  border-bottom: 1px solid #eee;
}
.global-max .payBody{
  position: absolute;
  top: 131px;
  bottom: 0;
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
  background: #f1f2f6;
}
.global-min .payBody{
  position: absolute;
  top: 101px;
  bottom: 0;
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
  background: #f1f2f6;
}
.paySection{
  background: #fff;
  padding: 30px 2%;
  box-sizing: border-box;
  width: 100%;
  margin-top: 10px;
}
.payContent{
  padding: 0 2%;
  box-sizing: border-box;
  width: 100%;
}
.contentLine{
  width: 100%;
  box-sizing: border-box;
  padding: 0 2%;
}
.global-max .contentLine span{
  font-size: 28px;
  color: #333;
  line-height: 50px;
  white-space: nowrap;
}
.global-min .contentLine span{
  font-size: 14px;
  color: #333;
  line-height: 30px;
  white-space: nowrap;
}
.global-max .contentLine p{
  font-size: 26px;
  color: #999;
}
.global-min .contentLine p{
  font-size: 13px;
  color: #999;
} 
.contentLine .remindImg {
  display:inline-block;
}
.contentLine .reminding{
  display: inline-block;
  color: #ff9f1c;
  word-break: break-all;
  width: calc(100% - 60px)
}
.global-max .remindImg {
  width: 31px;
  height: 31px;
}
.global-min .remindImg {
  width: 20px;
  height: 20px;
}
.global-max .reminding {
  line-height: 31px;
  font-size: 26px;
  margin-left: 22px;
}
.global-min .reminding {
  line-height: 20px;
  font-size: 13px;
  margin-left: 12px;
}
.global-max .payItem{
  width: 218px;
  margin: 10px 10px 0 10px;
  border-radius: 10px;
  min-width: 200px;
  border: 1px solid #eee;
  display: inline-block;
  box-sizing: border-box;
  text-align: center;
  padding: 16px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  user-select:none;
}
.global-min .payItem{
  width: 40%;
  margin: 10px 10px 0 10px;
  border-radius: 10px;
  border: 1px solid #eee;
  display: inline-block;
  box-sizing: border-box;
  text-align: center;
  padding: 10px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  user-select:none;
}
.payItem:hover{
  border-color: #0094ff;
}
.global-max .payItem1 p:first-child{
  line-height: 50px;
  font-size: 30px;
  color: #000;
}
.global-min .payItem1 p:first-child{
  line-height: 30px;
  font-size: 14px;
  color: #000;
}
.global-max .payItem1 p:last-child{
  line-height: 30px;
  font-size: 24px;
  color: #999;
}
.global-min .payItem1 p:last-child{
  line-height: 22px;
  font-size: 14px;
  color: #999;
}
.payItem1:hover p{
  color:#0094ff;
}
.global-max .payItem2 p:first-child{
  line-height: 44px;
  font-size: 30px;
  color: #000;
}
.global-min .payItem2 p:first-child{
  line-height: 30px;
  font-size: 16px;
  color: #000;
}
.global-max .payItem2 p:first-child span {
  font-size: 22px;
  line-height: 22px;
  padding-left: 12px;
  color: #999;
}
.global-min .payItem2 p:first-child span {
  font-size: 12px;
  line-height: 22px;
  padding-left: 3px;
  color: #999;
}
.global-max .payItem2 p:last-child{
  line-height: 32px;
  font-size: 22px;
  color: #999;
}
.global-min .payItem2 p:nth-child(3){
  line-height: 18px;
  font-size: 12px;
  color: #999;
}
.payItem2:hover p{
  color:#0094ff;
}
.payItem2:hover p span{
  color:#0094ff;
}
.global-max .payItem2 .sepline{
  margin: 10px 5% 0 5%;
  padding-bottom: 15px;
  width: 90%;
}
.global-min .payItem2 .sepline{
  padding: 5px 0;
  width: 100%;
}
.sepline{
  width: 100%;
  height: 0;
  border-top: 1px solid #eee;
  box-sizing: border-box;
}
.global-max .payWay{
  width: 260px;
  margin: 10px 10px 0 10px;
  border-radius: 10px;
  min-width: 200px;
  border: 1px solid #eee;
  display: inline-block;
  box-sizing: border-box;
  text-align: left;
  padding: 20px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  user-select:none;
}
.global-min .payWay{
  width: 260px;
  margin: 6px 10px 0 10px;
  border-radius: 10px;
  min-width: 200px;
  border: 1px solid #eee;
  display: inline-block;
  box-sizing: border-box;
  text-align: left;
  padding: 10px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  user-select:none;
}
.payWay:hover,
.selected {
  border-color: #0094ff !important;
  color: #0094ff !important;
}
.selected p,
.selected p span{
  color: #0094ff !important;
}
.global-max .payWay div{
  font-size: 30px;
  color: #333;
  float:left;
  line-height: 50px;
}
.global-min .payWay div{
  font-size: 16px;
  color: #333;
  float:left;
  line-height: 30px;
}
.payWay:hover div,
.payWaySelected div{
  color: #0094ff;
}
.zfb{
  display:inline-block;
  background-image: url('../../static/image/pay/zfb.png');
  background-size: 100%;
  background-repeat: none;
}
.global-max .zfb{
  margin-right: 15px;
  width: 50px;
  height: 50px;
}
.global-min .zfb{
  margin-right: 23px;
  width: 30px;
  height: 30px;
}
.wx{
  display:inline-block;
  background-image: url('../../static/image/pay/wx.png');
  background-size: 100%;
  background-repeat: none;
}
.global-max .wx{
  width: 50px;
  height: 50px;
  margin-right: 10px;
}
.global-min .wx{
  width: 30px;
  height: 30px;
  margin-right: 23px;
}
.visa{
  display:inline-block;
  background-image: url('../../static/image/pay/visa.png');
  background-size: 100%;
  background-repeat: none;
}
.global-max .visa{
  margin-right: 10px;
  margin-top: 13px;
  width: 71px;
  height: 24px;
}
.global-min .visa{
  margin-right: 10px;
  margin-top: 8px;
  width: 43px;
  height: 15px;
}
.ipay{
  display:inline-block;
  background-image: url('../../static/image/pay/ipay.png');
  background-size: 100%;
  background-repeat: none;
}
.global-max .ipay{
  margin-right: 10px;
  margin-top: 8px;
  width: 53px;
  height: 34px;
}
.global-min .ipay{
  margin-right: 21px;
  margin-top: 5px;
  width: 32px;
  height: 21px;
}
.card{
  display:inline-block;
  background-image: url('../../static/image/pay/card.png');
  background-size: 100%;
  background-repeat: none;
}
.global-max .card{
  margin-right: 10px;
  margin-top: 7px;
  width: 57px;
  height: 36px;
}
.global-min .card{
  margin-right: 21px;
  margin-top: 4px;
  width: 32px;
  height: 22px;
}
.accounts{
  padding: 116px 2% 40px;
  box-sizing: border-box;
  width: 100%;
  margin-top: 10px;
}
.global-max .accounts p {
  font-size: 28px;
  color: #999;
}
.global-max .accounts p span {
  font-size: 40px;
  color: #0094ff;
  padding: 0 10px;
}
.global-min .accounts p {
  font-size: 14px;
  color: #999;
}
.global-min .accounts p span {
  font-size: 20px;
  color: #0094ff;
  padding: 0 10px;
}
.ibg{
  display:none;
}
.selected .ibg{
  display: block;
  background-color:#0094ff;
  transform:  rotate(45deg);
  width:46px;
  height: 26px;
  right:-17px;
  top: -7px;
  position: absolute;
  text-align: center;
  box-shadow: 0 1px 1px #ccc;
}
.i-check{
  font-size: 12px;
  margin-top: 12px;
  transform: rotate(-45deg);
  color: #fff;
}
.global /deep/ .el-menu{
  width: 100%;
}
.global /deep/ .is-active{
  border-bottom-width: 5px;
  color: #0094ff !important;
}
.global-max /deep/ .el-menu-item{
  width: 50%;
  height:90px;
  line-height: 90px;
  text-align: center;
  font-size: 32px;
  color: #333;
}
.global-min /deep/ .el-menu-item{
  width: 50%;
  height:60px;
  line-height: 60px;
  text-align: center;
  font-size: 16px;
  color: #333;
}
.global-max /deep/ .el-button{
  width: 100%;
  height: 100px;
  font-size: 34px;
}
.global-min /deep/ .el-button{
  width: 100%;
  height: 60px;
  font-size: 20px;
}
</style>