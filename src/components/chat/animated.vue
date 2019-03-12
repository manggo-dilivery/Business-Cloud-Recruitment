<template>
    <div class="animate">
        <div class="topNav">
            <img id="search" slot="left" src="@/static/image/chat/search.png" alt="">
            <div class="navCenter">
                <p style="margin-right: 30px;" @click="indexChange(0)" :class="currentIndex==0?'active':''">好友</p>
                <p data-index="1" @click="indexChange(1)" :class="currentIndex==1?'active':''">关注</p>
            </div>
            <img id="add" src="@/static/image/chat/edit.png" alt="">
        </div>
        <div v-if="currentIndex==0">
            <div class="user">
                <img src="@/static/image/chat/topbg.png" alt="">
                <div class="userInfo">
                    <img src="@/static/image/chat/portrait.jpeg" alt="">
                    <p>商务云用户</p>
                    <img src="@/static/image/chat/v1.png" alt="">
                </div>
            </div>
            <div class="text">
                <h4 style="padding: 8px 0;border-bottom: 1px solid #eee;text-align: center">商务云用户，开始第二天的阅读吧。</h4>
                <div class="box">
                    <img src="@/static/image/chat/portrait.jpeg" alt="">
                    <div class="boxTitle">
                        <p>商业新项目，公司致力于开拓海外市场寻求合作方放大瑟瑟发抖时代发生的发顺丰多少</p>
                        <p>1个同行评论</p>
                    </div>
                </div>
                <ul class="ulList">
                    <li><img src="@/static/image/chat/dot.png" alt=""><p>商业新项目，公司致力于开拓海外市场寻求合作机会</p></li>
                    <li><img src="@/static/image/chat/dot.png" alt=""><p>商业新项目，公司致力于开拓海外市场寻求合作机会</p></li>
                    <li><img src="@/static/image/chat/dot.png" alt=""><p>商业新项目，公司致力于开拓海外市场寻求合作机会</p></li>
                </ul>
                <p class="seeMore">查看更多行业头条</p>
            </div>
            <div class="list">
                <div class="item">
                    <div class="itemTop">
                        <img src="@/static/image/chat/portrait.jpeg" alt="">
                        <div class="userContent">
                            <p>James</p>
                            <p>南京可爱多有限公司UI设计师</p>
                        </div>
                    </div>
                    <p class="content">关于商业新项目，公司努力致力于开拓海外市场寻求合作方</p>
                    <div class="itemImage">
                        <img src="@/static/image/chat/portrait.jpeg" alt="">
                        <img src="@/static/image/chat/portrait.jpeg" alt="">
                        <img src="@/static/image/chat/portrait.jpeg" alt="">
                        <img src="@/static/image/chat/portrait.jpeg" alt="">
                        <img src="@/static/image/chat/portrait.jpeg" alt="">
                    </div>
                    <div class="icon">
                        <img src="@/static/image/chat/comment.png" alt="" @click="isShow=true">
                        <div class="iconOption" v-show="isShow" @click="isShow=false">
                            <div class="iconItem" style="margin:0 30px 0 24px;">
                                <img src="@/static/image/chat/pride2.png" alt="">
                                <p>赞</p>
                            </div>
                            <div class="iconItem">
                                <img src="@/static/image/chat/pl.png" alt="">
                                <p>评论</p>
                            </div>
                        </div>
                    </div>
                    <img class="jianjiao" src="@/static/image/chat/jianjiao.png" alt="">
                    <div class="coment">
                        <div class="history">
                            <img src="@/static/image/chat/pride.png" alt="">
                            <p>程璐<span>，</span></p>
                            <p>程璐</p>
                        </div>
                        <div class="comentContent">
                            <p><span>William</span>：关于商业新项目，公司致力于开拓海外市场寻求合作方</p>
                            <p><span>William</span>：关于商业新项目，公司致力于开拓海外市场寻求合作方</p>
                            <p><span>William</span>：关于商业新项目，公司致力于开拓海外市场寻求合作方</p>
                            <p><span>William</span>：关于商业新项目，公司致力于开拓海外市场寻求合作方</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
  export default {
    name: "animated",
    data(){
      return{
        currentIndex:0,
        isShow:false
      }
    },
    methods:{
      indexChange(index){
        console.log('index')
        this.currentIndex = index
      }
    }
  }
</script>

