<template>
	<view>
		<view class="title">
			<view class="status-header" :style="{ height: height + 'px'}"></view>
		</view>
		<view class="zhanwei" :style="'height:'+height+'px;'"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				height:100
			};
		},
		mounted:function(){
			// this.height = uni.getSystemInfoSync().statusBarHeight
		},
	}
</script>

<style lang="scss">
	.title{
		z-index: 9999;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		.status-header{
			width: 100%;
			// height: var(--status-bar-height);
		}
	}
	.zhanwei{
		width: 100%;
		// height: calc(80rpx + var(--status-bar-height));
	}
</style>
