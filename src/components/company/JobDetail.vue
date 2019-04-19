<template>
  <div class="job" :class="className">
    <topNav title="公司目标"></topNav>
    <div class="bodyWrap">
      <div class="body">
        <div class="content">
          <div class="title">
            <span>UI设计</span>
            <span>15K-30K</span>
          </div>
          <div class="descb">
            <span>南京 · 浦口</span>
            <span>1-3年</span>
            <span>大专</span>
          </div>
        </div>
        <div class="content">
          <img class="header" src="@/static/image/chat/portrait.jpeg" alt="">
          <div class="userInfo">
            <p>
              <span>雪景</span>
              <span>2分钟前</span>
            </p>
            <p>
              <span>南京快乐大本营科技</span>
              <span>·</span>
              <span>执行人事</span>
            </p>
          </div>
        </div>
        <div class="content">
          <div class="subTitle">职位描述</div>
          <ul>
            <li v-for="(item,index) in arr" :key="index">
              <p>{{item}}</p>
            </li>
          </ul>
        </div>
        <div class="content">
          <div class="subTitle">岗位职责</div>
          <p class="responsibility">1、3年以上交互设计经验，具有PC端和APP产品教育设计经验。</p>
          <p class="responsibility">2、3年以上交互设计经验，具有PC端和APP产品教育设计经验。</p>
          <p class="responsibility">3、3年以上交互设计经验，具有PC端和APP产品教育设计经验。</p>
        </div>
        <div class="content">
          <div class="subTitle">工作地点</div>
          <p class="workAddress">南京市雨花区科技创城科创成科创</p>
        </div>
        <div class="content company">
          <div class="subTitle">公司介绍</div>
          <p class="companyName">南京你好自动化系统有限公司</p>
          <p>
            <span>100-500人</span>
            <span>上市公司</span>
          </p>
          <p>
            <span>公司网址：www.nihao.com</span>
          </p>
        </div>
        <div class="content memo">
          <p>在了解进阶的应用之前，先来了解一下语法规则。平常仅仅需要将这两个伪元素用于添加一些自定义字符时，只需使用伪类使用的单冒号写法，以保证浏览器的兼容性：
            p:before  {}
            不过，在 CSS3 中为了区别伪元素和伪类为伪元素使用了双冒号，因此如果使用了 display 或者 width 等属性时使得显示脱离了原本元素后，建议按照标准双写。过于老的浏览器可能会存在支持问题，不过伪元素大多是配合 CSS3 使用，就无所谓向下兼容了：
            img::after {}这两个伪类下特有的属性 content ，用于在 CSS 渲染中向元素逻辑上的头部或尾部添加内容。注意这些添加不会改变文档内容，不会出现在 DOM 中，不可复制，仅仅是在 CSS 渲染层加入。比较有用的是以下几个值：
          </p>
        </div>
        <el-button type="primary" @click="talk">极速沟通</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      arr: []
    }
  },
  computed: {
    mode(){
      return this.$store.state.viewMode;
    },
    className(){
      return `job-${this.$store.state.viewMode}`
    },
  },
  created(){
    this.arr = ['本科以上','本科以上','本科以上','本科以上','本科以上','本科以上']
  },
  methods: {
    talk(){
      alert('talk');
    }
  }
}
</script>

