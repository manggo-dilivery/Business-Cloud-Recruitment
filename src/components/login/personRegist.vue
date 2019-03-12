<template>
    <div class="container">
        <topNav title="个人注册"></topNav>
        <div class="infoList">
            <div class="infoItem">
                <input v-model="name" type="text" name="name" placeholder="请输入用户名、邮箱、手机号">
                <img src="@/static/image/login/inputCancel.png" @click="cancelName" alt="">
            </div>
            <div class="infoItem">
                <input v-model='pswd' v-if="showPswd" type="password" name="name" placeholder="密码（6-20位字母、数字或符号）">
                <input v-model='pswd' v-if="!showPswd" type="text" placeholder="密码（6-20位字母、数字或符号）">
                <div class="pswd">
                    <img src="@/static/image/login/inputCancel.png" @click="cancelPswd" alt="">
                    <img @click="show" v-if="showPswd" src="@/static/image/login/closeEye.png" alt="">
                    <img @click="hide" v-if="!showPswd" src="@/static/image/login/openEye.png" alt="">
                </div>
            </div>
            <div class="infoItem">
                <input v-model="email" type="email" name="name" placeholder="请输入邮箱">
                <img @click="cancelEmail" src="@/static/image/login/inputCancel.png" alt="">
            </div>
            <div class="infoItem">
                <input v-model="invatationCode" type="text" name="name" placeholder="请输入邀请码">
                <img @click="cancelCode" src="@/static/image/login/inputCancel.png" alt="">
            </div>
            <div class="item" @click="showPicker=true">
                <p style="font-size: 15px;">请选择所在地区</p>
                <div class="itemRight">
                    <p style="width:160px;overflow:hidden;text-overflow: ellipsis;
white-space: nowrap;text-align: right">{{place}}</p>
                    <img src="@/static/image/login/arrowRight.png" alt="">
                </div>
            </div>
        </div>
        <div class="next" @click="goNext">
            立即注册
        </div>
        <div class="mark" v-show="showPicker" @click="showPicker=false">
            <mt-picker class="picker" :slots="slots" @change="onValuesChange"  @click="showPicker=true"></mt-picker>
        </div>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    import jsonData from '@/static/json/country.json';
    export default {
    name: "personRegist",
    data(){
      return{
        name:'',
        pswd:'',
        email:'',
        invatationCode:'',
        place:'',
        showPswd:true,
        showPicker:false,
        slots: [],
        province:[],
        city:[],
        district:[],
        countryIndex:''
      }
    },
    created(){
        let province = [];
        let city = [];
        let district = [];
        var arr = jsonData.data;
        for(let key1 in arr){
          let arrCity = [];
          let arrDis2 = [];
          province[key1]=arr[key1].chineseName
          for(let key2 in arr[key1].children){
            arrCity.push(arr[key1].children[key2].chineseName)
            let arrDis1 = [];
            for(let key3 in arr[key1].children[key2].children){
              arrDis1.push(arr[key1].children[key2].children[key3].chineseName)
            }
            arrDis2[key2]=arrDis1
          }
          city[key1]=arrCity
          district[key1]=arrDis2
        }
        this.province = province;
        this.city = city;
        this.district = district;
        // let country = ['国内','国外']
        this.slots=[
          {flex: 1, values: province, className: 'slot2', textAlign: 'center'},
          {divider: true, content: '-', className: 'slot2'},
          {flex: 1, values: city[0], className: 'slot2', textAlign: 'center'},
          {divider: true, content: '-', className: 'slot2'},
          {flex: 1, values: district[0][0], className: 'slot2', textAlign: 'center'},
        ]
    },
    methods:{
      show(){
        this.showPswd = false
      },
      hide(){
        this.showPswd = true
      },
      cancelName(){
        this.name=''
      },
      cancelPswd(){
        this.pswd=''
      },
      cancelEmail(){
        this.email=''
      },
      cancelCode(){
        this.invatationCode=''
      },
      goNext(){
        let password = this.pswd;
        let email = this.email;
        let userName = this.name;
        let code = this.code;
        let place = this.place;
        if(userName==''){
          Toast({message:"用户名不能为空", position:top, duration:3000});
          return
        };
        if(!(/^[\x21-\x7E]{6,20}$/.test(password))){
          Toast({message:"密码格式错误", position:top, duration:3000});
          return
        }
        if(!/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(email)){
          Toast({message:"邮箱格式错误", position:top, duration:3000});
          return
        }
        if(place==''){
          Toast({message:"地区不能为空", position:top, duration:3000});
          return
        };
        let countryId = this.findCountryId();
        let info={'userName':userName,'password':password,'email':email,'code':code,'place':place}
        // window.localStorage.setItem('personRegist',JSON.stringify(info))
        // this.$router.push('/register2')
        this.$axios.post('/business/pass/save?area='+info.place+'&email='+info.email+'&password='
          +info.password+'&pid=0&type=0&username='+info.userName+'&invitedCode='+info.code+
          '&country='+countryId).then(res=>{
          console.log(res);
          if(res.data.code==200){
            Toast({message:res.data.message, position:top, duration:3000});
            localStorage.setItem("loginInfo", JSON.stringify(res.data.data));
            this.$router.push({path:'/'})
          }else{
            Toast({message:res.data.message, position:top, duration:3000});
            return
          }
        })
      },
      findCountryId(){
        let index = this.countryIndex;
        let countryId = jsonData.data[index].did;
        return countryId;
        // console.log(countryId)
      },
      picker(){
        this.showPicker = true;
      },
      onValuesChange(picker, values) {
        var city = this.city;
        var district = this.district;
        let city1 = [];
        let array1 = this.province;
        let result = picker.getValues();
        this.place = result.join(',');
        for(let i in array1){
          if(array1[i]==values[0]){
            picker.setSlotValues(1,city[i])
            picker.setSlotValues(2,district[i][0])
            city1 = city[i]
            this.countryIndex = i;
          }
          if(values[1].isArray) return
          for(let n in city1){
            if(city1[n]==values[1]){
              picker.setSlotValues(2,district[i][n])
              return
            }
          }
        }
      },
    }
  }
</script>

<style scoped>
    .container{
        padding-top: 40px;
    }
    .infoList{
        width:90%;
        margin:0 auto;
        margin-top:10px;
    }
    .infoItem{
        padding: 15px 0;
        border-bottom:1px solid #eee;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .infoItem input{
             width:260px;
             height: 30px;
             font-size:15px;
             margin-left:5px;
         }
    input::-webkit-input-placeholder {
        /* placeholder颜色  */
        color: #aab2bd;
        font-size:15px;
        letter-spacing: 1px;
    }
    .infoItem img{
        width:12px;
        height: 12px;
        margin-right:5px;
    }
    .item{
        padding: 15px 0;
        border-bottom:1px solid #eee;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .item p{
        letter-spacing: 1px;
        color:#aab2bd;
        font-size:17px;
        margin-left:4px;
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
    .next{
        display: block;
        width:88%;
        margin:0 auto;
        margin-top:60px;
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
    .pswd{
        display: flex;
        align-items: center;
    }
    .pswd img:last-child{
        width:20px;
        height: 10px;
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
</style>
