<template>
    <div class="container">
        <mt-header fixed title="联系人">
            <img id="back" slot="left" @click="goBack" src="@/static/image/chat/arr-left.png" alt="">
            <img id="add" slot="right" @click="add" src="@/static/image/chat/add.png" alt="">
        </mt-header>
        <div style="height: 40px;"></div>
        <div class="group" v-for="(item,index) in list">
            <!--<router-link :to="{name:'groupChat',query:{info:item}}">-->
                <div class="groupList" @click="toGroupChat(item,index)">
                    <div class="groupName">
                        <img src="@/static/image/chat/groupChat.png"/>
                        <p>{{item.groupname}}</p>
                    </div>
                    <div style="background:#fd4a36;width:8px;height:8px;border-radius:5px;margin-left:5px;" v-if="!item.isChecked"></div>
                </div>
            <!--</router-link>-->
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    export default {
        name: "group",
        data(){
            return{
                // groupList:[],
                list:[],
                userInfo:{},
                token:'',
                conn:{},

            }
        },
        mounted(){
            let userInfo = JSON.parse(localStorage.getItem('loginInfo'));
            this.userInfo = userInfo;
            this.token = userInfo.token;
            this.req();
        },
        computed:{
            ...mapState([
                'groupData'
            ])
        },
        methods:{
            toGroupChat(item,index){
                this.list[index].isChecked = true;
                this.$router.push({name:'groupChat',query:{info:item}})
            },
            req(){
                this.$axios.get('/business/group/'+this.userInfo.im+'/page?page=1&size=10').then(res=>{
                    console.log(res)
                    let arr = res.data.data;
                    for(let i in arr){
                        arr[i].isChecked = true;
                    }
                    this.list = arr;
                }).catch(err=>{
                    console.log(err)
                })
            },
            click(){
                let that = this;
                var option2 = {
                    success: function (resp) {
                        console.log("Response: ", resp)
                        that.$store.dispatch('setGroupList',resp.data)
                        that.list = resp.data;
                        console.log('list',that.list)
                    },
                    error: function (e) {
                        console.log(e)
                    }
                };
                this.$imconn.getGroup(option2);
            },
            goBack(){
                this.$router.go(-1)
            },
            add(){
                this.$router.push({name:'groupList'})
            },
        }
    }
</script>

<style scoped>
    #back{
        width:18px;
    }
    #add{
        width: 16px;
    }
    .container{
        width: 100%;
        height: 100%;
        background: #f1f2f6;
    }
    .group{
        width:100%;
        background: #fff;
        padding: 10px 0;
        border-bottom:1px solid #eee
    }
    .groupList{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width:90%;
        margin:0 auto;
    }
    .groupName{
        display: flex;
        align-items: center;
    }
    .groupList img{
        width:32px;
        height: 32px;
        margin-right:10px;
        border-radius: 20px;
    }
    .groupList p{
        width: 85%;
    }
</style>
