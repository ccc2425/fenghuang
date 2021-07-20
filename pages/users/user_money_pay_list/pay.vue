<template>
	<view class="feedback-container">
		
        <view class='nav acea-row'>
            <view class='item te' @click="back">
                <image class="te_image" src="../../../static/images/back2.png" mode="widthFix"></image>
            </view>
        </view>
		<view class="item-box">
            <view class="title-box">
            	微信收款码 <text class="des">(扫描该二维码进行支付)</text>
            </view>
            <view class="img-wrapper" v-if="uploadImg.length>0" v-for="(item,index) in uploadImg">
            	<image mode="widthFix" v-if="item" :src="item"></image>
            </view>
			<view class="title-box">
				支付宝收款码 <text class="des">(扫描该二维码进行支付)</text>
			</view>
			<view class="img-wrapper" v-if="uploadImg1.length>0" v-for="(item,index) in uploadImg1">
				<image mode="widthFix" v-if="item" :src="item"></image>
			</view>
            <view class="item-box" v-if="bankname">
            	<view class="title-box">
            		<text>*</text>银行：<text class="fonts" style="font-size: 15px;">{{bankname}}</text>
            	</view>
            </view>
			<view class="item-box" v-if="card">
				<view class="title-box">
					<text>*</text>银行卡号：<text class="fonts" style="font-size: 15px;">{{card}}</text>
					<!-- #ifndef H5 -->
					<text class='copy' @tap='copy'>复制</text>
					<!-- #endif -->
					<!-- #ifdef H5 -->
					<text class='copy copy-data' :data-clipboard-text="card">复制</text>
					<!-- #endif -->
				</view>
			</view>
			<view class="item-box" v-if="name">
				<view class="title-box">
					<text>*</text>姓名：<text class="fonts" style="font-size: 15px;">{{name}}</text>
					<!-- #ifndef H5 -->
					<text class='copy' @tap='copy'>复制</text>
					<!-- #endif -->
					<!-- #ifdef H5 -->
					<text class='copy copy-data' :data-clipboard-text="name">复制</text>
					<!-- #endif -->
				</view>
			</view>
            <view class="item-box">
            	<view class="title-box">
            		<text>*</text>收款人联系方式：{{phone}}<text  style="    margin-left: 10px;
    background: green;
    color: white !important;
    padding: 3px 5px;
    border-radius: 5px;" @click="call(phone)">拨打卖家电话</text>
            	</view>
            </view>
            <view class="item-box">
            	<view class="title-box">
            		<text>*</text>应付金额：<text class="fonts" style="font-size: 20px;">{{amount}}</text>
            	</view>
            </view>
            
            
			<view class="title-box">
				<text>*</text>图片上传 <text class="des">(上传支付宝或微信付款凭证)</text>
			</view>
			<view class="upload-img">
				<view class="img-wrapper" v-if="uploadImg2.length>0" v-for="(item,index) in uploadImg2">
					<image :src="item"></image>
					<view class="iconfont icon-guanbi1" @click="deleteImg(index)"></view>
				</view>
				<view class="add-img" @click="uploadpic">
					<text class="iconfont icon-xiangji"></text>
				</view>
			</view>
		</view>
		
		<view class="item-box">
			<view v-if="status == 1" class="sub-btn" @click="bindSub">确认</view>
            <view v-if="status == 2" class="sub-btn" @click="bindSub">修改</view>
		</view>
        <view class="success" v-if="isShowbox">
        	<view class="bg"></view>
        	<view class="con">
        		<image src="/static/images/success.png" mode=""></image>
        		<view class="text">提交成功</view>
        		<view class="btn" @click="close">我知道了</view>
        	</view>
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
	</view>
</template>

