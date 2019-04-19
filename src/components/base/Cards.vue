<template>
  <div class="cards">
    <mt-header fixed title="银行账户">
      <router-link to="/" slot="left">
        <mt-button @click="$router.go(-1)" icon="back" size="small"></mt-button>
      </router-link>
      <div slot="right" @click='beginDelete' class="rightCrl">{{controlText}}</div>
    </mt-header>
    <div class="bodyWrap">
      <div class="body">
        <div class="addedCards" v-if="cards.length">
          <div class="cardline" v-for="card in showCards" :key="card.id" :style="{'margin-left': deleting ? '0' : '-72px'}">
            <div class="cardControl" @click="selectCard(card)">
              <img src="@/static/image/base/selected.png" v-if="card.selected" alt="">
              <img src="@/static/image/base/unselected.png" v-else alt="">
            </div>
            <div class="card">
              <img src="@/static/image/base/cardhead.png" alt="" width="96" height="96">
              <div class="cardInfo">
                <p>{{card.bank}}</p>
                <p>
                  <span>{{card.cardnum}}</span>
                  <span>{{card.type}}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="nocards" v-else>
          <img src="@/static/image/base/nocard.png" alt="">
          <p>添加银行卡</p>
          <p>即可享受安全便捷的移动支付体验</p>
        </div>
        <div class="remBtn" v-if="deleting" @click="removeCard">确定删除</div>
        <div class="addBtn" v-else @click="addCard">+添加银行卡</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      cards: [],
      deleting: false
    }
  },
  computed:{
    showCards(){
      return this.cards.map(item => {
        item.selected = false;
        return item;
      });
    },
    controlText(){
      return this.deleting ? "取消": "删除";
    }
  },
  created(){
    this.cards = [
      {
        id: 0,
        bank: '招商银行',
        cardnum: '尾号2546',
        type: '储蓄卡'
      },
      {
        id: 1,
        bank: '招商银行',
        cardnum: '尾号2546',
        type: '储蓄卡'
      },
      {
        id: 2,
        bank: '招商银行',
        cardnum: '尾号2546',
        type: '储蓄卡'
      },
      {
        id: 3,
        bank: '招商银行',
        cardnum: '尾号2546',
        type: '储蓄卡'
      },
      {
        id: 4,
        bank: '招商银行',
        cardnum: '尾号2546',
        type: '储蓄卡'
      },
      {
        id: 5,
        bank: '招商银行',
        cardnum: '尾号2546',
        type: '储蓄卡'
      }
    ];

    console.log(this.showCards);
  },
  methods: {
    beginDelete(){
      this.deleting = !this.deleting;
    },
    selectCard(card) {
      card.selected = !card.selected;
      this.$forceUpdate();
    },
    addCard(){
      this.$router.push('/addcard');
    },
    removeCard(){
      alert('removecard')
    }
  }
}
</script>

<style scoped>
.rightCrl{
  cursor: pointer;
}
.cards {
  background: #f1f2f6;
  width: 100%;
  height: 100%;
  position: relative;
  overflow:hidden;
  font-family: PingFang-SC-Medium;
}
.bodyWrap{
  position: absolute;
  top: 41px;
  bottom: 0;
  overflow:hidden;
  width: 100%;
}
.body{
  width: 100%;
  margin: 0 auto;
  height: 100%;
  text-align: center;
  overflow-x: hidden;
  overflow-y: auto;
  padding-bottom: 100px;
}
.nocards img{
  padding-top: 140px;
  padding-bottom: 46px;
}
.nocards p {
  margin: 0 auto;
  color: #999;
  font-size:  26px;
}
.addedCards {
  margin: 2px auto;
  text-align: left;
  width: 690px;
  overflow: hidden;
}
.cardline {
  display: flex;
  width: 752px;
  align-items: center;
}
.cardControl{
  margin-top: 30px;
  margin-right: 36px;
  cursor: pointer;
}
.cardControl img{
  width: 36px;
  height: 36px;
}
.addedCards .card{
  background-image: url('../../static/image/base/cardbak.png');
  background-size: 100% 100%;
  width: 690px;
  height: 160px;
  display: flex;
  align-items: center;
  margin-top: 30px;
}
.addedCards .card img{
  margin-left:20px;
  margin-right: 20px;
}
.cardInfo{
  height: 96px;
}
.cardInfo p:first-child{
  font-size: 32px;
  color: #fff;
}
.cardInfo p:last-child{
  font-size: 26px;
  color: #fff;
}
.cardInfo p span{
  margin-right: 52px;
}
.addBtn{
  width: 690px;
  border: 2px dashed #999;
  color: #666;
  font-size: 32px;
  text-align: center;
  line-height: 100px;
  border-radius: 10px;
  cursor: pointer;
  margin: 78px auto 0;
}
.addBtn:hover{
  border-color: #333;
  color: #333;
}
.remBtn{
  width: 690px;
  color: #fff;
  font-size: 34px;
  text-align: center;
  line-height: 100px;
  border-radius: 10px;
  cursor: pointer;
  margin: 78px auto 0;
  background-color: #0095ff;
}
.remBtn:hover{
  background-color: rgba(0, 148, 255, .8)
}
</style>