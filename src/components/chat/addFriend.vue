<template>
    <div class="addFriend">
        <topNav title="添加好友"></topNav>
        <div class="search">
            <div class="searchContent">
                <img src="@/static/image/chat/jing.png" alt=""/>
                <input class="input" placeholder="请输入用户名/邮箱/手机号" type="text"/>
            </div>
        </div>
        <div class="listTitle">
            <ul class="listUl">
                <li :class="(currentIndex==index)?'active':''" v-for="(item,index) in sort" @click="onchange(index)">{{item}}</li>
            </ul>
        </div>
        <div class="list" v-show="currentIndex==0">
            <list></list>
        </div>
    </div>
</template>

<script>
    export default {
        name: "addFrend",
        data(){
            return{
                sort:['推荐','同事','校友','同乡','同行','其他'],
                currentIndex:0,
            }
        },
        methods:{
            onchange(index){
                this.currentIndex = index;
            }
        }
    }
</script>

<style scoped>
    .addFriend{
        padding-top: 40px;
    }
    .search{
        background: #f1f2f6;
        padding: 10px 0;
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
    .active{
        color:#0094ff;
        border-bottom: 2px solid #0094ff;
    }

</style>
