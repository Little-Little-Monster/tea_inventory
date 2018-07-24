<template>
  <div class="main">
    <head-top signin-up='msite' goBack="" :head-title="$route.query.id?'编辑盘点':'添加盘点'">
      <div slot="back" class="goback" @click="$router.push({name:'warehouseStock'})" >
        <span class="iconfont icon-fanhui title_text"></span>
      </div>
    </head-top>
    <ul class="add-edit-upplier paddingTop cneter-con">
      <li @click="getWearhouse">
        <div class="list_left">
          仓库 <i class="required" style="position:absolute;top:.4rem;left:-.2rem">*</i>
        </div>
        <div class="list_right">
          <span v-if="stockInfo.warehouseId">{{stockInfo.warehouseName}}</span>
          <span v-if="!stockInfo.warehouseId">请选择仓库</span>
          <i class="iconfont icon-qianjin" v-if="status!=2" style="position: relative;top: 1px;"></i>
        </div>
      </li>
      <li class="memo">
        <div>
          备注
        </div>
        <textarea v-model="stockInfo.memo" :readonly="status==2" placeholder="请输入备注"></textarea>
      </li>
      <li class="tip">
       盘点明细
      </li>
      <li class="goods-con" v-if="status!=2" >
        <div class="add-btn"  @click="getGoods">
          <span class="iconfont icon-jia"></span>
          添加明细
        </div>
      </li>
       <li class="good-con" v-if="stockInfo.inventoryGoods&&stockInfo.inventoryGoods.length!=0">
           <div class="goods-lists" v-for="(goods,index) in stockInfo.inventoryGoods">
            <div class="goods-left">
              <p>
                <i>商品名称：</i> 
                {{goods.goodsName}}
              </p>
              <p>
                <i>盘点单价：</i>
                <span>￥{{Number(goods.unitAmount).toFixed(2)}}</span>
              </p>
              <p>
                <i>盘点数量：</i>
                <!-- <em class="iconfont icon-icon02" @click="buyGoods.quantity = Number(buyGoods.quantity)+1"></em>  -->
                <input type="number" step="1" v-model="goods.quantity" @blur="getTotal"></span>
                <!-- <em class="iconfont icon-jian"  @click="buyGoods.quantity = Number(buyGoods.quantity)-1"></em> -->
              </p>
              <p>
                <i>库存量：</i>
                {{goods.currQuantity}}
              </p>
            </div>
            <div class="goods-right" v-if="status!=2">
              <span class="list-option iconfont icon-jian jian-goods"  @click="stockInfo.inventoryGoods.splice(index,1);getTotal()"></span>
            </div>
          </div>
        </li>
    </ul>
    <div class="bottom">
      <div class="bottom_left">总量：<span>{{stockInfo.totalQuantity}}</span></div>
      <div class="bottom_right" v-if="status!=2">
        <span @click="addStock(1)" class="model" v-if="status!=1">草稿</span> 
        <span @click="deleteStock" class="model" v-if="status==1">删除</span> 
        <button :class="{returnGoods: false}" @click="addStock(2)">盘点</button>
      </div>
    </div>
    <transition name="loading">
			<loading v-show="showLoading"></loading>
		</transition>
    <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="showAlert=false" :alertText="alertText"></alert-tip>
  </div>
