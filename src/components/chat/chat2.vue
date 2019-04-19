<template>
    <div class="app">
        <topNav :title="friendInfo.username"></topNav>
        <div class="xw-content"  @touchstart="toShowMaskInfo=false"  ref="xwBody">
            <div style="width:0;height: 50px;"></div>
            <div class="xw-chat-wrap">
                <ul>
                    <li v-for="item in messageData2">
                        <div v-if="from_username !== item.from">
                            <!--<div class="xw-chat-time">{{messageList.time}}</div>-->
                            <div class="xw-chat-servicer">
                                <div class="xw-servicer-avantar-wrap">
                                    <img :src="ip+'/business/image?image='+friendInfo.portrait" class="xw-servicer-avantar">
                                </div>
                                <div class="xw-chat-msg">
                                    <p v-html="handleMsg(item.sourceMsg)"></p>
                                </div>
                            </div>
                        </div>

                        <!-- 用户发送的消息模板-->
                        <div v-else>
                            <!--<div class="xw-chat-time">{{messageList.time}}</div>-->
                            <div class="xw-chat-customer">
                                <div class="xw-customer-avantar-wrap">
                                    <img :src="ip+'/business/image?image='+userInfo.portrait" class="xw-customer-avantar">
                                </div>
                                <div class="xw-chat-msg" style="display:inline-block">
                                    <span v-html="handleMsg(item.sourceMsg)"></span>
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
                    <textarea id="textarea" v-model="content" @focus="onFocusText" placeholder="回复内容"></textarea>
                </div>
                <div class="xw-chat-tool">
                    <div class="xw-chat-tool-item" >
                        <a href="javascript:;" :class="[showEmoji ? 'xw-face' :'xw-face-close','xw-chat-tool-btn']" @click="emojiFuc"></a>
                    </div>
                    <div class="xw-chat-tool-item chatBtn">
                        <a href="javascript:void(0)" class="xw-send-btn-text" v-if="content.trim().length" @click="sendTextMsg()">发送</a>
                    </div>
                    <div class="xw-chat-tool-item" >
                        <form action="" name="file" class="chatFile">
                            <input type="file" id="chatAddImg" ref="uploadImage" name="chatImg" @change="upload"/>
                            <!--<input class="file" type="file" accept="image/png,image/gif,image/jpg,image/jepg" @change="update"/>-->
                        </form>

                    </div>
                </div>
            </div>
            <!-- 表情开始 -->
            <div class="xw-window-text xw-face-emoji-ul" v-if="showEmoji">
                <div class="xw-chat-ul-box">
                    <mt-swipe :auto="0">
                        <mt-swipe-item v-for="n in Math.ceil(emojiLength/15)" :key="n">
                            <li v-for="(item, index) in getEmotionData(n,15)" class="xw-faceEmoji" :key="index">
                                <img :src="item.url" v-on:click="chooseEmoji(item)">
                            </li>
                        </mt-swipe-item>
                    </mt-swipe>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        data() {
            return {
                image:'',
                comment:{},
                showEmoji: false,//是否显示表情
                content: '',
                //聊天记录
                records: [],
                showScore: false,//显示评分
                imgFile :{},
                EXPS: [],
                //环信信息
                from_username:'',
                to_username:'',
                receiveNickName:'',
                headimgurl:'',
                password:'',
                accence_token:'',
                myNickName:'',
                chatHistory: [],
                emojiLength:'',
                friendInfo:{},
                userInfo:{},
                ip:'',
                messageData2:{}
            }
        },
        mounted(){
            this.ip=this.imageUri;
            let query = JSON.parse(this.$route.params.id);

            console.log('query',query)
            this.friendInfo = query;
            var text = document.getElementById("textarea");
            this.flexHeight(text)
            let userInfo = JSON.parse(localStorage.getItem('loginInfo'));
            this.userInfo = userInfo;
            // let chatData = JSON.parse(localStorage.getItem('chatData'))||{};
            // if(chatData[query.from]){ this.chatHistory = chatData[query.from]}

            this.from_username = userInfo.im;
            console.log('userInfo',query)
            this.to_username = query.im;
            this.messageData2 = this.messageData[query.im]
            this.password = userInfo.password;
            this.token = userInfo.token;
            // this.receiveNickName = decodeURI(urlParams.to_nickname)
            // this.getChatListDataFromLocal()
            // this.loginEasemob();
            let emoji = this.emoji;
            let arr = Object.keys(emoji)
            this.emojiLength = arr.length;
            this.scrollToBottom()
        },
        computed:{
            ...mapState([
                'emoji',
                'emojiArr',
                'messageData'
            ]),
        },
        watch:{
            '$route' (to, from) {
                // 对路由变化作出响应...
                let friendInfo = JSON.parse(to.params.id);
                this.to_username = friendInfo.im
                this.messageData2 = this.messageData[friendInfo.im]
                // console.log(this.friendInfo)
                // console.log('to',to.params.id)
                // console.log('from',from)
            }
        },
        methods:{
            upload(e){
                let image = e.target.files[0];
                let param = new FormData();
                param.append('file',image,image.name);
                var type = image.type;
                if(type.indexOf("image")==-1){
                    alert("请上传图片");
                    return false;
                }
                console.log(image)
                let config = {
                    headers:{'Content-Type':'multipart/form-data'}
                };
                this.$axios.post('/business/upload',param,config)
                .then(res=>{
                    console.log(res)
                    let imgUrl = 'http://54.178.219.47/business/image?image='+res.data.data;
                    var text = `<img style="max-width:150px" src="${imgUrl}" />`;
                    this.sendMessage(text)
                })
            },
            chooseEmoji(item){
                this.content+=item.key
                document.getElementById('textarea').focus();
            },
            getFocus(){

            },
            flexHeight(elem, extra, maxHeight){
                extra = extra || 0;
                var isFirefox = !!document.getBoxObjectFor || 'mozInnerScreenX' in window,
                    isOpera = !!window.opera && !!window.opera.toString().indexOf('Opera'),
                    addEvent = function(type, callback) {
                        elem.addEventListener ?
                            elem.addEventListener(type, callback, false) :
                            elem.attachEvent('on' + type, callback);
                    },
                    getStyle = elem.currentStyle ? function(name) {
                        var val = elem.currentStyle[name];
                        if (name === 'height' && val.search(/px/i) !== 1) {
                            var rect = elem.getBoundingClientRect();
                            return rect.bottom - rect.top -
                                parseFloat(getStyle('paddingTop')) -
                                parseFloat(getStyle('paddingBottom')) + 'px';
                        };
                        return val;
                    } : function(name) {
                        return getComputedStyle(elem, null)[name];
                    },
                    minHeight = parseFloat(getStyle('height'));
                elem.style.resize = 'none';
                var change = function() {
                    var scrollTop, height,
                        padding = 0,
                        style = elem.style;
                    if (elem._length === elem.value.length) return;
                    elem._length = elem.value.length;
                    if (!isFirefox && !isOpera) {
                        padding = parseInt(getStyle('paddingTop')) + parseInt(getStyle('paddingBottom'));
                    };
                    scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
                    elem.style.height = minHeight + 'px';
                    if (elem.scrollHeight > minHeight) {
                        if (maxHeight && elem.scrollHeight > maxHeight) {
                            height = maxHeight - padding;
                            style.overflowY = 'auto';
                        } else {
                            height = elem.scrollHeight - padding;
                            style.overflowY = 'hidden';
                        };
                        style.height = height + extra + 'px';
                        scrollTop += parseInt(style.height) - elem.currHeight;
                        document.body.scrollTop = scrollTop;
                        document.documentElement.scrollTop = scrollTop;
                        elem.currHeight = parseInt(style.height);
                    };
                };
                addEvent('propertychange', change);
                addEvent('input', change);
                addEvent('focus', change);
                change();
            },
            getChatListDataFromLocal () {
                var chatData = JSON.parse(localStorage.getItem('chatData'))
                console.log(chatData)
                if (chatData) {
                    var currentChatData = chatData[this.to_username]
                    if (currentChatData) {
                        this.chatHistory.push(...currentChatData)
                    }
                    console.log('currentChatData',currentChatData)
                    console.log('currentChatData',this.to_username)
                }
            },

            handleMsg (msg) {
                if (!msg) {
                    return;
                }
                if (msg.toString().indexOf('[') > -1) {
                    let exps = /\[[^\[\]]+\]/g;
                    let params = msg.match(exps);
                    console.log(params);
                    for(let item of params){
                        console.log(this.emoji[item])
                        msg = msg.replace(item, `<img src="${this.emoji[item]}"  alt="" />`);
                    }
                }
                return msg;
            },
            sendTextMsg () {
                var text = this.content;
                this.sendMessage(text)
            },
            sendMessage(text){
                var id = this.$imconn.getUniqueId()
                var msg = new WebIM.message('txt', id)
                let fromUserName = this.from_username
                let _thisChatHistory = this.chatHistory
                let to_username = this.to_username
                let sendTime = this.getNowTime()
                let myNickName = this.userInfo.username
                var that = this;
                console.log(to_username);
                msg.set({
                    msg: text,
                    action: 'action',                     //用户自定义，cmd消息必填
                    ext: {'nickName': myNickName},    //用户自扩展的消息内容（群聊用法相同）
                    to: to_username,
                    roomType: false,
                    success: function () {
                        let sendMessage = {
                            from: fromUserName,
                            sourceMsg: text,
                            time: sendTime,
                            nickName: myNickName,
                            portrait:that.userInfo.portrait,
                            avatar:that.userInfo.portrait,
                            im:that.friendInfo.im,
                            isChecked:true
                        }
                        console.log('发送成功');
                        let messageData = that.messageData;
                        console.log(messageData);
                        console.log(Boolean(messageData[to_username]));
                        console.log('sendMsg',to_username)
                        if (messageData[to_username]) {
                            messageData[to_username].push(sendMessage)
                        } else {
                            messageData[to_username] = [sendMessage]
                        }
                        that.$store.dispatch('setMsgOnChat',messageData)
                        localStorage.setItem('messageData', JSON.stringify(messageData));
                        that.content = '';
                        // let messageData = JSON.parse(localStorage.getItem('chatData'))||{}
                        // messageData[to_username] = [sendMessage];
                        // localStorage.setItem('messageData', JSON.stringify(messageData));
                        that.scrollToBottom()
                    },
                    fail: function (e) {
                        console.log('Send private text error')
                    }
                })
                msg.body.chatType = 'singleChat'
                this.$imconn.send(msg.body)
            },
            getNowTime () {
                let now = new Date()
                return now.getMonth() + 1 + '-' + now.getDate() + ' ' + now.getHours() + ':' + now.getMinutes()
            },
            emojiFuc(){
                this.showEmoji = !this.showEmoji;
            },
            getEmotionData(pageNow, pageSize) {
                return this.emojiArr.slice((pageNow - 1) * pageSize, pageSize * pageNow)
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

        }
    }
