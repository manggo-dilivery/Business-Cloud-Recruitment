<template>
    <div>
        <mt-header title="标题"></mt-header>
        <transition name="router_animate" mode="out-in">
            <router-view></router-view>
        </transition>
        <nav class="mui-bar mui-bar-tab">
            <router-link :to="{name:'home'}" class="mui-tab-item">
                <span class="mui-icon icon-zhuye">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-zhuye"></use>
                    </svg>
                </span>
                <span class="mui-tab-label">首页</span>
            </router-link>
            <router-link :to="{name:'vip'}" class="mui-tab-item">
                <span class="mui-icon icon-huiyuan">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-huiyuan"></use>
                    </svg>
                </span>
                <span class="mui-tab-label">会员</span>
            </router-link>
            <router-link :to="{name:'shopcar'}" class="mui-tab-item">
                <span class="mui-icon icon-gouwuche">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-gouwucheman"></use>
                    </svg><span v-if="ele" class="mui-badge">{{pickNum}}</span></span>
                <span class="mui-tab-label">购物车</span>
            </router-link>
            <router-link :to="{name:'search'}" class="mui-tab-item">
                <span class="mui-icon mui-icon-search"></span>
                <span class="mui-tab-label">查找</span>
            </router-link>
        </nav>
    </div>
</template>

<script>
    import connect from './components/common/connect.js';
    import prodTolls from './components/common/prodTools.js'
    export default{
        data(){
            return {
                pickNum:prodTolls.getAllCount(),
                ele:true
            }
        },
        created(){
            connect.$on('addToShopCar',num => {
                this.pickNum = this.pickNum + num
            });
        }
    }
</script>

<style>
    .router_animate-enter-active,.router_animate-leave-active{
        transition:opacity 0.5s;
    }
    .router_animate-enter, .router_animate-leave-to{
        opacity: 0;
    }


    .icon {
        width: 1em; height: 1em;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
    }
</style>