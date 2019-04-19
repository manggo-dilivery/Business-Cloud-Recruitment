<template>
    <div class="container">
        <topNav title="黑名单"></topNav>
        <div style="height: 42px;"></div>
        <div v-for="(item,index) in blackList">
            <mt-cell-swipe
                    :right="[
                    {
                      content: '恢复好友',
                      style: { background: '#26a2ff', color: '#fff',height:60},
                      handler: () => $messagebox(item)
                    }]">
                <!--<router-link :to="{name:'chat',query:{friendInfo:item}}">-->
                <div>
                    <div style="height:60px"></div>
                    <div class="listLeft">
                        <img :src="ip+'/business/image?image='+item.portrait" alt="">
                        <div class="chatItem">
                            <p>{{item.username}}</p>
                            <p>{{item.userno||'暂无'}}</p>
                        </div>
                    </div>
                </div>
            </mt-cell-swipe>
        </div>
    </div>
</template>

<script>
    import {MessageBox} from 'mint-ui'
    export default {
        name: "blackList",
        data(){
            return{
                blackList:[],
                userInfo:{},
                ip:''
            }
        },
        mounted(){
            this.ip=this.imageUri;
            let userInfo = JSON.parse(localStorage.getItem('loginInfo'))
            this.userInfo = userInfo;
            this.friendsInfo = this.$route.query.friendsInfo;
            this.$axios.get('/business/blackList/user/'+userInfo.uid+'?page=1&size=10').then(res=>{
                this.blackList = res.data.data.list;
                console.log(res.data.data.list)
            }).catch(err=>{
                console.log(err)
            })
        },
        methods:{
            $messagebox(item){
                console.log('item',item)
                MessageBox.confirm('确定执行此操作?').then(action => {
                    this.$axios.delete('/business/blackList/user/'+this.userInfo.uid+'/black/'+item.uid).then(res=>{
                        this.$axios.get('/business/blackList/user/'+this.userInfo.uid+'?page=1&size=10').then(res=>{
                            this.blackList = res.data.data.list;
                            console.log(res.data.data.list)
                        }).catch(err=>{
                            console.log(err)
                        })
                    })
                });
            },
        }
    }
</script>

<style scoped>
    .chatList{
        /*min-width: 354px;*/
        width:100%;
        position: relative;
    }
    .listLeft{
        display: flex;
        width:300px;
        position: absolute;
        left:10px;
        top:8px;
    }
    .listLeft > img{
        width:44px;
        height: 44px;
        border-radius:20px;
        margin-left:10px;
    }
    .chatItem{
        margin-left:10px;
    }
    .chatItem p{
        font-size:14px;
        color:#666;
    }
    .chatItem p:first-child{
        font-size:16px;
        color:#000;
        margin-bottom: 8px;
    }
    .chatItem p:last-child{
        width:100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>
