<template>
  <div class="sensus paddingTop">
    <ul class="sensus_ul sensus_header">
      <li>
        <div class="li_left"><i class="iconfont icon-pandiandanliebiao"></i>今天结余</div>
        <div class="li_right">收支明细、记账 <i class="iconfont icon-qianjin"></i></div>
      </li>
      <li class="sensus_ul_detail">
        <div class="li_left">
          <p><i class="iconfont icon-pandiandanliebiao"></i>客户对账</p>
          <span>欠款对账、收款月结</span>
        </div>
        <div class="border_center"></div>
        <div class="li_right">
          <p><i class="iconfont icon-pandiandanliebiao"></i>供应商对账</p>
          <span>对账、付账</span>
        </div>
      </li>
    </ul>
    <ul class="sensus_ul sensus_content">
      <li>
        <div class="li_left">
          <p><i class="iconfont icon-pandiandanliebiao"></i>销售报表</p>
          <p>今日销售<span class="number"> 100</span> 笔<b></b>销售金额<span class="price"> ￥100.00</span></p>
        </div>
      </li>
      <li class="sensus_ul_detail">
        <div class="li_left">
          <p><i class="iconfont icon-pandiandanliebiao"></i>采购报表</p>
          <span>采购统计</span>
        </div>
        <div class="border_center"></div>
        <div class="li_right">
          <p><i class="iconfont icon-pandiandanliebiao"></i>盘点报表</p>
          <span>盘点统计</span>
        </div>
      </li>
      <li class="sensus_ul_detail">
        <div class="li_left">
          <p><i class="iconfont icon-pandiandanliebiao"></i>统计报表</p>
          <span>销售、毛利、动消</span>
        </div>
        <div class="border_center"></div>
        <div class="li_right">
          <p><i class="iconfont icon-pandiandanliebiao"></i>进销对比</p>
          <span>进货、销售比较</span>
        </div>
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
        menuList: null,//菜单列表
      }
    },
    async beforeMount(){
      this.CHANGE_HEADER('统计')
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
    },
    watch: {}
  }
</script>
<style lang="scss" scoped>
  @import '../../../style/mixin';
  .sensus{
    .sensus_ul{
      @include same_ul_style;
      li{
        margin-bottom: 1px!important;
        padding-left: 0.31rem;
        i:not(.icon-qianjin){
          margin-right: 0.15rem;
        }
        &.sensus_ul_detail{
          padding: 0;
          div{
            span{
              font-size: 0.13rem;
              color: #ccc;
              margin-left: 0.42rem;
            }
          }
          .li_left{
            width: 3.74rem;
            padding: 0.31rem;
          }
          .li_right{
            width: 3.73rem;
            padding-left: 0.28rem;
            font-size: 0.3rem;
          }
        }
        .border_center{
          width: 1px;
          background: #ddd;
          height: 0.86rem;
        }
      }
      &.sensus_header{
        margin-bottom: 0.28rem;
      }
      &.sensus_content{
        li{
          &:nth-child(1){
            height: 2rem;
            .li_left{
              p{
                &:nth-child(2){
                  font-size: 0.13rem;
                  color: #ccc;
                  margin-top: 0.3rem;
                  margin-left: 0.42rem;
                  b{
                    margin-left: 0.4rem;
                  }
                }
                .number{
                  color: $green;
                  font-weight: 600;
                }
                .price{
                  color: #e91e63c7;
                  font-weight: 600;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
