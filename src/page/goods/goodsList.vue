<template>
    <div>
    	<head-top signin-up='msite' goBack="" :headTitle="headTit">
            <router-link slot="right" class="iconfont icon-jia" :to="{name:'addGoods'}"></router-link>
            <div slot="back" class="goback" @click="$router.push({name:'msite'})" >
                <span class="iconfont icon-fanhui title_text"></span>
            </div>
    	</head-top>

        <div class="cneter-con paddingTop">
            <div class="list goods-con" v-for="goods in goodsList" @click="editGoods(goods)">
                <div class="header">
                    <img :src="goods.attachmentUrl" alt="">
                </div>
                <div class="goods-detail">
                    <p>{{goods.name}}</p>
                    <p>分类：{{goods.typeName}}</p>
                    <p>售价：<em>{{goods.name}}</em></p>
                    <p>品牌：{{goods.name}}</p>
                </div>
                <em class="list-option iconfont icon-qianjin"></em>
            </div>
        </div>

    </div>    
</template>

<script>
import {mapMutations,mapState} from 'vuex'
import {getStore} from 'src/config/mUtils'
import {getgoodslist,getgoodstype} from 'src/service/getData'
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
            pageSize:10
        }
    },
    created(){
        //获取商品列表
        getgoodstype(this.userId).then((res)=>{
            res={
                "code":"200",
                "data":[
                    {
                        "children":[

                        ],
                        "id":5,
                        "name":"白茶",
                        "parentId":0
                    },
                    {
                        "children":[

                        ],
                        "id":4,
                        "name":"黑茶",
                        "parentId":0
                    },
                    {
                        "children":[

                        ],
                        "id":3,
                        "name":"普洱茶",
                        "parentId":0
                    },
                    {
                        "children":[
                            {
                                "children":[

                                ],
                                "id":13,
                                "name":"功夫红茶",
                                "parentId":2
                            },
                            {
                                "children":[

                                ],
                                "id":12,
                                "name":"功夫红茶",
                                "parentId":2
                            },
                            {
                                "children":[

                                ],
                                "id":11,
                                "name":"功夫红茶",
                                "parentId":2
                            },
                            {
                                "children":[

                                ],
                                "id":10,
                                "name":"滇红",
                                "parentId":2
                            }
                        ],
                        "id":2,
                        "name":"红茶",
                        "parentId":0
                    },
                    {
                        "children":[
                            {
                                "children":[
                                    {
                                        "children":[

                                        ],
                                        "id":9,
                                        "name":"皇茶",
                                        "parentId":6
                                    },
                                    {
                                        "children":[

                                        ],
                                        "id":8,
                                        "name":"碧螺春",
                                        "parentId":6
                                    }
                                ],
                                "id":6,
                                "name":"毛峰",
                                "parentId":1
                            }
                        ],
                        "id":1,
                        "name":"绿茶",
                        "parentId":0
                    }
                ],
                "message":"OK"
            };
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
            getgoodslist(this.userId,this.goodsClassId,this.priceFlag,this.page,this.pageSize).then((res)=>{
                // res={
                //     "code":"200",
                //     "data":{
                //         "size":5,
                //         "info":[
                //             {
                //                 "attachmentUrl":null,
                //                 "buyAmount":0.5,
                //                 "createTime":1504341649000,
                //                 "goodsBrandId":0,
                //                 "goodsClassificationId":6,
                //                 "goodsUnitId":1,
                //                 "id":1,
                //                 "idCard":"123456",
                //                 "memo":"这个是测试商品",
                //                 "modelSize":null,
                //                 "name":"毛峰180",
                //                 "saleAmount":1.5,
                //                 "status":0,
                //                 "updateTime":1504341649000
                //             },
                //             {
                //                 "attachmentUrl":null,
                //                 "buyAmount":0.5,
                //                 "createTime":1504341944000,
                //                 "goodsBrandId":0,
                //                 "goodsClassificationId":6,
                //                 "goodsUnitId":1,
                //                 "id":2,
                //                 "idCard":"123456",
                //                 "memo":"这个是测试商品",
                //                 "modelSize":null,
                //                 "name":"毛峰280",
                //                 "saleAmount":1.5,
                //                 "status":0,
                //                 "updateTime":1504341944000
                //             },
                //             {
                //                 "attachmentUrl":null,
                //                 "buyAmount":0.8,
                //                 "createTime":1507991070000,
                //                 "goodsBrandId":0,
                //                 "goodsClassificationId":6,
                //                 "goodsUnitId":1,
                //                 "id":8,
                //                 "idCard":"123489",
                //                 "memo":"这个是测试商品",
                //                 "modelSize":null,
                //                 "name":"毛峰680",
                //                 "saleAmount":1.8,
                //                 "status":0,
                //                 "updateTime":1507991070000
                //             },
                //             {
                //                 "attachmentUrl":null,
                //                 "buyAmount":0.8,
                //                 "createTime":1507991176000,
                //                 "goodsBrandId":0,
                //                 "goodsClassificationId":6,
                //                 "goodsUnitId":1,
                //                 "id":9,
                //                 "idCard":"123489",
                //                 "memo":"这个是测试商品",
                //                 "modelSize":null,
                //                 "name":"毛峰680",
                //                 "saleAmount":1.8,
                //                 "status":0,
                //                 "updateTime":1507991176000
                //             },
                //             {
                //                 "attachmentUrl":null,
                //                 "buyAmount":0.8,
                //                 "createTime":1504345402000,
                //                 "goodsBrandId":0,
                //                 "goodsClassificationId":6,
                //                 "goodsUnitId":1,
                //                 "id":7,
                //                 "idCard":"123456",
                //                 "memo":"这个是测试商品",
                //                 "modelSize":null,
                //                 "name":"毛峰380",
                //                 "saleAmount":1.8,
                //                 "status":0,
                //                 "updateTime":1504345402000
                //             }
                //         ]
                //     },
                //     "message":"OK"
                // }
                this.goodsList = res.data.info;
            }).catch((err)=>{

            })
        },
        editGoods(list){
            this.RECORD_GOODSINFO(list)
            this.$router.push({name:"addGoods"});
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
</style>
