<template>
    <div class="item">
        <div class="left">
            <img class="image" src="@/static/image/chat/intel.jpg" alt="">
            <div class="itemContent">
                <p>英特尔中国<img class="vip" src="@/static/image/chat/v1.png"></p>
                <p>主营范围：半导体、处理器<img class="vip" src="@/static/image/chat/v1.png"></p>
            </div>
        </div>
        <p class="right">+好友</p>
    </div>
</template>

<script>
    export default {
        name: "list"
    }
</script>

<style scoped>
    .item{
        width:90%;
        margin:0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 0 ;
        border-bottom:1px solid #eee;
    }
    .left{
        display: flex;
        align-items: center;
    }
    .image{
        width:44px;
        height: 44px;
        border-radius:50%;
    }
    .itemContent{
        margin-left:10px;
    }
    .itemContent p{
        font-size:15px;
        color:#000;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width:180px;
        display: flex;
        align-items: center;
    }
    .itemContent p:last-child{
        font-size:12px;
        color:#999;
        margin-top:4px;
    }
    .right{
        padding:2px 10px;
        color:#0094ff;
        border:1px solid #0094ff;
        border-radius:14px;
        font-size:14px;
        letter-spacing: 1px;
    }
    .vip{
        width:15px;
        display: block;
        margin-left:5px;
    }
</style>
