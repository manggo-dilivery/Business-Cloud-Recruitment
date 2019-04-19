<template>
    <div class="container">
        <mt-header fixed title="事项"></mt-header>
        <div class="friendList">
            <div class="topEvent">
                <div style="height:40px"></div>
                <div v-for="(item,index) in imgUrl">
                    <router-link :key="index" :to="{name:item.nav}">
                        <div class="topItem">
                            <img :src="item.url" alt="">
                            <p>{{item.title}}</p>
                        </div>
                    </router-link>
                </div>

            </div>
        </div>
    <!--<searchMan></searchMan>-->
    </div>
</template>

<script>
  export default {
    name: "linkman",
    data(){
      return{
            imgUrl:[
                {url:require('@/static/image/chat/event1.png'),title:'推荐',nav:''},
                {url:require('@/static/image/chat/event2.png'),title:'待处理事项',nav:'pending'},
                {url:require('@/static/image/chat/newFriend.png'),title:'添加好友',nav:'addFriend'},
                {url:require('@/static/image/chat/invite.png'),title:'新的朋友',nav:''},
            ]
      }
    },
    methods:{

    }
  }
</script>

<style scoped>
    .container{

    }
    .topEvent{

    }
    .topItem{
        padding: 10px 0;
        display: flex;
        align-items: center;
        width:100%;
        border-bottom:1px solid #ddd;
    }
    .topItem img{
        width:40px;
        height: 40px;
        margin-left:20px;
    }
    .topItem p{
        font-size:17px;
        margin-left:10px;
        letter-spacing: 1px;
    }
    .friendList{
        overflow-y:scroll ;
    }
    #search{
        width:20px;
        height: 20px;
    }
    #add{
        width:20px;
        height: 20px;
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
</style>
