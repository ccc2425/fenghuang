<template>
	<view>
		<form @submit="submitSub" report-submit='true'>
			<view class="payment-top acea-row row-column row-center-wrapper">
				<span class="name">贡献值</span>
				<view class="pic">
					￥<span class="pic-font">{{ userinfo.now_money || 0 }}</span>
				</view>
			</view>
			<view class="payment">
				<view class='tip picList' v-if='!active'>
					<view class="pic-box pic-box-color acea-row row-center-wrapper row-column" :class="activePic == index ? 'pic-box-color-active' : ''"
					 v-for="(item, index) in picList" :key="index" @click="picCharge(index, item)">
						<view class="pic-number-pic">
							{{ item.amount }}<span class="pic-number"> 元</span>
						</view>
						<view class="pic-number">手续费：{{ item.money }} 元</view>
					</view>
					<view class="pic-box pic-box-color acea-row row-center-wrapper" :class="activePic == picList.length ? 'pic-box-color-active' : ''"
					 @click="picCharge(-1)">
						<input type="number" placeholder="其他" v-model="money" class="pic-box-money pic-number-pic" :class="activePic == picList.length ? 'pic-box-color-active' : ''" />
					</view>
				</view>
				<view class="tip" v-else>
					<view class='input'><text>￥</text><input placeholder="0.00" type='number' placeholder-class='placeholder' :value="number"
						 name="number"></input></view>
					<view class="tips-title">
						<view style="font-weight: bold; font-size: 26rpx;">提示：</view>
						<view style="margin-top: 10rpx;">当前佣金为 <text class='font-color'>￥100</text></view>
					</view>
				</view>
				<button class='but bg-color' @click="submitSub">立即卖出</button>
			</view>
            
            <view :hidden="userFeedbackHidden" class="popup_content">
                <view class="popup_title">验证支付密码</view>
                <view class="popup_textarea_item">
                    <input class="inpit" type="password" placeholder="请输入支付密码" value="" v-model="pay_pwd"/>
                    <view @click="authpaypwd()" class="sell">确认
                    </view>
                </view>
            </view>
            <view class="popup_overlay" :hidden="userFeedbackHidden" @click="hideDiv()"></view>
		</form>
		<!-- #ifdef MP -->
		<authorize @onLoadFun="onLoadFun" :isAuto="isAuto" :isShowAuth="isShowAuth" @authColse="authColse"></authorize>
		<!-- #endif -->
	</view>
</template>

