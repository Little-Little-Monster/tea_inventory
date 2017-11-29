<template>
  <div class="purchase_detail">
    <head-top signin-up='msite' goBack="true" head-title="仓库管理">
      <router-link slot="right" class="iconfont icon-jia" :to="{name:'addEditStorehouse'}"></router-link>
    </head-top>
    <div class="purchase_detail_header paddingTop">
      <div class="left_button active">今日 <span></span></div>
      <div class="left_button">昨日 <span></span></div>
      <div class="right_button">近七天 <span></span></div>
      <div class="right_button">近30天 <span></span></div>
    </div>
    <div class="purchase_detail_account">
      <div class="account_left">
        采购量
        <p>109kg</p>
      </div>
      <div class="account_center">
        采购笔数
        <p>2</p>
      </div>
      <div class="account_right">
        采购金额
        <p>￥1900.00</p>
      </div>
    </div>
    <ul class="purchase_detail_list">
      <li v-for="list in 5">
        <div>
          <div class="list_left">
            <h4>绿茶&nbsp;&nbsp;竹叶青&nbsp;&nbsp;<span>x9</span></h4>
            <p>单价数量 <span>￥100.00</span></p>
            <p>2017-07-31 16:53:41</p>
          </div>
          <div class="list_right" @click="$router.push({name:'addEditStorehouse',query:{id: true}})">
            <span>￥900.00</span><i class="iconfont icon-xiala2"></i>
            <b class="order_type">采购单</b>
          </div>
        </div>
        <ul class="purchase_detail_info">
          <li>
            <p>采购员：小张</p>
            <p>供应商：春秋名茶</p>
          </li>
          <li>
            <p>仓库：环球中心仓库</p>
            <p>结算账户：环球中心账户</p>
          </li>
          <li>
            <p>数量：9</p>
            <p>单位：￥100.00</p>
          </li>
          <li>
            <p>单价：￥100.00</p>
            <p>折扣(%)：9</p>
          </li>
          <li>
            <p>单据总金额：￥900.00</p>
            <p>实付金额：￥900.00</p>
          </li>
          <li>
            <p>金额：￥900.00</p>
            <p>折扣金额：￥900.00</p>
          </li>
        </ul>
      </li>
    </ul>
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
        enable: true,
        imgPath: 'static/images/head.png'
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

  .purchase_detail {
    .purchase_detail_header {
      display: flex;
      justify-content: space-between;
      background: #fff;
      height: 0.8rem;
      font-size: 16px;
      padding: 0 0.58rem 0 0.79rem;
      align-items: center;
      div.active {
        position: relative;
        height: 0.8rem;
        line-height: 0.8rem;
        span {
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
    .purchase_detail_account {
      height: 1.5rem;
      background: #fff;
      margin: 0.08rem 0 0.1rem;
      display: flex;
      justify-content: space-between;
      padding: 0.25rem 0.59rem 0.28rem 0.64rem;
      font-size: 14px;
      div {
        text-align: center;
        color: #999;
        p {
          margin-top: 0.2rem;
          font-size: 17px;
          color: #9FC894;
        }
        &:nth-child(3) {
          p {
            color: #E78787;
          }
        }
      }
    }
    .purchase_detail_list {
      &>li {
        padding: 0 0.25rem;
        min-height: 2.2rem;
        background: #fff;
        margin-bottom: 0.1rem;
        &>div{
          display: flex;
          height: 2.2rem;
          align-items: center;
          justify-content: space-between;
          margin:0 0.05rem 0 0.62rem;
          .list_left {
            color: #999;
            h4 {
              color: #444;
              font-size: 16px;
              margin-bottom: 0.2rem;
              span {
                color: #999;
                font-size: 14px;
              }
            }
            p {
              font-size: 12px;
              color: #999;
              margin-bottom: 0.1rem;
              span {
                color: #E78787;;
              }
            }
          }
          .list_right {
            position: relative;
            height: 2.2rem;
            line-height: 2.2rem;
            span{
              color: #E78787;
            }
            i {
              color: #999;
              margin-left: 0.3rem;
            }
            .order_type{
              position: absolute;
              display: block;
              top: 0.2rem;
              right: 0;
              height: 0.4rem;
              line-height: 0.4rem;
              text-align: center;
              width: 1.2rem;
              background: #E78787;
              border-radius: 100px;
              color: #fff;
              font-size: 12px;
            }
          }
        }
        ul.purchase_detail_info{
          border-top: 1px dashed #DDDDDD;
          height: 2.97rem;
          padding: 0.19rem 0 0.2rem;
          margin-left: 0.62rem;
          li{
            display: flex;
            justify-content: flex-start;
            font-size: 12px;
            p{
              color: #999999;
              margin-bottom: 0.1rem;
              line-height: 0.33rem;
              &:nth-child(1){
                width: 2.8rem;
              }
            }
          }
        }
      }
    }
  }
</style>
