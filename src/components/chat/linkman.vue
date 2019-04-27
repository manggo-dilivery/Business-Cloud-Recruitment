<template>
    <div class="container">
        <mt-header fixed title="联系人">
            <!--<img id="search" slot="left" src="@/static/image/chat/search.png" alt="">-->
            <img id="add" slot="right" @click.stop="showOption=!showOption" src="@/static/image/chat/add.png" alt="">
        </mt-header>
        <mu-fade-transition>
            <div class="option" v-show="showOption"  v-click-outside="clickoutside">
                <router-link :to="{name:'addFriend'}">
                    <div class="optionItem">
                        <img src="@/static/image/chat/addPeople.png" alt="">
                        <p>添加好友</p>
                    </div>
                </router-link>
                <router-link :to="{name:'recommend'}">
                    <div class="optionItem" style="border-bottom: none">
                        <img style="width:17px;height: 8.5px;" src="@/static/image/chat/recommend.png" alt="">
                        <p>推荐</p>
                    </div>
                </router-link>
            </div>
        </mu-fade-transition>
        <div class="topEvent">
            <div class="topItem" @click="toBlackList">
                <img src="@/static/image/chat/invite.png" alt="">
                <p>黑名单</p>
            </div>
            <router-link :to="{ name:'group' }">
                <div class="topItem">
                    <img src="@/static/image/chat/groupChat.png" alt="">
                    <p>群聊</p>
                </div>
            </router-link>
        </div>
        <div class="friendList">
            <mt-index-list :show-indicator="false">
                <div v-for="(item,index) in list">
                    <mt-index-section :index="index">
                        <friend showInput="false" :info="item"></friend>
                    </mt-index-section>
                </div>
            </mt-index-list>
        </div>
        <!--<searchMan></searchMan>-->
    </div>
</template>

<script>
    import HanziToPinyin from "../../api/py";
    import {mapState} from 'vuex'
    export default {
        name: "linkman",
        data(){
            return{
                showOption:false,
                list:null,
                ip:''
            }
        },
        computed:{
            ...mapState([
                'userInfo'
            ])
        },
        mounted(){
            this.ip = this.imageUri
            this.req();
        },
        methods:{
            toBlackList(){
                this.$router.push({name:'blackList'})
            },
            clickoutside(){
                this.showOption = false
            },
            req(){
                this.$axios.get('/business/friends/user/'+this.userInfo.im+'/page?page=1&size=1000').then(res=>{
                    console.log(res.data.data);
                    // let hanZi = "Ads";
                    // console.log("输出首字母"+HanziToPinyin.instance.initialTreatment(hanZi));
                    let arr = res.data.data.list;
                    let list = {};
                    let obj = {};
                    let word;
                    console.log(arr)
                    for(let i in arr){
                        word = HanziToPinyin.instance.initialTreatment(arr[i].username).toUpperCase();
                        if(obj[word]){
                            list[word].push({name:arr[i].username,im:arr[i].im, telephone:arr[i].telephone,
                                companyName:arr[i].companyName,avatar:this.ip+'/business/image?image='+arr[i].avatar,
                                email:arr[i.email],});
                        }else{
                            list[word] = [{name:arr[i].username,im:arr[i].im, telephone:arr[i].telephone,
                                companyName:arr[i].companyName,avatar:this.ip+'/business/image?image='+arr[i].avatar,
                                email:arr[i.email],}];
                            obj[word] = word;
                        }
                    }
                    this.list = list;
                    console.log(list)
                })
            }
        }
    }
</script>

<style scoped>
    a {
        text-decoration: none;
        color:#333
    }
    .router-link-active {
        text-decoration: none;
    }
    .container{
        height:100%;
        padding: 40px 0 60px 0;
    }
    .topEvent{

    }
    .topItem{
        padding: 8px 0;
        display: flex;
        align-items: center;
        width:calc(100% - 21px);
        border-bottom:1px solid #ddd;
        border-right:1px solid #ddd;
    }
    .topItem img{
        width:36px;
        height: 36px;
        margin-left:20px;
    }
    .topItem p{
        font-size:16px;
        margin-left:10px;
        letter-spacing: 1px;
    }
    .friendList{

    }
    #search{
        width:20px;
        height: 20px;
    }
    #add{
        width:20px;
        height: 20px;
    }
    /*点击加号出现的选择项*/
    .option{
        position: fixed;
        width:140px;
        top:46px;
        right:6px;
        background: rgba(63,68,71,0.9);
        z-index:10;
        border-radius:5px;
    }
    .optionItem{
        display: flex;
        align-items: center;
        width:80%;
        margin:0 auto;
        padding: 10px 0;
        border-bottom:1px solid #efefef;
    }
    .optionItem img{
        width:17px;
        height: 17px;
        margin-left:8px;
    }
    .optionItem p{
        color:#efefef;
        margin-left:18px;
        letter-spacing: 1px;
        font-size:14px;
    }

</style>