<script>
	import {
		spreadInfo,
		rechargeRoutine,
		rechargeWechat,
		getRechargeApi,
        getMoneyConfig,
        createMoneyOrder,
        getMoneyOrderData,
        authPayPwd,
		rechargeBrokerage
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
			let that = this;
			return {
				now_money: 0,
				active: 0,
				number: '',
				userinfo: {},
				picList: [],
				activePic: 0,
                
                pay_pwd:'',
                params:[],
                userFeedbackHidden:true,
                
				money: "",
			};
		},
		computed: mapGetters(['isLogin']),
		onLoad(options) {
			// #ifdef H5
			this.from = this.$wechat.isWeixin() ? "wechat" : "h5"
			// #endif
			if (this.isLogin) {
				this.getUserInfo();
				this.getRecharge();
			} else {
				// #ifdef H5 || APP-PLUS
				toLogin();
				// #endif 
				// #ifdef MP
				this.isAuto = true;
				this.$set(this, 'isShowAuth', true)
				// #endif
			}
		},
		methods: {

			/**
			 * 选择金额
			 */
			picCharge(idx, item) {
				this.activePic = idx;
				if (item === undefined) {
					this.rechar_id = 0;
					this.numberPic = "";
				} else {
					this.money = "";
					this.rechar_id = item.id;
					this.numberPic = item.amount;
				}
                console.log(idx)
			},

			/**
			 * 交易额度选择
			 */
			getRecharge() {
				getMoneyConfig()
					.then(res => {
						this.picList = res.data;
					})
					.catch(res => {
						this.$dialog.toast({
							mes: res
						});
					});
			},


			onLoadFun: function() {
				this.isShowAuth = false;
				this.getUserInfo();
				this.getRecharge();
			},
			// 授权关闭
			authColse: function(e) {
				this.isShowAuth = e
			},
			navRecharges: function(index) {
				this.active = index;
			},
			/**
			 * 获取用户信息
			 */
			getUserInfo: function() {
				let that = this;
				spreadInfo().then(res => {
					that.$set(that, 'userinfo', res.data);
				})
			},
			/*
			 * 用户充值
			 */
			submitSub: function() {
                
				let that = this
                let value = that.numberPic;
                if(this.activePic == -1){
                    value = that.money;
                }
                console.log(value)
				if (parseFloat(value) < 0 || parseFloat(value) == NaN || value == undefined || value == "") {
					return that.$util.Tips({
						title: '请输入金额'
					});
				}
                
                this.params = {
                    amount:value
                }
                this.authpaypwd2()
                
			},
            op2: function() {
            	let that = this
                getMoneyOrderData(that.params).then(({data})=>{
                    uni.showModal({
                    	title: '贡献值交易',
                    	content: '本次交易手续费比例为：'+data.ratio+'%，交易贡献值：'+data.amount+',手续费：'+data.money+'，共支付贡献值：'+data.total+'；贡献值交易创建后可以取消，是否确认',
                    	success(res) {
                    		if (res.confirm) {
                    			createMoneyOrder(that.params).then(res => {
                    					return that.$util.Tips({
                    						title: '订单创建成功',
                    						icon: 'success'
                    					}, {
                    						tab: 5,
                    						url: '/pages/users/user_money_pay_list/index'
                    					});
                    				}).catch(err => {
                    					return that.$util.Tips({
                    						title: err
                    					})
                    				});
                    		} else if (res.cancel) {
                    			return that.$util.Tips({
                    				title: '已取消'
                    			});
                    		}
                    	},
                    })
                })
            },
            authpaypwd: function() {
                let that = this
                authPayPwd({
                    pay_pwd:this.pay_pwd,
                }).then(function(res) {
                    that.userFeedbackHidden = true
                    that.op2()
                }).catch((res) => {
                    uni.showModal({
                    	content: res,
                    	success(res) {
                    	},
                    })
                });
            },
            authpaypwd2: function() {
                let that = this
                that.userFeedbackHidden = false
            },
            hideDiv:function(){
                this.userFeedbackHidden = true
            }
		}
	}
</script>

