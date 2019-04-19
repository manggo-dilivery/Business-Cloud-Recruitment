<template>
  <div class="dynBody" ref="dynBody" @click="hiddenCommentControlPanel">
    <div class="wrap" ref='wrap'>
        <div class="content" ref="content">
        <div class="user">
            <img src="@/static/image/chat/topbg.png" alt="">
            <div class="userInfo">
              <img :src="portrait" alt="" v-if="portrait">
              <img src="@/static/image/chat/portrait.jpeg" alt="" v-else>
              <p>商务云用户</p>
              <img src="@/static/image/chat/v1.png" alt="">
            </div>
        </div>
        <div class="text">
            <h4 style="padding: 8px 0;border-bottom: 1px solid #eee;text-align: center">商务云用户，开始第{{industryInfo.date}}天的阅读吧。</h4>
            <div class="box">
              <img :src="industryImg" alt="" v-if="industryImg">
              <img src="@/static/image/chat/portrait.jpeg" alt="" v-else>
              <div class="boxTitle">
                <p>{{fistIndustry.content}}</p>
                <p>{{fistIndustry.comment}}个同行评论</p>
              </div>
            </div>
            <ul class="ulList">
              <li v-for="(item,index) in otherIndustries" :key="index"><img src="@/static/image/chat/dot.png" alt=""><p>{{item.content}}</p></li>
            </ul>
            <p class="seeMore" @click="viewMore">查看更多行业头条</p>
        </div>
        <dymamicsItem v-for="item in list" :key="item.nid" :item="item" @setChild="setChild" @showCommentPanel="showCommentPanel" @showImg="showImg"></dymamicsItem>
      </div>
    </div>
    <Comment :commentChild="commentChild" :cItem="cItem" @close="closeCommentPanel" ref="comment"></Comment>
    <ImgShow :imgUrl="imgUrl" ref="imgShow"></ImgShow>
    <div class="layer" ref="layer" v-show="showLayer" @click="hiddenChildPanel" ></div>
  </div>
</template>

<script>
import dymamicsItem from './dynamicsItem'
import Comment from './comment'
import ImgShow from './imgShow'
export default {
    name: "dynamics",
    components: {
        dymamicsItem,
        Comment,
        ImgShow
    },
    computed: {
        industryImg(){
            if (this.fistIndustry.images) {
                let imgs = this.fistIndustry.images.split(',');
                return imgs.length > 0 && `${this.baseImgUrl}${imgs[0]}`;
            }
            return false;
        },
        showLayer(){
            return this.imgUrl || this.commentChild;
        }
    },
    data(){
        return{
            baseImgUrl: 'http://52.69.229.171/business/image?image=',
            currentIndex:0,
            industryInfo: {},
            fistIndustry:{},
            otherIndustries: [],
            list: [],
            page: 1,
            pageShow: 4,
            scroll: {},
            loading: false,
            loadAll: false,
            child: null,
            commentChild: null,
            cItem: null,
            imgUrl: '',
            portrait: ''
        }
    },
    methods:{
        initScroll(){
            const parent = this.$refs.wrap;
            const content = this.$refs.content;

            if (!parent) return;

            let lastTop = parent.scrollTop;
            let direction = '';
            parent.onscroll = () => { 
                direction = lastTop > parent.scrollTop ? 'up' : 'down';
                if (!this.loading && direction === 'down' && parent.clientHeight + parent.scrollTop >= content.clientHeight - 50) {
                    if (this.loadAll){
                        this.loading = true;
                        this.$message({
                            message: '已全部加载完成',
                            type: 'success',
                            showClose: true,
                            onClose: ()=>{
                                this.loading = false;
                            }
                        });
                    } else {
                        this.loadData();
                    }
                }
                lastTop = parent.scrollTop;
            }

            let layer = this.$refs.layer;
            let width = parent.clientWidth;
            let height = parent.clientHeight;

            layer.style.width = width + 'px';
            layer.style.height = height + 'px';

            this.$nextTick(()=>{
                this.$refs.imgShow.setStyle(width * 0.8, height * 0.8);
            })
        },
        indexChange(index){
            this.currentIndex = index
        },
        setChild(child){
            if (this.child !== child)
                this.hiddenChildPanel();
            this.child = child;
        },
        hiddenCommentControlPanel(){
            this.child && this.child.hide();
        },
        hiddenChildPanel(){
            this.commentChild && (this.commentChild.isCommenting = false);
            this.commentChild = null;
            this.imgUrl = null;
        },
        showCommentPanel(child, cItem){
            this.commentChild = this.child || child;
            this.cItem = cItem ? cItem : null;
            this.imgUrl = null;
        },
        closeCommentPanel(commentItem){
            commentItem && this.commentChild.item.commentList.push(commentItem);
            this.hiddenChildPanel();
        },
        showImg(imgUrl){
            this.imgUrl = this.baseImgUrl + imgUrl;
            console.log(imgUrl);
        },
        goToNew(){
            this.$router.push('/dynamicsnew');
        },
        viewMore(){
            this.$router.push('/industries');
        },
        loadData() {
            this.loading = true;
            this.page++;
            const info = JSON.parse(localStorage.getItem("loginInfo"));
            this.$axios.get(`/business/news/listByFriends?page=${this.page}&size=${this.pageShow}&uid=${info.uid}`)
                .then(res=>{
                    if(res.data.code === 200) {
                        this.list = this.list.concat(res.data.data);
                        this.loading = false;
                        if(res.data.data.length < this.pageShow){
                            this.loadAll = true;
                        }
                    }
                })
                .catch(err => console.warn(err));
        }
    },
    created(){
        const info = JSON.parse(localStorage.getItem("loginInfo"));
        this.$axios.get(`/business/user/get/${info.uid}`)
            .then(res=>{
                this.portrait = this.baseImgUrl + res.data.data.portrait;
            })
            .catch(err => console.warn(err));

        this.$axios.get(`/business/news/industry/page?page=1&size=4&uid=${info.uid}`)
            .then(res=>{
                if (res.data.code === 200) {
                    this.industryInfo = res.data.data[0] || {};
                    if(this.industryInfo.industryList && this.industryInfo.industryList.length > 0) {
                        this.fistIndustry = this.industryInfo.industryList[0];
                        this.otherIndustries = this.industryInfo.industryList.filter((item,index) => index > 0);
                    }
                }
            })
            .catch(err => console.warn(err));
            
        this.$axios.get(`/business/news/listByFriends?page=1&size=${this.pageShow}&uid=${info.uid}`)
            .then(res=>{
                if(res.data.code === 200) {
                    this.list = res.data.data;
                }
                
                this.$nextTick(() => { 
                    this.initScroll();
                })
            })
            .catch(err => console.warn(err));
    }
}
</script>

