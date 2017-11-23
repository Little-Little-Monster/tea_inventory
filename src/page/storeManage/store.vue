<template>
    <div>
    	<head-top signin-up='msite' goBack="true" head-title="门店管理">
            <router-link slot="right" class="iconfont icon-jia" :to="{name:'storeOption'}"></router-link>
            <!-- <span slot="right" class="iconfont icon-jia" @click="addStore"></span> -->
    	</head-top>

        <div class="cneter-con paddingTop">
            <div class="store-list list" v-for="list in storeList">
                <span>{{list.storeName}}</span>
                <em class="list-option iconfont icon-bianji"> &nbsp;编辑</em>
            </div>
        </div>

    </div>    
</template>

<script>
import {mapMutations,mapState} from 'vuex'
import {getStore} from 'src/config/mUtils'
import {getStoreDetail} from 'src/service/getData'
import headTop from 'src/components/header/head'

export default {
	data(){
        return {
            userId:getStore('userInfo').id,
            storeList:null
        }
    },
    created(){
        getStoreDetail(this.userId).then((res)=>{
            this.storeList = res.data;
        }).catch((err)=>{
            console.log(err)
        })
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
</style>
