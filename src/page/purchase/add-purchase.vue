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
          <!-- <div class="good-list goods-tit">
            <span>名称</span>
            <span>单价</span>
            <span>数量</span>
            <span>总价</span>
          </div>
          <div  class="good-list list" v-for="(buyGoods,index) in buyOrderInfo.showGoodsList" v-if="buyGoods.quantity!=0">
            <span>{{buyGoods.goodsName}}</span>
            <span>￥<input type="number" :disabled="buyOrderInfo.status==2||buyOrderInfo.status==3" v-model="buyGoods.unitAmount" @input="getTotal"></span>
            <span><input type="number" :disabled="buyOrderInfo.status==2||buyOrderInfo.status==3" v-model="buyGoods.quantity" @input="getTotal"></span>
            <span>{{(Number(buyGoods.unitAmount)*Number(buyGoods.quantity)).toFixed(2)}}</span>
            <span class="list-option iconfont icon-jian jian-goods" v-if="buyOrderInfo.status!=2&&buyOrderInfo.status!=3" @click="buyOrderInfo.showGoodsList.splice(index,1);getTotal()"></span>
          </div> -->
          <div class="goods-lists" :key="goods.goodsId" v-for="(goods,index) in buyOrderInfo.showGoodsList">
            <div class="goods-left">
              <p>
                <i>商品名称：</i> 
                {{goods.goodsName}}
              </p>
              <p>
                <i>商品单价：</i>
                <!-- <em class="iconfont icon-icon02"  @click="buyGoods.unitAmount = Number(buyGoods.unitAmount)+1"></em>  -->
                <input type="number" :disabled="buyOrderInfo.status==2||buyOrderInfo.status==3" v-model="goods.unitAmount" @input="getTotal(false)">
                <!-- <em class="iconfont icon-jian" @click="buyGoods.unitAmount = Number(buyGoods.unitAmount)-1"></em> -->
              </p>
              <p>
                <i>商品数量：</i>
                <!-- <em class="iconfont icon-icon02" @click="buyGoods.quantity = Number(buyGoods.quantity)+1"></em>  -->
                <input type="number" step="1" :disabled="buyOrderInfo.status==2||buyOrderInfo.status==3" v-model="goods.quantity" @input="getTotal(false)">
                <!-- <em class="iconfont icon-jian"  @click="buyGoods.quantity = Number(buyGoods.quantity)-1"></em> -->
              </p>
              <p>
                <i>商品总价：</i>
                ￥<input type="number" step="0.01" :disabled="buyOrderInfo.status==2||buyOrderInfo.status==3" v-model="goods.amount" @input="getTotal(true)">
              </p>
            </div>
            <div class="goods-right" v-if="buyOrderInfo.status!=2&&buyOrderInfo.status!=3">
              <span class="list-option iconfont icon-jian jian-goods" @click="buyOrderInfo.showGoodsList.splice(index,1);getTotal(true)"></span>
            </div>
          </div>
        </li>
      </ul>
      <ul>
        <li>
          <div class="list_left">
            <b>{{$route.name=='buyBack'?'供应商实付':'实付'}}</b> 
            <i class="required" style="position:absolute;top:.3rem;left:1rem" v-show="$route.name!='buyBack'" v-if="Number(buyOrderInfo.realAmount)">{{Number(buyOrderInfo.realAmount).toFixed(2)}}</i>
          </div>
          <div class="list_right">
            <input type="number" placeholder="未付" :disabled="buyOrderInfo.status==2||buyOrderInfo.status==3" v-model="buyOrderInfo.realAmount" @input="getTotal(true)">
          </div>
        </li>
        <li class="buy-tip">
          <span v-if="$route.name=='buyTrade'">*店铺未给供应商结算默认0，反之则店铺给供应商金额</span> 
          <span v-if="$route.name=='buyBack'">*供应商未给店铺结算默认0，反之则供应商给店铺金额</span> 
        </li>
        <li>
          <div class="list_left">
            业务日期
          </div>
          <div class="list_right">
            <input type="text" readonly="" id="time" name="input_date" :placeholder="buyOrderInfo.bizDateStr" v-model="buyOrderInfo.bizDateStr" />
            <i class="time-xiala iconfont icon-xiala2"></i>
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
        <div class="bottom_left" v-if="Number(buyOrderInfo.totalAmount)||Number(buyOrderInfo.totalAmount)==0">合计：<span>￥{{Number(buyOrderInfo.totalAmount).toFixed(2)}}</span></div>
        <div class="bottom_right" v-if="buyOrderInfo.status!=3">
          <span @click="submitOrder(1)" class="model" v-if="!buyOrderInfo.status||buyOrderInfo.status!=1&&fromPage!='todayAccountDetail'" v-show="buyOrderInfo.status!=2">草稿</span> 
          <span @click="submitOrder(2)" class="model" v-if="buyOrderInfo.status==1&&fromPage!='todayAccountDetail'" >{{$route.name=='buyTrade'?'采购':'退货'}}</span> 
          <button :class="{returnGoods: false}" v-if="buyOrderInfo.status&&buyOrderInfo.status!=1&&fromPage!='todayAccountDetail'" v-show="buyOrderInfo.status!=2" @click="submitOrder(2)">{{$route.name=='buyTrade'?'采购':'退货'}}</button>
        </div>

        <div class="bottom_right" v-if="buyOrderInfo.status==2||buyOrderInfo.status==1">
          <button v-if="buyOrderInfo.status==2&&fromPage!='todayAccountDetail'" :class="{returnGoods: false}" @click="cancel">撤销</button>
          <button v-if="buyOrderInfo.status==1&&fromPage!='todayAccountDetail'" :class="{returnGoods: false}" @click="deleteOrder">删除</button>
        </div>
      </div>
      <div class="bottom" v-if="!edit">
        <div class="bottom_left">合计：<span>￥{{Number(buyOrderInfo.totalAmount).toFixed(2)}}</span></div>
        <div class="bottom_right" >
          <button :class="{returnGoods: false}"  v-show="buyOrderInfo.status!=2&&fromPage!='todayAccountDetail'" @click="submitOrder(2)">{{$route.name=='buyTrade'?'采购':'退货'}}</button>
          <span @click="submitOrder(1)" v-if="fromPage!='todayAccountDetail'" class="model">草稿</span> 
        </div>
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
  import headTop from 'src/components/header/head'
  import alertTip from '../../components/common/alertTip'
  import {save_buy_order,get_buy_order,delete_buy_order,cancel_buy_order, get_supplier, get_storehouse,get_balance_account_list } from 'src/service/getData'
  import footGuide from 'src/components/footer/footGuide'
  import loading from 'src/components/common/loading'

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
        status:null,//采购单当前状态（1为草稿，2为已销售，3为撤销）
        showLoading:false
      }
    },
    created(){
      this.$set(this.buyOrderInfo,'showGoodsList',[])
      this.$set(this.buyOrderInfo,'totalAmount','0.00')
      if(this.edit){//编辑采购单
        switch (this.fromPage) {
          case 'buyHistory':
          case 'buyBackHistory':
          case 'todayAccountDetail':
            //编辑采购单
            this.getBuyOrder()
            break;
        
          default:
            break;
        }
      }else{//添加采购单
        this.buyOrderInfo = Object.assign({},this.buyOrderInfo,this.buyOrder);
        if(!this.buyOrderInfo.totalAmount){
          this.buyOrderInfo.totalAmount = 0;
        }
        if(!this.buyOrderInfo.realAmount){
          this.buyOrderInfo.realAmount = 0;
        }
        
        // this.buyOrderInfo.debtAmount = 0;
        if(!this.buyOrderInfo.bizDateStr){
          var date = new Date();
          this.buyOrderInfo.bizDateStr = this.formatDate(date)
        }
        if(this.buyOrderInfo.showGoodsList&&this.buyOrderInfo.showGoodsList.length!=0){
          this.getTotal(true);
        }
        if(!this.buyOrderInfo.settleAccountId){
          get_balance_account_list(this.userId).then(res=>{
              if(res.data.size===1&&res.data.vos[0].list.length===1){
                const account = res.data.vos[0].list[0]
                this.$set(this.buyOrderInfo,'settleAccountId',account.id)
                this.$set(this.buyOrderInfo,'settleAccountName',account.accountName)
              }
          })
        }
        if(!this.buyOrderInfo.supplierId){
          get_supplier(this.userId,"").then(res=>{
              if(res.data.length===1){
                this.$set(this.buyOrderInfo,'supplierId',res.data[0].id)
                this.$set(this.buyOrderInfo,'supplierName',res.data[0].name)
              }
          })
        }
        if(!this.buyOrderInfo.warehouseId){
          get_storehouse(this.userId,"").then(res=>{
              if(res.data.length===1){
                this.$set(this.buyOrderInfo,'warehouseId',res.data[0].warehouseId)
                this.$set(this.buyOrderInfo,'warehouseName',res.data[0].warehouseName)
              }
          })
        }
        this.RECORD_BUYORDER(this.buyOrderInfo)
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
          case 'todayAccountDetail':
            this.toAddress({name:this.fromPage,query:{id:this.$route.query.detailId}});
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
          this.$router.push({name:"balanceAccount",query:{
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
        this.showLoading = true;
        get_buy_order(this.$route.query.id).then((res)=>{
          if(res.code==200){
            this.buyOrderInfo = Object.assign({},this.buyOrderInfo,res.data);
            // res.data.buyGoods.forEach(item=>{
            //   item.totalMoney = (Number(item.unitAmount)*Number(item.quantity)).toFixed(2)
            // })
            this.$set(this.buyOrderInfo,'showGoodsList',res.data.buyGoods);
            
            if(this.buyOrderInfo.status==1){
              this.RECORD_BUYORDER(this.buyOrderInfo)
            }
            this.status = this.buyOrderInfo.status;
          }else{
            this.showTip(res.message)
          }
          this.showLoading = false;
        }).catch((err)=>{
          this.showTip(err.message)
          this.showLoading = false;
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
        this.empty = false;
        this.buyOrderInfo.showGoodsList.forEach(goods=>{
          if(goods.quantity==''||goods.quantity<=0){
            this.empty = true;
          }
        })
        if(this.empty){
          this.showTip("商品数量必须大于0！");
          return;
        }

        this.buyOrderInfo.status=status//1提交，0草稿
        this.buyOrderInfo.operatorId = this.userId;
        let submitOrder = this.buyOrderInfo;
        submitOrder.buyGoods = this.buyOrderInfo.showGoodsList;
        this.showLoading = true;
        save_buy_order(this.userId,submitOrder).then((res)=>{
          if(res.code==600){
            this.buyOrderInfo.status=this.status;
            this.showTip(res.message);
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
        this.showLoading = true;
        cancel_buy_order(this.userId,this.buyOrderInfo.id).then((res)=>{
          this.returnBack()
          this.showLoading = false;
        }).catch((err)=>{
           this.showTip(err.message)
           this.showLoading = false;
        })
      },
      deleteOrder(){
        //删除草稿订单
        this.showLoading = true;
        delete_buy_order(this.buyOrderInfo.id).then((res)=>{
          this.returnBack()
          this.showLoading = false;
        }).catch((err)=>{
          this.showTip(err.message)
          this.showLoading = false;
        })
      },
      getTotal(flag){
        let showGoodsList = JSON.parse(JSON.stringify(this.buyOrderInfo.showGoodsList));
        let totalAmount = 0
        if(showGoodsList&&showGoodsList.length!=0){
          
          showGoodsList.forEach((element,index) => {
            if(!flag){
              //计算合计总价
              element.amount=(Number(element.unitAmount)*Number(element.quantity)).toFixed(2)
            }
            totalAmount = Number(Number(totalAmount) + Number(element.amount)).toFixed(2)
          });

          this.$set(this.buyOrderInfo,'showGoodsList',showGoodsList)
          this.$set(this.buyOrderInfo,'totalAmount',totalAmount)
          // this.buyOrderInfo.showGoodsList = Object.assign({},this.buyOrderInfo.showGoodsList,showGoodsList)
          // this.buyOrderInfo = Object.assign({},this.buyOrderInfo,{totalAmount})
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
        &.buy-tip{
          background: $bc;
          height:.6rem;
          span{
            @include sc(.2rem,#F58095)
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
        height: 2rem;
        margin-bottom: 1.16rem;
        li {
          display: block;
          height: 2.8rem;
          padding-top: 0.3rem;
          background: #fff;
          .list_left {
            textarea{
              margin-top: 0.33rem;
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
      position: absolute;
      position: none;
      bottom: 0;
      background: #fff;
      .bottom_left {
        font-size: .20rem;
        padding-left: 0.3rem;
        text-align: left;
        float: left;
        width:50%;
        span {
          color: #D38888;;
          margin-left: 0.14rem;
          font-size: .26rem;
          line-height: .98rem;

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
          line-height: .98rem;
          color:#fff;
          float: right;
        }
      }
    }
  }
  .time-xiala{
    position: static;
  }
</style>
