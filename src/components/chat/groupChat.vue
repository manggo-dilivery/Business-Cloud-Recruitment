<template>
    <div class="app">
        <topNav :title="groupInfo.groupname"></topNav>
        <img class="caidan" src="@/static/image/chat/caidan.png" alt="" @touchstart="goGroupInfo">
        <div class="xw-content"  @touchstart="toShowMaskInfo=false"  ref="xwBody">
            <div style="width:0;height: 50px;"></div>
            <div class="xw-chat-wrap">
                <ul>
                    <li v-for="item in groupData[groupInfo.emobid]">
                        <div v-if="from_username !== item.from">
                            <!--<div class="xw-chat-time">{{messageList.time}}</div>-->
                            <div class="xw-chat-servicer">
                                <div class="xw-servicer-avantar-wrap">
                                    <img :src="ip+'/business/image?image='+item.portrait" class="xw-servicer-avantar">
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
                                    <img :src="ip+'/business/image?image='+item.portrait" class="xw-customer-avantar">
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
                        <a href="javascript:void(0)" class="xw-send-btn-text" v-if="content.trim().length" @click="sendTextMsg">发送</a>
                    </div>
                    <div class="xw-chat-tool-item" >
                        <form action="" name="file" class="chatFile">
                            <input type="file" id="chatAddImg" name="chatImg" ref="uploadImage" @change="upload"/>
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
                headimgurl:'',
                password:'',
                accence_token:'',
                myNickName:'',
                chatHistory: [],
                emojiLength:'',
                groupInfo:'',
                list:[],
                userInfo:{},
                ip:''
            }
        },
        mounted(){
            this.ip = this.imageUri;
            let userInfo = JSON.parse(localStorage.getItem('loginInfo'));
            let query = this.$route.query.info;
            console.log(query)
            this.groupInfo = query;
            var text = document.getElementById("textarea");
            this.flexHeight(text);
            this.userInfo = userInfo;
            this.from_username = userInfo.im;
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
                'groupData'
            ])
        },
        methods:{
            goGroupInfo(){
                console.log(this.groupInfo)
                this.$router.push({name:'groupInfo',query:{groupInfo:this.groupInfo}})
            },
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
                    let imgUrl = this.ip+'/image?image='+res.data.data;
                    var text = `<img style="max-width:150px" src="${imgUrl}" />`;
                    this.sendMessage(text)
                })

            },
            sendMessage(text){
                let groupId = this.groupInfo.emobid;
                let id = this.$imconn.getUniqueId();
                let userInfo = this.userInfo;
                let sendTime = this.getNowTime();
                let msg = new WebIM.message('txt', id);
                let option = {
                    msg: text,
                    to: groupId,
                    ext: {'nickName': userInfo.username, 'headimgurl':userInfo.portrait},
                    roomType: false,
                    success: function () {
                        console.log('send room text success');
                    },
                    fail: function () {
                        console.log('failed');
                    }
                };
                msg.set(option);
                msg.setGroup('groupchat');              // 群聊类型
                msg.body.chatType = 'groupchat'
                console.log('msg',msg);
                this.$imconn.send(msg.body);
                let message = {
                    groupId:groupId,
                    from:userInfo.im,
                    sourceMsg:text,
                    portrait:userInfo.portrait,
                    username:userInfo.userName,
                    time:sendTime,
                    isChecked:true,
                }
                let groupData = JSON.parse(localStorage.getItem('groupData'))
                if (groupData) {
                    groupData.chatData[groupId].push(message)
                    localStorage.setItem('groupData', JSON.stringify(groupData))
                    console.log(groupData)
                    console.log(this.chatHistory)
                    this.chatHistory = groupData.chatData[groupId];
                    this.scrollToBottom();
                } else {
                    let chatData = {}
                    chatData[groupId] = [message]
                    localStorage.setItem('groupData', JSON.stringify({chatData}))
                    this.chatHistory = chatData;
                }
                this.content = ''
            },
            chooseEmoji(item){
                this.content+=item.key
                document.getElementById('textarea').focus();
            },
            handleMsg (msg) {
                if (!msg) {
                    return;
                }
                if (msg.toString().indexOf('[') > -1) {
                    let exps = /\[[^\[\]]+\]/g;
                    let params = msg.match(exps);
                    for(let item of params){
                        msg = msg.replace(item, `<img src="${this.emoji[item]}"  alt="" />`);
                    }
                }
                return msg;
            },
            sendTextMsg () {
                var text = this.content;
                let groupId = this.groupInfo.emobid;
                let id = this.$imconn.getUniqueId();
                let userInfo = this.userInfo;
                let sendTime = this.getNowTime()
                let msg = new WebIM.message('txt', id);
                let that = this;
                let option = {
                    msg: text,
                    to: groupId,
                    ext: {'nickName': userInfo.username, 'headimgurl':userInfo.portrait},
                    roomType: false,
                    success: function () {
                        console.log('send room text success');
                        let message = {
                            groupId:groupId,
                            from:userInfo.im,
                            sourceMsg:text,
                            portrait:userInfo.portrait,
                            username:userInfo.userName,
                            time:sendTime,
                            isChecked:true,
                        }
                        console.log('groupData',that.groupData)
                        let groupData = that.groupData;
                        if (groupData[groupId]) {
                            groupData[groupId].push(message)
                            that.scrollToBottom();
                        } else {
                            groupData[groupId] = [message]
                        }

                        that.$store.dispatch('setGroupOnMount',groupData);
                        localStorage.setItem('groupData',JSON.stringify(groupData))
                        that.content = ''

                    },
                    fail: function () {
                        console.log('failed');
                    }
                };
                msg.set(option);
                msg.setGroup('groupchat');              // 群聊类型
                // msg.body.chatType = 'groupchat'
                // console.log('msg',msg);
                this.$imconn.send(msg.body);
                console.log(text)

                // that.$store.dispatch('setMsgOnChat',groupData)
                // localStorage.setItem('messageData', JSON.stringify(messageData));

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
            onFocusText(){
                this.scrollToBottom();
            },

        }
    }
</script>
<style>
  .caidan{
    position: fixed;
    top:8px;
    right:15px;
    width:24px;
    z-index:5;
  }
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
