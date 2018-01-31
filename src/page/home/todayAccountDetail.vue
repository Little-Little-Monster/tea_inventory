<template>
    <div class="main">
    	<head-top signin-up='msite' goBack="" head-title="账户流水明细">
            <div slot="back" class="goback" @click="goBack" >
                <span class="iconfont icon-fanhui title_text"></span>
            </div>
    	</head-top>

        <div class="cneter-con paddingTop" v-load-more="loaderMore" type="2">
            <div style="height:auto">
                <section class="title-choose">
                    <div class="login-tit">
                        <input type="text" readonly="" id="time" name="input_date" placeholder="开始时间" v-model="startDate" />
                        <i class="time-xiala iconfont icon-xiala2"></i>
                    </div>
                    <div class="regist-tit">
                        <input type="text" readonly="" id="time2" name="input_date" placeholder="结束时间" v-model="endDate" />
                        <i class="time-xiala iconfont icon-xiala2"></i>
                    </div>
                </section>
                <section class="total-info">
                    <section>
                        <span>收入</span> 
                        <span>{{accountInfo.totalIncomeMoney.toFixed(2)}}</span>
                    </section>
                    <section>
                        <span>支出</span> 
                        <span>￥{{accountInfo.totalExpendMoney.toFixed(2)}}</span> 
                    </section>
                    <section>
                        <span>结余</span> 
                        <span>￥{{accountInfo.totalMergeMoney.toFixed(2)}}</span> 
                    </section>
                </section>
                <div class="worker-list list" v-for="list in accountInfo.info" @click="toDetail(list.type,list.tradeId)">
                    <span>
                        {{list.settleAccountName}}
                    </span>
                    <p class="text-info">账户余额：<em>￥{{list.surplusAmount.toFixed(2)}}</em></p>
                    <p class="text-info">操作员：<em>{{list.operatorName}}</em></p>
                    <p class="text-info">创建时间：<em>{{list.createDate}}</em></p>
                    <em class="list-option">
                        <b v-if="list.type==0||list.type==4||list.type==5">￥-</b>
                        <b v-if="list.type==1||list.type==2||list.type==3">￥+</b>
                        {{list.tradeAmount.toFixed(2)}}
                    </em>
                    <em class="list-type">{{list.typeName}}</em>
                </div>
                <p v-if="touchend" class="empty_data">没有更多了</p>
            </div>
        </div>
        <div class="bottom" @click="getAccountDetail">
            查询
        </div>
         <transition name="loading">
			<loading v-show="showLoading"></loading>
		</transition>
        <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="showAlert=false" :alertText="alertText"></alert-tip>

    </div>    
</template>

<script>
import {mapMutations,mapState} from 'vuex'
import {getStore} from 'src/config/mUtils'
import {get_today_account_detail} from 'src/service/getData'
import headTop from 'src/components/header/head'
import alertTip from '../../components/common/alertTip'
import {loadMore} from 'src/components/common/mixin'
import loading from 'src/components/common/loading'

