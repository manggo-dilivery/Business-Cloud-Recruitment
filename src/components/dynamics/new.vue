<template>
  <div class="new">
    <mt-header fixed title="发布动态">
        <router-link to="/" slot="left" class="leftBtn">
            <mt-button @click.native="handleClick" icon="back"></mt-button>
        </router-link>
        <span slot="right" class='rightBtn' @click="publish">发表</span>
    </mt-header>
    <div class="form">
      <div class="content">
        <el-input type="textarea" :rows="10" autofocus="true" placeholder="请输入动态内容" v-model="content"></el-input>
        <el-upload ref="fileUploader"
          action="http://52.69.229.171/business/upload"
          list-type="picture-card"
          :file-list="files"
          :before-upload="beforeUpload"
          :on-preview="handlePictureCardPreview"
          :on-success="handleSuccess"
          :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
        <div class="radioGroup">
          <template>
            <el-radio-group v-model="rule">
              <el-radio :label="'all'">所有人可见</el-radio>
              <el-radio :label="'concat'">仅联系人可见</el-radio>
            </el-radio-group>
          </template>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      content: '',
      dialogImageUrl: '',
      dialogVisible: false,
      imgList: [],
      files: [],
      header: {'Content-Type':'multipart/form-data'},
      acceptList: ['jpg','png','gif','jpeg'],
      maxCount: 9,
      rule: 'all'
    }
  },
  computed: {
    currentUserInfo(){
      return JSON.parse(localStorage.getItem("loginInfo"));
    }
  },
  methods:{
    handleClick(){
      this.$router.go('-1')
    },
    beforeUpload(file){
      if (this.imgList.length >= this.maxCount) {
        this.$message({
          message: `上传图片已经达到最大数量${this.maxCount}个。`,
          showClose: true,
          type: 'warning'
        })
        return false;
      }

      let reg = /(?=.)\w*$/;
      let results = file.name.match(reg);
      if (results.length > 0){
        let postfix = results[0];
        let result = this.acceptList.some(item=>item===postfix)
        if (!result) {
          this.$message.error({
            message: `文件类型错误，目前支持的格式：${this.acceptList.toString()}`,
            showClose: true
          })
        }
        return result;
      }

      return false;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleSuccess(e, file, fileList) {
      this.imgList.push(file.response.data);
    },
    handleRemove(file, fileList){
      if (file.response)
        this.imgList = this.imgList.filter(item => item !== file.response.data);
    },
    publish(){
      if (this.content === "" && this.imgList.length === 0) {
        this.$message.error({
          message: `请填写内容`,
          showClose: true
        })
        return;
      }

      let uid = this.currentUserInfo.uid;
      let url = `/business/news/save?uid=${uid}&content=${encodeURIComponent(this.content.trim())}&visible=${this.rule}`;

      if (this.imgList.length) {
        let imgs = this.imgList.length ? this.imgList[0] : '';
        url = `${url}&images=${imgs}`;
      }
      this.imgList.forEach(img=>{
        url = `${url}&imageList=${img}`;
      })

      this.$axios.post(url, { imageList: this.imgList})
        .then(res=>{
          let resData = res.data;
          if (resData.code === 200) {
            this.$router.push({ name: 'animated'});
          } else {
            this.$message.error({
              message: resData.message,
              showClose: true
            })
          }
        })
    }
  }
}
</script>

<style scoped>
.new {
  background: #fff;
  position: relative;
  width: 100%;
  height: 100%;
  overflow:hidden;
  font-family: PingFang-SC-Bold;
}
.mint-header{
  background-color: #fff;
}
.new /deep/ .mintui-back,
.new /deep/ .rightBtn{
  cursor: pointer;
}
.new /deep/ .mint-header .is-left,
.new /deep/ .mint-header .mint-header-title {
  color: #000;
}
.new /deep/ .mint-header .is-right {
  color: #0094ff;
}
.form{
  position: absolute;
  top: 41px;
  bottom: 0;
  padding: 0 20px;
  width: 100%;
  overflow-x:hidden;
  overflow-y:auto;
  box-sizing: border-box;
}
.content {
  padding-bottom: 20px;
}
.new /deep/ .is-textarea {
  background: none;
  padding:10px 20px 20px 20px;
}
.new /deep/ .mint-cell-wrapper{
  background: none;
}
.new /deep/ textarea {
  width: 100%;
  font-size: 16px;
  line-height: 20px;
}
.new /deep/ .el-upload{
  width: 120px;
  height: 120px;
  margin-top: 20px;
  line-height: 120px;
}
.new /deep/ .el-upload-list__item{
  width: 120px;
  height: 120px;
  margin-top:20px;
}
.radioGroup{
  margin-top:20px;
}
</style>