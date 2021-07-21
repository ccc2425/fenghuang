<template>
	<view>
		<view class='my-order'>
			<!-- <view class="head-wrapper">
				<view class="head-menu fh">
					<view class='iconfont icon-xiangzuo ft20' style="width: 10%;float: left;margin-left: 10px;" @click="returns"></view>
					<view style="width: 80%;float: left;text-align: center;">我的夺宝</view>
				</view>
			</view>		 -->
			<view class='header bg-color'>
				<view class='picTxt acea-row row-between-wrapper'>
				
				</view>
			</view>
			<view class='nav acea-row row-around'>
				<view class='item' :class='orderStatus==0 ? "on": ""' @click="statusClick(0)">
					<view>待开奖</view>
					<view class='num'>{{orderData.noPostage || 0}}</view>
				</view>
				<view class='item' :class='orderStatus==1 ? "on": ""' @click="statusClick(1)">
					<view>已开奖</view>
					<view class='num'>{{orderData.done || 0}}</view>
				</view>
			</view>
			<view class='list'>
				<!-- 代付款 -->
				<block v-if="orderStatus == 0">
					<view class='item' v-for="(item,index) in orderList" :key="index">
						<view @click='goOrderDetails(item.group_order_id)'>
							<view class='title acea-row row-between-wrapper'>
								<view class="acea-row row-middle left-wrapper">
									{{item.order_sn}}
								</view>
								<view class='font-color'>待开奖</view>
							</view>
							<view class='item-info acea-row row-between row-top'>
								
									<view class='pictrue'>
										<image :src='item.image_input'></image>
									</view>
									<view class='text acea-row row-between'>
										<view class='name line2'>{{item.title}}</view>
										<view class='money'>
											<view>￥{{item.price}}</view>
										</view>
									</view>
								
							</view>
						</view>
					</view>
				</block>

				<block v-if="orderStatus == 1">
					<view class='item' v-for="(item,index) in orderList" :key="index">
						<view @click='goOrderDetails(item.group_order_id)'>
							<view class='title acea-row row-between-wrapper'>
								<view class="acea-row row-middle left-wrapper">
									{{item.order_sn}}
								</view>
								<view class='font-color'>{{item.is_zj}}</view>
							</view>
							<view class='item-info acea-row row-between row-top'>
								
									<view class='pictrue'>
										<image :src='item.image_input'></image>
									</view>
									<view class='text acea-row row-between'>
										<view class='name line2'>{{item.title}}</view>
										<view class='money'>
											<view>￥{{item.price}}</view>
										</view>
									</view>
								
							</view>
						</view>
					</view>
				</block>
				<!-- 待发货 待收货 待评价 已完成 -->
			</view>
			<view class='loadingicon acea-row row-center-wrapper' v-if="orderList.length>0">
				<text class='loading iconfont icon-jiazai' :hidden='loading==false'></text>{{loadTitle}}
			</view>
			<view v-if="orderList.length == 0">
				<emptyPage title="暂无订单~"></emptyPage>
			</view>
		</view>
		<view class='noCart' v-if="orderList.length == 0 && page > 1">
			<view class='pictrue'>
				<image src='/images/noOrder.png'></image>
			</view>
		</view>
		<!-- #ifdef MP -->
		<authorize @onLoadFun="onLoadFun" :isAuto="isAuto" :isShowAuth="isShowAuth" @authColse="authColse"></authorize>
		<!-- #endif -->
		<payment :payMode='payMode' :pay_close="pay_close" @onChangeFun='onChangeFun' :order_id="pay_order_id" :totalPrice='totalPrice'></payment>
        
        
        
        <view :hidden="userFeedbackHidden" class="popup_content">
            <view class="popup_title">物流信息查询</view>
            <view class="popup_textarea_item">
                <view data-v-3aa9d468="" class="logistics acea-row row-top"><view data-v-3aa9d468="" class="logistics_img"><img data-v-3aa9d468="" src="data:image/jpeg;base64,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"></view> <view data-v-3aa9d468="" class="logistics_cent"><span data-v-3aa9d468="">物流公司：{{order.delivery_name}}</span> <span data-v-3aa9d468="">物流单号：{{order.delivery_id}}</span></view></view>
                <view class="ri" v-for="(item,index) in express" >
                    <view class="express_time">
                        {{item.time}}
                    </view>
                    <view class="express_text">
                        {{item.status}}
                    </view>
                </view>
            </view>
        </view>
        <view class="popup_overlay" :hidden="userFeedbackHidden" @click="hideDiv()"></view>
        
        
        
	</view>
</template>

