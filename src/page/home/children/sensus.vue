<template>
  <div class="sensus paddingTop">
    <nav class="msite_nav paddingTop">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide food_types_container" :key="">
            <figure>
              <img src="../../../images/msite_bg_1.png">
            </figure>
          </div>
          <div class="swiper-slide food_types_container" :key="">
            <figure>
              <img src="../../../images/msite_bg_2.png">
            </figure>
          </div>
          <div class="swiper-slide food_types_container" :key="">
            <figure>
              <img src="../../../images/msite_bg_3.png">
            </figure>
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
      <!-- <div class="search-goods">
        <input type="text" v-model="goodsName" placeholder="请输入商品名称">
        <em class="list-option iconfont icon-sousuo"></em>
      </div> -->
    </nav>
    <ul class="sensus_ul sensus_header">
      <li @click="$router.push({name:'todayAccount'})" v-if="menuList.indexOf('todayAccount')!=-1&&userType<2">
        <div class="li_left"><i class="iconfont icon-zhouqipandianmingxi"></i>今日结余</div>
        <div class="li_right" style="text-align:right">收支明细、记账 <i class="iconfont icon-qianjin"></i></div>
      </li>
      <!-- <li class="sensus_ul_detail"> 
        <div class="li_left">
          <p><i class="iconfont icon-pandiandanliebiao"></i>客户对账</p>
          <span>欠款对账、收款月结</span>
        </div>
        <div class="border_center"></div>
        <div class="li_right">
          <p><i class="iconfont icon-pandiandanliebiao"></i>供应商对账</p>
          <span>对账、付账</span>
        </div>
      </li> -->
    </ul>
    <ul class="sensus_ul sensus_content">
      <li class="sensus_ul_detail" v-show="userType>1" v-if="menuList.indexOf('saleHistory')!=-1||menuList.indexOf('saleBackHistory')!=-1">
        <div class="li_left" @click="$router.push({name:'saleHistory',query:{fromPage:$route.name}})" v-if="menuList.indexOf('saleHistory')!=-1">
          <p>
            <em class="iconfont icon-gerenzhongxin-caigoudan"></em>
            <i>销售单</i>
          </p>
          <span>销售历史</span>
        </div>
        <div class="border_center"></div>
        <div class="li_right" @click="$router.push({name:'saleBackHistory',query:{fromPage:$route.name}})" v-if="menuList.indexOf('saleBackHistory')!=-1">
          <p class="sbZhanghq"><i class="iconfont icon-caigoutuihuodan"></i>销售退货单</p>
          <span>销售退货历史</span>
        </div>
      </li>

      <li @click="$router.push({name:'saleReport'})" v-if="menuList.indexOf('saleReport')!=-1">
        <div class="li_left">
          <p><i class="iconfont icon-xiaoshoubaobiao"></i>销售报表</p>
          <p>今日销售<span class="number"> {{saleInfo.saleSize}}</span> 笔<b></b>销售金额<span class="price"> ￥{{saleInfo.saleAmount}}</span></p>
          <p>今日退货<span class="number"> {{saleInfo.saleBackSize}}</span> 笔<b></b>退货金额<span class="price"> ￥{{saleInfo.saleBackAmount}}</span></p>
          <p>今日撤销<span class="number"> {{saleInfo.saleCancelSize}}</span> 笔<b></b>撤销金额<span class="price"> ￥{{saleInfo.saleCancelAmount}}</span></p>
        </div>
      </li>
      <li @click="$router.push({name:'buyReport'})" v-if="menuList.indexOf('buyReport')!=-1">
        <div class="li_left">
          <p><i class="iconfont icon-caigoubaobiao"></i>采购报表</p>
          <p>今日采购<span class="number"> {{buyInfo.buySize}}</span> 笔<b></b>采购金额<span class="price"> ￥{{buyInfo.buyAmount}}</span></p>
          <p>今日退货<span class="number"> {{buyInfo.buyBackSize}}</span> 笔<b></b>退货金额<span class="price"> ￥{{buyInfo.buyBackAmount}}</span></p>
          <p>今日撤销<span class="number"> {{buyInfo.buyCancelSize}}</span> 笔<b></b>撤销金额<span class="price"> ￥{{buyInfo.buyCancelAmount}}</span></p>
        </div>
      </li>
      <li class="sensus_ul_detail" v-show="userType<2" v-if="menuList.indexOf('saleHistory')!=-1||menuList.indexOf('saleBackHistory')!=-1">
        <div class="li_left" @click="$router.push({name:'saleHistory',query:{fromPage:$route.name}})" v-if="menuList.indexOf('saleHistory')!=-1">
          <p>
            <em class="iconfont icon-gerenzhongxin-caigoudan"></em>
            <i>销售单</i>
          </p>
          <span>销售历史</span>
        </div>
        <div class="border_center"></div>
        <div class="li_right" @click="$router.push({name:'saleBackHistory',query:{fromPage:$route.name}})" v-if="menuList.indexOf('saleBackHistory')!=-1">
          <p class="sbZhanghq"><i class="iconfont icon-caigoutuihuodan"></i>销售退货单</p>
          <span>销售退货历史</span>
        </div>
      </li>
      <!-- <li @click="$router.push({name:'buyReport'})">
        <div class="li_left">
          <p><i class="iconfont icon-pandiandanliebiao"></i>盘点报表</p>
          <p>本月盘点<span class="number"> {{buyInfo.size}}</span> 笔<b></b>盘点金额<span class="price"> ￥{{buyInfo.totalAmount}}</span></p>
        </div>
      </li> -->
      <!-- <li class="sensus_ul_detail">
        <div class="li_left">
          <p><i class="iconfont icon-pandiandanliebiao"></i>统计报表</p>
          <span>销售、毛利、动消</span>
        </div>
        <div class="border_center"></div>
        <div class="li_right">
          <p><i class="iconfont icon-pandiandanliebiao"></i>进销对比</p>
          <span>进货、销售比较</span>
        </div>
      </li> -->
    </ul>
  </div>
