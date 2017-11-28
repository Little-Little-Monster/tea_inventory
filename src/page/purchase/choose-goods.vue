<template>
  <div class="choose_goods">
    <head-top signin-up='msite' goBack="true" head-title="选择商品">
      <router-link slot="right" class="iconfont icon-jia" :to="{name:'addEditStorehouse'}"></router-link>
    </head-top>
    <div class="goods_classify paddingTop">
      <div class="goods_classify_button">
        <ul>
          <li>未分类</li>
          <li>绿茶</li>
          <li class="active">茶叶</li>
        </ul>
      </div>
      <div class="goods_classify_list">
        <ul v-if="true">
          <li v-for="item in 3">
            <div class="goods_pic">
              <img src="" alt="">
            </div>
            <div class="goods_info">
              <h3>竹叶青</h3>
              <p>销售价：<span class="price">￥12.00/克</span></p>
              <p>库存：29.00</p>
            </div>
          </li>
        </ul>
        <div class="nothing" v-else="">
          <i class="iconfont icon-icon02"></i>
          <p>暂无商品，请前往添加</p>
        </div>
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

  .choose_goods {
    .goods_classify {
      display: flex;
      justify-content: space-between;
      .goods_classify_button {
        width: 1.8rem;
        ul{
          li {
            height: 1.2rem;
            line-height: 1.2rem;
            border: 1px solid #ddd;
            text-align: center;
            font-size: 12px;
            &.active {
              background: #fff;
              border-left: 4px solid #9FC894;
              border-bottom: none;
            }
          }
        }
      }
      .goods_classify_list {
        width: 5.7rem;
        ul{
          li {
            height: 2.2rem;
            background: #fff;
            margin-bottom: 1px;
            padding: 0.2rem 0 0.2rem 0.33rem;
            display: flex;
            justify-content: flex-start;
            .goods_pic {
              width: 1.8rem;
              height: 1.8rem;
              background: #D8D8D8;
              margin-right: 0.3rem;
            }
            .goods_info {
              color: #999;
              font-size: 12px;
              h3 {
                font-size: 16px;
                color: #444444;
                line-height: 0.45rem;
                margin-bottom: 0.2rem;
              }
              p {
                margin-bottom: 0.1rem;
                .price {
                  color: #E78787;
                }
              }
            }
          }
        }
        .nothing{
          text-align: center;
          margin-top: 1.4rem;
          p{
            font-size: 14px;
            color: #999999;
            margin-top: 0.39rem;
          }
          i{
            font-size: 60px;
            color: #9FC894;
          }

        }
      }
    }
  }
</style>
