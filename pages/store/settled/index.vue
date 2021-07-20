<template>
	<view v-if="!successful">
		<form report-submit='true'>
			<view class='merchantsSettled'>
				<img class="merchantBg" src="../static/images/merchantBg.jpg" alt="">
				<view class='list'>
					<div class="item">
						<div class="acea-row row-middle">
							<i class="icon iconfont icon-qiye"></i>
							<input type="text" placeholder="请输入企业名称" v-model="merchantData.enterprise_name" @change="validateBtn" placeholder-class='placeholder' />
						</div>
					</div>
					<div class="item">
						<div class="acea-row row-middle">
							<i class="icon iconfont icon-yonghu3"></i>
							<input type="text" placeholder="请输入姓名" v-model="merchantData.user_name" @change="validateBtn" placeholder-class='placeholder'/>
						</div>
					</div>
					<div class="item">
						<div class="acea-row row-middle">
							<i class="icon iconfont icon-shoujihao"></i>
							<input type="text" placeholder="请输入手机号" v-model="merchantData.phone" @change="validateBtn" placeholder-class='placeholder'/>
						</div>
					</div>
					<div class="item rel">
						<div class="acea-row row-middle">
							<i class="icon iconfont icon-yanzhengma"></i>
							<input type="text" placeholder="填写验证码" v-model="merchantData.yanzhengma" @change="validateBtn" class="codeIput" placeholder-class='placeholder'/>
							<button class="code" :disabled="disabled" :class="disabled === true ? 'on' : ''" @click="code">
								{{ text }}
							</button>
							
						</div>
					</div>
					<div class="item" v-if="isShowCode">
						<div class="acea-row row-middle">
							<i class="icon iconfont icon-yanzhengma"></i>
							<input type="text" placeholder="填写验证码" class="codeIput" v-model="codeVal" @change="validateBtn"  placeholder-class='placeholder'/>
							<div class="imageCode" @click="again"><img :src="codeUrl" /></div>
						</div>
					</div>
					<div class="item">
						<checkbox-group @change='ChangeIsAgree'>
							<checkbox class="checkbox" :checked="isAgree ? true : false"/>已阅读并同意</checkbox-group>
							<button class="settleAgree" @click="showProtocol = true">《入驻协议》</button>
					</div>
					<button class='submitBtn' :class="validate === true ? 'on':''" @click="formSubmit">提交申请</button>
				</view>
			</view>
		</form>
		<view class="settlementAgreement" v-if="showProtocol">
			<view class="setAgCount">
				<i class="icon iconfont icon-cha" @click="showProtocol = false"></i>
				<div class="title">商户入驻协议</div>
				<div class="content">{{protocol}}</div>
			</view>	
		</view>
		<!-- #ifdef MP -->
		<authorize @onLoadFun="onLoadFun" :isAuto="isAuto" :isShowAuth="isShowAuth" @authColse="authColse"></authorize>
		<!-- #endif -->
	</view>
	<view class="settledSuccessMain" v-else :style="{height:curHeight+'px'}">
		<view class="settledSuccessful">
			<img class="image" src="/static/images/settledSuccessful.svg" alt="">
			<view class="title">恭喜，您的资料提交成功！</view>
			<view class="info">预计15个工作日内审核完毕，平台客服会及时与您联系！</view>
			<view class="goHome" hover-class="none" @click="goHome">
				返回首页
			</view>
		</view>
	</view>
