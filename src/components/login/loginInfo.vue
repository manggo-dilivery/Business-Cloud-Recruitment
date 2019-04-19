<template>
    <div class="register2">
        <topNav title="完善信息"></topNav>
        <div class="list">
            <div class="item">
                <p>请上传公司logo</p>
                <div class="itemRight">
                    <img style="width:40px;" :src="imgUrl" alt="">
                    <img src="@/static/image/login/arrowRight.png" alt="">
                </div>
                <input class="file" type="file" accept="image/png,image/gif,image/jpg,image/jepg" @change="update"/>
            </div>
            <!--<div class="item" @click="showPicker1=true">-->
                <!--<p>输入您的职位</p>-->
                <!--<div class="itemRight">-->
                    <!--<p>{{item1}}</p>-->
                    <!--<img src="@/static/image/login/arrowRight.png" alt="">-->
                <!--</div>-->
            <!--</div>-->
            <div class="item" @click="showPicker1=true">
                <p>请输入您的职位</p>
                <div class="itemRight">
                    <p class="inputText">{{item1}}</p>
                    <img src="@/static/image/login/arrowRight.png" alt="">
                </div>
            </div>
            <div class="item" @click="showPicker2=true">
                <p>请输入公司介绍</p>
                <div class="itemRight">
                    <p class="inputText">{{item2}}</p>
                    <img src="@/static/image/login/arrowRight.png" alt="">
                </div>
            </div>
            <div class="item" @click="showPicker3=true">
                <p>请输入经营范围</p>
                <div class="itemRight">
                    <p class="inputText">{{item3}}</p>
                    <img src="@/static/image/login/arrowRight.png" alt="">
                </div>
            </div>
            <router-link :to="{name:'companyTarget'}">
                <div class="item">
                    <p>请选择企业目标</p>
                    <div class="itemRight">
                        <p>{{companyTarget}}</p>
                        <img src="@/static/image/login/arrowRight.png" alt="">
                    </div>
                </div>
            </router-link>

        </div>
        <div class="next" @click="doRegist">
            提交
        </div>
        <div class="mark" v-show="showPicker1" @click="showPicker1=false"></div>
        <textarea v-show="showPicker1" v-model="item1" class="textArea" placeholder="请输入您的职位"></textarea>

        <!--<div class="mark" v-show="showPicker1" @click="showPicker1=false">-->
            <!--<mt-picker class="picker" :slots="slot1" @change="onValuesChange1"  @click="showPicker1=true"></mt-picker>-->
        <!--</div>-->
        <div class="mark" v-show="showPicker2" @click="click2"></div>
        <textarea v-show="showPicker2" v-model="item2" class="textArea" placeholder="请输入公司介绍"></textarea>

        <div class="mark" v-show="showPicker3" @click="showPicker3=false"></div>
        <textarea v-show="showPicker3" v-model="item3" class="textArea" placeholder="请输入经营范围"></textarea>
    </div>
</template>

<script>
  import { Toast } from 'mint-ui';

  export default {
    name: "companyRegist",
    data(){
      return {
        imgUrl:'',
        showPicker1:false,
        showPicker2:false,
        showPicker3:false,
        showPicker4:false,
        item1:'',
        item2:'',
        item3:'',
        item4:'',
        info:{},
          ip:'',
        companyTarget:'',
        slot1:[
          {flex: 1, values: ['房地产', '看电影', '玩游戏'], className: 'slot1', textAlign: 'center'}
        ],
        slot4: [
          {flex: 1, values: ['打球', '看电影', '玩游戏'], className: 'slot1', textAlign: 'right'
          }
        ]
      }
    },
    created(){
        this.ip = this.imageUri;
      this.info = JSON.parse(window.localStorage.getItem('loginInfo'));
      let companyTarget = JSON.parse(window.localStorage.getItem('companyTarget'))||[];
      this.companyTarget = companyTarget.join(',')
    },
    methods:{
      onValuesChange1(picker,values){
        this.item1 = picker.getValues().toString()
      },
      onValuesChange4(picker,values){
        this.item4 = picker.getValues().toString()
      },
      click2(){
        this.showPicker2 = false;
      },
      update(e){
        // console.log('self',self)
        // console.log('e：',e)
        let file = e.target.files[0];
        let param = new FormData();
        param.append('file',file,file.name);
        // param.append('chunk','0');
        // console.log('param：',param.get('file'))
        let config = {
          headers:{'Content-Type':'multipart/form-data'}
        };
        this.$axios.post('/business/upload',param,config)
          .then(res=>{
            Toast({message:res.data.message, position:top, duration:3000})
            this.imgUrl = this.ip+'/business/image?image='+res.data.data
          })
      },
      doRegist(){
        var info = this.info;
        console.log(info)
        if(this.item2==''){
          Toast({message:'公司介绍不能为空', position:top, duration:3000});
          return
        }
        if(this.item3==''){
          Toast({message:'经营范围不能为空', position:top, duration:3000});
          return
        }
        var that = this;
        this._$.ajax({
          type:"POST",
          url:this.ip+"/business/user/update/"+info.uid,
          data:{'businessScope':this.item3,
                'goal':this.companyTarget,"intro":this.item2,"position":this.item1},
          contentType: 'application/x-www-form-urlencoded;charset=utf-8',
          success:function (res) {
            if(res.code==200){
                  Toast({message:res.message, position:top, duration:3000});
                  that.$router.push({path:'/center'})
                // that.$router.go(0)
                }else{
                  Toast({message:res.message, position:top, duration:3000});
                  return
                }
          }
        })
      }
    }
  }
</script>

<style scoped>
    .list{
        padding-top: 40px;
    }
    .file{
        position: absolute;
        width:100%;
        height: 100%;
        top:0;
        left:0;
        z-index:5;
        background: #ddd;
        opacity: 0;
    }
    .item{
        display: flex;
        width:90%;
        margin:0 auto;
        align-items: center;
        justify-content: space-between;
        padding: 14px 0;
        border-bottom:1px solid #eee;
        position: relative;
    }
    .item p{
        font-size:15px;
        letter-spacing: 1px;
    }
    .itemRight{
        display: flex;
        align-items: center;
    }
    .itemRight p{
        font-size:15px;
        color:#999;
        width:130px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .itemRight img{
        width:8px;
        margin-left:10px;
    }
    .mark{
        width:100%;
        height: 100%;
        position: fixed;
        top:0;
        left:0;
        background: rgba(0,0,0,0.6);
    }
    .textArea{
        width:70%;
        height: 180px;
        display: block;
        position: absolute;
        top:100px;
        left:10%;
        font-size:18px;
        padding: 5%;
        outline: none;
        border-radius:10px;
    }
    .inputText{
        width:110px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: right;
    }
    .picker{
        background: #fff;
        position: fixed;
        bottom:0;
        left:0;
        width:100%;
    }
    .next{
        display: block;
        width:88%;
        margin:0 auto;
        margin-top:50px;
        background: #0094ff;
        border:none;
        outline: none;
        height: 40px;
        color:#fff;
        font-size:18px;
        border-radius:5px;
        text-align: center;
        line-height: 40px;
    }
    .next:active{
        background: #0083ee;
    }
</style>
