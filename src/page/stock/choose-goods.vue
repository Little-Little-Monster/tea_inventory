<template>
  <div class="choose_goods main">
    <head-top signin-up='msite' goBack="" head-title="选择商品">
      <div slot="back" class="goback" @click="toAddress({name:fromPage})" >
          <span class="iconfont icon-fanhui title_text"></span>
      </div>
      <!-- <span slot="right" class="iconfont icon-jia" @click="toAddGoods" ></span> -->
    </head-top>
     <div class="search-goods">
      <input type="text" v-model="params" @keydown.enter="getGoodsList" placeholder="请输入商品名称">
      <em class="list-option iconfont icon-sousuo" @click="getGoodsList"></em>
    </div>
    <div class="goods_classify paddingTop">
      <div class="goods_classify_button">
        <ul v-for="(goodstype,index) in goodsList">
          <li :class="{'active':typeShow==index}" @click="typeShow=index">{{goodstype.goodsClassficationName}}</li>
        </ul>
      </div>
      <div class="goods_classify_list cneter-con ">
        <ul v-if="goodsList.length!=0">
          <li v-for="goods in goodsList[typeShow].stockVos">
            <div class="goods_pic">
              <img :src="goods.attachmentUrl" alt="">
            </div>
            <div class="goods_info">
              <h3>{{goods.name}}</h3>
              <p>采购价：<span class="price">￥{{goods.buyAmount}}/{{goods.goodsUnitName}}</span></p>
              <p>库存：{{goods.stockTotal}}</p>
              <p>
                <span class="iconfont icon-jian" @click="goods.quantity>0?goods.quantity--:''"></span>
                <span>
                  <input type="number" min="0" v-model="goods.quantity" class="quantity">
                </span>
                <span class="iconfont icon-icon02" @click="goods.quantity++"></span>
              </p>
            </div>
          </li>
        </ul>
        
        <div class="nothing" v-if="goodsList.length==0">
          <i class="iconfont icon-icon02"></i>
          <p>暂无商品，请前往添加</p>
        </div>
      </div>
    </div>
    <alert-tip v-if="showAlert" :showHide="showAlert" @cancelTip="cancelTip" @closeTip="closeTip" :isInput="true" :alertText="alertText">
      <div slot="inputVal" class="input-con">
        <h4>请输入<br>批量盘点数量</h4>
        <input type="number" v-model="allTotal">
      </div>
    </alert-tip>
    <div class="bottom">
      <span @click="isInput = true;showTip()" >批量盘点</span>
      <span @click="saveGoods(1)">单个盘点</span>
    </div>
  </div>
</template>
<script>
  import { mapMutations,mapState } from 'vuex'
  import { getStore } from 'src/config/mUtils'
  import alertTip from '../../components/common/alertTip'
  import {get_goods_type,get_warehouse_goods_list} from 'src/service/getData'
  import headTop from 'src/components/header/head'
  import footGuide from 'src/components/footer/footGuide'

  export default {
    data(){
      return {
        enable: true,
        typeList:[],
        imgPath: 'static/images/head.png',
        userId:getStore('userInfo').id,
        typeShow:0,
        goodsList:[],
        showAlert:false,
        alertText:'',
        fromPage:this.$route.query.fromPage,
        allTotal:1,
        isInput:false,
        params:""
      }
    },
    created(){
      if(this.stockState.stockGoods && this.stockState.stockGoods.length!=0){
        this.goodsList = this.stockState.stockGoods;
      }else if(this.stockState.warehouseId){
        this.getGoodsList();
      }else{
        this.toAddress({name:this.$route.query.fromPage})
      }
    },
    mounted(){

    },
    components: {
      headTop,
      footGuide,
      alertTip
    },
    computed: {
      ...mapState([
        'stockState'
      ])
    },
    methods: {
      ...mapMutations([
        'CHANGE_HEADER','RECORD_BUYORDER','RECORD_STOCK'
      ]),
      toAddress(name){
        this.$router.push(name)
      },
      showTip(msg){
        this.showAlert = true;
        this.alertText = msg
      },
      getGoodsList(){
        get_warehouse_goods_list(this.params,this.userId,0,this.stockState.warehouseId,0,1000).then((res)=>{
          this.goodsList = res.data;
          this.goodsList.forEach(element => {
            element.stockVos.forEach(el=>{
              this.$set(el,'quantity',0);
            })
          });
          let stockInfo = this.stockState;
          stockInfo.stockGoods = this.goodsList;
          this.RECORD_STOCK(stockInfo);
        }).catch((err)=>{
          this.showTip(err.message)
        })
      },
      saveGoods(flag){
        // if(flag==0){
        //   this.isInput = true;
        // }else{
        //   this.isInput = false;
        //   this.pushData();
        // }
        let stockGoods = []
        let isEmpty = true;
        this.goodsList.forEach(element => {
          element.stockVos.forEach(goods => {
            if(flag==0){
              //批量盘点
              if(isEmpty && goods.stockTotal>0){
                isEmpty = false
              }
              if(goods.stockTotal>0){
                stockGoods.push({
                  goodsId:goods.goodsId,
                  goodsName:goods.name,
                  quantity:this.allTotal,
                  unitAmount:goods.buyAmount,
                  currQuantity:goods.stockTotal,
                })
              }
            }else if(flag==1){
              //单个盘点
              let isEmpty = true;
              if(goods.quantity!=0){
                stockGoods.push({
                  goodsId:goods.goodsId,
                  goodsName:goods.name,
                  quantity:goods.quantity,
                  unitAmount:goods.buyAmount,
                  currQuantity:goods.stockTotal,
                })
              }
            }
          });
        });
        let orderInfo = this.stockState;
        orderInfo.inventoryGoods = stockGoods;
        if(isEmpty&&flag==0){
          this.showTip("当前仓库暂无库存，无法批量盘点！")
        }else{
          this.$router.push({name:this.fromPage})
          this.RECORD_STOCK(orderInfo);
        }
      },
      closeTip(){
        if(this.isInput){
          this.showAlert = false;
          this.saveGoods(0);
        }
      },
      cancelTip(){
        this.showAlert = false;
        this.allTotal = 1;
      },
      pushData(){
        
      },
    },
    watch: {}
  }
