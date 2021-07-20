<template>
	<view>
		<view class='cash-withdrawal'>
			<!-- <view class='nav acea-row'>
				<view v-for="(item,index) in navList" :key="index" class='item font-color' @click="swichNav(index)">
					<view class='line bg-color' :class='currentTab==index ? "on":""'></view>
					<view class='iconfont' :class='item.icon+" "+(currentTab==index ? "on":"")'></view>
					<view>{{item.name}}</view>
				</view>
			</view> -->
			<view class='wrapper'>
				<view :hidden='currentTab != 0' class='list'>
					<form @submit="subCash" report-submit='true'>
						<view class='item acea-row row-between-wrapper'>
							<view class='name'>持卡人</view>
							<view class='input'><input placeholder='请输入持卡人姓名' placeholder-class='placeholder' name="real_name"></input></view>
						</view>
						<view class='item acea-row row-between-wrapper'>
							<view class='name'>卡号</view>
							<view class='input'><input type='number' placeholder='请填写卡号' placeholder-class='placeholder' name="bank_code"></input></view>
						</view>
						<view class='item acea-row row-between-wrapper' v-if="array.length>0">
							<view class='name'>银行</view>
							<view class='input'>
								<picker @change="bindPickerChange" :value="index" :range="array" range-key="name">
									<text class='Bank'>{{array[index]["name"]}}</text>
									<text class='iconfont icon-qiepian38'></text>
								</picker>
							</view>
						</view>
						<view class='item acea-row row-between-wrapper'>
							<view class='name'>提币</view>
							<view class='input'><input :placeholder='"最低提币贡献值"+minPrice' placeholder-class='placeholder' name="extract_price" type='digit'></input></view>
						</view>
						<view class='tip'>
							当前可提现贡献值: <text class="price">￥{{userInfo.now_money}}</text>
						</view>
						
						<button formType="submit" class='bnt bg-color'>提币</button>
					</form>
				</view>
				<view :hidden='currentTab != 1' class='list'>
					<form @submit="subCash" report-submit='true'>
						<view class='item acea-row row-between-wrapper'>
							<view class='name'>账号</view>
							<view class='input'><input placeholder='请填写您的提币账号' placeholder-class='placeholder' name="wechat"></input></view>
						</view>
						<view class='item acea-row row-between-wrapper'>
							<view class='name'>贡献值</view>
							<view class='input'><input :placeholder='"最低提币贡献值"+minPrice' placeholder-class='placeholder' name="extract_price" type='digit'></input></view>
						</view>
						<view class='tip'>
							当前可提现贡献值: <text class="price">￥{{userInfo.now_money}}</text>
						</view>
						<button formType="submit" class='bnt bg-color'>确定</button>
					</form>
				</view>
				<view :hidden='currentTab != 2' class='list'>
					<form @submit="subCash" report-submit='true'>
						<view class='item acea-row row-between-wrapper'>
							<view class='name'>账号</view>
							<view class='input'><input placeholder='请填写您的支付宝账号' placeholder-class='placeholder' name="alipay_code"></input></view>
						</view>
						<view class='item acea-row row-between-wrapper'>
							<view class='name'>提币</view>
							<view class='input'><input :placeholder='"最低提币贡献值"+minPrice' placeholder-class='placeholder' name="extract_price" type='digit'></input></view>
						</view>
						<view class='tip'>
							当前可提现贡献值: <text class="price">￥{{userInfo.now_money}}</text>
						</view>
						<button formType="submit" class='bnt bg-color'>提币</button>
					</form>
				</view>
                <navigator style="text-align: center;
    color: rgb(102, 102, 102);
    text-decoration: underline;
    margin-top: -1rem;
}" url='/pages/users/user_spread_money/index?type=1' hover-class="none" class='record'>提现记录</navigator>
			</view>
		</view>
		<!-- #ifdef MP -->
		<authorize @onLoadFun="onLoadFun" :isAuto="isAuto" :isShowAuth="isShowAuth" @authColse="authColse"></authorize>
		<!-- #endif -->
	</view>
</template>

