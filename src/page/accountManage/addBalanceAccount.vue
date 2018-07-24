<template>
  <div class="main">
    <head-top signin-up='msite' goBack="" :head-title="$route.query.id?'编辑结算账户':'新增结算账户'">
      <div slot="back" class="goback" @click="goBack" >
        <span class="iconfont icon-fanhui title_text"></span>
      </div>
      <div slot="right" v-if="$route.query.id"   @click="deleteBalance" >
        <span class="delete">删除</span>
      </div>
    </head-top>
    <ul class="add-edit-upplier cneter-con paddingTop" :class="{'marginBottom0':!isFocus}">
      <!-- <li>
        <div class="list_left">
          名称 <i class="required" style="position:absolute;top:.4rem;left:-.2rem">*</i>
        </div>
        <div class="list_right">
          <input type="text" @focus="isFocus=false"  @blur="isFocus=true" v-model="accountInfo.accountName" placeholder="请输入账户名称" style="width: 2.27rem;">
        </div>
      </li>
      <li>
        <div class="list_left">
          账号<i class="required" style="position:absolute;top:.4rem;left:-.2rem">*</i>
        </div>
        <div class="list_right">
          <input type="text"  @focus="isFocus=false"  @blur="isFocus=true" v-model="accountInfo.account" placeholder="请输入账户" style="width: 2.27rem;">
        </div>
      </li>
      <li>
        <div class="list_left">
          开户人<i class="required" style="position:absolute;top:.4rem;left:-.2rem">*</i>
        </div>
        <div class="list_right">
          <input type="text"  @focus="isFocus=false"  @blur="isFocus=true" v-model="accountInfo.accountHolder" placeholder="请输入开户人" style="width: 1.99rem;">
        </div>
      </li> -->
      <li @click="toStore" style="margin:.1rem 0;">
        <div class="list_left">
          门店<i class="required" style="position:absolute;top:.4rem;left:-.2rem">*</i>
        </div>
        <div class="list_right">
            <span v-if="accountInfo.storeId||accountInfo.storeId==0">{{accountInfo.storeName}}</span>
            <span v-if="!accountInfo.storeId && accountInfo.storeId!=0">请选择门店</span>
            <i class="iconfont icon-xiala2" style="position: relative;top: 1px;"></i>
        </div>
      </li>
     <li @click="showPay = !showPay" :style="{'margin':showPay?'0':'.1rem 0'}">
        <div class="list_left">
          账户类型
        </div>
        <div class="list_right">
          <em class="iconfont icon-xiala2"></em>
        </div>
      </li>
      <li style="margin-bottom:0" v-show="showPay">
        <div class="list_left">
          现金
        </div>
        <div class="list_right">
          <em class="list-option iconfont check-icon" :class="{'icon-radio-checked':accountInfo.type==0,'icon-danxuanweizhong':accountInfo.type!=0}" @click="accountInfo.type=0"></em>
        </div>
      </li>
      <li style="margin-bottom:0" v-show="showPay">
        <div class="list_left">
          银行账户
        </div>
        <div class="list_right">
          <em class="list-option iconfont check-icon" :class="{'icon-radio-checked':accountInfo.type==1,'icon-danxuanweizhong':accountInfo.type!=1}" @click="accountInfo.type=1"></em>
        </div>
      </li>
      <li style="margin-bottom:0" v-show="showPay">
        <div class="list_left">
          支付宝
        </div>
        <div class="list_right">
          <em class="list-option iconfont check-icon" :class="{'icon-radio-checked':accountInfo.type==2,'icon-danxuanweizhong':accountInfo.type!=2}" @click="accountInfo.type=2"></em>
        </div>
      </li>
      <li style="margin-bottom:0" v-show="showPay">
        <div class="list_left">
          微信
        </div>
        <div class="list_right">
          <em class="list-option iconfont check-icon" :class="{'icon-radio-checked':accountInfo.type==3,'icon-danxuanweizhong':accountInfo.type!=3}" @click="accountInfo.type=3"></em>
        </div>
      </li>
      <li v-show="showPay">
        <div class="list_left">
          其他
        </div>
        <div class="list_right">
          <em class="list-option iconfont check-icon" :class="{'icon-radio-checked':accountInfo.type==4,'icon-danxuanweizhong':accountInfo.type!=4}" @click="accountInfo.type=4"></em>
        </div>
      </li>
      <!-- <li style="margin:.1rem 0;">
        <div class="list_left">
           启用
        </div>
        <div class="list_right">
          <kswitch :checked="enable" @click.native="enable=!enable"></kswitch>
        </div>
      </li> -->
      <li class="remark">
        <div class="list_left">
          <p>备注</p>
          <!-- <input type="text" placeholder="请输入备注信息"> -->
          <textarea  @focus="isFocus=false"  @blur="isFocus=true" v-model="accountInfo.memo" placeholder="请输入备注信息"></textarea>
        </div>
      </li>
    </ul>
    <div class="bottom" @click="addAccount">
            保存
    </div>
     <transition name="loading">
			<loading v-show="showLoading"></loading>
		</transition>
    <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="showAlert=false" :alertText="alertText"></alert-tip>
  </div>
