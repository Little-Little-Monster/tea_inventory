<template>
    <div class="main">
    	<head-top signin-up='msite' goBack="" head-title="选择客户分类">
            <router-link slot="right" class="iconfont icon-jia" :to="{name:'addCustomerType'}"></router-link>
            <span slot="back" @click="pushStore">
                <span class="save iconfont icon-fanhui"></span>
            </span>
    	</head-top>

        <div class="cneter-con paddingTop">
            <div class="store-list list" v-for="list in typeList" @click="$router.replace({name:'addCustomerType',query:{id:list.id}})">
                <span>{{list.name}}</span>
                <em class="list-option iconfont check-icon" :class="{'icon-radio-checked':chooseId==list.id,'icon-danxuanweizhong':chooseId!=list.id}" @click.stop="chooseId=list.id;chooseName=list.name"></em>
            </div>
        </div>
        <div @click="pushStore" class="bottom">
        保存
        </div>
    <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="showAlert=false" :alertText="alertText"></alert-tip>
    </div>    
</template>
<script>
import {mapMutations,mapState} from 'vuex'
import {getStore} from 'src/config/mUtils'
import {get_customer_type} from 'src/service/getData'
import headTop from 'src/components/header/head'

export default {
	data(){
        return {
            userId:getStore('userInfo').id,
            typeList:null,
            getType:this.$route.query.getType,
            chooseId:-1,
            chooseName:null,
            showAlert:'',
            alertText:''
        }
    },
    created(){
        get_customer_type(this.userId).then((res)=>{
            this.typeList = res.data;

        }).catch((err)=>{
            console.log(err)
        })
        if(this.customer.customerClassId){
            this.chooseId = this.customer.customerClassId
            this.chooseName = this.customer.customerClassName
        }
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
    beforeRouteLeave(to, from, next){
        this.pushCustomer();
        next()
    },
    methods: {
    	...mapMutations([
            'RECORD_CUSTOMER'
        ]),
        pushStore(){
            this.$router.push({name:"addCustomer"});
            this.pushCustomer()
        },
        pushCustomer(){
            let info = this.customer;
            info.customerClassId = this.chooseId
            info.customerClassName = this.chooseName
            this.RECORD_CUSTOMER(info);
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
