<template>
    <div class="list">
        <topNav title="设置"></topNav>
        <div style="height: 40px"></div>
        <div class="item" @click="exitLogin">
            <div class="itemLeft">
                <img src="@/static/image/chat/position.png" alt="">
                <p>退出登录</p>
            </div>
            <!--<div class="itemRight">-->

            <!--</div>-->
        </div>
    </div>
</template>

<script>
    import {MessageBox} from 'mint-ui'
    export default {
        name: "setting",
        methods:{
            exitLogin(){
                MessageBox.confirm('确定退出登录?').then(action => {
                    localStorage.removeItem('loginInfo');
                    this.$router.push({path:'/registerOption'});
                });

            },
        }
    }
</script>

<style scoped>
    .list{
        margin-top:10px;
        background: #fff;
        width:100%;
    }
    .item{
        width:90%;
        margin:0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom:1px solid #eee;
        padding: 10px 0;
    }
    .itemLeft,.itemRight{
        display: flex;
        align-items: center;
    }
    .itemLeft img{
        width:32px;
        height: 32px;
        margin-right: 12px;
    }
    .itemLeft p{
        font-size:17px;
    }
    .itemRight p{
        width:134px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        font-size:13px;
        color:#999;
        text-align: right;
        margin-right:8px;
    }
    .itemRight img{
        width:8px;
    }
</style>
