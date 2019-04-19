<template>
    <div class="container">
        <topNav title="选择好友"></topNav>
        <p class="rightBtn" @click="checked">完成</p>
        <div class="friendList">
            <div class="chooseAvatar">
                <img :src="item.avatar"  v-for="item in chooseInfo" alt="">
            </div>
            <mt-index-list :show-indicator="false">
                <div v-for="(item,index) in list">
                    <mt-index-section :index="index">
                        <div class="linkItem">
                            <div class="item" v-for="(item2,index2) in item">
                                <div style="display: flex;
        align-items: center;padding: 10px 0">
                                    <input v-if="false" class="checkRadio" type="checkbox">
                                    <img class="portrait" :src="item2.avatar" alt="">
                                    <div class="text">
                                        <p>{{item2.name}}<img class="vip" src="@/static/image/chat/v1.png"></p>
                                        <p>{{item2.content||'暂无'}}</p>
                                        <p>{{item2.content||'暂无'}}<img class="vip" src="@/static/image/chat/v1.png"></p>
                                    </div>
                                    <img class="queren" v-if="!item2.isChecked" @click="addToList(index,index2)" src="@/static/image/chat/queren.png" alt="">
                                    <img class="queren" v-if="item2.isChecked" @click="deleteToList(index,index2)" src="@/static/image/chat/queren-a.png" alt="">
                                </div>
                            </div>
                        </div>
                    </mt-index-section>
                </div>
            </mt-index-list>

        </div>
        <!--<searchMan></searchMan>-->
    </div>
</template>

<script>
    import HanziToPinyin from "../../api/py";
    import { MessageBox } from 'mint-ui';
    export default {
        name: "linkman",
        data(){
            return{
                showOption:false,
                list:{},
                userInfo:{},
                chooseInfo:[],

                from_username:'',
                to_username:'',
                receiveNickName:'',
                conn:{},
                ip:''
            }
        },
        mounted(){
            this.ip = this.imageUri;
            let userInfo = JSON.parse(localStorage.getItem('loginInfo'))
            this.userInfo = userInfo;
            this.req();
        },
        methods:{
            checked(){
                let arr = this.chooseInfo;
                let friendsStr = '';
                for(let item of arr){
                    friendsStr+='members='+item.im+'&';
                }
                if(friendsStr === ''){
                    MessageBox.alert('请选择群组成员')
                    return;
                }
                let description = '测试群组';
                let groupName = '我的群组';
                // friendsName.push(this.userInfo.im)
                this.$axios.post('/business/group/save?approval=0&description='+description+'&groupname='+groupName+'&'+friendsStr+'owner='+this.userInfo.im+'&type=1').then(res=>{
                    console.log(res)
                    this.$router.push({name:'group'});
                }).catch(err=>{
                    console.log(err)
                })
            },
            addToList(index,index2){
                this.list[index][index2].isChecked = true
                let arr = this.list;
                let arr2 = [];
                for(let i in arr){
                    for(let n in arr[i]){
                        if(arr[i][n].isChecked){
                            arr[i][n].i = i;
                            arr[i][n].n = n;
                            arr2.push(arr[i][n]);
                        }
                    }
                }
                this.chooseInfo = arr2;
            },
            deleteToList(index,index2){
                this.list[index][index2].isChecked = false;
                let arr = this.chooseInfo;
                for(let i in arr){
                    if(arr[i].i == index && arr[i].n == index2){
                        arr.splice(i,1)
                    }
                }
                this.chooseInfo = arr;
            },
            req(){
                this.$axios.get('/business/friends/user/'+this.userInfo.im+'/page?page=1&size=1000').then(res=>{
                    console.log(res.data.data);
                    // let hanZi = "Ads";
                    // console.log("输出首字母"+HanziToPinyin.instance.initialTreatment(hanZi));
                    let arr = res.data.data.list;
                    let list = {};
                    let obj = {};
                    let word;
                    console.log(arr)
                    for(let i in arr){
                        word = HanziToPinyin.instance.initialTreatment(arr[i].username).toUpperCase();
                        if(obj[word]){
                            list[word].push({name:arr[i].username,im:arr[i].im, telephone:arr[i].telephone,
                                companyName:arr[i].companyName,avatar:this.ip+'/business/image?image='+arr[i].avatar,
                                email:arr[i.email],isChecked:false});
                        }else{
                            list[word] = [{name:arr[i].username,im:arr[i].im, telephone:arr[i].telephone,
                                companyName:arr[i].companyName,avatar:this.ip+'/business/image?image='+arr[i].avatar,
                                email:arr[i.email],isChecked:false}];
                            obj[word] = word;
                        }
                    }
                    this.list = list;
                    console.log(list)
                })
            }
        }
    }
</script>

<style scoped>
    .rightBtn{
        position: fixed;
        right:14px;
        top:10px;
        color:#fff;
        z-index:5;
    }
    .chooseAvatar{
        display: flex;
        flex-wrap: wrap;
    }
    .chooseAvatar img{
        width:30px;
        height: 30px;
        border-radius:5px;
        margin:10px;
    }
    .container{
        height:100%;
        padding: 40px 0 60px 0;
    }
    .topEvent{

    }
    .topItem{
        padding: 8px 0;
        display: flex;
        align-items: center;
        width:calc(100% - 21px);
        border-bottom:1px solid #ddd;
        border-right:1px solid #ddd;
    }
    .topItem img{
        width:36px;
        height: 36px;
        margin-left:20px;
    }
    .topItem p{
        font-size:16px;
        margin-left:10px;
        letter-spacing: 1px;
    }
    .friendList{

    }
    #search{
        width:20px;
        height: 20px;
    }
    #add{
        width:20px;
        height: 20px;
    }
    /*点击加号出现的选择项*/
    .option{
        position: fixed;
        width:140px;
        top:46px;
        right:6px;
        background: rgba(63,68,71,0.9);
        z-index:10;
        border-radius:5px;
    }
    .optionItem{
        display: flex;
        align-items: center;
        width:80%;
        margin:0 auto;
        padding: 10px 0;
        border-bottom:1px solid #efefef;
    }
    .optionItem img{
        width:17px;
        height: 17px;
        margin-left:8px;
    }
    .optionItem p{
        color:#efefef;
        margin-left:18px;
        letter-spacing: 1px;
        font-size:14px;
    }
    .queren{
        width:18px;
    }
    input[type=checkbox]{
        width: 22px;
        height: 22px;
        outline: 0 !important;
        background-color: transparent;
        -webkit-appearance: none;
        margin-left:10px;
    }
    input[type=checkbox]:after{
        content:"\2714";
        display: block;
        width:22px;
        height: 22px;
        text-align: center;
        line-height: 20px;
        font-size: 16px;
        color: #fff;
        background-color: #fff;
        border:1px solid #999;
        box-sizing:border-box;
        border-radius: 50%;

    }
    input[type=checkbox]:checked:after  {
        background-color: #0094ff;
    }
    .linkItem{
        display: flex;
        align-items: center;
        flex-wrap: wrap;
    }
    .item{
        /*padding: 10px 0;*/
        width: 100%;
        border-bottom:1px solid #eee;
    }
    .portrait{
        width:40px;
        height: 40px;
        border-radius:50%;
        margin-left:10px;
    }
    .text{
        margin-left:10px;

    }
    .text p{
        width:263px;
        color:#999;
        font-size:12px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: flex;
        align-items: center;
    }
    .text p:first-child{
        color:#000;
        font-size:14px;
        margin-bottom:3px;
        letter-spacing: 0.5px;
    }
    .vip{
        width:14px;
    }
</style>
