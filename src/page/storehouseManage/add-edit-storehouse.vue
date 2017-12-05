<template>
  <div class="add_edit_storehouse">
    <head-top goBack="" :head-title="$route.query.edit?'编辑仓库':'新增仓库'">
      <!-- <span slot="right" class="iconfont icon-jia" @click="addStore"></span> -->
      <span  slot="back" @click="$router.push({name:'storehouseList'})">
          <span class="back iconfont icon-fanhui"></span>
      </span>
    </head-top>
    <ul class="add_edit_header paddingTop">
      <li>
        <div class="list_left">
          名称 <i>*</i>
        </div>
        <div class="list_right">
          <input type="text" v-model="storeHouse.warehouseName" placeholder="请输入仓库名称" style="width: 1.99rem;">
        </div>
      </li>
      <li @click="goWorker">
        <div class="list_left">
          负责人
        </div>
        <div class="list_right">
          <span v-if="!storeHouse.workerId">选择负责人</span>
          <span v-else="!storeHouse.workerId">{{storeHouse.workerName}}</span>
          <i class="iconfont icon-xiala2" style="position: relative;top: 1px;"></i>
        </div>
      </li>
      <li>
        <div class="list_left">
          启用
        </div>
        <div class="list_right">
          <kswitch :checked="Boolean(storeHouse.status)" @click.native="storeHouse.status==0?storeHouse.status=1:storeHouse.status=0"></kswitch>
        </div>
      </li>
    </ul>
    <ul class="add_edit_content">
      <li @click="goStore">
        <div class="list_left">
          门店
        </div>
        <div class="list_right">
          <span v-if="!storeHouse.storeId">选择门店</span>
          <span v-else="!storeHouse.storeId">{{storeHouse.storeName}}</span>
          <i class="iconfont icon-xiala2" style="position: relative;top: 1px;"></i>
        </div>
      </li>
      <li>
        <div class="list_left">
          <p>备注</p>
          <input type="text" v-model="storeHouse.memo" placeholder="请输入备注信息">
        </div>
      </li>
    </ul>
    <div class="bottom" @click="saveWireHouse">
      保存
    </div>
    <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="showAlert=false" :alertText="alertText"></alert-tip>
  </div>
</template>
<script>
  import { mapMutations } from 'vuex'
  import { getStore } from 'src/config/mUtils'
  import headTop from 'src/components/header/head'  
  import { save_wirehouse } from 'src/service/getData';
  import kswitch from 'src/components/common/kswitch'
  import alertTip from '../../components/common/alertTip'

  export default {
    data(){
      return {
        imgPath: 'static/images/head.png',
        enable: true,
        showAlert:false,
        alertText:null,
        storeHouse:{}
      }
    },
    created(){
      this.$set(this.storeHouse,'status',1);
      if(this.$route.query.singleId){
        this.$set(this.storeHouse,'storeName',this.$route.query.singleName)
        this.$set(this.storeHouse,'storeId',this.$route.query.singleId)
        this.$set(this.storeHouse,'workerId',this.$route.query.workerId)
        this.$set(this.storeHouse,'workerName',this.$route.query.workerName)
        this.$set(this.storeHouse,'memo',this.$route.query.memo)
        this.$set(this.storeHouse,'status',this.$route.query.status)
        this.$set(this.storeHouse,'warehouseName',this.$route.query.warehouseName)
      }
      if(this.$route.query.workerId){
        
        this.$set(this.storeHouse,'storeName',this.$route.query.singleName)
        this.$set(this.storeHouse,'storeId',this.$route.query.singleId)
        this.$set(this.storeHouse,'workerId',this.$route.query.workerId)
        this.$set(this.storeHouse,'workerName',this.$route.query.workerName);
        this.$set(this.storeHouse,'memo',this.$route.query.memo)
        this.$set(this.storeHouse,'warehouseName',this.$route.query.warehouseName)
        this.$set(this.storeHouse,'status',this.$route.query.status)
      }
      if(this.$route.query.edit){
        //编辑门店
        this.storeHouse = JSON.parse(this.$route.query.storeInfo);
        this.storeHouse.workerId = this.storeHouse.warehouseHead
        this.storeHouse.workerName = this.storeHouse.warehouseHeadName
      }
    },
    mounted(){

    },
    components: {
      headTop,
      kswitch,
      alertTip
    },
    computed: {},
    methods: {
      ...mapMutations([
        'CHANGE_HEADER'
      ]),
      toAddress(name){
        this.$router.push(name)
      },
      goStore(){
        this.$router.push(
          {
            name:'store',
            query:{
              getStore:true,
              single:true,
              id:this.storeHouse.storeId,
              singleName:this.storeHouse.storeName,
              workerId:this.storeHouse.workerId,
              workerName:this.storeHouse.workerName,
              warehouseName:this.storeHouse.warehouseName,
              memo:this.storeHouse.memo,
              status:this.storeHouse.status,
              edit:this.$route.query.edit
            }
          }
        )
      },
      goWorker(){
        this.$router.push(
          {
            name:'worker',
            query:{
              getWorker:true,
              from:'wireHouse',
              workerId:this.storeHouse.workerId,
              workerName:this.storeHouse.workerName,
              singleId:this.storeHouse.storeId,
              singleName:this.storeHouse.storeName,
              warehouseName:this.storeHouse.warehouseName,
              memo:this.storeHouse.memo,
              status:this.storeHouse.status,
              edit:this.$route.query.edit
            }
          }
        )
      },
      async saveWireHouse(){
        //保存
        if(!this.storeHouse.warehouseName){
          this.showAlert = true;
          this.alertText="请输入仓库名称"
        }
        this.storeHouse.warehouseHead = this.storeHouse.workerId
        save_wirehouse(this.storeHouse).then((res)=>{
          this.$router.push({name:"storehouseList"})
        }).catch((err)=>{
          this.showAlert = true;
          this.alertText=err.message
        })
      }

    },
    watch: {}
  }
</script>
<style lang="scss" scoped>
  @import '../../../src/style/mixin';

  .add_edit_storehouse {
    ul {
      @include same_ul_style;
      margin-bottom: 2px;
      li {
        height: 1rem;
        padding: 0 0.4rem;
        input{
          text-align: right;
        }
        .list_left {
          font-size: 0.32rem;
          color: #666666;
          i {
            position: relative;
            top: 3px;
            color: #D29191;
          }
        }
        .list_right {
          font-size: 0.28rem;
          color: #999999;
          input {
            background: none;
            color: #999999 !important;
            font-size: 0.28rem;
          }
          span {
            color: #999999;
            font-size: 0.28rem;
          }
        }
      }
      &.add_edit_content {
        li:nth-child(2) {
          height: 1.88rem;
          .list_left {
            width: 100%;
            p {
              margin-bottom: 0.1rem;
            }
            input {
              background: none;
              width: 100%;
              font-size: 0.28rem;
            }
          }
        }
      }
    }
  }
  .back{
        font-size:.28rem;
        color:#fff;
        margin-left:.3rem;
    }
</style>
