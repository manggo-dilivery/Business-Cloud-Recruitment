<template>
    <div>
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="(item,index) in image" :key="index">
                <img class="banner" :src="item"/>
            </mt-swipe-item>
        </mt-swipe>
        <!--九宫格-->
        <div class="mui-content">
            <ul class="mui-table-view mui-grid-view mui-grid-9">
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link :to="{name:'newsList',query:{username:username}}">
                        <span class="mui-icon mui-icon-home"></span>
                        <div class="mui-media-body">新闻资讯</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link :to="{name:'shareImage'}">
                        <span class="mui-icon mui-icon-email"></span>
                        <div class="mui-media-body">图文分享</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link :to="{name:'goodsList'}">
                        <span class="mui-icon mui-icon-chatbubble"></span>
                        <div class="mui-media-body">商品展示</div>
                    </router-link>
                </li>
                <li @click="unload" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <span class="mui-icon mui-icon-location"></span>
                    <div class="mui-media-body">留言反馈</div></a></li>
                <li @click="unload" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <span class="mui-icon mui-icon-search"></span>
                    <div class="mui-media-body">搜索资讯</div></a></li>
                <li @click="unload" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <span class="mui-icon mui-icon-phone"></span>
                    <div class="mui-media-body">联系我们</div></a></li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                username:'',
                image:[],
            }
        },
        created(){
            this.username = this.$route.query.username;
            this.$axios.get('/provide/lunbo').then( (result) => {
                for(var i=0 ; i<result.data.length ; i++){
                    this.image.push('http://localhost:80'+result.data[i].lunboUrl)
                }
            }).catch(function (err) {
                console.log(err)
            })
        },
        methods:{
            unload(){
                alert('暂未上线')
            }
        }
    }
</script>

<style scoped>

    .mint-swipe{
        height: 170px;
        color: #fff;
        font-size: 30px;
        text-align: center;
    }
    .banner{
        width: 100%;
        height: auto;
    }
    .mint-swipe-items-wrap{
        height: 187px;
        width:100%;
    }
    /*九宫格mui自定义样式*/
    .mui-table-view.mui-grid-view.mui-grid-9{
        background: #fff;
        margin-top:0;
    }
    .mui-table-view.mui-grid-view.mui-grid-9 li{
        border:0px;
    }
    .mui-icon-home:before,
    .mui-icon-email:before,
    .mui-icon-chatbubble:before,
    .mui-icon-location:before,
    .mui-icon-search:before,
    .mui-icon-phone:before{
        content:''
    }
    .mui-icon-home{
        background:url('../../static/images/news.png');
        background-repeat: round;
    }
    .mui-icon-email{
        background:url('../../static/images/picShare.png');
        background-repeat: round;
    }
    .mui-icon-chatbubble{
        background:url('../../static/images/goodShow.png');
        background-repeat: round;
    }
    .mui-icon-location{
        background:url('../../static/images/feedback.png');
        background-repeat: round;
    }
    .mui-icon-search{
        background:url('../../static/images/search.png');
        background-repeat: round;
    }
    .mui-icon-phone{
        background:url('../../static/images/callme.png');
        background-repeat: round;
    }
    .mui-icon{
        width:50px;
        height: 50px;
    }
</style>