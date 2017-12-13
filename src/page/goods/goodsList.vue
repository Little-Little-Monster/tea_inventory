<template>
    <div>
    	<head-top signin-up='msite' goBack="" :headTitle="headTit">
            <router-link slot="right" class="iconfont icon-jia" v-if="!isGetGoods" :to="{name:'addGoods'}"></router-link>
            <div slot="back" class="goback" @click="save" >
                <span class="iconfont icon-fanhui title_text"></span>
            </div>
    	</head-top>

        <div class="cneter-con paddingTop">
            <div class="list goods-con" v-for="goods in goodsList" @click="editGoods(goods.id)">
                <div class="header">
                    <img :src="goods.attachmentUrl" alt="">
                </div>
                <div class="goods-detail">
                    <p>{{goods.name}}</p>
                    <p>分类：{{goods.goodsClassificationName}}</p>
                    <p>售价：<em>{{goods.saleAmount}}</em></p>
                    <p>品牌：{{goods.goodsBrandName}}</p>
                </div>
                <em v-if="!isGetGoods" class="list-option iconfont icon-qianjin"></em>
                <em v-if="isGetGoods" class="list-option iconfont check-icon" :class="{'icon-radio-checked':chooseId==goods.id,'icon-danxuanweizhong':chooseId!=goods.id}" @click="chooseId=goods.id;chooseName=goods.name"></em>

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
import {get_goods_list,get_goods_type} from 'src/service/getData'
import headTop from 'src/components/header/head'

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
        }
    },
    created(){
        //获取商品列表
        get_goods_type(this.userId).then((res)=>{
            this.goodsType = res.data;
            this.getGoods();
        }).catch((err)=>{

        })
    },
    mounted(){
        
    },
    components: {
    	headTop,
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
                this.$router.push({name:"msite"})
            }
        },
        editGoods(goodsId){
            // this.RECORD_GOODSINFO(list)
            if(!this.isGetGoods){
                this.$router.push({name:"addGoods",query:{edit:true,goodsId:goodsId}});
            }
        }

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
        }
    }
    .check-icon{
        @include sc(.4rem,$green);
        right:.4rem;
    }
</style>
