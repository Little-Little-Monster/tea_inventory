<template>
  <div class="add_edit_storehouse">
    <head-top goBack="true" :head-title="$route.query.id?'编辑仓库':'新增仓库'">
      <span slot="right" style="font-size: 0.28rem;margin-right: 0.36rem">保存</span>
      <!-- <span slot="right" class="iconfont icon-jia" @click="addStore"></span> -->
    </head-top>
    <ul class="add_edit_header paddingTop">
      <li>
        <div class="list_left">
          名称 <i>*</i>
        </div>
        <div class="list_right">
          <input type="text" placeholder="请输入仓库名称" style="width: 1.99rem;">
        </div>
      </li>
      <li>
        <div class="list_left">
          负责人
        </div>
        <div class="list_right">
          <span>选择负责人</span>
          <i class="iconfont icon-xiala2" style="position: relative;top: 1px;"></i>
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
    </ul>
    <ul class="add_edit_content">
      <li>
        <div class="list_left">
          门店
        </div>
        <div class="list_right">
          <span>选择门店</span>
          <i class="iconfont icon-xiala2" style="position: relative;top: 1px;"></i>
        </div>
      </li>
      <li>
        <div class="list_left">
          <p>备注</p>
          <input type="text" placeholder="请输入备注信息">
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
        imgPath: 'static/images/head.png',
        enable: true,
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

  .add_edit_storehouse {
    ul {
      @include same_ul_style;
      margin-bottom: 2px;
      li {
        height: 1rem;
        padding: 0 0.4rem;
        .list_left {
          font-size: 0.32rem;
          color: #666666;
          i {
            position: relative;
            top: 3px;
            color: #D29191;
          }
        }
        .list_right {
          font-size: 0.28rem;
          color: #999999;
          input {
            background: none;
            color: #999999 !important;
            font-size: 0.28rem;
          }
          span {
            color: #999999;
            font-size: 0.28rem;
          }
        }
      }
      &.add_edit_content {
        li:nth-child(2) {
          height: 1.88rem;
          .list_left {
            width: 100%;
            p {
              margin-bottom: 0.1rem;
            }
            input {
              background: none;
              width: 100%;
              font-size: 0.28rem;
            }
          }
        }
      }
    }
  }
</style>
