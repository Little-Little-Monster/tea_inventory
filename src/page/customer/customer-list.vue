<template>
  <div class="customer-list paddingTop">
    <head-top signin-up='msite' goBack="" head-title="全部分类">
      <router-link slot="right" class="iconfont icon-jia" v-if="!chooseCustomer" :to="{name:'addCustomer'}"></router-link>
      <div slot="back" class="goback" @click="goBack" >
        <span class="iconfont icon-fanhui title_text"></span>
      </div>
      <!-- <span slot="right" class="iconfont icon-jia" @click="addStore"></span> -->
    </head-top>
    <ul class="customer-content">
      <li class="supplier_info_list" v-for="list in customerList">
        <div class="list_left">
          <h4>{{list.name}}</h4>
          <p>客户分类：{{list.customerClassName}}</p>
          <p>客户欠款：￥0.00</p>
        </div>
        <div class="list_right" v-if="!chooseCustomer" @click="$router.push({name:'addCustomer',query:{id: list.id}})">
          <i class="iconfont icon-bianji"></i>
          <span>编辑</span>
        </div>
        <div class="list_right" v-if="chooseCustomer" >
          <em class="list-option iconfont check-icon" :class="{'icon-radio-checked':chooseId==list.id,'icon-danxuanweizhong':chooseId!=list.id}" @click.stop="chooseId=list.id;balance=list.balance;chooseName=list.name"></em>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  import { mapMutations,mapState } from 'vuex'
  import { getStore } from 'src/config/mUtils'
  import headTop from 'src/components/header/head'
  import { get_customer } from 'src/service/getData';

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
        chooseName:null
      }
    },
    created(){
      this.getCustomer()
      if(this.buyOrder.customerId){
        this.chooseId = this.buyOrder.customerId
        this.chooseName = this.buyOrder.customerName
        this.balance = this.buyOrder.balance
      }
    },
    mounted(){

    },
    components: {
      headTop,
    },
    computed: {
      ...mapState([
        'buyOrder'
      ])
    },
    beforeRouteLeave(to,from,next){
      let buyorder = this.buyOrder;
      buyorder.customerId = this.chooseId;
      buyorder.customerName = this.chooseName;
      next()
    },
    methods: {
      ...mapMutations([
        'CHANGE_HEADER'
      ]),
      toAddress(name){
        this.$router.push(name)
      },
      getCustomer(){
        get_customer(this.userId,'',0,1000).then((res)=>{
          this.customerList=res.data.info;
        }).catch((err)=>{

        })
      },
      goBack(){
        if(this.chooseCustomer){
          this.$router.push({name:this.fromPage});
          let buyorder = this.buyOrder;
          buyorder.customerId = this.chooseId;
          buyorder.customerName = this.chooseName;
          buyorder.balance = this.balance;
        }else{
          this.$router.push({name:'msite'})
        }
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
        .list_left{
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
          span{
            color: #999;
            font-size: 14px;
            margin-left: 0.1rem;
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
