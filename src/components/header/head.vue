<template>
    <header id='head_top'>
        <section class="head_goback" v-if="goBack" @click="$router.go(-1)">
            <span class="iconfont icon-fanhui title_text"></span>
        </section>
        <slot name="back"></slot>
        <section class="title_head ellipsis" v-if="headTitle">
            <span class="title_text">{{headTitle}}</span>
        </section>
        <div class="right">
            <slot name='right'></slot>
        </div>
    </header>
</template>

<script>
    import {mapState, mapActions} from 'vuex'
    export default {
    	data(){
            return{

            }
        },
        mounted(){
            //获取用户信息
            // this.getUserInfo();

        },
        props: ['signinUp', 'headTitle', 'goBack'],
        computed: {
            ...mapState([
                'userInfo'
            ]),
        },
        methods: {
            ...mapActions([
                'getUserInfo'
            ]),
        },

    }

</script>

<style lang="scss" scoped>
    @import '../../style/mixin';
    .iconfont{
        display: inline;
        color: #fff;
    }
    #head_top{
        background-color: $black;
        position: fixed;
        z-index: 100;
        left: 0;
        top: 0;
        @include wh(100%, 0.88rem);
        line-height: 0.88rem;
    }
    .head_goback{
        left: 0.359rem;
        @include wh(0.6rem, 0.88rem);
        line-height: 0.88rem;
        margin-left: .4rem;
    }
    .head_login{
        right: 0.55rem;
        @include sc(0.65rem, #fff);
        @include ct;
        .login_span{
            color: #fff;
        }
        .user_avatar{
            fill: #fff;
            @include wh(.8rem, .8rem);
        }
    }
    .title_head{
        @include center;
        width: 50%;
        color: #fff;
        height:0.88rem;
        text-align: center;
        line-height: 0.88rem;
        .title_text{
            @include sc(0.34rem, #fff);
            line-height: 0.88rem;
            text-align: center;
            display: block;
        }
    }
    .right{
        right: .2rem;
        @include ct;
        height: 100%;
        text-align: center;
        span{
            @include sc(0.34rem, #fff);
            line-height: 100%;
        };
    }
</style>
