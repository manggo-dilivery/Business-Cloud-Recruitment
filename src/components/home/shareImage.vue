<template>
    <div>
        <navBar title="图文分享"></navBar>
        <div class="photo-header">
            <ul>
                <li v-for="item in category" :key="item.id">
                    <a href="javascript:;" @click="changeCategory(item.id)"><p>{{ item.category }}</p></a>
                </li>
            </ul>
        </div>
        <div class="photo-list">
                <ul class="imageLoadMore">
                    <li v-for="(item,index) in categoryList" :key="index">
                        <!-- <img :src="img.img_url"> -->
                        <!-- 懒加载 -->
                        <img :src="item.category_image">
                        <p>
                            <span v-text="item.categoryContent"></span>
                        </p>
                    </li>
                </ul>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                category:[],
                categoryList:[],
                allLoaded:false,
                autoFill:false
            }
        },
        created(){
            this.$axios.get('/provide/category').then(result => {
                this.category = result.data;
            }).catch( err=> {
                console.log(err)
            });
            this.changeCategory(0);
        },
        methods:{
            changeCategory(id){
                let page = 0;
                this.$axios.get('/provide/categoryList?id='+id+'&page='+page).then(result=> {
                    this.categoryList = result.data;
                    this.$refs.loadMore.onBottomLoaded();
                }).catch(err=>{
                    console.log(err);
                })
            },
            loadBottom(){
                this.loadConcat()
            },

        }
    }
</script>

<style scoped>
    .photo-list{
        margin-bottom:52px;
    }
    .photo-header li {
        list-style: none;
        display: inline-block;
        margin-left: 10px;
        height: 30px;
    }

    .photo-header ul {
        /*强制不换行*/
        white-space: nowrap;
        overflow-x: auto;
        padding-left: 0px;
        margin: 5px;
    }


    /*下面的图片*/

    .photo-list li {
        list-style: none;
        position: relative;
    }

    .photo-list li img {
        width: 100%;
        height: 230px;
        vertical-align: top;
    }

    .photo-list ul {
        padding-left: 0px;
        margin: 0;
    }

    .photo-list p {
        position: absolute;
        bottom: 0px;
        color: white;
        background-color: rgba(0, 0, 0, 0.3);
        margin-bottom: 0px;
    }

    .photo-list p span:nth-child(1) {
        font-weight: bold;
        font-size: 16px;
    }

    /*图片懒加载的样式*/
    image[lazy=loading] {
        width: 40px;
        height: 300px;
        margin: auto;
    }
    .imageLoadMore{
        height: 500px;
        overflow: scroll;
    }
</style>