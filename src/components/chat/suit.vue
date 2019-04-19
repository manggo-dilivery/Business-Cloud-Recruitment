<template>
    <div>
        <topNav title="投诉"></topNav>
        <div style="height: 40px;"></div>
        <div class="box">
            <p class="title">请选择投诉原因</p>
            <mt-radio
                    align="right"
                    v-model="value"
                    :options="options">
            </mt-radio>
            <mt-field style="margin-left:16px;" placeholder="补充说明（请输入文字或上传截图说明）" type="textarea" rows="3" v-model="introduction"></mt-field>
            <div class="picture">
                <div class="addImgaa" v-for="item in imgList">
                    <img :src="item" alt="">
                </div>
                <div class="addImg">
                    <img class="addImg" src="@/static/image/chat/groupAdd.png" alt="">
                    <input class="file" type="file" accept="image/png,image/gif,image/jpg,image/jepg" @change="update"/>
                </div>
            </div>
            <mt-button @click="submit" style="margin-top:40px;" type="primary" size="large">提交</mt-button>
        </div>
    </div>
</template>

<script>
    import {MessageBox} from 'mint-ui'
    export default {
        name: "suit",
        data(){
            return{
                value:'',
                options:[
                    {
                        label: '不实广告',
                        value: '1',
                    },
                    {
                        label: '色情',
                        value: '2'
                    },
                    {
                        label: '政治有害',
                        value: '3'
                    },
                    {
                        label: '身份作假',
                        value: '4'
                    },
                    {
                        label: '其他（辱骂，恶意灌水等）',
                        value: '5'
                    }
                ],
                introduction:'',
                imgList:[],
                img:[],
                friendInfo:{},
                ip:''
            }
        },
        mounted(){
            let friendInfo = this.$route.query.userInfo;
            console.log(this.friendInfo);
            this.ip = this.imageUri;
            this.$axios.get('/business/user/im/'+friendInfo.im).then(res=>{
                this.friendInfo = res.data.data
            })
        },
        methods:{
            submit(){
                let friendInfo = this.friendInfo;
                let imgStr = this.img.join(',')
                // business/complaints/add?content=1324&imgs=3123&status=432&type=234&uid=123
                this.$axios.post('/business/complaints/add?content='+this.introduction+'&status=1&imgs='+imgStr+'&type='+this.value+'&uid='+friendInfo.uid).then(res=>{
                    console.log(res)
                    if(res.data.code===200){
                        MessageBox.alert('操作成功').then(action => {
                            this.$router.push('/')
                        });
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            update(e){
                let image = e.target.files[0];
                let param = new FormData();
                param.append('file',image,image.name);
                var type = image.type;
                if(type.indexOf("image")==-1){
                    alert("请上传图片");
                    return false;
                }
                let config = {
                    headers:{'Content-Type':'multipart/form-data'}
                };
                this.$axios.post('/business/upload',param,config)
                .then(res=>{
                    console.log(res)
                    let imgUrl = this.ip+'/business/image?image='+res.data.data;
                    this.imgList.push(imgUrl)
                    this.img.push(res.data.data)
                })
            }
        }
    }
</script>

<style scoped>
    .file{
        position: absolute;
        width:100%;
        height: 100%;
        top:0;
        left:0;
        z-index:5;
        background: #fff;
        opacity: 0;
    }
    .title{
        background: #f1f2f6;
        color:#666668;
        height: 40px;
        display: flex;
        align-items: center;
        padding-left:26px;
    }
    .picture{
        width:90%;
        margin:0 auto;
        display: flex;
        flex-wrap: wrap;
    }
    .addImgaa{
        margin-right:20px;
        width: 40px;
        height: 40px;
    }
    .addImgaa img{
        width:100%;
        max-height: 60px;
    }
    .addImg{
        width:40px;
        height:40px;
        border:1px solid #aaa;
        border-radius:5px;
        position: relative;
    }
</style>
