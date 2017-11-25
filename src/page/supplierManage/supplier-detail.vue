<template>
  <div class="supplier_detail">
    <head-top signin-up='msite' goBack="true" head-title="王供应商">
      <button slot="right" style="background: none;color: #fff;font-size: 0.28rem;margin-right: 0.36rem"
        @click="$router.push({name:'addEditUpplier',query:{id: true}})">编辑</button>
    </head-top>
    <ul class="supplier_detail_header paddingTop">
      <li>
        <div class="list_left">
          手机
        </div>
        <div class="list_right">
          15682565540
        </div>
      </li>
      <li>
        <div class="list_left">
          折扣(%)
        </div>
        <div class="list_right">
          100
        </div>
      </li>
    </ul>
    <ul>
      <li>
        <div class="list_left">
          欠供应商款
        </div>
        <div class="list_right">
          ￥0.00
          <i class="iconfont icon-qianjin"></i>
        </div>
      </li>
    </ul>
    <ul>
      <li>
        <div class="list_left">
          电话
        </div>
        <div class="list_right">
          <i class="iconfont icon-qianjin"></i>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  import { mapMutations, mapState } from 'vuex'
  import { getStore } from 'src/config/mUtils'
  import alertTip from '../../components/common/alertTip'
  import { storehandel } from 'src/service/getData'
  import headTop from 'src/components/header/head';
  import { omit } from 'lodash'

  export default {
    data(){
      return {
        store: {},
        userId: getStore('userInfo').id,
        alertText: null,
        showAlert: false
      }
    },
    created(){
      if (this.$route.query.id) {
        //编辑门店，获取门店信息
        this.store = this.$route.query;
      }
    },
    mounted(){
    },
    components: {
      headTop, alertTip
    },
    computed: {
      ...mapState([
        'headTitle'
      ])
    },
    methods: {
      ...mapMutations([]),
      toAddress(name){
        this.$router.push(name)
      }
    },
    watch: {}
  }
</script>
<style lang="scss" scoped>
  @import '../../../src/style/mixin';

  .supplier_detail {
    ul {
      margin-bottom: 0.1rem;
      @include same_ul_style;
      &.supplier_detail_header{
        li:nth-child(1){
          .list_right {
            color: #444;
          }
        }
      }
      li {
        height: 1rem;
        padding: 0 0.4rem;
        .list_right {
          font-size: 0.28rem;
          color: #bbb;
          i{
            color: #bbb;
          }
        }
      }
    }
  }
</style>
