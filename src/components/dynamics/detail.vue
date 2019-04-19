<template>
  <div class="detail">
    <topNav title="头条详情">
      <!--<img slot="left" @click="goBack" src="@/static/image/login/arr.png" alt="">-->
    </topNav>
    <div class="title">
      <div class="titleText" v-text="detailInfo.content"></div>
      <div class="titleDesc">
        <div class="left" v-text="time"></div>
        <div class="right" v-text="visit"></div>
      </div>
    </div>
    <div class="imgs" v-if="detailInfo.imageList && detailInfo.imageList.length" >
      <img v-for="img in detailInfo.imageList" :src="baseImgUrl + img.image" :key="img.iid" />
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      baseImgUrl: 'http://52.69.229.171/business/image?image=',
      detailInfo: {}
    }
  },
  computed:{
    time:function(){
      if (this.detailInfo.time) {
        return this.getTime(this.detailInfo.time);
      } 
      
      return ''
    },
    visit:function(){
      return `${this.detailInfo.read}人阅读`
    }
  },
  created(){
    this.$axios.get(`/business/news/getInfo/${this.$route.params.id}`)
      .then(res=>{
        this.detailInfo = res.data.data;
      })
      .catch(err=>console.warn(err))
  },
  methods: {
    getTime(time){
      const reg = /(\d{0,2})月|(\d{0,2})天|(\d{0,2})小时|(\d{0,2})分|(\d{0,2})秒/g;
      let arr = time.match(reg);
      return arr.length ? arr[0] + '前': '刚刚';
    }
  }
}
</script>

<style scoped>
.detail /deep/ .mintui-back{
  cursor: pointer;
}
.detail{
  background: #fff;
  height:100%;
  font-family: PingFang-SC-Bold;
  overflow:auto;
}
.title{
  width: 100%;
  padding: 20px 20px 40px;
  margin-top:40px;
  box-sizing: border-box;
  text-align: left;
  
}
.titleText{
  width: 100%;
  font-size: 24px;
  line-height: 30px;
  word-break: break-all;
  font-weight: bold;
}
.titleDesc{
  padding-top: 30px;
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.titleDesc div{
  color: #999;
  font-size: 14px;
  line-height:20px;
}
.imgs{
  width: 100%;
  box-sizing: border-box;
  padding: 0 20px 40px;
}
.imgs img {
  width: 100%;
  display: block;
  padding-top: 10px;
}
</style>