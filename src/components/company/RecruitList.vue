<template>
  <div class="recruit" :class="className">
    <mt-header fixed title="招聘职位">
      <router-link to="/" slot="left">
        <mt-button @click="$router.go(-1)" icon="back" size="small"></mt-button>
      </router-link>
      <img slot="right" @click="$router.push('/publishjob')" src="@/static/image/chat/edit.png" alt="">
    </mt-header>
    <div class="recruitWrapper">
      <div class="recruitBody" ref="parent">
        <div class="content" ref="content">
          <ul>
            <li v-for="item in list" :key="item.nid" class="item" @click="goToDetail(item.nid)">
              <div class="title">
                <p>UI设计</p>
                <p>15K-30K</p>
              </div>
              <p class="company">江苏你好科技有限责任公司</p>
              <div class="need">
                <p>南京 鼓楼区 三牌楼</p>
                <p>经验不限</p>
                <p>本科</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      list: [],
      page: 1,
      pageShow: 8,
      loading: false,
      loadAll: false
    }
  },
  created(){
    this.$axios.get(`/business/news/page?page=${this.page}&size=${this.pageShow}`)
      .then(res=>{
        if (res.data.code === 200) {
          this.list = res.data.data;
          this.$nextTick(() => { 
            this.initScroll();
          })
        }
      })
      .catch(err => console.warn(err));
  },
  methods: {
    initScroll(){
      const parent = this.$refs.parent;
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
    },
    loadData() {
      this.loading = true;
      this.page++;
      this.$axios.get(`/business/news/page?page=${this.page}&size=${this.pageShow}`)
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
    },
    goToDetail(){
      this.$router.push('/jobdetail')
    },
    handleClick(){

    }
  },
  computed: {
    className(){
      return `recruit-${this.$store.state.viewMode}`
    },
  },
}
</script>

<style scoped>
.recruit /deep/ .mintui-back{
  cursor: pointer;
}
.mint-header-button img{
  width:18px;
  height: 18px;
  margin-right:10px;
}
.recruit{
  background: #fff;
  height:100%;
  width: 100%;
  font-family: PingFang-SC-Bold;
  position: relative;
}
.recruitWrapper{
  display: flex;
  position: absolute;
  top: 41px;
  bottom: 0;
  overflow: hidden;
  width: 100%;
}
.recruitBody{
  width: 100%;
  height: 100%;
  padding: 0 60px;
  overflow: auto;
}
.recruit-min .recruitBody{
  padding: 0 20px;
}
.item{
  width: 100%;
  border-bottom: 1px solid #eee;
  box-sizing: border-box;
  padding: 40px 0;
  cursor: pointer;
}
.recruit-min .item{
  padding: 20px 0;
}
.title {
  display:flex;
  justify-content: space-between;
}
.title p{
  line-height: 50px;
  font-size: 34px;
  color: #333;
}
.recruit-min .title p{
  line-height: 30px;
  font-size: 16px;
}
.title p:last-child{
  line-height: 30px;
  font-size: 30px;
  color: #0094ff;
  padding-top:12px;
}
.recruit-min .title p:last-child{
  line-height: 26px;
  font-size: 14px;
  padding-top: 4px;
}
.company {
  line-height: 28px;
  padding: 16px 0 22px;
  font-size: 28px;
  color: #666;
  letter-spacing: 1px;
}
.recruit-min .company{
  line-height: 20px;
  padding: 8px 0 10px;
  font-size: 14px;
}
.need {
  display: flex;
  flex-wrap: wrap;
}
.need p {
  border-radius: 5px;
  background-color: #f9f9f8;
  color: #999;
  padding: 10px 14px;
  margin-right: 14px;
  font-size: 24px;
  line-height: 24px;
}
.recruit-min .need p {
  padding: 5px 8px;
  margin-right: 8px;
  font-size: 12px;
  line-height: 12px;
}
</style>