<template>
    <div>
    	<head-top signin-up='msite' goBack="" head-title="账户管理">
            <span slot="back" @click="$router.push({name:'basic'})">
                <span class="save iconfont icon-fanhui"></span>
            </span>
    	</head-top>

        <div class="cneter-con paddingTop">
            <div class="store-list list" @click="$router.push({name:'balanceAccount'})">
                <span>结算账户管理</span>
                <span class="list-option iconfont icon-qianjin"></span>
            </div>
            <div class="store-list list" @click="$router.push({name:'accountType'})">
                <span>账目类型管理</span>
                <span class="list-option iconfont icon-qianjin"></span>
            </div>
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

        }
    },
    created(){
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
