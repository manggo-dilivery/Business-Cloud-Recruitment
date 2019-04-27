<template>
    <div class="container">
        <topNav title="公司主页"></topNav>
        <img src="@/static/image/chat/caidan.png" @click.stop="showOption=!showOption" class="caidan" alt="">
        <mu-fade-transition>
            <div class="option" v-show="showOption"  v-click-outside="clickoutside">
                <div class="optionItem" @click="shoucang">
                    <img src="@/static/image/chat/addPeople.png" alt="">
                    <p>收藏</p>
                </div>
                <div class="optionItem" @click="jubao">
                    <img src="@/static/image/chat/scan.png" alt="">
                    <p>投诉</p>
                </div>
                <div class="optionItem" @click="deleteFriend">
                    <img src="@/static/image/chat/conversation.png" alt="">
                    <p>删除</p>
                </div>
                <div class="optionItem" style="border-bottom: none" @click="addToBlackList">
                    <img src="@/static/image/chat/group.png" alt="">
                    <p>拉黑</p>
                </div>
            </div>
        </mu-fade-transition>
        <div class="topInfo">
            <img class="bgImg" src="@/static/image/chat/bg3.png" alt="">
            <div class="empty"></div>
            <div class="title">
                <img src="@/static/image/chat/bg2.png" alt="">
                <div class="titleName">
                    <div class="titleTop">
                        <div class="titleTopDiv">
                            <img :src="ip+'/business/image?image='+info.portrait" alt="">
                            <p class="userTitle">
                                {{info.username}}
                                <img style="width:14px;margin-top:9px;" src="@/static/image/chat/v1.png" alt="">
                            </p>
                        </div>
                        <p class="x1">影响力：19</p>
                    </div>
                    <div class="infoList">
                        <div class="item">
                            <img style="width:16px;height: 12px;" src="@/static/image/chat/info3.png" alt="">
                            <p>公司邮箱：<span>{{info.email}}</span></p>
                        </div>
                        <div class="item">
                            <img style="width:16px;height: 12px;" src="@/static/image/chat/info2.png" alt="">
                            <p>公司电话：<span>{{info.telephone}}</span></p>
                        </div>
                        <div class="item">
                            <img style="width:14px;height:16px;" src="@/static/image/chat/info1.png" alt="">
                            <p>公司地址：<span>{{info.area}}</span></p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="introduction">
                <p class="introductionTitle">公司简介</p>
                <Introduct></Introduct>
            </div>
            <div class="tag">
                <p class="introductionTitle">公司目标</p>
                <Tag></Tag>
            </div>
            <div class="tag">
                <p class="tabTag"><span>我招聘的职位</span><span style="display: flex;align-items: center">更多<img style="width:7px;margin-left:6px;" src="@/static/image/chat/iconRight.png"/></span></p>
                <div class="jobContent">
                    <div class="jobBorder">
                        <div class="jobList">
                            <div class="listTitle">
                                <p>UI设计</p>
                                <p>15k-30k</p>
                            </div>
                            <p class="companyName">江苏你好科技有限公司</p>
                            <div class="need">
                                <p>南京 鼓楼区 三牌楼</p>
                                <p>经验不限</p>
                                <p>本科</p>
                            </div>
                        </div>
                    </div>
                    <div class="jobBorder">
                        <div class="jobList">
                            <div class="listTitle">
                                <p>UI设计</p>
                                <p>15k-30k</p>
                            </div>
                            <p class="companyName">江苏你好科技有限公司</p>
                            <div class="need">
                                <p>南京 鼓楼区 三牌楼</p>
                                <p>经验不限</p>
                                <p>本科</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style="height: 41px;"></div>
            <mt-button type="primary" size="large" @click="sendMsg" style="position:fixed;bottom:0;font-size: 15px;width: 94%;left:3%">发送消息</mt-button>
        </div>
    </div>
    </template>

    <script>
        import {MessageBox} from 'mint-ui'
        import {mapState} from 'vuex'
        export default {
            name: "peosonPage",
            data(){
                return{
                    info:{},
                    showOption:false,
                    im:'',
                    userInfo:{},
                    friendInfo:{},
                    ip:''
                }
            },
            mounted(){
                this.ip = this.imageUri;
                this.userInfo = JSON.parse(localStorage.getItem('loginInfo'));
                console.log('this.userInfo',this.userInfo)
                let friendIm = this.$route.query.friendInfo.im;
                this.$axios.get('/business/user/im/'+friendIm).then(res=>{
                    this.friendInfo = res.data.data
                })
                this.friendInfo = this.$route.query.friendInfo;
                if(friendIm){
                    this.$store.dispatch('setPersonPageData',friendIm)
                }else{
                    friendIm = this.personPageData
                }
                this.im = friendIm;
                this.req(friendIm);
                console.log(friendIm)
            },
            computed:{
                ...mapState([
                    'personPageData'
                ])
            },
            methods:{
                addToBlackList(){
                    let uid = this.userInfo.uid;
                    MessageBox.confirm('确定执行此操作?').then(action => {
                        // console.log(this.friendsInfo)
                        this.$axios.get('/business/user/im/'+this.im).then(res=>{
                            console.log(res)
                            let fuid = res.data.data.uid;
                            this.$axios.post('/business/blackList/user/'+uid+'/black/'+fuid).then(res=>{
                                console.log(res);
                            })
                        })
                    });
                },
                shoucang(){
                    MessageBox.confirm('确定执行此操作?').then(action => {
                        // console.log(this.friendsInfo)

                    });
                },
                jubao(){
                    MessageBox.confirm('确定执行此操作?').then(action => {
                        this.$router.push({name:'suit',query:{userInfo:this.friendInfo}})
                    });
                },
                deleteFriend(){
                    MessageBox.confirm('确定执行此操作?').then(action => {
                        // console.log(this.friendsInfo)
                        this.$axios.delete('/business/friends/user/'+this.userInfo.uid+'/friends/'+this.friendInfo.uid).then(res=>{
                            console.log(res)
                        })
                    });
                },
                clickoutside(){
                    this.showOption = false
                },
                sendMsg(){
                    console.log(this.info)
                    this.$router.push({name:'chat',query:{info:this.info}})
                },
                req(to_username){
                    this.$axios.get('/business/user/im/'+to_username).then(res=>{
                        console.log(res)
                        this.info = res.data.data;
                    }).catch(err=>{console.log(err)})
                }
            }
        }
    </script>

    <style scoped>
        .empty{
            display: none;
        }
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
        .jobContent{
            width: 100%;
        }
        .jobBorder{
            width: 100%;
            border-top:1px solid #eee;
        }
        .jobList{
            width:90%;
            margin:0 auto;
            padding: 14px 0;
        }
        .jobContent .jobList:first-child{
            border-top:none;
        }
        .listTitle{
            display: flex;
            justify-content: space-between;
        }
        .listTitle p{
            font-size:16px;
            color:#333;
        }
        .listTitle p:last-child{
            color:#0094ff;
        }
        .companyName{
            font-size: 14px;
            margin:7px 0;
            color:#666;
        }
        .need{
            display: flex;
            flex-wrap: wrap;
        }
        .need p{
            padding: 3px 10px;
            color: #999;
            background: #f9f9f8;
            margin-right: 10px;
            border-radius:3px;
        }

        .infoList{
            width:90%;
            margin:0 auto;
            margin-top:14px;
        }
        .item{
            display: flex;
            align-items: center;
            margin-top:3px;
        }
        .item p{
            color:#666666;
            margin-left:10px;
            font-size:14px;
            letter-spacing:1.4px;
        }
        .item p span{
            letter-spacing: 0;
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
            z-index:0;
        }
        .bgImg{
            width:100%;
            height: 400px;
        }
        .empty{
            width:100%;
            height: 82px;
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
            width:96%;
            height: 200px;
            top:100px;
            left:3%;
        }
        .title > img{
            width:80%;
            left:10%;
            position: absolute;
            z-index:1;
            height:300px;
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
        }
        .introduction{
            background: #ffffff;
            margin-top:10px;
            padding-top: 5px;
            padding-bottom: 12px;
        }
        .introductionTitle{
            font-size: 16px;
            padding: 5px 15px;
            border-bottom:1px solid #eee;
            letter-spacing: 1px;
        }
        .tag{
            background: #ffffff;
            margin-top:10px;
        }
        .tabTag{
            font-size: 16px;
            padding: 5px 15px;
            border-bottom:1px solid #eee;
            letter-spacing: 1px;
            display: flex;
            justify-content: space-between;
        }
        .titleTop{
            display: flex;
            justify-content: space-between;
        }
        .titleTopDiv{
            display: flex;
            align-items: center;
        }
        .titleTopDiv > img{
            width:54px;
            height: 54px;
            border-radius:50%;
        }
        .titleName{
            position: relative;
            z-index: 3;
            padding: 20px 20px;
            width:70%;
            margin-left:15%;
            margin-top:20px;
        }
        .titleTop{
            display: flex;
            align-items: center;
        }
        .titleTop{
            margin-top:14px;
        }
        .userTitle{
            width:126px;
            font-size: 17px;
            margin-left:4px;
            color:#000;
        }
        .userTitle img{
            margin-top:5px !important;
        }
        .x1{
            width:90px;
            color:#0094ff;
            border:1px solid #0094ff;
            border-radius:6px;
            padding: 1px 5px;
            font-size:12px;
        }
        @media screen and (max-width: 500px){
            .empty{
                display: block;
            }
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
            .jobContent{
                width: 100%;
            }
            .jobBorder{
                width: 100%;
                border-top:1px solid #eee;
            }
            .jobList{
                width:90%;
                margin:0 auto;
                padding: 14px 0;
            }
            .jobContent .jobList:first-child{
                border-top:none;
            }
            .listTitle{
                display: flex;
                justify-content: space-between;
            }
            .listTitle p{
                font-size:16px;
                color:#333;
            }
            .listTitle p:last-child{
                color:#0094ff;
            }
            .companyName{
                font-size: 14px;
                margin:7px 0;
                color:#666;
            }
            .need{
                display: flex;
                flex-wrap: wrap;
            }
            .need p{
                padding: 3px 10px;
                color: #999;
                background: #f9f9f8;
                margin-right: 10px;
                border-radius:3px;
            }

            .infoList{
                width:90%;
                margin:0 auto;
                margin-top:14px;
            }
            .item{
                display: flex;
                align-items: center;
                margin-top:3px;
            }
            .item p{
                color:#666666;
                margin-left:10px;
                font-size:14px;
                letter-spacing:1.4px;
            }
            .item p span{
                letter-spacing: 0;
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
                z-index:0;
            }
            .bgImg{
                width:100%;
                height:175px;
            }
            .empty{
                width:100%;
                height: 82px;
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
                width:96%;
                height: 200px;
                top:100px;
                left:3%;
            }
            .title > img{
                width:100%;
                left:0;
                position: absolute;
                z-index:1;
                height:190px;
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
            }
            .introduction{
                background: #ffffff;
                margin-top:10px;
                padding-top: 5px;
                padding-bottom: 12px;
            }
            .introductionTitle{
                font-size: 16px;
                padding: 5px 15px;
                border-bottom:1px solid #eee;
                letter-spacing: 1px;
            }
            .tag{
                background: #ffffff;
                margin-top:10px;
            }
            .tabTag{
                font-size: 16px;
                padding: 5px 15px;
                border-bottom:1px solid #eee;
                letter-spacing: 1px;
                display: flex;
                justify-content: space-between;
            }
            .titleTop{
                display: flex;
                justify-content: space-between;
            }
            .titleTopDiv{
                display: flex;
                align-items: center;
            }
            .titleTopDiv > img{
                width:54px;
                height: 54px;
                border-radius:50%;
            }
            .titleName{
                position: relative;
                z-index: 3;
                padding: 20px 20px;
                width:100%;
                margin-left:0;
                margin-top:0
            }
            .titleTop{
                display: flex;
                align-items: center;
            }
            .titleTop{
                margin-top:14px;
            }
            .userTitle{
                width:126px;
                font-size: 17px;
                margin-left:4px;
                color:#000;
            }
            .userTitle img{
                margin-top:5px !important;
            }
            .x1{
                width:90px;
                color:#0094ff;
                border:1px solid #0094ff;
                border-radius:6px;
                padding: 1px 5px;
                font-size:12px;
            }
        }
    </style>
