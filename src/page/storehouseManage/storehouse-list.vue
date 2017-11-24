<template>
  <div class="storehouse_list">
    <head-top signin-up='msite' goBack="true" head-title="仓库管理">
      <router-link slot="right" class="iconfont icon-jia" :to="{name:'addEditStorehouse'}"></router-link>
      <!-- <span slot="right" class="iconfont icon-jia" @click="addStore"></span> -->
    </head-top>
    <div class="storehouse-header paddingTop">
      <div class="left_button">已启用 <span v-show="enable"></span></div>
      <div class="right_button">已停用 <span v-show="!enable"></span></div>
    </div>
    <ul class="storehouse_content">
      <li class="supplier_info_list" v-for="list in 5">
        <div class="list_left">
          <h4>环球中心</h4>
          <p>负责人：<span>张琪伦</span></p>
          <p>门店：环球中心一楼茶点</p>
        </div>
        <div class="list_right" @click="$router.push({name:'addEditStorehouse',query:{id: true}})">
          <i class="iconfont icon-qianjin"></i>
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
  .storehouse_list{
    .storehouse-header{
      display: flex;
      justify-content: space-between;
      background: #fff;
      height: 0.8rem;
      padding: 0 1.5rem;
      font-size: 0.32rem;
      margin-bottom: 1px;
      div{
        position: relative;
        height: 0.8rem;
        line-height: 0.8rem;
        span{
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
    .storehouse_content{
      @include same_ul_style;
      li{
        height: 2.2rem;
        .list_left{
          h4{
            color: #444;
            font-size: 0.32rem;
            margin-bottom: 0.2rem;
          }
          p{
            font-size: 0.24rem;
            color: #999;
            &:nth-child(2){
              margin-bottom: 0.1rem;
            }
          }
        }
        .list_right{
          i{
            color: #999;
          }
        }
      }
    }
  }
</style>
