<template>
    <div class="wirehouse paddingTop">
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
      <ul class="wirehouse_ul">
         <li @click="$router.push({name:'inventoryFlow'})" v-if="menuList.indexOf('inventoryFlow')!=-1">
          <div class="li_left">
            <em class="iconfont icon-inventoryLaundryList"></em>
            <i>库存流水</i> 
          </div>
          <div class="li_right" style="text-align:right;font-size:.24rem">
            商品库存变化
            <i class="iconfont icon-qianjin"></i>
          </div>
        </li>
        <li class="sensus_ul_detail">
          <div class="li_left" @click="$router.push({name:'inventoryQuery'})" v-if="menuList.indexOf('inventoryQuery')!=-1">
            <p>
              <em class="iconfont icon-cangkukucunchaxun"></em>
              <i>库存查询</i>
              
              </p>
            <span>库存状况</span>
          </div>
          <div class="border_center"></div>
          <div class="li_right" @click="$router.push({name:'warehouseStock',query:{fromPage:$route.name}})" v-if="menuList.indexOf('warehouseStock')!=-1">
            <p>
              <em class="iconfont icon-ccgl-kucunpandian-1"></em>
              <i>库存盘点</i>
              </p>
            <span>盘点</span>
          </div>
        </li>
        <li class="sensus_ul_detail" v-if="!(menuList.indexOf('buyHistory')==-1&&menuList.indexOf('buyBackHistory')==-1)">
          <div class="li_left" @click="$router.push({name:'buyHistory',query:{fromPage:$route.name}})" v-if="menuList.indexOf('buyHistory')!=-1">
            <p>
              <em class="iconfont icon-gerenzhongxin-caigoudan"></em>
              <i>采购进货</i>
            </p>
            <span>进货，增加库存</span>
          </div>
          <div class="border_center"></div>
          <div class="li_right" @click="$router.push({name:'buyBackHistory',query:{fromPage:$route.name}})" v-if="menuList.indexOf('buyBackHistory')!=-1">
            <p><i class="iconfont icon-caigoutuihuodan"></i>采购退货</p>
            <span>出货，减少库存</span>
          </div>
        </li>
      </ul>
    </div>
</template>

<script>
import {mapMutations} from 'vuex'
import {getStore} from 'src/config/mUtils'
import headTop from 'src/components/header/head'
import footGuide from 'src/components/footer/footGuide'
import 'src/plugins/swiper.min.js'
import 'src/style/swiper.min.css'

export default {
	data(){
        return {
			    menuList:JSON.stringify(getStore("menu")),//菜单列表
        }
    },
    async beforeMount(){
        this.CHANGE_HEADER('仓库')
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
    computed: {

    },
    methods: {
    	...mapMutations([
    		'CHANGE_HEADER'
    	]),
    },
    watch: {

    }
}

</script>

<style lang="scss" scoped>
    @import '../../../style/mixin';
    .wirehouse{
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
            @include sc(.28rem,$green)
          }
        }
      }
      .wirehouse_ul{
        @include same_ul_style;
        
        li{
          margin-bottom: .2rem;
          padding-left:0.4rem;
          &>div{
             padding-top: 0.55rem;
             i{
               position: absolute;
             }
             .iconfont{
              @include sc(.32rem,#97D4BF);
              position: relative;
              // bottom:.1rem;
              margin-right:.2rem
             }
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
              font-size: 0.28rem;
            }
            .li_right{
              width: 3.73rem;
              padding-left: 0.28rem;
              padding: 0.31rem;
              font-size: 0.28rem;
            }
          }
          .border_center{
            width: 1px;
            background: #ddd;
            height: 0.86rem;
          }
          .li_left{
            font-size: 0.28rem;
            i{
              margin-right: 0.43rem;
            }
          }
          .li_right{
            font-size: 0.28rem;
            i{
            }
          }
        }
      }
    }

</style>
