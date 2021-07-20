<template>
	<view>
		<view class="payment" :class="pay_close ? 'on' : ''">
			<view class="title acea-row row-center-wrapper">
				选择付款方式<text class="iconfont icon-guanbi" @click='close'></text>
			</view>
			<view class="item acea-row row-between-wrapper" @click='goPay(item.number || 0 , item.value)' v-for="(item,index) in payMode"
			 :key="index" v-if="item.payStatus == 1">
				<view class="left acea-row row-between-wrapper">
					<view class="iconfont" :class="item.icon"></view>
					<view class="text">
						<view class="name">{{item.name}}</view>
						<view class="info" v-if="item.number">
							{{item.title}} <span class="money">￥{{ item.number }}</span>
						</view>
						<view class="info" v-else>{{item.title}}</view>
					</view>
				</view>
				<view class="iconfont icon-xiangyou"></view>
			</view>
            <input v-if="paytype==1" placeholder="请输入支付密码" class="pwd" type="password" v-model="pay_pwd">
            <view v-if="paytype==1" class='bnt bg-color' @click.stop='goPayBalance()'>立即付款</view>
		</view>
		<view class="mask" @click='close' v-if="pay_close"></view>
	</view>
</template>

<script>
	import {
		orderPay
	} from '@/api/order.js';
	export default {
		props: {
			payMode: {
				type: Array,
				default: function() {
					return [];
				}
			},
			pay_close: {
				type: Boolean,
				default: false,
			},
			order_id: {
				type: String,
				default: ''
			},
			totalPrice: {
				type: String,
				default: '0'
			}
		},
		data() {
			return {
                pay_pwd : '',
                paytype: 0
			};
		},
		methods: {
			close: function() {
				this.$emit('onChangeFun', {
					action: 'payClose'
				});
			},
            goPayBalance:function(){
                let that = this;
                let type = 'balance';
                if (!that.order_id) return that.$util.Tips({
                    title: '请选择要支付的订单'
                });
                // if (paytype == 'balance' && parseFloat(number) < parseFloat(that.totalPrice)) return that.$util.Tips({
                // 	title: '余额不足！'
                // });
                if(!this.pay_pwd) return that.$util.Tips({
                	title: '请输入支付密码！'
                });
               
                uni.showLoading({
                    title: '支付中'
                });
                orderPay(that.order_id, {
                    type: type,
                    pay_pwd: this.pay_pwd
                }).then(res => {
                    if (res.message == 'success') {
                        switch (type) {
                            case 'wechat':
                            case 'routine':
                            case 'weixin':
                            case 'h5':
                                if (res.data.result === undefined) return that.$util.Tips({
                                    title: '缺少支付参数'
                                });
                                // #ifdef MP || APP-PLUS
                                let jsConfig = res.data.result.config;
                                uni.requestPayment({
                                    timeStamp: jsConfig.timestamp,
                                    nonceStr: jsConfig.nonceStr,
                                    package: jsConfig.package,
                                    signType: jsConfig.signType,
                                    paySign: jsConfig.paySign,
                                    success: function(res) {
                                        uni.hideLoading();
                                        return that.$util.Tips({
                                            title: res.msg,
                                            icon: 'success'
                                        }, () => {
                                            that.$emit('onChangeFun', {
                                                action: 'pay_complete'
                                            });
                                        });
                                    },
                                    fail: function(e) {
                                        uni.hideLoading();
                                        return that.$util.Tips({
                                            title: '取消支付'
                                        }, () => {
                                            that.$emit('onChangeFun', {
                                                action: 'pay_fail'
                                            });
                                        });
                                    },
                                    complete: function(e) {
                                        uni.hideLoading();
                                        if (e.errMsg == 'requestPayment:cancel') return that.$util.Tips({
                                            title: '取消支付'
                                        }, () => {
                                            that.$emit('onChangeFun', {
                                                action: 'pay_fail'
                                            });
                                        });
                                    },
                                });
                                // #endif
                                // #ifdef H5
                                let data = res.data;
                                if (data.status == "h5") {
                                    uni.hideLoading();
                                    setTimeout(res=>{
                                        location.replace(data.result.config.mweb_url);
                                        that.$emit('onChangeFun', {
                                            action: 'pay_complete'
                                        });
                                    },1000)
                                } else {
                                    that.$wechat.pay(data.result.config)
                                        .finally(() => {
                                            return that.$util.Tips({
                                                title: "支付成功",
                                                icon: 'success'
                                            }, () => {
                                                that.$emit('onChangeFun', {
                                                    action: 'pay_complete'
                                                });
                                            });
                                        })
                                        .catch(function() {
                                            return that.$util.Tips({
                                                title: '支付失败'
                                            });
                                        });
                                }
                                // #endif
                                break;
                            case 'balance':
                                uni.hideLoading();
                                return that.$util.Tips({
                                    title: res.message,
                                    icon: 'success'
                                }, () => {
                                    that.$emit('onChangeFun', {
                                        action: 'pay_complete'
                                    });
                                });
                                break;
                            case 'offline':
                                uni.hideLoading();
                                return that.$util.Tips({
                                    title: res.msg,
                                    icon: 'success'
                                }, () => {
                                    that.$emit('onChangeFun', {
                                        action: 'pay_complete'
                                    });
                                });
                                break;
                        }
                    } else {
                        uni.hideLoading();
                        uni.showToast({
                            title: res.message,
                            icon: 'none'
                        })
                        that.$emit('onChangeFun', {
                            action: 'pay_fail'
                        });
                    }
                }).catch(err => {
                    uni.hideLoading();
                    return that.$util.Tips({
                        title: err
                    }, () => {
                        that.$emit('onChangeFun', {
                            action: 'pay_fail'
                        });
                    });
                })
            },
			goPay: function(number, paytype) {
				let that = this;
				let type = ''

				if (paytype == 'wechat') {
					// #ifdef H5
					type = this.$wechat.isWeixin() ? 'weixin' : 'h5';
					// #endif

					// #ifdef MP
					type = 'routine';
					// #endif
				} else if (paytype == 'balance') {
					type = 'balance';
                    this.paytype = 1
				}
                
                if (paytype != 'balance') {
                    
                    this.paytype = 0
                    if (!that.order_id) return that.$util.Tips({
                        title: '请选择要支付的订单'
                    });
                    // if (paytype == 'balance' && parseFloat(number) < parseFloat(that.totalPrice)) return that.$util.Tips({
                    // 	title: '余额不足！'
                    // });
                    uni.showLoading({
                        title: '支付中'
                    });
                    orderPay(that.order_id, {
                        type: type,
                    }).then(res => {
                        if (res.message == 'success') {
                            switch (type) {
                                case 'wechat':
                                case 'routine':
                                case 'weixin':
                                case 'h5':
                                    if (res.data.result === undefined) return that.$util.Tips({
                                        title: '缺少支付参数'
                                    });
                                    // #ifdef MP || APP-PLUS
                                    let jsConfig = res.data.result.config;
                                    uni.requestPayment({
                                        timeStamp: jsConfig.timestamp,
                                        nonceStr: jsConfig.nonceStr,
                                        package: jsConfig.package,
                                        signType: jsConfig.signType,
                                        paySign: jsConfig.paySign,
                                        success: function(res) {
                                            uni.hideLoading();
                                            return that.$util.Tips({
                                                title: res.msg,
                                                icon: 'success'
                                            }, () => {
                                                that.$emit('onChangeFun', {
                                                    action: 'pay_complete'
                                                });
                                            });
                                        },
                                        fail: function(e) {
                                            uni.hideLoading();
                                            return that.$util.Tips({
                                                title: '取消支付'
                                            }, () => {
                                                that.$emit('onChangeFun', {
                                                    action: 'pay_fail'
                                                });
                                            });
                                        },
                                        complete: function(e) {
                                            uni.hideLoading();
                                            if (e.errMsg == 'requestPayment:cancel') return that.$util.Tips({
                                                title: '取消支付'
                                            }, () => {
                                                that.$emit('onChangeFun', {
                                                    action: 'pay_fail'
                                                });
                                            });
                                        },
                                    });
                                    // #endif
                                    // #ifdef H5
                                    let data = res.data;
                                    if (data.status == "h5") {
                                        uni.hideLoading();
                                        setTimeout(res=>{
                                            location.replace(data.result.config.mweb_url);
                                            that.$emit('onChangeFun', {
                                                action: 'pay_complete'
                                            });
                                        },1000)
                                    } else {
                                        that.$wechat.pay(data.result.config)
                                            .finally(() => {
                                                return that.$util.Tips({
                                                    title: "支付成功",
                                                    icon: 'success'
                                                }, () => {
                                                    that.$emit('onChangeFun', {
                                                        action: 'pay_complete'
                                                    });
                                                });
                                            })
                                            .catch(function() {
                                                return that.$util.Tips({
                                                    title: '支付失败'
                                                });
                                            });
                                    }
                                    // #endif
                                    break;
                                case 'balance':
                                    uni.hideLoading();
                                    return that.$util.Tips({
                                        title: res.message,
                                        icon: 'success'
                                    }, () => {
                                        that.$emit('onChangeFun', {
                                            action: 'pay_complete'
                                        });
                                    });
                                    break;
                                case 'offline':
                                    uni.hideLoading();
                                    return that.$util.Tips({
                                        title: res.msg,
                                        icon: 'success'
                                    }, () => {
                                        that.$emit('onChangeFun', {
                                            action: 'pay_complete'
                                        });
                                    });
                                    break;
                            }
                        } else {
                            uni.hideLoading();
                            uni.showToast({
                                title: res.message,
                                icon: 'none'
                            })
                            that.$emit('onChangeFun', {
                                action: 'pay_fail'
                            });
                        }
                    }).catch(err => {
                        uni.hideLoading();
                        return that.$util.Tips({
                            title: err
                        }, () => {
                            that.$emit('onChangeFun', {
                                action: 'pay_fail'
                            });
                        });
                    })
                }
			}
		}
	}
