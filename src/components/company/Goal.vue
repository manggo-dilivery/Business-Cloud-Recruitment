<template>
  <div class="goal" :class="className">
    <topNav title="公司目标"></topNav>
    <div class="bodyWrap">
      <div class="body">
        <div class="selected">
          <div class="title">
            <span>您已选择的话题</span>
            <span>
              <span>{{selected.length}}</span>/10
            </span>
          </div>
          <ul>
            <li v-for="item in selected" :key="item.id">
              <p @click="unselected(item)">{{item.title}}<i class="el-icon-close"></i></p>
            </li>
          </ul>
        </div>
        <div class="sepline"></div>
        <div class="forSelected">
          <div class="title">点击下方标签可直接添加</div>
          <ul>
            <li v-for="item in allTags" :key="item.id">
              <p class="item1" v-show="item.status===0" @click="setStatus(item)">{{item.title}}</p>
              <p class="item2" v-show="item.status===1" @click="setStatus(item)">{{item.title}}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <el-button type="primary" @click="submit">立即发布</el-button>
  </div>
</template>

<script>
export default {
  data(){
    return {
      tags: [],
      selected: [],
    }
  },
  computed: {
    mode(){
      return this.$store.state.viewMode;
    },
    className(){
      return `goal-${this.$store.state.viewMode}`
    },
    allTags(){
      return this.tags.map(item=>{
        if (this.selected.some(selected => selected.id === item.id)) {
          item.status = 1;
        } else {
          item.status = 0;
        }
        return item;
      })
    }
  },
  methods: {
    submit(){
      alert('a');
      return;
    },
    setStatus(item){
      if (item.status == 0) {
        if (this.selected.length>= 10) return;
        item.status = 1;
        this.selected.push(item);
      } else {
        item.status = 0;
        this.selected = this.selected.filter(slt => slt.title !== item.title);
      }
    },
    unselected(item){
      item.status = 0;
      this.selected = this.selected.filter(slt => slt.title !== item.title);
    }
  },
  created(){
    this.tags = [
      { id: 0, title: '我要投资' },
      { id: 1, title: '招贤纳士' },
      { id: 2, title: '游戏' },
      { id: 3, title: '我要融资' },
      { id: 4, title: '旅游' },
      { id: 5, title: '保险' },
      { id: 6, title: '开发市场' },
      { id: 7, title: '保险' },
      { id: 8, title: '广告营销' },
      { id: 9, title: '电子上午' },
      { id: 10, title: '培训' },
      { id: 11, title: '标签1' },
      { id: 12, title: '标签3456' },
      { id: 13, title: '标签3456243'},
      { id: 14, title: '标签345' },
      { id: 15, title: '标签3' },
      { id: 16, title: '标签34506' },
      { id: 17, title: '广' },
    ];
    this.selected = [
      { id: 1, title: '招贤纳士', status: 1},
      { id: 6, title: '开发市场', status: 1},
      { id: 13, title: '标签3456243', status: 1},
    ]
  }
}
</script>

<style scoped>
.goal {
  background: #efefef;
  width: 100%;
  height: 100%;
  position: relative;
  overflow:hidden;
  font-family: PingFang-SC-Bold;
}
.bodyWrap{
  position: absolute;
  top: 41px;
  bottom: 86px;
  overflow: auto;
  width: 100%;
  background-color: #f1f2f6;
}
.goal-min .bodyWrap{
  bottom: 61px
}
.body{
  position: relative;
  width: 100%;
  height: 100%;
}
.sepline{
  height: 20px;
  width: 100%;
}
.goal-min .sepline{
  height: 10px;
}
.selected {
  padding: 56px 3% 48px;
  background: #ffffff;
}
.goal-min .selected {
  padding: 28px 3% 24px;
}
.selected .title {
  padding-bottom: 14px;
  display: flex;
  justify-content: space-between;
}
.goal-min .selected .title {
  padding-bottom: 7px;
}
.selected .title span:first-child {
  color: #333;
  font-size: 34px;
  line-height: 34px;
}
.goal-min .selected .title span:first-child {
  font-size: 16px;
  line-height: 16px;
}
.selected .title span:last-child {
  font-size: 28px;
  line-height: 34px;
  color: #333;
}
.goal-min .selected .title span:last-child {
  font-size: 14px;
  line-height: 16px;
}
.selected .title span:last-child span {
  color: #0094ff;
}
.selected ul {
  min-height: 102px;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
}
.goal-min .selected ul {
  min-height: 52px;
}
.selected li{
  margin-top: 38px;
  font-size:26px;
  line-height: 26px;
  margin-right: 20px;
  flex: none;
  cursor: pointer;
}
.goal-min .selected li{
  margin-top: 19px;
  font-size:13px;
  line-height: 13px;
  margin-right: 10px;
}
.selected li p{
  border: 1px solid #0094ff;
  border-radius: 10px;
  padding: 18px;
  color: #0094ff;
  background-color: #fff;
}
.goal-min .selected li p{
  border-radius: 6px;
  padding: 9px;
}
.selected li p i{
  margin-left: 20px;
}
.goal-min .selected li p i{
  margin-left: 5px;
}
.selected li p:hover{
  padding: 17px;
  border-width: 2px;
}
.selected li p:hover i {
  font-weight: bold;
}
.goal-min .selected li p:hover{
  padding: 8px;
  border-width: 2px;
}

.forSelected {
  padding: 56px 3% 36px;
  background: #ffffff;
}
.goal-min .forSelected {
  padding: 28px 3% 18px;
}
.forSelected .title {
  padding-bottom: 14px;
  color: #333;
  font-size: 34px;
  line-height: 34px;
}
.goal-min .forSelected .title {
  padding-bottom: 7px;
  font-size: 16px;
  line-height: 16px;
}
.forSelected ul{
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
}
.forSelected li{
  margin-top: 38px;
  font-size:26px;
  line-height: 26px;
  margin-right: 20px;
  flex: none;
  cursor: pointer;
}
.goal-min .forSelected li{
  margin-top:19px;
  font-size: 13px;
  line-height: 13px;
  margin-right: 10px;
}
.forSelected li .item1{
  border: 1px solid #999;
  border-radius: 10px;
  padding: 18px;
  color: #000;
  background-color: #fff;
}
.goal-min .forSelected li .item1{
  border: 1px solid #999;
  border-radius: 6px;
  padding: 9px;
}
.forSelected li .item1:hover{
  color: #0094ff;
  border-color: #0094ff;
}
.forSelected li .item2{
  border: 1px solid #999;
  border-radius: 10px;
  padding: 18px;
  background-color: #eee;
  color: #999;
}
.goal-min .forSelected li .item2{
  border-radius: 6px;
  padding: 9px;
}

.goal /deep/ .el-button{
  width: 100%;
  height: 85px;
  font-size: 34px;
  position: absolute;
  left: 0;
  bottom: 0;
}
.goal-min /deep/ .el-button{
  width: 100%;
  height: 60px;
  font-size: 20px;
}
</style>