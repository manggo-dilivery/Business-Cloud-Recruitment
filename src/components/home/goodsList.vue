<template>
    <div class="tmpl" style="height:577px;overflow: scroll">
        <nav-bar title="商品列表" ></nav-bar>

    <!-- 上啦完毕调用该元素的onBottomLoaded函数， -->
        <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="autoFill" ref="loadMore">
            <ul class="mui-table-view mui-grid-view">
                <li v-for="item in goodsInfo" :key="item.goodsId"  class="mui-table-view-cell mui-media mui-col-xs-6">
                    <router-link :to="{name:'goodsDetail',query:{id:item.goodsId}}">
                        <img class="mui-media-object" :src="item.goods_image">
                        <div class="mui-media-body">{{item.goods_name}}</div>
                        <div class="desc">
                            <div class="sell">
                                <span>￥{{item.goods_price1}}</span>
                                <s>￥{{item.goods_price2}}</s>
                            </div>
                            <div class="detail">
                                <div class="hot">
                                    热卖中
                                </div>
                                <div class="count">
                                    剩{{item.goods_left}}件
                                </div>
                            </div>
                        </div>
                    </router-link>
                </li>
            </ul>
        </mt-loadmore>
    </div>
</template>
<script>
export default {
    data(){
        return {
            page:0,
            goodsInfo:[],
            allLoaded:false,
            autoFill:false,
        }
    },
    created(){
        this.getGoodsInfo(0);
    },
    methods: {
        getGoodsInfo(page){
            this.$axios.get('/provide/goodsInfo?page='+this.page).then(result => {
                this.goodsInfo = result.data;
            }).catch( err=> {
                console.log(err)
            })
        },
        loadBottom(){
            this.loadConcat()
        },
    //    追加数据
        loadConcat(){
            this.$axios.get('/provide/goodsInfo?page='+(++this.page)).then(result => {
                this.goodsInfo = this.goodsInfo.concat(result.data);
                // 请求没有六条数据的时候，禁止下拉刷新
                if(result.data.length != 6){
                    this.allLoaded = true;
                }
                //通知上拉刷新已经完结
                this.$refs.loadMore.onBottomLoaded();

            }).catch( err=> {
                console.log(err)
            })
        }
    }
}

</script>
<style scoped>
.mui-table-view.mui-grid-view .mui-table-view-cell > a:not(.mui-btn) {
    margin: 0px;
    padding: 0px;
    border: 1px solid #5c5c5c;
    box-shadow: 0 0 4px #666;
}

.sell > span {
    float: left;
    color: red;
    text-align: left;
}

.detail >.hot {
    float: left;
    text-align: left;
    font-size: 15px;
}

.detail >.count {
    float: right;
    text-align: right;
    font-size: 15px;
}


/*撑开，去除浮动没有的高度*/

.detail {
    overflow: hidden;
}

.desc {
    color: rgba(92, 92, 92, 0.8);
    background-color: rgba(0, 0, 0, 0.2);
}

.mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-object {
    height: 168.5px;
}
</style>
