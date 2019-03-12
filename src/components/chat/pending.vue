<template>
    <div class="pending">
        <topNav title="待处理事项"></topNav>
        <div class="list">
            <div class="item">
                <div class="left">
                    <img class="image" src="@/static/image/chat/intel.jpg" alt="">
                    <div class="text">
                        <p>英特尔中国<img class="vip" src="@/static/image/chat/v1.png" alt=""></p>
                        <p>处理内容示例</p>
                    </div>
                </div>
                <div class="right">
                    <img src="@/static/image/others/err.png" alt="">
                    <img src="@/static/image/login/gou.png" alt="">
                </div>
            </div>
            <div class="item">
                <div class="left">
                    <img class="image" src="@/static/image/chat/intel.jpg" alt="">
                    <div class="text">
                        <p>英特尔中国<img class="vip" src="@/static/image/chat/v1.png" alt=""></p>
                        <p>处理内容示例</p>
                    </div>
                </div>
                <div class="right">
                    <img src="@/static/image/others/err.png" alt="">
                    <img src="@/static/image/login/gou.png" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "pending"
    }
</script>

<style scoped>
    .pending{
        padding-top: 40px;
    }
    .list{

    }
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
    .text{
        margin-left:10px;
    }
    .text p:first-child{
        font-size:15px;
        color:#000;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width:180px;
        display: flex;
        align-items: center;
    }
    .text p:last-child{
        font-size:12px;
        color:#999;
        margin-top:4px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width:180px;
    }
    .right{
        display: flex;
        align-items: center;
    }
    .right img:first-child{
        width:13px;
    }
    .right img:last-child{
        width:18px;
        margin-left:15px;
    }
    .vip{
        width:15px;
        display: block;
        margin-left:5px;
    }
</style>
