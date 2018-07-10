<template>
  <div class="purchase_detail main">
    <head-top signin-up='msite' goBack="" :headTitle="$route.name=='saleBackHistory'?'销售回退历史':'销售历史'">
      <div slot="back" class="goback" @click="goBack" >
          <span class="iconfont icon-fanhui title_text"></span>
      </div>
    </head-top>
    <div class="purchase_detail_header paddingTop">
      <div class="left_button" :class="{'active':status==0}" @click="status=0;page=0;touchend=false">全部 <span></span></div>
      <div class="left_button" v-if="$route.name!='saleBackHistory'" :class="{'active':status==2}" @click="status=2;page=0;touchend=false">已销售 <span></span></div>
      <div class="left_button" v-if="$route.name=='saleBackHistory'" :class="{'active':status==2}" @click="status=2;page=0;touchend=false">已退回 <span></span></div>
      <div class="right_button" :class="{'active':status==1}" @click="status=1;page=0;touchend=false">草稿 <span></span></div>
      <div class="right_button" :class="{'active':status==3}" @click="status=3;page=0;touchend=false">撤销 <span></span></div>
    </div>
    <div class="cneter-con" v-load-more="loaderMore" type="2">
      <div style="height:auto">
        <section class="title-choose">
            <div class="search">
                <div class="search-name">客户手机号</div>
                <input  placeholder="请输入客户手机号" type="text" v-model="mobile">
            </div>
            <div class="search">
                <div class="search-name">开始日期</div>
                <input type="text" readonly="" id="time" name="input_date" :placeholder="startDate" v-model="startDate" />
                <i class=" iconfont icon-xiala2"></i>
            </div>
            <div class="search">
                <div class="search-name">结束日期</div>
                <input type="text" readonly="" id="time2" name="input_date" :placeholder="endDate" v-model="endDate" />
                <i class=" iconfont icon-xiala2"></i>
            </div>
        </section>
        <section class="total-info">
            <section>
                <span>销售总笔数</span> 
                <span>{{totalQuantity}}</span>
            </section>
            <section>
                <span>销售总金额</span> 
                <span>￥{{totalAmount.toFixed(2)}}</span> 
            </section>
        </section>
        <div class="list buy-list" v-for="history in historyList" @click="editSaleOrder(history.id)">
          <p>{{history.customerName}}</p>
          <p class="text-info">时间：{{history.createDateStr}}</p>
          <p class="text-info">客户名称：<span class="green">{{history.customerName}}</span></p>
          <p class="text-info">销售员工：<span class="green">{{history.employeeName}}</span></p>
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
      <div class="bottom" @click="getHistory">
          <i >查询</i> 
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
  import {get_sale_history} from 'src/service/getData'
  import footGuide from 'src/components/footer/footGuide'
  import {loadMore} from 'src/components/common/mixin'
  import loading from 'src/components/common/loading'
  import alertTip from '../../components/common/alertTip'
  export default {
    data(){
      return {
        enable: true,
        imgPath: 'static/images/head.png',
        userId:getStore('userInfo').id,
        startDate:'',
        endDate:'',
        totalAmount:0,
        totalQuantity:0,
        historyList:[],
        mobile:'',
        status:0,
        type:this.$route.name=='saleBackHistory'?3:2,
        page:0,
        pageSize:10,
        preventRepeatReuqest: false, //到达底部加载数据，防止重复加载
			  showBackStatus: false, //显示返回顶部按钮
			  showLoading: true, //显示加载动画
        touchend: false, //没有更多数据
        showAlert:false,
        alertText:''
      }
    },
    components: {
      headTop,
      footGuide,
      loading,
      alertTip
    },
    mixins: [loadMore],
    computed: {},
    created(){
      if(this.$route.query.status||this.$route.query.status==0){
        this.status = this.$route.query.status;
      }
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
      showTip(msg){
        this.alertText = msg;
        this.showAlert =true;
      },
      getHistory(){
        this.showLoading = true;
        get_sale_history(this.userId,this.page,this.pageSize,this.status,this.type,this.startDate,this.endDate,this.mobile).then((res)=>{
          if(res.code!=200){
            this.showTip(res.message)
          }else{
            this.historyList = res.data.info;
            this.totalAmount = res.data.totalAmount
            this.totalQuantity = res.data.total
            if (res.data.info.length < this.pageSize) {
                this.touchend = true;
              }
          }
          this.showLoading = false
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
        let res = await get_sale_history(this.userId,this.page,this.pageSize,this.status,this.type,this.startDate,this.endDate,this.mobile)
        this.showLoading = false;
        if(res.code!=200){
           this.showTip(res.message)
        }else{
          this.preventRepeatReuqest = false;
          if (res.data.info.length < this.pageSize) {
            this.touchend = true;
          }
          this.historyList = [...this.historyList,...res.data.info]
        }
      },
      editSaleOrder(id){
        this.$router.push({name:this.$route.name=='saleBackHistory'?'saleBack':'saleTrade',query:{
          edit:true,
          fromPage:this.$route.name,
          status:this.status,
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
        height:.22rem;
        background: #fff;
        margin-top: .2rem;
        &>div{
            width:100%;
            height:.7rem;
            background: #fff;
            border-bottom: 0.01rem solid $bc;
            float: left;
            text-align: center;
            position: relative;
            line-height: .7rem;
            font-size:.26rem;
            color:$text;
        }
        .search{
            display: flex;
            background: #fff;
            padding-right:.4rem;
            .search-name{
                flex: 3;
                text-align: left;
                padding-left:.4rem;
            }
            .sel-goods{
                @include sc(.28rem,#A1A1A1);
                i{
                    @include sc(.38rem,#A1A1A1);
                    margin-left:.1rem;
                }
            }
            .sel-con{
                 flex: 4;
                 text-align: right;
                 select{
                     width:80%;
                     @include sc(.28rem,#A1A1A1);
                     background: #fff;
                     padding-right: .2rem;
                 }
            }
            input{
                text-indent: .4rem;
                flex:3;
                height:.6rem;
                text-align: right;
                background: #fff;
            }
            input[type='date']{
                flex:2;
                color:#A1A1A1;
            }
        }
    }
    .total-info{
        @include wh(100%,1.5rem);
        display: flex;
        padding:.2rem .4rem;
        background:#fff;
        border-bottom: 0.01rem solid $bc;
        section{
            flex:1;
            text-align: center;
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            span{
                // width:100%;
                flex:1;
                &:nth-child(1){
                    @include sc(.28rem,$text_light)
                }
                &:nth-child(2){
                    @include sc(.34rem,#E78787 )
                }
            }
        }
    }
    .cneter-con{
      padding-bottom:.8rem;
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
      @include wh(100%,2.5rem);
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
      .green{
        color:$green;
      }
      .list-more{
        @include ct;
        @include sc(.28rem,#666);
        @include wh(1.6rem,.75rem);
        right:.8rem;
        text-align:center;
        em:nth-child(1){
          color:#D38888;
          line-height:.3rem;
        }
      }
    }
    .bottom{
        i{
            color:#fff;
        }
    }
  }
</style>
