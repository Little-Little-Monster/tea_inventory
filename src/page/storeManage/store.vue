<template>
    <div>
    	<head-top signin-up='msite' goBack="true" head-title="门店管理">
            <span slot="right" class="iconfont icon-jia" @click="addStore"></span>
    	</head-top>

        <div class="cneter-con">
            
        </div>

    </div>    
</template>

<script>
import {mapMutations,mapState} from 'vuex'
import {getStore} from 'src/config/mUtils'
import headTop from 'src/components/header/head'

export default {
	data(){
        return {

        }
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
        addStore(){
            console.log('333')
        }
    },
    watch: {

    }
}

</script>

<style lang="scss" scoped>
    @import 'src/style/mixin';
    .cneter-con{
        margin-bottom:0.9rem;
    }

</style>
