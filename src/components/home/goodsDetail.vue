<template>
    <div>
        <nav-bar title="商品详情"></nav-bar>
        <div class="outer-swiper">
            <img :src="item.goods_image" style="width:100%;height: auto;">
        </div>
        <div class="product-desc">
            <ul>
                <li><span class="product-desc-span">
                    {{item.goods_name}}
                </span></li>
                <li class="price-li">市场价：
                    <s>￥{{item.goods_price1}}</s> 销售价：<span>￥{{item.goods_price2}}</span></li>
                <li class="number-li">购买数量：<span @click="substract">-</span><span>{{num}}</span><span @click="add">+</span></li>
                <li>
                    <mt-button type="primary">立即购买</mt-button>
                    <mt-button type="danger" @click="addToShopCar">加入购物车</mt-button>
                </li>
            </ul>
        </div>
        <transition name="ballFade" v-on:after-enter="afterEnter">
            <div class="ball" v-if="isShow"></div>
        </transition>
        <div class="product-props">
            <ul>
                <li>商品参数</li>
                <li>商品货号：{{item.goods_number}}</li>
                <li>库存情况：{{item.goods_left}}件</li>
            </ul>
        </div>
        <div class="product-info">
            <ul>
                <li>
                    <mt-button type="primary" size="large" plain>图文介绍</mt-button>
                </li>
                <li>
                    <mt-button type="danger" size="large" plain>商品评论</mt-button>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import connect from '../common/connect.js';
    import prodTools from '../common/prodTools.js'
    export default {
        data(){
            return {
                item:{},
                num:1,
                isShow:false,
            }
        },
        created(){
            //1:获取路由参数id
            let id = this.$route.query.id;
            this.$axios.get('/provide/goodsDetailInfo?id='+id).then(result => {
                this.item = result.data[0]
            }).catch( err => {
                console.log(err)
            })
        },
        methods:{
            substract(){
                if(this.num <= 1){
                    return
                }
                this.num--;
            },
            add(){
                if(this.num >= this.item.goods_left){
                    return;
                }
                this.num++;
            },
            addToShopCar(){
                connect.$emit('addToShopCar',this.num);
                this.isShow = true;
                prodTools.addOrUpdate({
                    id:this.item.goodsId,
                    num:this.num
                })
            },
            afterEnter(){
                this.isShow = false;
            }
        }

    }
</script>
<style scoped>
.ballFade-enter-active {
    animation: bounce-in .5s;
}
@keyframes bounce-in {
    0% {
        transform:translate3d(0 ,0, 0);
    }

    50% {
        transform: translate3d(140px,-50px,0);
    }
    75%{
        transform:translate3d(160px,0px,0);
    }
    100% {
        transform: translate3d(140px,100px,0);
    }
}


.swiper {
    border: 1px solid rgba(0, 0, 0, 0.2);
    margin: 8px;
    width: 95%;
    border-radius: 15px;
    overflow: hidden;
}

.outer-swiper,
.product-desc,
.product-props,
.product-info {
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    margin: 3px;
}


/*请ulpadding*/

.outer-swiper ul,
.product-desc ul,
.product-props ul,
.product-info ul {
    padding: 0;
}

.product-desc ul li,
.product-props ul li,
.product-info ul li {
    list-style: none;
    font-size: 15px;
    color: rgba(0, 0, 0, 0.5);
    margin-top: 8px;
}

.product-desc ul >:nth-child(1) span {
    color: blue;
    font-size: 22px;
    font-weight: bold;
}

.product-desc ul >:nth-child(1) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.5);
}

.product-desc ul,
.product-info ul,
.product-props ul {
    padding-left: 10px;
}

.price-li span {
    color: red;
    font-size: 25px;
}

.price-li s {
    margin-right: 16px;
}


/*加减*/

.number-li span {
    display: inline-block;
    border: 2px solid rgba(0, 0, 0, 0.1);
    width: 25px;
}


/*商品参数*/

.product-props ul >:nth-child(1) {
    text-align: left;
}

.product-props ul:not(:nth-child(1)) {
    margin-left: 40px;
}

.product-info ul {
    margin-bottom: 70px;
    padding: 0 5px;
}

.number-li span {
    text-align: center;
}

.number-li >:nth-child(2) {
    width: 40px;
}

.ball {
    border-radius: 50%;
    background-color: red;
    width: 24px;
    height: 24px;
    position: absolute;
    top: 610px;
    left: 120px;
    display: inline-block;
    z-index: 9999;
}
</style>
