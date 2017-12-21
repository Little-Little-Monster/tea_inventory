 <template>
    <div class="alet_container">
	    <section class="tip_text_container">
            <div class="tip_icon" v-if="!isInput">
                <span></span>
                <span></span>
            </div>
            <p class="tip_text">{{alertText}}</p>
            <slot name="inputVal"></slot>
            <div class="confrim" v-if="!isInput" @click="closeTip">确认</div>
            <div class="confrim" v-if="isInput">
                <span @click="closeTip">确认</span> 
                <span @click="cancelTip">取消</span> 
            </div>
        </section>
    </div>
</template>

<script>
    export default {
    	data(){
            return{
                positionY: 0,
                timer: null,
            }
        },
        mounted(){
      
        },
        props: ['alertText','isInput'],
        methods: {
            closeTip(){
                this.$emit('closeTip')
            },
            cancelTip(){
                this.$emit('cancelTip')
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../style/mixin';
	@keyframes tipMove{
       0%   { transform: scale(1) }
       35%  { transform: scale(.8) }
       70%  { transform: scale(1.1) }
       100% { transform: scale(1) }
    }
    .alet_container{
    	position: fixed;
    	top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 2000;
        background: rgba(50,46,72,0.59)
    }
    .tip_text_container{
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -3rem;
        margin-left: -2.5rem;
        width: 5rem;
        animation: tipMove .4s ;
        background-color: rgba(255,255,255,1);
        border: 1px;
        padding-top: .6rem;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        border: 1px;
        border-radius: 0.25rem;
        .tip_icon{
            @include wh(1rem, 1rem);
            border: 0.05rem solid #f8cb86;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            span:nth-of-type(1){
                @include wh(.04rem, .42rem);
                background-color: #f8cb86;
            }
            span:nth-of-type(2){
                @include wh(.07rem, .07rem);
                border: 1px;
                border-radius: 50%;
                margin-top: .08rem;
                background-color: #f8cb86;
            }
        }
        .tip_text{
            @include sc(.34rem, #333);
            line-height: .9rem;
            text-align: center;
            margin-top: .2rem;
            padding: 0 .4rem;
            max-height:4rem;
            overflow: auto;
        }
        .confrim{
            @include sc(.34rem, #fff);
            font-weight: bold;
            margin-top: .2rem;
            background-color: $green;
            width: 100%;
            text-align: center;
            line-height: .7rem;
            border: 1px;
            border-bottom-left-radius: 0.25rem;
            border-bottom-right-radius: 0.25rem;
            span{
                display: block;
                float: left;
                width:50%;
                height:100%;
                color:#fff;
                &:nth-child(1){
                    border-right:.01rem solid #fff;
                }
            }
        }
    }
    
</style>
