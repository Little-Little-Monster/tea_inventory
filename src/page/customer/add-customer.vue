<template>
  <div>
    <head-top signin-up='msite' goBack="" :head-title="$route.query.id?'编辑客户':'新增客户'">
      <div slot="back" class="goback" @click="goBack" >
        <span class="iconfont icon-fanhui title_text"></span>
      </div>
    </head-top>
    <ul class="add-edit-upplier paddingTop">
      <li>
        <div class="list_left">
          名称 <i>*</i>
        </div>
        <div class="list_right">
          <input type="text" v-model="customerInfo.name" placeholder="请输入客户名称" style="width: 2.27rem;">
        </div>
      </li>
      <li>
        <div class="list_left">
          联系人<i>*</i>
        </div>
        <div class="list_right">
          <input type="text" v-model="customerInfo.contacts" placeholder="请输入客户联系人" style="width: 2.27rem;">
        </div>
      </li>
      <li>
        <div class="list_left">
          手机<i>*</i>
        </div>
        <div class="list_right">
          <input type="number" v-model="customerInfo.mobile" placeholder="请输入手机号码" style="width: 1.99rem;">
        </div>
      </li>
      <li @click="toType">
        <div class="list_left">
          分类<i>*</i>
        </div>
        <div class="list_right">
            <span v-if="customerInfo.customerClassId||customerInfo.customerClassId==0">{{customerInfo.customerClassName}}</span>
            <span v-if="!customerInfo.customerClassId && customerInfo.customerClassId!=0">请选择分类</span>
            <i class="iconfont icon-xiala2" style="position: relative;top: 1px;"></i>
        </div>
      </li>
      <li>
        <div class="list_left">
           启用
        </div>
        <div class="list_right">
          <kswitch :checked="enable" @click.native="enable=!enable"></kswitch>
        </div>
      </li>
      <li v-if="!$route.query.id">
        <div class="list_left">
           余额
        </div>
        <div class="list_right">
          <input type="number" step="0.01" v-model="customerInfo.balance" placeholder="请输入账户初始金额" style="width: 2.42rem;">
        </div>
      </li>
      <!-- <li>
        <div class="list_left">
          折扣(%)
        </div>
        <div class="list_right">
          <input type="number" step="0.01" v-model="customerInfo.discount" placeholder="请输入折扣" style="width: 1.42rem;">
        </div>
      </li> -->
      <li>
        <div class="list_left">
          性别
        </div>
        <div class="list_right">
            <em class='list-option sex-con'>
                <i class="iconfont " :class="{'icon-radio-checked':sex==1,'icon-danxuanweizhong':sex==0}" @click="sex=1">男</i>
                <i class="iconfont " :class="{'icon-radio-checked':sex==0,'icon-danxuanweizhong':sex==1}" @click="sex=0">女</i>
            </em>
        </div>
      </li>
      <li>
        <div class="list_left">
          生日
        </div>
        <div class="list_right">
          <input type="date" placeholder="请选择生日"  v-model="customerInfo.birthdayStr">
          <!-- <i class="iconfont icon-xiala2" style="position: relative;top: 1px;"></i> -->
        </div>
      </li>
      <li class="address-con">
        <div style="position:relative;height:1rem;">
            <div class="list_left">
            地址
            </div>
            <div class="list_right address">
                <address-picker :opts="optHosehold" v-model="household"></address-picker>
            </div>
        </div>
        <div class="add-detail">
            <div class="list_left" style="width:2rem">
            详细地址
            </div>
            <div class="list_right" style="float:right;right:0.4rem;height:1rem">
                <input type="text" v-model="customerInfo.address" placeholder="请输入详细地址" style="width: 3.27rem;margin-top:.3rem">
            </div>
        </div>
      </li>
      
      
    </ul>
    <div class="bottom" @click="addCustomer">
            保存
    </div>
    <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="showAlert=false" :alertText="alertText"></alert-tip>
  </div>
</template>
<script>
  import { mapState,mapMutations } from 'vuex'
  import { getStore } from 'src/config/mUtils'
  import { customer_handel,get_customer_detail } from 'src/service/getData'
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
        customerInfo:{},
        showAlert:false,
        sex:1,
        household:{province: '请选择',city:'请选择',district:'请选择'},
        optHosehold:{default:{province: '',city:'',district:''},noLabel: true,noDistrict:false},
      }
    },
    created(){
        if(this.customer.length!=0){
            this.customerInfo = this.customer
        }
        if(this.$route.query.id){
            this.getCustomer()
        }
    },
    mounted(){

    },
    beforeRouteLeave(to, from, next){
        if(to.name!='customerType'){
            this.RECORD_CUSTOMER({}) 
        }
        next();
    },
    components: {
      headTop,
      footGuide,
      kswitch,
      alertTip
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
      toAddress(name){
        this.$router.push(name)
      },
      goBack(){
          this.RECORD_CUSTOMER({});
          this.$router.replace({name:'customerManage'});
      },
      toType(){
          this.RECORD_CUSTOMER(this.customerInfo);
          this.$router.replace({name:'customerType'});
      },
      getCustomer(){
          get_customer_detail(this.$route.query.id).then((res)=>{
              this.customerInfo = res.data;
          }).catch((err)=>{
              this.alertText = err.message;
              this.showAlert = true;
          })
      },
      async addCustomer(){
            if(!this.customerInfo.name){
              this.alertText = "请输入客户名称";
              this.showAlert = true;
              return;
            }
            if(!this.customerInfo.contacts){
              this.alertText = "请输入联系人";
              this.showAlert = true;
              return;
            }
            let reg = new RegExp(/^((13|14|15|17|18|10)[0-9]{1}\d{8})$/);
            if(!reg.test(this.customerInfo.mobile)){
              this.alertText = "请输入11位手机号码";
              this.showAlert = true;
              return;
            }
            if(!this.customerInfo.customerClassId){
              this.alertText = "请选择分类";
              this.showAlert = true;
              return;
            }
            this.enable?this.customerInfo.status=1:this.customerInfo.status=0;
            this.customerInfo.province =  this.household.province
            this.customerInfo.city =  this.household.city
            this.customerInfo.district =  this.household.district
            customer_handel(this.userId,this.customerInfo).then((res)=>{
                this.$router.push({name:"customerManage"});
                this.RECORD_CUSTOMER({})
            }).catch((err)=>{
                this.alertText = err.message;
                this.showAlert = true;
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
    margin-bottom: 1.5rem;
    input{
      text-align: right;
    }
    .address-con{
       height:2rem; 
       display: block;
       .list_left{
           width:15%;
           float: left;
           line-height:1rem;
       }
       .list-right{
           width:90%;
           float: left;
       }
    }
    li {
      height: 1rem;
      padding: 0 0.4rem;
      &:nth-child(1) {
        .list_right {
          color: #999;
        }
      };
    position: relative;
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
      .address{
        min-width:50%;
        width:auto;
        height:40%;
        @include ct;
        right:0;
      }
      .add-detail{
          height: 1rem;
          width:100%;
          float: left;
      }
    }
  }
  .bottom{
      background: $green;
      text-align: center;
      line-height:1rem;
      color:#fff;
  }
</style>
