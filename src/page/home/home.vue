<template>
    <div class="main">
    	<head-top class="head" signin-up='msite' :headTitle="headTitle">

    	</head-top>

        <div class="cneter-con">
            <router-view></router-view>
        </div>

    	<foot-guide class="foot"></foot-guide>
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

<style lang="scss">
.main{
    display: flex;
    flex-direction: column;
    width:100%;
    height:100%;
    .head{
        align-self: flex-start;
        height:.98rem;
        width:100%;
    }
    .foot{
        align-self: flex-end;
        height:.98rem;
    }
}
    @import 'src/style/mixin';
    .cneter-con{
        // margin-bottom:1.2rem;
        flex:1;
        overflow: auto;
    }

</style>
