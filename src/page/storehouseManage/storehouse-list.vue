<template>
  <div class="storehouse_list main">
    <head-top signin-up='msite' goBack="" head-title="仓库管理">
      <span slot="right" class="iconfont icon-jia" @click="toAddHouse"></span>
      <div slot="back" class="goback" @click="goBack" >
          <span class="iconfont icon-fanhui title_text"></span>
      </div>
      <!-- <span slot="right" class="iconfont icon-jia" @click="addStore"></span> -->
    </head-top>
    <div class="search-goods">
      <input type="text" v-model="params" @keydown.enter="getStoreHouse" placeholder="请输入客户名称">
      <em class="list-option iconfont icon-sousuo" @click="getStoreHouse"></em>
    </div>
    <div class="cneter-con">
      <div class="storehouse-header  paddingTop">
        <div class="left_button" @click="flag=1">已启用 <span v-show="flag==1"></span></div>
        <div class="right_button"  @click="flag=0">已停用 <span v-show="flag==0"></span></div>
      </div>
      <ul class="storehouse_content" :style="{'margin-bottom':chooseWareHouse?'1rem':''}">
        <li class="supplier_info_list" v-for="list in storeHousList" @click="editHouse(list)" v-show="flag==list.status">
        <left-slider class="parentType" :index="list.warehouseId" @swipe="swipe" @swipeRight="inputIndex=-1">
            <div class="list_left">
            <h4>{{list.warehouseName}}</h4>
              <p>负责人：<span>{{list.warehouseHeadName}}</span></p>
              <p>门店：{{list.storeName}}</p>
            </div>
            <div class="list_right">
              <i class="iconfont icon-qianjin list-option" v-if="!chooseWareHouse&&inputIndex!=list.warehouseId"></i>
              <em v-if="chooseWareHouse" class="iconfont check-icon" :class="{'icon-radio-checked':chooseId==list.warehouseId,'icon-danxuanweizhong':chooseId!=list.warehouseId}" @click="chooseId=list.warehouseId;chooseName=list.warehouseName;storeId=list.storeId"></em>
              <div  :class="{'option-con-list':!chooseWareHouse&&inputIndex==list.warehouseId,'option-none':!(!chooseWareHouse&&inputIndex==list.warehouseId)}" >
                  <span @click="deleteWearhouse(list.warehouseId)">删除</span>
              </div>
            </div>
        </left-slider>
        </li>
        <p class="empty_data">没有更多了</p>
      </ul>
    </div>
    
    <div class="bottom" v-if="chooseWareHouse" @click="save">
        保存
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
  import { get_storehouse,delete_warehouse } from 'src/service/getData';
  import LeftSlider from '../../components/common/slideLeft.vue';
  import loading from 'src/components/common/loading'

  export default {
    data(){
      return {
        imgPath: 'static/images/head.png',
        storeHousList:null,
        flag:1,
        chooseWareHouse:this.$route.query.chooseWareHouse,
        fromPage:this.$route.query.fromPage,
        chooseId:-1,
        chooseName:'',
        userId:getStore('userInfo').id,
        storeId:-1,
        inputIndex:-1,
        showAlert:false,
        alertText:'',
        params:"",
        showLoading:false
      }
    },
    created(){
      this.getStoreHouse()
      if(this.chooseWareHouse){
        switch (this.fromPage) {
          case 'buyTrade':case 'buyBack':
            this.chooseId = this.buyOrder.warehouseId
            this.chooseName = this.buyOrder.warehouseName
            this.storeId = this.buyOrder.storeId
            break;
          case 'saleTrade':case 'saleBack':
            this.chooseId = this.buyOrder.warehouseId
            this.chooseName = this.buyOrder.warehouseName
            this.storeId = this.buyOrder.storeId
            break;
           case 'addStock':case 'editStock':
            this.chooseId = this.stockState.warehouseId
            this.chooseName = this.stockState.warehouseName
            this.storeId = this.stockState.storeId
            break;
        
          default:
            break;
        }
      }
    },
    mounted(){

    },
    components: {
      headTop,alertTip,LeftSlider,loading
    },
    computed: {
      ...mapState([
        "buyOrder",'stockState'
      ])
    },
    methods: {
      ...mapMutations([
        'CHANGE_HEADER','RECORD_BUYORDER','RECORD_STOCK'
      ]),
      toAddHouse(name){
        this.$router.push({name:'addEditStorehouse',query:{
          fromPage:this.fromPage,
          chooseWareHouse:this.chooseWareHouse
        }})
      },
      getStoreHouse(){
        this.showLoading = true
        get_storehouse(this.userId,this.params).then((res)=>{
          if(res.code==200){  
            this.storeHousList=res.data;
          }else{
            this.showTip(res.message)
          }
          this.showLoading = false
        }).catch((err)=>{
          this.showTip(err.message)
          this.showLoading = false
        })
      },
      swipe(id){
          this.inputIndex=id
      },
      showTip(msg){
          this.alertText = msg;
          this.showAlert = true;
      },
      editHouse(list){
        if(!this.chooseWareHouse&&this.inputIndex!=list.warehouseId){
          this.$router.push({name:'addEditStorehouse',
            query:{
              edit: true,
              storeInfo:JSON.stringify(list),
              fromPage:this.fromPage
            }
          })
        }
      },
      deleteWearhouse(id){
         this.showLoading = true
          delete_warehouse(id,2).then((res)=>{
              if(res.code==200){
                  this.getStoreHouse();
                  this.inputIndex = -1;
                  this.showTip("删除成功！")
              }else{
                  this.showTip(err.message)
              }
               this.showLoading = false
          }).catch((err)=>{
              this.showTip(err.message)
               this.showLoading = false
          })
      },
      goBack(){
        switch (this.fromPage) {
          case 'buyTrade':case 'buyBack':
            this.$router.push({
              name:this.fromPage
            });
            break;
          case 'saleTrade':case 'saleBack':
            this.$router.push({
              name:this.fromPage
            });
            break;
          case 'addStock':case 'editStock':
            this.$router.push({
              name:this.fromPage
            });
            break;
          case 'msite':
            this.$router.push({
              name:this.fromPage
            });
            break;
          default:
          this.$router.push({name:"basic"})
            break;
        }
      },
      save(){
        if(!this.chooseWareHouse){
          this.$router.push({name:'basic'})
        }else{
          switch (this.fromPage) {
            case 'buyTrade':case 'buyBack':
              this.$router.push({
                name:this.fromPage
              });
              let order = Object.assign({},this.buyOrder,{
                warehouseId:this.chooseId==-1?'':this.chooseId,
                warehouseName:this.chooseName,
                storeId:this.storeId==-1?'':this.storeId
              })

              if(this.buyOrder.warehouseId!=this.chooseId){
                order.buyGoods=[]
              }
              this.RECORD_BUYORDER(order)
              break;
            case 'saleTrade':case 'saleBack':
              this.$router.push({
                name:this.fromPage
              });
              let saleOrder = Object.assign({},this.buyOrder,{
                warehouseId:this.chooseId==-1?'':this.chooseId,
                warehouseName:this.chooseName,
                storeId:this.storeId==-1?'':this.storeId
              })

              if(this.buyOrder.warehouseId!=this.chooseId){
                saleOrder.buyGoods=[]
              }
              this.RECORD_BUYORDER(saleOrder)
              break;
            case 'addStock':case 'editStock':
              this.$router.push({
                name:this.fromPage
              });
              let stockState = Object.assign({},this.stockState,{
                warehouseId:this.chooseId==-1?'':this.chooseId,
                warehouseName:this.chooseName,
                storeId:this.storeId==-1?'':this.storeId
              })

              if(this.stockState.warehouseId!=this.chooseId){
                stockState.inventoryGoods=[]
                stockState.stockGoods=[]
              }
              this.RECORD_STOCK(stockState)
              break;
            default:
              break;
          }
        }
      }
    },
    watch: {}
  }