<style scoped>
    .animate{
        background: #efefef;
        padding-bottom: 46px;
    }
    .topNav{
        width: 100%;
        height: 40px;
        position: fixed;
        top:0;
        left:0;
        background: #0094ff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        z-index:10;
    }
    #search{
        width:18px;
        height: 18px;
        margin-left:10px;
    }
    #add{
        width:18px;
        height: 18px;
        margin-right:10px;
    }
    .navCenter{
        width:160px;
        display: flex;
        justify-content: center;
    }
    .navCenter p{
        color:#fff;
        font-size:17px;
        height:37px;
        line-height: 40px;
        width:50px;
        text-align: center;
    }
    .active{
        border-bottom:2px solid #fff;
    }
    /*用户信息*/
    .user{
        width:100%;
        position: relative;
        padding-top: 40px;
        left:0;
        margin:0 !important;
    }
    .user > img{
        width:100%;
        height:100px;
    }
    .userInfo{
        position: absolute;
        top:60px;
        left:20px;
        display: flex;
        align-items: center;
    }
    .userInfo img:first-of-type{
        width:45px;
        height: 45px;
        border-radius:50%;
    }
    .userInfo img:last-of-type{
        width:18px;
        height: 18px;
        margin-left:5px;
        margin-bottom:5px;
    }
    .userInfo p{
        margin-left:10px;
        color:#fff;
        font-family: PingFang-SC-Bold;
        font-size: 20px;
        letter-spacing: 1px;
        margin-bottom:5px;
    }
    /*text*/
    .text{
        width:90%;
        margin:0 auto;
        margin-top:-18px;
        box-shadow:0 0 10px #ddd;
        background: #fff;
        position: relative;
        z-index:5;
        padding: 10px 0;
    }
    .box{
        display: flex;
        align-items: center;
        padding: 10px 0;
    }
    .box img{
        width:120px;
        height: 80px;
        margin-left:19px
     }
    .boxTitle{
        width:174px;
        margin-left:10px;
    }
    .boxTitle p:first-child{
        font-size:14px;
        color:#000;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
    }
    .boxTitle p:last-child{
        font-size:12px;
        color:#999;
        margin-top:18px;
    }
    .ulList{
        width:90%;
        margin:0 auto;
        border-bottom: 1px solid #eee;
        padding-bottom: 10px;
    }
    .ulList li{
        display: flex;
        align-items: center;
        padding: 3px 0;
    }
    .ulList li img{
        margin-left:5px;
    }
    .ulList li p{
        width:260px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        margin-left:10px;
    }
    .seeMore{
        width:100%;
        text-align: center;
        color:#999;
        font-size:14px;
        margin-top:5px;
    }
    .list{
        background: #fff;
    }
    .item{
        width:100%;
        margin-top:10px;
        padding-bottom: 10px;
    }
    .itemTop{
        display: flex;
        padding: 15px 0 10px 0;
    }
    .itemTop img{
        width:40px;
        height: 40px;
        border-radius:50%;
        margin-left:15px;
    }
    .userContent{
        margin-left:7px;
    }
    .userContent p:first-child{
        font-size: 15px;
        color:#000;
        font-weight: bold;
    }
    .userContent p:last-child{
        font-size:12px;
        color:#999;
        margin-top:5px;
        letter-spacing: 1px;
    }
    .content{
        width:300px;
        margin-left:60px;
    }
    .itemImage{
        display: flex;
        flex-wrap: wrap;
        width:300px;
        margin-left:50px;
    }
    .itemImage img{
        width:60px;
        height: 60px;
        margin-left:10px;
        margin-top:10px;
    }
    .icon{
        width:88%;
        margin:0 auto;
        display: flex;
        justify-content: flex-end;
        margin-top:10px;
        position: relative;
    }
    .icon img{
        width:20px;
        height: 15px;
    }
    .iconOption{
        position: absolute;
        background: #4c5154;
        width:180px;
        display: flex;
        border-radius: 10px;
        padding: 16px 0;
        right:8%;
        top:-20px;
    }
    .iconItem{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .iconItem img{
        width:22px;
        height: 20px;
        margin-right: 7px;
    }
    .iconItem p{
        color:#fff;
    }
    .jianjiao{
        width:12px;
        height: 12px;
        margin-left:75px;
        display: block;
        margin-bottom: -2px;
    }

    .coment {
        background: #f3f3f6;
        width: 79%;
        margin-left:60px;
    }
    .history{
        display: flex;
        flex-wrap: wrap;
        width:90%;
        margin:0 auto;
        padding: 10px 0;
    }
    .history img{
        width:20px;
        height: 20px;
        margin-right: 10px;
    }
    .history p{
        color:#0094ff;
    }
    .history p span{
        color:#333;
    }
    .comentContent{
        width:95%;
        margin-left:4%;
        padding-bottom: 10px;
    }
    .comentContent p{
        text-align: justify;
        margin-top:5px;
    }
    .comentContent span{
        color:#0094ff;
    }
</style>
