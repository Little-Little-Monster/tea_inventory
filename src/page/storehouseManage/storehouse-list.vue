<template>
  <div class="storehouse_list">
    <head-top signin-up='msite' goBack="" head-title="仓库管理">
      <router-link v-if="!chooseWareHouse" slot="right" class="iconfont icon-jia" :to="{name:'addEditStorehouse'}"></router-link>
      <div slot="back" class="goback" @click="goBack" >
          <span class="iconfont icon-fanhui title_text"></span>
      </div>
      <!-- <span slot="right" class="iconfont icon-jia" @click="addStore"></span> -->
    </head-top>
    <div class="storehouse-header paddingTop">
      <div class="left_button">已启用 <span v-show="enable"></span></div>
      <div class="right_button">已停用 <span v-show="!enable"></span></div>
    </div>
    <ul class="storehouse_content" :style="{'margin-bottom':chooseWareHouse?'1rem':''}">
      <li class="supplier_info_list" v-for="list in storeHousList" @click="editHouse(list)">
        <div class="list_left">
         <h4>{{list.warehouseName}}</h4>
          <p>负责人：<span>{{list.warehouseHeadName}}</span></p>
          <p>门店：{{list.storeName}}</p>
        </div>
        <div class="list_right">
         <i class="iconfont icon-qianjin" v-if="!chooseWareHouse"></i>
          <em v-if="chooseWareHouse" class="iconfont check-icon" :class="{'icon-radio-checked':chooseId==list.warehouseId,'icon-danxuanweizhong':chooseId!=list.warehouseId}" @click="chooseId=list.warehouseId;chooseName=list.warehouseName;storeId=list.storeId"></em>
        </div>
      </li>
    </ul>
    <div class="bottom" v-if="chooseWareHouse" @click="save">
        保存
    </div>
  </div>
</template>
<script>
  import { mapMutations,mapState } from 'vuex'
  import { getStore } from 'src/config/mUtils'
  import headTop from 'src/components/header/head'
  import { get_storehouse } from 'src/service/getData';

  export default {
    data(){
      return {
        imgPath: 'static/images/head.png',
        storeHousList:null,
        enable:true,
        chooseWareHouse:this.$route.query.chooseWareHouse,
        fromPage:this.$route.query.fromPage,
        chooseId:-1,
        chooseName:'',
        userId:getStore('userInfo').id,
        storeId:-1
      }
    },
    created(){
      this.getStoreHouse()
      if(this.chooseWareHouse){
        switch (this.fromPage) {
          case 'buyOrder':
            this.chooseId = this.buyOrder.warehouseId
            this.chooseName = this.buyOrder.warehouseName
            this.storeId = this.buyOrder.storeId
            break;
        
          default:
            break;
        }
      }
    },
    mounted(){

    },
    components: {
      headTop,
    },
    computed: {
      ...mapState([
        "buyOrder"
      ])
    },
    methods: {
      ...mapMutations([
        'CHANGE_HEADER','RECORD_BUYORDER'
      ]),
      toAddress(name){
        this.$router.push(name)
      },
      getStoreHouse(){
        get_storehouse(this.userId).then((res)=>{
          this.storeHousList=res.data;
        }).catch((err)=>{

        })
      },
      editHouse(list){
        if(!this.chooseWareHouse){
          this.$router.push({name:'addEditStorehouse',
            query:{
              edit: true,
              storeInfo:JSON.stringify(list)
            }
          })
        }
      },
      goBack(){
          if(!this.chooseWareHouse){
          this.$router.push({name:'basic'})
        }else{
          switch (this.fromPage) {
            case 'buyOrder':
              this.$router.push({
                name:"buyTrade"
              });
              break;
            case 'saleTrade':
              this.$router.push({
                name:"saleTrade"
              });
              break;
            default:
              break;
          }
        }
      },
      save(){
        if(!this.chooseWareHouse){
          this.$router.push({name:'basic'})
        }else{
          switch (this.fromPage) {
            case 'buyOrder':
              this.$router.push({
                name:"buyTrade"
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
            case 'saleTrade':
              this.$router.push({
                name:"saleTrade"
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
  .storehouse_list{
    .storehouse-header{
      display: flex;
      justify-content: space-between;
      background: #fff;
      height: 0.8rem;
      padding: 0 1.5rem;
      font-size: 0.32rem;
      margin-bottom: 1px;
      div{
        position: relative;
        height: 0.8rem;
        line-height: 0.8rem;
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
        .list_left{
          h4{
            color: #444;
            font-size: 0.32rem;
            margin-bottom: 0.2rem;
          }
          p{
            font-size: 0.24rem;
            color: #999;
            &:nth-child(2){
              margin-bottom: 0.1rem;
            }
          }
        }
        .list_right{
          i{
            color: #999;
          }
        }
      }
    }
  }
  .check-icon {
    @include sc(.4rem, $green)
  }
</style>
