<template>
    <div class="container">
        <mt-header fixed title="联系人">
            <img id="search" slot="left" src="@/static/image/chat/search.png" alt="">
            <p id="add" slot="right">完成(2)</p>
        </mt-header>
        <div class="friendList">
            <mt-index-list :show-indicator="false">
                <mt-index-section index="">
                    <div class="topEvent">
                        <div class="topItem" style="margin-top:25px">
                            <img src="@/static/image/chat/newFriend.png" alt="">
                            <p>新的朋友</p>
                        </div>
                        <div class="topItem">
                            <img src="@/static/image/chat/invite.png" alt="">
                            <p>邀请新朋友</p>
                        </div>
                        <div class="topItem">
                            <img src="@/static/image/chat/groupChat.png" alt="">
                            <p>群聊</p>
                        </div>
                    </div>
                </mt-index-section>
                <mt-index-section index="A">
                    <friend showInput="true"></friend>
                </mt-index-section>
                <mt-index-section index="B">
                    <friend></friend>
                </mt-index-section>
            </mt-index-list>
        </div>
        <searchMan></searchMan>
    </div>
</template>

<script>
    export default {
        name: "linkman",
        data(){
            return{

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
        display: block;
        margin-right: 10px;
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
