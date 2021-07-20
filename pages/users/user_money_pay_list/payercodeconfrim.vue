<template>
	<view class="feedback-container">
		<view class="head-wrapper" >
			<view class="head-menu fh">
				<view class='iconfont icon-xiangzuo ft20' style="width: 10%;float: left;" @click="returns"></view>
				<view style="width: 80%;float: left;text-align: center;">付款凭证</view>
			</view>
		</view>
		
		<view class="item-box">
            <!-- <view class="title-box">
            	付款凭证
            </view> -->
            <view class="img-wrapper" v-if="uploadImg.length>0" v-for="(item,index) in uploadImg">
            	<image mode="widthFix" :src="item"></image>
            </view>
		</view>
		
		<view class="item-box">
			<view v-if="status == 2" class="sub-btn" @click='op("confrim")'>确认</view>
		</view>
        <view class="success" v-if="isShowbox">
        	<view class="bg"></view>
        	<view class="con">
        		<image src="/static/images/success.png" mode=""></image>
        		<view class="text">确认成功</view>
        		<view class="btn" @click="close">我知道了</view>
        	</view>
        </view>
        
        <view :hidden="userFeedbackHidden" class="popup_content">
            <view class="popup_title">验证支付密码</view>
            <view class="popup_textarea_item">
                <view style="margin-bottom: 10px;">点击确认按钮后您的贡献值会转移给买家，请确认收到转账后再点击确认按钮</view>
                <input class="inpit" type="password" placeholder="请输入支付密码" value="" v-model="pay_pwd"/>
                <view @click="authpaypwd()" class="sell">确认
                </view>
            </view>
        </view>
        <view class="popup_overlay" :hidden="userFeedbackHidden" @click="hideDiv()"></view>
	</view>
</template>

<script>
	import {getercodepayconfrim,upercodepaybuy,opMoneyOrder,authPayPwd} from '@/api/user.js'
	import { checkPhone,isEmailAvailable } from '@/utils/validate.js'
	export default {
		data() {
			return {
				uploadImg:[],
				phone:'',
                order_id:'',
                status:1,
                pay_pwd:'',
                params:[],
                userFeedbackHidden:true,
                isShowbox:false
			}
		},
		onLoad(option) {
            if(!option.order_id){
                uni.showToast({
                	title:'登录状态失效，订单号丢失',
                	icon:'none'
                })
                return
            }
            this.order_id = option.order_id
            let that = this
			getercodepayconfrim({
                order_id:option.order_id,
            }).then(({data})=>{
                let uploadImg = []
                uploadImg = data.up_img.split(',')
                that.uploadImg = uploadImg
                that.status = data.status
			})
		},
		methods:{
			// 后退
			returns: function() {
				uni.redirectTo({
					url:'/pages/users/user_money_pay_list/index'
				})
				
			},
            // 弹窗关闭
            close(){
            	this.isShowbox = false
                let that = this
                getercodepayconfrim({
                    order_id:this.order_id,
                }).then(({data})=>{
                    let uploadImg = []
                    uploadImg = data.up_img.split(',')
                    that.uploadImg = uploadImg
                    that.status = data.status
                })
            },
			op: function(type) {
				this.params = {
				    type:type,
				    order_id:this.order_id,
				}
				this.authpaypwd2()
			},
            op2: function() {
            	let that = this;
                opMoneyOrder(that.params).then(function(res) {
                    that.isShowbox = true
                    return that.$util.Tips({
                        title: '操作成功'
                    });
                }).catch((res) => {
                    return that.$util.Tips({
                        title: res
                    });
                });
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
            },
		}
	}
</script>

<style lang="scss">
	page {
		width: 100%;
		background-color: #fff;
	}
	
	.fh{
		height: 50rpx;
		
		border-bottom: 5rpx solid #eee;
		margin-bottom: 30rpx;
	}
	
	.feedback-container {
		padding: 30rpx;

		.item-box {
			margin-bottom: 40rpx;
			.title-box {
				font-size: 28rpx;
				color: #222222;
                margin: 10px auto;
				text {
					margin-right: 10rpx;
					color: $theme-color;
				}
				.des{
					margin-left: 10rpx;
					font-size: 22rpx;
					color: #999999;
				}
			}

			.tab-box {
				margin-top: 20rpx;
				display: flex;
				flex-wrap: wrap;

				.tab-item {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 200rpx;
					height: 66rpx;
					margin-right: 20rpx;
					border: 1px solid #BFBFBF;
					border-radius: 33px;
					font-size: 28rpx;

					&.active {
						background: $theme-color;
						color: #fff;
						border-color: $theme-color;
					}
				}
			}
			.picker{
				margin-top: 30rpx;
				.picker-box{
					position: relative;
					width: 100%;
					height: 90rpx;
					line-height: 90rpx;
					padding: 0 30rpx;
					background-color: #F5F5F5;
					border-radius:10rpx;
					.iconfont{
						position: absolute;
						right: 30rpx;
						top:50%;
						transform: translateY(-50%);
						font-size: 22rpx;
						color: #282828;
					}
				}
			}
			.textarea-box{
				background: #F5F5F5;
				border-radius:10rpx;
				textarea{
					width: 100%;
					height: 300rpx;
					margin-top: 30rpx;
					padding: 20rpx 20rpx 0;
					font-size: 28rpx;
					line-height: 1.5;
					
				}
				.num{
					color: #999;
					text-align: right;
					padding: 20rpx;
				}	
			}
			.upload-img{
				display: flex;
				flex-wrap: wrap;
				.img-wrapper{
					position: relative;
					display: flex;
					flex-wrap: wrap;
					margin: 30rpx 20rpx 20rpx 0;
					image{
						width:158rpx;
						height: 158rpx;
					}
					.iconfont{
						position: absolute;
						right: -15rpx;
						top: -20rpx;
						font-size: 40rpx;
						color: $theme-color;
					}
				}
				.add-img{
					display: flex;
					align-items: center;
					justify-content: center;
					width: 158rpx;
					height: 158rpx;
					background: #F5F5F5;
					border-radius:10rpx;
					margin-top: 20rpx;
					margin-bottom: 20rpx;
					.iconfont{
						color: #B5B5B5;
						font-size: 55rpx;
					}
				}
			}
			.input-box{
				input{
					display: block;
					width: 100%;
					height: 90rpx;
					margin-top: 20rpx;
					padding-left: 20rpx;
					background: #f5f5f5;
					border-radius:10rpx;
					font-size: 28rpx;
				}
			}
			.sub-btn{
				height: 90rpx;
				line-height: 90rpx;
				background: $theme-color;
				color: #fff;
				font-size: 32rpx;
				text-align: center;
				border-radius:45rpx;
			}
			.link{
				display: flex;
				align-items: center;
				justify-content: center;
				margin-top: 20rpx;
				.iconfont{
					margin-top: 6rpx;
					font-size: 22rpx;
				}
			}
		}
		.success{
			z-index: 10;
			position: fixed;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			.bg{
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				background-color: rgba(0,0,0,.5);
			}
			.con{
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%,-50%);
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				width:500rpx;
				height:540rpx;
				background:#fff;
				border-radius:10rpx;
				font-size: 34rpx;
				color: #282828;
				image{
					width: 149rpx;
					height: 230rpx;
				}
				.btn{
					width:340rpx;
					height:90rpx;
					line-height: 90rpx;
					margin-top: 38rpx;
					text-align: center;
					color: #fff;
					background:linear-gradient(-90deg,$bg-end 0%,$bg-star 100%);
					border-radius:45rpx;
				}
			}
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
        	height: 260px;
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
	}
</style>
