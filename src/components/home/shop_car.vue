<template>
    <div>
        <nav-bar title="购物车"></nav-bar>
        <div class="pay-detail">
            <ul>
                <li v-for="(item , index) in goodsInfo" :key="index" class="p-list">
                    <mt-switch v-model="item.isPicked"></mt-switch>
                    <img :src="item.goods_image">
                    <div class="pay-calc">
                        <p v-text="item.goods_name"></p>
                        <div class="calc">
                            <span>￥{{item.goods_price1}}</span>
                            <span @click="sub(index)">-</span>
                            <span>{{item.num}}</span>
                            <span @click="add(index)">+</span>
                            <a href="javascript:" @click="del(index)">删除</a>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="show-price">
            <div class="show-1">
                <p>总计(不含运费):</p>
                <span>已经选择商品{{payment.num}}件，总价￥{{payment.sum}}元</span>
            </div>
            <div class="show-2">
                <mt-button type="danger" size="large">去结算</mt-button>
            </div>
        </div>
    </div>
</template>
<script>
    //引入商品操作工具对象
    import prodTools from '../common/prodTools.js';
    //通知底部变更数据
    import connect from '../common/connect.js';
    export default {
        data(){
            return {
                goodsInfo:[],
            }
        },
        created(){
            let prods = prodTools.getProds();
            if(Object.keys(prods).length == 0){
                return;
            }
            let url ='/provide/getShopCarList/';
            url += Object.keys(prods).join(',');
            this.$axios.get(url).then(result => {
                this.goodsInfo = result.data;
                this.goodsInfo.forEach((ele,index) => {
                    if(prods[ele.goodsId]){
                    //     ele.num = prods[ele.goodsId];
                    //     ele.isPicked = true;
                        this.$set(ele,'num',prods[ele.goodsId]);
                        this.$set(ele,'isPicked',true);
                    }
                });
                // console.log(this.goodsInfo)
            }).catch( err => {
                console.log(err);
            })

        },
        methods: {
            sub(i){
                if(this.goodsInfo[i].num<=1) return;
                this.goodsInfo[i].num--;
                connect.$emit('addToShopCar',-1);
                prodTools.addOrUpdate({
                    id:this.goodsInfo[i].goodsId,
                    num:-1,
                })
            },
            add(i){
                this.goodsInfo[i].num++;
                connect.$emit('addToShopCar',1);
                prodTools.addOrUpdate({
                    id:this.goodsInfo[i].goodsId,
                    num:1,
                })
            },
            del(i){
                let goods = this.goodsInfo[i];
                prodTools.delete(goods.goodsId);
                connect.$emit('addToShopCar',-goods.num);
                this.goodsInfo.splice(i,1);
            }
        },
        computed:{
            payment(){
                let num = 0;
                let sum = 0;
                this.goodsInfo.forEach((ele) => {
                    if(ele.isPicked){
                        sum += ele.num * ele.goods_price1;
                        num += ele.num;
                    }
                });
                return { num , sum }
            }
        }
    }



</script>
<style scoped>
    .pay-detail ul li {
        list-style: none;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        margin-bottom: 3px;
    }

    .pay-detail ul {
        padding-left: 5px;
        margin-top: 5px;
    }

    .pay-detail ul li img {
        width: 80px;
        height: 80px;
        display: inline-block;
        vertical-align: top;
        margin-top: 10px;
    }

    .pay-detail ul li >:nth-child(1),
    .pay-detail ul li >:nth-child(3) {
        display: inline-block;
    }

    .pay-calc p {
        display: inline-block;
        width: 250px;
        overflow: hidden;
        color: blue;
        font-size: 15px;
        margin-bottom: 10px;
    }

    .pay-detail ul li >:nth-child(1) {
        line-height: 80px;
    }

    .calc:nth-child(1) {
        color: red;
        font-size: 20px;
    }

    .calc span:not(:nth-child(1)) {
        border: 1px solid rgba(0, 0, 0, 0.3);
        display: inline-block;
        width: 20px;
        text-align: center;
    }

    .calc a {
        margin-left: 20px;
    }

    .show-1,
    .show-2 {
        display: inline-block;
    }

    .show-1,
    .show-2 {
        margin-left: 30px;
    }

    .show-price {
        background-color: rgba(0, 0, 0, 0.2);
        margin-bottom:60px;
    }
</style>