</template>
<script>
  import { mapMutations,mapState } from 'vuex'
  import { getStore } from 'src/config/mUtils'
  import { stock_handel,get_stock_info,delete_stock, get_storehouse } from 'src/service/getData'
  import headTop from 'src/components/header/head'
  import footGuide from 'src/components/footer/footGuide'
  import alertTip from '../../components/common/alertTip'
  import kswitch from 'src/components/common/kswitch'
  import loading from 'src/components/common/loading'

  export default {
    data(){
      return {
        enable: true,
        imgPath: 'static/images/head.png',
        userId:getStore("userInfo").id,
        stockInfo:{},
        showAlert:false,
        alertText:null,
        status:0,
        showLoading: false,
        isback:false
      }
    },
    created(){
      if(!this.$route.query.id){
        this.stockInfo = this.stockState
        this.$set(this.stockInfo,'totalQuantity',0);
        this.getTotal();
        if(!this.stockInfo.warehouseId){
          get_storehouse(this.userId,'').then(res=>{
              if(res.data.length===1){
                this.$set(this.stockInfo,'warehouseId',res.data[0].warehouseId)
                this.$set(this.stockInfo,'warehouseName',res.data[0].warehouseName)
              }
          })
        }
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
      alertTip,
      loading
    },
    computed: {
      ...mapState([
        "stockState"
      ])
    },
    beforeRouteLeave(to,form,next){
      if(to.name=='warehouseStock'){
        this.RECORD_STOCK({})
      }
      next();
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
        this.showLoading = true
        get_stock_info(this.$route.query.id).then((res)=>{
          if(res.code==200){
            this.stockInfo = res.data;
            this.status = res.data.status;
          }else{
            this.showTip(res.message)
          }
          this.showLoading = false
        }).catch((err)=>{
          this.showTip(err.message)
          this.showLoading = false
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
          this.isback = false;
          this.stockInfo.inventoryGoods.forEach(goods => {
            if(goods.quantity==''){
              this.showTip('请输入盘点数量！')
              this.isback = true;
            }
          });
          if(this.isback){
            return;
          }
          this.showLoading = true;
          this.stockInfo.status = status;
          this.stockInfo.operatorId = this.userId;
          stock_handel(this.userId,this.stockInfo).then((res)=>{
              this.$router.push({name:"warehouseStock"})
              this.showLoading = false
          }).catch((err)=>{
              this.alertText = err.message;
              this.showAlert = true;
              this.stockInfo.status = this.status;
              this.showLoading = false
          })
      },
      deleteStock(){
        this.showLoading = true
        delete_stock(this.$route.query.id).then((res)=>{
          if(res.code==200){
            this.$router.push({name:"warehouseStock"})
          }else{
            this.showTip(res.message)
          }
          this.showLoading = false
        }).catch((err)=>{
          this.showTip(err.message)
          this.showLoading = false
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
            font-size: 0.3rem;
            color: #444;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            position: relative;
        }
        .list_right {
            font-size: 0.26rem;
            color: #ccc;
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            align-items: center;
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
      div{
        height:auto;
      }
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
    .add-btn{
      line-height: 1rem;
    }
    .good-con{
        width:100%;
        min-height:1rem;
        height: 1rem;
        height:auto;
        flex-wrap: wrap;
        padding:0;
        margin-bottom:1.1rem;
        @include sc(.24rem,$text_light);
        .goods-lists{
          display: flex;
          height:2.5rem;
          width:100%;
          padding-left:.4rem;
          border-bottom:.01rem solid $green;
          color:$text_light;
          .goods-left{
            flex:1;
            border-right:.01rem solid $bc;
            display: flex;
            flex-direction: column;
            p{
              flex:1;
              display: flex;
              align-items: center;
              color:$text_light;
              i{
                margin-right:.3rem;
                color:$text_light;
              }
              em{
                color:#E78787;
                margin:0 .2rem;
              }
              input{
                background: #fff;
                border:.01rem solid $bc;
                width:2rem;
                height: 0.4rem;
                text-align: center;
                color:$text_light;
                @include borderRadius(.4rem);
              }
            }
          }
          .goods-right{
            width:.8rem;
            display: flex;
            justify-content: center;
            align-items: center;
            .jian-goods{
              right:-.1rem;
              color:#E78787 ;
              font-size:.3rem;
            }
          }
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
        font-size: .20rem;
        padding-left: 0.3rem;
        text-align: left;
        line-height: .98rem;
        span {
          color: #D38888;;
          margin-left: 0.14rem;
          font-size: .26rem
        }
      }
      .bottom_right {
        font-size: 16px;
        color: #A8A8A8;
        button {
          float: right;
          width: 50%;
          height: 0.98rem;
          background: #9FC894;
          color: #fff;
          font-size: 16px;
          // margin-left: 0.43rem;
          &.returnGoods {
            background: #E78787;
          }
        }
        .model{
          @include wh(50%,.98rem);
          float: left;
          background: #F58095 ;
          color:#fff;
          line-height: .98rem;
        }
      }
    }
</style>