<style scoped>
    .dynBody{
        background: #efefef;
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
    }
    .wrap{
        overflow-x:hidden;
        overflow-y:auto;
        width: 100%;
        height: 100%;
    }
    /*用户信息*/
    .user{
        width:100%;
        position: relative;
        left:0;
        margin:0 !important;
    }
    .user > img{
        width:100%;
        height:100px;
    }
    .userInfo{
        position: absolute;
        top:20px;
        left:20px;
        display: flex;
        align-items: center;
    }
    .userInfo img:first-of-type{
        width:45px;
        height: 45px;
        border-radius:50%;
    }
    .userInfo img:last-of-type{
        width:18px;
        height: 18px;
        margin-left:5px;
        margin-bottom:5px;
    }
    .userInfo p{
        margin-left:10px;
        color:#fff;
        font-family: PingFang-SC-Bold;
        font-size: 20px;
        letter-spacing: 1px;
        margin-bottom:5px;
    }
    /*text*/
    .text{
        width:90%;
        margin:0 auto;
        margin-top:-18px;
        box-shadow:0 0 10px #ddd;
        background: #fff;
        position: relative;
        z-index:5;
        padding: 10px 0;
    }
    .box{
        display: flex;
        align-items: center;
        padding: 10px 0;
    }
    .box img{
        flex: 0 0 120px;
        height: 80px;
        margin-left:19px
     }
    .boxTitle{
        flex: 1;
        margin-left: 10px;
        margin-right: 20px;
    }
    .boxTitle p:first-child{
        font-size:14px;
        color:#000;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
        word-break: break-all;
        cursor: pointer;
    }
    .boxTitle p:last-child{
        font-size:12px;
        color:#999;
        margin-top:18px;
    }
    .ulList{
        width:90%;
        margin:0 auto;
        border-bottom: 1px solid #eee;
        padding-bottom: 10px;
    }
    .ulList li{
        display: flex;
        align-items: center;
        padding: 3px 0;
    }
    .ulList li img{
        margin-left:5px;
    }
    .ulList li p{
        width:100%;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        margin-left:10px;
        cursor: pointer;
    }
    .seeMore{
        width:100%;
        text-align: center;
        color:#999;
        font-size:14px;
        margin-top:5px;
        cursor: pointer;
    }
    #search,
    #add{
        cursor: pointer;
    }
    .layer{
        position: absolute;
        top:0;
        bottom:0;
        background-color: rgba(0, 0, 0, 0.3);
        z-index: 10;
    }
</style>

