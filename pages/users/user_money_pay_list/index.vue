<template>
	<view>
		<view class='bill-details'>
			<view class="head-wrapper">
				<view class="head-menu fh">
					<view class='iconfont icon-xiangzuo ft20' style="width: 10%;float: left;" @click="returns"></view>
					<view style="width: 80%;float: left;text-align: center;">交易大厅</view>
				</view>
			</view>	
			<view class='nav acea-row'>
				<view class='item' :class='type==0 ? "on":""' @click='changeType(0)'>交易市场</view>
				<view class='item' :class='type==1 ? "on":""' @click='changeType(1)'>我的买入</view>
				<view class='item' :class='type==2 ? "on":""' @click='changeType(2)'>我的卖出</view>
			</view>
			<view class='sign-record'>
				<view class='list' v-for="(item,index) in userBillList" :key="index">
					<view class='item'>
						<!-- <view class='data'>{{item.time}}</view> -->
						<view class='listn'>
							<view style="position: relative;" class='itemn acea-row row-between-wrapper'>
								<view>
									<view class='name line1' style="width: 250px;">{{item.amount}}</view>
                                    
									<view>{{item.create_time}}<text v-if="type == 2 && item.b_account" style="    margin-left: 10px;
    background: green;
    color: white !important;
    padding: 3px 5px;
    border-radius: 5px;" @click="call(item.b_account)">拨打买家电话</text></view>
								</view>
                                <view class='num btns' v-if="item.status == 0 && type == 0" @click='op("buy",item.order_id)'>买入</view>
                                <view class='num btns' v-if="item.status == 0 && type == 2" @click='op("cancel",item.order_id)' style="background: #ea4334;">取消</view>
                                <view class='num' v-if="item.status == 4">已冻结</view>
                                <view class='num btns' v-if="item.status == 1 && type == 1" @click='op("cancel",item.order_id)' style="background: #ea4334;" >取消</view>
                                <navigator :url="'/pages/users/user_money_pay_list/pay?order_id='+item.order_id" class='num btns' v-if="item.status == 1 && type == 1" style="right: 20vw !important;    "  >支付</navigator>
                                <!-- <view class='num' v-if="item.status == 9 && type == 2" @click='op("cancel",item.order_id)'>已取消</view> -->
                                <view class='num' v-if="item.status == 9 && type == 2" >已取消</view>
                                <navigator :url="'/pages/users/user_money_pay_list/pay?order_id='+item.order_id" class='num font-color' v-if="item.status == 2 && type == 1" >待确认</navigator>
                                <navigator :url="'/pages/users/user_money_pay_list/payercodeconfrim?order_id='+item.order_id" class='num btns' v-if="item.status == 2 && type == 2" >确认</navigator>
                                <!-- <view class='num btns' v-if="item.status == 2 && type == 2" @click='op("confrim",item.order_id)'>确认</view> -->
                                <view class='num' v-if="item.status == 3 && type == 2" >已完成</view>
                                <view class='num' v-if="item.status == 3 && type == 1" >已完成</view>
                                <view class='num font-color' v-if="item.status == 1 && type == 2" >待支付</view>
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
                <view style="height: 50px; width: 100%;"></view>
			</view>
		</view>
		<!-- #ifdef MP -->
		<authorize @onLoadFun="onLoadFun" :isAuto="isAuto" :isShowAuth="isShowAuth" @authColse="authColse"></authorize>
		<!-- #endif -->
        <navigator :url="'/pages/users/user_money_pay_list/sell'" class='sell2'>现在卖出</navigator>
        
        
        <view :hidden="userFeedbackHidden" class="popup_content">
            <view class="popup_title">验证支付密码</view>
            <view class="popup_textarea_item">
                <input class="inpit" type="password" placeholder="请输入支付密码" value="" v-model="pay_pwd"/>
                <view @click="authpaypwd()" class="sell">确认
                </view>
            </view>
        </view>
        <view class="popup_overlay" :hidden="userFeedbackHidden" @click="hideDiv()"></view>
        
        <view :hidden="userFeedbackHidden2" class="popup_content" style="height: 470px;
    top: 35%;
    text-align: justify;">
            <view class="popup_title">互换市场守则</view>
            <view class="popup_textarea_item">
                <view>1、每单最大额度100贡献值。</view>
                <view class="">2、一个账号交易同时只限一单，上一笔交易结束，才能继续下一笔订单。</view>
                <view class="">3、交易双方必须使用真实手机号进行交易，请双方保持电话畅通，加快成交速度。</view>
                <view class="">4、卖方切记在收款到账后，再给买方点击确认。</view>
                <!-- <view class="">5.两小时未操作的订单将被冻结，由系统判定违约方，自动处罚违约方当前订单10%贡献值或赠送积分。</view> -->
                <view class="">5、平台严格执行诚信交易规则，一但查实买家上传假图，永久封号处理。</view>
                <view class="">6、为了确保个人账户安全，切勿与陌生人发生互转，造成损失，自行承担。</view>
                <view class="" style="    margin: 10px 0;">请仔细阅读以上互换规则</view>
                <view class="" style="    text-align: center;
    line-height: 65px;
    font-size: 12px;
    color: #888;">我已认真阅读互换守则</view>
                <view @click="hide()" class="sell">确认✔</view>
                
                
            </view>
        </view>
        <view class="popup_overlay" :hidden="userFeedbackHidden2" @click="hide()"></view>
	</view>
