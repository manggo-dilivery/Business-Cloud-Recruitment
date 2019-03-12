<template>
    <div class="chatHome">
        <router-view></router-view>
        <mt-tabbar v-model="selected">
                <mt-tab-item id="message">
                    <div @click="toMessage">
                        <img slot="icon" src="@/static/image/chat/message.png">
                        消息
                    </div>
                </mt-tab-item>
                <mt-tab-item id="friend">
                    <div @click="toLinkman">
                        <img slot="icon" src="@/static/image/chat/friend.png">
                        联系人
                    </div>

                </mt-tab-item>
                <mt-tab-item id="animate">
                    <div @click="toAnimate">
                        <img slot="icon" src="@/static/image/chat/animate.png">
                        动态
                    </div>
                </mt-tab-item>
                <mt-tab-item id="center">
                    <div @click="toCenter">
                        <img slot="icon" src="@/static/image/chat/center.png">
                        我的
                    </div>
                </mt-tab-item>
        </mt-tabbar>
    </div>
</template>

<script>

  import { MessageBox } from 'mint-ui';
  export default {
    name: "chatHome",
    data(){
      return{
        selected:'message',
        loginInfo:{}
      }
    },
    created(){
        var aa = localStorage.getItem("loginInfo")
        aa = JSON.parse(aa)||{};
        if(aa.uid){
            this.$router.push({path:'/'});
        }else{
            this.$router.push({path:'/registerOption'});
            return
        }
        var pop = JSON.parse(window.localStorage.getItem('popInfo'))||{};
        var title = "立即完善信息?";
        let message="确定执行此操作?";
        var _this = this;
        if(pop.info===1){
            return
        }else{
            MessageBox.confirm(message,title).then(action=>{
                window.localStorage.setItem('popInfo',JSON.stringify({"info":1}))
                if(aa.type===0){
                    _this.$router.push("/loginInfo2")
                }else{
                    _this.$router.push("/loginInfo")
                }
            })
        }
    },
    methods:{
      toMessage(){
        this.$router.push({path:'/message'})
        // window.localStorage.setItem('selected',this.selected)
      },
      toLinkman(){
        this.$router.push({path:'/linkman'})
        // window.localStorage.setItem('selected',this.selected)
      },
      toAnimate(){
        this.$router.push({path:'/animated'})
        // window.localStorage.setItem('selected',this.selected)
      },
      toCenter(){
        this.$router.push({path:'/center'})
        // window.localStorage.setItem('selected',this.selected)
      }
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
</style>
