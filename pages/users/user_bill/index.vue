<template>
	<view>
		<view class='bill-details'>
			<view class='nav acea-row'>
				<view class='item te' @click="back">
                    <image class="te_image" src="../../../static/images/back2.png" mode="widthFix"></image>
                </view>
			</view>
			<view class='sign-record'>
				<view class='list' v-for="(item,index) in userBillList" :key="index">
					<view class='item'>
						<!-- <view class='data'>{{item.time}}</view> -->
						<view class='listn'>
							<view class='itemn acea-row row-between-wrapper' style="height: 70px;">
								<view>
									<view class='name line1'>{{item.title}}
                                        <span v-if="item.type == 'hz' && item.link_id > 1000 && item.pm == 1" style="margin-left: 10px;    color: #16ac57;">[{{item.link_id}}]</span>
                                        <span v-if="item.type == 'hz' && item.link_id > 1000 && item.pm != 1" style="margin-left: 10px;    color: #fc4141;">[{{item.link_id}}]</span>  
                                    </view>
									<view>剩余：{{item.balance}}</view>
									<view>{{item.create_time}}</view>
								</view>
								<view class='num' v-if="item.pm ==1">+{{item.number}}</view>
								<view class='num font-color' v-else>-{{item.number}}</view>
							</view>
						</view>
					</view>
				</view>
				<view class='loadingicon acea-row row-center-wrapper' v-if="userBillList.length>0">
					<text class='loading iconfont icon-jiazai' :hidden='loading==false'></text>{{loadTitle}}
				</view>
				<view v-if="userBillList.length == 0">
					<emptyPage title="暂无账单的记录哦～"></emptyPage>
				</view>
			</view>
		</view>
		<!-- #ifdef MP -->
		<authorize @onLoadFun="onLoadFun" :isAuto="isAuto" :isShowAuth="isShowAuth" @authColse="authColse"></authorize>
		<!-- #endif -->
	</view>
</template>

<script>
	import {
		getCommissionInfo
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
	import emptyPage from '@/components/emptyPage.vue'
	export default {
		components: {
			// #ifdef MP
			authorize,
			// #endif
			emptyPage
		},
		data() {
			return {
				loadTitle: '加载更多',
				loading: false,
				loadend: false,
				page: 1,
				limit: 10,
				type: 0,
				userBillList: [],
				isAuto: false, //没有授权的不会自动授权
				isShowAuth: false //是否隐藏授权
			};
		},
		computed: mapGetters(['isLogin']),
		onShow() {
			if (this.isLogin) {
				this.getUserBillList();
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
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			this.type = options.type || 0;
		},
		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {
			this.getUserBillList();
		},
		methods: {
			/**
			 * 授权回调
			 */
			onLoadFun: function() {
				this.isShowAuth = false;
				this.getUserBillList();
			},
			// 授权关闭
			authColse: function(e) {
				this.isShowAuth = e
			},
			/**
			 * 获取账户明细
			 */
			getUserBillList: function() {
				let that = this;
				if (that.loadend) return;
				if (that.loading) return;
				that.loading = true;
				that.loadTitle = "";
				let data = {
					page: that.page,
					limit: that.limit,
					type:that.type
				}
				getCommissionInfo(data).then(function(res) {
					let list = res.data.list,
						loadend = list.length < that.limit;
					that.userBillList = that.$util.SplitArray(list, that.userBillList);
					that.$set(that, 'userBillList', that.userBillList);
					that.loadend = loadend;
					that.loading = false;
					that.loadTitle = loadend ? "哼😕~我也是有底线的~" : "加载更多";
					that.page = that.page + 1;
				}, function(res) {
					that.loading = false;
					that.loadTitle = '加载更多';
				});
			},
			/**
			 * 切换导航
			 */
			changeType: function(type) {
				this.type = type;
				this.loadend = false;
				this.page = 1;
				this.$set(this, 'userBillList', []);
				this.getUserBillList();
			},
            back:function(){
                uni.navigateBack({})
            }
		}
	}
</script>

<style scoped lang='scss'>
	.bill-details .nav {
		background-color: #fff;
		height: 90rpx;
		width: 100%;
		line-height: 90rpx;
	}

	.bill-details .nav .item {
		flex: 1;
		text-align: center;
		font-size: 30rpx;
		color: #282828;
	}

	.bill-details .nav .item.on {
		color: #e93323;
		border-bottom: 3rpx solid #e93323;
	}
    .te{
            font-size: 12px !important;
            float: left;
            text-align: left !important;
            margin-left: 4%;
            color: #878787 !important;
    }
    .te_image{
        width: 25px;
        margin-top: 15px;
    }
</style>
