<template>
  <div class="imgShow" v-show="imgUrl" ref="imgShow">
    <img :src="imgUrl" alt="" v-show="imgUrl" ref="img">
  </div>
</template>

<script>
export default {
  props: {
    imgUrl: {
      type: String,
      default: ''
    },
    width: {
      type: Number
    },
    height: {
      type: Number
    }
  },
  computed:{
    imgWidth(){
      return this.width > this.defaultWdith ? this.width : this.defaultWdith;
    },
    imgHeight(){
      return this.height > this.defaultHeight ? this.height : this.defaultHeight;
    }
  },
  data(){
    return {
      defaultWdith: 600,
      defaultHeight: 320
    }
  },
  methods:{
    setStyle(){
      let panel = this.$refs.imgShow;
      panel.style.width = this.imgWidth + 'px';
      panel.style.height = this.imgHeight + 'px';
      panel.style.marginLeft = -(this.imgWidth/2) + 'px';
      panel.style.marginTop = -(this.imgHeight/2) + 'px';

      let img = this.$refs.img;
      img.width = this.imgWidth - 40;
      this.$refs.img.height = this.imgHeight - 40;
    }
  }
}
</script>

<style scoped>
.imgShow{
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 100;
  box-shadow: 5px 5px 10px #888;
  border: 2px solid #ccc;
  padding: 20px;
  box-sizing: border-box;
  border-radius:10px;
  text-align: center;
}
.span {
  font-size: 20px;
  line-height: 40px;
}
</style>