</template>

<script>
	import {
        getMoneyOrderList,
        authPayPwd,
        opMoneyOrder
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
                time:0,
				type: 0,
                pay_pwd:'',
                params:[],
				userBillList: [],
                userFeedbackHidden:true,
                userFeedbackHidden2:false,
				isAuto: false, //没有授权的不会自动授权
				isShowAuth: false //是否隐藏授权
			};
		},
		computed: mapGetters(['isLogin']),
		onShow() {
			if (this.isLogin) {
				this.getMoneyOrderListMethod();
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
            // this.userFeedbackHidden = false
		},
		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {
			this.getMoneyOrderListMethod();
		},
		methods: {
			// 后退
			returns: function() {
				location.href = '/pages/user/index'
				
			},
			/**
			 * 授权回调
			 */
			onLoadFun: function() {
				this.isShowAuth = false;
				this.getMoneyOrderListMethod();
			},
			// 授权关闭
			authColse: function(e) {
				this.isShowAuth = e
			},
			/**
			 * 获取账户明细
			 */
			getMoneyOrderListMethod: function() {
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
                console.log(data)
				getMoneyOrderList(data).then(function(res) {
					let list = res.data,
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
             * 获取账户明细
             */
            op: function(type,order_id) {
                this.params = {
                    type:type,
                    order_id:order_id,
                }
                this.authpaypwd2()
              
            },
            op2: function() {
                let that = this;
                if(that.time > 0 && (Date.parse(new Date())/1000 - that.time) < 5) return that.$util.Tips({
                	title: '访问过于频繁'
                });
                that.time = Date.parse(new Date())/1000
                opMoneyOrder(that.params).then(function(res) {
                    that.loadend = false;
                    that.page = 1;
                    that.$set(that, 'userBillList', []);
                    that.getMoneyOrderListMethod();
                    return that.$util.Tips({
                        title: '操作成功'
                    });
                }).catch((res) => {
                    return that.$util.Tips({
                        title: res
                    });
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
				this.getMoneyOrderListMethod();
			},
            authpaypwd: function() {
                let that = this
                let pay_pwd = this.pay_pwd
                this.pay_pwd = ''
                authPayPwd({
                    pay_pwd:pay_pwd,
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
            
            /*拨打电话*/
            call(e){
                uni.makePhoneCall({
            		phoneNumber: e
            	});
            },
            authpaypwd2: function() {
                let that = this
                that.userFeedbackHidden = false
                // authPayPwd({
                //     pay_pwd:this.pay_pwd,
                // }).then(function(res) {
                //     that.userFeedbackHidden = true
                //     return true
                // }).catch((res) => {
                //     uni.showModal({
                //     	content: res,
                //     	success(res) {
                //     	},
                //     })
                // });
            },
            hideDiv:function(){
                this.userFeedbackHidden = true
            },
            hide:function(){
                this.userFeedbackHidden2 = true
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
	.fh{
		height: 40px;
		line-height: 40px;
		border-bottom: 5rpx solid #eee;
		
	}
	.icon-xiangzuo:before{
		padding: 0 10px;
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
    .btns{
            background: green;
            color: white !important;;
            font-size: 14px !important;
            border-radius: 5px;
            padding: 2px 10px;
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
    .sell2{
        width: 100%;
        background: #ea4334;
        color: white;
        text-align: center;
        height: 50px;
        line-height: 50px;
        margin: 0 auto;
        /* border-radius: 500px; */
        position: fixed;
        bottom: 0px;
        /* left: 5%; */
    }
    .bill-details{
        min-height: 100vh;
        position: relative;
    }
    .num{
        font-size: 14px !important;
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
        .btns{
            position: absolute;
            right: 4vw;
        }
</style>
