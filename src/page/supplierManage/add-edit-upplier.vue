<template>
  <div>
    <head-top signin-up='msite' goBack="true" :head-title="$route.query.id?'编辑供应商':'新增供应商'">
      <router-link slot="right" class="iconfont icon-jia" :to="{name:'storeOption'}"></router-link>
      <!-- <span slot="right" class="iconfont icon-jia" @click="addStore"></span> -->
    </head-top>
    <ul class="add-edit-upplier paddingTop">
      <li>
        <div class="list_left">
          名称 <i>*</i>
        </div>
        <div class="list_right">
          春秋茗茶
        </div>
      </li>
      <li>
        <div class="list_left">
          负责人
        </div>
        <div class="list_right">
          <input type="text" placeholder="请输入负责人名称" style="width: 2.27rem;">
        </div>
      </li>
      <li>
        <div class="list_left">
          折扣(%)
        </div>
        <div class="list_right">
          <input type="text" placeholder="请输入折扣" style="width: 1.42rem;">
        </div>
      </li>
      <li>
        <div class="list_left">
           启用
        </div>
        <div class="list_right">
          <kswitch :checked="enable" @click.native="enable=!enable"></kswitch>
        </div>
      </li>
      <li>
        <div class="list_left">
          手机
        </div>
        <div class="list_right">
          <input type="text" placeholder="请输入手机号码" style="width: 1.99rem;">
        </div>
      </li>
      <li>
        <div class="list_left">
          电话
        </div>
        <div class="list_right">
          <input type="text" placeholder="请输入座机号" style="width: 1.71rem;">
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
  import kswitch from 'src/components/common/kswitch'

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
      kswitch,
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

  .add-edit-upplier {
    @include same_ul_style;
    li {
      height: 1rem;
      padding: 0 0.4rem;
      &:nth-child(1) {
        .list_right {
          color: #444;
        }
      }
      .list_left {
        font-size: 0.32rem;
        color: #666666;
        i{
          position: relative;
          top: 3px;
          color: #D29191;
        }
      }
      .list_right {
        font-size: 0.28rem;
        color: #999999;
        input{
          background: none;
          color: #999999!important;
        }
      }
    }
  }
</style>
