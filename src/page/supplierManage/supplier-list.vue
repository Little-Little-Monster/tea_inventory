<template>
  <div>
    <head-top signin-up='msite' goBack="true" head-title="供应商列表">
      <router-link slot="right" class="iconfont icon-jia" :to="{name:'addEditUpplier'}"></router-link>
      <!-- <span slot="right" class="iconfont icon-jia" @click="addStore"></span> -->
    </head-top>
    <ul class="supplier_list paddingTop">
      <li class="supplier_info_list" v-for="list in suppList" @click="$router.push({name:'supplierDetail',query:list})">
        <div class="list_left">
          <h4>{{list.name}}</h4>
          <p>欠供应商欠款 <span>￥{{list.balance}}</span></p>
          <p>联系电话 <span>{{list.mobile}}</span></p>
          <p>负责人 <span>{{list.personHead}}</span></p>
        </div>
        <div class="list_right" >
          <i class="iconfont icon-qianjin"></i>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  import { mapMutations } from 'vuex'
  import { getStore } from 'src/config/mUtils'
  import { getsupplier } from 'src/service/getData'
  import headTop from 'src/components/header/head'
  import footGuide from 'src/components/footer/footGuide'

  export default {
    data(){
      return {
        imgPath: 'static/images/head.png',
        userId:getStore('userInfo').id,
        parama:'',
        suppList:null
      }
    },
    created(){
      this.getSupplier()
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
      },
      getSupplier(){
        getsupplier(this.userId,this.parama).then((res)=>{
          this.suppList=res.data;
        }).catch((err)=>{

        })
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
