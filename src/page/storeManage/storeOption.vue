<template>
    <div>
    	<head-top goBack="true" :headTitle="$route.query.id?'编辑门店':'添加门店'">

    	</head-top>

        <div class="cneter-con paddingTop">
            <div class="list">
                <em class="required">*</em>
                <span>名称</span>
                <input type="text" placeholder="请输入门店名称" v-model="store.storeName">
            </div>
            <div class="list">
                <span>电话</span>
                <input type="text" placeholder="请输入手机号码" v-model="store.mobile">
            </div>
            <div class="list">
                <span>地址</span>
                <input type="text" placeholder="请输入门店地址" v-model="store.address">
            </div>
        </div>
        <div class="bottom" @click="addStore">
            保存
        </div>
        <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="showAlert=false" :alertText="alertText"></alert-tip>
    </div>    
</template>

<script>
import {mapMutations,mapState} from 'vuex'
import {getStore} from 'src/config/mUtils'
import alertTip from '../../components/common/alertTip'
import {store_handel} from 'src/service/getData'
import headTop from 'src/components/header/head';
import {omit} from 'lodash'

export default {
	data(){
        return {
            store:{},
            userId:getStore('userInfo').id,
            alertText:null,
            showAlert:false
        }
    },
    created(){
        if(this.$route.query.id){
            //编辑门店，获取门店信息
            this.store = this.$route.query;
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
        addStore(){
            this.store.status=1;
            if(this.$route.query.id){
                this.store = omit(this.store,['createTime','updateTime','type']);
            }
            store_handel(this.store,this.userId).then((res)=>{
                this.$router.go(-1)
            }).catch((err)=>{
                this.alertText = err.message;
                this.showAlert = true;
            })
        }
    },
    watch: {

    }
}

</script>

<style lang="scss" scoped>
    @import 'src/style/mixin';
    .cneter-con{
        margin-bottom:0.9rem;
        .list{
            span{
                width:15%;
                display: inline-block;
            }
            input{
                @include wh(80%,100%);
                background: #fff;
                text-align: right;
            }
            .required{
                @include ct;
                left:0.1rem;
            }
        }   
    }
    .bottom{
        background: $green;
        text-align: center;
        line-height:1rem;
        color:#fff;
    }

</style>
