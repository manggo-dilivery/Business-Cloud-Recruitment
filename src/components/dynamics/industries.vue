<template>
  <div class="industries">
    <topNav title="行业头条">
      <img slot="left" @click="handleClick" src="@/static/image/login/arr.png" alt="">
    </topNav>
    <div class="industriesWrapper">
      <div class="industriesBody" ref="parent">
        <div class="content" ref="content">
          <ul>
            <li v-for="item in list" :key="item.nid" class="item" @click="goToDetail(item.nid)">
              <div class="itemContent">
                <div class="itemText" v-text="item.content"></div>
                <div class="itemDesc">
                  <div class="describ">
                    <img class="read" src="@/static/image/dynamics/read.png" alt="">
                    <span>{{item.read}}</span>
                    <img class="applaud" src="@/static/image/dynamics/applaud.png" alt="">
                    <!-- <img class="applaud" src="@/static/image/dynamics/applauded.png" alt="" @click.stop="unapplaud"> -->
                    <span>{{item.applaud}}</span>
                  </div>
                  <div class="time" v-text="getTime(item.createTime)"></div>
                </div>
              </div>
              <img class="imgContent" :src="baseImgUrl + getItemImgUrl(item.images)" alt="" v-if="item.images">
              <img class="imgContent" src="@/static/image/chat/portrait.jpeg" alt="" v-else>
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
      baseImgUrl: 'http://52.69.229.171/business/image?image=',
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
    handleClick(){
      this.$router.go('-1')
    },
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
    getArrfromResData(data){
      if (!data || data.length <= 0 || !data[0].industryList || data[0].industryList.length <= 0)
        return [];
      
      return data[0].industryList;
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
    getTime(time){
      if (!time) return '刚刚';
      time = time.replace(/-/g,"/");
      let tmp = new Date() - new Date(time);
      tmp = tmp / 1000;
      if (tmp < 60) return '刚刚';
      tmp = parseInt(tmp / 60);
      if (tmp < 60) return `${tmp}分前`;
      tmp = parseInt(tmp / 60);
      if (tmp < 24) return `${tmp}小时前`;
      tmp = parseInt(tmp / 24);
      if (tmp < 7) return `${tmp}天前`;
      if (tmp < 30) return `1周前`;

      return '1个月前';
    },
    goToDetail(id){
      this.$router.push({ path: `/industrydetail/${id}` })
    },
    getItemImgUrl(imgUrls){
      return imgUrls.split(',')[0];
    }
  }
}
</script>

<style scoped>
.industries /deep/ .mintui-back{
  cursor: pointer;
}
.industries{
  background: #fff;
  height:100%;
  width: 100%;
  font-family: PingFang-SC-Bold;
  position: relative;
}
.industriesWrapper{
  display: flex;
  position: absolute;
  top: 41px;
  bottom: 0;
  overflow: hidden;
  width: 100%;
}
.industriesBody{
  width: 100%;
  height: 100%;
  padding: 0 20px;
  overflow: auto;
}
.item{
  width: 100%;
  border-bottom: 1px solid #eee;
  box-sizing: border-box;
  height: 120px;
  padding: 12px 0 8px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
}
.itemContent{
  flex: 1;
  position: relative;
  margin-right: 2%;
}
.itemText{
  width: 100%;
  word-break: break-all;
  overflow: hidden;
  text-overflow:ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 20px;
  line-height: 30px;
  color: #333;
}
.itemDesc{
  color: #999;
  font-size: 14px;
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  width:100%;
  justify-content: space-between;
}
.itemDesc .read{
  margin-right: 5px;
  width: 21px;
  height: 16px;
  margin-top:2px;
}
.itemDesc .applaud{
  margin-right: 3px;
  width: 16px;
  height: 16px;
  margin-top:2px;
}
.itemDesc span{
  margin-right: 15px;
  height: 16px;
  line-height: 16px;
}
.time{
  float:right;
}
.imgContent{
  flex: 0 0 160px;
  height: 99px;
  max-width: 40%;
}
.itemContent img{
  width: 150px;
}

</style>