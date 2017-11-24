<template>
  <div>
    <head-top signin-up='msite' goBack="true" head-title="供应商列表">
      <router-link slot="right" class="iconfont icon-jia" :to="{name:'addEditUpplier'}"></router-link>
      <!-- <span slot="right" class="iconfont icon-jia" @click="addStore"></span> -->
    </head-top>
    <ul class="supplier_list paddingTop">
      <li class="supplier_info_list" v-for="list in 5">
        <div class="list_left">
          <h4>春秋茗茶</h4>
          <p>欠供应商欠款 <span>￥100.00</span></p>
          <p>联系电话 <span>1856954325</span></p>
          <p>负责人 <span>陈总</span></p>
        </div>
        <div class="list_right" @click="$router.push({name:'supplierDetail'})">
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
      toAddress(name){
        this.$router.push(name)
      }
    },
    watch: {}
  }
</script>
<style lang="scss" scoped>
  @import '../../../src/style/mixin';
  .supplier_list{
    @include same_ul_style;
    .supplier_info_list{
      height: 2.2rem;
      padding: 0 0.2rem 0 0.4rem;
      .list_left{
        h4{
          font-size: 0.32rem;
          color: #444444;
        }
        p{
          font-size: 0.24rem;
          color: #999999;
          &:nth-of-type(1){
            span{
              color: #dac1db;
            }
          }
          span{
            color: #999999;
          }
        }
      }
      .list_right{
        i{
          color: #999999;
        }
      }
    }
  }
</style>
