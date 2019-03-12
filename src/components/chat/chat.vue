<template>
    <div class="app">
        <topNav title="英特尔"></topNav>
        <div class="xw-content"  @touchstart="toShowMaskInfo=false"  ref="xwBody">
            <div style="width:0;height: 50px;"></div>
            <div class="xw-chat-wrap">
                <ul>
                    <li v-for="messageList in records">
                        <div v-if="Boolean(messageList.receiveMsg)">
                            <!--<div class="xw-chat-time">{{messageList.time}}</div>-->
                            <div class="xw-chat-servicer">
                                <div class="xw-servicer-avantar-wrap">
                                    <img src="@/static/image/chat/intel.jpg" class="xw-servicer-avantar">
                                </div>
                                <div class="xw-chat-msg">
                                    <span v-html="replaceFace(messageList.receiveMsg)"></span>
                                </div>
                            </div>
                        </div>

                        <!-- 用户发送的消息模板-->
                        <div v-else>
                            <!--<div class="xw-chat-time">{{messageList.time}}</div>-->
                            <div class="xw-chat-customer">
                                <div class="xw-customer-avantar-wrap">
                                    <img src="@/static/image/chat/portrait.jpeg" class="xw-customer-avantar">
                                </div>
                                <div class="xw-chat-msg" style="display:inline-block">
                                    <span v-html="replaceFace(messageList.sendMsg)"></span>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>



        <div class="xw-footer-wrap" @touchstart="toShowMaskInfo=false">
            <div class="xw-footer-content">
                <div class="xw-vmodel-wrap">
                    <textarea class="xw-content-textarea" v-model="content" @focus="onFocusText"></textarea>
                </div>
                <div class="xw-chat-tool">
                    <div class="xw-chat-tool-item" >
                        <a href="javascript:;" :class="[showEmoji ? 'xw-face' :'xw-face-close','xw-chat-tool-btn']" @click="emojiFuc"></a>
                    </div>
                    <div class="xw-chat-tool-item chatBtn">
                        <a href="javascript:void(0)" class="xw-send-btn-text" v-if="content.trim().length" @click="sendMsg">发送</a>
                    </div>
                    <div class="xw-chat-tool-item" >
                        <form action="" name="file" class="chatFile">
                            <input type="file" id="chatAddImg" name="chatImg" @change="upload"/>
                            <!--<input class="file" type="file" accept="image/png,image/gif,image/jpg,image/jepg" @change="update"/>-->
                        </form>

                    </div>
                </div>
            </div>
            <!-- 表情开始 -->
            <div class="xw-window-text xw-face-emoji-ul" v-if="showEmoji">
                <div class="xw-chat-ul-box">
                    <mt-swipe :auto="0">
                        <mt-swipe-item v-for="n in Math.ceil(EXPS.length/15)" :key="n">
                            <li v-for="(item, index) in getEmotionData(n,15)" class="xw-faceEmoji">
                                <img :src="item.file" :data="item.code" v-on:click="content+=item.code">
                            </li>
                        </mt-swipe-item>
                    </mt-swipe>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {getEmojiData} from '../../api/api.js'
    export default {
        data() {
            return {
                comment:{},
                showEmoji: false,//是否显示表情
                testContents: ["今天天气不错", '这个问题还没遇到过', '你说什么，我听不明白', '今天周五了', '请稍后--', '当前客服忙', '您还有什么咨询的吗', '正在查询', 'gone with the wind'],
                content: '',
                //聊天记录
                records: [],
                showScore: false,//显示评分
                imgFile :{},
                EXPS: [],
                user1Id:''
            }
        },
        mounted(){
            this.user1Id = this.$route.query.user1Id;
            let userInfo = JSON.parse(window.localStorage.getItem("loginInfo"));
            console.log(userInfo);
            this._loadEmojiData();
            this.auth();
            var that = this;
            var user2 = {
                id:userInfo.im,
                login:userInfo.username,
                pass:userInfo.password
            }
            console.log('user2',user2)
            // var user2 = {
            //     id:73220645,
            //     login:'qbsb2',
            //     pass:'d272d9c8e8bc70412aed144cd73f49cf'
            // }
            QB.createSession({login: user2.login, password: user2.pass}, function(err, res) {
                if (res) {
                    QB.chat.connect({userId: user2.id, password: user2.pass}, function(err, roster) {
                        if (err) {
                            console.log(err);
                        } else {
                            // console.log(roster);
                        }
                    });
                }else{
                    console.log(err);
                }
                var filters = null;
                QB.chat.dialog.list(filters, function(err, resDialogs) {
                    if (err) {
                        console.log(err);
                    } else {
                        let dialogId = resDialogs.items[0]._id;
                        that.dialogId = dialogId;
                        // console.log('resDialogs',resDialogs)
                        that.msgList(dialogId,user2);
                    }
                });

                var userId = user2.id;
                QB.chat.onMessageListener = onMessage;
                function onMessage(userId, msg) {
                    if (msg.extension.hasOwnProperty("attachments")) {
                        if(msg.extension.attachments.length > 0) {
                            var fileUID = msg.extension.attachments[0].uid;
                            var fileUrl = QB.content.privateUrl(fileUID);
                            // var fileUrl = QB.content.publicUrl(fileUID); - content create and upload param 'public' = true
                            var imageHTML = "<img src='" + fileUrl + "' alt='photo'/>";
                            that.records.push({"receiveMsg":imageHTML})
                            console.log('imageHTML',imageHTML)
                        }
                    }
                    that.records.push({"receiveMsg":msg.body})
                    console.log('msg',msg)
                }
            });
        },
        methods: {
            //点击控制表情切换（显示和隐藏）
            emojiFuc(){
                this.showEmoji = !this.showEmoji;
            },
            sendMsg(){
                var content = this.content.trim();
                this.records.push({
                    sendMsg: content,
                });
                var opponentId = this.user1Id;
                var sendMsg = {
                    type: 'chat',
                    body: content,
                    extension: {
                        save_to_history: 1,
                    }
                };
                QB.chat.send(opponentId, sendMsg);
                this.content = "";
                this.scrollToBottom();
            },
            getEmotionData(pageNow, pageSize) {
                return this.EXPS.slice((pageNow - 1) * pageSize, pageSize * pageNow)
            },
            replaceFace(con) {
                if (!con) {
                    return;
                }
                if (con.toString().indexOf('/:') > -1) {
                    var exps = this.EXPS;
                    for (var i = 0; i < exps.length; i++) {
                        con = con.replace(exps[i].reg, '<img src="' + exps[i].file + '"  alt="" />');
                    }
                }
                return con;
            },
            //滚动到底
            scrollToBottom(){
                setTimeout(()=>{
                    //滚动条长度
                    var currentDistance=this.$refs.xwBody.scrollHeight-this.$refs.xwBody.clientHeight;
                    //当前滚动条距离顶部的距离
                    var currentScroll_y=this.$refs.xwBody.scrollTop;
                    if(currentDistance>0 && currentDistance>currentScroll_y){
                        currentScroll_y=Math.ceil((currentDistance-currentScroll_y)/10)+currentScroll_y;
                        currentScroll_y=currentScroll_y>currentDistance ? currentDistance: currentScroll_y;
                        //微信和qq浏览器不支持 scrollTo？
                        //this.$refs.xwBody.scrollTo(0,currentScroll_y);
                        this.$refs.xwBody.scrollTop = currentScroll_y;
                        this.scrollToBottom();
                    }
                },13);
            },
            onFocusText(){
                this.scrollToBottom();
            },
            _loadEmojiData(){
                getEmojiData().then((res)=>{
                    var json = eval('('+res+')');
                    this.EXPS=json.EXPS.slice(0);
                });
            },
            msgList(dialogId,user2){
                var that = this;
                var params = {chat_dialog_id: dialogId, sort_desc: 'date_sent', limit: 100, skip: 0};
                QB.chat.message.list(params, function(err, messages) {
                    if (messages) {
                        // console.log(messages)
                        let arr = messages.items;
                        let list = [];
                        for(var item of arr){
                            console.log(item.sender_id)
                            if(item.sender_id==user2.id){
                                list.unshift({'sendMsg':item.message})
                            }else{
                                list.unshift({'receiveMsg':item.message})
                            }
                        }
                        that.records = list;
                        console.log(list)

                    }else{
                        console.log(err);
                    }
                });
            },
            upload(e){
                var that = this;
                let inputFile = e.target.files[0];
                console.log(inputFile)
                var reader = new FileReader();
                reader.readAsDataURL(inputFile);
                //向服务器发送图片
                var user1 = {
                    id:73209967,
                    login:'qbsb',
                    pass:'abff457a52a7d81055aa06e00a556dc2'
                };
                var opponentId = user1.id;
                // var params = {name: inputFile.name, file: inputFile, type: inputFile.type, size: inputFile.size, 'public': false};
                let param = new FormData();
                param.append('file',inputFile,inputFile.name);
                let config = {
                    headers:{'Content-Type':'multipart/form-data'}
                };
                this.$axios.post('/business/upload',param,config)
                .then(res=>{
                    console.log(res);
                    let imgUrl = "http://13.231.212.214/business/image?image="+res.data.data;
                    let a = "<img src=" + imgUrl + ">";
                    var sendMsg = {
                        type: 'chat',
                        body: a,
                        extension: {
                            save_to_history: 1,
                        }
                    };
                    QB.chat.send(opponentId, sendMsg);
                });
                reader.onload = function(){
                    var a = "<img src=" + this.result + ">";
                    that.records.push({
                        sendMsg: a,
                    });
                }


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
            }
        }
    }
</script>
<style>
    img{
        max-width:150px;
    }
    #app{
        position: absolute;
        height: 100%;
        width: 100%;
        overflow: hidden;
    }
    .app{
        display: flex;
        flex-direction:column;
        width: 100%;
        height: 100%;
    }
    .xw-content{
        flex:1;
        position: relative;
        overflow: auto;
        transition: height .8s;
        background: #f1f2f6;
    }
    .xw-content-textarea{
        outline:none;
        border:1px solid #ddd;
        width:66%;
        height: 30px;
        /*height: 34px;*/
        margin-left:10px;
        margin-top:6px;
        padding: 3px 15px;
        font-size:14px;
    }
    .chatFile{
        width: 40px;
        height: 30px;
        margin-top:10px;
        background-image: url("../../static/image/chat/add3.png");
        background-position-x: center;
        background-position-y: center;
        background-repeat: no-repeat;
        background-size:22px 22px;
    }
    .chatFile input{
        width: 40px;
        height: 30px;
        opacity:0;
        filter:alpha(opacity=0);
        position:absolute;
        left:0;
        top:0;
    }
    .chatBtn{
        position: absolute;
        z-index:10;
        left:30px;
        font-size:14px;
    }
</style>
