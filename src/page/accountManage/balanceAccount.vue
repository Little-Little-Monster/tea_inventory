<template>
    <div class="main">
    	<head-top signin-up='msite' goBack="" head-title="结算账户管理">
            <span  slot="right" class="iconfont icon-jia" @click="$router.push({name:'addBalanceAccount',query:{'fromPage':$route.query.fromPage,'getAccount':$route.query.getAccount}})"></span>
            <span slot="back" @click="goBack">
                <span class="save iconfont icon-fanhui"></span>
            </span>
    	</head-top>

        <div class="cneter-con paddingTop" :style="{'margin-bottom':getAccount?'1rem':''}">
            <section class="total-info">
                 <section>
                    <span>总账户数</span> 
                    <span class="green">{{accountInfo.size}}</span>
                </section>
                <section>
                    <span>总余额（仅启用）</span> 
                    <span>￥{{accountInfo.totalBalance.toFixed(2)}}</span> 
                </section>
            </section>
            <div class="balance-list" v-for="account in accountInfo.vos">
                <div class="store">
                    {{account.storeName}}
                </div>
                <div class="list-con" v-for="list in account.list" @click="toEdit(list.id)">
                    <div class="list">
                        <span>{{list.accountName}}</span> 
                        <em class="list-option" :style="{'right':getAccount?'.8rem':''}">￥{{list.balance.toFixed(2)}}</em>
                        <em v-if="getAccount" class="list-option iconfont check-icon" :class="{'icon-radio-checked':chooseId==list.id,'icon-danxuanweizhong':chooseId!=list.id}" @click="chooseId=list.id;chooseName=list.accountName"></em>
                    </div>    
                </div>
            </div>
            <p class="empty_data">没有更多了</p>
        </div>
        <div class="bottom" v-if="getAccount" @click="saveChoose">
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
import {get_balance_account_list} from 'src/service/getData'
import headTop from 'src/components/header/head'
import alertTip from '../../components/common/alertTip'
import loading from 'src/components/common/loading'

export default {
	data(){
        return {
            accountList:[],
            accountInfo:{
                totalBalance:0
            },
            userId:getStore('userInfo').id,
            showAlert:false,
            alertText:'',
            fromPage:this.$route.query.fromPage,
            getAccount:this.$route.query.getAccount,
            chooseId:-1,
            chooseName:null,
            showLoading:true
        }
    },
    created(){
        this.getAccountInfo()
        if(this.getAccount){
            switch (this.fromPage) {
                case 'buyTrade':case 'buyBack':
                    this.chooseId = this.buyOrder.settleAccountId
                    this.chooseName = this.buyOrder.settleAccountName
                    break;
                case 'saleTrade':case 'saleBack':
                    this.chooseId = this.buyOrder.settleAccountId
                    this.chooseName = this.buyOrder.settleAccountName
                    break;
            
                default:
                    break;
            }
        }
    },
    mounted(){

    },
    components: {
      headTop,alertTip,loading
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
        getAccountInfo(){
            this.showLoading = true;
            get_balance_account_list(this.userId).then((res)=>{
                if(res.code!=200){
                    this.showTip(res.message)
                }else{
                    this.accountInfo = res.data;
                }
                this.showLoading = false;
            }).catch((err)=>{
                this.showTip(err.message)
                this.showLoading = false;
            })
        },
        goBack(){
            if(this.getAccount&&this.fromPage){
                this.$router.push({name:this.fromPage})
            }else if(!this.getAccount&&this.fromPage){
                this.$router.push({name:this.fromPage})
            }else{
                this.$router.go(-1)
            }
        },
        saveChoose(){
            switch (this.fromPage) {
               case 'buyTrade':case 'buyBack':
                    let buyOrder = this.buyOrder;
                    buyOrder.settleAccountId = this.chooseId;
                    buyOrder.settleAccountName = this.chooseName;
                    this.RECORD_BUYORDER(buyOrder);
                    break;
                case 'saleTrade':case 'saleBack':
                    let saleOrder = this.buyOrder;
                    saleOrder.settleAccountId = this.chooseId;
                    saleOrder.settleAccountName = this.chooseName;
                    this.RECORD_BUYORDER(saleOrder);
                    break;
            
                default:
                    break;
            }
            this.$router.replace({name:this.fromPage})
        },
        toEdit(id){
            if(!this.getAccount){
                 this.$router.replace({name:'addBalanceAccount',query:{
                    id:id
                }})
            }
        },
        showTip(msg){
            this.showAlert = true;
            this.alertText = msg
        }   
    }
  }
</script>
<style lang="scss" scoped>
    @import 'src/style/mixin';
    .list-con{
        height:auto;
        .check-icon{
            @include sc(.4rem,$green);
            right:.2rem;
        }
    }
    .balance-list{
        height:auto;
    }
    .right{
        width:20%;
        text-align: center;
        .save{
            font-size:.28rem;
            color:#444;
            margin-left:.2rem;
        }
    }
    .save{
        font-size:.28rem;
        color:#444;
        margin-left:.2rem;
    }
    .store{
        padding:0 .4rem;
        height: 0.8rem;
        line-height:.8rem;
        @include sc(.24rem,$text_light)
    }
    .list-option{
        @include sc(.26rem,#E78787);
        right:.4rem;
        
    }
    .total-info{
        @include wh(100%,1.5rem);
        display: flex;
        padding:.35rem .4rem .2rem .4rem;
        background:#fff;
        margin-bottom:.1rem;
        section{
            flex:1;
            text-align: center;
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            span{
                // width:100%;
                flex:1;
                &:nth-child(1){
                    @include sc(.26rem,$text_light)
                }
                &:nth-child(2){
                    @include sc(.26rem,#E78787 )
                }
                &.green{
                    color:$green;
                }
            }
        }
    }

</style>
