<template>
    <div class="container">
        <topNav></topNav>
        <div class="mark" v-show="currentIndex==1">
            <div class="markItem" v-for="item in markItem" @click="doTagSearch(item.context)">
                <p>{{item.company}}</p>
                <img src="@/static/image/login/add.png" alt="" @click="currentIndex=0">
            </div>
        </div>
        <div class="topic" @click="currentIndex=0">
            <div class="title">
                <p>您已选择的标签</p>
                <p><span>{{num}}</span>/{{totalNum}}</p>
            </div>
            <div class="select">
                <div class="selectItem" v-for="(item,index) in list">
                    <p>{{item}}</p>
                    <img @click="cancel(index)" src="@/static/image/login/error.png" alt="">
                </div>
            </div>
        </div>
        <div class="list" @click="currentIndex=0">
            <div class="title">
                <p>点击下方标签可直接添加</p>
            </div>
            <div class="listItem" id="tag">
                <p v-for="(item,index) in info" @click="addTag(index)"
                 class="listItemP">{{item.company}}</p>
            </div>
            <div class="submit" @click="confirm">
                <div class="doSubmit">提交</div>
            </div>
        </div>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui'
    export default {
        name: "companyTarget",
        data(){
            return{
                currentIndex:0,
                searchVal:' ',
                markItem:[],
                info:[],
                list:[],
                index:[],
                totalNum:'',
                num:0
            }
        },
        created(){
            let info = JSON.parse(window.localStorage.getItem('loginInfo'))
            //hobbit中的请求
            //     /business/country/45/label/list/3
            this.$axios.get('/business/goals/list?uid='+info.uid+'&cid='+info.country).then(res=>{
                console.log(res)
                this.info = res.data.data
                this.totalNum = res.data.data.length
            })
        },
        methods:{
            showMark(){
                let info = JSON.parse(window.localStorage.getItem('loginInfo'))
                // console.log(info.country)
                this.currentIndex = 1;
                this.$axios.get('/business/country/'+info.country+'/label/search/3?content='+this.searchVal).then(res=>{
                    let arr = res.data.data;
                    let arr2 = [];
                    if(arr.length<6){
                        for(let i=0 ; i<arr.length ; i++){
                            arr2.push(arr[i])
                        }
                        this.markItem = arr2;
                    }else{
                        for(let i=0 ; i<6 ; i++){
                            arr2.push(arr[i])
                        }
                        this.markItem = arr2;
                    }
                })
            },
            doSearch(){
                let x = document.getElementsByClassName("listItemP");
                let y = document.getElementsByClassName("active")
                for(var i=0 ; i<x.length ; i++){
                    if(x[i].style.visibility==""){
                        x[i].style.visibility="hidden";
                        x[i].style.position="absolute";
                    }
                }
                for(let n=0 ; n<y.length ; n++){
                    if(y[n].style.visibility==""){
                        y[n].style.visibility="hidden";
                        y[n].style.position="absolute";
                    }
                }
                let val = this.searchVal;
                let info = JSON.parse(window.localStorage.getItem('loginInfo'))
                this.$axios.get('/business/country/'+info.country+'/label/search/3?content='+val).then(res=>{
                    // console.log(res.data.data)
                    let arr = res.data.data;
                    let arr2 = this.info;
                    this.info = arr2.concat(arr);
                    this.$set(this.info);
                    this.totalNum = arr.length;
                    console.log(this.info)
                })
                this.currentIndex=0;
            },
            doTagSearch(val){
                let x = document.getElementsByClassName("listItemP");
                let y = document.getElementsByClassName("active")
                for(var i=0 ; i<x.length ; i++){
                    if(x[i].style.visibility==""){
                        x[i].style.visibility="hidden";
                        x[i].style.position="absolute";
                    }
                }
                for(let n=0 ; n<y.length ; n++){
                    if(y[n].style.visibility==""){
                        y[n].style.visibility="hidden";
                        y[n].style.position="absolute";
                    }
                }
                let info = JSON.parse(window.localStorage.getItem('loginInfo'))
                this.$axios.get('/business/country/'+info.country+'/label/search/3?content='+val).then(res=>{
                    // console.log(res)
                    this.info = res.data.data;
                    this.totalNum = res.data.data.length;
                })
                this.currentIndex=0;
            },
            cancelMark(){
                this.currentIndex=0;
                this.searchVal = ' '
            },
            //hobbit中的代码
            addTag(index){
                console.log(index)
                if(this.list.length>=5){
                    Toast({message: '最多添加5个标签', position: 'middle', duration: 3000});
                    return;
                }
                let info = this.info;

                this.list.push(info[index].company)
                let arr = this.list;
                //数组去重
                let arr1 = [];
                for(let i in arr){
                    if(arr1.indexOf(arr[i])==-1){
                        arr1.push(arr[i])
                    }
                }
                this.list = arr1;
                let x = document.getElementById('tag');
                console.log(x)
                x.children[index].className = 'listP active';
                let indexArr = [];
                this.index.push(index);
                let indexNum = this.index;
                for(let i in indexNum){
                    if(indexArr.indexOf(indexNum[i])==-1){
                        indexArr.push(indexNum[i]);
                    }
                }
                this.index = indexArr;
                this.num = indexArr.length;
            },
            cancel(index){
                let arr = this.list;
                let indexArr = this.index;
                arr.splice(index,1);
                this.list = arr;
                // this.$set(this.list,indexArr[index],'')
                let x = document.getElementById('tag');
                x.children[indexArr[index]].className = 'listItemP';
                indexArr.splice(index,1);
                this.index = indexArr;
                this.num = indexArr.length;
            },
            confirm(){
                let arr = this.list;
                window.localStorage.setItem("companyTarget",JSON.stringify(arr));
                this.$router.go('-1');
            }
        },
        watch:{
            searchVal(newVal,oldVal){
                let info = JSON.parse(window.localStorage.getItem('loginInfo'))
                // console.log(newVal)
                this.$axios.get('/business/country/'+info.country+'/label/search/3?content='+newVal).then(res=>{
                    let arr = res.data.data;
                    let arr2 = [];
                    if(arr.length<6){
                        for(let i=0 ; i<arr.length ; i++){
                            arr2.push(arr[i])
                        }
                        this.markItem = arr2;
                    }else{
                        for(let i=0 ; i<6 ; i++){
                            arr2.push(arr[i])
                        }
                        this.markItem = arr2;
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .hideP{
        display: none;
    }
    #cancel{
        width: 15px;
        height: 15px;
        position: fixed;
        z-index: 10;
        top:13px;
        right:32px;
    }
    .container{
        height: 100%;
    }
    .search{
        background: #fff;
        width:74%;
        position: fixed;
        z-index:10;
        height: 20px;
        padding: 5px 10px;
        display: flex;
        align-items: center;
        border-radius:5px;
        top:5px;
        left:12%;
    }
    .search img{
        width:17px;
        height: 17px;
        margin-right: 10px;
    }
    .search input{
        height: 20px;
        font-size:14px;
        width:80%;
    }
    .hot{
        width:100%;
        margin-top:10px;
    }
    .title{
        width:90%;
        margin:0 auto;
        font-size:16px;
        padding: 10px 0;
    }
    .content{
        display: flex;
        flex-wrap: wrap;
        width:90%;
        margin:0 auto;
        align-items: center;
    }
    .content p{
        padding: 5px 10px;
        background: #f8f7ff;
        margin-left:12px;
        margin-top:10px;
        border-radius: 5px;
        font-size: 14px;
    }
    .content p:first-child{
        margin-left:0;
    }
    .common{
        margin-top:20px;
    }
    .mark{
        position: fixed;
        width:74%;
        min-height: 100px;
        top:40px;
        left:12%;
        padding: 6px 10px;
        background: #fff;
        box-shadow:0 0 15px #ccc;
    }
    .markItem{
        display: flex;
        width:94%;
        margin:0 auto;
        align-items: center;
        justify-content: space-between;
    }
    .markItem img{
        width:15px;
        height: 15px;
    }
    .markItem p{
        padding: 8px 0;
        letter-spacing: 1px;
        font-size:14px;
        color:#666;
    }
    /*hobbit的样式*/
    .hobbit{
        background: #f1f2f6;
    }
    .topic{
        padding-top: 40px;
        width: 100%;
        background: #fff;
        padding-bottom: 20px;
    }
    .title{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width:90%;
        margin:0 auto;
        padding: 10px 0;
        margin-top:10px;
    }
    .title p:first-child{
        font-size:16px;
        font-weight: bold;
        letter-spacing: 1px;
        color:#333;
    }
    .title span{
        color:#0094ff;
    }
    .select{
        display: flex;
        flex-wrap: wrap;
        width:90%;
        margin:0 auto;
    }
    .selectItem{
        display: flex;
        align-items: center;
        border:1px solid #0094ff;
        padding: 5px 8px;
        border-radius:5px;
        margin-left:10px;
        margin-top:14px;
    }
    .selectItem p{
        font-size:13px;
        color:#0094ff;
    }
    .selectItem img{
        width:12px;
        height: 12px;
        margin-left:8px;
    }
    .list{
        background: #fff;
        margin-top:10px;
        padding: 0 0 16px 0;
    }
    .listItem{
        width:90%;
        margin:0 auto;
        display: flex;
        flex-wrap: wrap;
    }
    .listItem p{
        padding: 5px 8px;
        border:1px solid #999999;
        margin-left:10px;
        margin-top:14px;
        font-size:13px;
        border-radius:5px;
    }
    .submit{
        background: #fff;
        margin-top:50px;
    }
    .doSubmit{
        width:90%;
        margin:0 auto;
        height: 40px;
        background: #0094ff;
        text-align: center;
        color:#fff;
        font-size:16px;
        line-height: 40px;
        letter-spacing: 2px;
        border-radius:5px;
    }
    .doSubmit:active{
        background: #0083ee;
    }
    .active{
        background: #eaeaea;
        border:1px solid #eaeaea !important;
    }
</style>
