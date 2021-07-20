<template>
	<div class="register absolute">
        <view class='nav acea-row'>
                	<view class='item te' @click="back">
                        <image class="te_image" src="../../../static/images/back2.png" mode="widthFix"></image>
                    </view>
                    <view style="width: 100vw;
            position: absolute;
            text-align: center;
            font-size: 16px;
            height: 2.5rem;
            line-height: 2.5rem;
        ">互转</view>
                </view>
                
                <view class="hhh" style="    width: 100%;
                height: 10vh;
                position: absolute;
                top: 0;
                z-index: 999;" @click="back"></view>
		<div class="whiteBg" v-if="formItem === 1">
			<div class="list" :hidden="current !== 1">
				<div class="item">
					<div class="acea-row row-middle">
						<input type="number" :placeholder="now_money_total" v-model="now_money" />
					</div>
				</div>
                <div class="item">
                	<div class="acea-row row-middle">
                		<input type="number" :placeholder="integral_total" v-model="integral" />
                	</div>
                </div>
                <div class="item">
                	<div class="acea-row row-middle">
                		<input type="number" :placeholder="ppoint_total" v-model="ppoint" />
                	</div>
                </div>
                <div class="item">
                	<div class="acea-row row-middle">
                		<input type="text" placeholder="收款人账号" v-model="account" />
                	</div>
                </div>
				<!-- <div class="item">
					<div class="acea-row row-middle">
						<input type="text" placeholder="填写验证码" class="codeIput" v-model="captcha" />
						<button class="code" :disabled="disabled" :class="disabled === true ? 'on' : ''" @click="code">
							{{ text }}
						</button>
					</div>
				</div> -->
				<div class="item" v-if="isShowCode">
					<div class="acea-row row-middle">
						<image src="/static/images/code_2.png"></image>
						<input type="text" placeholder="填写验证码" class="codeIput" v-model="codeVal" />
						<div class="code" @click="again"><img :src="codeUrl" /></div>
					</div>
				</div>
                <div class="item">
                	<div class="acea-row row-middle">
                		<input type="password" placeholder="支付密码" v-model="pay_pwd" />
                	</div>
                </div>
			</div>
            <div class="logon" @click="hz">确认</div>
			
		</div>
		
		<div class="bottom"></div>
	</div>
