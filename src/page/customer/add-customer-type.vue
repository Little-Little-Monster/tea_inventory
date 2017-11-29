<template>
  <div class="add_customer_type paddingTop">
    <head-top goBack="" head-title="选择分类">
      <!-- <span slot="right" class="iconfont icon-jia" @click="addStore"></span> -->
      <span slot="back" @click="$router.push({name:'storehouseList'})">
          <span class="back iconfont icon-fanhui"></span>
      </span>
    </head-top>
    <div class="add-content">
      <ul>
        <li>
          <div class="list_left">
            名称 <i>*</i>
          </div>
          <div class="list_right">
            <input type="text" placeholder="请输入客户名称" style="width: 2.27rem;">
          </div>
        </li>
        <li class="describe">
          <div>
            描述<br>
            <input type="text">
          </div>
        </li>
      </ul>
      <ul class="add_edit_content">
        <li>
          <div class="list_left">
            启用分类价格
          </div>
          <div class="list_right">
            <kswitch :checked="enable" @click.native="enable=!enable"></kswitch>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import { mapMutations } from 'vuex'
  import { getStore } from 'src/config/mUtils'
  import headTop from 'src/components/header/head'
  import { savewirehouse } from 'src/service/getData';
  import kswitch from 'src/components/common/kswitch'
  import alertTip from '../../components/common/alertTip'

  export default {
    data(){
      return {
        imgPath: 'static/images/head.png',
        enable: true,
        showAlert: false,
        alertText: null,
        storeHouse: {}
      }
    },
    created(){
      if (this.$route.query.singleId) {
        this.$set(this.storeHouse, 'storeName', this.$route.query.singleName)
        this.$set(this.storeHouse, 'storeId', this.$route.query.singleId)
        this.$set(this.storeHouse, 'workerId', this.$route.query.workerId)
        this.$set(this.storeHouse, 'workerName', this.$route.query.workerName)
        this.$set(this.storeHouse, 'memo', this.$route.query.memo)
        this.$set(this.storeHouse, 'warehouseName', this.$route.query.warehouseName)
      }
      if (this.$route.query.workerId) {
        this.$set(this.storeHouse, 'storeName', this.$route.query.singleName)
        this.$set(this.storeHouse, 'storeId', this.$route.query.singleId)
        this.$set(this.storeHouse, 'workerId', this.$route.query.workerId)
        this.$set(this.storeHouse, 'workerName', this.$route.query.workerName);
        this.$set(this.storeHouse, 'memo', this.$route.query.memo)
        this.$set(this.storeHouse, 'warehouseName', this.$route.query.warehouseName)
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
            name: 'store',
            query: {
              getStore: true,
              single: true,
              id: this.storeHouse.storeId,
              singleName: this.storeHouse.storeName,
              workerId: this.storeHouse.workerId,
              workerName: this.storeHouse.workerName,
              warehouseName: this.storeHouse.warehouseName,
              memo: this.storeHouse.memo,
            }
          }
        )
      },
      goWorker(){
        this.$router.push(
          {
            name: 'worker',
            query: {
              getWorker: true,
              from: 'wireHouse',
              workerId: this.storeHouse.workerId,
              workerName: this.storeHouse.workerName,
              singleId: this.storeHouse.storeId,
              singleName: this.storeHouse.storeName,
              warehouseName: this.storeHouse.warehouseName,
              memo: this.storeHouse.memo,
            }
          }
        )
      },
      async saveWireHouse(){
        //保存
        if (!this.storeHouse.warehouseName) {
          this.showAlert = true;
          this.alertText = "请输入仓库名称"
        }
        this.storeHouse.warehouseHead = this.storeHouse.workerId
        savewirehouse(this.storeHouse).then((res) => {

        }).catch((err) => {

        })
      }

    },
    watch: {}
  }
</script>
<style lang="scss" scoped>
  @import '../../../src/style/mixin';

  .add_customer_type {
    .add-content{
      overflow: hidden;
      ul {
        @include same_ul_style;
        margin-top: 0.1rem;
        li {
          height: 1rem;
          padding: 0 0.4rem;
          input {
            text-align: right;
          }
          .list_left {
            font-size: 16px;
            color: #666666;
            i {
              position: relative;
              top: 3px;
              color: #D29191;
            }
          }
          .list_right {
            font-size: 14px;
            color: #999999;
            input {
              background: none;
              color: #999999 !important;
              font-size: 14px;
            }
            span {
              color: #999999;
              font-size: 14px;
            }
          }
          &.describe{
            width: 100%;
            height: 1.78rem;
            display: block;
            padding-top: 0.33rem;
            div{
              font-size: 16px;
              color: #666666;
              width: 100%;

            }
            input{
              background: none;
              width: 100%;
              text-align: left;
            }
          }
        }

      }
    }
  }

  .back {
    font-size: 14px;
    color: #fff;
    margin-left: .3rem;
  }
</style>
