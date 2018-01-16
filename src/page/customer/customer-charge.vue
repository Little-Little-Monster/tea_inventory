<template>
  <div class="main">
    <head-top signin-up='msite' goBack="" :head-title="'客户充值('+$route.query.name+')'">
      <div slot="back" class="goback" @click="goBack" >
        <span class="iconfont icon-fanhui title_text"></span>
      </div>
    </head-top>
    <div class="cneter-con">
      <div class="pay-list">
        <div class="pay-item" v-for="pay in payList" @click="amount=pay">
          <div :class="{'active':amount==pay}">
            {{pay}}元
          </div>
        </div>
      </div>
      <div class="other-pay">
        <span>其他金额</span>
        <input type="number" v-model="amount" placeholder="请输入充值金额">
      </div>
      <div class="store-con">
        <div class="store" @click="showStore = !showStore">
           <span>店铺</span>
          <i class="iconfont" :class="{'icon-xiala2':!showStore,'icon-shouqi':showStore}"></i>
        </div>
        <div class="store" v-for="store in storeList" v-show="showStore">
          <span>{{store.storeName+'--'+store.accountName}}</span>
          <em class="list-option iconfont check-icon" :class="{'icon-radio-checked':storeId==store.id,'icon-danxuanweizhong':storeId!=store.id}" @click.stop="storeId=store.id"></em>
        </div>
      </div>
      <div class="payway-list">
        <span class="iconfont icon-weixin"><i>微信支付</i></span>
        <em class="list-option iconfont check-icon" :class="{'icon-radio-checked':payType==0,'icon-danxuanweizhong':payType!=0}" @click.stop="payType=0"></em>
      </div>
      <div class="payway-list">
        <span class="iconfont icon-zhifubao"><i>支付宝支付</i></span>
        <em class="list-option iconfont check-icon" :class="{'icon-radio-checked':payType==1,'icon-danxuanweizhong':payType!=1}" @click.stop="payType=1"></em>
      </div>
      <div class="payway-list">
        <span class="iconfont icon-icon"><i>POS支付</i></span>
        <em class="list-option iconfont check-icon" :class="{'icon-radio-checked':payType==2,'icon-danxuanweizhong':payType!=2}" @click.stop="payType=2"></em>
      </div>
      <div class="payway-list">
        <span class="iconfont icon-cash"><i>现金支付</i></span>
        <em class="list-option iconfont check-icon" :class="{'icon-radio-checked':payType==3,'icon-danxuanweizhong':payType!=3}" @click.stop="payType=3"></em>
      </div>
    </div>
    <div class="bottom" @click="submitCharge">
            确定
    </div>
    <transition name="loading">
			<loading v-show="showLoading"></loading>
		</transition>
    <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="showAlert=false" :alertText="alertText"></alert-tip>
  </div>
</template>
<script>
  import { customer_charge,get_store_detail,get_balance_account_list } from 'src/service/getData'
  import { getStore } from 'src/config/mUtils'
  import headTop from 'src/components/header/head'
  import alertTip from '../../components/common/alertTip'
  import loading from 'src/components/common/loading'
  export default {
    data(){
      return {
        showLoading:false,
        showAlert:false,
        alertText:'',
        payList:[
          100,
          200,
          500,
          800,
          1200,
          1500,
          2000,
          3000,
          5000,
          10000,
        ],
        amount:100,
        payType:0,
        showStore:false,
        userId:getStore('userInfo').id,
        storeList:[],
        storeId:0
      }
    },
    created(){
      this.getStore();
    },
    mounted(){

    },
    watch: {},
    components: {
      headTop,
      alertTip,
      loading
    },
    computed: {
    },
    methods: {
      goBack(){
          this.$router.go(-1)
      },
      async submitCharge(){
        if(this.amount<=0){
          this.showTip("充值金额必须大于等于0")
          return;
        }
        let res = await customer_charge(this.$route.query.id,this.amount,this.payType,this.storeId,this.userId);
        if(res.code==200){
          this.goBack();
        }else{
          this.showTip(res.message);
        }
      },
      async getStore(){
        // let res = await get_store_detail(this.userId)
        let res = await get_balance_account_list(this.userId)
        if(res.code==200){
          this.storeList = [];
          res.data.vos.forEach(vos => {
            vos.list.forEach(list=>{
              list.storeName = vos.storeName
              list.storeId = vos.storeId
              this.storeList.push(list)
            })
          });
          if(this.storeList[0]){
            this.storeId = this.storeList[0].id;
          }
        }else{
          this.showTip(res.message)
        }
      },
      showTip(msg){
        this.showAlert = true;
        this.alertText = msg;
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '../../../src/style/mixin';
  .cneter-con{
    margin-bottom:1.2rem;
  }
  .pay-list{
    @include wh(100%,auto);
    background: #fff;
    display: flex;
    flex-wrap: wrap;
    space-between:center;
    padding:.2rem .2rem;
    margin-bottom: .05rem;
    .pay-item{
      width:25%;
      height: .8rem;
      text-align: center;
      font-size: .16rem;
      display: flex;
      justify-content: center;
      align-items: center;
      &>div{
        @include borderRadius(.1rem);
        border:.01rem solid $green;
        width:80%;
        height:.5rem;
        color:$green;
        line-height: .5rem;
        &.active{
          background: $green;
          color:#fff;
        }
      }
    }
  }
  .other-pay{
    @include wh(100%,1rem);
    margin-bottom: .1rem;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left:.4rem;
    font-size:.28rem;
    span{
      flex:1;
    }
    input{
      align-self: center;
      font-size:.20rem;
      flex:1;
      height:80%;
      text-align: right;
      padding-right: .4rem;
      background: #fff;
    }
  }
  .store-con{
    min-height: 1rem;
    height: 1rem;
    height:auto;
    padding:0 .4rem;
    margin-bottom: .1rem;
    background: #fff;
  }
  .store{
    @include wh(100%,1rem);
    display: flex;
    align-items: center;
    span{
      flex:9;
      font-size:.28rem;
    }
    i{
      align-items: center;
      flex:1;
      font-size:.4rem;
      text-align: right;
    }
    em{
      font-size:.4rem;
    }
  }
  .payway-list{
    padding-left:.4rem;
    height: 1rem;
    display: flex;
    align-items: center;
    background: #fff;
    em{
      align-self: center;
      flex:1;
      font-size: .4rem;
      padding-right:.2rem;
    }
    span{
      flex:9;
      font-size:.4rem;
      i{
        font-size: .28rem;
        margin-left:.4rem;
        position: relative;
        bottom: .05rem;
      }
    }
    &:nth-of-type(4){
      span{
        color:#75D860
      }
    }
    &:nth-of-type(5){
      span{
        color:#62A7CB
      }
    }
    &:nth-of-type(6){
      span{
        color:#CC9051
      }
    }
    &:nth-of-type(7){
      span{
        color:#D9525C
      }
    }
  }
</style>
