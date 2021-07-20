<template>
	<view class="new-users">
		<view class="head">
			<view class="user-card">
				<view class="bg"></view>
				<view class="user-info">
					<image class="avatar" :src='userInfo.avatar' v-if="userInfo.avatar" @click="goEdit()"></image>
					<image v-else class="avatar" src="/static/images/f.png" mode="" @click="goEdit()"></image>
					<view class="info">
						<!-- #ifdef MP -->
						<view class="name" v-if="!userInfo.uid" @tap="openAuto">
							请点击授权
						</view>
						<!-- #endif -->
						<view class="name" v-if="userInfo.uid">
							{{userInfo.nickname}}
							<view class="vip">
								<view style="margin-left: 10rpx;" class="vip-txt">{{userInfo.vip_name}}</view>
							</view>
						</view>
						<view class="num" v-if="userInfo.phone" @click="goEdit()">
							<view class="num-txt">账号：{{userInfo.account}}</view>
						<!-- 	<view class="icon">
								<image src="/static/images/edit.png" mode=""></image>
							</view> -->
						</view>
						<view class="phone" v-if="!userInfo.phone && isLogin" @tap="bindPhone">绑定手机号</view>
					</view>
				</view>
				<view class="num-wrapper">
					<view class="num-item" @click="goMenuPage('/pages/users/user_goods_collection/index')">
						<text class="num">{{userInfo.total_collect_product || 0}}</text>
						<view class="txt">我的收藏</view>
					</view>
					<view class="num-item" @click="goMenuPage('/pages/users/user_store_attention/index')">
						<text class="num">{{userInfo.total_collect_store || 0}}</text>
						<view class="txt">关注店铺</view>
					</view>
					<view class="num-item" @click="goMenuPage('/pages/users/browsingHistory/index')">
						<text class="num">{{userInfo.total_visit_product || 0}}</text>
						<view class="txt">浏览记录</view>
					</view>
					<view class="num-item" @click="goMenuPage('/pages/users/user_coupon/index')">
						<text class="num">{{userInfo.total_coupon || 0}}</text>
						<view class="txt">优惠券</view>
					</view>
				</view>
				<view class="right-btn">
					<view class="iconfont icon-shezhi" @click="goEdit()" v-if="userInfo.phone"></view>
					<!-- <navigator class="btn" url="/pages/chat/customer_list/index?type=0" hover-class="none">
						<view class="iconfont icon-xiaoxi"></view>
						<text class="iconnum" v-if="userInfo.total_unread">{{userInfo.total_unread}}</text>
					</navigator> -->
				</view>
			</view>
		</view>
        <div class="user">
            <div class="wrapper" style="background-color: white;width: calc(100% - 20px);
    left: 10px;
    border-radius: 6px;">
                <div style="height: 10px;"></div>
              <div class="nav acea-row row-middle">
                  <!-- <router-link :to="{ path: '/user/account' }" class="item">
                      <div>我的余额</div>
                      <div class="num">{{ userInfo.now_money || 0 }}</div>
                  </router-link> -->
                <router-link :to="{ path: '/pages/users/user_money/index' }" class="item">
                    <div>贡献值</div>
                    <div class="num">{{ userInfo.now_money || 0 }}</div>
                </router-link>
                <router-link :to="{ path: '/pages/users/user_money/index' }" class="item">
                    <div>赠送积分</div>
                    <div class="num">{{ userInfo.points || 0 }}</div>
                </router-link>
                <router-link :to="{ path: '/pages/users/user_money/index' }" class="item">
                    <div>我的金豆</div>
                    <div class="num">{{ userInfo.integral || 0 }}</div>
                </router-link>
                
              </div>
              <div style="height: 10px;"></div>
              <div class="nav acea-row row-middle">
                <router-link :to="{ path: '/pages/users/user_money/index' }" class="item">
                    <div>购物券</div>
                    <div class="num">{{ userInfo.ppoint || 0 }}</div>
                </router-link>
                <router-link :to="{ path: '/pages/users/user_money/index' }" class="item">
                    <div>我的分红点</div>
                    <div class="num">{{ userInfo.dividends || 0 }}</div>
                </router-link>
                <!-- <div class="item">
                  <div>当前佣金</div>
                  <div class="num">{{ userInfo.brokerage_price || 0 }}</div>
                </div> -->
                <router-link :to="''" class="item">
                  <div>优惠券</div>
                  <div class="num">{{ userInfo.couponCount || 0 }}</div>
                </router-link>
                
                
              </div>
              <div style="height: 10px;"></div>
            </div>
        </div>
		<view class="wrapper" style="    margin-top: .5rem;">

			<view class="order-wrapper">
				<view class="order-hd flex">
					<view class="left">我的订单</view>
					<navigator class="right flex" hover-class="none" url="/pages/users/order_list/index" open-type="navigate">
						全部订单
						<text class="iconfont icon-xiangyou"></text>
					</navigator>
				</view>
				<view class="order-bd">
					<block v-for="(item,index) in orderMenu" :key="index">
						<navigator class="order-item" hover-class="none" :url="item.url">
							<view class="pic">
								<image :src="item.img" mode=""></image>
								<text class="order-status-num" v-if="item.num > 0">{{ item.num }}</text>
							</view>
							<view class="txt">{{item.title}}</view>
						</navigator>
					</block>
				</view>
			</view>
			<!-- 轮播 -->
			<view class="ad-view">
			  <ad adpid="1825372740"></ad>
			</view>
			<!-- <view class="slider-wrapper" v-if="imgUrls.length>0">
				<swiper indicator-dots="true" :autoplay="autoplay" :circular="circular" :interval="interval" :duration="duration"
				 indicator-color="rgba(255,255,255,0.6)" indicator-active-color="#fff">
					<block v-for="(item,index) in imgUrls" :key="index">
						<swiper-item>
							<navigator :url='item.url' class='slide-navigator acea-row row-between-wrapper' hover-class='none'>
								<image :src="item.pic" class="slide-image"></image>
							</navigator>
						</swiper-item>
					</block>
				</swiper>
			</view> -->
			<!-- 会员菜单 -->
			<view class="user-menus" style="margin-top: 20rpx;">
				<view class="title">我的服务</view>
				<view class="menu-box" v-if="isLogin">
                    <!-- <navigator url="/pages/users/user_money_pay_list/index" class="item" hover-class="none"> -->
                    <view @click="showFullScreenVideoAd" class="item" hover-class="none">
                    	<image src="/static/images/user-menu-003.png"></image>
                    	<text>互换大厅</text>
                    </view>
                    <!-- <view class="item" @click="tis">
                    	<image src="/static/images/user-menu-001.png"></image>
                    	<text>互换大厅</text>
                    </view> -->
					<navigator url="/pages/users/user_money/index" class="item" hover-class="none" >
						<image src="/static/images/user-menu-001.png"></image>
						<text>我的贡献值</text>
					</navigator>
					<navigator url="/pages/users/user_spread_user/index" class="item" hover-class="none" v-if="is_promoter == 1">
						<image src="/static/images/4-002.png"></image>
						<text>我的团队</text>
					</navigator>
					<navigator url="/pages/users/distributor/index" class="item" hover-class="none" v-else>
						<image src="/static/images/user-menu-001.png"></image>
						<text>我的团队</text>
					</navigator>
					<navigator class="item" :url="item.url" hover-class="none" v-if="item.url!='#' && item.url!='/pages/service/index'" v-for="(item,index) in MyMenus" :key="index">
							<image :src="item.pic"></image>
							<text>{{item.name}}</text>
					</navigator>
					<navigator url="/pages/admin/order/index" class="item" hover-class="none" v-if="userInfo.service && userInfo.service.customer === 1">
						<image src="/static/images/user-menu-002.png"></image>
						<text>订单统计</text>
					</navigator>
					<!-- <navigator url="/pages/store/settled/index" class="item" hover-class="none" v-if="mer_intention_open == 1">
						<image src="/static/images/user-menu-003.png"></image>
						<text>商家入驻</text>
					</navigator> -->
					<view class="item" hover-class="none" @click="goChat" v-if="userInfo.service">
						<image src="/static/images/user_menu08.png"></image>
						<text>联系客服</text>
					</view>
				</view>
			</view>
		</view>
		<!-- <view class="copy-right">
			<view class="iconfont icon-crmeb"></view>
			<view class="text">众邦科技提供技术支持</view>
		</view> -->
		<view style="height: 50rpx;"></view>
		<!-- #ifdef MP -->
		<authorize @onLoadFun="onLoadFun" :isAuto="isAuto" :isShowAuth="isShowAuth" @authColse="authColse"></authorize>
		<!-- #endif -->
	</view>
