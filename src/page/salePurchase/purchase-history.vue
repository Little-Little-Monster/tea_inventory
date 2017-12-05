<template>
  <div class="purchase_detail">
    <head-top signin-up='msite' goBack="" head-title="销售历史">
      <div slot="back" class="goback" @click="toAddress({name:'msite'});" >
          <span class="iconfont icon-fanhui title_text"></span>
      </div>
    </head-top>
    <div class="purchase_detail_header paddingTop">
      <div class="left_button" :class="{'active':status==0}" @click="status=0">全部 <span></span></div>
      <div class="left_button" :class="{'active':status==2}" @click="status=2">已销售 <span></span></div>
      <div class="right_button" :class="{'active':status==1}" @click="status=1">草稿 <span></span></div>
      <div class="right_button" :class="{'active':status==3}" @click="status=3">撤销 <span></span></div>
    </div>
    <div class="cneter-con">
      <div class="list buy-list" v-for="history in historyList" @click="editSaleOrder(history.id)">
        <p>{{history.customerName}}</p>
        <p class="text-info">{{history.createDateStr}}</p>
        <div class="list-more">
          <em>￥{{history.totalAmount}}</em><br>
          <em>{{history.warehouseName}}</em>
        </div>
        <span class="list-option">
          <em class="iconfont icon-qianjin"></em>
        </span>
      </div> 
    </div>
  </div>
</template>
<script>
  import { mapMutations } from 'vuex'
  import { getStore } from 'src/config/mUtils'
  import headTop from 'src/components/header/head'
  import {get_sale_history} from 'src/service/getData'
  import footGuide from 'src/components/footer/footGuide'

  export default {
    data(){
      return {
        enable: true,
        imgPath: 'static/images/head.png',
        userId:getStore('userInfo').id,
        historyList:[],
        status:0
      }
    },
    components: {
      headTop,
      footGuide,
    },
    computed: {},
    created(){
      this.getHistory();
    },
    mounted(){

    },
    methods: {
      ...mapMutations([
        'CHANGE_HEADER'
      ]),
      toAddress(name){
        this.$router.push(name)
      },
      getHistory(){
        get_sale_history(this.userId,0,100,this.status,2).then((res)=>{
          this.historyList = res.data.info;
        }).catch((err)=>{

        })
      },
      editSaleOrder(id){
        this.$router.push({name:"saleTrade",query:{
          edit:true,
          fromPage:"saleHistory",
          id:id
        }})
      }
    },
    watch: {
      'status'(){
        this.getHistory()
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '../../../src/style/mixin';

  .purchase_detail {
    .purchase_detail_header {
      display: flex;
      justify-content: space-between;
      background: #fff;
      height: 0.8rem;
      font-size: 16px;
      padding: 0 0.58rem 0 0.79rem;
      align-items: center;
      margin-bottom:.01rem;
      div.active {
        position: relative;
        height: 0.8rem;
        line-height: 0.8rem;
        span {
          position: absolute;
          bottom: 0;
          left: 50%;
          margin-left: -0.15rem;
          width: 0.3rem;
          height: 0.06rem;
          background: #9FC894;
        }
      }
    }
    .buy-list{
      @include wh(100%,1.8rem);
      padding:.4rem .8rem;
      margin-bottom:.1rem;
      p{
        &:nth-child(1){
          margin-bottom:.3rem;
        }
      }
      .text-info{
        @include sc(.24rem,$text_light);
        margin:.1rem 0;
      }
      .list-more{
        @include ct;
        @include sc(.28rem,#666)
        @include wh(1.5rem,.8rem);
        right:.8rem;
        text-align:center;
        em:nth-child(1){
          color:#D38888;
          line-height:.3rem;
        }
      }
    }
  }
</style>
