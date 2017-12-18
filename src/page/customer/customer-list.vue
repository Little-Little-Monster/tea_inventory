<template>
  <div class="customer-list paddingTop">
    <head-top signin-up='msite' goBack="" head-title="全部分类">
      <router-link slot="right" class="iconfont icon-jia" v-if="!chooseCustomer" :to="{name:'addCustomer'}"></router-link>
      <div slot="back" class="goback" @click="goBack" >
        <span class="iconfont icon-fanhui title_text"></span>
      </div>
      <!-- <span slot="right" class="iconfont icon-jia" @click="addStore"></span> -->
    </head-top>
    <ul class="customer-content" :style="{'margin-bottom':chooseCustomer?'1rem':''}">
      <li class="supplier_info_list" v-for="list in customerList">
        <left-slider class="parentType" :index="list.id" @swipe="swipe" @swipeRight="inputIndex=-1">
          <div class="list_left">
            <h4>{{list.name}}</h4>
            <p>客户分类：{{list.customerClassName}}</p>
            <p>客户欠款：￥0.00</p>
          </div>
          <div class="list_right" >
            <i @click="$router.push({name:'addCustomer',query:{id: list.id}})" v-if="!chooseCustomer&&inputIndex!=list.id" class="iconfont icon-bianji"></i>
            <span @click="$router.push({name:'addCustomer',query:{id: list.id}})" v-if="!chooseCustomer&&inputIndex!=list.id">编辑</span>
            <em v-if="chooseCustomer" class="list-option iconfont check-icon" :class="{'icon-radio-checked':chooseId==list.id,'icon-danxuanweizhong':chooseId!=list.id}" @click.stop="chooseId=list.id;balance=list.balance;chooseName=list.name"></em>
            <div  :class="{'option-con-list':!chooseCustomer&&inputIndex==list.id,'option-none':!(!chooseCustomer&&inputIndex==list.id)}" >
                <span @click="deleteCustomer(list.id)">删除</span>
            </div>
          </div>
          
        </left-slider>
      </li>
    </ul>
    <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="showAlert=false" :alertText="alertText"></alert-tip>
    <div class="bottom" v-if="chooseCustomer" @click="save">
        保存
    </div>
  </div>
</template>
<script>
  import { mapMutations,mapState } from 'vuex'
  import { getStore } from 'src/config/mUtils'
  import headTop from 'src/components/header/head'
  import { get_customer,delete_customer } from 'src/service/getData';
  import LeftSlider from '../../components/common/slideLeft.vue';
  import alertTip from '../../components/common/alertTip'

  export default {
    data(){
      return {
        imgPath: 'static/images/head.png',
        customerList:null,
        enable:true,
        userId:getStore('userInfo').id,
        chooseCustomer:this.$route.query.chooseCustomer,
        fromPage:this.$route.query.fromPage,
        chooseId:-1,
        balance:null,
        chooseName:null,
        inputIndex:-1,
        showAlert:false,
        alertText:''
      }
    },
    created(){
      this.getCustomer()
      if(this.buyOrder.customerId||this.buyOrder.customerId==0){
        this.chooseId = this.buyOrder.customerId
        this.chooseName = this.buyOrder.customerName
        this.balance = this.buyOrder.balance
      }
    },
    mounted(){

    },
    components: {
      headTop,LeftSlider,alertTip
    },
    computed: {
      ...mapState([
        'buyOrder'
      ])
    },
    methods: {
      ...mapMutations([
        'CHANGE_HEADER'
      ]),
      toAddress(name){
        this.$router.push(name)
      },
      showTip(msg){
          this.alertText = msg;
          this.showAlert = true;
      },
      getCustomer(){
        get_customer(this.userId,'',0,1000).then((res)=>{
          this.customerList=res.data.info;
        }).catch((err)=>{

        })
      },
      goBack(){
        this.$router.replace({name:this.fromPage})
          // if(this.chooseCustomer){
          //     this.$router.replace({name:this.fromPage})
          // }else{
          //     this.$router.push({name:'msite'})
          // }
      },
      swipe(id){
        this.inputIndex = id;
      },
      save(){
        if(this.chooseCustomer){
          this.$router.push({name:this.fromPage});
          let buyorder = this.buyOrder;
          buyorder.customerId = this.chooseId;
          buyorder.customerName = this.chooseName;
          buyorder.balance = this.balance;
        }else{
          this.$router.push({name:'msite'})
        }
      },
      deleteCustomer(id){
        delete_customer(id,2).then((res)=>{
          if(res.code==200){
            this.showTip('删除成功！')
            this.getCustomer();
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
  .customer-list{
    .customer-content{
      @include same_ul_style;
      overflow: hidden;
      li{
        height: 1.8rem;
        margin-top: 0.1rem;
        padding-right:0;
        .list_left{
          float: left;
          padding-top:.3rem;
          h4{
            font-size: 16px;
            color: #444444;
            line-height: 0.45rem;
            margin-bottom: 0.1rem;
          }
          p{
            font-size: 0.24rem;
            line-height: 0.33rem;
            color: #999;
            &:nth-child(2){
              margin-bottom: 0.1rem;
            }
          }
        }
        .list_right{
          display: block;
          float: right;
          margin-right:.4rem;
          span{
            color: #999;
            font-size: 14px;
            // margin-left: 0.1rem;
            line-height: 1.8rem;
          }
          i{
            color: #999;
            font-weight: 900;
          }
        }
      }
    }
  }
  .list-option{
    @include sc(.4rem,$green)
  }
</style>
