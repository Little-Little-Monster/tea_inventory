<template>
  <div>
    <head-top signin-up='msite' goBack="true" :head-title="$route.query.id?'编辑盘点':'添加盘点'">
      <!-- <span slot="right" class="iconfont icon-jia" @click="addStore"></span> -->
    </head-top>
    <ul class="add-edit-upplier paddingTop">
      <li @click="getWearhouse">
        <div class="list_left">
          仓库 <i>*</i>
        </div>
        <div class="list_right">
          <span v-if="stockInfo.warehouseId">{{stockInfo.warehouseName}}</span>
          <span v-if="!stockInfo.warehouseId">请选择仓库</span>
          <i class="iconfont icon-qianjin" v-if="status!=2" style="position: relative;top: 1px;"></i>
        </div>
      </li>
      <li class="memo">
        <div class="list_left">
          备注
        </div>
        <textarea v-model="stockInfo.memo" :readonly="status==2" placeholder="请输入备注"></textarea>
      </li>
      <li class="tip">
       盘点明细
      </li>
      <li class="goods-con" >
        <div class="add-btn" v-if="status!=2" @click="getGoods">
          <span class="iconfont icon-jia"></span>
          添加明细
        </div>
        <div class="good-list goods-tit" v-if="stockInfo.inventoryGoods&&stockInfo.inventoryGoods.length!=0">
          <span>名称</span>
          <span>盘点单价</span>
          <span>盘点量</span>
          <span>库存量</span>
        </div>
        <div class="goods-list" v-for="(goods,index) in stockInfo.inventoryGoods">
          <span>{{goods.goodsName}}</span>
          <span>{{goods.unitAmount}}</span>
          <span><input type="number"  v-model="goods.quantity" @input="getTotal"></span>
          <span>{{goods.currQuantity}}</span>
          <i class="list-option iconfont icon-jian jian-goods"  v-if="status!=2" @click="stockInfo.inventoryGoods.splice(index,1);getTotal()"></i>
        </div>
      </li>
    </ul>
    <div class="bottom">
      <div class="bottom_left">总量：<span>{{stockInfo.totalQuantity}}</span></div>
      <div class="bottom_right" v-if="status!=2">
        <span @click="addStock(1)" v-if="status!=1">草稿</span> 
        <span @click="deleteStock" v-if="status==1">删除</span> 
        <button :class="{returnGoods: false}" @click="addStock(2)">盘点</button>
      </div>
    </div>
    <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="showAlert=false" :alertText="alertText"></alert-tip>
  </div>
</template>
<script>
  import { mapMutations,mapState } from 'vuex'
  import { getStore } from 'src/config/mUtils'
  import { stock_handel,get_stock_info,delete_stock } from 'src/service/getData'
  import headTop from 'src/components/header/head'
  import footGuide from 'src/components/footer/footGuide'
  import alertTip from '../../components/common/alertTip'
  import kswitch from 'src/components/common/kswitch'

  export default {
    data(){
      return {
        enable: true,
        imgPath: 'static/images/head.png',
        userId:getStore("userInfo").id,
        stockInfo:{},
        showAlert:false,
        alertText:null,
        status:0
      }
    },
    created(){
      if(!this.$route.query.id){
        this.stockInfo = this.stockState
        this.$set(this.stockInfo,'totalQuantity',0);
        this.getTotal();
      }else{
        this.getStockInfo()
      }
    },
    mounted(){

    },
    components: {
      headTop,
      footGuide,
      kswitch,
      alertTip
    },
    computed: {
      ...mapState([
        "stockState"
      ])
    },
    methods: {
      ...mapMutations([
        'CHANGE_HEADER','RECORD_STOCK'
      ]),
      showTip(msg){
        this.showAlert = true;
        this.alertText = msg
      },
      getStockInfo(){
        //获取盘点基本信息
        get_stock_info(this.$route.query.id).then((res)=>{
          if(res.code==200){
            this.stockInfo = res.data;
            this.status = res.data.status;
          }else{
            this.showTip(res.message)
          }
        }).catch((err)=>{
          this.showTip(err.message)
        })
      },
      getWearhouse(){
        if(this.status!=2){
          this.RECORD_STOCK(this.stockInfo);
          this.$router.push({name:"storehouseList",query:{
            chooseWareHouse:true,
            fromPage:this.$route.name
          }})
        }
      },
      getGoods(){
        if(!this.stockInfo.warehouseId){
          this.showTip('请选择仓库')
        }else{
          this.RECORD_STOCK(this.stockInfo);
          this.$router.push({name:"stockGoods",query:{
            fromPage:this.$route.name
          }})
        }
      },
      getTotal(){
        this.stockInfo.totalQuantity = 0;
        if(this.stockInfo.inventoryGoods){
          this.stockInfo.inventoryGoods.forEach(element => {
            this.stockInfo.totalQuantity = this.stockInfo.totalQuantity + Number(element.quantity);
          });
        }
      },
      async addStock(status){
          if(!this.stockInfo.warehouseId){
            this.showTip('请选择仓库')
            return;
          }
          if(!this.stockInfo.inventoryGoods||this.stockInfo.inventoryGoods.length==0){
            this.showTip('请添加盘点明细')
            return;
          }
          this.stockInfo.status = status;
          this.stockInfo.operatorId = this.userId;
          stock_handel(this.userId,this.stockInfo).then((res)=>{
              this.$router.push({name:"warehouseStock"})
          }).catch((err)=>{
              this.alertText = err.message;
              this.showAlert = true;
              this.stockInfo.status = this.status;
          })
      },
      deleteStock(){
        delete_stock(this.$route.query.id).then((res)=>{
          if(res.code==200){
            this.$router.push({name:"warehouseStock"})
          }else{
            this.showTip(res.message)
          }
        }).catch((err)=>{
          this.showTip(err.message)
        })
      }
    },
    watch: {}
  }
