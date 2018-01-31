<template>
    <div class="main">
    	<head-top signin-up='msite' goBack="" head-title="员工管理">
            <span  slot="right" class="iconfont icon-jia" @click="$router.push({name:'workerOption',query:{fromPage:$route.query.fromPage,getWorker:$route.query.getWorker}})"></span>
            <div slot="back" class="goback" @click="goBack" >
                <span class="iconfont icon-fanhui title_text"></span>
            </div>
    	</head-top>

        <div class="cneter-con paddingTop" :style="{'margin-bottom':$route.query.getWorker?'1rem':''}">
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
            <div class="worker-list list" v-for="list in workerList" @click="editWorker(list)" v-if="list.status==Number(isOn)">
                <left-slider :index="list.employeeId" @swipe="swipe" @swipeRight="inputIndex=-1" >
                    <span>{{list.employeeName}}</span>
                    <p class="ellipsis">所属门店：<em v-for="store in list.storeNames">{{store}},</em></p>
                    <!-- <p>最后登陆时间：<em>{{list.loginTime}}</em></p> -->
                    <p>创建时间：<em>{{list.createDate}}</em></p>
                    <em v-if="!$route.query.getWorker&&inputIndex!=list.employeeId" class="list-option iconfont icon-qianjin"></em>
                    <em v-if="$route.query.getWorker" class="list-option iconfont check-icon" :class="{'icon-radio-checked':workerId==list.employeeId,'icon-danxuanweizhong':workerId!=list.employeeId}" @click="workerId=list.employeeId;workerName=list.employeeName"></em>
                    <div  :class="{'option-con-list':!$route.query.getWorker&&inputIndex==list.employeeId,'option-none':!(!$route.query.getWorker&&inputIndex==list.employeeId)}" >
                        <span @click="deleteWorker(list.employeeId)">删除</span>
                    </div> 
                    <!-- <em v-if="!$route.query.single" class="list-option iconfont check-icon" :class="{'icon-radio-checked':list.selected,'icon-danxuanweizhong':!list.selected}" @click="list.selected?list.selected=false:list.selected=true"></em> -->
                </left-slider>
            </div>
            <p class="empty_data">没有更多了</p>
        </div>
        <div class="bottom" v-if="$route.query.getWorker" @click="save">
            保存
        </div>
         <transition name="loading">
			<loading v-show="showLoading"></loading>
		</transition>
        <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="showAlert=false" :alertText="alertText"></alert-tip>
    </div>    
</template>

<script>
import {mapMutations,mapState} from 'vuex'
import {getStore} from 'src/config/mUtils'
import {get_worker_list,delete_worker} from 'src/service/getData'
import headTop from 'src/components/header/head'
import alertTip from '../../components/common/alertTip'
import LeftSlider from '../../components/common/slideLeft.vue';
import loading from 'src/components/common/loading'
export default {
	data(){
        return {
            userId:getStore('userInfo').id,
            workerList:null,
            isOn:true,//是否启用,
            workerId:null,
            workerName:null,
            showAlert:false,
            alertText:'',
            inputIndex:-1,
            showLoading:true
        }
    },
    created(){
        if(this.$route.query.workerId){
            this.workerId = this.$route.query.workerId
            this.workerName = this.$route.query.workerName
        }
       this.getWorker()
    },
    beoreRouteLeave(to,from,next){
        if(to.name=='saleTrade'||to.name=='saleBack'){
            let saleOrder = this.buyOrder;
            saleOrder.workerId = this.workerId;
            saleOrder.workerName = this.workerName;
            this.RECORD_BUYORDER(saleOrder)
        }
        next();
    },
    mounted(){
        
    },
    components: {
    	headTop,alertTip,LeftSlider,loading
    },
    computed: {
		...mapState([
			'headTitle','buyOrder'
		])
    },
    methods: {
    	...mapMutations([
            'RECORD_BUYORDER'
        ]),
        goBack(){
            if(this.$route.query.getWorker){
                if(this.$route.query.from=='wireHouse'){
                    this.$router.push({name:'addEditStorehouse',query:{
                            workerId:this.workerId,
                            workerName:this.workerName,
                            singleId:this.$route.query.singleId,
                            singleName:this.$route.query.singleName,
                            warehouseName:this.$route.query.warehouseName,
                            memo:this.$route.query.memo,
                            edit:this.$route.query.edit,
                            status:this.$route.query.status,
                            fromPage:this.$route.query.fromPage,
                            chooseWareHouse:this.$route.query.chooseWareHouse
                    }})
                }else if(this.$route.query.fromPage){
                    this.$router.push({name:this.$route.query.fromPage})
                }
            }else if(this.$route.query.fromPage&&!this.$route.query.getWorker){
                this.$router.push({name:this.$route.query.fromPage})
            }else{
                this.$router.push({name:'basic'})
            }
        },
        getWorker(){
            this.showLoading = true;
            get_worker_list(this.userId).then((res)=>{
                if(res.code==200){
                    this.workerList = res.data;
                }else{
                    this.showTip(res.message)
                }
                this.showLoading = false;
            }).catch((err)=>{
                this.showTip(err.message)
                this.showLoading = false;
            })
        },
        swipe(id){
            this.inputIndex=id
        },
        save(){
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
                            edit:this.$route.query.edit,
                            status:this.$route.query.status,
                            fromPage:this.$route.query.fromPage,
                            chooseWareHouse:this.$route.query.chooseWareHouse
                        }
                    })
                }else if(this.$route.query.fromPage){
                    let saleOrder = this.buyOrder;
                    saleOrder.saleId = this.workerId;
                    saleOrder.saleName = this.workerName;
                    this.RECORD_BUYORDER(saleOrder)
                    this.$router.push({name:this.$route.query.fromPage})
                }
            }else{
                this.$router.push({name:'basic'})
            }
        },
        deleteWorker(id){
            this.showLoading = true;
            delete_worker(id,2).then((res)=>{
                if(res.code==200){
                    this.getWorker();
                    this.inputIndex = -1;
                    this.showTip("删除成功！")
                }else{
                    this.showTip(err.message)
                }
                this.showLoading = false;
            }).catch((err)=>{
                this.showTip(err.message)
                this.showLoading = false;
            })
        },
        showTip(msg){
            this.alertText = msg;
            this.showAlert = true;
        },
        editWorker(list){
            if(!this.$route.query.getWorker&&this.inputIndex==-1){
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
            padding-right:.5rem;
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
