<template>
	<div class="register absolute">
		<div class="shading">
			<div class="pictrue acea-row row-center-wrapper">
				<image :src="logoUrl" v-if="logoUrl" />
				<image src="/static/images/logo2.png" v-else />
				</div>
		</div>
		<div class="whiteBg" v-if="formItem === 1">
			<!-- <div class="title acea-row row-center-wrapper">
				<div class="item" :class="current === index ? 'on' : ''" v-for="(item, index) in navList" @click="navTap(index)"
				 :key="index">
					{{ item }}
				</div>
			</div> -->
			<div class="list" :hidden="current !== 0">
				<form @submit.prevent="submit">
					<div class="item">
						<div class="acea-row row-middle">
							<image src="/static/images/phone_1.png"></image>
							<input type="text" placeholder="输入手机号码" v-model="account" required />
						</div>
					</div>
					<div class="item">
						<div class="acea-row row-middle">
							<image src="/static/images/code_2.png"></image>
							<input type="password" placeholder="填写登录密码" v-model="password" required />
						</div>
					</div>
				</form>
				<navigator class="forgetPwd" hover-class="none" url="/pages/users/retrievePassword/index">
					<span class="iconfont icon-wenti"></span>忘记密码
				</navigator>
			</div>
			<div class="list" :hidden="current !== 1">
				<div class="item">
					<div class="acea-row row-middle">
						<image src="/static/images/phone_1.png"></image>
						<input type="text" placeholder="输入手机号码" v-model="account" />
					</div>
				</div>
				<div class="item">
					<div class="acea-row row-middle">
						<image src="/static/images/code_2.png"></image>
						<input type="text" placeholder="填写验证码" class="codeIput" v-model="captcha" />
						<button class="code" :disabled="disabled" :class="disabled === true ? 'on' : ''" @click="code">
							{{ text }}
						</button>
					</div>
				</div>
				<div class="item" v-if="isShowCode">
					<div class="acea-row row-middle">
						<image src="/static/images/code_2.png"></image>
						<input type="text" placeholder="填写验证码" class="codeIput" v-model="codeVal" />
						<div class="code" @click="again"><img :src="codeUrl" /></div>
					</div>
				</div>
			</div>
			<div class="logon" @click="loginMobile" :hidden="current !== 1">登录</div>
			<div class="logon" @click="submit" :hidden="current === 1">登录</div>
			<div class="tip">
				没有账号?
				<span @click="formItem = 2" class="font-color-red">立即注册</span>
			</div>
		</div>
		<div class="whiteBg" v-else>
			<div class="title">注册账号</div>
			<div class="list">
                <div class="item">
                	<div class="acea-row row-middle">
                		<image src="/static/images/phone_1.png"></image>
                		<input type="text" placeholder="输入推荐人手机号码" v-model="account_recommend" />
                	</div>
                </div>
				<div class="item">
					<div class="acea-row row-middle">
						<image src="/static/images/phone_1.png"></image>
						<input type="text" placeholder="输入手机号码" v-model="account" />
					</div>
				</div>
				<!-- <div class="item">
					<div class="acea-row row-middle">
						<image src="/static/images/code_2.png"></image>
						<input type="text" placeholder="填写验证码" class="codeIput" v-model="captcha" />
						<button class="code" :disabled="disabled" :class="disabled === true ? 'on' : ''" @click="code">
							{{ text }}
						</button>
					</div>
				</div> -->
				<div class="item">
					<div class="acea-row row-middle">
						<image src="/static/images/code_1.png"></image>
						<input type="password" placeholder="填写您的登录密码" v-model="password" />
					</div>
				</div>
                <div class="item">
                	<div class="acea-row row-middle">
                		<image src="/static/images/code_1.png"></image>
                		<input type="password" placeholder="确认您的登录密码" v-model="password2" />
                	</div>
                </div>
                <div class="item">
                	<div class="acea-row row-middle">
                		<image src="/static/images/code_1.png"></image>
                		<input type="password" placeholder="填写您的支付密码" v-model="pay_password" />
                	</div>
                </div>
                <div class="item">
                	<div class="acea-row row-middle">
                		<image src="/static/images/code_1.png"></image>
                		<input type="password" placeholder="确认您的支付密码" v-model="pay_password2" />
                	</div>
                </div>
				<div class="item" v-if="isShowCode">
					<div class="acea-row row-middle">
						<image src="/static/images/code_2.png"></image>
						<input type="text" placeholder="填写验证码" class="codeIput" v-model="codeVal" />
						<div class="code" @click="again"><img :src="codeUrl" /></div>
					</div>
				</div>
			</div>
			<div class="logon" @click="register">注册</div>
            <label style="    height: 30px;
            line-height: 30px;
            color: darkgrey;
            display: block;
            margin: 0 auto;
            width: 68%;" class="radio">
                        <radio @click="xys" /><text>我已阅读并同意<text style="color: #fc4141 !important;" @click="checkxys">注册协议</text></text>
                    </label>
            		<div class="tip">
            			已有账号?
            			<span @click="formItem = 1" class="font-color-red">立即登录</span>
            		</div>
		<!-- 	<div class="tip">
				已有账号?
				<span @click="formItem = 1" class="font-color-red">立即登录</span>
			</div> -->
		</div>
		<div class="bottom"></div>
        <div v-if="checkxy" class="xy" style="    background: white;width: 90%;position: fixed;z-index: 999;top: 5vh;left: 5%; padding: 20px;border-radius: 5px;text-align: justify;height: 90vh;overflow: scroll;">
                
                        本商城依据本服务协议提供服务，您需要阅读、了解并自愿遵守本服务协议的所有内容，是您使用本网站的前提。本服务协议具有合同效力。本服务协议可由本网站随时修订，并将修订后的服务协议公告于本网站之上，修订后的条款内容自公告时起生效。您若在本服务协议修改之后，仍继续使用本网站，则视为您接受和自愿遵守修订后的服务协议。</br>
                        一. 协议条款的确认和接纳</br>
                        一.1 欢迎注册、登录脉通健康积分商城平台（以下简称“本平台”或“脉通”）、使用脉通平台服务（以下简称“本服务”或“脉通商城服务”），请您仔细阅读以下全部内容。</br>
                        本协议是您与脉通之间关于脉通商城服务的条款，本协议明确脉通已经发布的或将来可能发布的各类协议和规则。</br>
                        除另行明确声明外，您使用本平台服务的行为将受本协议约束。</br>
                        一.2 如您选择“点击同意”本协议或者以其他方式开始使用</br>本平台服务，即表示已经与脉通线上商城平台达成协议，并自愿接受本协议的所有内容。
                        二. 定义</br>
                        二.1 您：指符合本服务协议所规定的条件，已根据本服务协议在本网站注册，同意遵守本网站各种规则、条款（包括但不限于本服务协议），并使用本网站的个人或机构,注册账号并经在本平台消费购买产品即成为本平台的用户。</br>
                        二.2 脉通线上商城平台：提供四川脉通商贸有限公司结合线上线下销售商城上所有商品销售业务。</br>
                        三.帐号注册与登录</br>
                        三.1 您需在脉通线上销售平台通过购买商城产品，您需先登录您的帐号，或注册脉通帐号并登录。您注册登录的帐号是脉通商城确认您身份的唯一依据。</br>
                        三.2 注册完成后，请您妥善保存有关帐号和密码，并对该帐号进行的所有活动和行为负责。</br>
                        如因您自身原因（包括但不限于转让帐号、与他人共用、自己泄露等）或您所用计算机或其他终端产品感染病毒或木马，而导致帐号密码泄漏、遗失或其他损失后果将由您独自承担。</br>
                        三.3 您确认：您是具备完全民事权利能力和完全民事行为能力的自然人、法人或其他组织，有能力对您使用脉通平台服务的一切行为独立承担责任。</br>
                        三.4 您在注册账号时，不得在账号注册资料中出现违法和不良信息。</br>
                        四. 质量与技术标准和产品包装</br>
                        四.1质量与技术标准：</br>
                        产品的质量技术标准为产品制造商（下称原厂商）制定的质量技术标准。买方已知悉上述标准，并确认采用该标准的产品能满足买方对产品的要求。</br>
                        四.2产品包装：</br>
                        （1）有原厂包装的，按原厂包装标准；</br>
                        （2）没有原厂包装的，按卖方包装标准进行包装。</br>
                        五. 如您涉嫌侵犯他人合法权益，则脉通有权在初步判断行为存在的情况下，向权利人提供关于您的前述必要信息。</br>
                        五.1 宇坤宝有权视您违反本协议行为的严重程度，对您采取以下单项或多项措施：</br>
                        五.1.1 暂停/终止提供全部或部分服务；</br>
                        五.1.2 删除违规内容；</br>
                        五.1.3 暂时/永久封禁账号；</br>
                        五.1.4 其他脉通采取的合理措施；</br>
                        五.2 对于在本平台上的内容, 脉通不保证其适用性或满足您特定需求及目的进行任何明示或者默示的担保。在任何情况下, 脉通均不对任何内容负责, 包括但不限于任何内容发生任何错误或纰漏以及衍生的任何损失或损害。脉通有权（但无义务）自行拒绝或删除本平台上的任何内容。您使用上述内容, 应自行承担风险。</br>
                        六.隐私政策</br>
                        尊重个人隐私是脉通的一项基本政策。脉通将收集、存储、使用和保护您的个人信息。</br>
                        七.其他约定</br>
                        七.1 脉通对不可抗力导致的损失不承担责任。</br>
                        本协议所指不可抗力包括但不限于：</br>
                        因网络服务特性而特有的原因，例如计算机或互联网相关技术缺陷、计算机病毒、黑客攻击等因素，及其他合法范围内的不能预见、不能避免并不能克服的客观情况。</br>
                        七.2 服务中止、中断及终止：</br>
                        脉通出于维护本服务的安全、维护其他用户的正常使用与数据安全、回应其他主体的侵权诉求等理由则脉通有权变更、中止、中断或终止向您提供服务，且无须向您或任何第三方承担责任。</br>
                        七.3所有权及知识产权：</br>
                        脉通平台上所有内容，包括但不限于文字、软件、声音、图片、录像、图表、网站架构、网站画面的安排、网页设计、脉通为您提供的其他资料均由脉通或其他权利人依法拥有其知识产权，包括但不限于著作权、商标权、专利权等。</br>
                        八.本协议自发布之日起实施，并构成您和脉通之间的共识。</br>
                        九. 如果您对本协议内容有任何疑问，请在平台内留言反馈。</br>
                          
            </div>
            <!-- <image src="/static/images/logo2.png"> -->
            <div v-if="checkxy" class="cover" @click="hidexy"></div>
	</div>
