<template>
	<view class="feedback-container">
		<view class="head-wrapper" :style="'top:'+statusBarHeight">
			<view class="head-menu fh">
				<view class='iconfont icon-xiangzuo ft20' @click="returns">返回</view>
			</view>
		</view>
		<view class="item-box">
			<view class="title-box">
				<text>*</text>原登录密码
			</view>
			<view class="input-box">
				<input type="password" placeholder="请输入原登录密码" v-model="pwd">
			</view>
		</view>
        <view class="item-box">
        	<view class="title-box">
        		<text>*</text>新支付密码
        	</view>
        	<view class="input-box">
        		<input type="password" placeholder="请输入新的支付密码" v-model="pwdnew">
        	</view>
        </view>
        
        <view class="item-box">
        	<view class="title-box">
        		<text>*</text>确认新支付密码
        	</view>
        	<view class="input-box">
        		<input type="password" placeholder="请确认新的支付密码" v-model="pwdnew2">
        	</view>
        </view>
		<view class="item-box">
			<view class="sub-btn" @click="bindSub">确认</view>
		</view>
        <view class="success" v-if="isShowbox">
        	<view class="bg"></view>
        	<view class="con">
        		<image src="/static/images/success.png" mode=""></image>
        		<view class="text">修改成功</view>
        		<view class="btn" @click="close">我知道了</view>
        	</view>
        </view>
	</view>
</template>

<script>
	import {editpwd,editpaypwd} from '@/api/user.js'
	export default {
		data() {
			return {
				pwd:'',
				pwdnew:'',
				pwdnew2:'',
                isShowbox:false
			}
		},
		methods:{
			
			// 后退
			returns: function() {
				uni.redirectTo({
					url:'/pages/users/user_info/index'
				})
				
			},
			
            // 弹窗关闭
            close(){
            	this.pwd = ''
            	this.pwdnew = ''
            	this.pwdnew2 = ''
            	this.isShowbox = false
            },
			// 提交
			bindSub(){
				if(!this.pwd){
					uni.showToast({
						title:'请输入登录密码',
						icon:'none'
					})
					return
				}
                if(!this.pwdnew){
                	uni.showToast({
                		title:'请输入新的支付密码',
                		icon:'none'
                	})
                	return
                }
                if(this.pwdnew != this.pwdnew2){
                	uni.showToast({
                		title:'两次输入新支付密码不一致',
                		icon:'none'
                	})
                	return
                }
				editpaypwd({
					pwd:this.pwd,
					pwdnew:this.pwdnew,
				}).then(res=>{
					this.isShowbox = true
				}).catch(error=>{
					this.$util.Tips({
						title:error
					})
				})
			}
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
	
	.ft20{
		font-size: 25rpx;
	}

	.feedback-container {
		padding: 30rpx;

		.item-box {
			margin-bottom: 40rpx;
			.title-box {
				font-size: 28rpx;
				color: #222222;

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
	}
</style>