</script>
<style lang="scss" scoped>
  @import '../../../src/style/mixin';
  @import '../../../src/style/common';
  .choose_goods {
    .goods_classify {
      display: flex;
      justify-content: space-between;
      margin-bottom: .99rem;
      .goods_classify_button {
        width: 1.8rem;
        ul{
          li {
            height: 1.2rem;
            line-height: 1.2rem;
            border: 1px solid #ddd;
            text-align: center;
            font-size: 12px;
            &.active {
              background: #fff;
              border-left: 4px solid #9FC894;
              border-bottom: none;
              border-right:0;
              color:$green
            }
          }
        }
      }
      .goods_classify_list {
        width: 5.7rem;
        ul{
          li {
            height: 2.4rem;
            background: #fff;
            margin-bottom: 1px;
            padding: 0.5rem 0 0.2rem 0.33rem;
            display: flex;
            justify-content: flex-start;
            .goods_pic {
              width: 1.4rem;
              height: 1.4rem;
              background: #D8D8D8;
              img{
                width:100%;
                height:100%;
              }
            }
            .goods_info {
              color: #999;
              flex:1;
              font-size: 12px;
              padding-left: 0.3rem;
              h3 {
                font-size: 16px;
                color: #97D4BF ;
                line-height: 0.45rem;
                margin-bottom: 0.2rem;
              }
              p:nth-child(4){
                display: flex;
                align-items: center;
                justify-content: center;
                height:.6rem;
                .price {
                  color: #E78787;
                  flex:2
                }
                .iconfont{
                  color:$green;
                  flex:1;
                  text-align: center;
                }
              }
              .quantity{
                background: #ffffff;
                border:1px solid #ccc;
                @include borderRadius(.4rem);
                text-align: center;
                width:1rem;
                height:.4rem;
                line-height:.6rem;
                // margin:.1rem .2rem;
              }
            }
          }
        }
        .nothing{
          text-align: center;
          margin-top: 1.4rem;
          p{
            font-size: 14px;
            color: #999999;
            margin-top: 0.39rem;
          }
          i{
            font-size: 60px;
            color: #9FC894;
          }

        }
      }
    }
  }
  .bottom{
    display:flex;
    span{
      flex:1;
      color:#fff;
      &:nth-child(1){
        border-right:1px solid #fff;
      }
    }
  }
  .input-con{
    @include wh(100%,2rem);
    display: flex;
    flex-direction: column;
    align-items: center;
    h4{
      @include sc(.3rem,#E78787);
      text-align: center;
      line-height:.5rem;
      margin-bottom:.2rem;
    }
    input{
      border:1px solid #999;
      border-radius: .08rem;
      background: #fff;
      text-align: center;
      height:.6rem;
    }
  }
</style>
