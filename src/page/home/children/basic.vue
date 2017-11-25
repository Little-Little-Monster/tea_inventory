<template>
    <div>
        <section class="user-info paddingTop">
            <div class="user-head">
                <img :src="imgPath" alt="">
            </div>
            <div class="info">
                <p>春秋茗茶</p>
                <p>张齐论</p>
                <span class="jiantou iconfont icon-qianjin"></span>
            </div>
        </section>
        <section class="option-con">
            <div class="option-list" @click="toAddress({name:'store'})">
                <span>门店管理</span>
                <span class="jiantou iconfont icon-qianjin"></span>
            </div>
            <div class="option-list" @click="toAddress({name:'worker'})">
                <span>员工管理</span>
                <span class="jiantou iconfont icon-qianjin"></span>
            </div>
            <div class="option-list" @click="toAddress({name:'supplierList'})">
                <span>供应商管理</span>
                <span class="jiantou iconfont icon-qianjin"></span>
            </div>
            <div class="option-list" @click="toAddress({name: 'storehouseList'})">
                <span>仓库管理</span>
                <span class="jiantou iconfont icon-qianjin"></span>
            </div>
            <div class="option-list">
                <span>账户管理</span>
                <span class="jiantou iconfont icon-qianjin"></span>
            </div>
            <div class="option-list">
                <span>短信管理</span>
                <span class="jiantou iconfont icon-qianjin"></span>
            </div>
        </section>
    </div>
</template>

<script>
import {mapMutations} from 'vuex'
import {getStore} from 'src/config/mUtils'
import headTop from 'src/components/header/head'
import footGuide from 'src/components/footer/footGuide'

export default {
	data(){
        return {
			imgPath:'static/images/head.png'
        }
    },
    async beforeMount(){
        this.CHANGE_HEADER('基础')
    },
    mounted(){

    },
    components: {
    	headTop,
    	footGuide,
    },
    computed: {

    },
    methods: {
    	...mapMutations([
    		'CHANGE_HEADER'
        ]),
        toAddress(name){
            this.$router.push(name)
        }
    },
    watch: {

    }
}

</script>

<style lang="scss" scoped>
    @import 'src/style/mixin';
    .user-info{
        height: 2.2rem;
        width:100%;
        margin-bottom:.2rem;
        background: #fff;
        display: flex;

        .user-head{
            @include wh(27%,100%);
            img{
                @include center;
            }
        }
        .info{
            position: relative;
            float: left;
            @include wh(73%,100%);
            p{
                &:nth-child(1){
                    @include sc(.24rem,$text_light);
                    margin-top:.61rem;
                    margin-bottom:.34rem;
                };
                &:nth-child(2){
                    @include sc(.36rem,$text);
                    font-weight:800;
                }
            }

        }
    }
    .option-list{
        position: relative;
        height: 1.2rem;
        width:100%;
        background: #fff;
        line-height:1.2rem;
        padding-left:.4rem;
        margin-bottom:.02rem;
        .option-name{
            @include sc(.32rem,$text)
        }
    }

</style>