<script>
	let app = getApp();
	import {
		getOrderList,
		orderData,
		lootOrderData,
        express,
		unOrderCancel,
		orderDel,
		orderPay,
		groupLootList,
		orderTake
	} from '@/api/order.js';
	import {
		getUserInfo
	} from '@/api/user.js';
	import {
		openOrderSubscribe
	} from '@/utils/SubscribeMessage.js';
	import payment from '@/components/payment';
	import {
		toLogin
	} from '@/libs/login.js';
	import {
		mapGetters
	} from "vuex";
	// #ifdef MP
	import authorize from '@/components/Authorize';
	// #endif
	import emptyPage from '@/components/emptyPage.vue'
	export default {
		components: {
			payment,
			emptyPage,
			// #ifdef MP
			authorize
			// #endif
		},
		data() {
			return {
				loading: false, //是否加载中
				loadend: false, //是否加载完毕
				loadTitle: '加载更多', //提示语
				orderList: [], //订单数组
				orderData: {}, //订单详细统计
				orderStatus: 0, //订单状态
                express: {},
                order: {},
                userFeedbackHidden:true,
				page: 1,
				limit: 20,
				payMode: [
     //                {
					// 	name: "微信支付",
					// 	icon: "icon-weixinzhifu",
					// 	value: 'wechat',
					// 	title: '微信快捷支付',
					// 	payStatus: 1
					// },
					{
						name: "贡献值支付",
						icon: "icon-yuezhifu",
						value: 'balance',
						title: '可用贡献值:',
						number: 0,
						payStatus: app.globalData.yue_pay_status
					}
				],
				pay_close: false,
				pay_order_id: '',
				totalPrice: '0',
				isAuto: false, //没有授权的不会自动授权
				isShowAuth: false //是否隐藏授权
			};
		},
		computed: mapGetters(['isLogin']),
		onShow() {
			if (this.isLogin) {
				this.$set(this, 'orderList', []);
				this.page = 1;
				this.loadend = false;
				this.loading = false;
				this.getOrderData();
				this.getOrderList();
				this.getUserInfo();
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
			// 后退
			returns: function() {
				location.href = '/pages/user/index'
				
			},
			
			onLoadFun() {
				this.isShowAuth = false;
				this.getOrderData();
				this.getOrderList();
				this.getUserInfo();
			},
			// 授权关闭
			authColse: function(e) {
				this.isShowAuth = e
			},
			/**
			 * 事件回调
			 * 
			 */
			onChangeFun: function(e) {
				let opt = e;
				let action = opt.action || null;
				let value = opt.value != undefined ? opt.value : null;
				(action && this[action]) && this[action](value);
			},
			/**
			 * 获取用户信息
			 * 
			 */
			getUserInfo: function() {
				let that = this;
				getUserInfo().then(res => {
                    
					that.payMode[0].number = res.data.now_money;
					that.$set(that, 'payMode', that.payMode);
				});
			},
            
            hideDiv:function(){
                this.userFeedbackHidden = true
            },
			/**
			 * 关闭支付组件
			 * 
			 */
			payClose: function() {
				this.pay_close = false;
			},
			/**
			 * 生命周期函数--监听页面加载
			 */
			onLoad: function(options) {
				if (options.status) this.orderStatus = options.status;
			},
			/**
			 * 获取订单统计数据
			 * 
			 */
			getOrderData: function() {
				let that = this;
				lootOrderData().then(res => {
					that.$set(that, 'orderData', res.data);
				})
			},
			/**
			 * 取消订单
			 * 
			 */
			cancelOrder: function(index, order_id) {
				let that = this;
				if (!order_id) return that.$util.Tips({
					title: '缺少订单号无法取消订单'
				});
				unOrderCancel(order_id).then(res => {
					return that.$util.Tips({
						title: res.message,
						icon: 'success'
					}, function() {
						that.orderList.splice(index, 1);
						that.$set(that, 'orderList', that.orderList);
						that.$set(that.orderData, 'unpaid_count', that.orderData.unpaid_count - 1);
						that.getOrderData();
					});
				}).catch(err => {
					return that.$util.Tips({
						title: err
					});
				});
			},
			/**
			 * 打开支付组件
			 * 
			 */
			goPay: function(pay_price, order_id) {
				this.$set(this, 'pay_close', true);
				this.pay_order_id = order_id.toString()
				// this.$set(this, 'pay_order_id', );
				this.$set(this, 'totalPrice', pay_price);
			},
			/**
			 * 支付成功回调
			 * 
			 */
			pay_complete: function() {
				this.loadend = false;
				this.page = 1;
				this.$set(this, 'orderList', []);
				this.pay_close = false;
				this.pay_order_id = '';
				this.getOrderData();
				this.getOrderList();
			},
			/**
			 * 支付失败回调
			 * 
			 */
			pay_fail: function() {
				this.pay_close = false;
				this.pay_order_id = '';
			},
			/**
			 * 去订单详情
			 */
			goOrderDetails: function(order_id) {
				let self = this
				if (!order_id) return that.$util.Tips({
					title: '缺少订单号无法查看订单详情'
				});
				// #ifdef MP
				uni.showLoading({
					title: '正在加载',
				})
				openOrderSubscribe().then(() => {
					uni.hideLoading();
					if (self.orderStatus == 0) {
						uni.navigateTo({
							url: '/pages/order_details/stay?order_id=' + order_id
						})
					} else {
						uni.navigateTo({
							url: '/pages/order_details/index?order_id=' + order_id
						})
					}
				}).catch(() => {
					uni.hideLoading();
				})
				// #endif  
				// #ifndef MP
				if (self.orderStatus == 0) {
					uni.navigateTo({
						url: '/pages/order_details/stay?order_id=' + order_id
					})
				} else {
					uni.navigateTo({
						url: '/pages/order_details/index?order_id=' + order_id
					})
				}
				// #endif
			},
			/**
			 * 切换类型
			 */
			statusClick: function(status) {
				if (status == this.orderStatus) return;
				this.orderStatus = status;
				this.loadend = false;
				this.loading = false;
				this.page = 1;
				this.$set(this, 'orderList', []);
				this.getOrderList();
			},
			/**
			 * 获取订单列表
			 */
			getOrderList: function() {
				let that = this;
				if (that.loadend) return;
				if (that.loading) return;
				that.loading = true;
				that.loadTitle = "加载更多";
				if (that.orderStatus == 0) {
					groupLootList({
						page: that.page,
						limit: that.limit,
					}).then(res => {
						let list = res.data.list || [];
						let loadend = list.length < that.limit;
						that.orderList = that.$util.SplitArray(list, that.orderList);
						that.$set(that, 'orderList', that.orderList);
						that.loadend = loadend;
						that.loading = false;
						that.loadTitle = loadend ? "我也是有底线的" : '加载更多';
						that.page = that.page + 1;
					})
				} else {
					groupLootList({
						status: 1,
						page: that.page,
						limit: that.limit,
					}).then(res => {
						let list = res.data.list || [];
						let loadend = list.length < that.limit;
						that.orderList = that.$util.SplitArray(list, that.orderList);
						that.$set(that, 'orderList', that.orderList);
						that.loadend = loadend;
						that.loading = false;
						that.loadTitle = loadend ? "我也是有底线的" : '加载更多';
						that.page = that.page + 1;
					}).catch(err => {
						that.loading = false;
						that.loadTitle = "加载更多";
					})
				}
			},

			/**
			 * 删除订单
			 */
			delOrder: function(order_id, index) {
				let that = this;
				orderDel(order_id).then(res => {
					that.orderList.splice(index, 1);
					that.$set(that, 'orderList', that.orderList);
					that.$set(that.orderData, 'unpaid_count', that.orderData.unpaid_count - 1);
					that.getOrderData();
					return that.$util.Tips({
						title: '删除成功',
						icon: 'success'
					});
				}).catch(err => {
					return that.$util.Tips({
						title: err
					});
				})
			},
			// 确认收货
			confirmOrder: function(item, index) {
				let that = this;
				uni.showModal({
					title: '确认收货',
					content: '为保障权益，请收到货确认无误后，再确认收货',
					success: function(res) {
						if (res.confirm) {
							orderTake(item.order_id).then(res => {
								return that.$util.Tips({
									title: '操作成功',
									icon: 'success'
								}, function() {
									that.orderList.splice(index, 1);
									that.getOrderData();
								});
							}).catch(err => {
								return that.$util.Tips({
									title: err
								});
							})
						}
					}
				})
			},
            getExpress:function(orderId){
                  let that=this;
                  express(orderId).then(function(res){
                        let result = res.data.express
                        console.log(result)
                        that.express = result
                        that.order = res.data.order
                        
                            that.userFeedbackHidden = false
                  });
            },
            
		},
		onReachBottom: function() {
			this.getOrderList();
		}
	}
</script>

<style scoped lang="scss">
	.my-order .header {
		height: 130rpx;
		padding: 0 30rpx;
	}
	
	.fh{
		height: 40px;
		line-height: 40px;
		border-bottom: 5rpx solid #eee;
		
	}
	.my-order .header .picTxt {
		height: 190rpx;
	}

	.my-order .header .picTxt .text {
		color: rgba(255, 255, 255, 0.8);
		font-size: 26rpx;
		font-family: 'Guildford Pro';
	}

	.my-order .header .picTxt .text .name {
		font-size: 34rpx;
		font-weight: bold;
		color: #fff;
		margin-bottom: 20rpx;
	}

	.my-order .header .picTxt .pictrue {
		width: 122rpx;
		height: 109rpx;
	}

	.my-order .header .picTxt .pictrue image {
		width: 100%;
		height: 100%;
	}

	.my-order .nav {
		background-color: #fff;
		width: 690rpx;
		height: 140rpx;
		border-radius: 6rpx;
		margin: -73rpx auto 0 auto;
	}

	.my-order .nav .item {
		text-align: center;
		font-size: 26rpx;
		color: #282828;
		padding: 29rpx 0;
	}

	.my-order .nav .item.on {
		font-weight: bold;
		border-bottom: 5rpx solid #e93323;
	}

	.my-order .nav .item .num {
		margin-top: 18rpx;
	}

	.my-order .list {
		width: 690rpx;
		margin: 14rpx auto 0 auto;
	}

	.my-order .list .item {
		background-color: #fff;
		border-radius: 6rpx;
		margin-bottom: 14rpx;
	}

	.my-order .list .item .title {
		height: 84rpx;
		padding: 0 30rpx;
		border-bottom: 1rpx solid #eee;
		font-size: 28rpx;
		color: #282828;

		.left-wrapper {
			.iconfont {
				margin-top: 5rpx;
			}

			.store-name {
				margin: 0 10rpx;
			}

			.icon-xiangyou {
				font-size: 20rpx;
			}
		}
	}

	.my-order .list .item .title .sign {
		font-size: 24rpx;
		padding: 0 7rpx;
		height: 36rpx;
		margin-right: 15rpx;
	}

	.my-order .list .item .item-info {
		padding: 0 30rpx;
		margin-top: 22rpx;
	}

	.my-order .list .item .item-info .pictrue {
		width: 120rpx;
		height: 120rpx;
	}

	.my-order .list .item .item-info .pictrue image {
		width: 100%;
		height: 100%;
		border-radius: 6rpx;
	}

	.my-order .list .item .item-info .text {
		width: 486rpx;
		font-size: 28rpx;
		color: #999;
		margin-top: 6rpx;
	}

	.my-order .list .item .item-info .text .name {
		width: 306rpx;
		color: #282828;
	}

	.my-order .list .item .item-info .text .money {
		text-align: right;
	}

	.my-order .list .item .totalPrice {
		font-size: 26rpx;
		color: #282828;
		text-align: right;
		margin: 27rpx 0 0 30rpx;
		padding: 0 30rpx 30rpx 0;
	}

	.my-order .list .item .totalPrice .money {
		font-size: 28rpx;
		font-weight: bold;
	}

	.my-order .list .item .bottom {
		height: 107rpx;
		padding: 0 30rpx;
		border-top: 1px solid #f0f0f0;
	}

	.my-order .list .item .bottom .bnt {
		width: 176rpx;
		height: 60rpx;
		text-align: center;
		line-height: 60rpx;
		color: #fff;
		border-radius: 50rpx;
		font-size: 27rpx;
	}

	.my-order .list .item .bottom .bnt.cancelBnt {
		border: 1rpx solid #ddd;
		color: #aaa;
	}

	.my-order .list .item .bottom .bnt~.bnt {
		margin-left: 17rpx;
	}

	.noCart {
		margin-top: 171rpx;
		padding-top: 0.1rpx;
	}

	.noCart .pictrue {
		width: 414rpx;
		height: 336rpx;
		margin: 78rpx auto 56rpx auto;
	}

	.noCart .pictrue image {
		width: 100%;
		height: 100%;
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
    	    top: 10%;
    	    left: 50%;
    	    width: 80%;
    	    height: 75vh;
    	    margin-left: -40%;
    	    /* margin-top: -144px; */
    	    border: 20px solid white;
    	    background-color: white;
    	    z-index: 901;
    	    overflow: auto;
    	    border-radius: 10px;
    }
    .ri{
        margin-left: 10%;
    }
    .express_time{
            font-size: 12px;
            color: #2d8cf0;
            height: 47px;
            line-height: 65px;
    }
    .express_text{
        // text-indent: 5%;
            text-align: justify;
            letter-spacing: 0px;
            white-space: normal;
            font-size: 12px;
    }
    .popup_title {
    	padding-top: 20upx;
    	// width: 480upx;
    	text-align: center;
    	font-size: 32upx;
    }
         
    .popup_textarea_item {
    	    padding-top: 2px;
    	    /* height: 128px; */
    	    width: 100%;
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
    .logistics[data-v-3aa9d468] {
            align-items: center;
            padding: 10px 0px 0 0;
    }
    .logistics .logistics_img[data-v-3aa9d468] {
        width: 45px;
        height: 45px;
        margin-right: 12px;
    }.logistics .logistics_img img[data-v-3aa9d468] {
    width: 100%;
    height: 100%;
}
.logistics .logistics_cent span[data-v-3aa9d468] {
    display: block;
    font-size: 12px;
}
</style>
