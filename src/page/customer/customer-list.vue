<template>
  <div class="customer-list main paddingTop">
    <head-top signin-up='msite' goBack="" head-title="客户管理">
      <router-link slot="right" class="iconfont icon-jia" :to="{name:'addCustomer',query:{fromPage:$route.query.fromPage,chooseCustomer:$route.query.chooseCustomer}}"></router-link>
      <div slot="back" class="goback" @click="goBack" >
        <span class="iconfont icon-fanhui title_text"></span>
      </div>
      <!-- <span slot="right" class="iconfont icon-jia" @click="addStore"></span> -->
    </head-top>
    <div class="search-goods">
      <input type="text" v-model="params" placeholder="请输入客户名称" @keydown.enter="getCustomer">
      <em class="list-option iconfont icon-sousuo" @click="getCustomer"></em>
    </div>
    <ul class="customer-content cneter-con" v-load-more="loaderMore" type="2" :style="{'margin-bottom':chooseCustomer?'1rem':''}">
      <div style="auto">
        <li class="supplier_info_list" v-for="list in customerList">
          <left-slider :index="list.id" @swipe="swipe" @swipeRight="inputIndex=-1">
            <div class="list_left">
              <h4>{{list.name}}</h4>
              <p>客户分类：{{list.customerClassName}}</p>
              <p>
                客户余额：￥{{list.balance.toFixed(2)}}
                <span class="charge-btn iconfont icon-3" @click="$router.push({name:'customerCharge',query:{id: list.id,name:list.name}})">充值</span>
              </p>
            </div>
            <div class="list_right" >
              <i @click="$router.push({name:'addCustomer',query:{id: list.id}})" v-if="!chooseCustomer&&inputIndex!=list.id" class="iconfont icon-bianji"></i>
              <span @click="$router.push({name:'addCustomer',query:{id: list.id}})" v-if="!chooseCustomer&&inputIndex!=list.id">编辑</span>
              <em v-if="chooseCustomer" class="list-option iconfont check-icon" :class="{'icon-radio-checked':chooseId==list.id,'icon-danxuanweizhong':chooseId!=list.id}" @click.stop="chooseId=list.id;balance=list.balance;chooseName=list.name"></em>
              <div :class="{'option-con-list':!chooseCustomer&&inputIndex==list.id,'option-none':!(!chooseCustomer&&inputIndex==list.id)}" >
                  <span @click="deleteCustomer(list.id)">删除</span>
              </div>
            </div>
          </left-slider>
        </li>
        <p v-if="touchend" class="empty_data">没有更多了</p>
      </div>
    </ul>
     <transition name="loading">
			<loading v-show="showLoading"></loading>
		</transition>
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
  import {loadMore} from 'src/components/common/mixin'
  import loading from 'src/components/common/loading'

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
        alertText:'',
        page:0,
        pageSize:10,
        params:'',
        preventRepeatReuqest: false, //到达底部加载数据，防止重复加载
			  showBackStatus: false, //显示返回顶部按钮
			  showLoading: true, //显示加载动画
			  touchend: false, //没有更多数据
      }
    },
    created(){
      this.getCustomer();
      if(this.buyOrder.customerId||this.buyOrder.customerId==0){
        this.chooseId = this.buyOrder.customerId
        this.chooseName = this.buyOrder.customerName
        this.balance = this.buyOrder.balance
      }
    },
    mounted(){

    },
    mixins: [loadMore],
    components: {
      headTop,LeftSlider,alertTip,loading
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
        this.showLoading = true;
        get_customer(this.userId,this.params,this.page,this.pageSize).then((res)=>{
          if(res.code==200){
            this.customerList=res.data.info;
            if (res.data.info.length < this.pageSize) {
                this.touchend = true;
            }
            this.showLoading = false
          }else{
            this.showTip(res.message)
          }
        }).catch((err)=>{
          this.showTip(err.message)
        })
      },
      //到达底部加载更多数据
      async loaderMore(){
        if (this.touchend) {
          return
        }
        //防止重复请求
        if (this.preventRepeatReuqest) {
          return 
        }
        this.showLoading = true;
        this.preventRepeatReuqest = true;
        //数据的定位加20位
        this.page++;
        let res = await get_customer(this.userId,'',this.page,this.pageSize)
        this.showLoading = false;
        this.preventRepeatReuqest = false;
        if (res.data.info.length < this.pageSize) {
          this.touchend = true;
        }
        this.customerList = [...this.customerList,...res.data.info]
      },
      goBack(){
        // this.$router.replace({name:this.fromPage})
          if(this.fromPage){
              this.$router.replace({name:this.fromPage})
          }else{
              this.$router.push({name:'msite'})
          }
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
  @import '../../../src/style/common';
  .customer-list{
    .customer-content{
      @include same_ul_style;
      width:100%;
      overflow-y: auto;
      overflow-x: hidden;
      li{
        height: 1.8rem;
        margin-top: 0.1rem;
        padding-right:0;
        .list_left{
          float: left;
          padding-top:.3rem;
          float: left;
          width:80%;
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
          .charge-btn{
            display: inline-block;
            width:1rem;
            position: relative;
            top:.02rem;
            bottom:.05rem;
            margin-left:.3rem;
            height:.3rem;
            line-height: .3rem;
            text-align: center;
            font-size:.28rem;
            color:$green;
          }
        }
        .list_right{
          display: block;
          float: right;
          // margin-right:.4rem;
          width:20%;
          text-align: center;;
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
    @include sc(.4rem,$green);
    line-height:1.8rem;
  }
</style>
