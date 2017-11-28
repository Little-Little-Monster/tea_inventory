<template>
    <div>
    	<head-top signin-up='msite' goBack="" :headTitle="title">
            <div slot="right" v-if="queryType!='storeGoodsNum'" class="iconfont icon-jia" @click="toAddAttr"></div>
            <div slot="back" class="goback" @click="$router.push({name:'addGoods'})" >
                <span class="iconfont icon-fanhui title_text"></span>
            </div>
    	</head-top>

        <div class="cneter-con paddingTop">
            <section v-if="queryType!='storeGoodsNum'" class="title-tip">
                向左滑动,选项可编辑
            </section>
            <v-touch v-if="queryType!='storeGoodsNum'" @swipeleft="inputIndex=index;singleId=null" class="list" v-for="(list,index) in attrList">
                <span v-show="inputIndex!=index">{{list.name}}</span>
                <input type="text" class="input-attr" v-model="list.name" v-show="inputIndex==index">
                <em v-show="inputIndex!=index" class="list-option iconfont check-icon" :class="{'icon-radio-checked':singleId==list.id,'icon-danxuanweizhong':singleId!=list.id}" @click="singleId=list.id;singleName=list.name"></em>
                <em class="list-option edit-option" v-show="inputIndex==index">
                    <i class="iconfont icon-gou" @click="editAttr(list)"></i>
                    <i class="iconfont icon-cha" @click="inputIndex=-1"></i>
                </em>
            </v-touch>
            <div v-if="queryType=='storeGoodsNum'" class="list" v-for="storehouse in storehouseList">
                <span>{{storehouse.storeName}}</span>
                <div class="list-option">
                    <input type="number" min="0" step="1" placeholder="0" v-model="storehouse.quantity">
                </div>
            </div>
        </div>
        <div @click="saveAttr" class="bottom">
            保存
        </div>
        <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="showAlert=false" :alertText="alertText"></alert-tip>
    </div>    
</template>

<script>
import {mapMutations,mapState} from 'vuex'
import {getStore} from 'src/config/mUtils'
import { 
    getgoodstype,
    getgoodsbrand,
    getgoodsunit,
    savegoodstype,
    savegoodsbrand,
    savegoodsunit,
    getstorehouse
    } from 'src/service/getData'
import headTop from 'src/components/header/head'
import alertTip from '../../components/common/alertTip'

export default {
	data(){
        return {
            userId:getStore('userInfo').id,
            attrList:null,
            title:null,
            showAlert:false,
            alertText:null,
            singleId:null,
            singleName:null,
            inputIndex:-1,
            storehouseList:{}//仓库列表
        }
    },
    created(){
        this.singleId = this.storeGoodsInfo
        this.queryType = this.$route.query.type;
        if(this.queryType=='goodsBrand'){
            //选择品牌
            this.title = "选择品牌";
            this.singleId = this.storeGoodsInfo.goodsBrandId;
            getgoodsbrand(this.userId).then((res)=>{
                this.attrList = res.data;
            }).catch((err)=>{
                this.showTip(res.message)
            })
        }else if(this.queryType=='goodsType'){
            //选择分类
             this.title = "选择分类"
             this.singleId = this.storeGoodsInfo.goodsClassificationId;
             getgoodstype(this.userId).then((res)=>{
                this.attrList = res.data;
            }).catch((err)=>{
                this.showTip(res.message)
            })
        }else if(this.queryType=='storeGoodsNum'){
            //设置初始库存数量
             this.title = "设置初始库存数量";
             getstorehouse(this.userId).then((res)=>{
                 this.storehouseList = res.data;
             }).catch((err)=>{
                 this.showTip(err.message)
             })
        }else if(this.queryType=='unit'){
            //选择单位
            this.title = "选择单位"
            this.singleId = this.storeGoodsInfo.goodsUnitId;
            getgoodsunit(this.userId).then((res)=>{
                this.attrList = res.data;
            }).catch((err)=>{
                this.showTip(res.message)
            })
        }
    },
    mounted(){

    },
    components: {
        headTop,
        alertTip
    },
    computed: {
		...mapState([
			'headTitle','storeGoodsInfo'
		])
    },
    methods: {
    	...mapMutations([
            'RECORD_GOODSINFO'
        ]),
        showTip(tip){
            this.showAlert = true;
            this.alertText = tip;
        },
        editAttr(list){
            if(this.queryType=='goodsBrand'){
                //选择品牌
                savegoodsbrand(this.userId,list).then((res)=>{
                    this.showTip('修改成功！');
                }).catch((err)=>{
                    this.showTip(err.message);
                })
            }else if(this.queryType=='goodsType'){
                //选择分类
                savegoodstype(this.userId,list).then((res)=>{
                    this.showTip('修改成功！');
                }).catch((err)=>{
                    this.showTip(err.message);
                })
            }else if(this.queryType=='unit'){
                //选择单位
                savegoodsunit(this.userId,list).then((res)=>{
                    this.showTip('修改成功！');
                }).catch((err)=>{
                    this.showTip(err.message);
                })
            }
            this.inputIndex = -1;
        },
        async saveAttr(){
            this.goodsInfo = this.storeGoodsInfo;
            if(this.queryType=='goodsBrand'){
                //选择品牌
                this.goodsInfo.goodsBrandId = this.singleId
                this.goodsInfo.goodsBrandName = this.singleName
            }else if(this.queryType=='goodsType'){
                //选择分类
                this.goodsInfo.goodsClassificationId = this.singleId
                this.goodsInfo.goodsClassificationName = this.singleName
            }else if(this.queryType=='unit'){
                //选择单位
                this.goodsInfo.goodsUnitId = this.singleId
                this.goodsInfo.goodsUnitName = this.singleName
            }else{
                //仓库初始数量
                this.storehouseList.forEach(element => {
                    if(Number(element.quantity)<0){
                        this.showTip("库存不能为负数！");
                        return;
                    }
                    this.goodsInfo.warehouseStocks.push({
                        quantity:element.quantity,
                        warehouseId:element.storeId
                    })
                });
            }
            this.RECORD_GOODSINFO(this.goodsInfo);
            this.$router.push({name:"addGoods"})
        },
        toAddAttr(){
            //跳转到添加页面
            this.$router.push({name:'goodsAddAttr',query:{type:this.queryType}})
        }

    }
}

</script>

<style lang="scss" scoped>
    @import 'src/style/mixin';
    .title-tip{
        @include wh(100%,.8rem);
        line-height: .8rem;
        @include sc(.28rem,#bbb);
        padding-left:.4rem;
    }
    .input-attr{
        @include ct;
        background: #fff;
        height:.5rem;
    }
    .check-icon{
        @include sc(.4rem,$green)
    }
    .list{
        .edit-option{
            i{
                @include sc(.4rem,$green);
                margin-left: .2rem;
            }
        }
    }
    .list-option{
        right:.4rem;
        input{
            background: #fff;
            text-align: right;
            height:.4rem;
        }
    }
</style>
