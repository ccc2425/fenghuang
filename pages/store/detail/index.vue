<template>
	<view :style="{ 'background-image': `linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 40%),url(${store.mer_banner})` }"
	 class="store-detail">
		<view class="section head">
			<image :src="store.mer_avatar"></image>
			<view class="text-wrap">
				<view class="name">{{ store.mer_name }}</view>
				<view class="fans">{{store.care_count}}人关注</view>
			</view>
			<button :class="{ followed: store.care }" hover-class="none" @click="followToggle">
				<text v-show="!store.care" class="iconfont icon-guanzhu"></text>
				{{ store.care ? '已关注' : '关注' }}
			</button>
		</view>
		<view class="section wrap">
			<view class="name">店铺评级</view>
			<view class="score-wrap">
				<view class="star">
					<view :style="{ width: `${star.toFixed(2)}%` }"></view>
				</view>
				<view>{{ score.toFixed(1) }}</view>
			</view>
		</view>
		<view class="section wrap" @click="popupShow = true">
			<view class="name">店铺二维码</view>
			<view>
				<text class="iconfont icon-erweima1"></text>
			</view>
		</view>
		<navigator :url="`/pages/chat/customer_list/chat?mer_id=${store.mer_id}&uid=${this.uid}`" class="section wrap">
			<view class="name">联系客服</view>
			<view>
				<text class="iconfont icon-kefu1"></text>
			</view>
		</navigator>
		<view class="section info">
			<view class="item very">
				<view class="name">店铺简介</view>
				<view class="value">{{ store.mer_info }}</view>
			</view>
			<view class="item very">
				<view class="name">店铺地址</view>
				<view class="value">{{ store.bank_address }}</view>
			</view>
			<view class="item">
				<view class="name">联系电话</view>
				<view class="value">{{ store.service_phone }}</view>
			</view>
			<view class="item">
				<view class="name">开店时间</view>
				<view class="value">{{ store.create_time | dateFormat }}</view>
			</view>
		</view>
		<view :class="{ mask: popupShow }" @click="popupShow = false"></view>
		<view :class="{ 'popup-active': popupShow }" class="popup-qrcode">
			<view class="name">{{ store.mer_name }}</view>
			<view class="info">保存二维码可分享店铺给好友哦~</view>
			<image :src="storeCode"></image>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters
	} from "vuex";
	import {
		getStoreDetail,
		followStore,
		unfollowStore,
		merchantQrcode
	} from '@/api/store.js';
	export default {
		computed: mapGetters(['isLogin','uid']),
		filters: {
			dateFormat: function(value) {
				if (!value) {
					return '';
				}
				return value.split(' ')[0];
			}
		},
		data() {
			return {
				id: 0,
				store: {},
				score: 0,
				star: 0,
				popupShow: false,
				storeCode:''
			}
		},
		onLoad: function(options) {
			this.id = options.id;
			this.getStore();
			this.getStoreCode();
		},
		methods: {
			getStore: function() {
				getStoreDetail(this.id).then(res => {
					let store = res.data;
					this.store = store;
					this.score = (parseFloat(store.postage_score) + parseFloat(store.product_score) + parseFloat(store.service_score)) /
						3;
					this.star = this.score / 5 * 100;
				});
			},
			follow: function() {
				followStore(this.id).then(res => {
					if (res.status === 200) {
						this.store.care = true;
					}
					this.$util.Tips({
						title: res.message
					});
				});
			},
			unfollow: function() {
				unfollowStore(this.id).then(res => {
					if (res.status === 200) {
						this.store.care = false;
					}
					this.$util.Tips({
						title: res.message
					});
				});
			},
			followToggle: function() {
				this.store.care ? this.unfollow() : this.follow();
			},
			// 店铺二维码
			getStoreCode(){
				merchantQrcode(this.id).then(res=>{
					this.storeCode = res.data.url
				})
			}
		}
	}
