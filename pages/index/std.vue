<template>
	<view class="page-index" :class="{'bgf':navIndex >0}">
		<!-- #ifdef H5 -->
		
		<view class="head-wrapper" :style="'top:'+statusBarHeight">
			<view class="head-menu">
				<view class='iconfont icon-xiangzuo' @click="returns"></view>
				<view class="iconfont icon-shouye4" @click="goHome"></view>
			</view>
		</view>
		<!-- #endif -->
		<!-- #ifdef MP -->
		<view class="mp-header">
			<view class="sys-head" view :style="{ height: statusBarHeight }"></view>
			<view class="serch-box" view style="height: 43px;">
				<view class="serch-wrapper flex">
					<view class="logo">
						<!-- <image class="logo" src="/static/images/crmeb.png"></image> -->
						<image :src="logoUrl" mode=""></image>
					</view>
					<navigator url="/pages/columnGoods/goods_search/index" class="input" hover-class="none"><text class="iconfont icon-xiazai5"></text>
						搜索商品</navigator>
					<!-- <navigator class="btn" url="/pages/customer_list/index?type=0" hover-class="none">
						<view class="iconfont icon-xiaoxi"></view>
						<text class="iconnum bg-color-red" v-if="userInfo.total_unread">{{userInfo.total_unread}}</text>
					</navigator> -->
				</view>
			</view>
			<tabNav class="tabNav" :tabTitle="navTop" @changeTab='changeTab'></tabNav>
		</view>
		<!-- #endif -->
		<!-- 首页展示 -->
		<view class="page_content" style="height: 100vh;" v-if="navIndex == 0">
			<!-- #ifdef MP -->
			<view class="mp-bg"></view>
			<!-- #endif -->
			<view class="main">
				<!-- 品牌好店 -->
				<view class="explosion" v-if="brandList.length">
					<view class="common-hd">
						<view class="title">实体店</view>
					</view>
					<view class="mer-box">
						<view class="mer-item" v-for="(item,index) in brandList" :key='index'>
							<view class="mer-hd" @click="goStore(item.mer_id)" style="height: 55px;">
								<image :src="item.mer_banner"></image>
								<view class="mer-name">
									<image :src="item.mer_avatar"></image>
									<view class="txt line1">{{item.mer_name}}</view>
									<view class="txt line1" style="margin-left: 20%;font-size: 12px;">点击进店</view>
								</view>
							</view>
							<!-- <view class="pro-box">
								<navigator :url="`/pages/goods_details/index?id=${itemn.product_id}`" hover-class="none" class="pro-item" v-for="(itemn,indexn) in item.recommend"
								 :key='indexn' v-if="item.recommend.length<=3">
									<image :src="itemn.image" mode=""></image>
									<view class="price">
										<text>￥</text>{{itemn.price}}
									</view>
								</navigator>
							</view> -->
						</view>
					</view>
				</view>
				

			</view>
		</view>
		<!-- 分类页 -->

		
		<!-- #ifdef MP -->
		<authorize :isAuto="isAuto" :isShowAuth="isShowAuth" @authColse="authColse" :isGoIndex="false"></authorize>
		<!-- #endif -->
	</view>
</template>

