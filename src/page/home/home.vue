<template>
    <div>
    	<head-top signin-up='msite' :headTitle="headTitle">

    	</head-top>

    	<router-view></router-view>

    	<foot-guide></foot-guide>
    </div>    
</template>

<script>
import {mapMutations,mapState} from 'vuex'
import {getStore} from 'src/config/mUtils'
import headTop from 'src/components/header/head'
import footGuide from 'src/components/footer/footGuide'

export default {
	data(){
        return {

        }
    },
    mounted(){

    },
    components: {
    	headTop,
    	footGuide,
    },
    computed: {
		...mapState([
			'headTitle'
		])
    },
    methods: {
    	...mapMutations([
    		'RECORD_ADDRESS', 'SAVE_GEOHASH'
    	]),
    },
    watch: {

    }
}

</script>

<style lang="scss" scoped>
    @import 'src/style/mixin';

</style>
