<template>
    <div class="recommend">
        <topNav title="推荐"></topNav>
        <div class="box">
            <img src="@/static/image/others/rec.jpg" alt="">
            <div class="content">
                <h4>Whitney</h4>
                <div class="tag">
                    <p>英雄联盟</p>
                    <p>生活服务</p>
                    <p>电子商务</p>
                </div>
                <p class="intro">Trump will send a tweet on Friday morning about choosing Nauert to replace outgoing UN Ambassador Nikki Haley, who announced her resignation in October, Fox News reported, citing multiple sources.
                    Trump's decision was first reported by Bloomberg News.
                    A representative of the State Department did not immediately respond to a request for comment.</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "recommend"
    }




</script>

<style scoped>
    .recommend{
        background: #f1f2f6;
        height: 100%;
    }
    .box{
        width:345px;
        background: #ffffff;
        margin:0 auto;
        border-radius:5px;
        position: relative;
        top:50px;
        border:1px solid #e3e3e1;
        padding-bottom: 6px;
    }
    .box img{
        width:100%;
        height: 350px;
        border-top-left-radius:5px;
        border-top-right-radius:5px;
    }
    h4{
        color:#0094ff;
        margin-left:10px;
    }
    .content{
        margin-top:14px;
    }
    .tag{
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        padding-left:10px;
    }
    .tag p{
        padding: 2px 5px;
        background: #7fbafd;
        margin-left:5px;
        border-radius: 5px;
        color:#fff;
        font-size:12px;
        letter-spacing: 1px;
        margin-top:8px;
    }
    .tag p:first-child{
        margin-left:0;
        margin-top:8px;
    }
    .intro{
        margin:10px;
        text-align: justify;
        color:#999999;
        font-size:12px;
    }
</style>