</script>
<style lang="scss" scoped>
  @import '../../../src/style/mixin';
  @import '../../../src/style/common';
  .storehouse_list{
    .storehouse-header{
      display: flex;
      justify-content: space-between;
      background: #fff;
      height: 0.8rem;
      padding: 0 0.5rem;
      font-size: 0.32rem;
      margin-bottom: 1px;
      div{
        position: relative;
        height: 0.8rem;
        line-height: 0.8rem;
        text-align: center;
        span{
          position: absolute;
          bottom: 0;
          left: 50%;
          margin-left: -0.15rem;
          width: 0.3rem;
          height: 0.06rem;
          background: #9FC894;
        }
      }
    }
    .storehouse_content{
      @include same_ul_style;
      li{
        height: 2.2rem;
        position: relative;
        width:100%;
        overflow: hidden;
        padding-right:0;
        .parentType{
          @include wh(100%,100%);
          
          .list_left{
            float: left;
            width:80%;
            margin-top:.5rem;
            h4{
              color: #444;
              font-size: 0.32rem;
              margin-bottom: 0.35rem;
            }
            p{
              font-size: 0.24rem;
              color: #999;
              &:nth-child(2){
                margin-bottom: 0.1rem;
              }
              span{
                color:inherit;
              }
            }
          }
          .list_right{
            float: right;
            margin-right:.3rem;
            width:auto;
            text-align: right;
            line-height:2.2rem;
            i{
              color: #999;
            }
          }
        }
      }
    }
  }
  .check-icon {
    @include sc(.4rem, $green)
  }
</style>
