<template>
    <div class="intro">
        <div class="content">
            <ul class="list">
                <li>画画，画，打游戏，看电视画画，视画画打游戏看电视画画视</li>
                <li>画画，打游看画画，视戏，画，视画画，打游戏，看电视画画，视</li>
                <li>视画画，视</li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "introduct"
    }
</script>

<style scoped>
    .intro{
        background: #fff;
        width:100%;
    }
    .content{
        background: #f7fbfe url("../../static/image/chat/badge.png") no-repeat top right;
        width:92%;
        margin:0 auto;
        background-size:50px;
        margin-top:15px;
    }
    .list{
        list-style-type:disc;
        color:#0094ff;
        padding: 14px 50px 14px 30px;
    }
    .list li{
        margin-top:7px;
        text-align: justify;
    }
    .list li:first-child{
        margin-top:0;
    }
</style>
