<template>
    <div>
    	<head-top signin-up='msite' goBack="" head-title="门店管理">
            <router-link v-if="!$route.query.getStore" slot="right" class="iconfont icon-jia" :to="{name:'storeOption'}"></router-link>
            <span slot="back" @click="goBack">
                <span class="save iconfont icon-fanhui"></span>
            </span>
    	</head-top>

        <div class="cneter-con paddingTop" :style="{'margin-bottom':$route.query.getStore?'1rem':''}">
            <div class="store-list list" v-for="list in storeList">
                <span>{{list.storeName}}</span>
                <em v-if="!$route.query.getStore" class="list-option iconfont icon-bianji" @click="$router.push({name:'storeOption',query:list})"> &nbsp;编辑</em>
                <em v-if="$route.query.getStore&&!$route.query.single" class="list-option iconfont check-icon" :class="{'icon-radio-checked':list.selected,'icon-danxuanweizhong':!list.selected}" @click="list.selected?list.selected=false:list.selected=true"></em>
                <em v-if="$route.query.single" class="list-option iconfont check-icon" :class="{'icon-radio-checked':singleId==list.id,'icon-danxuanweizhong':singleId!=list.id}" @click="singleId=list.id;singleName=list.storeName"></em>
            </div>
        </div>
        <div class="bottom" v-if="$route.query.getStore" @click="pushStore">
            保存
        </div>
    </div>    
</template>
<script>
import {mapMutations,mapState} from 'vuex'
import {getStore} from 'src/config/mUtils'
import {get_store_detail} from 'src/service/getData'
import headTop from 'src/components/header/head'

export default {
	data(){
        return {
            userId:getStore('userInfo').id,
            storeList:null,
            storeIdList:[],
            singleId:-1,
            singleName:null
        }
    },
    created(){
        get_store_detail(this.userId).then((res)=>{
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
                    if(this.$route.query.fromPage='addBalanceAccount'){
                        //结算账户选择门店
                        this.singleId = this.customer.storeId
                        this.singleName = this.customer.storeName
                    }else{
                        this.singleId = this.$route.query.id
                        this.singleName = this.$route.query.singleName
                    }
                }
                
            }
            // if(this.$route.query.storeList){
            //      this.storeList = JSON.parse(this.$route.query.storeList);
            // }
        }).catch((err)=>{
            console.log(err)
        })
    },
    mounted(){

    },
    components: {
      headTop,
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
                    }
                )
            }else if(!this.$route.query.getStore){
                this.$router.push({name:'basic'})
            }
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
