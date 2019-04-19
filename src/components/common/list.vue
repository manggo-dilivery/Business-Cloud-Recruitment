<template>
    <div>
        <div class="item" v-for="(item,index) in info" :key="index">
            <div class="left">
                <img class="image" :src="ip+item.url" alt="">
                <div class="itemContent">
                    <p>{{item.title}}<img class="vip" src="@/static/image/chat/v1.png"></p>
                    <p>{{item.content}}{{item.uid}}<img class="vip" src="@/static/image/chat/v1.png"></p>
                </div>
            </div>
            <p class="right" v-bind:class="item.send?'unshow':''" @click="addFriend(index)"> +好友</p>
            <p class="right2" v-bind:class="item.send?'':'unshow'" @click="cancel(index)">已发送</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "list",
        data(){
            return{
                send:true,
                infoList:[],
                ip:''
            }
        },
        props:['info','im'],
        mounted(){
            // this.infoList = this.info
            this.ip = this.imageUri;
            console.log('info',this.info)
        },
        methods:{
            addFriend(index){
                console.log(this.info[index].im)
                this.$axios.post('/business/friends/user/'+this.im+'/friend/'+this.info[index].im).then(res=>{
                    console.log('res',res)
                })
                this.info[index].send = true;
            },
            cancel(index){
                this.info[index].send = false;
            }
        },
    }
</script>

<style scoped>
    .list{

    }
    .unshow{
        display: none;
    }
    .item{
        width:90%;
        margin:0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 0 ;
        border-bottom:1px solid #eee;
    }
    .left{
        display: flex;
        align-items: center;
    }
    .image{
        width:44px;
        height: 44px;
        border-radius:50%;
    }
    .itemContent{
        margin-left:10px;
    }
    .itemContent p{
        font-size:15px;
        color:#000;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width:180px;
        display: flex;
        align-items: center;
    }
    .itemContent p:last-child{
        font-size:12px;
        color:#999;
        margin-top:4px;
    }
    .right{
        width:70px;
        padding:2px 0 0 0;
        color:#0094ff;
        border:1px solid #0094ff;
        border-radius:14px;
        font-size:14px;
        letter-spacing: 1px;
        text-align: center;
    }
    .right2{
        width:70px;
        padding:2px 0 0 0;
        background: #0094ff;
        color:#fff;
        border:1px solid #0094ff;
        border-radius:14px;
        font-size:14px;
        letter-spacing: 1px;
        text-align: center;
    }
    .vip{
        width:15px;
        display: block;
        margin-left:5px;
    }
</style>
