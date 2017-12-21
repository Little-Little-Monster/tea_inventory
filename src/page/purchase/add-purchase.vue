<template>
  <div class="add_purchase main">
    <head-top goBack="" :headTitle="$route.name=='buyTrade'?'采购单':'采购退货单'">
      <div slot="back" class="goback" @click="returnBack" >
          <span class="iconfont icon-fanhui title_text"></span>
      </div>
    </head-top>
    <div class="cneter-con">
      <ul class="add_purchase_header paddingTop">
        <li @click="goSupplier">
          <div class="list_left" >
            供应商 <i class="required" style="position:absolute;top:.4rem;left:-.2rem">*</i>
          </div>
          <div class="list_right">
            <span v-if="buyOrderInfo.supplierName">{{buyOrderInfo.supplierName}}</span>
            <span v-if="!buyOrderInfo.supplierName">请选择供应商</span>
            <i class="iconfont icon-xiala2" style="position: relative;top: 1px;"></i>
          </div>
        </li>
        <li @click="goStore">
          <div class="list_left ">
            仓库<i class="required" style="position:absolute;top:.4rem;left:-.2rem">*</i>
          </div>
          <div class="list_right" >
            <span v-if="buyOrderInfo.warehouseName">{{buyOrderInfo.warehouseName}}</span>
            <span class="ellipsis" v-if="!buyOrderInfo.warehouseName">请选择供仓库</span>
            <i class="iconfont icon-xiala2" style="position: relative;top: 1px;"></i>
          </div>
        </li>
        <li @click="toAccount">
          <div class="list_left">
            结算账户<i class="required" style="position:absolute;top:.4rem;left:-.2rem">*</i>
          </div>
          <div class="list_right">
            <span v-if="!buyOrderInfo.settleAccountId">请选择结算账户</span>
            <span v-if="buyOrderInfo.settleAccountId">{{buyOrderInfo.settleAccountName}}</span>
            <i class="iconfont icon-xiala2" style="position: relative;top: 1px;"></i>
          </div>
        </li>
      </ul>
      <ul>
        <li style="padding-right: 0.58rem" @click="goGoods">
          <div class="list_left">
            选择商品
          </div>
          <div class="list_right" v-if="buyOrderInfo.status!=2&&buyOrderInfo.status!=3">
            <i class="iconfont icon-iconjia" style="font-size: 20px;font-weight: 900"></i>
          </div>
        </li>
        <li class="good-con" v-if="buyOrderInfo.showGoodsList&&buyOrderInfo.showGoodsList.length!=0">
          <div class="good-list goods-tit">
            <span>名称</span>
            <span>单价</span>
            <span>数量</span>
            <span>总价</span>
          </div>
          <!-- <div  v-for="(buyGoods,index2) in buyOrderInfo.buyGoods">
            <div class="good-list" v-for="(list,index) in buyGoods.stockVos.length" v-if="buyGoods.stockVos[index].quantity!=0">
              <span>{{buyGoods.stockVos[index].name}}</span>
              <span>￥<input type="number" v-model="buyGoods.stockVos[index].buyAmount" @input="getTotal"></span>
              <span><input type="number" v-model="buyGoods.stockVos[index].quantity" @input="getTotal"></span>
              <span>{{Number(buyGoods.stockVos[index].buyAmount)*Number(buyGoods.stockVos[index].quantity)}}</span>
            </div>
          </div> -->

          <div  class="good-list list" v-for="(buyGoods,index) in buyOrderInfo.showGoodsList" v-if="buyGoods.quantity!=0">
            <span>{{buyGoods.goodsName}}</span>
            <span>￥<input type="number" :disabled="buyOrderInfo.status==2||buyOrderInfo.status==3" v-model="buyGoods.unitAmount" @input="getTotal"></span>
            <span><input type="number" :disabled="buyOrderInfo.status==2||buyOrderInfo.status==3" v-model="buyGoods.quantity" @input="getTotal"></span>
            <span>{{(Number(buyGoods.unitAmount)*Number(buyGoods.quantity)).toFixed(2)}}</span>
            <span class="list-option iconfont icon-jian jian-goods" v-if="buyOrderInfo.status!=2&&buyOrderInfo.status!=3" @click="buyOrderInfo.showGoodsList.splice(index,1);getTotal()"></span>
          </div>
        </li>
      </ul>
      <ul>
        <li>
          <div class="list_left">
            实付 <i class="required" style="position:absolute;top:.3rem;left:1rem">{{buyOrderInfo.realAmount.toFixed(2)}}</i>
          </div>
          <div class="list_right">
            <input type="number" placeholder="未付" :disabled="buyOrderInfo.status==2||buyOrderInfo.status==3" v-model="buyOrderInfo.realAmount" @input="getTotal">
          </div>
        </li>
        <!-- <li>
          <div class="list_left">
            欠供应商款
          </div>
          <div class="list_right" style="color: #E78787">
            ￥{{buyOrderInfo.debtAmount}}
          </div>
        </li> -->
        <li>
          <div class="list_left">
            业务日期
          </div>
          <div class="list_right">
            <input type="date" placeholder="请选择日期" :disabled="buyOrderInfo.status==2||buyOrderInfo.status==3" v-model="buyOrderInfo.bizDateStr">
            <!-- <i class="iconfont icon-xiala2" style="position: relative;top: 1px;"></i> -->
          </div>
        </li>
      </ul>
      <ul class="remark">
        <li>
          <div class="list_left">
            <p>备注</p>
            <!-- <input type="text" placeholder="请输入备注信息"> -->
            <textarea :disabled="buyOrderInfo.status==2||buyOrderInfo.status==3" v-model="buyOrderInfo.memo" placeholder="请输入备注信息"></textarea>
          </div>
        </li>
      </ul>
      <div class="bottom" v-if="edit">
        <div class="bottom_left">合计：<span>￥{{buyOrderInfo.totalAmount.toFixed(2)}}</span></div>
        <div class="bottom_right" v-if="buyOrderInfo.status!=3">
          <span @click="submitOrder(1)" class="model" v-if="!buyOrderInfo.status||buyOrderInfo.status!=1" v-show="buyOrderInfo.status!=2">草稿</span> 
          <span @click="submitOrder(2)" v-if="buyOrderInfo.status==1" >采购</span> 
          <button :class="{returnGoods: false}" v-if="buyOrderInfo.status&&buyOrderInfo.status!=1" v-show="buyOrderInfo.status!=2" @click="submitOrder(2)">采购</button>
        </div>

        <div class="bottom_right" v-if="buyOrderInfo.status==2||buyOrderInfo.status==1">
          <button v-if="buyOrderInfo.status==2" :class="{returnGoods: false}" @click="cancel">撤销</button>
          <button v-if="buyOrderInfo.status==1" :class="{returnGoods: false}" @click="deleteOrder">删除</button>
        </div>

        <!-- <div class="bottom_right" v-if="buyOrderInfo.status==1">
          
        </div> -->
      </div>
      <div class="bottom" v-if="!edit">
        <div class="bottom_left">合计：<span>￥{{buyOrderInfo.totalAmount.toFixed(2)}}</span></div>
        <div class="bottom_right" >
          <span @click="submitOrder(1)" class="model">草稿</span> 
          <button :class="{returnGoods: false}"  v-show="buyOrderInfo.status!=2" @click="submitOrder(2)">采购</button>
        </div>
      </div>
    </div>
    <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="showAlert=false" :alertText="alertText"></alert-tip>
  </div>
