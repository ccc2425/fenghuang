<template>
	<view style="padding-top: 200rpx;">
		<button ref="btns" :loading="loading" :disabled="loading" type="primary" @click="showFullScreenVideoAd">显示广告</button>
	</view>
</template>

<script>
	export default {
		data() {
		  return {
			title: '全屏视频广告',
			loading: false,
			adpid:'',
		  }
		},
		onLoad(option) {
			// console.log(option)
			// this.adpid = option.adpid
			this.adpid = '1507000611'
		},
		onReady() {
		  // HBuilderX标准基座真机运行测试全屏视频广告位标识（adpid）为：1507000611
		  // adpid: 1507000611 仅用于测试，发布时需要改为广告后台（https://uniad.dcloud.net.cn/）申请的 adpid
		  // 广告后台申请的广告位(adpid)需要自定义基座/云打包/本地打包后生效
		  this.adOption = {
			adpid: this.adpid
		  };
	
			// uni.showLoading({
			// 	title:'加载中'
			// })
			// uni.hideLoading()
		  // 创建广告实例
		  this.createFullScreenVideoAd();
		},
		methods: {
		  createFullScreenVideoAd() {
			var fullScreenVideoAd = this.fullScreenVideoAd = uni.createFullScreenVideoAd(this.adOption);
			fullScreenVideoAd.onLoad(() => {
			  // 广告数据加载成功
			  this.loading = false;
			  console.log("onLoad");
			  uni.hideLoading()
			});
			fullScreenVideoAd.onClose((e) => {
			  // 用户点击了关闭或返回键(仅Android有返回键)
			  console.log("onClose " + e.isEnded);
			  uni.navigateBack()
			});
			fullScreenVideoAd.onError((err) => {
			  console.log("onError", JSON.stringify(err));
			  // 广告数据加载失败
			  this.loading = false;
			  uni.showToast({
				title: `${err.code} : ${err.errMsg}`
			  })
			  setTimeout(()=>{
				this.createFullScreenVideoAd()
			  },500)
			});
		  },
		  showFullScreenVideoAd() {
			// 调用 fullScreenVideoAd.show()，如果数据正在加载中不会显示广告，加载成功后才显示
			// 在数据没有加载成功时，需要防止用户频繁点击显示广告
			if (this.loading == true) {
			  return
			}
			this.loading = true;
			this.fullScreenVideoAd.show().then(() => {
			  this.loading = false;
			}).catch((err) => {
			  console.log(err.message);
			  this.loading = false;
			  uni.showToast({
				title: `${err.code} : ${err.errMsg}`
			  })
			});
		  }
		},
		onUnload() {
		  this.fullScreenVideoAd.destroy()
		}
	}
</script>

<style lang="scss">

</style>
