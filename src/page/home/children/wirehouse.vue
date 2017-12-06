<template>
    <div class="wirehouse paddingTop">
      <ul class="wirehouse_ul">
        <li>
          <div class="li_left"><i class="iconfont icon-pandiandanliebiao"></i>库存查询</div>
          <div class="li_right">库存状况<i class="iconfont icon-qianjin"></i></div>
        </li>
        <li>
          <div class="li_left"><i class="iconfont icon-pandiandanliebiao"></i>库存流水</div>
          <div class="li_right">商品库存变化<i class="iconfont icon-qianjin"></i></div>
        </li>
      </ul>
    </div>
</template>

<script>
import {mapMutations} from 'vuex'
import {getStore} from 'src/config/mUtils'
import headTop from 'src/components/header/head'
import footGuide from 'src/components/footer/footGuide'

export default {
	data(){
        return {
			menuList:null,//菜单列表
        }
    },
    async beforeMount(){
        this.CHANGE_HEADER('仓库')
    },
    mounted(){

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
      .wirehouse_ul{
        @include same_ul_style;
        li{
          padding-left:0.4rem;
          .li_left{
            i{
              margin-right: 0.43rem;
            }
          }
          .li_right{
            i{
              margin-left: 0.15rem;
            }
          }
        }
      }
    }

</style>
