<template>
  <div class="msite-con">
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
        <em class="list-option iconfont icon-sousuo" @click="searchGoods"></em>
      </div> -->
    </nav>
    <div class="content">
      <section class="user-info">
        <p class="user-name">
          <i v-if="6<clock&&clock<=12">上午好,</i> 
          <i v-if="12<clock&&clock<=18">下午好,</i> 
          <i v-if="18<clock&&clock<=24">晚上好,</i> 
          <i v-if="0<clock&&clock<=6">凌晨好,</i> 
          {{userName}}
        </p>
        <div class="user-detail">
          <div class="left">
            <p>今日收益</p>
            <span>{{date}}</span>
          </div>
          <div class="right">
            <span class="money"> ￥{{money.toFixed(2)}}</span>
          </div>
        </div>
      </section>
      <div class="menu-con">
        <div class="menu-item" v-if="menu.selected" v-for="menu in menuList" @click="$router.push({name:menu.routerCode,query:{fromPage:$route.name}})">
          <p class="iconfont" :class="menu.icon"></p>
          <p>{{menu.name}}</p>
        </div>
        <div class="menu-item more-icon"  @click="$router.push({name:'selMenu'})">
          <p class="iconfont icon-menu" ></p>
          <p></p>
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
  import shopList from 'src/components/common/shoplist'
  import { get_today_money } from 'src/service/getData'
  import 'src/plugins/swiper.min.js'
  import 'src/style/swiper.min.css'

  export default {
    data(){
      return {
        menuList: null,//菜单列表
        money:0,
        date:0,
        clock:0,
        userId:getStore('userInfo').id,
        userName:getStore('userInfo').userName,
        goodsName:""
      }
    },
    async beforeMount(){
      this.menuList = getStore("menu");
      this.CHANGE_HEADER('茶叶进销存管理系统')
    },
    created(){
     
    },
    mounted(){
      get_today_money(this.userId).then((res)=>{
        this.money = res.data.totalAmount;
        this.date = res.data.date;
        this.clock = Number(res.data.clock);
      }).catch((err)=>{

      })
      new Swiper('.swiper-container', {
          pagination: '.swiper-pagination',
          loop: true,
          autoplay:5000
      });
      
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
      searchGoods(){
        this.$router.push({name:"goodsManage",query:{fromPage:this.$route.name,goodsName:this.goodsName}})
      }
    },
    watch: {}
  }
</script>
<style lang="scss" scoped>
  @import 'src/style/mixin';
  .msite-con{
    display: flex;
    flex-direction: column;
  }
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
        height:auto;
        bottom: 0.2rem;
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
  .content{
    flex:1;
    overflow: auto;
  }
  .user-info {
    @include wh(100%, 2rem);
    margin-bottom: 0.1rem;
    background: #fff;
    padding: 0.27rem 0.52rem 0 0.46rem;
    .user-name {
      @include sc(.38rem, $text);
      font-weight: 600;
      margin-bottom: .2rem;
      i{
        font-weight: 600;
      }
    }
    .left {
      float: left;
      width:70%;
      height:1rem;
      p {
        @include sc(.34rem, $text)
      }
      span {
        @include sc(.24rem, $text_light)
      }
    }
    .right {
      float: left;
      width:30%;
      height:1rem;
      span {
        @include sc(.42rem, $text)
      }
    }
  }

  .menu-con {
    background: #fff!important;
    flex:1;
    display: flex;
    flex-wrap: wrap;
    // overflow: auto;
    .menu-item {
      background-color: #fff;
      width: 25%;
      height:1.5rem;
      min-height:1.5rem;
      height:auto;
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
    .more-icon{
      padding-top: 5%;
      p{
        font-size:.44rem;
      }
    }
  }
  
</style>