<script>
	import {getercodepaysell,authPayPwd,upercodepaybuy} from '@/api/user.js'
	import { checkPhone,isEmailAvailable } from '@/utils/validate.js'
	import ClipboardJS from "@/plugin/clipboard/clipboard.js";
	export default {
		data() {
			return {
				uploadImg:[],
				uploadImg1:[],
                uploadImg2:[],
				phone:'',
                pay_pwd:'',
                order_id:'',
                
                amount:'',
                status:1,
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
			getercodepaysell({
                order_id:option.order_id,
            }).then(({data})=>{
                that.phone = data.contact
                that.amount = data.amount
				that.bankname = data.bankname
				that.name = data.name
				that.card = data.card
                let uploadImg = []
                
                if(data.ercodes)
                    uploadImg = data.ercodes.split(',')
                
                that.uploadImg = uploadImg
				
				 let uploadImg1 = []
				if(data.alicodes)
				    uploadImg1 = data.alicodes.split(',')
				that.uploadImg1 = uploadImg1
				
                let uploadImg2 = []
                if(data.up_img){
                    uploadImg2 = data.up_img.split(',')
                }
				
                that.uploadImg2 = uploadImg2
                
                that.status = data.status
			})
		},
		onReady: function() {
			// #ifdef H5
			this.$nextTick(function() {
				const clipboard = new ClipboardJS(".copy-data");
				clipboard.on("success", () => {
					this.$util.Tips({
						title: '复制成功'
					});
				});
			});
			// #endif
		},
		methods:{
			copy: function() {
				let that = this;
				uni.setClipboardData({
					data: this.card
				});
			},
			/**
			 * 上传文件
			 * 
			*/
			uploadpic: function () {
			  let that = this;
			  that.$util.uploadImageOne('upload/image', function (res) {
					console.log(res,'回调')
                    that.uploadImg2.push(res.data.path);
					that.$set(that,'uploadImg2',that.uploadImg2);
			  });
			},
			
			// 删除图片
			deleteImg(index){
				this.uploadImg2.splice(index,1)
			},
            // 弹窗关闭
            close(){
                uni.redirectTo({
                	url:'/pages/users/user_money_pay_list/index?type=1'
                })
                return false
            	this.uploadImg2 = []
            	this.phone = ''
            	this.isShowbox = false
                
                
                let that = this
                getercodepaysell({
                    order_id:this.order_id,
                }).then(({data})=>{
                    that.phone = data.contact
                    let uploadImg = []
                    uploadImg = data.ercodes.split(',')
					that.uploadImg = uploadImg
					
					let uploadImg1 = []
					uploadImg1 = data.alicodes.split(',')
                    that.uploadImg1 = uploadImg1
					
                    let uploadImg2 = []
                    uploadImg2 = data.up_img.split(',')
                    console.log(uploadImg2)
                    that.uploadImg2 = uploadImg2
                    
                    that.status = data.status
                })
            },
			// 提交
			bindSub(){
				this.userFeedbackHidden = false
			},
            op2(){
            	if(this.uploadImg2.length == 0){
            		uni.showToast({
            			title:'请上传支付凭证',
            			icon:'none'
            		})
            		return
            	}
            	upercodepaybuy({
            		images:this.uploadImg2,
                    order_id:this.order_id,
            	}).then(res=>{
            		this.isShowbox = true
                    this.$util.Tips({
                    	title:'操作成功'
                    })
            	}).catch(error=>{
            		this.$util.Tips({
            			title:error
            		})
            	})
            },
            back:function(){
                uni.redirectTo({
                	url:'/pages/users/user_money_pay_list/index'
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
            hideDiv:function(){
                this.userFeedbackHidden = true
            },
            /*拨打电话*/
            call(e){
                uni.makePhoneCall({
            		phoneNumber: e
            	});
            },
		}
	}
</script>

<style lang="scss">
	page {
		width: 100%;
		background-color: #fff;
	}
	.copy{
		border: 1px solid #eee;
		padding: 2px 4px;
		background: #eee;
		color: #E93323;
		font-size: 13px;
		border-radius: 3px;
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
    .te{
            font-size: 12px !important;
            float: left;
            text-align: left !important;
            // margin-left: 4%;
            color: #878787 !important;
    }
    .te_image{
        width: 25px;
        margin-top: 15px;
    }
</style>
