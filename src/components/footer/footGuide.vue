<template>
    <section id='foot_guide'>
        <section @click = "gotoAddress({name: 'msite'});flag=0" class="guide_item" :class="{'select-item':flag==0}">
            <div class="guide-icon iconfont icon-liubianxing"></div>
            <span>首页</span>
        </section>
        <section @click = "gotoAddress({name: 'wirehouse'});flag=1" class="guide_item" :class="{'select-item':flag==1}">
            <div class="guide-icon iconfont icon-kucun"></div>
            <span>库存</span>
        </section>
        <!-- <section @click = "gotoAddress({name: 'sale'})" class="guide_item">
            <div class="guide-icon iconfont icon-xiaoshou"></div>
            <span>销售</span>
        </section> -->
        <section @click = "gotoAddress({name: 'sensus'});flag=2" class="guide_item" :class="{'select-item':flag==2}">
            <div class="guide-icon iconfont icon-shapecopy25"></div>
            <span>统计</span>
        </section>
        <section @click = "gotoAddress({name: 'basic'});flag=3" class="guide_item" :class="{'select-item':flag==3}">
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
               flag:0 ,
               routeName:this.$route.name
            }
        },
        created(){
           switch (this.routeName) {
               case 'msite':
                    this.flag=0
                   break;
               case 'wirehouse':
                    this.flag=1
                   break;
               case 'sensus':
                    this.flag=2
                   break;
               case 'basic':
                    this.flag=3
                   break;
           
               default:
                   break;
           }
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
        // position: fixed;
        // z-index: 100;
        // left: 0;
        // right: 0;
        // bottom: 0;
        @include wh(100%, 0.98rem);
        box-sizing: border-box;
        display: flex;
        border-top:.01rem solid $green;
        box-shadow: 0 -0.026667rem 0.053333rem rgba(0,0,0,.1);
    }
    .guide_item{
    	flex: 1;
    	display: flex;
    	text-align: center;
    	flex-direction: column;
        align-items: center;
		.guide-icon{
			@include wh(.6rem, .3rem);
			margin-bottom: .05rem;
			margin-top: .2rem;
            fill: #ccc;
            color:$green;
            @include sc(.32rem, #DCDDDB);
		}
		span{
			@include sc(.28rem, #DCDDDB);
		}
    }
    .select-item{
        color:#fff;
        background: $green;
        .iconfont{
            color:#fff;
        }
        span{
            color:#fff;
        }
    }
   
</style>