</template>
<script>
  import { mapMutations } from 'vuex'
  import { getStore } from 'src/config/mUtils'
  import { get_sale_total_today,get_buy_total_today } from 'src/service/getData';
  import headTop from 'src/components/header/head'
  import footGuide from 'src/components/footer/footGuide'
  import 'src/plugins/swiper.min.js'
  import 'src/style/swiper.min.css'

  export default {
    data(){
      return {
        menuList: JSON.stringify(getStore('menu')),//菜单列表
        userId:getStore('userInfo').id,
        userType:getStore('userInfo').type,
        saleInfo:{},
        buyInfo:{}
      }
    },
    async beforeMount(){
      this.CHANGE_HEADER('统计')
    },
    created(){
      get_sale_total_today(this.userId).then((res)=>{
        this.saleInfo = res.data;
      });
      get_buy_total_today(this.userId).then((res)=>{
        this.buyInfo = res.data;
      }).catch((err)=>{

      })
    },
    mounted(){
      new Swiper('.swiper-container', {
          pagination: '.swiper-pagination',
          loop: true,
          autoplay:5000
      });
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
.msite_title {
    @include center;
    width: 50%;
    color: #fff;
    text-align: center;
    margin-left: -0.5rem;
    .title_text {
      @include sc(0.8rem, #fff);
      text-align: center;
      display: block;
    }
  }
.iconfont{
              @include sc(.34rem,#97D4BF);
              position: relative;
              // bottom:.1rem;
              margin-right:.2rem
             }
  .msite_nav {
    background-color: #fff;
    border-bottom: 0.025rem solid $bc;
    height: 2rem;
    .swiper-container {
      @include wh(100%, auto);
      .swiper-pagination {
        bottom: 0.2rem;
        height:auto;
      }
      img{
        width:100%;
        height:2rem;
      }
    }
    .fl_back {
      @include wh(100%, 100%);
    }
    .search-goods{
      position: absolute;
      top:1.2rem;
      left:1.2rem;
      z-index:99;
      @include wh(3.9rem,.4rem);
      input{
        border: 2px solid #FFFFFF;
        border-radius: 1rem;
        background: #fff;
        @include wh(3.9rem,.4rem);
        text-indent:.2rem;
        line-height:.5rem;
      }
      .list-option{
        @include ct;
        right:.2rem;
        top:.25rem;
        @include sc(.3rem,$green)
      }
    }
  }
  .sensus{
    .sensus_ul{
      @include same_ul_style;
      li{
        margin-bottom: 1px!important;
        padding-left: 0.31rem;
        i:not(.icon-qianjin){
          margin-right: 0.15rem;
        }
        &>div{
          padding-top:.54rem;
          padding-bottom:.34rem;
        }
        &.sensus_ul_detail{
          padding: 0;
          div{
            span{
              font-size: 0.20rem;
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
            font-size: 0.28rem;
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
        margin-bottom: .2rem;
        
        li{
            min-height: 2rem;
            height:auto;
            .li_left{
              padding-top:.24rem;
              p{
                &:nth-child(n+1){
                  font-size: 0.28rem;
                  color: #ccc;
                  margin-top: 0.3rem;
                  margin-left: 0.42rem;
                }
                b{
                  margin-left: 0.4rem;
                }
                .number{
                  color: $green;
                  font-weight: 600;
                }
                .price{
                  color: #e91e63;
                  font-weight: 600;
                }
              }
            }
            .sbZhanghq{
              font-size:.28rem;
              margin-left: 0.42rem;
            }
        }
      }
    }
  }
</style>
