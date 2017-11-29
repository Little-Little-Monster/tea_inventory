<template>
  <div class="add_purchase">
    <head-top goBack="true" head-title="采购单">
    </head-top>
    <ul class="add_purchase_header paddingTop">
      <li>
        <div class="list_left">
          供应商 <i>*</i>
        </div>
        <div class="list_right">
          <span>陈老板</span>
          <i class="iconfont icon-xiala2" style="position: relative;top: 1px;"></i>
        </div>
      </li>
      <li>
        <div class="list_left">
          仓库
        </div>
        <div class="list_right">
          <span>环球中心店</span>
          <i class="iconfont icon-xiala2" style="position: relative;top: 1px;"></i>
        </div>
      </li>
      <li>
        <div class="list_left">
          结算账户
        </div>
        <div class="list_right">
          <span>默认账户</span>
          <i class="iconfont icon-xiala2" style="position: relative;top: 1px;"></i>
        </div>
      </li>
    </ul>
    <ul>
      <li style="padding-right: 0.88rem">
        <div class="list_left">
          选择商品
        </div>
        <div class="list_right">
          <i class="iconfont icon-jia-b" style="font-size: 20px;font-weight: 900"></i>
        </div>
      </li>
    </ul>
    <ul>
      <li>
        <div class="list_left">
          实付 <i>0</i>
        </div>
        <div class="list_right">
          未付
        </div>
      </li>
      <li>
        <div class="list_left">
          欠供应商款
        </div>
        <div class="list_right" style="color: #E78787">
          ￥0.00
        </div>
      </li>
      <li>
        <div class="list_left">
          业务日期
        </div>
        <div class="list_right">
          2017-09-27
          <i class="iconfont icon-xiala2" style="position: relative;top: 1px;"></i>
        </div>
      </li>
    </ul>
    <ul class="remark">
      <li>
        <div class="list_left">
          <p>备注</p>
          <input type="text" placeholder="请输入备注信息">
        </div>
      </li>
    </ul>
    <div class="bottom">
      <div class="bottom_left">合计：0<span>￥0.00</span></div>
      <div class="bottom_right">
        草稿<button :class="{returnGoods: false}">采购</button>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapMutations } from 'vuex'
  import { getStore } from 'src/config/mUtils'
  import headTop from 'src/components/header/head'
  import footGuide from 'src/components/footer/footGuide'

  export default {
    data(){
      return {
        imgPath: 'static/images/head.png',
        enable: true,
      }
    },
    mounted(){

    },
    components: {
      headTop,
      footGuide,
    },
    computed: {},
    methods: {
      ...mapMutations([
        'CHANGE_HEADER'
      ]),
      toAddress(name){
        this.$router.push(name)
      }
    },
    watch: {}
  }
</script>
<style lang="scss" scoped>
  @import '../../../src/style/mixin';

  .add_purchase {
    ul {
      @include same_ul_style;
      margin-bottom: 0.1rem;
      li {
        height: 1rem;
        padding: 0 0.4rem;
        .list_left {
          font-size: 16px;
          color: #666666;
          i {
            color: #E78787;
          }
        }
        .list_right {
          font-size: 14px;
          color: #A1A1A1;
          span {
            color: #A1A1A1;
            font-size: 14px;
          }
          i {
            color: #A1A1A1;
          }
        }
      }
      &.remark {
        height: 2.8rem;
        margin-bottom: 1.16rem;
        li {
          display: block;
          height: 2.8rem;
          padding-top: 0.3rem;
          background: #fff;
          .list_left {
            input {
              margin-top: 0.63rem;
              width: 100%;
              background: none;
            }
          }
        }
      }
    }
    .bottom {
      height: 0.98rem;
      position: fixed;
      bottom: 0;
      background: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .bottom_left {
        font-size: 14px;
        padding-left: 0.3rem;
        span {
          color: #D38888;;
          margin-left: 0.44rem;
          font-size: 16px;
        }
      }
      .bottom_right {
        font-size: 16px;
        color: #A8A8A8;
        button {
          width: 1.6rem;
          height: 0.98rem;
          background: #9FC894;
          color: #fff;
          font-size: 16px;
          margin-left: 0.43rem;
          &.returnGoods {
            background: #E78787;
          }
        }
      }
    }
  }
</style>
