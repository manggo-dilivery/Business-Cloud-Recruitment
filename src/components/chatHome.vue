<template>
    <div class="chatHome" style="height: 100%;">
        <router-view></router-view>
        <div style="background:#ffffff">
            <mu-bottom-nav :value="bottomValue" @change="handleChange">
                <mu-bottom-nav-item title="消息" icon=":iconfont icon-xiaoxi" to="/message" value="/message"></mu-bottom-nav-item>
                <mu-bottom-nav-item title="好友" icon=":iconfont icon-lianxiren" to="/linkman" value="/linkman"></mu-bottom-nav-item>
                <mu-bottom-nav-item title="动态" icon=":iconfont icon-dongtai" to="/dynamics" value="/dynamics"></mu-bottom-nav-item>
                <mu-bottom-nav-item title="我的" icon=":iconfont icon-iconfuzhi" to="/center" value="/center"></mu-bottom-nav-item>
            </mu-bottom-nav>
        </div>

    </div>
</template>

<script>
    import '@/static/font/iconfont.css'
    import { MessageBox } from 'mint-ui';
    export default {
        name: "chatHome",
        data(){
            return{
                selected:'message',
                loginInfo:{},
                bottomValue: '/message'
            }
        },
        mounted(){
            // let aa = localStorage.getItem("loginInfo")
            // aa = JSON.parse(aa)||{};
            // console.log('aa.im',aa.im);
            // if(aa.im){
            //     this.$router.push({path:'/'});
            // }else{
            //     this.$router.push({path:'/registerOption'});
            // }

            // let pop = JSON.parse(window.localStorage.getItem('popInfo'))||{};
            // let title = "立即完善信息?";
            // let message="确定执行此操作?";
            // let _this = this;
            // if(pop.info===1){
            //     return
            // }else{
            //     MessageBox.confirm(message,title).then(action=>{
            //         window.localStorage.setItem('popInfo',JSON.stringify({"info":1}))
            //         if(aa.type===0){
            //             _this.$router.push("/loginInfo2")
            //         }else{
            //             _this.$router.push("/loginInfo")
            //         }
            //     })
            // }
        },
        // props:['bottomIndex'],
        methods:{
            handleChange (value) {
                this.bottomValue = value
            }
        },
        mounted(){
            setTimeout(()=>{
                this.bottomValue = this.$router.history.current.path;
                if (this.bottomValue === '/dynamicsall') {
                    this.bottomValue = '/dynamics'
                }
            })
        }
    }
</script>

<style scoped>
    .mint-tabbar > .mint-tab-item.is-selected{
        color:#000
    }
    .mint-tabbar{
        position: fixed;
    }
    a:nth-child(1) .mu-bottom-item-icon.selected{
        background-image: url(../static/image/chat/message.png) ;
        background-repeat:no-repeat;
        width:24px;
        height:24px;
        background-size:auto 24px;
    }
    a:nth-child(1) .mu-bottom-item-icon {
        background: #f00 !important;
        background-image: url(../static/image/chat/message.png) ;
        background-repeat:no-repeat;
        width:24px;
        height:24px;
        background-size:auto 24px;
    }

    .mu-bottom-item-active .mu-bottom-item-text.text_selected {
        color: rgba(0,0,0,.54);
        font-size: inherit;
    }
    .mu-bottom-nav-shift {
        width:100%;
        FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#808080,
        endColorStr=#808080); /*IE*/
        background:-moz-linear-gradient(left,#808080, #808080);/*火狐*/
        background:-webkit-gradient(linear, 0% 0%, 100% 0%,from(#808080), to(#808080));/*谷歌*/
    }
</style>
