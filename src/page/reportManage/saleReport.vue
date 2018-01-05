<template>
    <div class="main">
    	<head-top signin-up='msite' goBack="" head-title="销售报表">
            <div slot="back" class="goback" @click="goBack" >
                <span class="iconfont icon-fanhui title_text"></span>
            </div>
    	</head-top>

        <div class="cneter-con paddingTop">
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
                <div class="store">
                    <select v-model="storeId">
                        <option value="0">选择店铺</option>
                        <option :value="store.id" v-for="store in storeList">{{store.storeName}}</option>
                    </select>
                </div>
            </section>
            <section class="total-info">
                <section>
                    <span>销售量</span> 
                    <span>{{totalQuantity.toFixed(2)}}</span>
                </section>
                <section>
                    <span>总金额</span> 
                    <span>￥{{totalAmount.toFixed(2)}}</span> 
                </section>
            </section>
            <div class="worker-list list" v-for="list in reportList">
                <span>
                    {{list.goodsName}} <i class="text-info">X{{list.quantity}}</i>
                </span>
                <p class="text-info">单价：<em>￥{{list.unitAmount.toFixed(2)}}</em></p>
                <p class="text-info">销售时间：<em>{{list.bizDateStr}}</em></p>
                <em class="list-option">￥{{list.amount.toFixed(2)}}</em>
            </div>
            <p class="empty_data">没有更多了</p>
        </div>
        <div class="bottom" @click="getReport">
            查询
        </div>
        <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="showAlert=false" :alertText="alertText"></alert-tip>
        <transition name="loading">
			<loading v-show="showLoading"></loading>
		</transition>
    </div>    
</template>

<script>
import {mapMutations,mapState} from 'vuex'
import {getStore} from 'src/config/mUtils'
import {get_sale_report,get_store_detail} from 'src/service/getData'
import headTop from 'src/components/header/head'
import alertTip from '../../components/common/alertTip'
import loading from 'src/components/common/loading'

export default {
	data(){
        return {
            userId:getStore('userInfo').id,
            reportList:null,
            storeList:[],
            totalAmount:0,
            totalQuantity:0,
            startDate:"",
            endDate:"",
            storeId:0,
            showAlert:false,
            alertText:'',
            showLoading: true,
        }
    },
    created(){
        this.getStore()
        this.getReport()
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
        getStore(){
            get_store_detail(this.userId).then((res)=>{
                if(res.code!=200){
                    this.showTip(res.message)
                }else{
                    this.storeList = res.data;
                }
            }).catch((err)=>{
                 this.showTip(err.message)
            })
        },
        getReport(){
            this.showLoading = true;
            get_sale_report(this.userId,this.storeId,this.startDate,this.endDate).then((res)=>{
                if(res.code!=200){
                    this.showTip(res.message)
                }else{
                    this.reportList = res.data.vos;
                    this.totalQuantity = res.data.totalQuantity;
                    this.totalAmount = res.data.totalAmount;
                }
                this.showLoading = false;
            }).catch((err)=>{
                 this.showTip(err.message)
                 this.showLoading = false;
            })
        },
        goBack(){
            this.$router.push({name:"sensus"})
        },
        showTip(msg){
            this.alertText = msg;
            this.showAlert = true;
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
            width:33%;
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
            @include sc(.26rem,#E78787);
            right:.4rem;
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
        padding:.25rem .4rem;
        background:#fff;
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
                    @include sc(.28rem,#E78787 )
                }
            }
        }
    }
    
</style>
