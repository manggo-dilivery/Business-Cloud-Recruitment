<template>
    <div class="person">
        <div class="itemOuter">
            <div class="item">
                <img src="@/static/image/chat/portrait.jpeg" alt="">
                <div class="content">
                    <p>南京房地产资讯故乡能力故乡能力邮箱</p>
                    <p><span style="margin-right: 20px;">2017/01-至今</span>ui设计师</p>
                    <p><span>工作内容/方向：</span>软年研发制研发制研发制研发制研发制作</p>
                </div>
                <img src="@/static/image/chat/iconRight.png" alt="">
            </div>
        </div>
        <div class="itemOuter">
            <div class="item">
                <img src="@/static/image/chat/portrait.jpeg" alt="">
                <div class="content">
                    <p>南京房地产资讯故乡能力故乡能力邮箱</p>
                    <p><span style="margin-right: 20px;">2017/01-至今</span>ui设计师</p>
                    <p><span>工作内容/方向：</span>软年研发制研发制研发制研发制研发制作</p>
                </div>
                <img src="@/static/image/chat/iconRight.png" alt="">
            </div>
        </div>
        <div class="itemOuter">
            <div class="item">
                <img src="@/static/image/chat/portrait.jpeg" alt="">
                <div class="content">
                    <p>南京房地产资讯故乡能力故乡能力邮箱</p>
                    <p><span style="margin-right: 20px;">2017/01-至今</span>ui设计师</p>
                    <p><span>工作内容/方向：</span>软年研发制研发制研发制研发制研发制作</p>
                </div>
                <img src="@/static/image/chat/iconRight.png" alt="">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "personItem"
    }
</script>

<style scoped>
    .person{
        padding: 10px 0;
    }
    .person .itemOuter:first-child{
        border-top:none;
    }
    .itemOuter{
        width: 100%;
        border-top:1px solid #eee;
    }
    .item{
        display: flex;
        width:92%;
        margin:0 auto;
        align-items: center;
        padding: 14px 0;
        position: relative;
    }
    .item img:first-of-type{
        width:65px;
        height: 65px;
        border-radius:50%;
        margin-right: 12px;
    }
    .item img:last-of-type{
        width:10px;
        height: 16px;
        position: absolute;
        right:10px;
    }
    .content{
        width:250px;
        margin-right: 8px;
    }
    .content p{
        font-size:13px;
        color:#999;
        width:100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-top:2px;
    }
    .content p:first-child{
        margin-top:0;
        font-size: 15px;
        color:#000;
    }
</style>
