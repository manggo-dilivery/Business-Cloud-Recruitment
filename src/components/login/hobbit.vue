<template>
    <div class="hobbit">
        <topNav title="话题"></topNav>
        <div class="topic">
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
        <div class="list">
            <div class="title">
                <p>点击下方标签可直接添加</p>
            </div>
            <div class="listItem" id="tag">
                <p v-for="(item,index) in info" @click="addTag(index)"
                >{{item.context}}</p>
            </div>
        </div>
        <div class="submit" @click="confirm">
            <div class="doSubmit">提交</div>
        </div>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui'
    export default {
        name: "hobbit",
        data(){
            return{
                info:[],
                list:[],
                index:[],
                totalNum:'',
                num:0
            }
        },
        created(){
            let info = JSON.parse(window.localStorage.getItem('loginInfo'))
            this.$axios.get('/business/country/'+info.country+'/label/list/1').then(res=>{
                console.log(res)
                this.info = res.data.data
                this.totalNum = res.data.data.length
            })
        },
        methods:{
            addTag(index){
                if(this.list.length>=5){
                    Toast({message: '最多添加5个标签', position: 'middle', duration: 3000});
                    return;
                }
                let info = this.info;
                this.list.push(info[index].context)
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
                x.children[index].className = 'active';

                this.index.push(index);
                let indexNum = this.index;
                let indexArr = [];
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
                x.children[indexArr[index]].className = '';
                indexArr.splice(index,1);
                this.index = indexArr;
                this.num = indexArr.length;
            },
            confirm(){
                let arr = this.list;
                window.localStorage.setItem("hobbit",JSON.stringify(arr))
                this.$router.go('-1')
            }
        }
    }
</script>

<style scoped>
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
    }
    .title p:last-child{
        color:#666;
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
        padding: 30px 0;
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