<style scoped>
.job {
  background: #efefef;
  width: 100%;
  height: 100%;
  position: relative;
  overflow:hidden;
  font-family: PingFang-SC-Medium;
}
.bodyWrap{
  position: absolute;
  top: 41px;
  bottom: 0;
  overflow: auto;
  width: 100%;
  background-color: #f1f2f6;
}
.body{
  position: relative;
  width: 100%;
  background-color: #fff;
}
.content{
  padding: 62px 0 48px;
  margin: 0 3%;
  border-bottom: 1px solid #eee;
  position:relative;
}
.job-min .content{
  padding: 31px 0 24px;
  margin: 0 3%;
  border-bottom: 1px solid #eee;
  position:relative;
}
.title {
  display: flex;
  justify-content: space-between;
}
.title span{
  line-height: 56px;
  font-size: 56px;
  color: #333;
  font-family: PingFang-SC-Bold;
}
.job-min .title span{
  line-height: 28px;
  font-size: 28px;
}
.title span:last-child{
  line-height: 30px;
  font-size: 30px;
  color: #0094ff;
  padding-top:18px;
}
.job-min .title span:last-child{
  line-height: 16px;
  font-size: 16px;
  padding-top:12px;
}
.descb {
  padding-top: 40px;
  position: relative;
}
.job-min .descb {
  padding-top: 20px;
}
.descb span {
  color: #666;
  font-size: 28px;
  margin-right: 47px;
  padding-left: 30px;
}
.job-min .descb span {
  font-size: 14px;
  margin-right: 24px;
  padding-left: 15px;
}
.descb span:first-child::before {
  content: url('../../static/image/company/address.png');
  position: absolute;
  left: 0;
  top: 44px;
}
.job-min .descb span:first-child::before {
  content: '';
  position: absolute;
  width: 11px;
  height: 14px;
  background-image: url('../../static/image/company/address.png');
  background-size: 100% 100%;
  left: 0;
  top: 24px;
}
.descb span:nth-child(2)::before {
  content: url('../../static/image/company/work.png');
  position: absolute;
  left: 214px;
  top: 42px;
}
.job-min .descb span:nth-child(2)::before {
  content: '';
  position: absolute;
  width: 14px;
  height: 13px;
  background-image: url('../../static/image/company/work.png');
  background-size: 100% 100%;
  left: 108px;
  top: 24px;
}
.descb span:nth-child(3)::before {
  content: url('../../static/image/company/education.png');
  position: absolute;
  left: 360px;
  top: 42px;
}
.job-min .descb span:nth-child(3)::before {
  content: '';
  position: absolute;
  width: 18px;
  height: 13px;
  background-image: url('../../static/image/company/education.png');
  background-size: 100% 100%;
  left: 183px;
  top: 24px;
}
.content .header{
  width: 96px;
  height: 96px;
  border-radius: 50%;
}
.job-min .content .header{
  width: 48px;
  height: 48px;
  border-radius: 50%;
}
.userInfo{
  position: absolute;
  top: 62px;
  left: 128px;
}
.job-min .userInfo{
  top: 31px;
  left: 64px;
}
.userInfo p:first-child span:first-child{
  font-size: 34px;
  color: #333;
  font-family: PingFang-SC-Bold;
}
.job-min .userInfo p:first-child span:first-child{
  font-size: 17px;
}
.userInfo p:first-child span:last-child{
  font-size: 24px;
  color: #a3a3a3;
  padding-top: 10px;
  margin-left: 2px;
  font-family: PingFang-SC-Regular;
}
.job-min .userInfo p:first-child span:last-child{
  font-size: 12px;
  padding-top: 4px;
  margin-left: 2px;
}
.userInfo p:last-child span{
  font-size: 30px;
  margin-top: 20px;
  color: #666;
}
.job-min .userInfo p:last-child span{
  font-size: 14px;
  margin-top: 10px;
}
.userInfo p:last-child span:nth-child(2){
  padding-left: 16px;
  padding-right: 16px;
}
.job-min .userInfo p:last-child span:nth-child(2){
  padding-left: 6px;
  padding-right: 6px;
}
.subTitle{
  font-size: 34px;
  color: #333;
  font-family: PingFang-SC-Bold;
}
.job-min .subTitle{
  font-size: 17px;
}
ul{
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  margin-top: 32px;
  padding-bottom: 10px;
}
.job-min ul{
  margin-top: 16px;
  padding-bottom: 5px;
}
li{
  margin-top: 16px;
  font-size:26px;
  line-height: 26px;
  margin-right: 26px;
  flex: none;
  cursor: default;
}
.job-min li {
  margin-top: 8px;
  font-size: 13px;
  line-height: 13px;
  margin-right: 13px;
}
li p{
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px 16px;
  color: #666;
  background-color: #fff;
}
.job-min li p{
  padding: 5px 8px;
}
.responsibility{
  margin-top: 48px;
  font-size: 30px;
  color: #333;
}
.job-min .responsibility{
  margin-top: 24px;
  font-size: 15px;
  color: #333;
}
.content .responsibility:last-child{
  padding-bottom: 10px;
}
.job-min .content .responsibility:last-child{
  padding-bottom: 5px;
}
.content .workAddress{
  color: #666;
  font-size: 28px;
  padding: 24px 0 2px;
}
.job-min .content .workAddress{
  font-size: 14px;
  padding: 12px 0 1px;
}
.company .companyName{
  font-size: 32px;
  color: #333;
  margin-top: 32px;
}
.job-min .company .companyName{
  font-size: 16px;
  margin-top: 16px;
}
.company p:nth-child(3){
  margin-top: 20px;
}
.job-min .company p:nth-child(3){
  margin-top: 10px;
}
.company p:last-child{
  margin-top: 10px;
}
.job-min .company p:last-child{
  margin-top: 5px;
}
.company p span {
  color: #999;
  font-size: 30px;
  margin-right: 60px;
}
.job-min .company p span {
  font-size: 15px;
  margin-right: 30px;
}
.memo {
  padding: 44px 0 54px;
}
.job-min .memo {
  padding: 22px 0 27px;
}
.memo p{
  font-size: 30px;
  color: #333;
  line-height: 50px;
}
.job-min .memo p{
  font-size: 14px;
  line-height: 26px;
}

.job /deep/ .el-button{
  width: 100%;
  height: 85px;
  font-size: 34px;
}
.job-min /deep/ .el-button{
  width: 100%;
  height: 60px;
  font-size: 20px;
}
</style>