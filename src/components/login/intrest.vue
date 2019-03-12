<template>
    <div class="intrest" style="padding-top: 40px;">
        <topNav title="兴趣爱好"></topNav>
        <div class="list" v-for="(item,index) in info">
            <div class="empty"><p>{{item.content}}</p></div>
            <div class="listItem" @click="showItem(index2)" v-for="(item2,index2) in item.children">
                <div class="title">
                    <p>{{item2.content}}</p>
                    <div class="titleRight">
                        <p><span>{{item2.num}}</span> / {{item2.children.length}}</p>
                        <img v-if="currentIndex!=index2" src="@/static/image/login/arrowRight.png" alt="">
                        <img v-if="currentIndex==index2" style="width:15px;"
                             @click.stop="itemUp" src="@/static/image/login/arrowDown.png" alt="">
                    </div>
                </div>
                <div class="item" v-show="currentIndex==index2">
                    <div class="itemContent" v-for="(item3,index3) in item2.children" :key="index3" @click="addIntrest(index,index2,index3)">
                        <p>{{item3.content}}</p>
                        <img v-if="item3.showImg" src="@/static/image/login/gou.png" alt="">
                    </div>
                </div>
            </div>
        </div>
        <div class="submit" @click="confirm">
            <div class="doSubmit">确定</div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "intrest",
    data(){
      return{
        // info3:[3,3,3],
        info: [],
        // info2:[],
        currentIndex:-1,
        hobbit1:[]
      }
    },
    created(){
        this.$axios.get('/business/hobby/list/all').then(res=>{
          console.log(res.data.data);
          let info = res.data.data;
          for(let item1 of info){
              for(let item2 of item1.children){
                  item2.num=0;
              }
          }
          this.info = info;
        }).catch(err=>{
          console.log(err)
        })
    },
    methods:{
      showItem(index){
        this.currentIndex = index;
      },
      itemUp(){
        this.currentIndex = '-1';
      },
      addIntrest(index,index2,index3){
          let info = this.info;
          let hobbit = this.hobbit1;
          if(info[index].children[index2].children[index3].showImg){
              let num=info[index].children[index2].num;
              num--;
              this.$set(this.$data.info[index].children[index2].children[index3],'showImg',false);
              this.$set(this.$data.info[index].children[index2],'num',num);
              for(let i in hobbit){
                  if(hobbit[i]==info[index].children[index2].children[index3].content){
                      this.hobbit1.splice(i,1);
                  }
              }
          }else{
              let num=info[index].children[index2].num;
              num++;
              this.$set(this.$data.info[index].children[index2].children[index3],'showImg',true);
              this.$set(this.$data.info[index].children[index2],'num',num);
              this.hobbit1.push(info[index].children[index2].children[index3].content)
          }
          console.log('hobbit1',this.hobbit1)
      },
      confirm(){
          let interest = this.hobbit1;
          window.localStorage.setItem("intrest",JSON.stringify(interest));
          this.$router.go('-1')
      }
    }
  }
</script>

<style scoped>
    .empty{
        background: #f1f2f6;
        width:100%;
        height: 40px;
        display: flex;
        align-items: center;
    }
    .empty p{
        margin-left:20px;
        font-size:16px;
    }
    .list{
        width:100%;
    }
    .listItem{

    }
    .title{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 0;
        border-bottom:1px solid #eee;
    }
    .title > p{
        margin-left:20px;
        font-size:14px;
    }
    .titleRight{
        display: flex;
        align-items: center;
    }
    .titleRight img{
        width:8px;
        margin-left:8px;
        margin-right: 16px;
    }
    .titleRight p{
        font-size:14px;
        color:#888;
    }
    .titleRight span{
        color:#0094ff
    }
    .itemContent{
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #eee;
        width:86%;
        margin-left:12%;
        padding: 10px 0;
    }
    .itemContent img{
        width:16px;
        margin-right:20px;
    }
    .itemContent p{
        color:#888;
        font-size:14px;
    }
    .submit{
        background: #fff;
        padding: 30px 0;
    }
    .doSubmit{
        width:90%;
        margin:0 auto;
        height: 40px;
        background: #0094ff;
        text-align: center;
        color:#fff;
        font-size:16px;
        line-height: 40px;
        letter-spacing: 2px;
        border-radius:5px;
    }
    .doSubmit:active{
        background: #0083ee;
    }
</style>