<script>
	import {
		extractCash,
		extractBank,
		getUserInfo,
		spreadInfo
	} from '@/api/user.js';
	import {
		toLogin
	} from '@/libs/login.js';
	import {
		mapGetters
	} from "vuex";
	// #ifdef MP
	import authorize from '@/components/Authorize';
	// #endif
	export default {
		components: {
			// #ifdef MP
			authorize
			// #endif
		},
		data() {
			return {
				navList: [
     //                {
					// 	'name': '银行卡',
					// 	'icon': 'icon-yinhangqia'
					// },
					{
						'name': '微信',
						'icon': 'icon-weixin2'
					},
					// {
					// 	'name': '支付宝',
					// 	'icon': 'icon-icon34'
					// }
				],
				currentTab: 1,
				index: 0,
				array: [], //提币银行
				minPrice: 0.00, //最低提币贡献值
				userInfo: [],
				isClone: false,
				isAuto: false, //没有授权的不会自动授权
				isShowAuth: false //是否隐藏授权
			};
		},
		computed: mapGetters(['isLogin']),
		onLoad() {
			if (this.isLogin) {
				this.getUserInfo();
				this.getUserExtractBank();
			} else {
				// #ifdef H5 || APP-PLUS
				toLogin();
				// #endif 
				// #ifdef MP
				this.isAuto = true;
				this.$set(this, 'isShowAuth', true);
				// #endif
			}
		},
		methods: {
			onLoadFun: function() {
				this.isShowAuth = false;
				this.getUserInfo();
				// this.getUserExtractBank();
			},
			// 授权关闭
			authColse: function(e) {
				this.isShowAuth = e
			},
			getUserExtractBank: function() {
				let that = this;
				extractBank().then(res => {
					let array = res.data;
					that.$set(that, 'array', array);
				});
			},
			/**
			 * 获取个人用户信息
			 */
			getUserInfo: function() {
				let that = this;
				spreadInfo().then(res => {
					that.userInfo = res.data;
				});
			},
			swichNav: function(current) {
				this.currentTab = current;
			},
			bindPickerChange: function(e) {
				this.index = e.detail.value;
			},
			subCash: function(e) {
				let that = this,
					value = e.detail.value;
					
				if (that.currentTab == 0) { //银行卡
					if (value.real_name.length == 0) return this.$util.Tips({
						title: '请填写持卡人姓名'
					});
					if (value.bank_code.length == 0) return this.$util.Tips({
						title: '请填写卡号'
					});
					// if (that.index == 0) return this.$util.Tips({
					// 	title: "请选择银行"
					// });
					value.extract_type = 'bank';
					value.bank_name = that.array[that.index].name;
				} else if (that.currentTab == 1) { //微信
					value.extract_type = 'weixin';
					if (value.wechat.length == 0) return this.$util.Tips({
						title: '请填写提币号'
					});
				} else if (that.currentTab == 2) { //支付宝
					value.extract_type = 'alipay';
					if (value.alipay_code.length == 0) return this.$util.Tips({
						title: '请填写账号'
					});
				}
				if (value.extract_price.length == 0) return this.$util.Tips({
					title: '请填写提币贡献值'
				});
				if (value.extract_price < that.minPrice) return this.$util.Tips({
					title: '提币贡献值不能低于' + that.minPrice
				});
				value.extract_type = this.currentTab
				console.log(value,'value')
				extractCash(value).then(res => {
					that.getUserInfo();
					return that.$util.Tips({
						title: res.message,
						icon: 'success'
					},{
						tab:3
					});
				}).catch(err => {
					return that.$util.Tips({
						title: err
					});
				});
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #fff !important;
	}

	.cash-withdrawal .nav {
		height: 130rpx;
		box-shadow: 0 10rpx 10rpx #f8f8f8;
	}

	.cash-withdrawal .nav .item {
		font-size: 26rpx;
		flex: 1;
		text-align: center;
	}

	.cash-withdrawal .nav .item~.item {
		border-left: 1px solid #f0f0f0;
	}

	.cash-withdrawal .nav .item .iconfont {
		width: 40rpx;
		height: 40rpx;
		border-radius: 50%;
		border: 2rpx solid #e93323;
		text-align: center;
		line-height: 37rpx;
		margin: 0 auto 6rpx auto;
		font-size: 22rpx;
		box-sizing: border-box;
	}

	.cash-withdrawal .nav .item .iconfont.on {
		background-color: #e93323;
		color: #fff;
		border-color: #e93323;
	}

	.cash-withdrawal .nav .item .line {
		width: 2rpx;
		height: 20rpx;
		margin: 0 auto;
		transition: height 0.3s;
	}

	.cash-withdrawal .nav .item .line.on {
		height: 39rpx;
	}

	.cash-withdrawal .wrapper .list {
		padding: 0 30rpx;
	}

	.cash-withdrawal .wrapper .list .item {
		border-bottom: 1rpx solid #eee;
		height: 107rpx;
		font-size: 30rpx;
		color: #333;
	}

	.cash-withdrawal .wrapper .list .item .name {
		width: 130rpx;
	}

	.cash-withdrawal .wrapper .list .item .input {
		width: 505rpx;
	}

	.cash-withdrawal .wrapper .list .item .input .placeholder {
		color: #bbb;
	}

	.cash-withdrawal .wrapper .list .tip {
		font-size: 26rpx;
		color: #999;
		margin-top: 25rpx;
	}

	.cash-withdrawal .wrapper .list .bnt {
		font-size: 32rpx;
		color: #fff;
		width: 690rpx;
		height: 90rpx;
		text-align: center;
		border-radius: 50rpx;
		line-height: 90rpx;
		margin: 64rpx auto;
	}

	.cash-withdrawal .wrapper .list .tip2 {
		font-size: 26rpx;
		color: #999;
		text-align: center;
		margin: 44rpx 0 20rpx 0;
	}

	.cash-withdrawal .wrapper .list .value {
		height: 135rpx;
		line-height: 135rpx;
		border-bottom: 1rpx solid #eee;
		width: 690rpx;
		margin: 0 auto;
	}

	.cash-withdrawal .wrapper .list .value input {
		font-size: 80rpx;
		color: #282828;
		height: 135rpx;
		text-align: center;
	}

	.cash-withdrawal .wrapper .list .value .placeholder2 {
		color: #bbb;
	}

	.price {
		color: $theme-color;
	}
</style>