</template>
<script>
	import {
		getMenuList,
		getUserInfo,
		setVisit
	} from '@/api/user.js';
	import {
		toLogin
	} from '@/libs/login.js';
	import { orderData } from '@/api/order.js'
	import {
		mapGetters
	} from "vuex";
	// #ifdef MP
	import authorize from '@/components/Authorize';
	// #endif
	const app = getApp();
	export default {
		components: {
			// #ifdef MP
			authorize
			// #endif
		},
		computed: mapGetters(['isLogin']),
		data() {
			return {
				orderMenu: [{
						img: '/static/images/order1.png',
						title: '待付款',
						url: '/pages/users/order_list/index?status=0',
						num:0
					},
					{
						img: '/static/images/order2.png',
						title: '待发货',
						url: '/pages/users/order_list/index?status=1',
						num:0
					},
					{
						img: '/static/images/order3.png',
						title: '待收货',
						url: '/pages/users/order_list/index?status=2',
						num:0
					},
					{
						img: '/static/images/order4.png',
						title: '待评价',
						url: '/pages/users/order_list/index?status=3',
						num:0
					},
					// {
					// 	img: '/static/images/order5.png',
					// 	title: '售后/退款',
					// 	url: '/pages/users/refund/list',
					// 	num:0
					// },
				],
				imgUrls: [],
				userMenu: [],
				autoplay: true,
				circular: true,
				interval: 3000,
				duration: 500,
				isAuto: false, //没有授权的不会自动授权
				isShowAuth: false, //是否隐藏授权
				orderStatusNum: {},
				userInfo: {},
				MyMenus: [],
				balance_func_status:0, //余额开关 1开
				is_promoter:0,//推广人开关  1开
				mer_intention_open:0,
				loading: false,
			}
		},
		onLoad() {
			this.balance_func_status = app.globalData.balance_func_status
			this.mer_intention_open = app.globalData.mer_intention_open
			let that = this;
			// #ifdef H5 || APP-PLUS
			if (that.isLogin == false) {
				toLogin();
			}
			// #endif
		},
		onShow: function() {
			let that = this;
			if (that.isLogin) {
				this.getUserInfo();
				this.orderNum();
				this.getMyMenus();
				// this.setVisit();
				
			}
		},
		onReady() {
			// HBuilderX标准基座真机运行测试全屏视频广告位标识（adpid）为：1507000611
			// adpid: 1507000611 仅用于测试，发布时需要改为广告后台（https://uniad.dcloud.net.cn/）申请的 adpid
			// 广告后台申请的广告位(adpid)需要自定义基座/云打包/本地打包后生效
			this.adOption = {
				adpid: '1794566235'
			};
			// 创建广告实例
			this.createFullScreenVideoAd();
		},
		onUnload() {
			this.fullScreenVideoAd.destroy()
		},
		methods: {
			// 去聊天列表
			goChat(){
				let type = this.userInfo.service?1:0
				uni.navigateTo({
					url:`/pages/chat/customer_list/index?type=${type}`
				})
			
			},
            tis(){
                return this.$util.Tips({
                	title: '互换大厅升级维护'
                });
            },
			// 记录会员访问
			setVisit() {
				setVisit({
					url: '/pages/user/index'
				}).then(res => {})
			},
			// 打开授权
			openAuto() {
				this.isAuto = true;
				this.isShowAuth = true
			},
			// 授权回调
			onLoadFun() {
				this.getUserInfo();
				this.getMyMenus();
				this.orderNum();
				this.isShowAuth = false
			},
			Setting: function() {
				uni.openSetting({
					success: function(res) {
						console.log(res.authSetting)
					}
				});
			},
			// 授权关闭
			authColse: function(e) {
				this.isShowAuth = e
			},
			// 绑定手机
			bindPhone() {
				uni.navigateTo({
					url: '/pages/users/user_phone/index'
				})
			},
			/**
			 * 获取个人用户信息
			 */
			getUserInfo: function() {
				let that = this;
				getUserInfo().then(res => {
					that.userInfo = res.data,
					that.is_promoter = res.data.is_promoter
				});
			},
			// 订单数字
			orderNum(){
				orderData().then(({data})=>{
					this.orderMenu.forEach((item, index) => {
						// console.log('item')
						switch (item.title) {
							case '待付款':
								item.num = data.noPay
								break
							case '待发货':
								item.num = data.noPostage
								break
							case '待收货':
								item.num = data.noDeliver
								break
							case '待评价':
								item.num = data.noComment
								break
							// case '售后/退款':
							// 	item.num = data.refund
							// 	break
						}
					})
				})
			},
					
			/**
			 * 
			 * 获取个人中心图标
			 */
			getMyMenus: function() {
				let that = this;
				if (this.MyMenus.length) return;
				getMenuList().then(res => {
					that.$set(that, 'MyMenus', res.data.menu);
					this.imgUrls = res.data.banner
				});
			},
			// 编辑页面
			goEdit() {
				uni.navigateTo({
					url: '/pages/users/user_info/index'
				})
			},
			// 签到
			goSignIn() {
				uni.navigateTo({
					url: '/pages/users/user_sgin/index'
				})
			},
			// goMenuPage
			goMenuPage(url) {
				if (this.isLogin) {
					uni.navigateTo({
						url
					})
				} else {
					// #ifdef MP
					this.openAuto()
					// #endif
				}
			},
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
					uni.navigateTo({
						url:'/pages/users/user_money_pay_list/index'
					})
					
				});
				fullScreenVideoAd.onError((err) => {
					console.log("onError", JSON.stringify(err));
					// 广告数据加载失败
					this.loading = false;
					uni.showToast({
						title: `${err.code} : ${err.errMsg}`
					})
					setTimeout(() => {
						this.createFullScreenVideoAd()
					}, 500)
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
		}
	}
