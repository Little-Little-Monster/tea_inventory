<template>
    <div>

    </div>    
</template>

<script>
import {mapMutations} from 'vuex'
import {getStore} from 'src/config/mUtils'
import headTop from 'src/components/header/head'
import footGuide from 'src/components/footer/footGuide'

export default {
	data(){
        return {
			menuList:null,//菜单列表
        }
    },
    async beforeMount(){
        this.CHANGE_HEADER('销售')
    },
    mounted(){

    },
    components: {
    	headTop,
    	footGuide,
    },
    computed: {

    },
    methods: {
    	...mapMutations([
            'CHANGE_HEADER'
        ])
    },
    watch: {

    }
}

</script>

<style lang="scss" scoped>
    @import 'src/style/mixin';
	

</style>