export default {
	data(){
        return {
            userId:getStore('userInfo').id,
            startDate:"",
            endDate:"",
            pageSize:10,
            page:0,
            accountId:this.$route.query.id,
            showAlert:false,
            alertText:'',
            accountInfo:{},
            preventRepeatReuqest: false, //到达底部加载数据，防止重复加载
            showBackStatus: false, //显示返回顶部按钮
            showLoading: true, //显示加载动画
            touchend: false, //没有更多数据
        }
    },
    created(){
        this.accountInfo.totalIncomeMoney = 0;
        this.accountInfo.totalExpendMoney = 0;
        this.accountInfo.totalMergeMoney = 0;
        this.getAccountDetail()
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
    components: {
    	headTop,alertTip,loading
    },
    computed: {
		...mapState([
			'headTitle','buyOrder'
		])
    },
    methods: {
    	...mapMutations([
            'RECORD_BUYORDER'
        ]),
        getAccountDetail(){
            this.info={
                id:this.accountId,
                startDate:this.startDate,
                endDate:this.endDate,
                page:this.page,
                pageSize:this.pageSize
            }
            this.showLoading = true
            get_today_account_detail(this.info).then((res)=>{
                if(res.code!=200){
                    this.showTip(res.message)
                }else{
                    this.accountInfo = res.data;
                    if(!this.accountInfo.totalIncomeMoney){
                        this.accountInfo.totalIncomeMoney = 0;
                    }
                    if(!this.accountInfo.totalExpendMoney){
                        this.accountInfo.totalExpendMoney = 0;
                    }
                    if(!this.accountInfo.totalMergeMoney){
                        this.accountInfo.totalMergeMoney = 0;
                    }
                    if (res.data.info.length < this.pageSize) {
                        this.touchend = true;
                    }
                    this.showLoading = false
                }
            }).catch((err)=>{
                 this.showTip(err.message)
                 this.showLoading = false
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
            this.info={
                id:this.accountId,
                startDate:this.startDate,
                endDate:this.endDate,
                page:this.page,
                pageSize:this.pageSize
            }
            let res = await get_today_account_detail(this.info)
            
            this.showLoading = false;
            this.preventRepeatReuqest = false;
            if (res.data.info.length < this.pageSize) {
            this.touchend = true;
            }
            this.accountInfo.info = [...this.accountInfo.info,...res.data.info]
        },
        goBack(){
            this.$router.push({name:"todayAccount",query:{
                fromPage:this.$route.query.fromPage
            }})
        },
        showTip(msg){
            this.alertText = msg;
            this.showAlert = true;
        },
        toDetail(type,id){
            if(type!=11){
                if(type<3){
                    //购买
                    this.$router.push({name:type==1?'buyBack':'buyTrade',query:{
                        edit:true,
                        fromPage:this.$route.name,
                        id:id,
                        detailId:this.$route.query.id
                    }})
                }else if(type>=3){
                    //销售
                    this.$router.push({name:type==4?'saleBack':'saleTrade',query:{
                        edit:true,
                        fromPage:this.$route.name,
                        id:id,
                        detailId:this.$route.query.id
                    }})
                }
            }
        }

    }
}

</script>

<style lang="scss" scoped>
    @import 'src/style/mixin';
    .cneter-con{
        margin-bottom:1rem;
    }
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
            }
        }
    }
    .worker-list{
        @include wh(100%,2.2rem);
        margin-bottom:.1rem;
        span{
            @include sc(.32rem,#444);
            line-height:.9rem;
            i{
                @include sc(.24rem,$text_light);
            }
        }
        p{
            @include sc(.24rem,$text_light);
            line-height:.4rem;
        };
        p:nth-of-type(1){
            em{
                color:#E78787;
            }
        };
        p:nth-of-type(2){
            em{
                color:$green;
            }
        };
        .list-option{
            @include sc(.28rem,#E78787);
            b{
                color:#E78787;
            }
            right:.4rem;
        }
        .list-type{
            position: absolute;
            top:.2rem;
            right: .4rem;
            @include borderRadius(.6rem);
            background: $green;
            display: block;
            @include wh(1.5rem,.5rem);
            text-align: center;
            line-height: .5rem;
            @include sc(.24rem,#fff)
        }
    }
    .check-icon{
        @include sc(.4rem,$green);
    }
    input[type="date"]{
        background: #fff;
    }
    input[type="date"]:before{
        color:black;
        content:attr(placeholder);
        text-align: center;
    }


    input[type="date"].full:before {
        color:black;
        display: inline;
        content:""!important;
        @include ct;
        text-align: center;
    }
    .total-info{
        @include wh(100%,1.5rem);
        display: flex;
        padding:.20rem .4rem;
        background:#fff;
        margin-bottom:.1rem;
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
                    @include sc(.30rem,$text_light)
                }
                &:nth-child(2){
                    @include sc(.26rem,#E78787 );
                    line-height:.6rem;
                }
            }
        }
    }
    
</style>
