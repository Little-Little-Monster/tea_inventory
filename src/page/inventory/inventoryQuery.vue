<template>
    <div>
    	<head-top signin-up='msite' goBack="" :headTitle="$route.name=='inventoryFlow'?'库存流水':'库存查询'">
            <div slot="back" class="goback" @click="goBack" >
                <span class="iconfont icon-fanhui title_text"></span>
            </div>
    	</head-top>

        <div class="cneter-con paddingTop">
            
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
                    <input :class="{'full':searchInfo.startDate}"placeholder="请选择开始日期" type="date" v-model="searchInfo.startDate">
                </div>
                <div class="search">
                    <div class="search-name">结束日期</div>
                    <input :class="{'full':searchInfo.endDate}" placeholder="请选择结束日期" type="date" v-model="searchInfo.endDate">
                </div>
                
            </section>
            <section class="total-info">
                <section>
                    <span>总库存</span> 
                    <span>{{totalQuantity}}</span>
                </section>
                <section>
                    <span>总金额</span> 
                    <span>￥{{totalAmount}}</span> 
                </section>
            </section>
            <div v-if="$route.name!='inventoryFlow'" class="worker-list list" v-for="list in queryList">
                <span>
                    {{list.goodsName}} 
                </span>
                <p class="text-info">采购单价：<em>￥{{list.buyAmount}}</em></p>
                <p class="text-info">销售单价：<em>￥{{list.saleAmount}}</em></p>
                <em class="list-option">
                    <i class="list-sub">当前库存量</i> 
                    {{list.total}}
                </em>
            </div>
            <div v-if="$route.name=='inventoryFlow'" class="worker-list list" v-for="list in queryList">
                <span>
                    {{list.goodsName}}
                </span>
                <p class="text-info">剩余数量： <em>{{list.leftQuantity}}</em></p>
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
                    <i class="list-sub">发生数量</i> 
                    {{list.quantity}}
                </em>
            </div>
        </div>
        <div class="bottom" @click="getQuery" v-if="$route.name!='inventoryFlow'">
            <i>查询库存</i> 
        </div>
        <div class="bottom" @click="getFlower" v-if="$route.name=='inventoryFlow'">
            <i >查询流水</i> 
        </div>
        <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="showAlert=false" :alertText="alertText"></alert-tip>

    </div>    
</template>

<script>
import {mapMutations,mapState} from 'vuex'
import {getStore} from 'src/config/mUtils'
import { get_inventory_query, get_inventory_flow, get_storehouse } from 'src/service/getData'
import headTop from 'src/components/header/head'
import alertTip from '../../components/common/alertTip'

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
            
        }
    },
    created(){
        this.searchInfo.warehouseId = 0
        this.searchInfo.goodsName = ""
        this.searchInfo.startDate = ""
        this.searchInfo.endDate = ""
        this.searchInfo.page = 0
        this.searchInfo.pageSize = 100
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
        
    },
    components: {
    	headTop,alertTip
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
            get_storehouse(this.userId).then((res)=>{
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
                }
            }).catch((err)=>{
                 this.showTip(err.message)
            })
        },
        getFlower(){
            this.searchInfo.goodsId = this.goodsId;
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
                }
            }).catch((err)=>{
                 this.showTip(err.message)
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
        min-height:1rem;
        margin-bottom: 0.1rem;
        background: #fff;
        &>div{
            width:100%;
            height:1rem;
            background: #fff;
            float: left;
            margin-bottom: 0.05rem;
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
            @include sc(.34rem,#E78787);
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
        padding:.25rem .4rem;
        background:#fff;
        margin-bottom:.05rem;
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
    
</style>