</template>
<script>
	import {
		toLogin
	} from '@/libs/login.js';
	import {
		create,verify
	} from '@/api/store.js';
	import {	
		getCaptcha,
	} from "@/api/user";

	import {
		mapGetters
	} from "vuex";
	import wPicker from "@/components/wPicker/w-picker.vue";
	// #ifdef MP
	import authorize from '@/components/Authorize';
	// #endif
	const app = getApp();
	export default {
		components: {
			// #ifdef MP
			authorize,
			// #endif
		},
		data() {
			return {
				cartId: '', //购物车id
				pinkId: 0, //拼团id
				couponId: 0, //优惠券id
				isAuto: false, //没有授权的不会自动授权
				isShowAuth: false, //是否隐藏授权
				text: "获取验证码",
				codeUrl: "",
				disabled: false,
				isAgree: false,
				showProtocol: false,
				isShowCode: false,
				merchantData: {
					enterprise_name: "",
					user_name: "",
					phone: ""
				},
				validate: false,
				successful: false,
				keyCode: "",
				codeVal: "",	
				protocol: app.globalData.sys_intention_agree,		
			};
		},
		computed: mapGetters(['isLogin']),
		onLoad(options) {
			if (this.isLogin) {
				
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
			// 授权回调
			onLoadFun: function() {
				this.isShowAuth = false;
			},
			// 授权关闭
			authColse: function(e) {
				this.isShowAuth = e
			},
			toggleTab(str) {
				this.$refs[str].show();
			},
			// 首页
			goHome(){
				uni.switchTab({
				    url: '/pages/index/index'
				});
			},
			again() {
				this.getcaptcha()
			},
			getCode() {
				let that = this
				getCodeApi()
					.then(res => {
						that.keyCode = res.data.key;
					})
					.catch(res => {
						that.$util.Tips({
							title: res
						});
					});
			},
			async code() {
				let that = this;
				if (!that.merchantData.phone) return that.$util.Tips({
					title: '请填写手机号码'
				});
				if (!/^1(3|4|5|7|8|9|6)\d{9}$/i.test(that.merchantData.phone)) return that.$util.Tips({
					title: '请输入正确的手机号码'
				});					
				await verify({
						phone: that.merchantData.phone,
						key: that.codeKey,
						code: that.codeVal
					})
					.then(res => {
						that.$util.Tips({title:res.msg});
						that.sendCode();
					})
					.catch(res => {
						console.log(res,'res22222222')
									
						that.$util.Tips({title:res});
						if(res.status == 402){
							that.getcaptcha();	
						}
					});
			},
			getcaptcha(){
				let that = this
				getCaptcha().then(data=>{
					that.codeUrl = data.data.captcha; //图片路径
					that.codeVal = data.data.code; //图片验证码
					that.codeKey = data.data.key //图片验证码key
				})
					that.isShowCode = true;
			},
			sendCode() {
			  if (this.disabled) return;
			  this.disabled = true;
			  let n = 60;
			  this.text = "剩余 " + n + "s";
			  const run = setInterval(() => {
			    n = n - 1;
			    if (n < 0) {
			      clearInterval(run);
			    }
			    this.text = "剩余 " + n + "s";
			    if (this.text < "剩余 " + 0 + "s") {
			      this.disabled = false;
			      this.text = "重新获取";
			    }
			  }, 1000);
			},
			onConfirm(val) {
				this.region = val.checkArr[0] + '-' + val.checkArr[1] + '-' + val.checkArr[2];
			},
			ChangeIsAgree:function(e){
				this.isAgree = !this.isAgree;
				this.validateBtn();
			},

			formSubmit: function(e) {
				let that = this;			
				if(that.validateForm() && that.validate){
					create({
							phone: that.merchantData.phone,
							mer_name: that.merchantData.enterprise_name,
							name: that.merchantData.user_name,
							code: that.merchantData.yanzhengma
						}).then(data=>{
							if(data.status == 200){
								title: '提交成功',
								that.successful = true;
							}
						
					})
				}
		
				
			},
			validateBtn: function(){
				let that = this,
					value = that.merchantData;
				if(value.enterprise_name && value.user_name && value.phone && /^1(3|4|5|7|8|9|6)\d{9}$/i.test(value.phone) && value.yanzhengma && that.isAgree ){
					if(!that.isShowCode){
						that.validate = true;
					}else{
						if(that.codeVal){
							that.validate = true;
						}else{
						that.validate = false;
					}
					}
					
				}
			},
			validateForm: function(){
				let that = this,
					value = that.merchantData;
					
				if (!value.enterprise_name) return that.$util.Tips({
					title: '请请输入企业名称'
				});
				if (!value.user_name) return that.$util.Tips({
					title: '请输入姓名'
				});
				if (!value.phone) return that.$util.Tips({
					title: '请输入手机号'
				});
				if (!/^1(3|4|5|7|8|9|6)\d{9}$/i.test(value.phone)) return that.$util.Tips({
					title: '请输入正确的手机号码'
				});
				if (!value.yanzhengma) return that.$util.Tips({
					title: '请填写验证码'
				});
				if(!that.isAgree) return that.$util.Tips({
					title: '请勾选并同意入驻协议'
				});
				if(that.isShowCode && !that.codeVal)return that.$util.Tips({
					title: '请填写图片验证码'
				});
				that.validate = true;
				return true;
			}
	
		}
	}
</script>

<style scoped lang="scss">
	.merchantsSettled{
		background: linear-gradient(#fd3d1d 0%,#fd151b 100%);
		height: 100vh;
	}
	.merchantsSettled .merchantBg{
		max-width: 375px;	
		width:100%;
	}
	.merchantsSettled .list{
		background-color: #fff;
		border-radius: 12px;
		padding: 22px 0;
		margin: 0 15px;
		position: absolute;
		top: 50%;
		margin-top: -160px;
		width: calc(100% - 30px);
	}

	.merchantsSettled .list .item {
		padding: 50rpx 30rpx 20rpx;
		border-bottom: 1rpx solid #eee;
		position: relative;
		margin: 0 25px;
	}
	.merchantsSettled .list .item  .imageCode{
		position: absolute;
		top: 7px;
		right: 0;
	}
	.merchantsSettled .list .item .icon{
		font-size: 40rpx;
		color: #b4b1b4;
	}
	.merchantsSettled .list .item input {
		// width: 400rpx;
		font-size: 30rpx;
		margin-left: 10px;
	}
	.merchantsSettled .list .item .placeholder {
		color: #b2b2b2;
	}
	.merchantsSettled .default {
		padding: 0 30rpx;
		height: 90rpx;
		background-color: #fff;
		margin-top: 23rpx;
	}

	.merchantsSettled .default checkbox {
		margin-right: 15rpx;
	}

	.merchantsSettled .acea-row  uni-image {
		width: 20px;
		height: 20px;
		display: block;
	}
	.merchantsSettled .list .item .codeIput {
	    width: 125px;
	}
	.uni-input-input{
		    display: block;
		    height: 100%;
		    background: none;
		    color: inherit;
		    opacity: 1;
		    -webkit-text-fill-color: currentcolor;
		    font: inherit;
		    line-height: inherit;
		    letter-spacing: inherit;
		    text-align: inherit;
		    text-indent: inherit;
		    text-transform: inherit;
		    text-shadow: inherit;
	}

	.merchantsSettled .list .item .code {
	    position: absolute;
	    width: 93px;
	    line-height: 27px;
	    border: 1px solid #E93323;
	    border-radius: 15px;
	    color: #E93323;
	    text-align: center;
	    bottom: 8px;
	    right: 0;
	    font-size: 12px;
	}
	.merchantsSettled .list .item .code.on {
	    background-color: #bbb;
		color: #fff;
		border-color: #bbb;
	}
	.merchantsSettled .submitBtn{
		width: 588rpx;
		margin: 0 auto;
		height: 86rpx;
		border-radius: 25px;
		text-align: center;
		line-height: 86rpx;
		font-size: 15px;
		color: #fff;
		background: #E3E3E3;
		margin-top: 25px;
	}
	.merchantsSettled .submitBtn.on{
		background: #E93323;
	}
	uni-checkbox-group,.settleAgree{
		display: inline-block;
		font-size: 24rpx;
	}
	uni-checkbox-group{
		color: #b2b2b2;
	}
	.settleAgree{
		color: #E93323;
		position: relative;
		top: 2px;
		left: 8px;
	}
	.merchantsSettled uni-checkbox .uni-checkbox-wrapper{
		width: 30rpx;
		height: 30rpx;
		border: 2rpx solid #C3C3C3;
		border-radius: 15px;
	}
	.settlementAgreement{
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background: rgba(0,0,0,.5);
		z-index: 10;
	}
	.settlementAgreement .setAgCount{
		background: #fff;
		width: 656rpx;
		height: 458px;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-top: -229px;
		margin-left: -328rpx;
		border-radius: 12rpx;
		-webkit-border-radius: 12rpx;
		padding: 52rpx;
	}

	.settlementAgreement .setAgCount .icon{
		font-size: 42rpx;
		color: #b4b1b4;
		position: absolute;
		top: 15rpx;
		right: 15rpx;
		
	}
	.settlementAgreement .setAgCount .title{
		color: #333;
		font-size: 32rpx;
		text-align: center;
		font-weight: bold;
	}
	.settlementAgreement .setAgCount .content{
		margin-top: 32rpx;
		color: #333;
		font-size: 26rpx;
		line-height: 22px;
		text-align: justify;	
		text-justify: distribute-all-lines; 
		height: 756rpx;
		overflow-y: scroll;
	}
	.settledSuccessMain{
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.settledSuccessful{
		flex: 1;
		width: 100%;
		padding: 0 56px;
		height: auto;
		background: #fff;
		text-align: center;
	}
	.settledSuccessful .image{
		width: 189px;
		height: 157px;
		margin-top: 66px;
	}
	.settledSuccessful .title{
		color: #333333;
		font-size: 16px;
		font-weight: bold;
		margin-top: 35px;
	}
	.settledSuccessful .info{
		color: #A0A0A0;
		font-size: 13px;
		margin-top: 12px;
	}
	.settledSuccessful .goHome{
		margin-top: 60px;
		width: 248px;
		height: 43px;
		line-height: 43px;
		color: #282828;
		font-size: 15px;
		border: 1px solid #B4B4B4;
		border-radius: 60px;
	}
	/deep/ uni-checkbox .uni-checkbox-input{
		width: 15px;
		height: 15px;
		position: relative;
	}

	/deep/ uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked:before{
		font-size: 14px;
	
	}
	// #ifdef MP
	checkbox-group{
		display: inline-block;
	}
	// #endif
	
</style>
