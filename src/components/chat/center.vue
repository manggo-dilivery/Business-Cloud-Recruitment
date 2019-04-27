<template>
    <div class="center">
        <div class="user">
            <img src="@/static/image/chat/centerbg.png" alt="">
            <div class="userInfo">
                <div class="setting">
                    <router-link :to="{name:'setting'}">
                        <img src="@/static/image/chat/setting.png" alt="">
                    </router-link>
                    <img src="@/static/image/chat/code.png" alt="">
                </div>
                <div class="userItem">
                    <img :src="this.ip+'/business/image?image='+this.info.portrait" alt="">
                    <div class="userItemDiv">
                        <div>
                            <p>用户A</p>
                            <p>技术总监</p>
                            <img src="@/static/image/chat/v1.png" alt="">
                        </div>
                        <p>阿里巴巴网络技术有限公司</p>
                    </div>
                    <p>影响力：19</p>
                </div>
            </div>
        </div>
        <div class="collection">
            <div class="colItem">
                <img src="@/static/image/chat/collection.png" alt="">
                <p>我的收藏</p>
            </div>
            <span style="width:1px;height: 22px;border-right: 1px solid #fff;"></span>
            <div class="colItem">
                <img src="@/static/image/chat/money.png" alt="">
                <p>我的余额</p>
            </div>
        </div>
        <div class="list">
            <!--<div class="item" @click="fillInfo">-->
                <!--<div class="itemLeft">-->
                    <!--<img src="@/static/image/chat/home.png" alt="">-->
                    <!--<p>完善信息</p>-->
                <!--</div>-->
                <!--<div class="itemRight">-->
                    <!--<img src="@/static/image/chat/iconRight.png" alt="">-->
                <!--</div>-->
            <!--</div>-->
            <div class="item" @click="goal">
                <div class="itemLeft">
                    <img src="@/static/image/chat/home.png" alt="">
                    <p>{{chooseGoal}}</p>
                </div>
                <div class="itemRight">
                    <img src="@/static/image/chat/iconRight.png" alt="">
                </div>
            </div>
            <router-link :to="{name:'personPage2'}">
                <div class="item">
                    <div class="itemLeft">
                        <img src="@/static/image/chat/link.png" alt="">
                        <p>个人主页</p>
                    </div>
                    <div class="itemRight">
                        <!--<p>IT/互联网，产品设计带带</p>-->
                        <img src="@/static/image/chat/iconRight.png" alt="">
                    </div>
                </div>
            </router-link>
            <router-link :to="{name:'intrest'}">
                <div class="item">
                    <div class="itemLeft">
                        <img src="@/static/image/chat/hobbit.png" alt="">
                        <p>兴趣爱好</p>
                    </div>
                    <div class="itemRight">
                        <p>{{hobby}}</p>
                        <img src="@/static/image/chat/iconRight.png" alt="">
                    </div>
                </div>
            </router-link>
            <!--<div class="item">-->
                <!--<div class="itemLeft">-->
                    <!--<img src="@/static/image/chat/position.png" alt="">-->
                    <!--<p>所在地区</p>-->
                <!--</div>-->
                <!--<div class="itemRight">-->
                    <!--<p>江苏南京</p>-->
                    <!--<img src="@/static/image/chat/iconRight.png" alt="">-->
                <!--</div>-->
            <!--</div>-->
        </div>
        <div style="margin-top:10px;background:#fff;width:100%">
            <div class="item" style="border-bottom: none">
                <div class="itemLeft">
                    <img src="@/static/image/chat/position.png" alt="">
                    <p>银行卡管理</p>
                </div>
                <div class="itemRight">
                    <img src="@/static/image/chat/iconRight.png" alt="">
                </div>
            </div>
        </div>
        <div class="topic">
            <div class="topicDiv">
                <p>感兴趣的话题</p>
            </div>
            <div class="topicList">
                <p>打篮球</p>
                <p>寻觅美食</p>
                <p>打篮球</p>
                <p>寻觅美食</p>
                <p>打篮球</p>
                <p>寻觅美食</p>
                <p>打篮球</p>
                <p>寻觅美食</p>
            </div>
        </div>
        <div class="work">
            <div class="item">
                <div class="itemLeft">
                    <p>工作经历</p>
                </div>
                <div class="itemRight">
                    <p>添加工作经历</p>
                    <img src="@/static/image/chat/iconRight.png" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {MessageBox} from 'mint-ui'
    export default {
        name: "center",
        data(){
            return{
                info:{},
                chooseGoal:'',
                ip:'',
                hobby:''
            }
        },
        mounted(){
            this.info = JSON.parse(window.localStorage.getItem("loginInfo"));
            this.ip = this.imageUri;
            let data = JSON.parse(window.localStorage.getItem("intrest"))||[];
            this.hobby = data.join();
            if(this.info.type===0){
                this.chooseGoal = '个人目标'
            }else{
                this.chooseGoal = '企业目标'
            }
        },
        methods:{
            exitLogin(){
                MessageBox.confirm('确定退出登录?').then(action => {
                    localStorage.removeItem('loginInfo');
                    // window.location.reload();
                    this.$router.push({path:'/registerOption'});
                    // this.$destroy('ChatHome');
                });

            },
            goal(){
                if(this.info.type===0){
                    this.$router.push('/companyTarget')
                }else{
                    this.$router.push('/companyTarget')
                }
            },
            fillInfo(){
                if(this.info.type===0){
                    this.$router.push('/loginInfo2')
                }else{
                    this.$router.push('/loginInfo')
                }
            }
        }
    }
