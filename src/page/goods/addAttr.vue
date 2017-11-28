<template>
    <div>
    	<head-top signin-up='msite' goBack="" :headTitle="title">
            <div slot="back" class="goback" @click="$router.go(-1)" >
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
                <em class="required">*</em>
                <span>上级分类</span>
                <input class="list-option" type="text" placeholder="请输入上级分类" v-model="attr.parentId">
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
    savegoodstype,
    savegoodsbrand,
    savegoodsunit
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
            this.placeholder = '请输入分类名称'
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
        async saveAttr(){
            if(!this.attr.name){
                this.showTip(this.placeholder);
                return;
            }
            if(this.queryType=='goodsBrand'){
                //添加品牌
                savegoodsbrand(this.userId,this.attr).then((res)=>{
                    this.$router.go(-1)
                }).catch((err)=>{
                    this.showTip(err.message)
                })
            }else if(this.queryType=='goodsType'){
                //添加分类
                if(!this.attr.parentId){
                    this.showTip("请输入上级分类名称");
                    return;
                }
                savegoodstype(this.userId,this.attr).then((res)=>{
                    this.$router.go(-1)
                }).catch((err)=>{
                    this.showTip(err.message)
                })
            }else if(this.queryType=='unit'){
                //添加单位
                savegoodsunit(this.userId,this.attr).then((res)=>{
                    this.$router.go(-1)
                }).catch((err)=>{
                    this.showTip(err.message)
                })
            }
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
