<template>
  <div :class="commentClass" v-show="commentChild !== null" @click.stop="showEmoji=false" ref="commentWindow">
    <el-form ref="form" label-width="0">
      <el-form-item label="">
        <el-input type="textarea" ref="textarea" autofocus="true" v-model="comment" :placeholder="commentDefaultText" :rows="commentMode==='max'?10:6"></el-input>
      </el-form-item>
      <el-form-item class="controlLine">
        <a href="javascript:;" :class="[showEmoji ? 'xw-face' :'xw-face-close','xw-chat-tool-btn']" @click.stop="emojiFuc"></a>
        <el-button type="primary" @click="sendComment" :size="commentMode==='max'?'medium':'small'">评论</el-button>
        <div class="facePanel" @click.stop="" v-show="showEmoji">
          <div class="faceContent">
            <ul>
              <li v-for="(item, index) in emojiArr" class="xw-faceEmoji" :key="index">
                <img :src="item.url" @click="chooseEmoji(item)">
              </li>
            </ul>
          </div>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data(){
    return {
      comment: '',
      showEmoji: false
    }
  },
  computed:{
    commentMode(){
      return this.$store.state.viewMode;
    },
    commentClass(){
      return `commentWindow-${this.commentMode}`;
    },
    commentDefaultText(){
      return this.cItem ? `回复 ${this.cItem.userName}：` : '回复内容'
    },
    currentUserInfo(){
      return JSON.parse(localStorage.getItem("loginInfo"));
    },
    ...mapState([
      'emoji',
      'emojiArr'
    ])
  },
  props: {
    commentChild: {
      type: Object
    },
    cItem: {
      type: Object
    }
  },
  watch:{
    isShow(val){
      this.$nextTick(()=>{
        if (val) {
          this.$refs.textarea.focus();
        }else{
          this.$refs.textarea.blur();
        }
      })
    }
  },
  methods: {
    sendComment(){
      if (this.cItem) {
        this.replayComment();
      } else  {
        this.addComment();
      }
    },
    addComment(){
      let comment = encodeURIComponent(this.comment.trim());      
      this.$axios.post(`/business/newsComment/save?comment=${comment}&nid=${this.commentChild.item.nid}&type=1&uid=${this.currentUserInfo.uid}`)
        .then(res=>{
          let resData = res.data;
          if (resData.code === 200) {
            this.$emit('close', resData.data[resData.data.length-1]);
            this.comment = '';
            this.$message({
              type: 'success',
              message: '评论成功!'
            });
          }
        })
    },
    replayComment(){
      let comment = encodeURIComponent(this.comment.trim());
      let url = `/business/newsComment/save?comment=${comment}&nid=${this.commentChild.item.nid}&type=2&nuid=${this.cItem.uid}&uid=${this.currentUserInfo.uid}`;
      this.$axios.post(url)
        .then(res=>{
          let resData = res.data;
          if (resData.code === 200) {
            this.$emit('close', resData.data[resData.data.length-1]);
            this.comment = '';
            this.$message({
              type: 'success',
              message: '回复成功!'
            });
          }
        })
    },
    emojiFuc(){
      this.showEmoji = !this.showEmoji;
    },
    chooseEmoji(item){
      this.comment += item.key;
      this.$refs.textarea.focus();
      this.showEmoji = false;
    },
  },
}
</script>

<style scoped>
.commentWindow-max{
  background-color: #fff;
  width: 600px;
  height: 320px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -300px;
  margin-top: -160px;
  z-index: 100;
  box-shadow: 5px 5px 10px #888;
  border: 2px solid #ccc;
  padding: 20px;
  box-sizing: border-box;
  border-radius:10px;
}
.commentWindow-min{
  background-color: #fff;
  width: 300px;
  height: 225px;
  margin-left: -150px;
  margin-top: -200px;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 100;
  box-shadow: 5px 5px 10px #888;
  border: 2px solid #ccc;
  padding: 20px;
  box-sizing: border-box;
  border-radius:10px;
}
.el-button--primary{
  float:right;
}
.xw-chat-tool-btn{
  display: inline-block;
  height: 28px;
  margin:2px 0;
}
.controlLine{
  position: relative;
}
.commentWindow-max .facePanel{
  position: absolute;
  width: 400px;
  height: 190px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  left: 40px;
  top: 0;
  padding: 10px 19px;
}
.commentWindow-min .facePanel{
  position: absolute;
  width: 200px;
  height: 130px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  left: 40px;
  top: -10px;
  padding: 10px 19px;
  overflow-y:auto;
  overflow-x:none;
}
ul li{
  width: 30px;
  height: 30px;
  margin: 5px;
}
.commentWindow-min ul li {
  margin: 4px;
}
ul li img {
  cursor: pointer;
}

</style>