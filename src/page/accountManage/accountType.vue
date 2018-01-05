<template>
    <div>
    	<head-top signin-up='msite' goBack="" head-title="账目类型管理">
            <span slot="back" @click="$router.push({name:'accountManage'})">
                <span class="save iconfont icon-fanhui"></span>
            </span>
    	</head-top>

        <div class="cneter-con paddingTop">
            <div class="store-list list" @click="$router.push({name:'balanceAccount'})">

            </div>
        </div>
    </div>    
</template>
<script>
import {mapMutations,mapState} from 'vuex'
import {getStore} from 'src/config/mUtils'
import {getaccounttype} from 'src/service/getData'
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
        getAccountType(){
           getaccounttype() 
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
            color:#444;
            margin-left:.2rem;
        }
    }
    .save{
        font-size:.28rem;
        color:#444;
        margin-left:.2rem;
    }

</style>