</script>

<style scoped>
    .center{
        background: #f1f2f6;
        padding-bottom: 46px;
    }
    .user{
        width:100%;
        position: relative;
        left:0;
    }
    .user > img{
        width:100%;
        height: 146px;
    }
    .userInfo{
        width:100%;
        position: absolute;
        top:0;
    }
    .setting{
        width:100%;
        display: flex;
        justify-content: flex-end;
        margin-top:14px;
    }
    .setting img{
        width:23px;
        height: 23px;
        margin-right:30px;
    }
    .userItem{
        display: flex;
        align-items: center;
        margin-top:16px;
        position: relative;
        width:100%;
        justify-content: space-between;
    }
    .userItem > img{
        width:65px;
        height: 65px;
        border-radius:50%;
        margin-left:15px;
    }
    .userItemDiv{
        position: absolute;
        left:94px;
    }
    .userItemDiv div{
        display: flex;
        align-items: center;
    }
    .userItemDiv div p:first-of-type{
        font-size: 18px;
        color:#fff;
    }
    .userItemDiv div p:last-of-type{
        font-size: 15px;
        margin-left:10px;
        margin-right: 8px;
        color:#fff;
    }
    .userItemDiv div img{
        width:16px;
        height: 16px;
    }
    .userItemDiv > p{
        color:#fefefe;
        margin-top:10px;
        font-size:13px;

    }
    .userItem > p{
        width:104px;
        background: #33a8f0;
        padding: 5px 0 5px 2px;
        border-top-left-radius:20px;
        border-bottom-left-radius:20px;
        text-align: center;
        color:#ffffff;
    }
    /*收藏和余额*/
    .collection{
        width:100%;
        background: #0094ff;
        display: flex;
        align-items: center;
        height: 60px;
    }
    .colItem{
        flex:1;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .colItem img{
        width:26px;
        height: 26px;
        margin-right: 10px;
    }
    .colItem p{
        color:#fff;
    }
    /*列表项*/
    .list{
        margin-top:10px;
        background: #fff;
        width:100%;
    }
    .item{
        width:90%;
        margin:0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom:1px solid #eee;
        padding: 10px 0;
    }
    .itemLeft,.itemRight{
        display: flex;
        align-items: center;
    }
    .itemLeft img{
        width:32px;
        height: 32px;
        margin-right: 12px;
    }
    .itemLeft p{
        font-size:17px;
    }
    .itemRight p{
        width:134px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        font-size:13px;
        color:#999;
        text-align: right;
        margin-right:8px;
    }
    .itemRight img{
        width:8px;
    }
    /*感兴趣的话题*/
    .topic{
        width:100%;
        background: #fff;
        margin-top:10px;
        padding-bottom: 16px;
    }
    .topicDiv{
        width:100%;
        border-bottom:1px solid #eee;
        padding: 10px 0;
    }
    .topicDiv p{
        font-size:18px;
        margin-left:20px;
        letter-spacing: 1px;
    }
    .topicList{
        width: 92%;
        margin:0 auto;
        display: flex;
        flex-wrap: wrap;
    }
    .topicList p{
        background: #e5f8ff;
        margin-right: 10px;
        padding: 5px 10px;
        margin-top:10px;
        border-radius:6px;
        font-size:14px;
        letter-spacing: 1px;
    }
    /*工作经历*/
    .work{
        background: #fff;
        margin-top:10px;
    }
</style>
