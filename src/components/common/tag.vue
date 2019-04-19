<template>
    <div class="container">
        <div class="list">
            <p class="item">打篮球</p>
            <p class="item">寻觅美食</p>
            <p class="item">打篮球</p>
            <p class="item">寻觅美食</p>
            <p class="item">打篮球</p>
            <p class="item">寻觅美食</p>
            <p class="item">打篮球</p>
            <p class="item">寻觅美食</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "tag"
    }
</script>

<style scoped>
    .container{
        width:100%;
        background: #fff;
    }
    .list{
        width:94%;
        margin:0 auto;
        display: flex;
        flex-wrap: wrap;
        padding: 10px 0;
    }
    .item{
        background: #e5f8ff;
        margin:5px 7px;
        padding: 3px 14px;
        border-radius:3px;
        font-size: 13px;
    }
</style>
