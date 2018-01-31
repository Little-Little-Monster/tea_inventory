<template>
    <div class="loginContainer main" >
        <head-top :head-title="'登录'" goBack="">
            <!-- <div slot="changeLogin" class="change_login" @click="changeLoginWay">{{loginWay? "密码登录":"短信登录"}}</div> -->
        </head-top>
        <section class="title-choose">
            <div class="login-tit" @click="!isLogin?isLogin=!isLogin:''">
                <span>登陆</span>
                <em v-if="isLogin"></em>
            </div>
            <div class="regist-tit" @click="isLogin?isLogin=!isLogin:''">
                <span>注册</span>
                <em v-if="!isLogin"></em>
            </div>
        </section>
        <form class="loginForm cneter-con" @submit.prevent="mobileLogin" v-if="isLogin">
            <section class="input_container">
                <span class="iconfont icon-2shoujirenzheng"></span>
                <input type="text" placeholder="请输入手机号" v-model.lazy="userAccount">
            </section>
            <section class="input_container">
                <span class="iconfont icon-lock"></span>
                <input type="password" placeholder="请输入登陆密码"  v-model="passWord">
            </section>
            <button type="submit" class="login_container">{{loginContent}}</button>
        </form>
        <form class="loginForm" @submit.prevent="goRegist" v-if="!isLogin">
            <section class="input_container">
                <span class="iconfont icon-2shoujirenzheng"></span>
                <input type="text" placeholder="请输入手机号" v-model.lazy="mobile">
            </section>
            <section class="input_container captcha_code_container">
                <span class="iconfont icon-safe"></span>
                <input type="text" placeholder="验证码" class="code" maxlength="4" v-model="codeNumber">
                <em class="get-code" @click="getVerifyCode">
                    <i v-if="computedTime==0">获取验证码</i>
                    <i v-if="computedTime!=0">{{computedTime}}</i>
                </em>
            </section>
            <section class="input_container">
                <span class="iconfont icon-lock"></span>
                <input type="password" placeholder="请输入6位数以上密码"  v-model="newPassWord">
            </section>
             <button type="submit" class="login_container">注册</button>
        </form>
        <!-- <router-link to="/forget" class="to_forget" v-if="!loginWay">重置密码？</router-link> -->
        <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
        <!-- <transition name="loading">
			<loading v-show="showLoading"></loading>
		</transition> -->
    </div>
</template>

