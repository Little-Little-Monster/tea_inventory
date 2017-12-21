<template>
    <div class="main">
    	<head-top signin-up='msite' goBack="" head-title="门店管理">
            <router-link v-if="!$route.query.getStore" slot="right" class="iconfont icon-jia" :to="{name:'storeOption'}"></router-link>
            <span slot="back" @click="goBack">
                <span class="save iconfont icon-fanhui"></span>
            </span>
    	</head-top>

        <div class="cneter-con paddingTop" :style="{'margin-bottom':$route.query.getStore?'1rem':''}">
            <div class="store-list list" v-for="(list,index) in storeList" ref='swipe'>
                <!-- <v-touch class="touch-con" :enabled="false"  @swipeleft="inputIndex=list.id" @swiperight="inputIndex=-1"> -->
                <left-slider :index="list.id" @swipe="swipe" @swipeRight="inputIndex=-1">
                    <span>{{list.storeName}}</span>
                    <em v-if="!$route.query.getStore&&inputIndex!=list.id" class="list-option iconfont icon-bianji" @click="$router.push({name:'storeOption',query:list})"> &nbsp;编辑</em>
                    <em v-if="$route.query.getStore&&!$route.query.single" class="list-option iconfont check-icon" :class="{'icon-radio-checked':list.selected,'icon-danxuanweizhong':!list.selected}" @click="list.selected?list.selected=false:list.selected=true"></em>
                    <em v-if="$route.query.single" class="list-option iconfont check-icon" :class="{'icon-radio-checked':singleId==list.id,'icon-danxuanweizhong':singleId!=list.id}" @click="singleId=list.id;singleName=list.storeName"></em>
                    <div  :class="{'option-con-list':!$route.query.getStore&&inputIndex==list.id,'option-none':!(!$route.query.getStore&&inputIndex==list.id)}" >
                        <span @click="deleteStore(list.id)">删除</span>
                    </div>
                </left-slider>
                <!-- </v-touch> -->
            </div>
        </div>
        <div class="bottom" v-if="$route.query.getStore" @click="pushStore">
            保存
        </div>
        <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="showAlert=false" :alertText="alertText"></alert-tip>
    </div>    
</template>
<script>
import {mapMutations,mapState} from 'vuex'
import {getStore} from 'src/config/mUtils'
import  'src/config/mUtils'
import {get_store_detail,delete_store} from 'src/service/getData'
import alertTip from '../../components/common/alertTip'
import headTop from 'src/components/header/head'
import LeftSlider from '../../components/common/slideLeft.vue';

