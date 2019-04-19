<template>
    <div class="addFriend">
        <topNav title="添加好友">
            <!--<img slot="left" @click="goBack" src="@/static/image/login/arr.png" alt="">-->
        </topNav>

        <div class="search">
            <div class="searchContent">
                <img src="@/static/image/chat/jing.png" alt=""/>
                <input v-model="inputVal" class="input" @keyup.enter="search" placeholder="请输入用户名/邮箱/手机号" type="text"/>
            </div>
            <mt-button type="default" size="small" @click.native="cancel" v-if="!showSearch">取消</mt-button>
            <mt-button type="default" size="small" @click.native="search" v-if="showSearch">搜索</mt-button>
        </div>
        <div v-show="showSearch">
            <div class="listTitle">
                <ul class="listUl">
                    <li :class="(currentIndex==index)?'active':''" v-for="(item,index) in sort" @click="onchange(index)">{{item}}</li>
                </ul>
            </div>
            <div class="list" v-show="currentIndex==0">
                <listItem :info="itemlist" :im="im"></listItem>
            </div>
        </div>

        <div class="searchList" v-if="!showSearch">
            <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="autoFill" ref="loadmore">
                <listItem :info="searchlist" :im="im"></listItem>
            </mt-loadmore>
        </div>
    </div>
</template>

<script>
    export default {
        name: "addFrend",
        data(){
            return{
                im:'',
                sort:['推荐','同事','校友','同乡','同行','其他'],
                currentIndex:0,
                page:1,
                inputVal:'',
                searchlist:[],
                showSearch:true,
                allLoaded:false,
                autoFill:false,
                itemlist:[
                    {url:'/business/image?image=201901240839055942.png',title:'英特尔1',content:'f都发顺丰',send:false},
                ],
                ip:''
            }
        },
        created(){
            this.ip = this.imageUri;
            let info = JSON.parse(window.localStorage.getItem('loginInfo'))
            this.im = info.im;
        },
        methods:{
            onchange(index){
                this.currentIndex = index;
            },
            search(){
                let val = this.inputVal;
                this.$axios.get('/business/friends/search?page='+this.page+'&size=10'+'&queryStr='+val).then(res=>{
                    this.showSearch = false;
                    console.log(res.data.data);
                    let data = res.data.data.list;
                    let arr = this.fn(data)
                    this.searchlist = arr
                    console.log('this.searchList111',this.searchlist)
                })
            },
            cancel(){
                this.showSearch = true
            },
            loadBottom(){
                console.log('12343')
                this.loadConcat()
            },
            loadConcat(){
                let val = this.inputVal;
                this.$axios.get('/business/friends/search?page='+(++this.page)+'&size=10&queryStr='+val).then(res=>{
                    let data = res.data.data.list;
                    // console.log(res)
                    let arr = this.fn(data)
                    this.searchlist = this.searchlist.concat(arr)
                    if(arr.length != 10){
                        this.allLoaded = true;
                    }
                    this.$refs.loadmore.onBottomLoaded();
                    console.log('this.searchList',this.searchlist)
                })
            },
            fn(data){
                let arr = [];
                let img = require('@/static/image/chat/intel.jpg')
                var imgUrl;
                for(let i in data){
                    if(data[i].portrait){
                        imgUrl = '/business/image?image='+data[i].portrait;
                    }else{
                        imgUrl = img
                    }
                    arr[i]={ url:imgUrl,title:data[i].username,content:data[i].label||'暂无',send:false,
                        im:data[i].im,hobby:data[i].hobbys,nickName:data[i].nickname
                    }
                }
                return arr;
            },
            goBack(){
                this.$router.go('-1')
            },
        },
        watch:{
            inputVal(newVal,oldVal){
                this.showSearch = true;
            },

        }
    }
</script>

<style scoped>
    .goBack{
        position: fixed;
        width:10px;
        height:14px;
        z-index:50;
        top:13px;
        left:10px;
    }
    .addFriend{
        padding-top: 40px;
    }
    .search{
        background: #f1f2f6;
        padding: 10px 0;
        position: relative;
    }
    .searchContent{
        display: flex;
        align-items: center;
        background: #fff;
        width:90%;
        padding: 7px 0;
        margin:0 auto;
        border-radius:5px;
    }
    .searchContent img{
        width:20px;
        margin-left:20px;
    }
    .input{
        font-size:14px;
        margin-left:10px;
    }
    .input::placeholder{
        color:#999999;
        font-size:14px;
    }
    .listTitle{

    }
    .listUl{
        display: flex;
        align-items: center;
        justify-content: space-around;
        border-bottom: 2px solid #f1f2f6;
    }
    .listUl li{
        padding: 10px 3px;
        color:#333;
        font-size:15px;
        /*letter-spacing: 1px;*/
    }
    .searchList{
        height: 570px;
        overflow: scroll;
    }
    .active{
        color:#0094ff;
        border-bottom: 2px solid #0094ff;
    }
    .mint-button--default{
        position: absolute;
        top:11px;
        right:20px;
        font-size:14px;
        color:#888;
    }
    .mint-button::after{
        background-color:#999;

    }
</style>