<script>
    import headTop from '../../components/header/head'
    import alertTip from '../../components/common/alertTip'
    import {localapi, proapi, imgBaseUrl} from 'src/config/env'
    import {getStore, setStore, removeStore} from 'src/config/mUtils'
    import md5 from "blueimp-md5";
    import {mapState, mapMutations} from 'vuex'
    import {mobile_code, checkExsis, send_login, get_captchas, account_login} from '../../service/getData'
    import loading from 'src/components/common/loading'
    export default {
        data(){
            return {
                mobile: null, //电话号码
                codeNumber: null, //短信验证码
                newPassWord:null,//注册密码

                computedTime: 0, //倒数记时
                userInfo: null, //获取到的用户信息

                userAccount: null, //登陆用户名
                passWord: null, //登录密码
                captchaCodeImg: null, //验证码地址

                showAlert: false, //显示提示组件
                alertText: null, //提示的内容
                isLogin:true,//是否是登陆

                showLoading:false,
                loginContent:'登陆',
                timer:null
            }
        },
        beforeRouteEnter: (to, from, next) => {
            if(sessionStorage.getItem('token')){
                next({path:'/home/msite'});
            }else{
                next();
            }
        },
        watch:{
            'showLoading'(showLoading){
                let _this = this
                _this.loginContent = '登陆中'
                if(showLoading){
                    _this.timer = setInterval(function(){
                        _this.loginContent = _this.loginContent + '.'
                        if(_this.loginContent=='登陆中....'){
                            _this.loginContent = '登陆中'
                        }
                    },500)
                }else{
                    // _this.loginContent = '登陆'
                    // clearInterval(_this.timer);
                }
            }
        },
        created(){

        },
        components: {
            headTop,
            alertTip,
            loading
        },
        computed: {
            //判断手机号码
            rightPhoneNumber: function (){
                return /^1\d{10}$/gi.test(this.mobile)
            }
        },
        methods: {
            ...mapMutations([
                'RECORD_USERINFO'
            ]),
            //是否显示密码
            change_passwordType(){
                this.showPassword = !this.showPassword;
            },
            //获取验证吗，线上环境使用固定的图片，生产环境使用真实的验证码
            async getCaptchaCode(){
                let res = await get_captchas();
                this.captchaCodeImg = res.code;
            },
            //获取短信验证码
            async getVerifyCode(){
                if (this.rightPhoneNumber) {
                    this.computedTime = 30;
                    this.timer = setInterval(() => {
                        this.computedTime --;
                        if (this.computedTime == 0) {
                            clearInterval(this.timer)
                        }
                    }, 1000)
                    //发送短信验证码
                    let res = await mobile_code(this.mobile);
                    if (res.message) {
                        this.showAlert = true;
                        this.alertText = res.message;
                        return
                    }
                }
            },
            //发送登录信息
            async mobileLogin(){
                if (!this.userAccount) {
                    this.showAlert = true;
                    this.alertText = '请输入手机号';
                    return
                }else if(!this.passWord){
                    this.showAlert = true;
                    this.alertText = '请输入密码';
                    return
                }
                this.showLoading = true;
                //用户名登录
                this.userInfo = await account_login(this.userAccount, md5(this.passWord));
                //如果返回的值不正确，则弹出提示框，返回的值正确则返回上一页
                this.showLoading = false;
                clearInterval(this.timer);
                if (this.userInfo.code!=200) {
                    this.showAlert = true;
                    this.alertText = this.userInfo.message;
                }else{
                    this.RECORD_USERINFO(this.userInfo.data);
                    this.$router.push({name:"msite"});
                }
            },
            //发送注册信息
            async goRegist(){
                if (!this.userAccount) {
                    this.showAlert = true;
                    this.alertText = '请输入手机号/邮箱/用户名';
                    return
                }else if(!this.passWord){
                    this.showAlert = true;
                    this.alertText = '请输入密码';
                    return
                }
                //用户名登录
                this.userInfo = await account_login(this.userAccount, this.passWord, this.codeNumber);
                
                //如果返回的值不正确，则弹出提示框，返回的值正确则返回上一页
                if (!this.userInfo.user_id) {
                    this.showAlert = true;
                    this.alertText = this.userInfo.message;
                }else{
                    this.RECORD_USERINFO(this.userInfo);
                    this.$router.go(-1);

                }
            },
            closeTip(){
                this.showAlert = false;
            }
        }
    }

</script>

<style lang="scss" scoped>
    @import '../../style/mixin';

    .loginContainer{
        // padding-top: 0.88rem;
        p, span, input{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
        background: #fff;
    }
    .title-choose{
        width:100%;
        height:1rem;
        margin-bottom: 0.1rem;
        &>div{
            width:50%;
            float: left;
            text-align: center;
            position: relative;
            line-height: 1rem;
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
    form{
        .input_container{
            height: 1.2rem;
            width:100%;
            border-bottom: 1px solid $bc;
            position: relative;
            span{
                // padding:0 .6rem 0 .5rem;
                font-size: .5rem;
                line-height: 1.2rem;
                color:$text_light;
                width:20%;
                text-align: center;
                display: inline-block;
            }
            input{
                height: 1rem;
                padding-top:0.2rem;
                background:#fff;
                line-height: 1.2rem;
                font-size:0.3rem;
                width:75%;
            }
             .get-code{
                @include wh(1.8rem,.6rem);
                i{
                    @include sc(.24rem,#fff);
                }
                display: block;
                background: $green;
                @include ct;
                text-align: center;
                line-height:.6rem;
                @include borderRadius(.2rem);
                right:.2rem;
            }
            .code{
                width:50%;
            }
        }
        .login_container{
            margin-top:1.12rem;
            width:4.5rem;
            height: 0.8rem;
            background: $green;
            @include borderRadius(.43rem);
            @include cl;
            color:#fff;
        }
    }
</style>
