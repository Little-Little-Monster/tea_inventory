<template>
	<div>
		<transition name="router-fade">
			<keep-alive>
			    <router-view v-if="$route.meta.keepAlive"></router-view>
			</keep-alive>
    	</transition>
    	<transition name="router-fade">
			<router-view v-if="!$route.meta.keepAlive"></router-view>
		</transition>
    </div>
</template>

<script>
  	export default {
    	components:{
        },
  	}

</script>

<style lang="scss">
  	@import './style/common';
	// .router-fade-enter-active {
	// 	position: relative;
	// 	right:0;
	// 	transition: all linear .2s;
	// 	-webkit-transform: translate3d(0,0,0); /*开启硬件加速*/
	// 	-webkit-backface-visibility: hidden; /*元素旋转时隐藏背面*/
	// 	-webkit-transform-style: preserve-3d; /*保留3D空间*/
	// }
	// .router-fade-enter{
	// 	position: relative;
	// 	right:100%;
	// 	// transition: all ease-out .3s;
	// 	-webkit-transform: translate3d(0,0,0); /*开启硬件加速*/
	// 	-webkit-backface-visibility: hidden; /*元素旋转时隐藏背面*/
	// 	-webkit-transform-style: preserve-3d; /*保留3D空间*/
	// }
	// .router-fade-leave-active{
	// 	position: relative;
	// 	bottom:-100%;
	// 	// transition: all ease-out .3s;
	// 	-webkit-transform: translate3d(0,0,0); /*开启硬件加速*/
	// 	-webkit-backface-visibility: hidden; /*元素旋转时隐藏背面*/
	// 	-webkit-transform-style: preserve-3d; /*保留3D空间*/
	// }
	// .router-fade-leave {
	// 	position: relative;
	// 	bottom:0;
	// 	transition: all ease-out .3s;
	// 	-webkit-transform:translate3d(0,0,0); /*开启硬件加速*/
	// 	-webkit-backface-visibility:hidden; /*元素旋转时隐藏背面*/
	// 	-webkit-transform-style: preserve-3d; /*保留3D空间*/
	// 	// transition: width ease-out .3s;
	// }
	div{
		width:100%;
		height:100%;
	}
</style>
