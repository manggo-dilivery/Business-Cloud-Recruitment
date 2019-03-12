<template>
    <div class="register2">
        <topNav title="完善信息"></topNav>
        <div class="list">
            <div class="item">
                <p>请上传头像</p>
                <div class="itemRight">
                    <img style="width:40px;" :src="imgUrl" alt="">
                    <img src="@/static/image/login/arrowRight.png" alt="">
                </div>
                <input class="file" type="file" accept="image/png,image/gif,image/jpg,image/jepg" @change="update"/>
            </div>
            <router-link :to="{name:'intrest'}">
                <div class="item">
                    <p>请选择兴趣爱好</p>
                    <div class="itemRight">
                        <p>{{intrest}}</p>
                        <img src="@/static/image/login/arrowRight.png" alt="">
                    </div>
                </div>
            </router-link>
            <router-link :to="{name:'hobbit'}">
                <div class="item">
                    <p>请选择职业标签</p>
                    <div class="itemRight">
                        <p>{{tag}}</p>
                        <img src="@/static/image/login/arrowRight.png" alt="">
                    </div>
                </div>
            </router-link>
        </div>
        <div class="next" @click="doRegister">
            提交
        </div>
        <!--<div class="mark" v-show="showPicker2" @click="showPicker2=false">-->
            <!--<mt-picker class="picker" :slots="slot2" @change="onChange2"  @click="showPicker=true"></mt-picker>-->
        <!--</div>-->
    </div>
</template>

<script>
  import { Toast } from 'mint-ui';
  export default {
    name: "regist",
    data(){
      return {
        hobbit:'',
        job:'',
        info:{},
        imgUrl:'',
        intrest:'',
        tag:''
      }
    },
    created(){
      //个人注册传入数据
      let info = JSON.parse(window.localStorage.getItem('loginInfo'))
      this.info = info;
    //  兴趣爱好
    //   let intrest = JSON.parse(window.localStorage.getItem("intrest"))||[];
    //   this.intrest=intrest.join(",");
    //  职业标签
    //   let tag = JSON.parse(window.localStorage.getItem("hobbit"))
    //   this.tag=tag.join(",")
    },
    methods:{
      onChange2(picker, values) {
        var arr = this.job2;
        let arrays = this.slot2[0].values
        for(let i=0 ; i<arrays.length ; i++){
          if(arrays[i]==values[0]){
            picker.setSlotValues(1, arr);
          }
        }
        var ss = picker.getValues()
        this.job = ss.join('，')
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
            console.log(res)
            Toast({message:res.data.message, position:top, duration:3000})
            this.imgUrl = 'http://13.231.212.214/business/image?image='+res.data.data
          })
      },
      doRegister(){
        // this.$axios.post('/business/pass/save?area='+info.place+'&email='+info.email+'&password='
        //   +info.password+'&pid=0&type=0&username='+info.userName).then(res=>{
        //   console.log(res);
        //   if(res.data.code==200){
        //     Toast({message:res.data.message, position:top, duration:3000});
        //     sessionStorage.setItem("loginInfo", JSON.stringify(res.data.data));
        //     this.$router.push({path:'/'})
        //   }else{
        //     Toast({message:res.data.message, position:top, duration:3000});
        //     return
        //   }
        // })
          let uid = this.info.uid
          let hobbit = this.intrest;
          let tag = this.tag;
          if(hobbit==''){
              Toast({message:'兴趣爱好不能为空', position:top, duration:3000});
              return
          }
          if(tag==''){
              Toast({message:'职业标签不能为空', position:top, duration:3000});
              return
          }
          var that = this;
          this._$.ajax({
              type:"POST",
              url:"http://13.231.212.214/business/user/update/"+uid,
              data:{'hobbys':hobbit, 'position':tag},
              contentType: 'application/x-www-form-urlencoded;charset=utf-8',
              success:function (res) {
                  if(res.code==200){
                      Toast({message:res.message, position:top, duration:3000});
                      that.$router.push({path:'/center'})
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
    .list{
        padding-top: 40px;
    }
    .item{
        position: relative;
        display: flex;
        width:90%;
        margin:0 auto;
        align-items: center;
        justify-content: space-between;
        padding: 15px 0;
        border-bottom:1px solid #eee;
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
        width:140px;
        text-align: right;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
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
