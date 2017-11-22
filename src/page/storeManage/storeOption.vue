<template>
    <div>
    	<head-top signin-up='msite' :headTitle="'添加门店'">

    	</head-top>

        <div class="cneter-con">
            <router-view></router-view>
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