</script>
<style lang="scss" scoped>
  @import '../../../src/style/mixin';

  .add-edit-upplier {
    @include same_ul_style;
    input{
      text-align: right;
    }
    li {
      height: 1rem;
      padding: 0 0.4rem;
      &:nth-child(1) {
        .list_right {
          color: #444;
        }
      }
      .list_left {
        font-size: 0.32rem;
        color: #666666;
        i{
          position: relative;
          top: 3px;
          color: #D29191;
        }
      }
      .list_right {
        font-size: 0.28rem;
        color: #999999;
        input{
          background: none;
          color: #999999!important;
        }
        span{
          color: #999999;
        }
      }
    }
    .memo{
      height: 2rem;
      flex-wrap: wrap;
      textarea{
        width:100%;
        height:60%;
        resize: none;
      }
    }
    .tip{
      background: inherit;
    }
    .goods-con{
      flex-direction: column;
      align-items: flex-start;
      min-height:1rem;
      height: 1rem;
      height:auto;
      .add-btn{
        width:100%;
        height: 1rem;
        line-height: 1rem;
      }
    }
    .goods-list{
      height:.8rem;
      width:100%;
      line-height:.8rem;
      padding-left:0;
      position:relative;
      overflow:visible;
      input{
        width:1rem;
        background: #fff;
        @include borderRadius(.2rem);
        border:1px solid #ccc;
        text-align: center;
        @include sc(.24rem,$text_light)
      }
      display:flex;
      span{
        flex:1;
        text-align:center;
        @include sc(.24rem,$text_light)
      }
      .jian-goods{
        position:absolute;
        right:-.1rem;
        color:#E78787 ;
        font-size:.3rem;
      }
    }
    .goods-tit{
      border-bottom:1px solid $green;
      display: flex;
      width:100%;
      span{
        flex:1;
        text-align: center;
        @include sc(.24rem,$text_light)
      }
    }
  }
  .bottom {
      height: 0.98rem;
      position: fixed;
      bottom: 0;
      background: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .bottom_left {
        font-size: 14px;
        padding-left: 0.3rem;
        span {
          color: #D38888;;
          margin-left: 0.14rem;
          font-size: 16px;
        }
      }
      .bottom_right {
        font-size: 16px;
        color: #A8A8A8;
        button {
          width: 1.6rem;
          height: 0.98rem;
          background: #9FC894;
          color: #fff;
          font-size: 16px;
          margin-left: 0.43rem;
          &.returnGoods {
            background: #E78787;
          }
        }
      }
    }
</style>
