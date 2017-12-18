<template>
    <div>
    	<head-top signin-up='msite' goBack="" :headTitle="headTit">
            <router-link slot="right" class="iconfont icon-jia" v-if="!isGetGoods" :to="{name:'addGoods'}"></router-link>
            <div slot="back" class="goback" @click="save" >
                <span class="iconfont icon-fanhui title_text"></span>
            </div>
    	</head-top>

        <div class="cneter-con paddingTop">
            <section class="title-choose">
                <div class="login-tit">
                    <span class="iconfont" :class="{'icon-jiantou2-copy-copy':priceFlag,'icon-jiantou1-copy-copy':!priceFlag}" @click="priceFlag?priceFlag=0:priceFlag=1;getGoods()">
                        价格
                    </span>
                </div>
                <div class="store">
                    <select v-model="goodsClassId" @change="getGoods">
                        <option value="0">选择类别</option>
                        <option :value="types.id" v-for="types in goodsType">{{types.name}}</option>
                    </select>
                </div>
            </section>
            <div class="list goods-con" v-for="goods in goodsList" @click="editGoods(goods.id)">
                <left-slider class="parentType" :index="goods.id" @swipe="swipe"  @swipeRight="inputIndex=-1">
                    <div class="header">
                        <img :src="goods.attachmentUrl" alt="">
                    </div>
                    <div class="goods-detail">
                        <p>{{goods.name}}</p>
                        <p>分类：{{goods.goodsClassificationName}}</p>
                        <p>售价：<em>{{goods.saleAmount}}</em></p>
                        <p>品牌：{{goods.goodsBrandName}}</p>
                    </div>
                    <em v-if="!isGetGoods && inputIndex!=goods.id" class="list-option iconfont icon-qianjin"></em>
                    <em v-if="isGetGoods" class="list-option iconfont check-icon" :class="{'icon-radio-checked':chooseId==goods.id,'icon-danxuanweizhong':chooseId!=goods.id}" @click="chooseId=goods.id;chooseName=goods.name"></em>
                    <div  :class="{'option-con-list':!isGetGoods&&inputIndex==goods.id,'option-none':!(!isGetGoods&&inputIndex==goods.id)}" >
                        <span>删除</span>
                    </div>
                </left-slider>
            </div>
        </div>
        <div @click="save" class="bottom" v-if="isGetGoods">
            保存
        </div>
    </div>    
</template>

<script>
import {mapMutations,mapState} from 'vuex'
import {getStore} from 'src/config/mUtils'
import {loadMore} from 'src/components/common/mixin'
import {get_goods_list,get_goods_type,get_goods_by_name} from 'src/service/getData'
import headTop from 'src/components/header/head'
import LeftSlider from '../../components/common/slideLeft.vue';

export default {
	data(){
        return {
            userId:getStore('userInfo').id,
            goodsList:null,
            headTit:'所有分类',
            goodsClassId:0,
            priceFlag:0,
            page:0,
            pageSize:10,
            isGetGoods:this.$route.query.getGoods,
            chooseId:this.$route.query.goodsId,
            chooseName:this.$route.query.goodsName,
            fromPage:this.$route.query.fromPage,
            inputIndex:-1,
            goodsType:null
        }
    },
    created(){
        //获取商品列表
        get_goods_type(this.userId).then((res)=>{
            this.goodsType = res.data;
            if(this.$route.query.goodsName){
                get_goods_by_name(this.userId,this.$route.query.goodsName).then((res)=>{
                     this.goodsList = res.data
                }).catch((err)=>{

                })
            }else{
                this.getGoods();
            }
        }).catch((err)=>{

        })
    },
    mounted(){
        
    },
    components: {
    	headTop,LeftSlider
    },
    computed: {
		...mapState([
			'headTitle'
		])
    },
    methods: {
    	...mapMutations([
            'RECORD_GOODSINFO'
        ]),
        getGoods(){
            get_goods_list(this.userId,this.goodsClassId,this.priceFlag,this.page,this.pageSize).then((res)=>{
                this.goodsList = res.data.info;
            }).catch((err)=>{

            })
        },
        save(){
            if(this.isGetGoods){
                this.$router.push({name:this.fromPage,query:{
                    goodsId:this.chooseId,
                    goodsName:this.chooseName
                }})
            }else{
                if(this.fromPage){
                     this.$router.push({name:this.fromPage})
                }else{
                    this.$router.push({name:"msite"})
                }
            }
        },
        swipe(id){
            this.inputIndex = id;
        },
        editGoods(goodsId){
            // this.RECORD_GOODSINFO(list)
            if(!this.isGetGoods&&this.inputIndex!=goodsId){
                this.$router.push({name:"addGoods",query:{edit:true,goodsId:goodsId}});
            }
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
			this.offset += 20;
			let res = await shopList(this.latitude, this.longitude, this.offset, this.restaurantCategoryId);
			this.hideLoading();
			this.shopListArr = [...this.shopListArr, ...res];
			//当获取数据小于20，说明没有更多数据，不需要再次请求数据
			if (res.length < 20) {
				this.touchend = true;
				return
			}
			this.preventRepeatReuqest = false;
		},

    }
}

</script>

<style lang="scss" scoped>
    @import 'src/style/mixin';
    .goods-con{
        @include wh(100%,2.2rem);
        padding:.2rem 0 .2rem .2rem;
    }
    .header{
        @include wh(1.8rem,100%);
        margin-right:.47rem;
        float: left;
        img{
            @include wh(1.8rem,1.8rem);
        }
    }
    .goods-detail{
        p:nth-of-type(1){
            @include sc(.32rem,$text);
        }
        p:nth-of-type(2){
            @include sc(.24rem,$text_light);
            line-height: .44rem;
        }
        p:nth-of-type(3){
            line-height: .44rem;
            @include sc(.24rem,$text_light);
        }
        p:nth-of-type(4){
            line-height: .44rem;
            @include sc(.24rem,$text_light);
        }
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
        .login-tit{
            span{
                @include sc(.28rem,$green)
            }
        }
        .store{
            width:33%;
            select{
                width:80%;
                text-align: center;
                background: #fff;
                @include sc(.28rem,$green)
                @include ct;
                right:0;
            }
        }
    }
    .check-icon{
        @include sc(.4rem,$green);
        right:.4rem;
    }
</style>
