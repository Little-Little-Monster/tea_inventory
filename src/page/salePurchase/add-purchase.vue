<template>
  <div class="add_purchase main">
    <head-top goBack="" :headTitle="$route.name=='saleTrade'?'销售单':'销售回退'">
      <div slot="back" class="goback" @click="returnBack" >
          <span class="iconfont icon-fanhui title_text"></span>
      </div>
    </head-top>
    <div class="cneter-con">
      <ul class="add_purchase_header paddingTop">
        <li @click="goCustomer">
          <div class="list_left" >
            客户 <i class="required" style="position:absolute;top:.4rem;left:-.2rem">*</i>
          </div>
          <div class="list_right">
            <span v-if="saleOrderInfo.customerId||saleOrderInfo.customerId==0">{{saleOrderInfo.customerName}}</span>
            <span v-if="!saleOrderInfo.customerId && saleOrderInfo.customerId!=0">请选择客户</span>
            <i class="iconfont icon-xiala2" style="position: relative;top: 1px;"></i>
          </div>
        </li>
        <li @click="goStore">
          <div class="list_left">
            仓库<i class="required" style="position:absolute;top:.4rem;left:-.2rem">*</i>
          </div>
          <div class="list_right " >
            <span class="ellipsis" v-if="saleOrderInfo.warehouseName">{{saleOrderInfo.warehouseName}}</span>
            <span v-if="!saleOrderInfo.warehouseName">请选择供仓库</span>
            <i class="iconfont icon-xiala2" style="position: relative;top: 1px;"></i>
          </div>
        </li>
      <li @click="toAccount">
          <div class="list_left">
            结算账户<i class="required" style="position:absolute;top:.4rem;left:-.2rem">*</i>
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
           <div class="goods-lists" v-for="(buyGoods,index) in saleOrderInfo.showGoodsList">
            <div class="goods-left">
              <p>
                <i>商品名称：</i> 
                {{buyGoods.goodsName}}
              </p>
              <p>
                <i>商品单价：</i>
                <!-- <em class="iconfont icon-icon02"  @click="buyGoods.unitAmount = Number(buyGoods.unitAmount)+1"></em>  -->
                <input type="number" :disabled="saleOrderInfo.status==2||saleOrderInfo.status==3" v-model="buyGoods.unitAmount" @blur="getTotal">
                <!-- <em class="iconfont icon-jian" @click="buyGoods.unitAmount = Number(buyGoods.unitAmount)-1"></em> -->
              </p>
              <p>
                <i>商品数量：</i>
                <!-- <em class="iconfont icon-icon02" @click="buyGoods.quantity = Number(buyGoods.quantity)+1"></em>  -->
                <input type="number" step="1" :disabled="saleOrderInfo.status==2||saleOrderInfo.status==3" v-model="buyGoods.quantity" @blur="getTotal">
                <!-- <em class="iconfont icon-jian"  @click="buyGoods.quantity = Number(buyGoods.quantity)-1"></em> -->
              </p>
              <p>
                <i>商品总价：</i>
                ￥<b v-if="showList[index].saleMode==1">{{(Number(buyGoods.unitAmount)*Number(buyGoods.quantity)).toFixed(2)}}</b> 
                <b v-if="showList[index].saleMode==2">0.00</b> 
              </p>
              <p class="sale-type">
                <i>售出方式：</i>
                <em class="iconfont check-icon" :class="{'icon-radio-checked':showList[index].saleMode==1,'icon-danxuanweizhong':showList[index].saleMode==2}" @click="changeType(index,1)">正常出售</em>
                <em class="iconfont check-icon" :class="{'icon-radio-checked':showList[index].saleMode==2,'icon-danxuanweizhong':showList[index].saleMode==1}" @click="changeType(index,2)">赠品</em>
              </p>
            </div>
            <div class="goods-right" v-if="saleOrderInfo.status!=2&&saleOrderInfo.status!=3">
              <span class="list-option iconfont icon-jian jian-goods" @click="saleOrderInfo.showGoodsList.splice(index,1);getTotal()"></span>
            </div>
          </div>
        </li>
      </ul>
      <ul>
        <li>
          <div class="list_left">
            折扣 <i class="required" style="position:absolute;top:.3rem;left:.8rem">%</i>
          </div>
          <div class="list_right">
            <input type="number" placeholder="未付" :disabled="saleOrderInfo.status==2||saleOrderInfo.status==3" v-model="saleOrderInfo.discount" @input="getTotal">
          </div>
        </li>
        <li @click="goWorker" >
          <div class="list_left">
            销售员<i class="required" style="position:absolute;top:.4rem;left:-.2rem">*</i>
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
            <!-- <input type="date" placeholder="请选择日期" :disabled="saleOrderInfo.status==2||saleOrderInfo.status==3" v-model="saleOrderInfo.bizDateStr"> -->
            <input type="text" readonly="" id="time" name="input_date" :placeholder="saleOrderInfo.bizDateStr" v-model="saleOrderInfo.bizDateStr" />
            <i class="time-xiala iconfont icon-xiala2"></i>
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
            <em class="list-option iconfont check-icon" :class="{'icon-radio-checked':saleOrderInfo.payType==0,'icon-danxuanweizhong':saleOrderInfo.payType!=0}" @click="(saleOrderInfo.payType!=0)?saleOrderInfo.payType=0:''"></em>
          </div>
        </li>
        <li style="margin-bottom:0" v-show="showPay">
          <div class="list_left">
            微信
          </div>
          <div class="list_right">
            <em class="list-option iconfont check-icon" :class="{'icon-radio-checked':saleOrderInfo.payType==1,'icon-danxuanweizhong':saleOrderInfo.payType!=1}" @click="(saleOrderInfo.payType!=1)?saleOrderInfo.payType=1:''"></em>
          </div>
        </li>
        <li style="margin-bottom:0" v-show="showPay">
          <div class="list_left">
            现金
          </div>
          <div class="list_right">
            <em class="list-option iconfont check-icon" :class="{'icon-radio-checked':saleOrderInfo.payType==2,'icon-danxuanweizhong':saleOrderInfo.payType!=2}" @click="(saleOrderInfo.payType!=2)?saleOrderInfo.payType=2:''"></em>
          </div>
        </li>
        <li style="margin-bottom:0" v-show="showPay">
          <div class="list_left">
            POS
          </div>
          <div class="list_right">
            <em class="list-option iconfont check-icon" :class="{'icon-radio-checked':saleOrderInfo.payType==3,'icon-danxuanweizhong':saleOrderInfo.payType!=3}" @click="(saleOrderInfo.payType!=3)?saleOrderInfo.payType=3:''"></em>
          </div>
        </li>
        <li v-show="showPay">
          <div class="list_left">
            余额
          </div>
          <div class="list_right">
            <em class="list-option iconfont check-icon" :class="{'icon-radio-checked':saleOrderInfo.payType==4,'icon-danxuanweizhong':saleOrderInfo.payType!=4}" @click="(saleOrderInfo.payType!=4)?saleOrderInfo.payType=4:''"></em>
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
        <div class="bottom_left">合计：<span v-if="Number(saleOrderInfo.totalAmount)">￥{{Number(saleOrderInfo.totalAmount).toFixed(2)}}</span></div>
        <div class="bottom_right" v-if="saleOrderInfo.status!=3">
          <span @click="submitOrder(1)" class="model" v-if="!saleOrderInfo.status||saleOrderInfo.status!=1&&fromPage!='todayAccountDetail'" v-show="saleOrderInfo.status!=2">草稿</span> 
          <span @click="submitOrder(2)" class="model" v-if="saleOrderInfo.status==1&&fromPage!='todayAccountDetail'" >{{$route.name=='saleTrade'?'销售':'退货'}}</span> 
          <button :class="{returnGoods: false}" v-if="saleOrderInfo.status&&saleOrderInfo.status!=1&&fromPage!='todayAccountDetail'" v-show="saleOrderInfo.status!=2" @click="submitOrder(2)">{{$route.name=='saleTrade'?'销售':'退货'}}</button>
        </div>

        <div class="bottom_right" v-if="saleOrderInfo.status==2&&fromPage!='todayAccountDetail'">
          <button :class="{returnGoods: false}" @click="cancel">撤销</button>
        </div>

        <div class="bottom_right" v-if="saleOrderInfo.status==1&&fromPage!='todayAccountDetail'">
          <button :class="{returnGoods: false}" @click="deleteOrder">删除</button>
        </div>
      </div>
      <div class="bottom" v-if="!edit">
        <div class="bottom_left">合计：<span v-if="Number(saleOrderInfo.totalAmount)">￥{{Number(saleOrderInfo.totalAmount).toFixed(2)}}</span></div>
        <div class="bottom_right" >
          <button :class="{returnGoods: false}"  v-show="saleOrderInfo.status!=1&&fromPage!='todayAccountDetail'" @click="submitOrder(2)">{{$route.name=='saleTrade'?'销售':'退货'}}</button>
          <span @click="submitOrder(1)" v-if="fromPage!='todayAccountDetail'" class="model">草稿</span> 
        </div>
      </div>
    </div>
    <transition name="loading">
			<loading v-show="showLoading"></loading>
		</transition>
    
    <alert-tip v-if="showAlert" :showHide="showAlert" @cancelTip="cancelTip" @closeTip="closeTip" :isInput="showPayWay" :alertText="alertText">
      <div slot="inputVal" v-if="showPayWay" class="input-con">
          <h4 style="text-align:center;position:relative;bottom:.4rem;">选择退款方式</h4>
          <div class="pay-type-con">
            <span>支付宝</span>
            <em class="list-option iconfont check-icon" :class="{'icon-radio-checked':payType==0,'icon-danxuanweizhong':payType!=0}" @click="payType=0"></em>
          </div>
          <div class="pay-type-con">
            <span>微信</span>
            <em class="list-option iconfont check-icon" :class="{'icon-radio-checked':payType==1,'icon-danxuanweizhong':payType!=1}" @click="payType=1"></em>
          </div>
          <div class="pay-type-con">
            <span>现金</span>
            <em class="list-option iconfont check-icon" :class="{'icon-radio-checked':payType==2,'icon-danxuanweizhong':payType!=2}" @click="payType=2"></em>
          </div>
          <div class="pay-type-con">
            <span>POS</span>
            <em class="list-option iconfont check-icon" :class="{'icon-radio-checked':payType==3,'icon-danxuanweizhong':payType!=3}" @click="payType=3"></em>
          </div>
          <div class="pay-type-con">
            <span>余额</span>
            <em class="list-option iconfont check-icon" :class="{'icon-radio-checked':payType==4,'icon-danxuanweizhong':payType!=4}" @click="payType=4"></em>
          </div>
      </div>
    </alert-tip>
  </div>
