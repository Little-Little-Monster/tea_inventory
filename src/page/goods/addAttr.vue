<template>
    <div class="main">
    	<head-top signin-up='msite' goBack="" :headTitle="title">
            <div slot="back" class="goback" @click="goBackRoute" >
                <span class="iconfont icon-fanhui title_text"></span>
            </div>
    	</head-top>

        <div class="cneter-con paddingTop">
            <div class="list">
                <em class="required">*</em>
                <span>{{placeholder.substr(3)}}</span>
                <input class="list-option" type="text" :placeholder="placeholder" v-model="attr.name">
            </div>
            <div class="list" v-if="this.queryType=='goodsType'">
                <span>上级分类</span>
                <em class="list-option" v-if="!attr.parentName" @click="toType">请输入上级分类</em>
                <em class="list-option" v-if="attr.parentName" @click="toType">{{attr.parentName}}</em>
            </div>
            <div class="list memo">
                <em class="required">&nbsp;</em>
                <span>{{placeholder.substr(3,2)}}描述</span>
                <p></p>
                <textarea v-model="attr.memo" :placeholder="placeholder+'描述'"></textarea>
            </div>
        </div>
        <div class="bottom" @click="saveAttr">
            保存
        </div>
        <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="showAlert=false" :alertText="alertText"></alert-tip>
    </div>    
</template>

<script>
import {mapMutations,mapState} from 'vuex'
import {getStore} from 'src/config/mUtils'
import {
    save_goods_type,
    save_goods_brand,
    save_goods_unit
    } from 'src/service/getData'
import headTop from 'src/components/header/head'
import alertTip from '../../components/common/alertTip'

export default {
	data(){
        return {
            userId:getStore('userInfo').id,
            title:null,
            showAlert:false,
            alertText:null,
            attr:{}
        }
    },
    created(){
        this.queryType = this.$route.query.type;
        if(this.queryType=='goodsBrand'){
            //添加品牌
            this.title="添加品牌"
            this.placeholder = '请输入品牌名称'
        }else if(this.queryType=='goodsType'){
            //添加分类
            this.title="添加分类"
            this.placeholder = '请输入分类名称';
            if(this.$route.query.attr){
                this.attr = JSON.parse(this.$route.query.attr)
                // this.$set(this.attr,"parentName",this.$route.query.parentName);
                // this.$set(this.attr,"parentId",this.$route.query.parentId);
            }
        }else if(this.queryType=='unit'){
            //添加单位
            this.title="添加单位"
            this.placeholder = '请输入单位名称'
        }
    },
    mounted(){
        
    },
    components: {
    	headTop,alertTip
    },
    computed: {
		...mapState([
			'headTitle'
		])
    },
    methods: {
    	...mapMutations([

        ]),
        showTip(tip){
            this.showAlert = true;
            this.alertText = tip;
        },
        toType(){
            this.$router.push({name:'goodsAttrList',query:{
                type:'goodsType',getParent:true,
                attr:JSON.stringify(this.attr),
                fromPage:this.$route.query.fromPage,
                fromPage2:this.$route.query.fromPage2
            }})
        },
        async saveAttr(){
            if(!this.attr.name){
                this.showTip(this.placeholder);
                return;
            }
            if(this.queryType=='goodsBrand'){
                //添加品牌
                save_goods_brand(this.userId,this.attr).then((res)=>{
                    if(res.code==200){
                        this.goBackRoute()
                    }else{
                        this.showTip(res.message)
                    }
                }).catch((err)=>{
                    this.showTip(err.message)
                })
            }else if(this.queryType=='goodsType'){
                //添加分类
                save_goods_type(this.userId,this.attr).then((res)=>{
                   if(res.code==200){
                        this.goBackRoute()
                    }else{
                        this.showTip(res.message)
                    }
                }).catch((err)=>{
                    this.showTip(err.message)
                })
            }else if(this.queryType=='unit'){
                //添加单位
                save_goods_unit(this.userId,this.attr).then((res)=>{
                   if(res.code==200){
                        this.goBackRoute()
                    }else{
                        this.showTip(res.message)
                    }
                }).catch((err)=>{
                    this.showTip(err.message)
                })
            }
        },
        goBackRoute(){
            this.$router.push({name:"goodsAttrList",query:{
                type:this.queryType,
                fromPage:this.$route.query.fromPage,
                fromPage2:this.$route.query.fromPage2
            }})
        }

    }
}

</script>

<style lang="scss" scoped>
    @import 'src/style/mixin';
    .memo{
        @include wh(100%,3rem);
        textarea{
            @include wh(100%,50%);
            background:#fff;
            resize: none;
            padding-left:.2rem;
        }
    }
    input{
        height: 0.4rem;
        background: #fff;
        text-align: right;
    }
</style>
