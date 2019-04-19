<template>
  <div class="item" :class="{currentItem: isCommenting, defaultItem: !isCommenting}" ref='dynamicsItem'>
    <div class="itemTop">
      <img :src="baseImgUrl + item.portrait" alt="" v-if="item.portrait">
      <img src="@/static/image/chat/portrait.jpeg" alt="" v-else>
      <div class="userContent">
        <p v-text="item.userName"></p>
        <p v-text="item.position"></p>
      </div>
    </div>
    <p class="itemContent" v-text="item.content"></p>
    <div class="itemImage" v-if="item.imageList && item.imageList.length">
      <img :src="baseImgUrl + img.image" alt="" v-for="img in item.imageList" :key="img.iid" v-show="img.image" @click.stop="showImg(img.image)">
    </div>
    <div class="icon">
      <img src="@/static/image/chat/comment.png" alt="" @click.stop="show">
      <div class="iconOption" v-show="isShow">
        <div class="iconItem" style="margin:0 30px 0 24px;" @click="pride">
          <img src="@/static/image/chat/pride2.png" alt="">
          <p>{{prideText}}</p>
        </div>
        <div class="iconItem" @click.stop="comment">
          <img src="@/static/image/chat/pl.png" alt="">
          <p>评论</p>
        </div>
      </div>
    </div>
    <img class="jianjiao" v-if="applaudList.length || commentList.length" src="@/static/image/chat/jianjiao.png" alt="">
    <div class="comment" v-if="applaudList.length || commentList.length">
      <div class="history" v-if="applaudList.length">
        <img src="@/static/image/chat/pride.png" alt="">
        <p v-for="(aItem,index) in applaudList" :key="aItem.aid" >
          <span v-text="aItem.userName"></span>
          <span v-if="index!==applaudList.length-1">,</span>
        </p>
      </div>
      <div class="commentContent" v-if="commentList.length" ref="commentContent">
          <div v-for="cItem in commentList" :key="cItem.cid" @click.stop="reply(cItem)">
            <div v-if="cItem">
              <p v-if="!cItem.nuid">
                <span v-text="cItem.userName"></span>
                ：
                <span v-html="handleMsg(cItem.comment)"></span>
                <a v-if="cItem.uid===currentUserInfo.uid" href="/" @click.prevent.stop="deleteCommentItem(cItem.cid)">删除</a>
              </p>
              <p v-else>
                <span>{{cItem.userName}} 回复 {{cItem.nuserName}}</span>
                ：
                <span v-html="handleMsg(cItem.comment)"></span>
                <a v-if="cItem.uid===currentUserInfo.uid" href="/" @click.prevent.stop="deleteCommentItem(cItem.cid)">删除</a>
              </p>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  props: {
    item: {
      type: Object,
      default: {}
    },
    showCPanel: {
      type: Boolean,
      default: true
    }
  },
  data(){
    return {
      baseImgUrl: 'http://52.69.229.171/business/image?image=',
      isShow: false,
      prideText: '点赞',
      applaudList: [],
      commentList: [],
      isCommenting: false
    }
  },
  computed: {
    currentUserInfo(){
      return JSON.parse(localStorage.getItem("loginInfo"));
    },
    ...mapState([
      'emoji',
      'emojiArr'
    ])
  },
  created(){
    this.applaudList = this.item.applaudList || [];
    this.commentList = this.item.commentList || [];
  },
  methods: {
    stopParent(){

    },
    show(){
      let prided = this.applaudList.some((item)=>item.uid === this.currentUserInfo.uid);
      this.prideText = prided ? '取消' : '点赞';

      this.isShow = !this.isShow;
      this.isShow && this.$emit('setChild', this);
    },
    hide(){
      this.isShow = false;
    },
    pride(){
      let prided = this.applaudList.some((item)=>item.uid === this.currentUserInfo.uid);
      prided ? this.cancelPride() : this.doPride();
    },
    doPride(){
      this.$axios.get(`/business/news/applaud/${this.item.nid}?uid=${this.currentUserInfo.uid}`)
        .then(res=>{
            if(res.data.code === 200) {
              this.applaudList.push({
                "aid": Math.random(),
                "uid": this.currentUserInfo.uid,
                "userName": this.currentUserInfo.name,
                "nid": this.item.nid,
                "applaud": 1
              })
            }
        })
        .catch(err => console.warn(err));
    },
    cancelPride() {
      this.$axios.get(`/business/news/applaud/${this.item.nid}?uid=${this.currentUserInfo.uid}`)
        .then(res=>{
            this.applaudList = this.applaudList.filter(item=>item.uid!==this.currentUserInfo.uid);
        })
        .catch(err => console.warn(err));
    },
    comment(){
      this.$emit('showCommentPanel', this);
      this.isShow = false;
      this.isCommenting = true;
    },
    reply(cItem){
      this.$emit('showCommentPanel', this, cItem);
      this.isShow = false;
      this.isCommenting = true;
    },
    deleteCommentItem(cid){
      this.$confirm('您正试图删除评论内容, 是否继续?', '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning'
        }).then(() => {
          this.$axios.delete(`/business/newsComment/remove/${cid}`)
            .then(res=>{
              if (res.data.code === 200) {
                commentList = commentList.filter(cItem=>cItem.cid!==cid);
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
              }
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });      
    },
    handleMsg (msg) {
      if (!msg) {
        return;
      }
      if (msg.toString().indexOf('[') > -1) {
        let exps = /\[[^\[\]]+\]/g;
        let params = msg.match(exps);
        for(let item of params){
          msg = msg.replace(item, `<img src="${this.emoji[item]}" width="20" height="20" alt="" />`);
        }
      }
      return msg;
    },
    showImg(imgUrl){
      this.$emit('showImg', imgUrl);
    }
  }
}
</script>