</template>
<script>
  import { mapMutations,mapState } from 'vuex'
  import { getStore } from 'src/config/mUtils'
  import headTop from 'src/components/header/head'
  import alertTip from '../../components/common/alertTip'
  import {save_buy_order,get_buy_order,delete_buy_order,cancel_buy_order} from 'src/service/getData'
  import footGuide from 'src/components/footer/footGuide'

  export default {
    data(){
      return {
        imgPath: 'static/images/head.png',
        enable: true,
        buyOrderInfo:{},
        showAlert:false,
        alertText:'',
        userId:getStore('userInfo').id,
        edit:this.$route.query.edit,
        fromPage:this.$route.query.fromPage,
        status:null//采购单当前状态（1为草稿，2为已销售，3为撤销）
      }
    },
    created(){
      if(this.edit){//编辑采购单
        switch (this.fromPage) {
          case 'buyHistory':
          case 'buyBackHistory':
            //编辑采购单
            this.getBuyOrder()
            break;
        
          default:
            break;
        }
      }else{//添加采购单
        this.buyOrderInfo = this.buyOrder;
        if(!this.buyOrderInfo.totalAmount){
          this.buyOrderInfo.totalAmount = 0;
        }
        if(!this.buyOrderInfo.realAmount){
          this.buyOrderInfo.realAmount = 0;
        }
        // this.buyOrderInfo.debtAmount = 0;
        if(this.buyOrderInfo.showGoodsList&&this.buyOrderInfo.showGoodsList.length!=0){
          this.getTotal();
        }
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
        'buyOrder'
      ])
    },
    methods: {
      ...mapMutations([
        'CHANGE_HEADER','RECORD_BUYORDER'
      ]),
      toAddress(name){
        this.$router.push(name)
      },
      returnBack(){
        switch (this.fromPage) {
          case 'buyHistory':
          case 'buyBackHistory':
            this.toAddress({name:this.fromPage});
            break;
        
          default:
          this.toAddress({name:'msite'});
            break;
        }
        
        this.RECORD_BUYORDER({})
      },
      goSupplier(){
        //跳转到供应商
        if(!this.buyOrderInfo.status || this.buyOrderInfo.status!=2&& this.buyOrderInfo.status!=3){
          this.$router.push({name:"supplierList",query:{
            chooseSupplier:true,
            fromPage:this.$route.name
          }})
        }
      },
      goStore(){
        //跳转到仓库
        if(!this.buyOrderInfo.status || this.buyOrderInfo.status!=2&& this.buyOrderInfo.status!=3){
          this.$router.push({name:"storehouseList",query:{
            chooseWareHouse:true,
            fromPage:this.$route.name
          }})
        }
      },
      toAccount(){
        if(!this.buyOrderInfo.status || this.buyOrderInfo.status!=2&& this.buyOrderInfo.status!=3){
          this.$router.replace({name:"balanceAccount",query:{
            getAccount:true,
            fromPage:this.$route.name
          }})
        }
      },
      goGoods(){
        if(this.buyOrderInfo.warehouseId){
          if(!this.buyOrderInfo.status || this.buyOrderInfo.status!=2&& this.buyOrderInfo.status!=3){
            this.$router.push({name:'choosegoods',query:{
              fromPage:this.$route.name
            }})
          }
        }else{
          this.showTip('请先选择仓库！')
        }
      },
      showTip(msg){
        this.showAlert = true;
        this.alertText = msg
      },
      getBuyOrder(){
        //编辑采购单时获取信息
        get_buy_order(this.$route.query.id).then((res)=>{
          this.buyOrderInfo = res.data;
          this.buyOrderInfo.showGoodsList = res.data.buyGoods;
          if(this.buyOrderInfo.status==1){
             this.RECORD_BUYORDER(this.buyOrderInfo)
          }
          this.status = this.buyOrderInfo.status;
        }).catch((err)=>{

        })
      },
      async submitOrder(status){
        if(!this.buyOrderInfo.supplierId){
          this.showTip("请选择供应商！");
          return;
        }
        if(!this.buyOrderInfo.warehouseId){
          this.showTip("请先选择仓库！");
          return;
        }
        if(!this.buyOrderInfo.settleAccountId){
          this.showTip("请先选择结算账户！");
          return;
        }
        if(!this.buyOrderInfo.buyGoods){
          this.showTip("请先选择商品！");
          return;
        }
        if(this.$route.name=='buyTrade'){
          this.buyOrderInfo.type=4//采购
        }else{
          this.buyOrderInfo.type=5//采购回退
        }
        this.buyOrderInfo.status=status//1提交，0草稿
        this.buyOrderInfo.operatorId = this.userId;
        let submitOrder = this.buyOrderInfo;
        submitOrder.buyGoods = this.buyOrderInfo.showGoodsList;
        save_buy_order(this.userId,submitOrder).then((res)=>{
          if(res.code==600){
            this.buyOrderInfo.status=this.status;
            this.showTip(res.message);
          }else{
            this.returnBack();
          }
        }).catch((err)=>{
          this.showTip(err.message);
        })
      },
      cancel(){
        //撤销已采购订单
        cancel_buy_order(this.userId,this.buyOrderInfo.id).then((res)=>{
          this.returnBack()
        }).catch((err)=>{
           this.showTip(err.message)
        })
      },
      deleteOrder(){
        //删除草稿订单
        delete_buy_order(this.buyOrderInfo.id).then((res)=>{
          this.returnBack()
        }).catch((err)=>{
          this.showTip(err.message)
        })
      },
      getTotal(){
        this.buyOrderInfo.totalAmount = 0;
        if(this.buyOrderInfo.showGoodsList&&this.buyOrderInfo.showGoodsList.length!=0){
           this.buyOrderInfo.showGoodsList.forEach(element => {
              this.buyOrderInfo.totalAmount = this.buyOrderInfo.totalAmount + Number(element.unitAmount)*Number(element.quantity)
            }
          );
        }
        // this.buyOrderInfo.debtAmount = Number(this.buyOrderInfo.totalAmount)-Number(this.buyOrderInfo.realAmount);
      }
    },
    watch: {}
  }
