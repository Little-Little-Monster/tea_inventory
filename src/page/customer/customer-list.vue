<template>
  <div class="customer-list paddingTop">
    <head-top signin-up='msite' goBack="" head-title="全部分类">
      <router-link slot="right" class="iconfont icon-jia" :to="{name:'addEditStorehouse'}"></router-link>
      <div slot="back" class="goback" @click="goBack" >
        <span class="iconfont icon-fanhui title_text"></span>
      </div>
      <!-- <span slot="right" class="iconfont icon-jia" @click="addStore"></span> -->
    </head-top>
    <ul class="customer-content">
      <li class="supplier_info_list" v-for="list in storeHousList">
        <div class="list_left">
          <h4>王雪</h4>
          <p>客户分类：重点客户
          <p>客户欠款：￥0.00</p>
        </div>
        <div class="list_right" @click="$router.push({name:'addEditStorehouse',query:{id: true}})">
          <i class="iconfont icon-bianji"></i>
          <span>编辑</span>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  import { mapMutations } from 'vuex'
  import { getStore } from 'src/config/mUtils'
  import headTop from 'src/components/header/head'
  import { getstorehouse } from 'src/service/getData';

  export default {
    data(){
      return {
        imgPath: 'static/images/head.png',
        storeHousList:null,
        enable:true,
        userId:getStore('userInfo').id
      }
    },
    created(){
      this.getStoreHouse()
    },
    mounted(){

    },
    components: {
      headTop,
    },
    computed: {},
    methods: {
      ...mapMutations([
        'CHANGE_HEADER'
      ]),
      toAddress(name){
        this.$router.push(name)
      },
      getStoreHouse(){
        getstorehouse(this.userId).then((res)=>{
          this.storeHousList=res.data;
        }).catch((err)=>{

        })
      },
      goBack(){
        this.$router.push({name:'basic'})
      }
    },
    watch: {}
  }
</script>
<style lang="scss" scoped>
  @import '../../../src/style/mixin';
  .customer-list{
    .customer-content{
      @include same_ul_style;
      overflow: hidden;
      li{
        height: 1.8rem;
        margin-top: 0.1rem;
        .list_left{
          h4{
            font-size: 16px;
            color: #444444;
            line-height: 0.45rem;
            margin-bottom: 0.1rem;
          }
          p{
            font-size: 0.24rem;
            line-height: 0.33rem;
            color: #999;
            &:nth-child(2){
              margin-bottom: 0.1rem;
            }
          }
        }
        .list_right{
          span{
            color: #999;
            font-size: 14px;
            margin-left: 0.1rem;
          }
          i{
            color: #999;
            font-weight: 900;
          }
        }
      }
    }
  }
</style>
