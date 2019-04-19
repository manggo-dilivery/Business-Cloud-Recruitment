<template>
    <div class="dynamics" ref="dynamics">
        <div class="topNav">
            <img id="search" src="@/static/image/chat/search.png" alt="">
            <div class="navCenter">
                <router-link to="/dynamics" >好友</router-link>
                <router-link to="/dynamicsall" >全部</router-link>
            </div>
            <img id="add" src="@/static/image/chat/edit.png" alt="" @click="goToNew">
        </div>
        <div class="main">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        goToNew(){
            this.$router.push('/dynamicsnew');
        },
    }
}
</script>

<style scoped>
    .dynamics{
        background: #efefef;
        width: 100%;
        height: calc(100% - 60px);
        position: relative;
        overflow:hidden;
    }
    .topNav{
        width: 100%;
        height: 40px;
        position: fixed;
        top:0;
        left:0;
        background: #0094ff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        z-index:10;
    }
    .main{
        position: absolute;
        top: 41px;
        bottom: 0;
        overflow: hidden;
        width: 100%;
    }
    .flex{
        display: flex;
    }
    .hidden{
        display: hidden;
    }
    .dynamicsBody{
        width: 100%;
        height: 100%;
        overflow: auto;
    }
    #search{
        width:18px;
        height: 18px;
        margin-left:10px;
    }
    #add{
        width:18px;
        height: 18px;
        margin-right:10px;
    }
    .navCenter{
        width:160px;
        display: flex;
        justify-content: center;
    }
    .navCenter a{
        color:#fff;
        font-size:17px;
        height:37px;
        line-height: 40px;
        width:50px;
        text-align: center;
        cursor:pointer;
        margin-left: 10px;
        margin-right: 10px;
    }
    .router-active{
        border-bottom:2px solid #fff;
    }
</style>

