<template>
  <div>
    <nav class="msite_nav paddingTop">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide food_types_container" :key="">
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </nav>
    <section class="user-info">
      <p class="user-name">下午好,张小盛</p>
      <div class="user-detail">
        <div class="left">
          <p>今日收益</p>
          <span>2017年9月23日</span>
        </div>
        <div class="right">
          <span class="money">+ &nbsp;201432</span>
        </div>
      </div>
    </section>
    <div class="menu-con">
      <div class="menu-item" v-for="menu in menuList" @click="$router.push({name:menu.routerCode})">
        <p class="iconfont icon-unif033" :class="menu.icon"></p>
        <p>{{menu.name}}</p>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapMutations } from 'vuex'
  import { getStore } from 'src/config/mUtils'
  import headTop from 'src/components/header/head'
  import footGuide from 'src/components/footer/footGuide'
  import shopList from 'src/components/common/shoplist'
  import { msiteAdress, msiteFoodTypes, cityGuess } from 'src/service/getData'
  import 'src/plugins/swiper.min.js'
  import 'src/style/swiper.min.css'

  export default {
    data(){
      return {
        menuList: null,//菜单列表
      }
    },
    async beforeMount(){
      this.menuList = getStore("menu");
      this.CHANGE_HEADER('茶叶进销存管理系统')
    },
    mounted(){

    },
    components: {
      headTop,
      shopList,
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
  @import 'src/style/mixin';

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
      padding-bottom: 0.6rem;
      .swiper-pagination {
        bottom: 0.2rem;
      }
    }
    .fl_back {
      @include wh(100%, 100%);
    }
  }

  .user-info {
    @include wh(100%, 2.4rem);
    margin-bottom: 0.1rem;
    background: #fff;
    padding: 0.47rem 0.52rem 0 0.46rem;
    .user-name {
      @include sc(.38rem, $text);
      font-weight: 600;
      margin-bottom: .5rem;
    }
    .left {
      p {
        @include sc(.34rem, $text)
      }
      span {
        @include sc(.24rem, $text_light)
      }
    }
    .right {
      span {
        @include sc(.42rem, $text)
      }
    }
  }

  .menu-con {
    min-height: 6.1rem;
    background: #fff;
    display: flex;
    flex-wrap: wrap;
    // overflow: auto;
    .menu-item {
      width: 25%;
      padding-top: 5%;
      p {
        text-align: center;
        margin: 10% 0;
        &:nth-child(1) {
          color: $green;
          padding: 0 5%;
          font-size: .34rem;
        }
        &:nth-child(2) {
          font-size: .24rem;
          color: $text;
        }
      }
    }
  }
</style>
