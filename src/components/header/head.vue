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
        color: $text;
        font-size:.38rem;
    }
    #head_top{
        background-color: #fff;
        // position: fixed;
        // z-index: 100;
        // left: 0;
        // top: 0;
        position: relative;
        @include wh(100%, 0.68rem);
        line-height: 0.68rem;
        border-bottom: .001rem solid #ccc;
    }
    .head_goback{
        left: 0.259rem;
        @include wh(0.6rem, 0.68rem);
        line-height: 0.68rem;
        margin-left: .2rem;
    }
    .head_login{
        right: 0.55rem;
        @include sc(0.65rem, $text);
        @include ct;
        .login_span{
            color: $text;
        }
        .user_avatar{
            fill: $text;
            @include wh(.8rem, .68rem);
        }
    }
    .title_head{
        @include center;
        width: 50%;
        color: $text;
        height:0.68rem;
        text-align: center;
        line-height: 0.68rem;
        .title_text{
            @include sc(0.28rem, $text);
            line-height: 0.68rem;
            text-align: center;
            display: block;
        }
    }
    .right{
        right: .1rem;
        @include ct;
        height: .6rem;
        width:.6rem;
        text-align: center;
        span{
            @include sc(0.34rem, $text);
            line-height: .5rem;
        };
        .icon-jia{
            font-size:.45rem;
        }
    }
</style>