</template>
<script>
  import { mapState,mapMutations } from 'vuex'
  import { getStore } from 'src/config/mUtils'
  import { balance_account_handel,get_balance_account_detail,balance_account_delete,get_store_detail } from 'src/service/getData'
  import headTop from 'src/components/header/head'
  import alertTip from '../../components/common/alertTip'
  import kswitch from 'src/components/common/kswitch'
  import loading from 'src/components/common/loading'

  export default {
    data(){
      return {
        enable: true,
        showPay:false,
        accountInfo:{},
        userId:getStore("userInfo").id,
        accountInfo:{},
        alertText:'',
        showAlert:false,
        isFocus:true,
        showLoading:false
      }
    },
    created(){
      this.accountInfo = this.customer;
      if(!this.accountInfo.type){
        this.$set(this.accountInfo,'type',0);
      }
      if(this.$route.query.id){
        this.getAccount()
      }else{
        if(!this.accountInfo.storeId){
          get_store_detail(this.userId).then(res=>{
              // if(res.data.length===1){
                this.$set(this.accountInfo,'storeId',res.data[0].id)
                this.$set(this.accountInfo,'storeName',res.data[0].storeName)
              // }
          })
        }
      }
    },
    mounted(){

    },
    beforeRouteLeave(to, from, next){
        if(to.name!='store'){
            this.RECORD_CUSTOMER({}) 
        }
        next();
    },
    components: {
      headTop,
      kswitch,
      alertTip,
      loading
    },
    computed: {
        ...mapState([
            'customer'
        ])
    },
    methods: {
      ...mapMutations([
        'CHANGE_HEADER','RECORD_CUSTOMER'
      ]),
      goBack(){
          this.RECORD_CUSTOMER({});
          this.$router.replace({name:'balanceAccount',query:{
            'fromPage':this.$route.query.fromPage,
            'getAccount':this.$route.query.getAccount
          }});
      },
      toStore(){
          this.RECORD_CUSTOMER(this.accountInfo);
          this.$router.replace({name:'store',query:{
            single:true,
            fromPage:this.$route.name,
            fromPage2:this.$route.query.fromPage,
            getStore:true,
            getAccount:this.$route.query.getAccount
          }});
      },
      getAccount(){
          this.showLoading = true;
          get_balance_account_detail(this.$route.query.id).then((res)=>{
              this.accountInfo = res.data;
              this.accountInfo.status?this.enable=1:this.enable=0;
              this.showLoading = false;
          }).catch((err)=>{
              this.alertText = err.message;
              this.showAlert = true;
              this.showLoading = false;
          })
      },
      deleteBalance(){
        this.showLoading = true;
        balance_account_delete(this.$route.query.id).then((res)=>{
          if(res.code==200){
           this.goBack()
          }else{
            this.alertText = res.message;
            this.showAlert = true;
          }
          this.showLoading = false;
        }).catch((err)=>{
          this.alertText = err.message;
          this.showAlert = true;
          this.showLoading = false;
        })
      },
      async addAccount(){
            // if(!this.accountInfo.accountName){
            //   this.alertText = "请输入账户名称";
            //   this.showAlert = true;
            //   return;
            // }
            // if(!this.accountInfo.account){
            //   this.alertText = "请输入账号";
            //   this.showAlert = true;
            //   return;
            // }
            // if(!this.accountInfo.accountHolder){
            //   this.alertText = "请输入开户人";
            //   this.showAlert = true;
            //   return;
            // }
            if(!this.accountInfo.storeId){
              this.alertText = "请选择门店";
              this.showAlert = true;
              return;
            }
            this.showLoading = true;
            this.enable?this.accountInfo.status=1:this.accountInfo.status=0;
            balance_account_handel(this.accountInfo).then((res)=>{
              if(res.code!=200){
                this.alertText = res.message;
                this.showAlert = true;
              }else{
                this.$router.replace({name:'balanceAccount',query:{
                  'fromPage':this.$route.query.fromPage,
                  'getAccount':this.$route.query.getAccount
                }});
                this.RECORD_CUSTOMER({})
              }
              this.showLoading = false;
            }).catch((err)=>{
                this.alertText = err.message;
                this.showAlert = true;
                this.showLoading = false;
            })
        }
    },
  }
</script>
<style lang="scss" scoped>
  @import '../../../src/style/mixin';
  .right{
    .delete{
      @include sc(.28rem,#444)
    }
  }
  .add-edit-upplier {
    @include same_ul_style;
    margin-bottom: 1rem;
    input{
      text-align: right;
    }
    .remark {
      height: 2.8rem;
      // margin-bottom: 1.16rem;
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
    .check-icon{
      font-size:.4rem;
    }
    li {
      height: 1rem;
      padding: 0 0.4rem;
      &:nth-child(1) {
        .list_right {
          color: #999;
        }
      };
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
        .sex-con i{
            color:$green;
        }
        span{
            color:#999;
        }
      }
    }
  }
  .bottom{
      background: $green;
      text-align: center;
      line-height:.8rem;
      color:#fff;
  }
</style>
