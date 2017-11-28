<template>
    <div>
    	<head-top signin-up='msite' goBack="" head-title="员工管理">
            <router-link v-if="!$route.query.getWorker" slot="right" class="iconfont icon-jia" :to="{name:'workerOption'}"></router-link>
            <div slot="back" class="goback" @click="goBack" >
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
            <div class="worker-list list" v-for="list in workerList" @click="editWorker">
                <span>{{list.employeeName}}</span>
                <p>所属门店：<em>{{list.storeName}}</em></p>
                <p>最后登陆时间：<em>{{list.loginTime}}</em></p>
                <p>创建时间：<em>{{list.createDate}}</em></p>
                <em v-if="!$route.query.getWorker" class="list-option iconfont icon-qianjin"></em>
                <em v-if="$route.query.from=='wireHouse'" class="list-option iconfont check-icon" :class="{'icon-radio-checked':workerId==list.employeeId,'icon-danxuanweizhong':workerId!=list.employeeId}" @click="workerId=list.employeeId;workerName=list.employeeName"></em>
                <!-- <em v-if="!$route.query.single" class="list-option iconfont check-icon" :class="{'icon-radio-checked':list.selected,'icon-danxuanweizhong':!list.selected}" @click="list.selected?list.selected=false:list.selected=true"></em> -->
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
            isOn:true,//是否启用,
            workerId:null,
            workerName:null
        }
    },
    created(){
        if(this.$route.query.workerId){
            this.workerId = this.$route.query.workerId
            this.workerName = this.$route.query.workerName
        }
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
        goBack(){
            if(this.$route.query.getWorker){
                if(this.$route.query.from=='wireHouse'){
                    this.$router.push({name:'addEditStorehouse',
                        query:{
                            workerId:this.workerId,
                            workerName:this.workerName,
                            singleId:this.$route.query.singleId,
                            singleName:this.$route.query.singleName,
                            warehouseName:this.$route.query.warehouseName,
                            memo:this.$route.query.memo,
                        }
                    })
                }
            }else{
                this.$router.push({name:'basic'})
            }
        },
        editWorker(){
            if(!this.$route.query.getWorker){
                this.$router.push({name:'workerOption',query:{employeeId:list.employeeId}})
            }
        }

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
    .check-icon{
        @include sc(.4rem,$green);
    }
    
</style>
