<template>
	<view class="feedback-container">
		<!-- <view class="head-wrapper" :style="'top:'+statusBarHeight">
			<view class="head-menu fh">
				<view class='iconfont icon-xiangzuo ft20' @click="returns">返回</view>
			</view>
		</view> -->
		
		<view class="yhk">收款码信息：</view>
		<view class="item-box">
			<view class="title-box">
				<text>*</text>微信收款码上传（必传） <text class="des"></text>
			</view>
			<view class="upload-img">
				<view class="img-wrapper" v-if="uploadImg.length>0 && item" v-for="(item,index) in uploadImg">
					<image :src="item"></image>
					<view class="iconfont icon-guanbi1" @click="deleteImg(index)"></view>
				</view>
				<view v-if="uploadImg == ''" class="add-img" @click="uploadpic">
					<text class="iconfont icon-xiangji"></text>
				</view>
			</view>
		</view>
		<view class="item-box">
			<view class="title-box">
				<text>*</text>支付宝收款码上传（必传） <text class="des"></text>
			</view>
			<view class="upload-img">
				<view class="img-wrapper" v-if="uploadImg1.length>0 && item1" v-for="(item1,index1) in uploadImg1">
					<image :src="item1"></image>
					<view class="iconfont icon-guanbi1" @click="deleteImg1(index)"></view>
				</view>
				<view v-if="uploadImg1 == ''" class="add-img" @click="uploadpic1">
					<text class="iconfont icon-xiangji"></text>
				</view>
			</view>
		</view>
		<view class="item-box">
			<view class="title-box">
				<text>*</text>联系方式
			</view>
			<view class="input-box">
				<input type="text" placeholder="请填写您的手机号码" v-model="phone">
			</view>
		</view>
		<view class="yhk">银行卡信息：</view>
		<view class="item-box">
			<view class="title-box">
				<text>*</text>姓名
			</view>
			<view class="input-box">
				<input type="text" placeholder="请填写您的名字" v-model="name">
			</view>
		</view>
		<view class="item-box">
			<view class="title-box">
				<text>*</text>银行卡号
			</view>
			<view class="input-box">
				<input type="text" placeholder="请填写您的银行卡号" v-model="card">
			</view>
		</view>
		
		<view class="item-box">
			<view class="title-box">
				<text>*</text>银行名称
			</view>
			<view class="input-box">
				<input type="text" placeholder="请填写您的银行名称" v-model="bankname">
			</view>
		</view>
		
		<view class="item-box">
			<view class="title-box">
				<text>*</text>支付安全码
			</view>
			<view class="input-box">
				<input type="text" placeholder="请填写您的支付安全码" v-model="zfpass">
			</view>
		</view>
		
		<view class="item-box">
			<view class="sub-btn" @click="bindSub">确认</view>
		</view>
        <view class="success" v-if="isShowbox">
        	<view class="bg"></view>
        	<view class="con">
        		<image src="/static/images/success.png" mode=""></image>
        		<view class="text">提交成功</view>
        		<view class="btn" @click="close">我知道了</view>
        	</view>
        </view>
	</view>
</template>

<script>
	import {getercodepay,upercodepay} from '@/api/user.js'
	import { checkPhone,isEmailAvailable } from '@/utils/validate.js'
	export default {
		data() {
			return {
				uploadImg:[],
				uploadImg1:[],
				phone:'',
                isShowbox:false
			}
		},
		onLoad() {
            let that = this
			getercodepay().then(({data})=>{
                that.phone = data.contact
                let uploadImg = []
                uploadImg = data.ercodes.split(',')
                that.uploadImg = uploadImg
				let uploadImg1 = []
				uploadImg1 = data.alicodes.split(',')
				that.uploadImg1 = uploadImg1
				that.name = data.name
				that.card = data.card
				that.bankname = data.bankname
				that.zfpass = data.zfpass
			})
		},
		
		methods:{
			// 后退
			returns: function() {
				uni.redirectTo({
					url:'/pages/users/user_info/index'
				})
				
			},
			/**
			 * 上传文件
			*/
			uploadpic: function () {
			  let that = this;
			  that.$util.uploadImageOne('upload/image', function (res) {
					console.log(res,'回调')
                    that.uploadImg.push(res.data.path);
					that.$set(that,'uploadImg',that.uploadImg);
			  });
			  // uni.chooseImage({
			  //     success: (chooseImageRes) => {
			  //         const tempFilePaths = chooseImageRes.tempFilePaths;
			  //         uni.uploadFile({
			  //             url: 'https://mtshop.bj177.cn/api/upload/image/field', //仅为示例，非真实的接口地址
			  //             filePath: tempFilePaths[0],
			  //             name: 'file',
			  //             formData: {
			  //                 'user': 'test'
			  //             },
			  //             success: (uploadFileRes) => {
			  //                 console.log(uploadFileRes.data);
			  //             },
					// 	  fail: (err) => {
					// 	  	console.log(err)
					// 	  }
			  //         });
			  //     }
			  // });
			},
			uploadpic1: function () {
			  let that = this;
			  that.$util.uploadImageOne('upload/image', function (res) {
					console.log(res,'回调')
			        that.uploadImg1.push(res.data.path);
					that.$set(that,'uploadImg1',that.uploadImg1);
			  });
			},
			// 删除图片
			deleteImg(index){
				this.uploadImg.splice(index,1)
			},
			// 删除图片
			deleteImg1(index){
				this.uploadImg1.splice(index,1)
			},
            // 弹窗关闭
            close(){
            	this.uploadImg = []
            	this.phone = ''
				this.name = ''
				this.card = ''
				this.bankname = ''
				this.zfpass = ''
            	this.isShowbox = false
                
                let that = this
                getercodepay().then(({data})=>{
                    that.phone = data.contact
                    let uploadImg = []
                    uploadImg = data.ercodes.split(',')
					uploadImg1 = data.alicodes.split(',')
                    that.uploadImg = uploadImg
					that.name = data.name
					that.card = data.card
					that.bankname = data.bankname
					that.zfpass = data.zfpass
                })
            },
			
			// 提交
			bindSub(){
				if(this.uploadImg.length == 0){
					uni.showToast({
						title:'请上传微信收款码',
						icon:'none'
					})
					return
				}
				if(this.uploadImg1.length == 0){
					uni.showToast({
						title:'请上传支付宝收款码',
						icon:'none'
					})
					return
				}
				
				if(!checkPhone(this.phone)){
					uni.showToast({
						title:'请输入手机号码',
						icon:'none'
					})
					return
				}
				upercodepay({
					images:this.uploadImg,
					images1:this.uploadImg1,
					contact:this.phone,
					name: this.name,
					card: this.card,
					bankname: this.bankname,
					zfpass: this.zfpass,
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
	.yhk{
		margin-bottom: 20px;
			font-size: 18px;
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
