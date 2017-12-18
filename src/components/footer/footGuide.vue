<template>
    <section id='foot_guide'>
        <section @click = "gotoAddress({name: 'msite'})" class="guide_item">
            <div class="guide-icon iconfont icon-liubianxing"></div>
            <span>首页</span>
        </section>
        <section @click = "gotoAddress({name: 'wirehouse'})" class="guide_item">
            <div class="guide-icon iconfont icon-kucun"></div>
            <span>库存</span>
        </section>
        <!-- <section @click = "gotoAddress({name: 'sale'})" class="guide_item">
            <div class="guide-icon iconfont icon-xiaoshou"></div>
            <span>销售</span>
        </section> -->
        <section @click = "gotoAddress({name: 'sensus'})" class="guide_item">
            <div class="guide-icon iconfont icon-shapecopy25"></div>
            <span>统计</span>
        </section>
        <section @click = "gotoAddress({name: 'basic'})" class="guide_item">
            <div class="guide-icon iconfont icon-jichu"></div>
            <span>基础</span>
        </section>
    </section>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
    	data(){
            return{
                
            }
        },
        created(){
           
        },
        mounted(){
            
        },
        computed: {
            ...mapState([
                'geohash'
            ]),
        },
        methods: {
        	gotoAddress(path){
        		this.$router.push(path)
        	}
        },

    }

</script>

<style lang="scss" scoped>
    @import '../../style/mixin';

    #foot_guide{
        background-color: #fff;
        position: fixed;
        z-index: 100;
        left: 0;
        right: 0;
        bottom: 0;
        @include wh(100%, 0.98rem);
        display: flex;
        box-shadow: 0 -0.026667rem 0.053333rem rgba(0,0,0,.1);
    }
    .guide_item{
    	flex: 1;
    	display: flex;
    	text-align: center;
    	flex-direction: column;
    	align-items: center;
		.guide-icon{
			@include wh(.6rem, .4rem);
			margin-bottom: .05rem;
			margin-top: .2rem;
            fill: #ccc;
            color:$green;
		}
		span{
			@include sc(.24rem, #DCDDDB);
		}
    }
   
</style>
