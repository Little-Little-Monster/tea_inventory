<template>
    <div>
    	<head-top signin-up='msite' goBack="" head-title="员工管理">
            <router-link slot="right" class="iconfont icon-jia" :to="{name:'workerOption'}"></router-link>
            <div slot="back" class="goback" @click="$router.push({name:'basic'})" >
                <span class="iconfont icon-fanhui title_text"></span>
            </div>
    	</head-top>

        <div class="cneter-con paddingTop">
             <section class="title-choose">
                <div class="login-tit" @click="!isOn?isOn=!isOn:''">
                    <span>已启用</span>
                    <em v-if="isOn"></em>
                </div>
                <div class="regist-tit" @click="isOn?isOn=!isOn:''">
                    <span>已停用</span>
                    <em v-if="!isOn"></em>
                </div>
            </section>
            <div class="worker-list list" v-for="list in workerList" @click="$router.push({name:'workerOption',query:{employeeId:list.employeeId}})">
                <span>{{list.employeeName}}</span>
                <p>所属门店：<em>{{list.storeName}}</em></p>
                <p>最后登陆时间：<em>{{list.loginTime}}</em></p>
                <p>创建时间：<em>{{list.createDate}}</em></p>
                <em class="list-option iconfont icon-qianjin"></em>
            </div>
        </div>

    </div>    
</template>

<script>
import {mapMutations,mapState} from 'vuex'
import {getStore} from 'src/config/mUtils'
import {getWorkerList} from 'src/service/getData'
import headTop from 'src/components/header/head'

export default {
	data(){
        return {
            userId:getStore('userInfo').id,
            workerList:null,
            isOn:true//是否启用
        }
    },
    created(){
        getWorkerList(this.userId).then((res)=>{
            this.workerList = res.data;
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

        ]),

    }
}

</script>

<style lang="scss" scoped>
    @import 'src/style/mixin';
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
    .worker-list{
        @include wh(100%,2.2rem);
        span{
            @include sc(.32rem,#444);
            line-height:.9rem;
        }
        p{
            @include sc(.24rem,$text_light);
            line-height:.4rem;
        };
        p:nth-of-type(1){
            em{
                color:$text;
            }
        };
        p:nth-of-type(2){
            em{
                color:$green;
            }
        };
        p:nth-of-type(3){
            em{
                color:$green;
            }
        }
    }
</style>