</script>

<style lang="scss">
	.new-users {
		.head {
			background: #fff;

			.user-card {
				position: relative;
				width: 100%;
				padding: 35rpx 0 70rpx;
				background: linear-gradient(90deg, #EB3C3C 0%, #00739f 100%);

				.bg {
					position: absolute;
					left: 0;
					top: 0;
					width: 100%;
					height: 100%;
					background-image: url('~@/static/images/user_bg.png');
					background-size: 100% 100%;
				}

				.user-info {
					z-index: 20;
					position: relative;
					display: flex;
					padding: 0 28rpx;

					.avatar {
						width: 120rpx;
						height: 120rpx;
						border-radius: 50%;
					}

					.info {
						flex: 1;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						margin-left: 20rpx;
						padding: 15rpx 0;

						.name {
							display: flex;
							align-items: center;
							color: #fff;
							font-size: 31rpx;

							.vip {
								display: flex;
								align-items: center;
								height: 36rpx;
								padding: 0 20rpx;
								background: rgba(0, 0, 0, 0.2);
								border-radius: 18px;
								font-size: 20rpx;
								margin-left: 12rpx;

								image {
									width: 27rpx;
									height: 27rpx;
								}
							}
						}

						.num {
							display: flex;
							align-items: center;
							font-size: 26rpx;
							color: rgba(255, 255, 255, 0.6);

							image {
								width: 22rpx;
								height: 23rpx;
								margin-left: 20rpx;
							}
						}
					}
				}

				.num-wrapper {
					z-index: 30;
					position: relative;
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-top: 30rpx;
					// padding: 0 47rpx;
					color: #fff;

					.num-item {
						width: 25%;
						text-align: center;

						.num {
							font-size: 42rpx;
							font-weight: bold;
						}

						.txt {
							margin-top: 8rpx;
							font-size: 22rpx;
							color: rgba(255, 255, 255, 0.6);
						}
					}
				}

				.sign {
					z-index: 200;
					position: absolute;
					right: -12rpx;
					top: 80rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					width: 120rpx;
					height: 60rpx;
					background: linear-gradient(90deg, rgba(255, 225, 87, 1) 0%, rgba(238, 193, 15, 1) 100%);
					border-radius: 29rpx 4rpx 4rpx 29rpx;
					color: #282828;
					font-size: 28rpx;
					font-weight: bold;
				}
			}
		}

		.wrapper {
			position: relative;
			top: -44rpx;
			padding: 0 20rpx;
		}
		.order-wrapper {
			background-color: #fff;
			border-radius:12rpx;
			.order-hd {
				height: 80rpx;
				align-items: center;
				justify-content: space-between;
				border-bottom: 1px dashed #DDDDDD;
				padding: 0 30rpx;
				font-size: 30rpx;
				color: #282828;

				.right {
					align-items: center;
					color: #666666;
					font-size: 26rpx;

					.icon-xiangyou {
						margin-left: 5rpx;
						margin-top: 6rpx;
						font-size: 26rpx;
					}
				}
			}

			.order-bd {
				display: flex;
				// padding: 0 24rpx;

				.order-item {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					width: 25%;
					height: 160rpx;

					.pic {
						position: relative;
						text-align: center;

						image {
							width: 56rpx;
							height: 56rpx;
						}
					}

					.txt {
						margin-top: 15rpx;
						font-size: 26rpx;
						color: #454545;
					}
				}
			}
		}

		.slider-wrapper {
			margin: 20rpx 0;
			height: 130rpx;

			swiper,
			swiper-item {
				height: 100%;
			}

			image {
				width: 100%;
				height: 130rpx;
			}
		}

		.user-menus {
			padding-bottom: 30rpx;
			background-color: #fff;
			.title{
				height: 80rpx;
				line-height: 80rpx;
				padding: 0 30rpx;
				border-bottom: 1px dashed #DDDDDD;
			}
			.item {
				position: relative;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-between;
				width: 25%;
				height: 90rpx;
				margin-top: 30rpx;
				image{
					width: 53rpx;
					height: 53rpx;
					margin-bottom: 10rpx;
				}
				text{
					
					font-size: 26rpx;
					color: #282828;
				}
				&:last-child::before {
					display: none;
				}
			}

			button {
				font-size: 28rpx;
			}
		}

		.phone {
			color: #fff;
		}

		.order-status-num {

			min-width: 12rpx;
			background-color: #fff;
			color: #ee5a52;
			border-radius: 15px;
			position: absolute;
			right: -14rpx;
			top: -15rpx;
			font-size: 20rpx;
			padding: 0 8rpx;
			border: 1px solid #ee5a52;
		}
	}
	.copy-right{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		color: #CCCCCC;
		font-size: 22rpx;
		.iconfont{
			font-size: 60rpx;
		}
	}
	.menu-box{
		display: flex;
		flex-wrap: wrap;
	}
	.right-btn{
		z-index: 99;
		position: absolute;
		right: 30rpx;
		top: 40rpx;
		display: flex;
		align-items: center;
		color: #fff;
		.iconfont{
			font-size: 40rpx;
			margin-left: 33rpx;
		}
		.btn{
			position: relative;
		}
		.iconnum{
			min-width: 6px;
			background-color: #fff;
			color: $theme-color;
			border-radius: 15rpx;
			position: absolute;
			right: -10rpx;
			top: -10rpx;
			font-size: 10px;
			padding: 0 4px;
		}
	}
    .user .wrapper .nav {
        background-color: #fff;
        border-radius: 6px;
        height: 2.4rem;
    }
    .user .wrapper .nav .item {
        -webkit-box-flex: 1;
        flex: 1;
        -webkit-flex: 1;
        -o-flex: 1;
        -ms-flex: 1;
        text-align: center;
        font-size: 13px;
        color: #aaa;
        position: relative;
        text-decoration: none;
    }
    .user .wrapper .nav .item .num {
        margin-top: .1rem;
        font-size: 16px;
        color: #282828;
        text-decoration: none;
    }
</style>