</template>
<script>
  import { mapMutations,mapState } from 'vuex'
  import { getStore } from 'src/config/mUtils'
  import headTop from 'src/components/header/head'
  import alertTip from '../../components/common/alertTip'
  import {save_sale_order,get_sale_order,delete_sale_order,cancel_sale_order} from 'src/service/getData'
  import footGuide from 'src/components/footer/footGuide'
  import loading from 'src/components/common/loading'

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
        showList:[],
        status:null,//采购单当前状态（1为草稿，2为已销售，3为撤销）
        showLoading:false,
        showPayWay:false,
        payType:0
      }
    },
    created(){
      if(this.edit){//编辑采购单
        switch (this.fromPage) {
          case 'saleHistory':
          case 'saleBackHistory':
          case 'todayAccountDetail':
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
        if(!this.saleOrderInfo.bizDateStr){
          var date = new Date();
          this.$set(this.saleOrderInfo,'bizDateStr',this.formatDate(date));
        }
        // this.saleOrderInfo.debtAmount = 0;
        if(this.saleOrderInfo.showGoodsList&&this.saleOrderInfo.showGoodsList.length!=0){
          this.showList = this.saleOrderInfo.showGoodsList;
          this.getTotal();
        }
      }
    },
    mounted(){
      var calendar = new LCalendar();
      calendar.init({
        'trigger': '#time',//标签id
        'type': 'date',//date 调出日期选择 datetime 调出日期时间选择 time 调出时间选择 ym 调出年月选择
      });
    },
    components: {
      headTop,
      footGuide,
      alertTip,
      loading
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
      closeTip(){
        if(this.showPayWay){
        this.showLoading = true;
          cancel_sale_order(this.userId,this.saleOrderInfo.id,this.payType).then((res)=>{
            this.returnBack()
            this.showLoading = false;
          }).catch((err)=>{
             this.showTip(err.message)
             this.showLoading = false;
          })
        }else{
          this.showAlert = false;
        }
      },
      cancelTip(){
        this.showAlert = false;
        this.payType = 0
      },
      changeType(index,flag){
        Object.assign(this.showList[index],{},{saleMode:flag})
        this.saleOrderInfo.showGoodsList = this.showList;
      },
      returnBack(){
        switch (this.fromPage) {
          case 'saleHistory':
          case 'saleBackHistory':
            this.toAddress({name:this.fromPage});
            break;
          case 'todayAccountDetail':
            this.toAddress({name:this.fromPage,query:{id:this.$route.query.detailId}});
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
            fromPage:this.$route.name
          }})
        }
      },
      goStore(){
        //跳转到仓库
        if(!this.saleOrderInfo.status || this.saleOrderInfo.status!=2&& this.saleOrderInfo.status!=3){
          this.$router.push({name:"storehouseList",query:{
            chooseWareHouse:true,
            fromPage:this.$route.name
          }})
        }
      },
      goGoods(){
        if(this.saleOrderInfo.warehouseId){
          if(!this.saleOrderInfo.status || this.saleOrderInfo.status!=2&& this.saleOrderInfo.status!=3){
            this.$router.push({name:'saleChoosegoods',query:{
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
      getSaleOrder(){
        //编辑采购单时获取信息
        this.showLoading = true;
        get_sale_order(this.$route.query.id).then((res)=>{
          this.saleOrderInfo = res.data;
          this.saleOrderInfo.showGoodsList = res.data.saleGoods;
          if(this.saleOrderInfo.status==1){
             this.RECORD_BUYORDER(this.saleOrderInfo)
          }
          this.status = this.saleOrderInfo.status;
          this.showList = this.saleOrderInfo.saleGoods
          this.showLoading = false;
        }).catch((err)=>{
          this.showLoading = false;
          this.showTip(err.message)
        })
      },
      toAccount(){
        if(!this.saleOrderInfo.status || this.saleOrderInfo.status!=2&& this.saleOrderInfo.status!=3){
          this.$router.replace({name:"balanceAccount",query:{
            getAccount:true,
            fromPage:this.$route.name
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
        if(this.$route.name=='saleTrade'){
          this.saleOrderInfo.type=2//销售
        }else{
          this.saleOrderInfo.type=3//销售退货
        }
        this.empty = false;
        this.saleOrderInfo.showGoodsList.forEach(goods=>{
          if(goods.quantity==''){
            this.empty = true;
          }
        })

        if(this.empty){
          this.showTip("商品数量不能为空！");
          return;
        }

        this.saleOrderInfo.status=status//1提交，0草稿
        this.saleOrderInfo.operatorId = this.userId;
        let submitOrder = this.saleOrderInfo;
        submitOrder.saleGoods = this.saleOrderInfo.showGoodsList;
        submitOrder.saleGoods.forEach(goods=>{
          if(goods.saleMode==2){
            goods.amount=0;
          }
        })
        
        this.showLoading = true;
        save_sale_order(this.userId,submitOrder).then((res)=>{
          if(res.code==600){
            this.showTip(res.message);
            this.saleOrderInfo.status = this.status;
          }else{
            this.returnBack();
          }
          this.showLoading = false;
        }).catch((err)=>{
          this.showTip(err.message);
          this.showLoading = false;
        })
      },
      cancel(){
        //撤销已采购订单
        this.showPayWay = true;
        this.showAlert = true;
      },
      deleteOrder(){
        //删除草稿订单
        this.showLoading = true;
        delete_sale_order(this.saleOrderInfo.id).then((res)=>{
          this.returnBack()
          this.showLoading = false;
        }).catch((err)=>{
          this.showTip(err.message)
          this.showLoading = false;
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
        padding:0;
        @include sc(.24rem,$text_light);
        .goods-lists{
          display: flex;
          height:3rem;
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
            .sale-type{
              em{
                color:$green;
                font-size:.24rem;
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
      .bottom_left {
        font-size: .20rem;
        padding-left: 0.3rem;
        text-align: left;
        float: left;
        width:50%;
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
        width:auto;
        float: right;
        button {
          width: 1.5rem;
          height: 0.98rem;
          background: #9FC894;
          color: #fff;
          font-size: 16px;
          float: right;
          // margin-left: 0.43rem;
          &.returnGoods {
            background: #E78787;
          }
        }
        .model{
          @include wh(1.5rem,.98rem);
          display: inline-block;
          background: #F58095 ;
          color:#fff;
          line-height: .98rem;
          float: right;
        }
      }
    }
  }
  .time-xiala{
    position: static;
  }
  .pay-type-con{
    display: flex;
    padding:0 .4rem;
    @include sc(.28rem,$text);
    @include wh(100%,.6rem);
    align-items: center;
    span{
      flex:4
    }
    em{
      flex:1;
      text-align: right;
      font-size:.36rem;
    }
  }
</style>
