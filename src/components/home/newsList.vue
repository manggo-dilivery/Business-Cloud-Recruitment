<template>
    <div>
        <!-- MUI 图文列表 -->
        <nav-bar title="新闻列表"></nav-bar>
        <ul class="mui-table-view">

            <li v-for="(item , index) in news" :key="index" class="mui-table-view-cell mui-media">
                <router-link :to="{name:'newsDetail',query:{_id:item._id}}">
                    <img class="mui-media-object mui-pull-left" :src="avatar">
                    <div class="mui-media-body">
                        <span>{{item.introduction}}</span>
                        <div class="news-desc">
                            <p>发表时间:{{item.time | dateChange}}</p>
                        </div>
                    </div>
                </router-link>
            </li>

        </ul>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                news:[],
                username:'',
                avatar:''
            }
        },
        created(){
            var username = this.$route.query.username;
            this.$axios.get('/provide/article?username='+username).then(result => {
                this.news = result.data[1];
                // var avatar = result.data[0];
                this.avatar = 'http://localhost/avatar/'+ result.data[0];
                // console.log(result.data[0]);
            }).catch(function (err) {
                console.log(err)
            })
        }
    }
</script>

<style scoped>
    .mui-media-body p {
        color: #0bb0f5;
    }

    .news-desc p:nth-child(1) {
        float: left;
    }

    .news-desc p:nth-child(2) {
        float: right;
    }
</style>