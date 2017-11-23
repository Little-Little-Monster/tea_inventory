<template>
    <div>
    	<head-top signin-up='msite' goBack="true" head-title="门店管理">
            <router-link v-if="!$route.query.getStore" slot="right" class="iconfont icon-jia" :to="{name:'storeOption'}"></router-link>
            <span v-if="$route.query.getStore" slot="right" @click="pushStore">
                <span class="save">保存</span>
            </span>
    	</head-top>

        <div class="cneter-con paddingTop">
            <div class="store-list list" v-for="list in storeList">
                <span>{{list.storeName}}</span>
                <em v-if="!$route.query.getStore" class="list-option iconfont icon-bianji" @click="$router.push({name:'storeOption',query:list})"> &nbsp;编辑</em>
                <em v-if="$route.query.getStore" class="list-option iconfont check-icon" :class="{'icon-radio-checked':list.checked,'icon-danxuanweizhong':!list.checked}" @click="list.checked?list.checked=false:list.checked=true"></em>
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
            storeList:null,
            storeIdList:[]
        }
    },
    created(){
        getStoreDetail(this.userId).then((res)=>{
            this.storeList = res.data;
            if(this.$route.query.getStore){
                this.storeIdList = JSON.parse(this.$route.query.worker).storeIds;
                this.storeList.forEach(element => {
                this.$set(element,'checked',false);
                    
                    if(this.storeIdList){
                        this.storeIdList.forEach(el=>{
                            if(el.id==element.id){
                                this.$set(element,'checked',true);
                            }
                        })
                    }
                   
                });
            }
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
        pushStore(){
            this.storeIds=[];
            this.storeList.forEach(el=>{
               if(el.checked){
                   this.storeIds.push({
                       id:el.id,
                       storeName:el.storeName
                   })
               }
           }) 
           this.$router.push({name:'workerOption',query:{worker:this.$route.query.worker,storeIds:JSON.stringify(this.storeIds)}})
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
        }
    }
</style>
