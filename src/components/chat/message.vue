<template>
    <div class="message">
        <mt-header fixed title="消息" style="z-index:11">
            <img id="search" slot="left" src="@/static/image/chat/search.png" alt="">
            <img id="add" slot="right" @click.stop="showOption=!showOption"  src="@/static/image/chat/add.png" alt="">
        </mt-header>
        <mu-fade-transition>
            <div class="option" v-show="showOption" v-click-outside="clickoutside">
                <router-link :to="{name:'addFriend'}">
                    <div class="optionItem">
                        <img src="@/static/image/chat/addPeople.png" alt="">
                        <p>添加好友</p>
                    </div>
                </router-link>
                <router-link :to="{name:'recommend'}">
                    <div class="optionItem" style="border-bottom: none">
                        <img style="width:17px;height: 8.5px;" src="@/static/image/chat/recommend.png" alt="">
                        <p>推荐</p>
                    </div>
                </router-link>
            </div>
        </mu-fade-transition>
        <div class="event">
            <router-link :to="{name:'recommend'}">
                <div class="eventItem1">
                    <img style="margin-top:40px;" src="@/static/image/chat/event1.png" alt="">
                    <div style="margin-top:40px;">
                        <p>推荐</p>
                        <p>推荐人数：10人</p>
                    </div>
                </div>
            </router-link>
            <router-link :to="{name:'pending'}">
                <div class="eventItem1" style="border-bottom: none">
                    <img src="@/static/image/chat/event2.png" alt="">
                    <div>
                        <p>待处理事项</p>
                        <p>{{adminData.length}}个请求待处理</p>
                    </div>
                </div>
            </router-link>

        </div>
        <div class="color"></div>
        <div v-for="(item,index) in messageData" class="chatList" @click="removeDot(item,index)">
            <mt-cell-swipe
                    :right="[
                    {
                      content: '删除',
                      style: { background: '#26a2ff', color: '#fff',height:60},
                      handler: () => $messagebox(index),
                    }]">

                <!--<router-link :to="{name:'chat',query:{info:item[0]}}">-->
                    <div style="height:60px"></div>
                    <div class="listLeft">
                        <img :src="ip+'/business/image?image='+item[0].portrait" alt="">
                        <div class="chatItem">
                            <p>{{item[0].nickName}}</p>
                            <p v-html="handleMsg(item[item.length-1].sourceMsg)"></p>
                        </div>
                    </div>
                    <div class="time" style="display: flex;align-items: center">
                        <p>{{item[item.length-1].time.split(' ')[1]}}</p>
                        <div style="background:#fd4a36;width:8px;height:8px;border-radius:5px;margin-left:5px;" v-if="!item[item.length-1].isChecked"></div>
                    </div>
                    <!--<p class="time">{{item[item.length-1].time.split(' ')[1]}}</p>-->
                <!--</router-link>-->
            </mt-cell-swipe>
            <div style="border:1px solid #eee;width:90%;margin:0 auto"></div>
        </div>
        <div class="border"></div>
        <router-view v-if="offsetWidth>500" style="z-index:10;padding-bottom:60px;width:50%;position:absolute;top:0;right:0">

        </router-view>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import '@/static/font/iconfont.js'

    export default {
        name: "message",
        data(){
            return{
                num:0,
                showOption:false,
                from_username:'',
                receiveNickName:'',
                headimgurl:'',
                password:'',
                accence_token:'',
                myNickName:'',
                chatHistory: [],
                ip:'',
                offsetWidth:''
            }
        },
        mounted(){
            this.ip = this.imageUri;
            this.offsetWidth = document.body.offsetWidth
            let refresh = localStorage.getItem('refresh')||0;
            if(refresh!=1){
                localStorage.setItem('refresh',1);
                this.$router.go(0)
            }
        },
        computed:{
            ...mapState([
                'emoji',
                'userInfo',
                'adminData',
                'messageData'
            ])
        },
        methods:{
            $messagebox(item){
                console.log(item)
                let messageData = JSON.parse(localStorage.getItem('messageData'));
                delete messageData[item];
                console.log('messageData',messageData)
                this.$store.dispatch('deleteMessageData',messageData);
                localStorage.setItem('messageData',JSON.stringify(messageData))
            },
            toChat(item){
                console.log(item)
                // this.$imconn.close();
                // this.$router.push({name:'chat',query:{info:item[0]}})
            },
            clickoutside(){
                this.showOption = false
            },
            removeDot(item,index){
                // console.log(item[item.length-1])
                let messageData=this.messageData;
                messageData[index][item.length-1].isChecked = true;
                this.$store.dispatch('setMsgOnChat',messageData)
                localStorage.setItem('messageData', JSON.stringify(messageData));
                let aa = JSON.stringify(item[0])
                // console.log(item[0])
                if(this.offsetWidth>500){
                    this.$router.replace({path:`/chat2/${aa}`})
                }else{
                    this.$router.push({name:'chat',query:{info:item[0]}})
                }

            },
            handleMsg (msg) {
                if (!msg) {
                    return;
                }
                if (msg.toString().indexOf('[') > -1) {
                    let exps = /\[[^\[\]]+\]/g;
                    let params = msg.match(exps);
                    // console.log(params);
                    for(let item of params){
                        // console.log(this.emoji[item])
                        msg = msg.replace(item, `<img style="width:18px;" src="${this.emoji[item]}"  alt="" />`);
                    }
                }
                return msg;
            },
            getIndex(msg,str){
                return msg.toString().indexOf(str)
            }
        }
    }
