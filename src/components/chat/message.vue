<template>
    <div class="message">
        <mt-header fixed title="消息">
            <img id="search" slot="left" src="@/static/image/chat/search.png" alt="">
            <img id="add" slot="right" @click="option"  src="@/static/image/chat/add.png" alt="">
        </mt-header>
        <div class="option" v-show="showOption">
            <div class="optionItem">
                <img src="@/static/image/chat/addPeople.png" alt="">
                <p>添加好友</p>
            </div>
            <div class="optionItem">
                <img src="@/static/image/chat/scan.png" alt="">
                <p>扫一扫</p>
            </div>
            <div class="optionItem">
                <img src="@/static/image/chat/conversation.png" alt="">
                <p>发起聊天</p>
            </div>
            <div class="optionItem" style="border-bottom: none">
                <img src="@/static/image/chat/group.png" alt="">
                <p>发起群聊</p>
            </div>
            <div class="optionItem" style="border-bottom: none">
                <img style="width:17px;height: 8.5px;" src="@/static/image/chat/recommend.png" alt="">
                <p>推荐</p>
            </div>
        </div>
        <div class="event">
            <div class="eventItem1">
                <img style="margin-top:40px;" src="@/static/image/chat/event1.png" alt="">
                <div style="margin-top:40px;">
                    <p>推荐</p>
                    <p>推荐人数：10人</p>
                </div>
            </div>
            <router-link :to="{name:'pending'}">
                <div class="eventItem1" style="border-bottom: none">
                    <img src="@/static/image/chat/event2.png" alt="">
                    <div>
                        <p>待处理事项{{count}}</p>
                        <p>11个请求待处理</p>
                    </div>
                </div>
            </router-link>

        </div>
        <div class="color"></div>
        <div v-for="item in dialog" class="chatList">
            <mt-cell-swipe
                    :right="[
                    {
                      content: '删除',
                      style: { background: '#26a2ff', color: '#fff',height:60},
                      handler: () => this.$messagebox('delete'),
                    }]">
                <router-link :to="{name:'chat',query:{user1Id:item.occupants_ids[0]}}">
                    <div style="height:60px"></div>
                    <div class="listLeft">
                        <img src="@/static/image/chat/event1.png" alt="">
                        <div class="chatItem">
                            <p>{{item.name}}</p>
                            <p v-html="replaceIcon(item.last_message)"></p>
                        </div>
                    </div>
                    <p class="time">14:45</p>
                </router-link>
            </mt-cell-swipe>
            <div style="border:1px solid #eee;width:90%;margin:0 auto"></div>
        </div>
        <!--<svg class="icon" aria-hidden="true">-->
            <!--<use xlink:href="#:-iconfuzhi"></use>-->
        <!--</svg>-->

    </div>
</template>

<script>
    import '@/static/font/iconfont.js'
    import {mapState,mapGetters} from "vuex"
    export default {
        name: "message",
        data(){
            return{
                num:0,
                showOption:false,
                startX:0,
                endX:0,
                dialog:[]
            }
        },
        mounted(){
            this.$store.dispatch('increment');
            // let a = this.$store.getters.getTodoById(2)
            // console.log('a',a)
            // let a = this.$store.getters,getTodoById(2);
            // console.log('a',a)
            let userInfo = JSON.parse(window.localStorage.getItem("loginInfo"));
            var user2 = {
                id:userInfo.im,
                login:userInfo.username,
                pass:userInfo.password
            }
            this.auth();
            let that = this;
            QB.createSession({login: user2.login, password: user2.pass}, function(err, res) {
                if (res) {
                    QB.chat.connect({userId: user2.id, password: user2.pass}, function(err, roster) {
                        if (err) {
                            console.log(err);
                        } else {
                            var filters = null;

                            QB.chat.dialog.list(filters, function(err, resDialogs) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    let arr = [];
                                    let list = resDialogs.items;
                                    for(let item of list){
                                        if(item.last_message){
                                            arr.unshift(item)
                                        }
                                    }
                                    that.dialog = arr;
                                    console.log( that.dialog)
                                }
                            });
                        }
                    });
                }else{
                    console.log(err);
                }
            });

        },
        methods:{
            option(){
                this.showOption = !this.showOption
            },
            auth(){
                var CREDENTIALS = {
                    appId: 74922,
                    authKey: 'YV2HHCXKW7bTTMe',
                    authSecret: 'ezY5UUmar5J2u-C'
                };
                var CONFIG = {
                    endpoints: {
                        api: "api.quickblox.com",
                        chat: "chat.quickblox.com"
                    },
                    chatProtocol: {
                        active: 2 // set 1 to use BOSH, set 2 to use WebSockets (default)
                    },
                    debug: {
                        'mode': 1,
                        'file': null
                    }
                };
                QB.init(CREDENTIALS.appId, CREDENTIALS.authKey, CREDENTIALS.authSecret);
            },
            replaceIcon(con){
                if (!con) {
                    return '暂无消息';
                }
                if (this.getIndex(con,'/:') > -1) {
                    var exps = this.EXPS;
                    for (var i = 0; i < exps.length; i++) {
                        con = con.replace(exps[i].reg, '<img src="' + exps[i].file + '"  alt="" />');
                    }
                }else if(this.getIndex(con,'<')>-1 && this.getIndex(con,'<')<=1){
                    con = "图片"
                }
                return con;
            },
            getIndex(msg,str){
                return msg.toString().indexOf(str)
            }
        },
        // computed:mapState({
            // count(){
            //     console.log('msgCount',this.$store.state.count)
            //     return this.$store.state.count
            // }
            // count(state){
            //     return state.count
            // }
        // })
        // computed:mapState([
        //     'count'
        // ])
        computed:{
            ...mapState([
                'count'
            ]),
            ...mapGetters([
                'doneTodos'
            ])
        }
    }
</script>

<style scoped>
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
        background: rgba(0,0,0,0.6);
        z-index:10;
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
</style>