</template>
<script>
	import dayjs from "@/plugin/dayjs/dayjs.min.js";
	import sendVerifyCode from "@/mixins/SendVerifyCode";
	import {
		loginH5,
		loginMobile,
		hz,
		registerVerify,
		register,
		getCodeApi,
		getUserInfo,
		getCaptcha
	} from "@/api/user";
	import attrs, {
		required,
		alpha_num,
		chs_phone
	} from "@/utils/validate";
	import {
		validatorDefaultCatch
	} from "@/utils/dialog";
	import {
		getLogo
	} from "@/api/public";
	// import cookie from "@/utils/store/cookie";
	import {
		VUE_APP_API_URL
	} from "@/utils";

	const BACK_URL = "login_back_url";

	export default {
		name: "Login",
		mixins: [sendVerifyCode],
		data: function() {
			return {
				current: 1,
				formItem: 1,
				type: "login",
				logoUrl: "",
				keyCode: "",
				codeUrl: "",
				codeVal: "",
                ppoint: "",
                now_money: "",
                time:0,
                integral: "",
                now_money_total: "",
                integral_total: "",
                ppoint_total: "",
                account: "",
                captcha: "",
                pay_pwd:"",
                
                userInfo: {},
				isShowCode: false
			};
		},
        onLoad() {
            this.getUserInfo()
        },
		watch:{
			formItem:function(nval,oVal){
				if(nval == 1){
					this.type = 'login'
				}else{
					this.type = 'register'
				}
			}
		},
		mounted: function() {
			// this.getCode();
			// this.getLogoImage();
		},
		methods: {
			again() {
				// this.codeUrl =
				// 	VUE_APP_API_URL +
				// 	"/sms_captcha?" +
				// 	"key=" +
				// 	this.keyCode +
				// 	Date.parse(new Date());
				this.getcaptcha()
			},
            getUserInfo(){
            	getUserInfo().then(res=>{
            		this.userInfo = res.data
                    this.now_money_total = '当前可转贡献值'+res.data.now_money
                    this.integral_total = '当前可转金豆'+res.data.integral
                    this.ppoint_total = '当前可转购物券'+res.data.ppoint
            	})
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
			async getLogoImage() {
				let that = this;
				getLogo(2).then(res => {
					that.logoUrl = res.data.logo_url;
				});
			},
            
            back:function(){
                // uni.navigateBack({})
				location.href = '/pages/users/user_money/index'
            },
			async hz() {
				let that = this;
				if (!that.account) return that.$util.Tips({
					title: '请填写手机号码'
				});
                if (!that.pay_pwd) return that.$util.Tips({
                	title: '请填写支付密码'
                });
                
				if (!/^1(3|4|5|7|8|9|6)\d{9}$/i.test(that.account)) return that.$util.Tips({
					title: '请输入正确的手机号码'
				});
				// if (!that.captcha) return that.$util.Tips({
				// 	title: '请填写验证码'
				// });
				// if (!/^[\w\d]+$/i.test(that.captcha)) return that.$util.Tips({
				// 	title: '请输入正确的验证码'
				// });
                if(that.time > 0 && (Date.parse(new Date())/1000 - that.time) < 5) return that.$util.Tips({
                	title: '访问过于频繁'
                });
                that.time = Date.parse(new Date())/1000
				hz({
						phone: that.account,
						sms_code: that.captcha,
						integral: that.integral,
                        ppoint: that.ppoint,
						now_money: that.now_money,
                        pay_pwd: that.pay_pwd,
                        account: that.userInfo.account,
						spread: that.$Cache.get("spread")
					})
					.then(({data}) => {
						const backUrl = that.$Cache.get(BACK_URL) || "/pages/users/user_bill/index?type=6";
                        console.log(backUrl)
						that.$Cache.clear(BACK_URL);
                        that.$util.Tips({title:'互转成功'});
                        uni.redirectTo({
                            url: backUrl
                        });
					})
					.catch(res => {
						that.$util.Tips({
							title: res
						});
					});
			},
			async code() {
				let that = this;
				if (!that.userInfo.account) return that.$util.Tips({
					title: '请填写手机号码'
				});
				if (!/^1(3|4|5|7|8|9|6)\d{9}$/i.test(that.userInfo.account)) return that.$util.Tips({
					title: '请输入正确的手机号码'
				});
				if (that.formItem == 2) that.type = "register";
				
				await registerVerify({
						phone: that.userInfo.account,
						type: that.type,
						key: that.keyCode,
						code: that.codeVal
					})
					.then(res => {
						that.$util.Tips({title:res.msg});
						that.sendCode();
					})
					.catch(res => {
						console.log(res,'res22222222')
						that.getcaptcha();
					
						that.$util.Tips({title:res});
					});
			},
			getcaptcha(){
				let that = this
				getCaptcha().then(data=>{
					// that.codeUrl = `${VUE_APP_API_URL}/sms_captcha?key=${that.keyCode}`;
					that.codeUrl = data.data.captcha;
				})
					
					
					that.isShowCode = true;
			},
			navTap: function(index) {
				this.current = index;
			}
		}
	};
</script>
<style lang="scss">
	.code img {
		width: 100%;
		height: 100%;
	}

	.acea-row.row-middle {
		input {
			margin-left: 20rpx;
		}
	}
    .register {
        background-image: none; 
        width: 100%;
        height: 100vh;
    }
    
    
    
    
    .item {
    	flex: 1;
    	text-align: center;
    	font-size: 30rpx;
    	color: #282828;
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
        margin-top: 10px;
    }
</style>