<script>
	var statusBarHeight = uni.getSystemInfoSync().statusBarHeight + 'px';
	let app = getApp();
	import {
		getUserInfo
	} from '@/api/user.js';
	import {
		getIndexData,
		getCoupons
	} from '@/api/api.js';
	// #ifdef MP-WEIXIN
	import {
		getTemlIds,
		getLiveList
	} from '@/api/api.js';
	import {
		SUBSCRIBE_MESSAGE,
		TIPS_KEY
	} from '@/config/cache';
	// #endif
 
	import {
		getShare,
		follow,
		getconfig,
	} from '@/api/public.js';

	import goodList from '@/components/goodList';
	import promotionGood from '@/components/promotionGood';
	import couponWindow from '@/components/couponWindow';
	import {
		goShopDetail
	} from '@/libs/order.js'
	import {
		mapGetters
	} from "vuex";
	import tabNav from '@/components/tabNav.vue'
	import {
		getSeckillList,
	} from '@/api/activity.js';
	import countDown from '@/components/countDown';
	import {
		getCategoryList,
		getProductslist,
		getProductHot,
        
        getScoreList,
		getShopList,
        
		storeCategory,
		storeMerchantList
	} from '@/api/store.js';
	import {
		setVisit
	} from '@/api/user.js'
	import recommend from '@/components/recommend';
	import scorelist from '@/components/scorelist';
	import shoplist from '@/components/shoplist';
	// #ifdef MP
	import authorize from '@/components/Authorize';
	// #endif
	import {
		silenceBindingSpread
	} from '@/utils';
	export default {
		computed: mapGetters(['isLogin', 'uid']),
		components: {
			tabNav,
			goodList,
			promotionGood,
			couponWindow,
			countDown,
			recommend,
			scorelist,
			shoplist,
			// #ifdef MP
			authorize
			// #endif
		},
		data() {
			return {
				ad: '',
				userInfo: '',
				loading: false,
				isAuto: false, //没有授权的不会自动授权
				isShowAuth: false, //是否隐藏授权
				statusBarHeight: statusBarHeight,
				navIndex: 0,
				navTop: [],
				subscribe: false,
				followUrl: "",
				followHid: true,
				followCode: false,
				logoUrl: app.globalData.site_logo,
				imgUrls: [],
				hot: [],
				sortList: [],
				itemNew: [],
				menus: [],
				bastInfo: '',
				fastInfo: '',
				firstInfo: '',
				firstList: [],
				salesInfo: '',
				likeInfo: [],
				benefit: [],
				indicatorDots: false,
				circular: true,
				autoplay: true,
				interval: 3000,
				duration: 500,
				window: false,
				iShidden: false,
				navH: "",
				newGoodsBananr: '',
				couponList: [],
				lovely: [],
				spikeList: [],
				combinationList: [],
				hotList: [{
					pic: '/static/images/hot_001.png'
				}, {
					pic: '/static/images/hot_002.png'
				}, {
					pic: '/static/images/hot_003.png'
				}],
				bargList: [],
				ProductNavindex: 0,
				marTop: 0,
				datatime: 0,
				childID: 0,
				loadend: false,
				loading: false,
				loadTitle: '加载更多',
				sortProduct: [],
				where: {
					pid: 0,
					page: 1,
					limit: 6,
				},
				is_switch: true,
				hostProduct: [],
				hotPage: 1,
				hotLimit: 8,
				hotScroll: false,
				hotLoading: false,
				hotTitle: '加载更多',
                
                
                hostScoreProduct: [],
                hotScorePage: 1,
                hotScoreLimit: 8,
                hotScoreScroll: false,
                hotScoreLoading: false,
                hotScoreTitle: '加载更多',
                
                
                hostShopProduct: [],
                hotShopPage: 1,
                hotShopLimit: 8,
                hotShopScroll: false,
                hotShopLoading: false,
                hotShopTitle: '加载更多',
                
                
				explosiveMoney: [],
				prodeuctTop: 0,
				pinkInfo: '',
				searchH: 0,
				isFixed: false,
				goodScroll: true, //精品推荐开关
				params: { //精品推荐分页
					page: 1,
					limit: 10,
				},
				tempArr: [], //精品推荐临时数组
				pageInfo: '', // 精品推荐全数据
				site_name: app.globalData.site_name, //首页title
				swiperCur: 0,
				brandList: []
			}
		},
		onLoad() {
			uni.getLocation({
				type: 'wgs84',
				success: function(res) {
					try {
						uni.setStorageSync('user_latitude', res.latitude);
						uni.setStorageSync('user_longitude', res.longitude);
					} catch {}
				}
			});
			let self = this
			// #ifdef MP
			// 获取小程序头部高度
			this.navH = app.globalData.navHeight;
			let info = uni.createSelectorQuery().select(".mp-header");
			info.boundingClientRect(function(data) {
				self.marTop = data.height
			}).exec()
			// #endif
			// #ifndef MP
			this.navH = 0;
			// #endif
			this.isLogin && silenceBindingSpread();
			//   
			// this.setVisit()
			
			
			Promise.all([this.getIndexConfig(), this.storeMerchant(), this.get_score_product(),this.get_host_product(),this.get_shop_product()]);
			
			
			
			
			
			// #ifdef MP
			// this.getLiveList()
			// #endif
			if (this.isLogin) {
                this.getUserInfo();
            }else{
                uni.navigateTo({
                    url: '/pages/users/login/index'
                })
            }
		},
		onShow() {
			this.getConfig()
		},

		methods: {
			// 菜单详情
			goMenuDetail(item){
				let url = this.$util.stringIntercept(item.url,0,"\?")
				if(url == '/pages/goods_cate/goods_cate'){
					let data = this.$util.stringIntercept(item.url,1,"\?")
					data = this.$util.stringIntercept(data,1,"\=")
					try {
						uni.setStorageSync('storeIndex', data);
						uni.switchTab({
							url:'/pages/goods_cate/goods_cate'
						})
					} catch (e) {}
				}else{
					uni.navigateTo({
						url:item.url
					})
				}
			},			
			getConfig(){
				// 获取配置
				getconfig().then(res => {
					let self = this
					this.logoUrl = res.data.site_logo
					this.site_name = res.data.site_name
					uni.setNavigationBarTitle({
						title: self.site_name
					})
				}).catch(err => {})
			},
			
			
			
			// 分类页更多
			bindMore() {
				console.log(this.navTop[this.navIndex])
				try {
					uni.setStorageSync('storeIndex', this.navTop[this.navIndex].pid);
					uni.switchTab({
						url:'/pages/goods_cate/goods_cate'
					})
				} catch (e) {}
			},
			// 进店
			goStore: function(id) {
				uni.navigateTo({
					url: `/pages/store/home/index?id=${id}`
				})
			},
			/**
			 * 获取个人用户信息
			 */
			getUserInfo: function() {
				let that = this;
				getUserInfo().then(res => {
					that.userInfo = res.data
				});
			},
			// 品牌好店
			storeMerchant() {
				storeMerchantList({
					page: 1,
					limit: 30,
					is_zy:0
				}).then(res => {
					this.brandList = res.data.list;
				})
			},
			// swiper
			swiperChange(e) {
				this.swiperCur = e.detail.current
			},
			// 记录会员访问
			setVisit() {
				setVisit({
					url: '/pages/index/index'
				}).then(res => {
					console.log(res)
				})
			},
			// 导航分类切换
			changeTab(e) {
				this.navIndex = e.index;
				if (e.index > 0) {
					storeCategory({
						pid: e.pid
					}).then(res => {
						this.sortList = res.data;
					});
					this.where.pid = e.pid;
					this.where.page = 1;
					this.loadend = false;
					this.loading = false;
					this.sortProduct = [];
					this.get_product_list();
				}
			},
			//分类产品
			get_product_list: function() {
				console.log(123);
				let that = this;
				if (that.loadend) return;
				if (that.loading) return;
				that.loading = true;
				that.loadTitle = '';
				getProductslist(that.where).then(res => {
					let list = res.data.list;
					let productList = that.$util.SplitArray(list, that.sortProduct);
					let loadend = list.length < that.where.limit;
					that.loadend = loadend;
					that.loading = false;
					that.loadTitle = loadend ? '已全部加载' : '加载更多';
					that.$set(that, 'sortProduct', productList);
					that.$set(that.where, 'page', that.where.page + 1);
				}).catch(err => {
					that.loading = false;
					that.loadTitle = '加载更多';
				});
			},
			/**
			 * 获取我的推荐
			 */
			get_host_product: function() {
				let that = this;
				let num = that.hotLimit
				if (that.hotScroll) return;
				if (that.hotLoading) return;
				that.hotLoading = true;
				that.hotTitle = '';
				getProductHot(
					that.hotPage,
					that.hotLimit,
				).then(res => {
					let list = res.data.list;
					let productList = that.$util.SplitArray(list, that.hostProduct);
					let hotScroll = list.length <= num;
					that.hotScroll = hotScroll;
					that.hotLoading = false;
					that.hotTitle = hotScroll ? '已全部加载' : '加载更多';
					that.$set(that, 'hostProduct', productList);
					that.$set(that, 'hotPage', that.hotPage + 1);
				});
			},
            // 后退
            returns: function() {
            	uni.navigateBack()
            },
            // 首页
            goHome(){
            	uni.switchTab({
            	    url: '/pages/index/index'
            	});
            },
            get_score_product: function() {
            	let that = this;
            	let num = that.hotScoreLimit
                console.log(1111)
            	if (that.hotScoreScroll) return;
            	if (that.hotScoreLoading) return;
            	that.hotScoreLoading = true;
            	that.hotScoreTitle = '';
                console.log(222)
            	getScoreList(
            		that.hotScorePage,
            		that.hotScoreLimit,
            	).then(res => {
            		let list = res.data.list;
                    console.log(that.hostScoreProduct)
                    console.log(that.hostScoreProduct.length)
            		// let productScoreList = that.$util.SplitArray(list, that.hostScoreProduct);
                    let productScoreList = list
                    console.log(that.hostScoreProduct)
                    console.log(productScoreList)
            		let hotScoreScroll = list.length <= num;
            		that.hotScoreScroll = hotScoreScroll;
            		that.hotScoreLoading = false;
            		that.hotScoreTitle = hotScoreScroll ? '已全部加载' : '加载更多';
                    console.log(productScoreList)
            		that.$set(that, 'hostScoreProduct', productScoreList);
            		that.$set(that, 'hotScorePage', that.hotScorePage + 1);
            	});
            },
            get_shop_product: function() {
            	let that = this;
            	let num = that.hotShopLimit
            	if (that.hotShopScroll) return;
            	if (that.hotShopLoading) return;
            	that.hotShopLoading = true;
            	that.hotShopTitle = '';
            	getShopList(
            		that.hotShopPage,
            		that.hotShopLimit,
            	).then(res => {
            		let list = res.data.list;
                    console.log(list)
            		// let productShopList = that.$util.SplitArray(list, that.hostShopProduct);
            		let productShopList = list;
                    console.log(productShopList)
            		let hotShopScroll = list.length <= num;
            		that.hotShopScroll = hotShopScroll;
            		that.hotShopLoading = false;
            		that.hotShopTitle = hotShopScroll ? '已全部加载' : '加载更多';
            		that.$set(that, 'hostShopProduct', productShopList);
            		that.$set(that, 'hotShopPage', that.hotShopPage + 1);
            	});
            },
            

			// 首页数据
			getIndexConfig: function() {
				let that = this;
				getIndexData().then(res => {
					that.$set(that, "imgUrls", res.data.banner);
					that.$set(that, "menus", res.data.menu);
					that.$set(that, "hot", res.data.hot);
					that.$set(that, "ad", res.data.ad);
					res.data.category.unshift({
						'cate_name': '首页'
					})
					that.$set(that, "navTop", res.data.category);


					that.lovely = res.data.lovely
					that.$set(that, "pageInfo", res.data)
					that.$set(that, "likeInfo", res.data.likeInfo);
					that.$set(that, "benefit", res.data.benefit);
					that.explosiveMoney = res.data.explosive_money
					// #ifdef H5
					that.subscribe = res.data.subscribe;
					// #endif
					// 小程序判断用户是否授权；
					// #ifdef MP
					uni.getSetting({
						success(res) {
							if (!res.authSetting['scope.userInfo']) {
								that.window = that.couponList.length ? true : false;
							} else {
								that.window = false;
								that.iShidden = true;
							}
						}
					});
					// #endif
					// #ifndef MP
					if (that.isLogin) {
						that.window = false;
					} else {
						that.window = that.couponList.length ? true : false;
					}
					// #endif
				})
			},
			// 砍价详情
			bargDetail(item) {
				if (!this.isLogin) {
					// #ifdef H5
					uni.showModal({
						title: '提示',
						content: '您未登陆，请登陆！',
						success: function(res) {
							if (res.confirm) {
								uni.navigateTo({
									url: '/pages/users/login/index'
								})
							} else if (res.cancel) {}
						}
					})
					// #endif
					// #ifdef MP
					this.$set(this, 'isAuto', true);
					this.$set(this, 'isShowAuth', true);
					// #endif
				} else {
					uni.navigateTo({
						url: `/pages/activity/goods_bargain_details/index?id=${item.id}&bargain=${this.uid}`
					})
				}
			},
			// 授权关闭
			authColse: function(e) {
				this.isShowAuth = e
			},
			// 首发新品详情
			goDetail(item) {
				if (item.activity && item.activity.type === "2" && !this.isLogin) {
					// #ifdef H5
					uni.showModal({
						title: '提示',
						content: '您未登陆，请登陆！',
						success: function(res) {
							if (res.confirm) {
								uni.navigateTo({
									url: '/pages/users/login/index'
								})
							} else if (res.cancel) {}
						}
					})
					// #endif
					// #ifdef MP
					this.$set(this, 'isAuto', true);
					this.$set(this, 'isShowAuth', true);
					// #endif
					return
				} else {
					goShopDetail(item, this.uid).then(res => {
						uni.navigateTo({
							url: `/pages/goods_details/index?id=${item.id}`
						})
					})
				}
			},
			// 分类详情
			godDetail(item) {
				goShopDetail(item, this.uid).then(res => {
					uni.navigateTo({
						url: `/pages/goods_details/index?id=${item.id}`
					})
				})
			},
			// 直播
			getLiveList: function() {
				getLiveList(1, 20).then(res => {
					this.liveList = res.data
				}).catch(res => {

				})
			},
		},
		mounted() {
			let self = this
			// #ifdef H5
			// 获取H5 搜索框高度
			let appSearchH = uni.createSelectorQuery().select(".serch-wrapper");
			appSearchH.boundingClientRect(function(data) {
				self.searchH = data.height
			}).exec()
			// #endif
		},
		// 滚动到底部
		onReachBottom() {
			if (this.navIndex == 0) {
				// 首页加载更多
				this.get_host_product();
			} else {
				// 分类栏目加载更多
				if (this.sortProduct.length > 0) {
					this.get_product_list();
				} else {
					this.get_host_product();
				}
			}
		},
		// 滚动监听
		onPageScroll(e) {
			let self = this
			if (e.scrollTop >= self.searchH) {
				self.isFixed = true
			} else {
				self.isFixed = false
			}
		}
	}
