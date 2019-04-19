<template>
    <div class="pending">
        <topNav title="待处理事项"></topNav>
        <div class="list">
            <div class="item" v-for="(item,index) in list" :key="index">
                <div class="left">
                    <img class="image" :src="ip+'/business/image?image='+item.user.portrait" alt="">
                    <div class="text">
                        <p>{{item.user.username}}
                            <!--<img class="vip" src="@/static/image/chat/v1.png" alt="">-->
                        </p>
                        <p>{{item.msg}}</p>
                    </div>
                </div>
                <div class="right">
                    <img src="@/static/image/others/err.png" @click="deny(item.user.uid,0)"  alt="">
                    <img src="@/static/image/login/gou.png" @click="add(item.user.uid,2)"  alt="">
                </div>
            </div>
        </div>
        <div id="cometchat_embed_synergy_container" style="width:100%;
        height: 100%;border:none;display: none"></div>
    </div>
</template>

<script>
    export default {
        name: "pending",
        data(){
            return{
                page:1,
                list:[],
                ip:'',
                im:''
            }
        },
        mounted(){
            this.ip = this.imageUri;
            let info = JSON.parse(window.localStorage.getItem('loginInfo'));
            this.im = info.im;
            this.req(info.im);
        },
        methods:{
            deny(fuid,index){
                this.req3(fuid,0,index);
            },
            add(fuid,index){
                this.req3(fuid,2,index)
            },
            req(im){
                this.$axios.get('/business/friends/untreated/'+im+'/page?page=1&size=100').then(res=>{
                    this.list = res.data.data.list;
                    console.log(res)

                });
            },
            req3(fuid,index){
                this.$axios.post('/business/friends/'+fuid+'/status/'+index).then(res=>{
                    console.log(res);
                    this.req(this.im)
                }).catch(err=>{
                    console.log(err)
                })
            }
        }
    }
</script>

<style scoped>
    .pending{
        padding-top: 40px;
    }
    .list{

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
    .text{
        margin-left:10px;
    }
    .text p:first-child{
        font-size:15px;
        color:#000;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width:180px;
        display: flex;
        align-items: center;
    }
    .text p:last-child{
        font-size:12px;
        color:#999;
        margin-top:4px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width:180px;
    }
    .right{
        display: flex;
        align-items: center;
    }
    .right img:first-child{
        width:13px;
    }
    .right img:last-child{
        width:18px;
        margin-left:15px;
    }
    .vip{
        width:15px;
        display: block;
        margin-left:5px;
    }
</style>
