<template>
    <div class="main">
    	<head-top signin-up='msite' goBack="" :headTitle="$route.name=='inventoryFlow'?'库存流水':'库存查询'">
            <div slot="back" class="goback" @click="goBack" >
                <span class="iconfont icon-fanhui title_text"></span>
            </div>
    	</head-top>

        <div class="cneter-con paddingTop " v-load-more="loaderMore" type="2">
            <div style="height:auto">
                <section class="title-choose">
                    <div class="search" v-if="$route.name!='inventoryFlow'">
                        <div class="search-name">商品名字</div>
                        <input  placeholder="请输入商品名字" type="text" v-model="searchInfo.goodsName">
                    </div>
                    <div class="search" v-if="$route.name=='inventoryFlow'" @click="getGoods">
                        <div class="search-name">商品</div>
                        <span class="sel-goods" v-if="!goodsId">请选择商品<i class="iconfont icon-qianjin"></i></span>
                        <span class="sel-goods" v-if="goodsId">{{goodsName}}<i class="iconfont icon-qianjin"></i></span>
                    </div>
                    <div class="search">
                        <div class="search-name">仓库</div>
                        <div class="sel-con">
                            <select v-model="searchInfo.warehouseId" >
                                <option value='0'>选择仓库</option>
                                <option :value="storehouse.warehouseId" v-for="storehouse in storeHouseList">{{storehouse.warehouseName}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="search">
                        <div class="search-name">开始日期</div>
                        <input type="text" readonly="" id="time" name="input_date" :placeholder="startDate" v-model="startDate" />
                        <i class="time-xiala iconfont icon-xiala2"></i>
                    </div>
                    <div class="search">
                        <div class="search-name">结束日期</div>
                        <input type="text" readonly="" id="time2" name="input_date" :placeholder="endDate" v-model="endDate" />
                        <i class="time-xiala iconfont icon-xiala2"></i>
                    </div>
                    
                </section>
                <!-- <section class="total-info">
                    <section>
                        <span>总库存</span> 
                        <span>{{totalQuantity}}</span>
                    </section>
                    <section>
                        <span>总金额</span> 
                        <span>￥{{totalAmount.toFixed(2)}}</span> 
                    </section>
                </section> -->
                <div v-if="$route.name!='inventoryFlow'" class="worker-list list" v-for="list in queryList">
                    <div class="goods-pic">
                        <img :src="list.attachmentUrl" alt="">
                    </div>
                    <div>   
                        <span>
                            {{list.goodsName}} 
                        </span>
                        <p class="text-info">采购单价：<em>￥{{list.buyAmount}}</em></p>
                        <p class="text-info">销售单价：<em>￥{{list.saleAmount}}</em></p>
                        <em class="list-option">
                            <i class="list-sub">当前库存量</i><br>
                            <b>{{list.total}}</b><b>{{list.goodsUnitName?('/'+list.goodsUnitName):''}}</b>
                        </em>
                    </div>
                    
                </div>
                <div v-if="$route.name=='inventoryFlow'" class="worker-list list" v-for="list in queryList">
                    <span>
                        {{list.goodsName}}
                    </span>
                    <p class="text-info">库存数量： <em>{{list.leftQuantity}}</em></p>
                    <p class="text-info">创建时间： <em>{{list.createTimeStr}}</em></p>
                    <p class="text-info">类型： 
                        <em v-if="list.type==0">商品初始化</em>
                        <em v-if="list.type==1">盘点</em>
                        <em v-if="list.type==2">销售</em>
                        <em v-if="list.type==3">销售回退</em>
                        <em v-if="list.type==4">采购</em>
                        <em v-if="list.type==5">采购回退</em>
                        <em v-if="list.type==6">调拨</em>
                        <em v-if="list.type==7">采购撤销</em>
                        <em v-if="list.type==8">销售撤销</em>
                        <em v-if="list.type==9">盘点撤销</em>
                        <em v-if="list.type==10">调拨撤销</em>
                    </p>
                    <em class="list-option">
                        <i class="list-sub">发生数量</i> <br>
                        <b>
                            <em v-show="list.type==2||list.type==5||list.type==7">-</em>
                            <em v-show="list.type==4||list.type==3||list.type==8">+</em>
                            {{list.quantity}}
                        </b>
                        <b>{{list.goodsUnitName?('/'+list.goodsUnitName):''}}</b>
                    </em>
                </div>
                <p v-if="touchend" class="empty_data">没有更多了</p>
            </div>
        </div>
        <div class="bottom" @click="getQuery" v-if="$route.name!='inventoryFlow'">
            <i>查询库存</i> 
        </div>
        <div class="bottom" @click="getFlower" v-if="$route.name=='inventoryFlow'">
            <i >查询流水</i> 
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
import { get_inventory_query, get_inventory_flow, get_storehouse } from 'src/service/getData'
import headTop from 'src/components/header/head'
import alertTip from '../../components/common/alertTip'
import {loadMore} from 'src/components/common/mixin'
import loading from 'src/components/common/loading'

export default {
	data(){
        return {
            userId:getStore('userInfo').id,
            searchInfo:{},
            queryList:null,
            storeHouseList:[],
            startDate:"",
            endDate:"",
            showAlert:false,
            alertText:'',
            totalQuantity:0,
            totalAmount:0,
            goodsId:this.$route.query.goodsId?this.$route.query.goodsId:0,
            goodsName:this.$route.query.goodsName,
            page:0,
            pageSize:10,
            preventRepeatReuqest: false, //到达底部加载数据，防止重复加载
            showBackStatus: false, //显示返回顶部按钮
            showLoading: true, //显示加载动画
            touchend: false, //没有更多数据
            
        }
    },
    created(){
        this.searchInfo.warehouseId = 0
        this.searchInfo.goodsName = ""
        var date = new Date();
        var startDate =  new Date(Date.parse(date) - (86400000 * 7))

        
        this.startDate = this.formatDate(startDate)
        this.endDate = this.formatDate(date)

        this.searchInfo.startDate = this.startDate
        this.searchInfo.endDate = this.endDate
        this.searchInfo.page = this.page;
        this.searchInfo.pageSize = this.pageSize
        this.searchInfo.userId = this.userId;
        this.getStoreHouse()
        if(this.$route.name=='inventoryFlow'){
            this.searchInfo.goodsId = 0;
            this.getFlower()
        }else{
            this.getQuery()
        }
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
        getStoreHouse(){
            get_storehouse(this.userId,'').then((res)=>{
                if(res.code!=200){
                    this.showTip(res.message)
                }else{
                    this.storeHouseList = res.data;
                }
            }).catch((err)=>{
                 this.showTip(err.message)
            })
        },
        getGoods(){
            //跳转到商品列表，获取商品
            this.$router.push({name:"goodsManage",query:{
                goodsId:this.goodsId,
                goodsName:this.goodsName,
                getGoods:true,
                fromPage:this.$route.name
            }})
        },
        getQuery(){
            this.searchInfo.startDate = this.startDate
            this.searchInfo.endDate = this.endDate
             this.showLoading = true
            get_inventory_query(this.searchInfo).then((res)=>{
                if(res.code!=200){
                    this.showTip(res.message)
                }else{
                    this.queryList = res.data.info;
                    if(res.data.totalQuantity||res.data.totalQuantity==0){
                        this.totalQuantity = res.data.totalQuantity
                        this.totalAmount = res.data.totalAmount
                    }else{
                        this.totalQuantity = 0
                        this.totalAmount = 0
                    }
                    if (res.data.info.length < this.pageSize) {
                        this.touchend = true;
                    }
                    this.showLoading = false
                }
            }).catch((err)=>{
                 this.showTip(err.message);
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
            this.searchInfo.page++;
            let res
            if(this.$route.name=='inventoryFlow'){
                res = await get_inventory_flow(this.searchInfo)
            }else{
                res = await get_inventory_query(this.searchInfo)
            }
            
            this.showLoading = false;
            this.preventRepeatReuqest = false;
            if (res.data.info.length < this.pageSize) {
                this.touchend = true;
            }
            this.queryList = [...this.queryList,...res.data.info]
            this.totalQuantity = res.data.totalQuantity
            this.totalAmount = res.data.totalAmount
        },
        getFlower(){
            this.searchInfo.goodsId = this.goodsId;
            this.showLoading = true;
            get_inventory_flow(this.searchInfo).then((res)=>{
                if(res.code!=200){
                    this.showTip(res.message)
                }else{
                    this.queryList = res.data.info;
                    if(res.data.totalQuantity||res.data.totalQuantity==0){
                        this.totalQuantity = res.data.totalQuantity
                        this.totalAmount = res.data.totalAmount
                    }else{
                        this.totalQuantity = 0
                        this.totalAmount = 0
                    }
                    if (res.data.info.length < this.pageSize) {
                        this.touchend = true;
                    }
                     this.showLoading = false
                }
                this.showLoading = false;
            }).catch((err)=>{
                this.showTip(err.message)
                this.showLoading = false
            })
        },
        goBack(){
           if(this.$route.query.fromPage){
                this.$router.push({name:this.$route.query.fromPage})
            }else{
                this.$router.push({name:"wirehouse"})
            }
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
        height:4rem;
        background: #fff;
        &>div{
            width:100%;
            height:1rem;
            background: #fff;
            border-bottom: 0.01rem solid $bc;
            float: left;
            text-align: center;
            position: relative;
            line-height: 1rem;
            font-size:.32rem;
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
                text-align: right;
                background: #fff;
            }
            input[type='date']{
                flex:2;
                color:#A1A1A1;
            }
        }
    }
    .worker-list{
        @include wh(100%,2.2rem);
        margin:0;
        border-bottom: 0.02rem solid $bc;
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
        &>div{
            float: left;
            width:80%;
            padding-left:.3rem;
        }
        .goods-pic{
            width:1.2rem;
            height:100%;
            float: left;
            display: flex;
            justify-content: center;
            align-items: center;
            padding:0;
            img{
                @include wh(1.2rem,1.2rem);
                flex:1;
            }
        }
        .list-option{
            @include sc(.34rem,#E78787);
            b{
                color:#E78787;
                font-size:.24rem;
            }
            right:.4rem;
            .list-sub{
                @include sc(.24rem,$text_light);
            }
        }
    }
    .check-icon{
        @include sc(.4rem,$green);
    }
    input[type="date"]{
        background: #fff;
        text-align: right;
    }
    input[type="date"]:before{
        color:#A1A1A1;
        content:attr(placeholder);
        text-align: right;
        position: absolute;
        right: .8rem;
    }


    input[type="date"].full:before {
        color:#A1A1A1;
        display: inline;
        content:""!important;
        @include ct;
        text-align: right;
        position: absolute;
        right: .3rem;
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
    .bottom{
        i{
            color:#fff;
        }
    }
    .time-xiala{
        position: static;
    }
    
</style>
