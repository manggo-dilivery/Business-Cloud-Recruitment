<template>
  <div class="panel" @click.stop="" v-show="isShow">
    <div class="title">
      <span>职位选择</span>
      <i class="el-icon-error close" @click="isShow=false"></i>
    </div>
    <div class="body">
      <div class="lv1">
        <div class="item" 
          v-for="item1 in datas" 
          :key="item1.lid" 
          v-text="item1.content"
          @click="getlv2(item1)"
          :class="{active: item1.lid===lv1}" >
        </div>
      </div>
      <div class="lv2" v-show="lv2Datas.length">
        <div class="item" 
          v-for="item2 in lv2Datas" 
          :key="item2.lid" 
          v-text="item2.content"
          @click="getlv3(item2)"
          :class="{active: item2.lid===lv2}" >
        </div>
      </div>
      <div class="lv3" v-show="lv3Datas.length">
        <div class="item" 
          v-for="item3 in lv3Datas" 
          :key="item3.lid" 
          v-text="item3.content"
          @click="select(item3)">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      isShow: false,
      lv1: 0,
      lv2: 0,
      lv2Datas: [],
      lv3Datas: []
    }
  },
  props:{
    datas:{
      type: Array,
      default: []
    }
  },
  methods: {
    getlv2(item1){
      this.lv1 = item1.lid;
      this.lv2Datas = item1.children;
      this.lv3Datas = [];
    },
    getlv3(item2){
      this.lv2 = item2.lid;
      this.lv3Datas = item2.children;
    },
    select(item3){
      this.$emit('select', item3.content);
      this.isShow = false;
    }
  }
}
</script>

<style scoped>
.panel{
  background-color: #fff;
  width: 600px;
  height: 620px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -300px;
  margin-top: -310px;
  z-index: 100;
  box-shadow: 5px 5px 10px #888;
  border: 2px solid #ccc;
  box-sizing: border-box;
  border-radius:10px;
  font-family: PingFang-SC-Bold;
}
.title{
  height: 40px;
  line-height: 40px;
  width: 100%;
  text-align: center;
  color: #fff;
  font-size: 16px;
  font-weight: 400;
  background-color: #0094ff;
  border-top-left-radius: 9px;
  border-top-right-radius: 9px;
  position: relative;
}
.close {
  position: absolute;
  top:12px;
  right: 10px;
  cursor: pointer;
}
.body{
  clear:both;
  float: left;
  padding:20px;
  width: 100%;
  height: calc(100% - 40px);
  box-sizing: border-box;
}
.lv1{
  float: left;
  width: 30%;
  height: 100%;
  max-width: 150px;
  padding: 0 10px;
  border-right: 1px solid #eee;
  overflow-x: hidden;
  overflow-y: auto;
}
.lv2{
  float:left;
  width: 30%;
  height: 100%;
  max-width: 150px;
  padding: 0 10px;
  border-right: 1px solid #eee;
  overflow-x: hidden;
  overflow-y: auto;
}
.lv3{
  float:left;
  padding: 0 10px;
  overflow-x: hidden;
  overflow-y: auto;
  width: 40%;
}
.item{
  line-height: 22px;
  font-size: 14px;
  cursor: pointer;
  color: #333;
  width: 100%;
  padding-bottom: 1px;
  padding-left: 10px;
  box-sizing: border-box;
  text-overflow: ellipsis;
  overflow: hidden;
}
.item:hover,
.active{
  color: #0094ff;
  padding-bottom: 0;
  border-bottom: 1px solid #0094ff;
}
</style>