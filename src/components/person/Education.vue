<template>
  <div class="experience" :class="className">
    <mt-header fixed title="教育经历">
      <router-link to="/" slot="left">
        <mt-button @click.native="handleClick" icon="back" size="small"></mt-button>
      </router-link>
      <div slot="right" @click="save">保存</div>
    </mt-header>
    <div class="expBody">
      <div class="lineWrap">
        <div class="line">
          <div class="left">请输入学校名称</div>
          <div class="right">
            <el-input v-model="schoolName" placeholder="请输入公司名称"></el-input>
          </div>
        </div>
      </div>
      <div class="lineWrap">
        <div class="line">
          <div class="left">请选择专业</div>
          <div class="right">
            <el-input v-model="major" placeholder="请选择专业"></el-input>
          </div>
        </div>
      </div>
      <div class="lineWrap">
        <div class="line">
          <div class="left">请选择学历</div>
          <div class="right">
            <el-select v-model="education" clearable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="lineWrap">
        <div class="line">
          <div class="left">请选择入学时间</div>
          <div class="right">
            <el-date-picker 
              placeholder="请选择入职时间" 
              v-model="inTime" 
              style="width: 100%;"
              format="yyyy年MM月dd日"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </div>
        </div>
      </div>
      <div class="lineWrap">
        <div class="line">
          <div class="left">请选择毕业时间</div>
          <div class="right">
            <el-date-picker 
              placeholder="请选择离职时间" 
              v-model="outTime" 
              style="width: 100%;"
              format="yyyy年MM月dd日"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </div>
        </div>
      </div>
      <div class="lineWrap">
        <div class="line">
          <div class="left">学习经历描述</div>
          <div class="right">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 6}" v-model="experience" placeholder="请填写学习经历"></el-input>
          </div>
        </div>
      </div>
      <div class="lineWrap">
        <div class="line">
          <div class="left">参加过的活动比赛</div>
          <div class="right">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 6}" v-model="competition" placeholder="请填写参加过的活动"></el-input>
          </div>
        </div>
      </div>
      <div class="lineWrap">
        <div class="line">
          <div class="left">爱好特长</div>
          <div class="right">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 6}" v-model="hobby" placeholder="请输入您的爱好特长"></el-input>
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
      schoolName: '',
      major: '',
      education: '',
      inTime: '',
      outTime: '',
      experience: '',
      competition: '',
      hobby: '',
      options: ['博士','硕士','本科','高中','初中','小学']
    }
  },
  methods: {
    handleClick(){
      this.$router.go(-1);
    },
    save(){
      if (this.outTime < this.inTime) {
        this.$message({
          type: 'success',
          message: '毕业时间需大于入学时间！',
          type: 'error'
        });
        return;
      }

      let info = JSON.parse(localStorage.getItem("loginInfo"));
      let url = `/business/education/save?admissionTime=${this.inTime}&competition=${encodeURIComponent(this.competition)}&discipline=${encodeURIComponent(this.major)}&education=${encodeURIComponent(this.education)}&graduationTime=${this.outTime}&hobby=${encodeURIComponent(this.hobby)}&learnExperience=${encodeURIComponent(this.experience)}&schoolName=${encodeURIComponent(this.schoolName)}&uid=${info.uid}&status=1`;
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
      return `experience-${this.$store.state.viewMode}`
    }
  }
}
</script>

<style scoped>
.experience {
  background: #efefef;
  width: 100%;
  height: 100%;
  position: relative;
  overflow:hidden;
  font-family: PingFang-SC-Bold;
}
.expBody{
  position: absolute;
  top: 41px;
  bottom: 0;
  overflow-x: hidden;
  overflow-y: auto;
  width: 100%;
  background-color: #f1f2f6;
  padding-bottom:60px;
}
.lineWrap{
  clear:both;
  float: left;
  background-color: #fff;
  padding-left: 3%;
  width: 100%;
}
.line{
  clear:both;
  float: left;
  width: 100%;
  border-bottom: 1px solid #eee;
  padding-top:27px;
  padding-bottom: 26px;
  padding-right: 3%;
}
.experience-min .line{
  padding-top:10px;
  padding-bottom: 10px;
  padding-right: 3%;
}
.line .left{
  clear:both;
  float: left;
  font-size: 30px;
  height: 50px;
  line-height: 50px;
  width: 50%;
  min-width:300px;
}
.experience-min .line .left {
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
.experience-min .line .right {
  padding: 0;
  width: 50%;
  min-width: 100px;
}
.name {
  text-overflow: ellipsis;
  overflow: hidden;
}
.experience /deep/ .mint-header-button div,
.experience /deep/ .mint-button{
  cursor: pointer;
}
</style>