</template>
<script>
    import auth from "@/libs/wechat";
	import dayjs from "@/plugin/dayjs/dayjs.min.js";
	import sendVerifyCode from "@/mixins/SendVerifyCode";
	import {
		loginH5,
		loginMobile,
		registerVerify,
		register,
		agreeys,
        getRecommentAccount,
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
    import { isWeixin } from "@/utils";
	const BACK_URL = "login_back_url";

	export default {
		name: "Login",
		mixins: [sendVerifyCode],
        onLoad: function(options) {
            if((options.type) && options.type == 'register'){
                this.formItem = 0
            }
            let that = this
            if (isWeixin()) {
            	auth.oAuthNew().then(function(result){
                    that.url = result
                });
            }
            this.getRecommentAccount()
        },
		data: function() {
			return {
				navList: ["账号登录", "快速登录"],
                
                checkxy:0,
				checkysxy:1,
                xy:0,
				current: 0,
				account: "",
                account_recommend:"",
				password: "",
				password2: "",
                pay_password:'',
                pay_password2:'',
				captcha: "",
                time:0,
				formItem: 1,
				type: "login",
				logoUrl: "",
				keyCode: "",
				codeUrl: "",
				codeVal: "",
                url:'',
				isShowCode: false
			};
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
			no_user(){
				plus.runtime.quit();  
			},
			agree(){
				let that = this
				agreeys({
					
				}).then(res => {
						that.keyCode = res.data.key;
					})
					.catch(res => {
						that.$util.Tips({
							title: res
						});
					});
			},
			again() {
				// this.codeUrl =
				// 	VUE_APP_API_URL +
				// 	"/sms_captcha?" +
				// 	"key=" +
				// 	this.keyCode +
				// 	Date.parse(new Date());
				this.getcaptcha()
			},
            checkxys(){
                this.checkxy=1
            },
            hidexy(){
                this.checkxy=0
            },
            xys:function(){
                this.xy = 1
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
			async loginMobile() {
				let that = this;
				if (!that.account) return that.$util.Tips({
					title: '请填写手机号码'
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
				loginMobile({
						phone: that.account,
						// sms_code: that.captcha,
						sms_code: '666666',
						url: that.url,
						spread: that.$Cache.get("spread")
					})
					.then(({data}) => {
						const backUrl = that.$Cache.get(BACK_URL) || "/pages/index/index";
						that.$Cache.clear(BACK_URL);
						that.$store.commit("LOGIN", {
							'token': data.token,
							'time': data.exp
						});
						that.$store.commit("SETUID", data.user.uid);
						that.$store.commit('UPDATE_USERINFO', data.user);
						if (backUrl === '/pages/index/index' || backUrl === '/pages/order_addcart/order_addcart' || backUrl ==='/pages/user/index') {
							uni.switchTab({
								url: backUrl
							});
						} else {
							uni.switchTab({
								url: '/pages/index/index'
							});
						}
					})
					.catch(res => {
						that.$util.Tips({
							title: res
						});
					});
			},
            async getRecommentAccount() {
            	let that = this;
            	getRecommentAccount({
            			spread: that.$Cache.get("spread")
            		})
            		.then(res => {
                        that.account_recommend = res.message
            		})
            },
			async register() {
				let that = this;
                if (!that.xy) return that.$util.Tips({
                	title: '请阅读并勾选注册协议'
                });
				if (!that.account) return that.$util.Tips({
					title: '请填写手机号码'
				});
                if (!that.account_recommend) return that.$util.Tips({
                	title: '请填写推荐人手机号码'
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
				if (!that.password) return that.$util.Tips({
					title: '请填写密码'
				});
                if (!that.pay_password) return that.$util.Tips({
                	title: '请填写支付密码'
                });
                if (that.password != that.password2) return that.$util.Tips({
                	title: '密码输入不一致'
                });
                if (that.pay_password != that.pay_password2) return that.$util.Tips({
                	title: '支付密码输入不一致'
                });
				// if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/i.test(that.password)) return that.$util.Tips({
				// 	title: '您输入的密码过于简单'
				// });
                if(that.time > 0 && (Date.parse(new Date())/1000 - that.time) < 3) return that.$util.Tips({
                	title: '访问过于频繁'
                });
                
                that.time = Date.parse(new Date())/1000
				register({
						account: that.account,
                        account_recommend: that.account_recommend,
						captcha: '666666',
						// captcha: that.captcha,
						password: that.password,
						pay_password: that.pay_password,
						spread: that.$Cache.get("spread")
					})
					.then(res => {
						that.$util.Tips({
							title: res
						});
						that.formItem = 1;
					})
					.catch(res => {
						that.$util.Tips({
							title: res
						});
					});
			},
			async code() {
				let that = this;
				if (!that.account) return that.$util.Tips({
					title: '请填写手机号码'
				});
				if (!/^1(3|4|5|7|8|9|6)\d{9}$/i.test(that.account)) return that.$util.Tips({
					title: '请输入正确的手机号码'
				});
				if (that.formItem == 2) that.type = "register";
				
				await registerVerify({
						phone: that.account,
						type: that.type,
						key: that.keyCode,
						code: that.codeVal
					})
					.then(res => {
						that.$util.Tips({title:res.msg});
						that.sendCode();
					})
					.catch(res => {
						that.getcaptcha();
						that.$util.Tips({title:res});
					});
			},
			getcaptcha(){
				let that = this
				getCaptcha().then(data=>{
					// that.codeUrl = `${VUE_APP_API_URL}/sms_captcha?key=${that.keyCode}`;
					that.codeUrl = data.data.captcha;
                    console.log(that.codeUrl)
				}).catch(res => {
                    console.log(res)
                })
                that.isShowCode = true;
			},
			navTap: function(index) {
				this.current = index;
			},
			async submit() {
				let that = this;
				if (!that.account) return that.$util.Tips({
					title: '请填写账号'
				});
				if (!/^[\w\d]{5,16}$/i.test(that.account)) return that.$util.Tips({
					title: '请输入正确的账号'
				});
				if (!that.password) return that.$util.Tips({
					title: '请填写密码'
				});
				loginH5({
						account: that.account,
                        url: that.url,
						password: that.password
					})
					.then(({
						data
					}) => {
						const backUrl = that.$Cache.get(BACK_URL) || "/pages/index/index";
						that.$Cache.clear(BACK_URL);
						that.$store.commit("LOGIN", {
							'token': data.token,
							'time': data.exp
						});
						that.$store.commit("SETUID", data.user.uid);
						that.$store.commit('UPDATE_USERINFO', data.user);
						if (backUrl === '/pages/index/index' || backUrl === '/pages/order_addcart/order_addcart' || backUrl ==='/pages/user/index') {
							uni.switchTab({
								url: backUrl
							});
						} else {
							uni.switchTab({
								url: '/pages/index/index'
							});
						}
						
					})
					.catch(e => {
						that.$util.Tips({
							title: e
						});
					});
			}
		}
	};
</script>
<style lang="scss">
	.code img {
		width: 100%;
		height: 100%;
	}
	
	.sell{
			width: 30%;
		    background: #ea4334;
		    color: #fff;
		    text-align: center;
		    height: 40px;
		    line-height: 40px;
		    margin: 0 auto;
		    border-radius: 500px;
	}

	.acea-row.row-middle {
		input {
			margin-left: 20rpx;
		}
	}
    .cover{
        width: 100%;
        height:100%;
        background-color: #000000;
        opacity: 0.5;
        -moz-opacity: 0.5;
        filter: alpha(opacity=50);
        /*display: none;*/
        display: block;
        position: fixed;
        left: 0;
        z-index: 99;
        top: 0;
    }
</style>
