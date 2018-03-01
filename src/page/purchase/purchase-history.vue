<template>
  <div class="purchase_detail main">
    <head-top signin-up='msite' goBack="" :headTitle="$route.name=='buyBackHistory'?'采购回退历史':'采购历史'">
      <div slot="back" class="goback" @click="goBack" >
          <span class="iconfont icon-fanhui title_text"></span>
      </div>
    </head-top>
    <div class="purchase_detail_header paddingTop">
      <div class="left_button" :class="{'active':status==0}" @click="status=0;page=0;touchend=false">全部 <span></span></div>
      <div class="left_button" :class="{'active':status==2}" @click="status=2;page=0;touchend=false">已采购 <span></span></div>
      <div class="right_button" :class="{'active':status==1}" @click="status=1;page=0;touchend=false">草稿 <span></span></div>
      <div class="right_button" :class="{'active':status==3}" @click="status=3;page=0;touchend=false">撤销 <span></span></div>
    </div>
    <section class="title-choose">
        <div class="login-tit">
            <!-- <input type="date" :class="{'full':startDate}" placeholder="开始时间" v-model="startDate"> -->
            <input type="text" readonly="" id="time" name="input_date" placeholder="开始时间" v-model="startDate" />
            <i class="time-xiala iconfont icon-xiala2"></i>
        </div>
        <div class="regist-tit">
            <!-- <input type="date" :class="{'full':endDate}" placeholder="结束时间" v-model="endDate"> -->
            <input type="text" readonly="" id="time2" name="input_date" placeholder="结束时间" v-model="endDate" />
            <i class="time-xiala iconfont icon-xiala2"></i>
        </div>
    </section>
    <section class="title-choose">
        <div class="search" @click="goSupplier">
            <div class="search-name">供应商</div>
            <span class="sel-goods" v-if="!supplierId">请选择供应商<i class="iconfont icon-qianjin"></i></span>
            <span class="sel-goods" v-if="supplierId">{{supplierName}}<i class="iconfont icon-qianjin"></i></span>
        </div>
    </section>
    <div class="cneter-con" v-load-more="loaderMore" type="2">
      <div style="height:auto">
        <div class="list buy-list" v-for="history in historyList" @click="editBuyOrder(history.id)">
          <p>{{history.supplierName}}</p>
          <p class="text-info">{{history.createDate}}</p>
          <div class="list-more">
            <em>￥{{history.totalAmount.toFixed(2)}}</em><br>
            <em>{{history.warehouseName}}</em>
          </div>
          <span class="list-option">
            <em class="iconfont icon-qianjin"></em>
          </span>
        </div> 
         <p v-if="touchend" class="empty_data">没有更多了</p>
      </div>
    </div>
    <div class="bottom" @click="getHistory">
        查询
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
  import {get_buy_history} from 'src/service/getData'
  import {loadMore} from 'src/components/common/mixin'
  import loading from 'src/components/common/loading'
  import footGuide from 'src/components/footer/footGuide'
  import alertTip from '../../components/common/alertTip'

  export default {
    data(){
      return {
        enable: true,
        imgPath: 'static/images/head.png',
        userId:getStore('userInfo').id,
        historyList:[],
        status:0,
        type:this.$route.name=='buyBackHistory'?5:4,
        page:0,
        pageSize:10,
        preventRepeatReuqest: false, //到达底部加载数据，防止重复加载
        showBackStatus: false, //显示返回顶部按钮
        showLoading: true, //显示加载动画
        touchend: false, //没有更多数据
        showAlert:false,
        alertText:'',
        endDate:'',
        startDate:'',
        supplierId:this.$route.query.supplierId?this.$route.query.supplierId:0,
        supplierName:this.$route.query.supplierName?this.$route.query.supplierName:''
      }
    },
    components: {
      headTop,
      footGuide,
      loading,
      alertTip
    },
    computed: {},
    created(){
      this.getHistory();
    },
    mounted(){
      var calendar = new LCalendar();
      var calendar2 = new LCalendar();
      calendar.init({
          'trigger': '#time',//标签id
          'type': 'date',//date 调出日期选择 datetime 调出日期时间选择 time 调出时间选择 ym 调出年月选择
      });
      calendar2.init({
          'trigger': '#time2',//标签id
          'type': 'date',//date 调出日期选择 datetime 调出日期时间选择 time 调出时间选择 ym 调出年月选择
      });
    },
    mixins: [loadMore],
    methods: {
      ...mapMutations([
        'CHANGE_HEADER'
      ]),
      goBack(){
        if(this.$route.query.fromPage){
          this.$router.push({name:this.$route.query.fromPage})
        }else{
          this.$router.push({name:'msite'})
        } 
      },
      goSupplier(){
        //跳转到供应商
        this.$router.push({name:"supplierList",query:{
          chooseSupplier:true,
          fromPage:this.$route.name,
          supplierId:this.supplierId,
          supplierName:this.supplierName
        }})
      },
      showTip(msg){
        this.alertText = msg;
        this.showAlert =true;
      },
      getHistory(){
        this.showLoading = true
        get_buy_history(this.userId,this.page,this.pageSize,this.status,this.type,this.supplierId,this.startDate,this.endDate).then((res)=>{
          if(res.code==200){
            this.historyList = res.data.info;
            this.showLoading = false
            if (res.data.info.length < this.pageSize) {
                this.touchend = true;
            }
          }else{  
            this.showTip(res.message)
          }
          
        }).catch((err)=>{
          this.showLoading = false
          this.showTip(err.message)
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
        let res = await get_buy_history(this.userId,this.page,this.pageSize,this.status,this.type)
        if(res.code!=200){
          this.showTip(res.message)
        }else{
          this.preventRepeatReuqest = false;
          if (res.data.info.length < this.pageSize) {
            this.touchend = true;
          }
          this.historyList = [...this.historyList,...res.data.info]
        }
        this.showLoading = false;
        
      },
      editBuyOrder(id){
        this.$router.push({name:this.$route.name=='buyBackHistory'?'buyBack':'buyTrade',query:{
          edit:true,
          fromPage:this.$route.name,
          id:id
        }})
      }
    },
    watch: {
      'status'(){
        this.getHistory()
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '../../../src/style/mixin';
  .title-choose{
        width:100%;
        height:.8rem;
        margin-bottom: 0.1rem;
        background: #fff;
        &>div{
            width:50%;
            height:.8rem;
            float: left;
            text-align: center;
            position: relative;
            line-height: .8rem;
            font-size:.32rem;
            em{
                display: inline-block;
                @include wh(0.3rem,0.06rem);
                background:$green;
                position: absolute;
                bottom: 0;
                left:45%;
            }
            input{
                right: 0;
                @include ct;
                width:80%;
            }
        }
        .store{
            width:33%;
            select{
                width:80%;
                text-align: center;
                background: #fff;
                @include ct;
                right:0;
                color:#999;
            }
        }
        .search{
            display: flex;
            background: #fff;
            padding-right:.4rem;
            width:100%;
            .search-name{
                flex: 3;
                text-align: left;
                padding-left:.4rem;
                font-size:.28rem;
            }
            .sel-goods{
                @include sc(.20rem,#A1A1A1);
                i{
                    @include sc(.34rem,#A1A1A1);
                    margin-left:.1rem;
                }
            }
            .sel-con{
                 flex: 4;
                 text-align: right;
                 select{
                     width:80%;
                     @include sc(.24rem,#A1A1A1);
                     background: #fff;
                     padding-right: .2rem;
                 }
            }
        }
    }
  .purchase_detail {
    .purchase_detail_header {
      display: flex;
      justify-content: space-between;
      background: #fff;
      height: 0.8rem;
      line-height: 0.8rem;
      text-align: center;
      font-size: 16px;
      // padding: 0 0.58rem 0 0.79rem;
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
      padding:.4rem .8rem;
      margin-bottom:.1rem;
      p{
        &:nth-child(1){
          margin-bottom:.3rem;
        }
      }
      .text-info{
        @include sc(.24rem,$text_light);
        margin:.1rem 0;
      }
      .list-more{
        @include ct;
        @include sc(.28rem,#666);
        @include wh(1.5rem,.75rem);
        right:.8rem;
        text-align:center;
        em:nth-child(1){
          color:#D38888;
          line-height:.3rem;
        }
      }
    }
  }
  .cneter-con{
    padding-bottom: .8rem;
  }
</style>