</script>
<style lang="scss" scoped>
  @import '../../../src/style/mixin';

  .add_purchase {
    ul {
      @include same_ul_style;
      margin-bottom: 0.1rem;
      li {
        height: 1rem;
        padding: 0 0.4rem;
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
          font-size: 16px;
          color: #666666;
          i {
            color: #E78787;
          }
        }
        .list_right {
          font-size: 14px;
          color: #A1A1A1;
          span {
            color: #A1A1A1;
            font-size: 14px;
          }
          i {
            color: #A1A1A1;
          }
          input{
            background: #fff;
            text-align: right;
          }
          .check-icon{
            font-size:.4rem;
          }
        }
      }
      .good-con{
        width:100%;
        min-height:1rem;
        height: 1rem;
        height:auto;
        flex-wrap: wrap;
        @include sc(.24rem,$text_light)
        &>div{
          width:100%;
          min-height:0;
        }
        .good-list{
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
          span{
            &:nth-child(1){
              width:20%;
            }
            &:nth-child(2){
              width:30%;
            }
            &:nth-child(3){
              width:12%;
              input{
                width:100%;
              }
            }
            &:nth-child(4){
              width:28%;
            }
            text-align: center;
            display: inline-block;
            height:100%;
            line-height:.8rem;
            @include sc(.24rem,$text_light)
          }
          .jian-goods{
            right:-.1rem;
            color:#E78787 ;
            font-size:.3rem;
          }
        }
        .goods-tit{
          border-bottom:1px solid $green;
        }
      }
      &.remark {
        height: 2.8rem;
        margin-bottom: 1.16rem;
        li {
          display: block;
          height: 2.8rem;
          padding-top: 0.3rem;
          background: #fff;
          .list_left {
            textarea{
              margin-top: 0.63rem;
              width: 100%;
              height:1rem;
              resize: none;
              background: none;
            }
          }
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
        span {
          color: #D38888;;
          margin-left: 0.14rem;
          font-size: .26rem
        }
      }
      .bottom_right {
        font-size: 16px;
        color: #A8A8A8;
        width:auto;
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
        }
      }
    }
  }
</style>
