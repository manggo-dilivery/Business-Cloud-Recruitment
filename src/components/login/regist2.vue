<template>
    <div class="register2">
        <topNav title="个人注册"></topNav>
        <div class="list">
            <div class="item">
                <p>请上传头像</p>
                <div class="itemRight">
                    <img style="width:40px;" :src="imgUrl" alt="">
                    <img src="@/static/image/login/arrowRight.png" alt="">
                </div>
                <input class="file" type="file" accept="image/png,image/gif,image/jpg,image/jepg" @change="update"/>
            </div>
            <router-link :to="{name:'hobbit'}">
                <div class="item">
                    <p>请选择兴趣爱好</p>
                    <div class="itemRight">
                        <p></p>
                        <img src="@/static/image/login/arrowRight.png" alt="">
                    </div>
                </div>
            </router-link>
            <div class="item" @click="showPicker2=true">
                <p>请选择职业标签</p>
                <div class="itemRight">
                    <p>{{job}}</p>
                    <img src="@/static/image/login/arrowRight.png" alt="">
                </div>
            </div>
        </div>
        <div class="next" @click="doRegister">
            立即注册
        </div>
        <div class="mark" v-show="showPicker2" @click="showPicker2=false">
            <mt-picker class="picker" :slots="slot2" @change="onChange2"  @click="showPicker=true"></mt-picker>
        </div>
    </div>
</template>

<script>
  import { Toast } from 'mint-ui';
  export default {
    name: "regist",
    data(){
      return {
        showPicker1:false,
        showPicker2:false,
        hobbit:'',
        job:'',
        info:{},
        hobbit1:[],
        hobbit2:[],
        job1:[],
        job2:[],
        slot1: [],
        slot2: [],
        imgUrl:''
      }
    },
    created(){
      let hobbit1 = [];
      let hobbit2 = [];
      let job1 = [];
      let job2 = [];
      this.$axios.get('/business/hobby/list/0').then(res=>{
        for(let item of res.data.data){
          hobbit1.push(item.content)
        }
        this.hobbit1 = hobbit1
      });
      this.$axios.get('/business/hobby/list/1').then(res=>{
        for(let item of res.data.data){
          hobbit2.push(item.content)
        }
        this.hobbit2 = hobbit2
      });
      this.$axios.get('/business/profession/list/0').then(res=>{
        for(let item of res.data.data){
          job1.push(item.content)
        }
        this.job1 = job1;
      })
      this.$axios.get('/business/profession/list/1').then(res=>{
        for(let item of res.data.data){
          job2.push(item.content)
        }
        this.job2 = job2;
      })
      this.slot1=[
        {flex: 1, values: hobbit1, className: 'slot1', textAlign: 'right'},
        {divider: true, content: '-', className: 'slot2'},
        {flex: 1, values: hobbit2, className: 'slot3', textAlign: 'left'}
      ];
      this.slot2=[
        {flex: 1, values: job1, className: 'slot1', textAlign: 'right'},
        {divider: true, content: '-', className: 'slot2'},
        {flex: 1, values: job2, className: 'slot3', textAlign: 'left'}
      ]
    //个人注册传入数据
      let info = JSON.parse(window.localStorage.getItem('personRegist'))
      this.info = info;
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
        let info = this.info;
        // console.log(info)
        this.$axios.post('/business/pass/save?area='+info.place+'&email='+info.email+'&password='
          +info.password+'&pid=0&type=0&username='+info.userName).then(res=>{
          console.log(res);
          if(res.data.code==200){
            Toast({message:res.data.message, position:top, duration:3000});
            sessionStorage.setItem("loginInfo", JSON.stringify(res.data.data));
            this.$router.push({path:'/'})
          }else{
            Toast({message:res.data.message, position:top, duration:3000});
            return
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
        padding: 16px 0;
        border-bottom:1px solid #eee;
    }
    .item p{
        font-size:16px;
        letter-spacing: 1px;
    }
    .itemRight{
        display: flex;
        align-items: center;
    }
    .itemRight p{
        font-size:15px;
        color:#999;
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
        margin-top:60px;
        background: #0094ff;
        border:none;
        outline: none;
        height: 50px;
        color:#fff;
        font-size:20px;
        border-radius:5px;
        text-align: center;
        line-height: 50px;
    }
    .next:active{
        background: #0083ee;
    }
</style>
