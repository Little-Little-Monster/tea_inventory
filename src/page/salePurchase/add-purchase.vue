<template>
  <div class="add_purchase">
    <head-top goBack="" head-title="销售单">
      <div slot="back" class="goback" @click="returnBack" >
          <span class="iconfont icon-fanhui title_text"></span>
      </div>
    </head-top>
    <ul class="add_purchase_header paddingTop">
      <li @click="goCustomer">
        <div class="list_left" >
          客户 <i>*</i>
        </div>
        <div class="list_right">
          <span v-if="saleOrderInfo.customerId||saleOrderInfo.customerId==0">{{saleOrderInfo.customerName}}</span>
          <span v-if="!saleOrderInfo.customerId && saleOrderInfo.customerId!=0">请选择客户</span>
          <i class="iconfont icon-xiala2" style="position: relative;top: 1px;"></i>
        </div>
      </li>
      <li @click="goStore">
        <div class="list_left">
          仓库<i>*</i>
        </div>
        <div class="list_right" >
          <span v-if="saleOrderInfo.warehouseName">{{saleOrderInfo.warehouseName}}</span>
          <span v-if="!saleOrderInfo.warehouseName">请选择供仓库</span>
          <i class="iconfont icon-xiala2" style="position: relative;top: 1px;"></i>
        </div>
      </li>
     <li @click="toAccount">
        <div class="list_left">
          结算账户<i>*</i>
        </div>
        <div class="list_right">
          <span v-if="!saleOrderInfo.settleAccountId">请选择结算账户</span>
          <span v-if="saleOrderInfo.settleAccountId">{{saleOrderInfo.settleAccountName}}</span>
          <i class="iconfont icon-xiala2" style="position: relative;top: 1px;"></i>
        </div>
      </li>
    </ul>
    <ul>
      <li style="padding-right: 0.58rem" @click="goGoods">
        <div class="list_left">
          选择商品
        </div>
        <div class="list_right" v-if="saleOrderInfo.status!=2&&saleOrderInfo.status!=3">
          <i class="iconfont icon-iconjia" style="font-size: 20px;font-weight: 900"></i>
        </div>
      </li>
      <li class="good-con" v-if="saleOrderInfo.showGoodsList&&saleOrderInfo.showGoodsList.length!=0">
        <div class="good-list goods-tit">
          <span>名称</span>
          <span>单价</span>
          <span>数量</span>
          <span>总价</span>
        </div>
        <!-- <div  v-for="(buyGoods,index2) in saleOrderInfo.buyGoods">
          <div class="good-list" v-for="(list,index) in buyGoods.stockVos.length" v-if="buyGoods.stockVos[index].quantity!=0">
            <span>{{buyGoods.stockVos[index].name}}</span>
            <span>￥<input type="number" v-model="buyGoods.stockVos[index].buyAmount" @input="getTotal"></span>
            <span><input type="number" v-model="buyGoods.stockVos[index].quantity" @input="getTotal"></span>
            <span>{{Number(buyGoods.stockVos[index].buyAmount)*Number(buyGoods.stockVos[index].quantity)}}</span>
          </div>
        </div> -->

        <div  class="good-list list" v-for="(buyGoods,index) in saleOrderInfo.showGoodsList" >
          <span>{{buyGoods.goodsName}}</span>
          <span>￥<input type="number" :disabled="saleOrderInfo.status==2||saleOrderInfo.status==3" v-model="buyGoods.unitAmount" @input="getTotal"></span>
          <span><input type="number" :disabled="saleOrderInfo.status==2||saleOrderInfo.status==3" v-model="buyGoods.quantity" @input="getTotal"></span>
          <span>{{Number(buyGoods.unitAmount)*Number(buyGoods.quantity)}}</span>
          <span class="list-option iconfont icon-jian jian-goods" v-if="saleOrderInfo.status!=2&&saleOrderInfo.status!=3" @click="saleOrderInfo.showGoodsList.splice(index,1);getTotal()"></span>
        </div>
      </li>
    </ul>
    <ul>
      <li>
        <div class="list_left">
          折扣 <i>%</i>
        </div>
        <div class="list_right">
          <input type="number" placeholder="未付" :disabled="saleOrderInfo.status==2||saleOrderInfo.status==3" v-model="saleOrderInfo.discount" @input="getTotal">
        </div>
      </li>
      <li @click="goWorker" >
        <div class="list_left">
          销售员<i>*</i>
        </div>
        <div class="list_right" >
          <span v-if="saleOrderInfo.saleId">{{saleOrderInfo.saleName}}</span>
          <span v-if="!saleOrderInfo.saleId">请选择销售员</span>
          <i class="iconfont icon-xiala2" style="position: relative;top: 1px;"></i>
        </div>
      </li>
      <li>
        <div class="list_left">
          业务日期
        </div>
        <div class="list_right">
          <input type="date" placeholder="请选择日期" :disabled="saleOrderInfo.status==2||saleOrderInfo.status==3" v-model="saleOrderInfo.bizDateStr">
          <!-- <i class="iconfont icon-xiala2" style="position: relative;top: 1px;"></i> -->
        </div>
      </li>
      <li style="margin-bottom:0" @click="showPay = !showPay">
        <div class="list_left">
          支付方式
        </div>
        <div class="list_right">
          <em class="iconfont icon-xiala2"></em>
        </div>
      </li>
      <li style="margin-bottom:0" v-show="showPay">
        <div class="list_left">
          支付宝
        </div>
        <div class="list_right">
          <em class="list-option iconfont check-icon" :class="{'icon-radio-checked':saleOrderInfo.payType==0,'icon-danxuanweizhong':saleOrderInfo.payType!=0}" @click="(saleOrderInfo.status==1)?saleOrderInfo.payType=0:''"></em>
        </div>
      </li>
      <li style="margin-bottom:0" v-show="showPay">
        <div class="list_left">
          微信
        </div>
        <div class="list_right">
          <em class="list-option iconfont check-icon" :class="{'icon-radio-checked':saleOrderInfo.payType==1,'icon-danxuanweizhong':saleOrderInfo.payType!=1}" @click="(saleOrderInfo.status==1)?saleOrderInfo.payType=1:''"></em>
        </div>
      </li>
      <li style="margin-bottom:0" v-show="showPay">
        <div class="list_left">
          现金
        </div>
        <div class="list_right">
          <em class="list-option iconfont check-icon" :class="{'icon-radio-checked':saleOrderInfo.payType==2,'icon-danxuanweizhong':saleOrderInfo.payType!=2}" @click="(saleOrderInfo.status==1)?saleOrderInfo.payType=2:''"></em>
        </div>
      </li>
      <li v-show="showPay">
        <div class="list_left">
          POS
        </div>
        <div class="list_right">
          <em class="list-option iconfont check-icon" :class="{'icon-radio-checked':saleOrderInfo.payType==3,'icon-danxuanweizhong':saleOrderInfo.payType!=3}" @click="(saleOrderInfo.status==1)?saleOrderInfo.payType=3:''"></em>
        </div>
      </li>
    </ul>
    <ul class="remark">
      <li>
        <div class="list_left">
          <p>备注</p>
          <!-- <input type="text" placeholder="请输入备注信息"> -->
          <textarea :disabled="saleOrderInfo.status==2||saleOrderInfo.status==3" v-model="saleOrderInfo.memo" placeholder="请输入备注信息"></textarea>
        </div>
      </li>
    </ul>
    <div class="bottom" v-if="edit">
      <div class="bottom_left">合计：<span>￥{{saleOrderInfo.totalAmount}}</span></div>
      <div class="bottom_right" v-if="saleOrderInfo.status!=3">
        <span @click="submitOrder(1)" v-if="!saleOrderInfo.status||saleOrderInfo.status!=1" v-show="saleOrderInfo.status!=2">草稿</span> 
        <span @click="submitOrder(2)" v-if="saleOrderInfo.status==1" >采购</span> 
        <button :class="{returnGoods: false}" v-if="saleOrderInfo.status&&saleOrderInfo.status!=1" v-show="saleOrderInfo.status!=2" @click="submitOrder(2)">采购</button>
      </div>

      <div class="bottom_right" v-if="saleOrderInfo.status==2">
        <button :class="{returnGoods: false}" @click="cancel">撤销</button>
      </div>

      <div class="bottom_right" v-if="saleOrderInfo.status==1">
        <button :class="{returnGoods: false}" @click="deleteOrder">删除</button>
      </div>
    </div>
    <div class="bottom" v-if="!edit">
      <div class="bottom_left">合计：<span>￥{{saleOrderInfo.totalAmount}}</span></div>
      <div class="bottom_right" >
        <span @click="submitOrder(1)">草稿</span> 
        <button :class="{returnGoods: false}"  v-show="saleOrderInfo.status!=1" @click="submitOrder(2)">销售</button>
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
  import {save_sale_order,get_sale_order,delete_sale_order,cancel_sale_order} from 'src/service/getData'
  import footGuide from 'src/components/footer/footGuide'

  export default {
    data(){
      return {
        imgPath: 'static/images/head.png',
        enable: true,
        saleOrderInfo:{},
        showAlert:false,
        alertText:'',
        userId:getStore('userInfo').id,
        edit:this.$route.query.edit,
        fromPage:this.$route.query.fromPage,
        showPay:false,
        status:null//采购单当前状态（1为草稿，2为已销售，3为撤销）
      }
    },
    created(){
      if(this.edit){//编辑采购单
        switch (this.fromPage) {
          case 'saleHistory':
            //编辑采购单
            this.getSaleOrder()
            break;
        
          default:
            break;
        }
      }else{//添加采购单
        this.saleOrderInfo = this.buyOrder;

        if(!this.saleOrderInfo.customerId){
          this.saleOrderInfo.customerId = 0;
          this.saleOrderInfo.customerName = '匿名客户';
        }
        if(!this.saleOrderInfo.totalAmount){
          this.saleOrderInfo.totalAmount = 0;
        }
        if(!this.saleOrderInfo.realAmount){
          this.saleOrderInfo.realAmount = 0;
        }
        if(!this.saleOrderInfo.discount){
          this.saleOrderInfo.discount = 100;
        }
        if(!this.saleOrderInfo.payType){
          this.$set(this.saleOrderInfo,'payType',0);
        }
        // this.saleOrderInfo.debtAmount = 0;
        if(this.saleOrderInfo.showGoodsList&&this.saleOrderInfo.showGoodsList.length!=0){
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
    beforeRouteLeave(to,form,next){
      if(to.name=='msite'){
        this.RECORD_BUYORDER({})
      }
      next();
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
      goWorker(){
        if(!this.saleOrderInfo.status || this.saleOrderInfo.status!=2&& this.saleOrderInfo.status!=3){
          this.$router.replace({name:'worker',query:{
            workerId:this.saleOrderInfo.saleId,
            workerName:this.saleOrderInfo.saleName,
            fromPage:this.$route.name,
            getWorker:true
          }})
        }
      },
      returnBack(){
        switch (this.fromPage) {
          case 'saleHistory':
            this.toAddress({name:this.fromPage});
            break;
        
          default:
          this.toAddress({name:'msite'});
            break;
        }
        
        this.RECORD_BUYORDER({})
      },
      goCustomer(){
        //跳转到客户管理
        if(!this.saleOrderInfo.status || this.saleOrderInfo.status!=2&& this.saleOrderInfo.status!=3){
          this.$router.push({name:"customerManage",query:{
            chooseCustomer:true,
            fromPage:'saleTrade'
          }})
        }
      },
      goStore(){
        //跳转到仓库
        if(!this.saleOrderInfo.status || this.saleOrderInfo.status!=2&& this.saleOrderInfo.status!=3){
          this.$router.push({name:"storehouseList",query:{
            chooseWareHouse:true,
            fromPage:'saleTrade'
          }})
        }
      },
      goGoods(){
        if(this.saleOrderInfo.warehouseId){
          if(!this.saleOrderInfo.status || this.saleOrderInfo.status!=2&& this.saleOrderInfo.status!=3){
            this.$router.push({name:'saleChoosegoods',query:{
              fromPage:'saleTrade'
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
      getSaleOrder(){
        //编辑采购单时获取信息
        get_sale_order(this.$route.query.id).then((res)=>{
          this.saleOrderInfo = res.data;
          this.saleOrderInfo.showGoodsList = res.data.saleGoods;
          if(this.saleOrderInfo.status==1){
             this.RECORD_BUYORDER(this.saleOrderInfo)
          }
          this.status = this.saleOrderInfo.status;
        }).catch((err)=>{

        })
      },
      toAccount(){
        if(!this.saleOrderInfo.status || this.saleOrderInfo.status!=2&& this.saleOrderInfo.status!=3){
          this.$router.replace({name:"balanceAccount",query:{
            getAccount:true,
            fromPage:'saleTrade'
          }})
        }
      },
      async submitOrder(status){
        if(!this.saleOrderInfo.customerId&&this.saleOrderInfo.customerId!=0){
          this.showTip("请选择客户！");
          return;
        }
        if(!this.saleOrderInfo.warehouseId){
          this.showTip("请先选择仓库！");
          return;
        }
        if(!this.saleOrderInfo.settleAccountId){
          this.showTip("请先选择结算账户！");
          return;
        }
        if(!this.saleOrderInfo.saleId){
          this.showTip("请先选择销售员！");
          return;
        }
        if(!this.saleOrderInfo.saleGoods){
          this.showTip("请先选择商品！");
          return;
        }
        this.saleOrderInfo.type=2//销售
        // this.saleOrderInfo.type=3//销售退货
        this.saleOrderInfo.status=status//1提交，0草稿

        this.saleOrderInfo.operatorId = this.userId;
        let submitOrder = this.saleOrderInfo;
        submitOrder.saleGoods = this.saleOrderInfo.showGoodsList;
        save_sale_order(this.userId,submitOrder).then((res)=>{
          if(res.code==600){
            this.showTip(res.message);
            this.saleOrderInfo.status = this.status;
          }else{
            this.returnBack();
          }
        }).catch((err)=>{
          console.log(err);
          this.showTip(err.message);
        })
      },
      cancel(){
        //撤销已采购订单
        cancel_sale_order(this.userId,this.saleOrderInfo.id).then((res)=>{
          this.returnBack()
        }).catch((err)=>{
           this.showTip(err.message)
        })
      },
      deleteOrder(){
        //删除草稿订单
        delete_sale_order(this.saleOrderInfo.id).then((res)=>{
          this.returnBack()
        }).catch((err)=>{
          this.showTip(err.message)
        })
      },
      getTotal(){
        this.saleOrderInfo.totalAmount = 0;
        this.saleOrderInfo.realAmount = 0;
        if(this.saleOrderInfo.showGoodsList&&this.saleOrderInfo.showGoodsList.length!=0){
           this.saleOrderInfo.showGoodsList.forEach(element => {
              this.saleOrderInfo.realAmount = (this.saleOrderInfo.realAmount + Number(element.unitAmount)*Number(element.quantity));
            }
          );
          this.saleOrderInfo.realAmount = this.saleOrderInfo.realAmount.toFixed(2)
          this.saleOrderInfo.totalAmount = Number(this.saleOrderInfo.realAmount*(this.saleOrderInfo.discount/100)).toFixed(2);
        }
        // this.saleOrderInfo.debtAmount = Number(this.saleOrderInfo.totalAmount)-Number(this.saleOrderInfo.realAmount);
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
              width:20%;
            }
            &:nth-child(4){
              width:20%;
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
  }
</style>
