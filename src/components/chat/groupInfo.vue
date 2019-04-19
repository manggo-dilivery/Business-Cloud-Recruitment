<template>
    <div class="container">
        <topNav title="群组信息"></topNav>
        <div style="height: 40px;"></div>
        <div class="imageContainer">
            <img v-for="item in groupFriends" :src="ip+'/business/image?image='+item.portrait" alt="">
            <!--<img style="border:1px solid #aaa;" src="@/static/image/chat/groupAdd.png" alt="">-->
        </div>
        <div style="width:100%;background:#ededed;height: 10px;"></div>
        <div class="group" @click="groupName=true">
            <p>群组名称</p>
            <p style="color:#a6a6a6">{{groupInfo2.groupName}}<img src="@/static/image/chat/iconRight.png"/></p>
        </div>
        <div style="width: 100%;border-bottom: 1px solid #eee;"></div>
        <div class="group" @click="groupName=true">
            <p>群组描述</p>
            <p style="color:#a6a6a6">{{groupInfo2.groupName}}<img src="@/static/image/chat/iconRight.png"/></p>
        </div>
        <div style="width: 100%;border-bottom: 1px solid #eee;"></div>
        <mt-button class="delete" size="large" @touchstart.native="handleClick" type="danger">删除并退出</mt-button>
        <div class="groupName" v-if="groupName" @click="groupName=false">
            <div class="changeContent">
                <mu-form class="mu-demo-form" :model="form" :label-position="labelPosition" label-width="100">
                    <mu-form-item prop="input" label="修改群聊名称">
                        <mu-text-field v-model="form.input1"></mu-text-field>
                    </mu-form-item>
                </mu-form>

                <mt-button  @click="confirm1" class="delete" size="large" type="primary">确认修改</mt-button>
            </div>
        </div>
        <div class="groupName" v-if="userName" @click="userName=false">
            <div class="changeContent">
                <mu-form class="mu-demo-form" :model="form" :label-position="labelPosition" label-width="100">
                    <mu-form-item  prop="input" label="修改本群昵称">
                        <mu-text-field v-model="form.input2"></mu-text-field>
                    </mu-form-item>
                </mu-form>
                <mt-button @click="confirm2" class="delete" size="large" type="primary">确认修改</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                groupName:false,
                userName:false,
                labelPosition: 'top',
                form: {
                    input1: '',
                    input2: '',
                },
                miaoshu:false,
                groupInfo:{},
                groupInfo2:{},
                groupFriends:{},
                userInfo:{},
                ip:''
            }
        },
        mounted(){
            this.ip = this.imageUri
            let groupInfo = this.$route.query.groupInfo;
            this.groupInfo = groupInfo;
            let userInfo = JSON.parse(localStorage.getItem('loginInfo'));
            this.userInfo = userInfo;
            // this.$axios.all([
                // this.$axios.get('/business/group/get/'+groupInfo.emobid),
            this.$axios.get('/business/group/members/'+groupInfo.emobid).then(res2 => {
                this.groupInfo2 = res2.data.data;
                this.groupFriends = res2.data.data.users;
                // console.log('res1',res1);
                console.log('res2',res2)
            })

        },
        methods: {
            handleClick(){
                this.miaoshu=false;
                let groupInfo = this.groupInfo;
                let userInfo = this.userInfo;
                if(groupInfo.owner === userInfo.im){
                    this.$axios.post('/business/group/delete/'+groupInfo.emobid).then(res=>{
                        this.$router.push({name:group})
                    })
                }
            },
            confirm1(){
                this.miaoshu=false;
                let groupInfo = this.groupInfo;
                let userInfo = this.userInfo;
                if(groupInfo.owner === userInfo.im){
                    this.$axios.post('/business/group/update/'+groupInfo.emobid+'?groupname='+this.form.input1+'&owner='+groupInfo.owner).then(res=>{
                        console.log(res)
                        this.userName = false
                    })
                }
            },
            confirm2(){
                this.miaoshu=false;
                let groupInfo = this.groupInfo;
                let userInfo = this.userInfo;
                if(groupInfo.owner === userInfo.im){
                    this.$axios.post('/business/group/update/'+groupInfo.emobid+'?description='+this.form.input2+'&owner='+groupInfo.owner).then(res=>{
                        console.log(res)
                        this.userName = false
                    })
                }
            }
        }
    }
</script>

<style scoped>
    .changeContent{
        width: 80%;
        margin:0 auto;
        margin-top:100px;
        background: #fff;
        padding:40px 20px;
        border-radius:8px;
    }
    .groupName{
        position: fixed;
        width:100%;
        height:100%;
        top:0;
        background: rgba(0,0,0,0.7);
        /*display: flex;*/
        /*align-items: center;*/
    }
    .mu-demo-form {
        width: 100%;
        max-width: 460px;
    }
    .delete{

    }
    .group p:last-child{
        display: flex;
        align-items: center;
    }
    .group img{
        width:6px;
        margin-left:8px;
    }
    .group{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 90%;
        margin:0 auto;
        padding: 13px 0;
    }
    .imageContainer{
        width:94%;
        margin:0 auto;
        display:flex;
        flex-wrap:wrap;
        padding: 10px 0;
    }
    .imageContainer img{
        width:41px;
        height:41px;
        margin:14px 8px 0;
        border-radius:5px;
    }
</style>
