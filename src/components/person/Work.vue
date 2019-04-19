<template>
  <div class="experience" :class="className" @click="hidePanel">
    <mt-header fixed title="工作经历">
      <router-link to="/" slot="left">
        <mt-button @click.native="handleClick" icon="back" size="small"></mt-button>
      </router-link>
      <div slot="right" @click="save">保存</div>
    </mt-header>
    <div class="expBody">
      <div class="lineWrap">
        <div class="line">
          <div class="left">请输入公司名称</div>
          <div class="right">
            <el-input v-model="compayName" placeholder="请输入公司名称"></el-input>
          </div>
        </div>
      </div>
      <div class="lineWrap">
        <div class="line">
          <div class="left">请选择入职时间</div>
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
          <div class="left">请选择离职时间</div>
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
          <div class="left">请选择职业</div>
          <div class="right">
            <el-input v-model="occupation" placeholder="请选择职业" @focus="showPanel" @click.native.stop="showPanel"></el-input>
          </div>
          <SelectionPanel v-if="mode==='max'" :datas="occupationData" @select="select" ref="panel" ></SelectionPanel>
          <SelectionPanelMin v-else :datas="occupationData" @select="select" ref="panel"></SelectionPanelMin>
        </div>
      </div>
      <div class="lineWrap">
        <div class="line">
          <div class="left">工作中用到技能</div>
          <div class="right">
            <el-input v-model="skill" placeholder="工作中用到技能"></el-input>
          </div>
        </div>
      </div>
      <div class="lineWrap">
        <div class="line">
          <div class="left">获得的成就或是业绩</div>
          <div class="right">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 6}" v-model="achievement" placeholder="获得的成就或是业绩"></el-input>
          </div>
        </div>
      </div>
      <div class="lineWrap">
        <div class="line">
          <div class="left">在这份工作中的获得</div>
          <div class="right">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 6}" v-model="gains" placeholder="在这份工作中的获得"></el-input>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SelectionPanel from './SelectionPanel'
import SelectionPanelMin from './SelectionPanelMin'
export default {
  data(){
    return {
      compayName: '',
      inTime: '',
      outTime: '',
      occupation: '',
      skill: '',
      achievement: '',
      gains: '',
      occupationData: []
    }
  },
  components: {
    SelectionPanel,
    SelectionPanelMin
  },
  methods: {
    handleClick(){
      this.$router.go(-1);
    },
    save(){
      if (this.outTime < this.inTime) {
        this.$message({
          type: 'success',
          message: '离职时间需大于入职时间！',
          type: 'error'
        });
        return;
      }

      let info = JSON.parse(localStorage.getItem("loginInfo"));
      let url = `/business/job/save?companyName=${encodeURIComponent(this.compayName)}&entryTime=${this.inTime}&performance=${encodeURIComponent(this.achievement)}&position=${encodeURIComponent(this.occupation)}&result=${encodeURIComponent(this.gains)}&separationTime=${this.inTime}&skill=${encodeURIComponent(this.skill)}&uid=${info.uid}&status=1`
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
    },
    showPanel(){
      this.$refs.panel.isShow = true;
    },
    hidePanel(){
      this.$refs.panel.isShow = false;
    },
    select(occupation){
      this.occupation = occupation;
    }
  },
  computed: {
    mode(){
      return this.$store.state.viewMode;
    },
    className(){
      return `experience-${this.$store.state.viewMode}`
    }
  },
  created(){
    this.$axios.get('/business/professionLable/findAll')
      .then(res=>{
        this.occupationData = res.data.data;
      })
      .catch(err=>console.warn(err));
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