</script>

<style scoped>
    .border{
        height:100%;width:1px;border-right:1px solid #ddd;position:absolute;left:50%;top:0;z-index:10
    }
    a{
        text-decoraction: none;
        color:#333;
    }
    .icon {
        width: 1em;
        height: 1em;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
    }
    .mint-cell-swipe-button{
        vertical-align: center;
    }
    #search{
        width:18px;
        height: 18px;
    }
    #add{
        width:18px;
        height: 18px;
    }
    /*点击加号出现的选择项*/
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
    .event{
        width:50%;
    }
    .eventItem1{
        display: flex;
        align-items: center;
        width: 90%;
        margin:0 auto;
        border-bottom: 1px solid #ddd;
        padding: 10px 0;
    }
    .eventItem1 img{
        width:40px;
        height: 40px;
    }
    .eventItem1 div p:first-child{
        margin-left:10px;
        font-size:16px;
        letter-spacing: 1px;
        font-family: "PingFang-SC-Bold";
    }
    .eventItem1 div p:last-child{
        margin-left:10px;
        font-size:14px;
        color:#666;
        letter-spacing: 1px;
        margin-top:4px;
        width:240px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }

    .eventItem{
        display: flex;
        align-items: center;
        border-bottom: 1px solid #ddd;
        padding: 10px 0;
    }
    .eventItem img{
        width:50px;
        height: 50px;
        margin-left:5px;
    }
    .eventItem div p:first-child{
        margin-left:10px;
        font-size:17px;
        letter-spacing: 1px;
        font-family: "PingFang-SC-Bold";
    }
    .eventItem div p:last-child{
        margin-left:10px;
        font-size:14px;
        color:#888;
        letter-spacing: 1px;
        margin-top:4px;
        width:240px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }

    .time{
        font-size:14px;
        color:#888;
        text-align: center;
        position: absolute;
        right: 20px;
        top: 15px;
    }
    /*灰色隔块*/
    .color{
        width: 100%;
        height: 10px;
        background: #efefef;
    }

    .chatList{
        /*min-width: 354px;*/
        width:50%;
        position: relative;
    }
    .listLeft{
        display: flex;
        width:300px;
        position: absolute;
        left:10px;
        top:8px;
    }
    .listLeft > img{
        width:44px;
        height: 44px;
        border-radius:20px;
        margin-left:10px;
    }
    .chatItem{
        margin-left:10px;
    }
    .chatItem p{
        font-size:14px;
        color:#666;
    }
    .chatItem p:first-child{
        font-size:16px;
        color:#000;
        margin-bottom: 8px;
    }
    .chatItem p:last-child{
        width:100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    @media screen and (max-width: 500px){
        .border{
            display: none;
        }
        .icon {
            width: 1em;
            height: 1em;
            vertical-align: -0.15em;
            fill: currentColor;
            overflow: hidden;
        }
        .mint-cell-swipe-button{
            vertical-align: center;
        }
        #search{
            width:18px;
            height: 18px;
        }
        #add{
            width:18px;
            height: 18px;
        }
        /*点击加号出现的选择项*/
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
        .event{
            width:100%;
        }
        .eventItem1{
            display: flex;
            align-items: center;
            width: 90%;
            margin:0 auto;
            border-bottom: 1px solid #ddd;
            padding: 10px 0;
        }
        .eventItem1 img{
            width:40px;
            height: 40px;
        }
        .eventItem1 div p:first-child{
            margin-left:10px;
            font-size:16px;
            letter-spacing: 1px;
            font-family: "PingFang-SC-Bold";
        }
        .eventItem1 div p:last-child{
            margin-left:10px;
            font-size:14px;
            color:#666;
            letter-spacing: 1px;
            margin-top:4px;
            width:240px;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
        }

        .eventItem{
            display: flex;
            align-items: center;
            border-bottom: 1px solid #ddd;
            padding: 10px 0;
        }
        .eventItem img{
            width:50px;
            height: 50px;
            margin-left:5px;
        }
        .eventItem div p:first-child{
            margin-left:10px;
            font-size:17px;
            letter-spacing: 1px;
            font-family: "PingFang-SC-Bold";
        }
        .eventItem div p:last-child{
            margin-left:10px;
            font-size:14px;
            color:#888;
            letter-spacing: 1px;
            margin-top:4px;
            width:240px;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
        }

        .time{
            font-size:14px;
            color:#888;
            text-align: center;
            position: absolute;
            right: 20px;
            top: 15px;
        }
        /*灰色隔块*/
        .color{
            width: 100%;
            height: 10px;
            background: #efefef;
        }

        .chatList{
            /*min-width: 354px;*/
            width:100%;
            position: relative;
        }
        .listLeft{
            display: flex;
            width:300px;
            position: absolute;
            left:10px;
            top:8px;
        }
        .listLeft > img{
            width:44px;
            height: 44px;
            border-radius:20px;
            margin-left:10px;
        }
        .chatItem{
            margin-left:10px;
        }
        .chatItem p{
            font-size:14px;
            color:#666;
        }
        .chatItem p:first-child{
            font-size:16px;
            color:#000;
            margin-bottom: 8px;
        }
        .chatItem p:last-child{
            width:100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }


</style>