<style lang="scss">
	page {
		width: 100%;
		height: 100%;
		background-color: #fff;
	}

	.payment {
		position: relative;
		top: -60rpx;
		width: 100%;
		background-color: #fff;
		border-radius: 10rpx;
		padding-top: 25rpx;
		border-top-right-radius: 39rpx;
		border-top-left-radius: 39rpx;
	}

	.payment .nav {
		height: 75rpx;
		line-height: 75rpx;
		padding: 0 100rpx;
	}

	.payment .nav .item {
		font-size: 30rpx;
		color: #333;
	}

	.payment .nav .item.on {
		font-weight: bold;
		border-bottom: 4rpx solid #e83323;
	}

	.payment .input {
		display: flex;
		align-items: center;
		justify-content: center;
		border-bottom: 1px dashed #dddddd;
		margin: 60rpx auto 0 auto;
		padding-bottom: 20rpx;
		font-size: 56rpx;
		color: #333333;
		flex-wrap: nowrap;

	}

	.payment .input text {
		padding-left: 106rpx;
	}

	.payment .input input {
		padding-right: 106rpx;
		width: 300rpx;
		height: 94rpx;
		text-align: center;
		font-size: 70rpx;
	}

	.payment .placeholder {
		color: #d0d0d0;
		height: 100%;
		line-height: 94rpx;
	}

	.payment .tip {
		font-size: 26rpx;
		color: #888888;
		padding: 0 30rpx;
		margin-top: 25rpx;
	}

	.payment .but {
		color: #fff;
		font-size: 30rpx;
		width: 700rpx;
		height: 86rpx;
		border-radius: 50rpx;
		margin: 46rpx auto 0 auto;
		line-height: 86rpx;
	}

	.payment-top {
		width: 100%;
		height: 350rpx;
		background-color: #e83323;

		.name {
			font-size: 26rpx;
			color: rgba(255, 255, 255, 0.8);
			margin-top: -38rpx;
			margin-bottom: 30rpx;
		}

		.pic {
			font-size: 32rpx;
			color: #fff;
		}

		.pic-font {
			font-size: 78rpx;
			color: #fff;
		}
	}

	.picList {
		display: flex;
		flex-wrap: wrap;
		margin: 30rpx 0;

		.pic-box {
			width: 32%;
			height: auto;
			border-radius: 20rpx;
			margin-top: 21rpx;
			padding: 20rpx 0;
			margin-right: 12rpx;

			&:nth-child(3n) {
				margin-right: 0;
			}
		}

		.pic-box-color {
			background-color: #f4f4f4;
			color: #656565;
		}

		.pic-number {
			font-size: 22rpx;
		}

		.pic-number-pic {
			font-size: 38rpx;
			margin-right: 10rpx;
			text-align: center;
		}

		.pic-box-color-active {
			background-color: #ec3323 !important;
			color: #fff !important;
		}
	}

	.tips-box {
		.tips {
			font-size: 28rpx;
			color: #333333;
			font-weight: 800;
			margin-bottom: 14rpx;
			margin-top: 20rpx;
		}

		.tips-samll {
			font-size: 24rpx;
			color: #333333;
			margin-bottom: 14rpx;
		}

		.tip-box {
			margin-top: 30rpx;
		}
	}

	.tips-title {
		margin-top: 20rpx;
		font-size: 24rpx;
		color: #333;
	}
    
    
    
    
    
    .popup_overlay {
         
    	position: fixed;
    	top: 0%;
    	left: 0%;
    	width: 100%;
    	height: 100%;
    	background-color: black;
    	z-index: 900;
    	-moz-opacity: 0.8;
    	opacity: .80;
    	filter: alpha(opacity=88);
    }
         
    .popup_content {
    	position: fixed;
    	top: 50%;
    	left: 50%;
    	width: 520upx;
    	height: 200px;
    	margin-left: -270upx;
    	margin-top: -270upx;
    	border: 10px solid white;
    	background-color: white;
    	z-index: 901;
    	overflow: auto;
    	border-radius: 20upx;
    }
         
    .popup_title {
    	padding-top: 20upx;
    	width: 480upx;
    	text-align: center;
    	font-size: 32upx;
    }
         
    .popup_textarea_item {
    	padding-top: 5upx;
    	height: 240upx;
    	width: 440upx;
    	margin-top: 30upx;
    	margin-left: 20upx;
    }
         
    .popup_textarea {
    	width: 410upx;
    	font-size: 26upx;
    	margin-left: 20upx;
    }
         
    .popup_button {
    	color: white;
    	background-color: #4399FC;
    	border-radius: 20upx;
        margin-top: 20px;
    }
    .inpit{
        display: block;
        font-size: 16px;
        line-height: 40px;
        height: 40px;
        min-height: 40px;
        overflow: hidden;
        border: 1px solid #d2d2d2;
        background: white;
        text-indent: 10px;
    }
    .sell{
        width: 90%;
        background: #ea4334;
        color: white;
        text-align: center;
        height: 40px;
        line-height: 40px;
        margin: 0 auto;
        border-radius: 500px;
        position: absolute;
        bottom: 30px;
        left: 5%;
    }
</style>
