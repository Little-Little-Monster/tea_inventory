<template>
  <div class="supplier_detail">
    <head-top signin-up='msite' goBack="true" :headTitle="userInfo.name">
      <button slot="right" style="background: none;color: #444;font-size: 0.24rem;margin-right: 0.46rem;width:.8rem"
        @click="$router.push({name:'addEditUpplier',query:userInfo})">编辑</button>
    </head-top>
    <ul class="supplier_detail_header paddingTop">
      <li>
        <div class="list_left">
          名称
        </div>
        <div class="list_right">
          {{userInfo.name}}
        </div>
      </li>
      <li>
        <div class="list_left">
          折扣(%)
        </div>
        <div class="list_right">
          {{userInfo.discount}}
        </div>
      </li>
    </ul>
    <ul>
      <li>
        <div class="list_left">
          欠供应商款
        </div>
        <div class="list_right">
          ￥{{userInfo.balance}}
        </div>
      </li>
    </ul>
    <ul>
      <li>
        <div class="list_left">
          电话
        </div>
        <div class="list_right">
         {{userInfo.mobile}}
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  import { mapMutations, mapState } from 'vuex'
  import headTop from 'src/components/header/head';

  export default {
    data(){
      return {
        userInfo:this.$route.query
      }
    },
    created(){
    },
    mounted(){
    },
    components: {
      headTop
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
            color: #bbb;
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
            flex-direction: column;
            justify-content: center;
            align-items: flex-end;
        }
  }
</style>