<style scoped>
.item{
  width:100%;
  padding: 10px 5% 20px 5%;
  margin-top:10px;
  background: #fff;
}
.currentItem{
  background: rgba(0, 148, 255, 0.2);
}
.defaultItem{
  background: #fff;
}
.itemTop{
  display: flex;
  padding: 5% 0;
}
.itemTop img{
  width:40px;
  height: 40px;
  border-radius:50%;
  margin-right:10px;
}
.userContent{
  margin: 0;
}
.userContent p:first-child{
  font-size: 15px;
  color:#000;
  font-weight: bold;
}
.userContent p:last-child{
  font-size:12px;
  color:#999;
  margin-top:5px;
  letter-spacing: 1px;
}
.itemContent{
  width:100%;
  word-break: break-all;
  padding-left: 40px;
  box-sizing: border-box;
}
.itemImage{
  display: flex;
  flex-wrap: wrap;
  width:100%;
  padding-left: 40px;
  box-sizing: border-box;
}
.itemImage img{
  width: 100px;
  height: 100px;
  margin-right: 10px;
  margin-top: 10px;
  cursor: pointer;
  padding: 4px;
}
.itemImage img:hover{
  padding: 0;
  border: 4px solid #0094ff;
  border-radius: 4px;
}
.icon{
  width:90%;
  margin-left: 10%;
  display: flex;
  justify-content: flex-end;
  margin-top:10px;
  position: relative;
  cursor: pointer;
}
.icon img{
  width:20px;
  height: 15px;
}
.iconOption{
  position: absolute;
  background: #4c5154;
  width:180px;
  display: flex;
  border-radius: 8px;
  padding: 10px 0;
  right:8%;
  top:-14px;
}
.iconItem{
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.iconItem img{
  width:22px;
  height: 20px;
  margin-right: 7px;
}
.iconItem p{
  color:#fff;
}
.jianjiao{
  width:12px;
  height: 12px;
  margin-left:15%;
  display: block;
  margin-bottom: -2px;
}

.comment {
  background: #f3f3f6;
  width:90%;
  margin-left: 10%;
  padding: 10px 0;
  border-radius: 10px;
}
.history{
  display: flex;
  flex-wrap: wrap;
  width:90%;
  margin:0 auto;
  padding: 0;
  border-bottom:1px solid #eee
}
.history img{
  width:20px;
  height: 20px;
  margin-right: 10px;
}
.history p{
  color:#0094ff;
}
.history p span{
  color:#333;
}
.commentContent{
  width:95%;
  margin-left:4%;
  padding-bottom: 10px;
}
.commentContent div:hover {
  background: #d3d3d6;
  cursor: pointer;
}
.commentContent p{
  text-align: justify;
  margin-top:5px;
}
.commentContent span {
  line-height: 20px;
}
.commentContent span:first-child{
  color:#0094ff;
}
.commentContent a{
  font-size: 12px;
  color:#0094ff;
}
.commentContent a:hover{
  font-size: 12px;
  text-decoration: underline;
  color: #f00
}
</style>