export default {
	data(){
        return {
            userId:getStore('userInfo').id,
            storeList:null,
            storeIdList:[],
            singleId:-1,
            singleName:null,
            inputIndex:-1,
            showAlert:false,
            alertText:''
        }
    },
    created(){
        this.getStore();
        // mui.init({
        //     gestureConfig:{
        //         tap: true, //默认为true
        //         doubletap: true, //默认为false
        //         longtap: true, //默认为false
        //         swipe: true, //默认为true
        //         drag: true, //默认为true
        //         hold:false,//默认为false，不监听
        //         release:false//默认为false，不监听
        //     }
        // });
        // mui('.store-list').on('swipeleft','.store-list',function(index){
        //     console.log(87678687);
        // });
        // console.log(mui('.store-list'));
    },
    mounted(){

    },
    components: {
      headTop,alertTip,LeftSlider
    },
    computed: {
      ...mapState([
        'headTitle','customer'
      ])
    },
    methods: {
    	...mapMutations([
            'RECORD_CUSTOMER'
        ]),
        showTip(msg){
            this.alertText = msg;
            this.showAlert = true;
        },
        getStore(){
            get_store_detail(this.userId).then((res)=>{
                if(res.code==200){
                    this.storeList = res.data;
                    if(this.$route.query.getStore){
                        if(this.$route.query.worker){
                            this.storeIdList = JSON.parse(this.$route.query.worker).storeIds;
                            this.storeList.forEach(element => {
                            this.$set(element,'selected',false);
                                if(this.storeIdList){
                                    this.storeIdList.forEach(el=>{
                                        if(el.id==element.id){
                                            this.$set(element,'selected',true);
                                        }
                                    })
                                }
                            });
                        }else{
                            if(this.$route.query.fromPage=='addBalanceAccount'){
                                //结算账户选择门店
                                this.singleId = this.customer.storeId
                                this.singleName = this.customer.storeName
                            }else{
                                this.singleId = this.$route.query.id
                                this.singleName = this.$route.query.singleName
                            }
                        }
                    }
                }else{
                    this.showTip(err.mesage)
                }
                
            }).catch((err)=>{
                this.showTip(err.message)
            })
        },
        swipe(id){
            this.inputIndex=id
        },
        goBack(){
            if(this.$route.query.single){
                if(this.$route.query.fromPage=='addBalanceAccount'){
                    //结算账户选择门店
                    this.$router.push({name:this.$route.query.fromPage})
                }else{
                    //仓库选择门店
                    this.$router.push(
                        {
                            name:'addEditStorehouse',
                        }
                    )
                }
            }else if(!this.$route.query.single&&this.$route.query.getStore){
                //员工选择门店
                this.$router.push(
                    {
                        name:'workerOption',
                        query:{
                            worker:this.$route.query.worker,
                            employeeId:this.$route.query.employeeId
                        }
                    }
                )
            }else if(!this.$route.query.getStore){
                this.$router.push({name:'basic'})
            }
        },
        deleteStore(id){
            delete_store(id,2).then((res)=>{
                if(res.code==200){
                    this.getStore();
                    this.inputIndex = -1;
                    this.showTip("删除成功！")
                }else{
                    this.showTip(err.message)
                }
            }).catch((err)=>{
                this.showTip(err.message)
            })
        },
        pushStore(){
            if(this.$route.query.single){
                if(this.$route.query.fromPage=='addBalanceAccount'){
                    //结算账户选择门店
                    let account = this.customer;
                    account.storeId = this.singleId
                    account.storeName = this.singleName
                    this.RECORD_CUSTOMER(account);
                    this.$router.push({name:this.$route.query.fromPage})
                }else{
                    //仓库选择门店
                    this.$router.push(
                        {
                            name:'addEditStorehouse',
                            query:{
                                singleId:this.singleId,
                                singleName:this.singleName,
                                workerId:this.$route.query.workerId,
                                workerName:this.$route.query.workerName,
                                warehouseName:this.$route.query.warehouseName,
                                memo:this.$route.query.memo,
                                edit:this.$route.query.edit,
                                status:this.$route.query.status,
                            }
                        }
                    )
                }
            }else if(!this.$route.query.single&&this.$route.query.getStore){
                //员工选择门店
                this.storeIds=[];
                this.storeList.forEach(el=>{
                    if(el.selected){
                        this.storeIds.push({
                            id:el.id,
                            storeName:el.storeName
                        })
                    }
                }) 
                this.$router.push(
                    {
                        name:'workerOption',
                        query:{
                            worker:this.$route.query.worker,
                            storeIds:JSON.stringify(this.storeIds),
                            employeeId:this.$route.query.employeeId
                        }
                    }
                )
            }else if(!this.$route.query.getStore){
                this.$router.push({name:'basic'})
            }
            
        }

    }
  }
</script>
<style lang="scss" scoped>
    @import 'src/style/mixin';
    .check-icon{
        @include sc(.4rem,$green)
    }
    .store-list{
        span{
            @include ct;
        }
    }
    .right{
        width:20%;
        text-align: center;
        .save{
            font-size:.28rem;
            color:#fff;
            margin-left:.2rem;
        }
    }
    .save{
        font-size:.28rem;
        color:#fff;
        margin-left:.2rem;
    }

</style>