</script>
<style>
    .xw-vmodel-wrap{
        display: flex;
        align-items: center;
    }
    #textarea {
        display: block;
        overflow: hidden;
        width: 250px;
        font-size: 14px;
        height: 30px;
        line-height: 24px;
        padding: 2px 10px;
        margin-left:10px;
    }
    textarea {
        outline: 0 none;
        border-color: rgba(180, 180, 180, 0.8);
        border-radius:3px;
        /*box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1), 0 0 8px rgba(82, 168, 236, 0.6);*/
    }
    /* 清除左右滚动条 */
    .imitate-input::-webkit-scrollbar{
        display: none;
    }
    .imitate-input:empty:before{
        content: attr(placeholder);
        color: #999;
    }
    .imitate-input:focus:before{
        content: none;
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
    /*.xw-content-textarea{*/
    /*outline:none;*/
    /*border:1px solid #ddd;*/
    /*width:66%;*/
    /*height: 30px;*/
    /*!*height: 34px;*!*/
    /*margin-left:10px;*/
    /*margin-top:6px;*/
    /*padding: 3px 15px;*/
    /*font-size:14px;*/
    /*}*/
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
    .xw-chat-servicer{
        margin-bottom:0;
        margin-top:25px;
    }
    .xw-chat-msg p img{
        width:20px;
    }
</style>