</script>
<style>
	page {
		display: flex;
		flex-direction: column;
		height: 100%;
		/* #ifdef H5 */
		background-color: #fff;
		/* #endif */

	}
</style>
<style lang="scss">
	/deep/.spike-box .styleAll {
		display: inline-block;
		width: 44rpx;
		height: 40rpx;
		line-height: 40rpx;
		padding: 0;
		text-align: center;
		border-radius: 8rpx;
	}

	.page-index {
		display: flex;
		flex-direction: column;
		min-height: 100%;
		background: linear-gradient(180deg, #fff 0%, #f5f5f5 100%);

		.ad {
			width: 710rpx;
			height: 156rpx;
			margin: 10rpx auto 20rpx auto;

			image {
				width: 100%;
				height: 100%;
			}
		}

		// &.bgf{
		// 	background: #fff;
		// }
		.header {
			width: 100%;

			// height: 320rpx;
			.btn {
				position: relative;

				.iconfont {
					font-size: 45rpx;
				}
			}

			.iconnum {
				min-width: 6px;
				color: #fff;
				border-radius: 15rpx;
				position: absolute;
				right: -10rpx;
				top: -10rpx;
				font-size: 10px;
				padding: 0 4px;
			}

			.serch-wrapper {
				align-items: center;
				padding: 20rpx 30rpx 0 30rpx;

				.logo {
					width: 127rpx;
					height: 46rpx;
				}

				image {
					width: 118rpx;
					height: 42rpx;
				}

				.input {
					display: flex;
					align-items: center;
					width: 490rpx;
					height: 64rpx;
					padding: 0 0 0 30rpx;
					background: rgba(237, 237, 237, 1);
					border: 1px solid rgba(241, 241, 241, 1);
					border-radius: 32rpx;
					color: #BBBBBB;
					font-size: 28rpx;

					.iconfont {
						margin-right: 20rpx;
					}
				}
			}

			.tabNav {
				padding-top: 24rpx;
			}
		}

		/* #ifdef MP */
		.mp-header {
			z-index: 999;
			position: fixed;
			left: 0;
			top: 0;
			width: 100%;
			/* #ifdef H5 */
			padding-bottom: 20rpx;
			/* #endif */
			// background: linear-gradient(90deg, $bg-star 50%, $bg-end 100%);
			background-color: #fff;

			.serch-wrapper {
				height: 100%;
				align-items: center;
				padding: 0 50rpx 0 53rpx;

				image {
					width: 118rpx;
					height: 42rpx;
					margin-right: 30rpx;
				}

				.input {
					display: flex;
					align-items: center;
					width: 305rpx;
					height: 58rpx;
					padding: 0 0 0 30rpx;
					background: rgba(247, 247, 247, 1);
					border: 1px solid rgba(241, 241, 241, 1);
					border-radius: 29rpx;
					color: #BBBBBB;
					font-size: 28rpx;

					.iconfont {
						margin-right: 20rpx;
					}
				}
			}
		}

		/* #endif */

		.page_content {
			overflow-x: hidden;
			/* #ifdef MP */
			margin-top: 260rpx;
			/* #endif */
			.swiper {
				position: relative;
				width: 100%;
				height: 280rpx;
				margin: 0 auto;
				border-radius: 10rpx;
				/* #ifdef MP */
				z-index: 10;

				/* #endif */
				swiper,
				.swiper-item,
				image {
					width: 100%;
					height: 280rpx;
					border-radius: 10rpx;

				}

				.slide-navigator {}

				image {
					transform: scale(.93);
					transition: all .6s ease;
				}

				swiper-item.active {
					image {
						transform: scale(1);
					}
				}
			}

			.nav {
				padding: 0 0rpx 30rpx;
				flex-wrap: wrap;
				margin-top: 40rpx;

				.item {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					width: 20%;
					margin-top: 30rpx;

					image {
						width: 82rpx;
						height: 82rpx;
					}
				}
			}

			.live-wrapper {
				position: relative;
				width: 100%;
				overflow: hidden;
				border-radius: 16rpx;

				image {
					width: 100%;
					height: 400rpx;
				}

				.live-top {
					z-index: 20;
					position: absolute;
					left: 0;
					top: 0;
					display: flex;
					align-items: center;
					justify-content: center;
					color: #fff;
					width: 180rpx;
					height: 54rpx;
					border-radius: 0rpx 0px 18rpx 0px;

					image {
						width: 30rpx;
						height: 30rpx;
						margin-right: 10rpx;
						/* #ifdef H5 */
						display: block;
						/* #endif */
					}
				}

				.live-title {
					position: absolute;
					left: 0;
					bottom: 6rpx;
					width: 100%;
					height: 70rpx;
					line-height: 70rpx;
					text-align: center;
					font-size: 30rpx;
					color: #fff;
					background: rgba(0, 0, 0, .35);
				}

				&.mores {
					width: 100%;

					.item {
						position: relative;
						width: 320rpx;
						display: inline-block;
						border-radius: 16rpx;
						overflow: hidden;
						margin-right: 20rpx;

						image {
							width: 320rpx;
							height: 180rpx;
							border-radius: 16rpx;
						}

						.live-title {
							height: 40rpx;
							line-height: 40rpx;
							text-align: center;
							font-size: 22rpx;
						}

						.live-top {
							width: 120rpx;
							height: 36rpx;
							font-size: 22rpx;

							image {
								width: 20rpx;
								height: 20rpx;
							}
						}
					}
				}
			}

			.hot-img {
				display: flex;
				align-items: center;
				justify-content: space-between;

				.item {
					display: flex;
					flex-direction: column;
					align-items: center;
					width: 170rpx;
					background-color: #FEFEFF;
					padding: 20rpx 0 4rpx;
					border-radius: 8rpx;
					box-shadow: 2px 1px 6px 1px rgba(0,0,0,0.03);
					.title {
						font-weight: bold;
						color: #282828;
					}

					.msg {
						margin-top: 5rpx;
						font-size: 20rpx;
					}

					.img {
						margin-top: 10rpx;
					}

					image {
						width: 130rpx;
						height: 130rpx;
					}

					&:first-child .msg {
						color: #8FBBE8;
					}

					&:nth-child(2) .msg {
						color: #D797B7;
					}

					&:nth-child(3) .msg {
						color: #C49BD1;
					}

					&:nth-child(4) .msg {
						color: #A3BF95;
					}
				}
			}

			.common-hd {
				display: flex;
				align-items: center;
				justify-content: center;
				height: 118rpx;

				.title {
					padding: 0 80rpx;
					font-size: 34rpx;
					color: $theme-color;
					font-weight: bold;
					background-image: url("~@/static/images/index-title.png");
					background-repeat: no-repeat;
					background-size: 100% auto;
					background-position: left center;
				}
			}

			.explosion {
				.mer-box {
					.mer-item {
						margin-bottom: 20rpx;
						background-color: #fff;
						border-radius: 16rpx;

						.mer-hd {
							position: relative;
							width: 100%;
							height: 200rpx;
							border-radius: 16rpx 16rpx 16rpx 16rpx;
							overflow: hidden;
							image {
								width: 100%;
								height: 100%;
							}

							.mer-name {
								position: absolute;
								left: 20rpx;
								top: 30rpx;
								display: flex;
								align-items: center;
								width:850rpx;
								height: 50rpx;
								padding: 0 5rpx;
								border-radius: 23rpx;
								// background: #fff;
								font-weight: bold;

								image {
									width: 38rpx;
									height: 38rpx;
									margin-right: 10rpx;
									border-radius: 50%;
								}

								.txt {
									flex: 1;
								}
							}
						}

						.pro-box {
							display: flex;
							align-items: center;
							padding: 20rpx 20rpx 30rpx;

							.pro-item {
								width: 214rpx;
								margin-right: 14rpx;

								image {
									width: 100%;
									height: 214rpx;
								}

								.price {
									margin-top: 5rpx;
									font-size: 28rpx;
									color: $theme-color;
									font-weight: bold;

									text {
										font-size: 28rpx;
									}
								}

								&:last-child {
									margin-right: 0;
								}
							}
						}
					}
				}
			}

			.spike-box {
				margin-top: 20rpx;
				padding: 23rpx 20rpx;
				border-radius: 24rpx;
				background-color: #fff;
				overflow: hidden;
				box-shadow: 0px 0px 16px 3px rgba(0, 0, 0, 0.04);

				.hd {
					display: flex;
					align-items: center;
					justify-content: space-between;

					.left {
						display: flex;
						align-items: center;
						width: 500rpx;

						.icon {
							width: 38rpx;
							height: 38rpx;
							margin-right: 8rpx;
						}

						.title {
							width: 134rpx;
							height: 33rpx;
						}
					}

					.more {
						font-size: 26rpx;
						color: #999;

						.iconfont {
							margin-left: 6rpx;
							font-size: 25rpx;
						}
					}
				}

				.spike-wrapper {
					width: 100%;
					margin-top: 27rpx;

					.spike-item {
						display: inline-block;
						width: 222rpx;
						margin-right: 20rpx;

						.img-box {
							position: relative;
							height: 222rpx;

							image {
								width: 100%;
								height: 222rpx;
								border-radius: 16rpx;
							}

							.msg {
								position: absolute;
								left: 10rpx;
								bottom: 16rpx;
								width: 86rpx;
								height: 30rpx;
								background: rgba(255, 255, 255, 1);
								border: 1px solid rgba(255, 109, 96, 1);
								border-radius: 6rpx;
								font-size: 20rpx;
								color: $theme-color;
							}
						}


						.info {
							margin-top: 8rpx;
							padding: 0 10rpx;

							.name {
								font-size: 28rpx;
							}

							.price-box {
								display: flex;
								align-items: center;
								justify-content: center;

								.tips {
									display: flex;
									align-items: center;
									justify-content: center;
									width: 28rpx;
									height: 28rpx;
									background-color: $theme-color;
									color: #fff;
									font-size: 20rpx;
									border-radius: 2px;
								}

								.price {
									display: flex;
									margin-left: 10rpx;
									color: $theme-color;
									font-size: 28rpx;
									font-weight: bold;

									text {
										font-size: 18rpx;
									}
								}
							}
						}
					}
				}
			}

			.barg {
				width: 100%;
				height: 478rpx;
				margin-top: 20rpx;
				padding-left: 20rpx;
				background-size: 100% 100%;

				.title {
					display: flex;
					align-items: center;
					justify-content: center;
					padding-top: 42rpx;

					image {
						width: 463rpx;
						height: 39rpx;
					}
				}

				.barg-swiper {
					margin-top: 43rpx;
					padding-right: 20rpx;

					.wrapper {
						display: flex;
					}

					.list-box {
						flex-shrink: 0;
						width: 210rpx;
						background-color: #fff;
						border-radius: 16rpx;
						overflow: hidden;
						padding-bottom: 18rpx;
						margin-right: 20rpx;

						image {
							width: 100%;
							height: 210rpx;
						}

						.info-txt {
							width: 100%;
							display: flex;
							flex-direction: column;
							align-items: center;
							justify-content: center;
							padding-top: 15rpx;

							.price {
								font-weight: 700;
								color: $theme-color;
							}

							.txt {
								display: flex;
								align-items: center;
								justify-content: center;
								width: 136rpx;
								height: 33rpx;
								margin-top: 10rpx;
								background: linear-gradient(90deg, $bg-star 0%, $bg-end 100%);
								border-radius: 17px;
								font-size: 22rpx;
								color: #fff;

							}
						}
					}

					.more-box {
						flex-shrink: 0;
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
						width: 80rpx;
						background-color: #fff;
						border-radius: 16rpx;

						image {
							width: 24rpx;
							height: 24rpx;
							margin-top: 10rpx;
						}

						.txt {
							display: block;
							writing-mode: vertical-lr;
							font-size: 26rpx;
							line-height: 1.2;
						}
					}
				}
			}

			.group-wrapper {
				padding: 26rpx 20rpx;
				margin-top: 20rpx;
				background: #fff;
				border-radius: 24rpx;

				.hd {
					display: flex;
					align-items: center;
					justify-content: space-between;

					.left {
						display: flex;
						align-items: center;

						.icon {
							width: 38rpx;
							height: 38rpx;
							margin-right: 8rpx;
						}

						.title {
							width: 134rpx;
							height: 33rpx;
						}

						.person {
							display: flex;
							align-items: center;
							margin-left: 40rpx;

							.avatar-box {
								display: flex;
								align-items: center;

								image {
									width: 30rpx;
									height: 30rpx;
									border-radius: 50%;
									margin-right: -10rpx;
								}
							}

							.num {
								margin-left: 18rpx;
								font-size: 26rpx;
								color: #999999;
							}
						}
					}

					.more {
						font-size: 26rpx;
						color: #999;

						.iconfont {
							margin-left: 6rpx;
							font-size: 25rpx;
						}
					}
				}

				.group-scroll {
					width: 100%;
					margin-top: 25rpx;

					.group-item {
						display: inline-block;
						width: 222rpx;
						margin-right: 20rpx;
						box-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.03);
						border-radius: 16rpx;

						image {
							width: 100%;
							height: 222rpx;
							border-radius: 16rpx 16rpx 0 0;
						}

						.info {
							padding: 8rpx 13rpx;

							.name {
								font-size: 24rpx;
							}

							.price-box {
								display: flex;
								align-items: center;
								margin-top: 10rpx;

								.tips {
									display: flex;
									align-items: center;
									justify-content: center;
									width: 76rpx;
									height: 30rpx;
									margin-right: 6rpx;
									background: linear-gradient(90deg, rgba(255, 0, 0, .1) 0%, rgba(255, 84, 0, .1) 100%);
									border-radius: 2px;
									font-size: 20rpx;
									color: $theme-color;
								}

								.price {
									font-size: 26rpx;
									color: $theme-color;
									font-weight: 700;

									text {
										font-size: 20rpx;
									}
								}
							}

						}

						.bom-btn {
							display: flex;
							align-items: center;
							justify-content: center;
							width: 100%;
							height: 48rpx;
							background: linear-gradient(90deg, $bg-star 0%, $bg-end 100%);
							border-radius: 0px 0px 16rpx 16rpx;
							color: #fff;

						}
					}
				}
			}

			.boutique {
				margin-top: 20rpx;

				swiper,
				swiper-item,
				.slide-image {
					width: 100%;
					height: 240rpx;
					border-radius: 12rpx;
				}
			}

			.index-product-wrapper {
				.nav-bd {
					display: flex;
					align-items: center;

					.item {
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
						width: 25%;

						.txt {
							font-size: 32rpx;
							color: #282828;
						}

						.label {
							display: flex;
							align-items: center;
							justify-content: center;
							width: 124rpx;
							height: 32rpx;
							margin-top: 5rpx;
							font-size: 24rpx;
							color: #999;
						}

						&.active {
							color: $theme-color;

							.label {
								background: linear-gradient(90deg, $bg-star 0%, $bg-end 100%);
								border-radius: 16rpx;
								color: #fff;
							}
						}
					}
				}

				.list-box {
					display: flex;
					flex-wrap: wrap;
					justify-content: space-between;

					.item {
						width: 345rpx;
						margin-bottom: 20rpx;
						background-color: #fff;
						border-radius: 10px;
						overflow: hidden;

						image {
							width: 100%;
							height: 345rpx;
						}

						.text-info {
							padding: 10rpx 20rpx 15rpx;

							.title {
								color: #222222;
							}

							.old-price {
								margin-top: 8rpx;
								font-size: 26rpx;
								color: #AAAAAA;
								text-decoration: line-through;

								text {
									margin-right: 2px;
									font-size: 20rpx;
								}
							}

							.price {
								display: flex;
								align-items: flex-end;
								color: $theme-color;
								font-size: 34rpx;
								font-weight: 800;

								text {
									padding-bottom: 4rpx;
									font-size: 24rpx;
									font-weight: normal;
								}

								.txt {
									display: flex;
									align-items: center;
									justify-content: center;
									width: 28rpx;
									height: 28rpx;
									margin-left: 15rpx;
									margin-bottom: 10rpx;
									border: 1px solid $theme-color;
									border-radius: 4rpx;
									font-size: 22rpx;
									font-weight: normal;
								}
							}
						}
					}

					&.on {
						display: flex;
					}
				}
			}
		}
	}

	.productList {
		background-color: #F1F1F1;

		.sort {
			width: 710rpx;
			max-height: 380rpx;
			background: rgba(255, 255, 255, 1);
			border-radius: 16rpx;
			padding: 0 0rpx 30rpx;
			flex-wrap: wrap;
			margin: 25rpx auto 30rpx auto;
			padding-top: 8rpx;
			/* #ifdef MP */
			margin-top: 230rpx;
			/* #endif */
			.item {
				.pictrues {
					width: 90rpx;
					height: 90rpx;
					background: rgba(248, 248, 248, 1);
					border-radius: 50%;
					margin: 0 auto;
				}

				width: 20%;
				margin-top: 30rpx;
				text-align: center;

				image {
					width: 90rpx;
					height: 90rpx;
				}

				.text {
					color: #272727;
					font-size: 24rpx;
					margin-top: 10rpx;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
			}
		}
	}

	.productList .list {
		padding: 0 20rpx;
	}

	.productList .list.on {
		background-color: #fff;
		border-top: 1px solid #f6f6f6;
	}

	.productList .list .item {
		width: 345rpx;
		margin-top: 20rpx;
		background-color: #fff;
		border-radius: 10rpx;
	}

	.productList .list .item.on {
		width: 100%;
		display: flex;
		border-bottom: 1rpx solid #f6f6f6;
		padding: 30rpx 0;
		margin: 0;
	}

	.productList .list .item .pictrue {
		position: relative;
		width: 100%;
		height: 345rpx;
	}

	.productList .list .item .pictrue.on {
		width: 180rpx;
		height: 180rpx;
	}

	.productList .list .item .pictrue image {
		width: 100%;
		height: 100%;
		border-radius: 10rpx 10rpx 0 0;
	}

	.productList .list .item .pictrue image.on {
		border-radius: 6rpx;
	}

	.productList .list .item .text {
		padding: 14rpx 17rpx 26rpx 17rpx;
		font-size: 28rpx;
		color: #212121;
	}

	.productList .list .item .text.on {
		width: 508rpx;
		padding: 0 0 0 22rpx;
	}

	.productList .list .item .text .money {
		font-size: 26rpx;
		font-weight: bold;
		margin-top: 8rpx;
	}

	.productList .list .item .text .coupon {
		background: rgba(255, 248, 247, 1);
		border: 1px solid rgba(233, 51, 35, 1);
		border-radius: 4rpx;
		font-size: 20rpx;
		margin-left: 18rpx;
		padding: 1rpx 4rpx;
	}

	.productList .list .item .text .money.on {
		margin-top: 50rpx;
	}

	.productList .list .item .text .money .num {
		font-size: 34rpx;
	}

	.productList .list .item .text .vip {
		font-size: 22rpx;
		color: #aaa;
		margin-top: 7rpx;
	}

	.productList .list .item .text .vip.on {
		margin-top: 12rpx;
	}

	.productList .list .item .text .vip .vip-money {
		font-size: 24rpx;
		color: #282828;
		font-weight: bold;
	}

	.productList .list .item .text .vip .vip-money image {
		width: 46rpx;
		height: 21rpx;
		margin-left: 4rpx;
	}

	.pictrue {
		position: relative;
	}

	.fixed {
		z-index: 100;
		position: fixed;
		left: 0;
		top: 0;
		background-color: #fff;
		box-shadow: 0 10rpx 20rpx -5rpx rgba(0, 0, 0, 0.06);
		// background: linear-gradient(90deg, red 50%, #ff5400 100%);
	}

	.mores-txt {
		width: 100%;
		align-items: center;
		justify-content: center;
		height: 70rpx;
		color: #999;
		font-size: 24rpx;

		.iconfont {
			margin-top: 2rpx;
			font-size: 20rpx;
		}
	}

	.menu-txt {
		font-size: 24rpx;
		color: #454545;
	}

	.mp-bg {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 330rpx;
		// background: linear-gradient(90deg, #fff 50%, #fff 100%);
		// border-radius: 0 0 30rpx 30rpx;
	}

	.main {
		padding: 0 20rpx;
		margin-top: 40px;
	}
    .head-wrapper{
    	z-index: 999;
    	display: flex;
    	align-items: center;
    	position: fixed;
    	left: 30rpx;
    	top: 0;
    	/* #ifdef MP */
    	height: 43px;	
    	/* #endif */
    	/* #ifdef H5 */
    	height: 114rpx;	
    	/* #endif */
    }
    .head-menu{
    	display: flex;
    	align-items: center;
    	height: 54rpx;
    	width:140rpx;
    	background:rgba(0,0,0,.25);
    	border-radius:27rpx;
    	.iconfont{
    		flex: 1;
    		text-align: center;
    		color: #fff;
    		box-sizing: border-box;
    		&.icon-xiangzuo{
    			border-right: 1px solid #fff;
    		}
    	}
    }	
</style>
