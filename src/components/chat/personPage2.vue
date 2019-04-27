<template>
    <div class="container">
        <topNav title="个人主页"></topNav>
        <div class="topInfo">
            <img class="bgImg" src="@/static/image/chat/bg.png" alt="">
            <div class="empty"></div>
            <div class="info1">
                <p style="border-right: 1px solid #eff0f4"><img style="width:20px;" src="@/static/image/chat/phone.png" alt="">1391115456</p>
                <p><img style="width:26px;" src="@/static/image/chat/mail.png" alt="">仅限好友可见</p>
            </div>
            <div class="title">
                <img src="@/static/image/chat/bg2.png" alt="">
                <div class="titleName">
                    <p class="userTitle" style="font-size:16px;"><span style="margin-right:7px">商务云用户</span>产品经理
                        <img style="width:14px;margin-top:9px;" src="@/static/image/chat/v1.png" alt=""></p>
                    <p style="margin-top:6px;height: 50px;width:200px;overflow: hidden">{{info.username}}</p>
                    <p style="margin-top:10px;width:280px;"><img style="width:14px;margin-right:5px;" src="@/static/image/chat/location.png" alt="">{{info.area}}</p>
                </div>
                <div class="titleAvatal">
                    <img :src="ip+'/business/image?image='+info.portrait" alt="">
                    <p>影响力：19</p>
                </div>
            </div>
        </div>
        <div class="introduction">
            <p class="introductionTitle">个人简介</p>
            <Introduct></Introduct>
            <p class="hobby"><span>兴趣爱好：</span>画画，游戏画，打游戏，看电画画，游戏画，打游戏，看电</p>
        </div>
        <div class="tag">
            <p class="introductionTitle">职业标签</p>
            <Tag></Tag>
        </div>
        <div class="tag">
            <p class="introductionTitle">感兴趣的话题</p>
            <Tag></Tag>
        </div>
        <div class='topic'>
            <p class="introductionTitle">工作经历</p>
            <PersonItem></PersonItem>
        </div>
        <div class='topic'>
            <p class="introductionTitle">教育经历</p>
            <PersonItem></PersonItem>
        </div>
        <div style="height: 41px;"></div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import {MessageBox} from 'mint-ui'
    export default {
        name: "peosonPage",
        data(){
            return{
                info:{},
                ip:''
            }
        },
        mounted(){
            // let friendInfo = this.$route.query.friendInfo;
            this.ip=this.imageUri;
            this.info = JSON.parse(localStorage.getItem('loginInfo'))
        },
        methods:{

        }
    }
</script>

<style scoped>
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
    .container{
        background: #eff0f4;
    }
    .caidan{
        position: fixed;
        width:20px;
        z-index:50;
        top:10px;
        right:12px;
    }
    .topInfo{
        padding-top:40px;
        position: relative;
        z-index:0
    }
    .bgImg{
        width:100%;
    }
    .empty{
        width:100%;
        height: 100px;
    }
    .info1{
        display: flex;
        background: #fff;
    }
    .info1 p{
        padding: 40px 0 10px;
        flex:1;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 15px;
    }
    .info1 img{
        margin-right: 7px;
    }
    .title{
        position: absolute;
        width:90%;
        height: 200px;
        top:30%;
        left:5%;
    }
    .title > img{
        width:100%;
        position: absolute;
        z-index:1;
    }
    .titleName{
        position: relative;
        z-index:2;
        padding-top: 34px;
        padding-left: 28px;
    }
    .titleName p{
        font-size:13px;
        font-family: PingFang-SC-Medium, Helvetica, Arial, sans-serif;
        color:#000;
    }
    .userTitle{
        font-size: 16px;
    }
    .userTitle span{
        font-size: 20px;
    }
    .titleAvatal{
        position: absolute;
        top:36px;
        right:12px;
        z-index:3;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        width:100px;
    }
    .titleAvatal img{
        width:54px;
        height: 54px;
        border-radius:50%;
    }
    .titleAvatal p{
        margin-top:6px;
        color:#0094ff;
        border:1px solid #0094ff;
        border-radius:6px;
        padding: 1px 5px;
        font-size:12px;
    }
    .introduction{
        background: #ffffff;
        margin-top:10px;
        padding-top: 5px;
    }
    .introductionTitle{
        font-size: 16px;
        padding: 5px 15px;
        border-bottom:1px solid #eee;
        letter-spacing: 1px;
    }
    .hobby{
        width:90%;
        margin:0 auto;
    }
    .hobby span{
        font-size:15px;
        font-weight: bold;
        letter-spacing: 1px;
    }
    .topic{
        background: #ffffff;
        margin-top:10px;
    }
    .tag{
        background: #ffffff;
        margin-top:10px;
    }
</style>
