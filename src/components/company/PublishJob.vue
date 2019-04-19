<template>
  <div class="publish" :class="className">
    <topNav title="发布职位"></topNav>
    <div class="bodyWrap">
      <div class="body">
        <div class="lineWrap">
          <div class="line">
            <div class="left">公司全称</div>
            <div class="right">
              <el-input v-model="companyName" placeholder="请填写"></el-input>
            </div>
          </div>
        </div>
        <div class="lineWrap">
          <div class="line">
            <div class="left">所属行业</div>
            <div class="right">
              <el-input v-model="industry" placeholder="请填写"></el-input>
            </div>
          </div>
        </div>
        <div class="lineWrap">
          <div class="line">
            <div class="left">公司规模</div>
            <div class="right">
              <el-input v-model="companySize" placeholder="请填写"></el-input>
            </div>
          </div>
        </div>
        <div class="sepline"></div>
        <div class="lineWrap">
          <div class="line">
            <div class="left">薪资范围</div>
            <div class="right">
              <el-input v-model="salary" placeholder="请填写"></el-input>
            </div>
          </div>
        </div>
        <div class="lineWrap">
          <div class="line">
            <div class="left">职位名称</div>
            <div class="right">
              <el-input v-model="jobTitle" placeholder="请填写"></el-input>
            </div>
          </div>
        </div>
        <div class="lineWrap">
          <div class="line">
            <div class="left">职位描述</div>
            <div class="right">
              <el-input v-model="description" placeholder="请填写"></el-input>
            </div>
          </div>
        </div>
        <div class="sepline"></div>
        <div class="lineWrap">
          <div class="line">
            <div class="left">经验要求</div>
            <div class="right">
              <el-input v-model="experience" placeholder="请填写"></el-input>
            </div>
          </div>
        </div>
        <div class="lineWrap">
          <div class="line">
            <div class="left">最低学历</div>
            <div class="right">
              <el-input v-model="academic" placeholder="请填写"></el-input>
            </div>
          </div>
        </div>
        <div class="sepline"></div>
        <div class="lineWrap">
          <div class="line">
            <div class="left">公司简介</div>
            <div class="right">
              <el-input v-model="memo" placeholder="请填写"></el-input>
            </div>
          </div>
        </div>
        <div class="description">
          所有职位均有专人审核，请仔细填写，如有违规作假可能导致您的账号被锁定
        </div>
        <el-button type="primary" @click="publish">立即发布</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      companyName: '',
      industry: '',
      companySize: '',
      salary: '',
      jobTitle: '',
      description: '',
      experience: '',
      academic: '',
      memo: '',
    }
  },
  methods: {
    publish(){
      return;
      let info = JSON.parse(localStorage.getItem("loginInfo"));
      let url = `/business/education/save?admissionTime=${this.inTime}&competition=${encodeURIComponent(this.competition)}&discipline=${encodeURIComponent(this.major)}&education=${encodeURIComponent(this.education)}&graduationTime=${this.outTime}&hobby=${encodeURIComponent(this.hobby)}&learnpublish=${encodeURIComponent(this.publish)}&schoolName=${encodeURIComponent(this.schoolName)}&uid=${info.uid}&status=1`;
      this.$axios.post(url)
        .then((res)=>{
          if (res.data.code === 200) {
              this.$router.push('/center')
          } else {
            this.$message({
              type: 'success',
              message: res.data.message,
              type: 'error'
            });
            console.warn(res.data.message);
          }
        })
        .catch(err=>console.warn(err));
    }
  },
  computed: {
    mode(){
      return this.$store.state.viewMode;
    },
    className(){
      return `publish-${this.$store.state.viewMode}`
    }
  }
}
</script>

<style scoped>
.publish {
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
  bottom: 0;
  overflow: hidden;
  width: 100%;
  background-color: #f1f2f6;
}
.body{
  position: relative;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}
.lineWrap{
  background-color: #fff;
  padding-left: 3%;
  width: 100%;
}
.line{
  width: 100%;
  border-bottom: 1px solid #eee;
  padding-top:27px;
  padding-bottom: 26px;
  padding-right: 3%;
  display: flex;
  justify-content: space-between;
}
.publish-min .line{
  padding-top:10px;
  padding-bottom: 10px;
  padding-right: 3%;
}
.line .left{
  font-size: 30px;
  height: 50px;
  line-height: 50px;
  width: 50%;
  min-width:300px;
}
.publish-min .line .left {
  font-size: 16px;
  height: 40px;
  line-height: 40px;
  width: 50%;
  min-width: 100px;
}
.line .right{
  float:left;
  padding-top:10px;
  width: 50%;
  min-width:300px;
}
.publish-min .line .right {
  padding: 0;
  width: 50%;
  min-width: 100px;
}
.sepline {
  width: 100%;
  height: 20px;
  margin-top: -1px;
  background: #f1f2f6;
}
.publish-min .sepline {
  height: 10px;
}
.description {
  padding: 58px 3% 62px;
  color: #999;
  font-size: 24px;
}
.publish-min .description {
  padding: 29px 3% 31px;
  font-size: 13px;
}

.publish /deep/ .el-button{
  width: 100%;
  height: 85px;
  font-size: 34px;
  margin-top:60px;
}
.publish-min /deep/ .el-button{
  width: 100%;
  height: 60px;
  font-size: 20px;
}
</style>