</script>

<style scoped lang="scss">
    .bnt {
        margin: 0 auto;
    	width: 60%;
    	height: 60rpx;
    	text-align: center;
    	line-height: 60rpx;
    	color: #fff;
    	border-radius: 50rpx;
    	font-size: 27rpx;
    }
    .pwd{
        border: 1px solid #eee;
        width: 80%;
        display: block;
        height: 35px;
        line-height: 35px;
        margin: 20px auto;
        text-indent: 10px;
    }
	.payment {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		border-radius: 16rpx 16rpx 0 0;
		background-color: #fff;
		padding-bottom: 60rpx;
		z-index: 99;
		transition: all 0.3s cubic-bezier(0.25, 0.5, 0.5, 0.9);
		transform: translate3d(0, 100%, 0);
	}

	.payment.on {
		transform: translate3d(0, 0, 0);
	}

	.payment .title {
		text-align: center;
		height: 123rpx;
		font-size: 32rpx;
		color: #282828;
		font-weight: bold;
		padding-right: 30rpx;
		margin-left: 30rpx;
		position: relative;
		border-bottom: 1rpx solid #eee;
	}

	.payment .title .iconfont {
		position: absolute;
		right: 30rpx;
		top: 50%;
		transform: translateY(-50%);
		font-size: 43rpx;
		color: #8a8a8a;
		font-weight: normal;
	}

	.payment .item {
		border-bottom: 1rpx solid #eee;
		height: 130rpx;
		margin-left: 30rpx;
		padding-right: 30rpx;
	}

	.payment .item .left {
		width: 610rpx;
	}

	.payment .item .left .text {
		width: 540rpx;
	}

	.payment .item .left .text .name {
		font-size: 32rpx;
		color: #282828;
	}

	.payment .item .left .text .info {
		font-size: 24rpx;
		color: #999;
	}

	.payment .item .left .text .info .money {
		color: #ff9900;
	}

	.payment .item .left .iconfont {
		font-size: 45rpx;
		color: #09bb07;
	}

	.payment .item .left .iconfont.icon-zhifubao {
		color: #00aaea;
	}

	.payment .item .left .iconfont.icon-yuezhifu {
		color: #ff9900;
	}

	.payment .item .left .iconfont.icon-yuezhifu1 {
		color: #eb6623;
	}

	.payment .item .iconfont {
		font-size: 0.3rpx;
		color: #999;
	}
</style>
