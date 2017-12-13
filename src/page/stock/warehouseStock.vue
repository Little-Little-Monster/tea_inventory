<template>
  <div class="purchase_detail">
    <head-top signin-up='msite' goBack="" head-title="盘点查询">
      <span  slot="right" class="iconfont icon-jia" @click="$router.push({name:'addStock'})" ></span>
      <div slot="back" class="goback" @click="toAddress({name:'msite'});" >
          <span class="iconfont icon-fanhui title_text"></span>
      </div>
    </head-top>
    <div class="purchase_detail_header paddingTop">
      <div class="left_button" :class="{'active':status==0}" @click="status=0">全部 <span></span></div>
      <div class="left_button" :class="{'active':status==2}" @click="status=2">已盘点 <span></span></div>
      <div class="right_button" :class="{'active':status==1}" @click="status=1">草稿 <span></span></div>
    </div>
    <div class="cneter-con">
      <div class="list buy-list" v-for="stock in stockList" @click="editStock(stock.id)">
        <p>门店：{{stock.storeName}}</p>
        <p class="text-info">仓库：{{stock.warehouseName}}</p>
        <p class="text-info">创建时间：{{stock.createTimeStr}}</p>
        <span class="list-option">
          <em class="iconfont icon-qianjin"></em>
        </span>
      </div> 
    </div>
    <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="showAlert=false" :alertText="alertText"></alert-tip>
  </div>
</template>
<script>
  import { mapMutations } from 'vuex'
  import { getStore } from 'src/config/mUtils'
  import headTop from 'src/components/header/head'
  import {get_stock_list} from 'src/service/getData'
  import alertTip from '../../components/common/alertTip'
  import footGuide from 'src/components/footer/footGuide'
  

  export default {
    data(){
      return {
        enable: true,
        imgPath: 'static/images/head.png',
        userId:getStore('userInfo').id,
        stockList:[],
        status:0,
        showAlert:false,
        alertText:null
      }
    },
    components: {
      headTop,
      footGuide,
      alertTip
    },
    computed: {},
    created(){
      this.getStock();
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
      getStock(){
        get_stock_list(this.userId,this.status,0,100).then((res)=>{
          if(res.code==200){
            this.stockList = res.data.info;
          }else{
            this.alertText = res.message
            this.showAlert = true
          }
        }).catch((err)=>{
          this.alertText = err.message
          this.showAlert = true
        })
      },
      editStock(id){
        this.$router.push({name:"editStock",query:{
          edit:true,
          fromPage:this.$route.name,
          id:id
        }})
      }
    },
    watch: {
      'status'(){
        this.getStock()
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
      padding:.25rem .8rem;
      margin-bottom:.1rem;
      p{
        &:nth-child(1){
          margin-bottom:.2rem;
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