</script>

<style lang="scss">
	.store-detail {
		padding-top: 80rpx;
		padding-right: 20rpx;
		padding-left: 20rpx;
		background: left top/750rpx 360rpx no-repeat fixed;

		.section {
			border-radius: 10rpx;
			margin-bottom: 20rpx;
			background-color: #FFFFFF;
		}

		.head {
			display: flex;
			align-items: center;
			padding: 20rpx;

			image {
				width: 90rpx;
				height: 90rpx;
				border-radius: 6rpx;
			}

			.text-wrap {
				flex: 1;
				min-width: 0;
				margin-right: 20rpx;
				margin-left: 20rpx;
				line-height: 1;

				.name {
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					font-weight: bold;
					font-size: 28rpx;
					color: #282828;
				}

				.fans {
					margin-top: 15rpx;
					font-weight: 500;
					font-size: 22rpx;
					color: #666666;
				}
			}

			button {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 113rpx;
				height: 48rpx;
				border-radius: 24rpx;
				background-image: linear-gradient(-90deg, rgba(246, 122, 56, 1) 0%, rgba(241, 27, 9, 1) 100%);
				font-weight: 500;
				font-size: 22rpx;
				color: #FFFFFF;

				.iconfont {
					margin-right: 6rpx;
					font-size: 22rpx;
				}
			}

			.followed {
				border: 1rpx solid #BFBFBF;
				background: none;
				color: #999999;
			}
		}

		.wrap {
			display: flex;
			align-items: center;
			padding: 32rpx 20rpx;

			.name {
				flex: 1;
				min-width: 0;
				font-weight: 400;
				font-size: 28rpx;
				color: #282828;
			}

			.score-wrap {
				display: flex;
				align-items: center;
				font-weight: 500;
				font-size: 28rpx;
				color: $theme-color;

				.star {
					position: relative;
					width: 111rpx;
					height: 19rpx;
					margin-right: 10rpx;
					background: url(../../columnGoods/images/star.png) left top/100% 100% no-repeat;
					overflow: hidden;

					view {
						position: absolute;
						top: 0;
						left: 0;
						height: 100%;
						background: url(../../columnGoods/images/star_active.png) left top/111rpx 19rpx no-repeat;
					}
				}
			}

			.iconfont {
				font-size: 36rpx;
			}

			.icon-pingfen {
				margin-right: 6rpx;
				font-size: 23rpx;
				color: #666666;
			}

			.active {
				color: $theme-color;
			}
		}

		.info {
			.item {
				display: flex;
				align-items: center;
				padding: 30rpx 20rpx;
				border: 1rpx solid #F5F5F5;
				font-weight: 500;
				font-size: 28rpx;
				line-height: 30rpx;
				color: #666666;

				.name {
					margin-right: 18rpx;
					color: #666;
				}

				.value {
					flex: 1;
					min-width: 0;
				}
			}

			.very {
				.name {
					align-self: flex-start;
				}
			}
		}

		.popup-qrcode {
			position: fixed;
			top: 50%;
			left: 50%;
			z-index: 99;
			width: 544rpx;
			padding-top: 48rpx;
			padding-bottom: 36rpx;
			border-radius: 24rpx;
			background-color: #FFFFFF;
			transform: translate(-50%, -50%) scale(0);
			opacity: 0;
			transition: .3s;
			line-height: 1;
			text-align: center;
			color: #282828;

			.name {
				max-width: 90%;
				margin-right: auto;
				margin-left: auto;
				font-weight: bold;
				font-size: 32rpx;
			}

			.info {
				margin-top: 24rpx;
				font-weight: 500;
				font-size: 24rpx;

			}

			image {
				width: 384rpx;
				height: 384rpx;
				margin-top: 18rpx;
			}
		}

		.popup-active {
			transform: translate(-50%, -50%) scale(1);
			opacity: 1;
		}
	}
</style>
