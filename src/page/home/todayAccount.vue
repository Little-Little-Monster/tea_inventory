<template>
    <div class="main">
    	<head-top signin-up='msite' goBack="" head-title="今日结余">
            <span slot="back" @click="goBack">
                <span class="save iconfont icon-fanhui"></span>
            </span>
    	</head-top>

        <div class="cneter-con paddingTop">
            <section class="total-info">
                 <section>
                    <span>总收入</span> 
                    <span class="green">￥{{accountInfo.totalIncomeMoney.toFixed(2)}}</span>
                </section>
                <section>
                    <span>总支出</span> 
                    <span>￥{{accountInfo.totalExpendMoney.toFixed(2)}}</span> 
                </section>
                <section>
                    <span>合计</span> 
                    <span>￥{{accountInfo.totalMergeMoney.toFixed(2)}}</span> 
                </section>
            </section>
            <div class="balance-list list" v-for="account in accountList" @click="toEdit(account.id)">
                <span>{{account.settleAccountName}}</span> 
                <span>收入：<i>￥{{account.income.toFixed(2)}}</i></span>
                <span>支出：<i>￥{{account.expend.toFixed(2)}}</i></span> 
                <em class="list-option option2">
                    <i>合计</i><br>
                    ￥{{account.merge.toFixed(2)}}
                </em>
                <em class="list-option">
                    <em class="iconfont icon-qianjin"></em>
                </em>
            </div>
        </div>
        <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="showAlert=false" :alertText="alertText"></alert-tip>
    </div>    
</template>
<script>
import {mapMutations,mapState} from 'vuex'
import {getStore} from 'src/config/mUtils'
import {get_today_account} from 'src/service/getData'
import headTop from 'src/components/header/head'
import alertTip from '../../components/common/alertTip'

export default {
	data(){
        return {
            accountList:[],
            accountInfo:{},
            userId:getStore('userInfo').id,
            showAlert:false,
            alertText:'',
            fromPage:this.$route.query.fromPage,
            getAccount:this.$route.query.getAccount,
            chooseId:-1,
            chooseName:null
        }
    },
    created(){
        this.getAccountInfo()
    },
    mounted(){

    },
    components: {
      headTop,alertTip
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
            get_today_account(this.userId).then((res)=>{
                if(res.code!=200){
                    this.showTip(res.message)
                }else{
                    this.accountInfo = res.data;
                    this.accountList = this.accountInfo.vos
                }
            }).catch((err)=>{
                this.showTip(err.message)
            })
        },
        goBack(){
            this.$router.replace({name:"sensus"})
        },
        toEdit(id){
            this.$router.push({name:'todayAccountDetail',query:{
                id:id
            }})
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
    .check-icon{
        @include sc(.4rem,$green)
    }
    .balance-list{
        @include wh(100%,2rem);
        margin-bottom: .1rem;
        line-height:.5rem;
        span{
            display: block;
            height:.4rem;
            line-height:.4rem;
            @include sc(.24rem,#999);
            i{
                @include sc(.24rem,#E78787)
            }
        }
        span:nth-child(1){
            @include sc(.32rem,#444);
            height:.8rem;
            line-height:1rem;
        }
        .option2{
            right:1rem;
            @include sc(.24rem,#E78787);
            i{
                @include sc(.24rem,#999);
            }
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
    .store{
        padding:0 .4rem;
        height: 0.8rem;
        line-height:.8rem;
        @include sc(.24rem,$text_light)
    }
    // .list-option{
    //     @include sc(.34rem,#E78787);
    //     right:.4rem;
    // }
    .total-info{
        @include wh(100%,1.5rem);
        display: flex;
        padding:.25rem .4rem;
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
                    @include sc(.28rem,$text_light)
                }
                &:nth-child(2){
                    @include sc(.28rem,#E78787 )
                }
                &.green{
                    color:$green;
                }
            }
        }
    }

</style>
