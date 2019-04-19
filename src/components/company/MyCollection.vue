<template>
  <div class="collection" :class="className">
    <topNav title="我的收藏"></topNav>
    <div class="body">
      <div class="lineWrap">
        <div class="line" v-for="item in collections" :key="item.cid">
          <div class="left">
            <img :src="baseImgUrl + item.portrait" alt="">
            <div class="infos">
              <div class="title" v-text="item.nickname"></div>
              <div class="position" v-text="item.position"></div>
            </div>
          </div>
          <div class="right">
            <el-button type="primary" v-show="item.status == 1" @click='addFriend(item)' >+好友</el-button>
            <div v-show="item.status == 0">已添加</div>
            <div v-show="item.status == 2">已申请</div>
            <el-button type="primary" @click='removeCollection(item)'>取消收藏</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      baseImgUrl: 'http://52.69.229.171/business/image?image=',
      collections: [],
      page: 1,
      size: 100
    }
  },
  methods: {
    saveCollection(item, status){
      return new Promise((resolve, reject)=>{
        let url = `/business/collection/save?cid=${item.cid}&createTime=${encodeURIComponent(item.createTime)}&fid=${item.fid}&fim=${item.fim}&nickname=${encodeURIComponent(item.nickname?item.nickname:'')}&portrait=${encodeURIComponent(item.portrait)}&position=${encodeURIComponent(item.position)}&uid=${item.uid}&status=${status}`;
        console.log(url);
        this.$axios.post(url)
          .then(res=>{
            if (res.data.code == 200) {
              resolve();
            } else {
              reject(res.data.message)
            }
          })
          .catch(err=>reject(err));
      })
    },
    aFriend(fim){
      return new Promise((resolve, reject) => {
        let url = `/business/friends/user/${this.currentUserInfo.im}/friend/${fim}`;
          this.$axios.post(url)
            .then(res=>{
              if (res.data.code == 200) {
                resolve();
              } else {
                reject(res.data.message)
              }
            })
            .catch(err=>reject(err));
      })
    },
    rFriend(fim){
      return new Promise((resolve, reject) => {
        let url = `/business/friends/user/${this.currentUserInfo.im}/friends/${fim}`;
          this.$axios.delete(url)
            .then(res=>{
              if (res.data.code == 200) {
                resolve();
              } else {
                reject(res.data.message)
              }
            })
            .catch(err=>reject(err));
      })
    },
    addFriend(item){
      Promise.all([this.aFriend(item.fim), this.saveCollection(item, 0)])
        .then(res=>{
          item.status = 2;
        })
        .catch(err=>console.warn(err))
    },
    removeFriend(item){
      Promise.all([this.rFriend(item.fim), this.saveCollection(item, 1)])
        .then(res=>{
          item.status = 1;
        })
        .catch(err=>console.warn(err))
    },
    removeCollection(item){
      let url = `/business/collection/remove/${item.cid}`;
      this.$axios.delete(url)
        .then(res=>{
          if (res.data.code == 200) {
            this.collections = this.collections.filter(col => col.cid !== item.cid);
          } else {
            this.$message({
              message: res.data.message,
              type: 'error'
            });
            console.warn(res.data.message);
          }
        })
        .catch(err=>console.warn(err));
    },
  },
  computed: {
    mode(){
      return this.$store.state.viewMode;
    },
    className(){
      return `collection-${this.$store.state.viewMode}`
    },
    currentUserInfo(){
      return JSON.parse(localStorage.getItem("loginInfo"));
    },
  },
  created(){
    this.$axios.get(`/business/collection/page?page=${this.page}&size=${this.size}`)
      .then(res=>{
        this.collections = res.data.data;
      })
      .catch(err=>console.warn(err));
  }
}
</script>

<style scoped>
.collection {
  background: #fff;
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
.lineWrap{
  clear:both;
  float: left;
  padding-left: 3%;
  width: 100%;
}
.line{
  width: 100%;
  border-bottom: 1px solid #eee;
  padding-top:30px;
  padding-bottom: 29px;
  padding-right: 3%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
}
.collection-min .line {
  padding-top:5px;
  padding-bottom: 4px;
}
.line .left{
  position: relative;
  width: 70%;
}
.collection-min .left{
  padding-top: 10px;
  padding-bottom: 10px;
}
.line .left img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
.collection-min .line .left img{
  width: 50px;
  height: 50px;
}
.line .left .infos {
  position: absolute;
  left: 110px;
  top: 0;
}
.collection-min .line .left .infos{
  left: 60px;
}
.infos .title {
  height: 60px;
  line-height: 60px;
  font-size: 30px;
  color: #000;
}
.collection-min .infos .title {
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  color: #000;
}
.infos .position {
  height: 40px;
  line-height: 40px;
  font-size: 26px;
  color: #999;
}
.collection-min .infos .position {
  height: 20px;
  line-height: 20px;
  font-size: 14px;
  color: #999;
}
.line .right{
  width: 30%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.collection /deep/ .mintui-back{
  cursor: pointer;
}
.collection /deep/ .el-button--primary {
  border: 2px solid #0094ff;
  color: #0094ff;
  background-color: #fff;
  width: 150px;
  box-sizing: border-box;
  font-size: 28px;
  border-radius: 28px;
  margin-right: 20px;
}
.collection-min /deep/ .el-button--primary{
  font-size: 14px;
  width: 100px;
  padding: 5px 10px;
  box-sizing: border-box;
}
.collection /deep/ .el-button--primary:hover {
  border: 2px solid #0094ff;
  color: #0094ff;
}
.right div {
  float:left;
  border: 2px solid #ddd;
  color: #999;
  background-color: #fff;
  box-sizing: border-box;
  font-size: 28px;
  border-radius: 28px;
  margin-right: 20px;
  width: 150px;
  text-align: center;
  line-height: 52px;
  cursor: default;
}
.collection-min /deep/ .right div{
  font-size: 14px;
  width: 100px;
  padding: 5px 10px;
  box-sizing: border-box;
  line-height:14px;
}
</style>