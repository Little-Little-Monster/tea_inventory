<template>
  <div class="purchase_detail main">
    <head-top signin-up='msite' goBack="" head-title="盘点查询">
      <span  slot="right" class="iconfont icon-jia" @click="$router.push({name:'addStock',query:{fromPage:$route.name}})" ></span>
      <div slot="back" class="goback" @click="goBack" >
          <span class="iconfont icon-fanhui title_text"></span>
      </div>
    </head-top>
    <div class="purchase_detail_header paddingTop">
      <div class="left_button" :class="{'active':status==0}" @click="status=0;page=0;touchend=false">全部 <span></span></div>
      <div class="left_button" :class="{'active':status==2}" @click="status=2;page=0;touchend=false">已盘点 <span></span></div>
      <div class="right_button" :class="{'active':status==1}" @click="status=1;page=0;touchend=false">草稿 <span></span></div>
    </div>
    <div class="cneter-con" v-load-more="loaderMore" type="2">
      <div style="height:auto">
        <div class="list buy-list" v-for="stock in stockList" @click="editStock(stock.id)">
          <left-slider class="parentType" :index="stock.id" @swipe="swipe" @swipeRight="inputIndex=-1">
            <p>门店：{{stock.storeName}}</p>
            <p class="text-info">仓库：{{stock.warehouseName}}</p>
            <p class="text-info">创建时间：{{stock.createTimeStr}}</p>
            <span class="list-option" v-if="inputIndex!=stock.id||stock.status!=1">
              <em class="iconfont icon-qianjin"></em>
            </span>
            <div  v-if="stock.status==1" :class="{'option-con-list':inputIndex==stock.id,'option-none':inputIndex!=stock.id}" >
                <span @click="deleteStock(stock.id)">删除</span>
            </div>
          </left-slider>
        </div> 
        <p v-if="touchend" class="empty_data">没有更多了</p>
      </div>
    </div>
     <transition name="loading">
			<loading v-show="showLoading"></loading>
		</transition>
    <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="showAlert=false" :alertText="alertText"></alert-tip>
  </div>
</template>
<script>
  import { mapMutations } from 'vuex'
  import { getStore } from 'src/config/mUtils'
  import headTop from 'src/components/header/head'
  import {get_stock_list,delete_stock} from 'src/service/getData'
  import alertTip from '../../components/common/alertTip'
  import footGuide from 'src/components/footer/footGuide'
  import LeftSlider from '../../components/common/slideLeft.vue';
  import {loadMore} from 'src/components/common/mixin'
  import loading from 'src/components/common/loading'

  export default {
    data(){
      return {
        enable: true,
        imgPath: 'static/images/head.png',
        userId:getStore('userInfo').id,
        stockList:[],
        status:0,
        showAlert:false,
        alertText:null,
        inputIndex:-1,
        page:0,
        pageSize:10,
        preventRepeatReuqest: false, //到达底部加载数据，防止重复加载
			  showBackStatus: false, //显示返回顶部按钮
			  showLoading: true, //显示加载动画
			  touchend: false, //没有更多数据
      }
    },
    components: {
      headTop,
      footGuide,
      alertTip,
      LeftSlider,
      loading
    },
    mixins: [loadMore],
    computed: {},
    created(){
      this.getStock();
    },
    mounted(){

    },
    methods: {
      ...mapMutations([
        'CHANGE_HEADER'
      ]),
      toAddress(name){
        this.$router.push(name)
      },
      getStock(){
        get_stock_list(this.userId,this.status,this.page,this.pageSize).then((res)=>{
          if(res.code==200){
            this.stockList = res.data.info;
            if (res.data.info.length < this.pageSize) {
              this.touchend = true;
            }
            this.showLoading = false
          }else{
            this.alertText = res.message
            this.showAlert = true
          }
        }).catch((err)=>{
          this.alertText = err.message
          this.showAlert = true
        })
      },
      //到达底部加载更多数据
      async loaderMore(){
        if (this.touchend) {
          return
        }
        //防止重复请求
        if (this.preventRepeatReuqest) {
          return 
        }
        this.showLoading = true;
        this.preventRepeatReuqest = true;
        //数据的定位加20位
        this.page++;
        let res = await get_stock_list(this.userId,this.status,this.page,this.pageSize)
              this.showLoading = false;
              this.preventRepeatReuqest = false;
              if (res.data.info.length < this.pageSize) {
                this.touchend = true;
              }
              this.stockList = [...this.stockList,...res.data.info]
      },
      goBack(){
        if(this.$route.query.fromPage){
          this.$router.push({name:this.$route.query.fromPage});
        }else{
          this.$router.push({name:'msite'});
        }
      },
      showTip(msg){
        this.showAlert = true;
        this.alertText = msg
      },
      deleteStock(id){
        delete_stock(id).then((res)=>{
          if(res.code==200){
            this.showTip('删除成功！');
            this.getStock();
          }else{
            this.showTip(res.message)
          }
        }).catch((err)=>{
          this.showTip(err.message)
        })
      },
      editStock(id){
        if(this.inputIndex!=id){
          this.$router.push({name:"editStock",query:{
            edit:true,
            fromPage:this.$route.name,
            id:id
          }})
        }
        
      },
      swipe(id){
        this.inputIndex = id;
      }
    },
    watch: {
      'status'(){
        this.getStock()
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '../../../src/style/mixin';

  .purchase_detail {
    .purchase_detail_header {
      display: flex;
      justify-content: space-between;
      background: #fff;
      height: 0.8rem;
      line-height: .8rem;
      text-align: center;
      font-size: 16px;
      align-items: center;
      margin-bottom:.01rem;
      div.active {
        position: relative;
        height: 0.8rem;
        line-height: 0.8rem;
        span {
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
    .buy-list{
      @include wh(100%,1.8rem);
      // padding:.25rem .8rem;
      margin-bottom:.1rem;
      p{
        &:nth-child(1){
          margin:0 0 .2rem 0;
          padding-top:.3rem;
        }
      }
      .text-info{
        @include sc(.24rem,$text_light);
        margin:.1rem 0;
      }
      .list-more{
        @include ct;
        @include sc(.28rem,#666)
        @include wh(1.5rem,.8rem);
        right:.8rem;
        text-align:center;
        em:nth-child(1){
          color:#D38888;
          line-height:.3rem;
        }
      }
    }
  }
</style>
