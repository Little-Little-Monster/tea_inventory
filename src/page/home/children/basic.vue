<template>
    <div>
        <section class="user-info paddingTop">
            <div class="user-head">
                <img :src="imgPath" alt="">
            </div>
            <div class="info">
                <p>春秋茗茶</p>
                <p>{{userName}}</p>
                <!-- <span class="jiantou iconfont icon-qianjin"></span> -->
            </div>
        </section>
        <section class="option-con">
            <div class="option-list" @click="toAddress({name:'store'})">
                <span>
                    <i class="iconfont icon-mendianguanli"></i>
                    门店管理
                </span>
                <span class="jiantou iconfont icon-qianjin"></span>
            </div>
            <div class="option-list" @click="toAddress({name:'worker'})">
                <span> 
                    <i class="iconfont icon-kehuguanli"></i>
                    员工管理
                </span>
                <span class="jiantou iconfont icon-qianjin"></span>
            </div>
            <div class="option-list" @click="toAddress({name:'supplierList'})">
                <span> 
                    <i class="iconfont icon-gongyingshangguanli"></i>
                    供应商管理
                </span>
                <span class="jiantou iconfont icon-qianjin"></span>
            </div>
            <div class="option-list" @click="toAddress({name: 'storehouseList'})">
                <span>
                     <i class="iconfont icon-depot1"></i>
                     仓库管理
                </span>
                <span class="jiantou iconfont icon-qianjin"></span>
            </div>
            <div class="option-list" @click="toAddress({name: 'accountManage'})">
                <span> 
                    <i class="iconfont icon-account"></i>
                    账户管理
                </span>
                <span class="jiantou iconfont icon-qianjin"></span>
            </div>
            <!-- <div class="option-list">
                <span>短信管理</span>
                <span class="jiantou iconfont icon-qianjin"></span>
            </div> -->
            <div class="login-out" @click="loginOut">
                退出登陆
            </div>
        </section>
    </div>
</template>

<script>
import {mapMutations} from 'vuex'
import {getStore,removeAllStore} from 'src/config/mUtils'
import headTop from 'src/components/header/head'
import footGuide from 'src/components/footer/footGuide'

export default {
	data(){
        return {
			imgPath:'static/images/head.png',
            userName:getStore('userInfo').userName
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
        },
        loginOut(){
            removeAllStore();
            this.$router.push({name:"login"})
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
            position: relative;
            img{
                @include center;
                @include wh(1.5rem,1.5rem);
                // @include borderRadius(50%)
            }
        }
        .info{
            position: relative;
            float: left;
            margin-left:3%;
            @include wh(70%,100%);
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
        i{
            @include sc(.4rem,#97D4BF);
            margin-right:.2rem;
        }
    }
    .login-out{
        @include wh(80%,.8rem);
        background: #F58095;
        margin:0 auto;
        margin-top:.2rem;
        margin-bottom:.2rem;
        @include borderRadius(1rem);
        text-align: center;
        line-height: .8rem;
        @include sc(.3rem,#fff)
    }

</style>
