<template>
    <div class="linkItem">
        <div class="item">
            <input v-if="false" class="checkRadio" type="checkbox">
            <img class="portrait" src="@/static/image/chat/groupChat.png" alt="">
            <div class="text">
                <p>英特尔中国<img class="vip" src="@/static/image/chat/v1.png"></p>
                <p>主营范围：半导体，处理器，电脑</p>
                <p>微处理器<img class="vip" src="@/static/image/chat/v1.png"></p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "friend",
        props:["showInput"]
    }
</script>

<style scoped>
    input[type=checkbox]{
        width: 22px;
        height: 22px;
        outline: 0 !important;
        background-color: transparent;
        -webkit-appearance: none;
        margin-left:10px;
    }
    input[type=checkbox]:after{
        content:"\2714";
        display: block;
        width:22px;
        height: 22px;
        text-align: center;
        line-height: 20px;
        font-size: 16px;
        color: #fff;
        background-color: #fff;
        border:1px solid #999;
        box-sizing:border-box;
        border-radius: 50%;

    }
    input[type=checkbox]:checked:after  {
        background-color: #0094ff;
    }
    .linkItem{
        display: flex;
        align-items: center;
    }
    .item{
        display: flex;
        align-items: center;
        padding: 10px 0;
    }
    .portrait{
        width:40px;
        height: 40px;
        border-radius:50%;
        margin-left:10px;
    }
    .text{
        margin-left:10px;

    }
    .text p{
        width:250px;
        color:#999;
        font-size:12px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: flex;
        align-items: center;
    }
    .text p:first-child{
        color:#000;
        font-size:14px;
        margin-bottom:3px;
        letter-spacing: 0.5px;
    }
    .vip{
        width:14px;
    }
</style>
