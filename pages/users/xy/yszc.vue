<template>
	<view class="feedback-container">
		<!-- <view class="head-wrapper" :style="'top:'+statusBarHeight">
			<view class="head-menu fh">
				<view class='iconfont icon-xiangzuo ft20' @click="returns">返回</view>
			</view>
		</view>	 -->
	<view class="user_store_attention" style="background-color: #fff;" v-if="false">
		<h2 style="margin-top:20px;margin-bottom:10px;text-align:center">
		    <strong><span style="font-family: Helvetica;font-size: 26px">隐私政策</span></strong>
		</h2>
		<h4 style="margin-top: 10px;margin-bottom: 10px">
		    <strong><span style="font-family: Helvetica;font-size: 18px">&nbsp;</span></strong>
		</h4>
		<p style="margin-top:7px;margin-bottom:7px;margin-left:25px;margin-top:auto;margin-bottom:auto;padding:0 0 0 0 ">
		    <span style="font-family:Symbol;font-size:13px">·&nbsp;</span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">您在使用我们的服务时，我们可能会收集和使用您的相关信息。</span></span>
		</p>
		<p style="margin-top:7px;margin-bottom:7px;margin-left:25px;margin-top:auto;margin-bottom:auto;padding:0 0 0 0 ">
		    <span style="font-family:Symbol;font-size:13px">·&nbsp;</span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">我们希望通过本《隐私政策》向您说明，在使用我们的服务时，我们如何收集、使用、储存和分享这些信息，以及我们为您提供的访问、更新、控制和保护这些信息的方式。</span></span>
		</p>
		<p style="margin-top:7px;margin-bottom:7px;margin-left:25px;margin-top:auto;margin-bottom:auto;padding:0 0 0 0 ">
		    <span style="font-family:Symbol;font-size:13px">·&nbsp;</span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">本《隐私政策》与您所使用的服务息息相关，希望您仔细阅读，在需要时，按照本《隐私政策》的指引，作出您认为适当的选择。</span></span>
		</p>
		<p style="margin-top:7px;margin-bottom:7px;margin-left:25px;margin-top:auto;margin-bottom:auto;padding:0 0 0 0 ">
		    <span style="font-family:Symbol;font-size:13px">·&nbsp;</span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">本《隐私政策》中涉及的相关技术词汇，我们尽量以简明扼要的表述，并提供进一步说明的链接，以便您的理解。</span></span>
		</p>
		<p style="margin-top:7px;margin-bottom:7px;margin-left:25px;margin-top:auto;margin-bottom:auto;padding:0 0 0 0 ">
		    <span style="font-family:Symbol;font-size:13px">·&nbsp;</span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">您使用或继续使用我们的服务，即意味着同意我们按照本《隐私政策》收集、使用、储存和分享您的相关信息。</span> <span style="font-family:宋体">如对本《隐私政策》或相关事宜有任何问题，请与我们联系。</span></span>
		</p>
		<h4 style="margin-top:10px;margin-bottom:10px">
		    <strong><span style="font-family: Helvetica;font-size: 18px">我们可能收集的信息</span></strong>
		</h4>
		<p style="margin-top:7px;margin-bottom:7px;margin-left:25px;margin-top:auto;margin-bottom:auto;padding:0 0 0 0 ">
		    <span style="font-family:Symbol;font-size:13px">·&nbsp;</span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">我们提供服务时，可能会收集、储存和使用下列与您有关的信息。如果您不提供相关信息，可能无法享受我们提供的某些服务，或者无法达到相关服务拟达到的效果。</span></span>
		</p>
		<h4 style="margin-top:10px;margin-bottom:10px">
		    <strong><span style="font-family: Helvetica;font-size: 18px">您提供的信息</span></strong>
		</h4>
		<p style="margin-top:7px;margin-bottom:7px;margin-left:25px;margin-top:auto;margin-bottom:auto;padding:0 0 0 0 ">
		    <span style="font-family:Symbol;font-size:13px">·&nbsp;</span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">您在使用我们的服务时，向我们提供的相关个人信息，例如电话号码、电子邮件或银行卡号等；</span></span>
		</p>
		<p style="margin-top:7px;margin-bottom:7px;margin-left:25px;margin-top:auto;margin-bottom:auto;padding:0 0 0 0 ">
		    <span style="font-family:Symbol;font-size:13px">·&nbsp;</span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">您通过我们的服务向其他方提供的共享信息，以及您使用我们的服务时所储存的信息。</span></span>
		</p>
		<h4 style="margin-top:10px;margin-bottom:10px">
		    <strong><span style="font-family: Helvetica;font-size: 18px">其他方分享的您的信息</span></strong>
		</h4>
		<p style="margin-top:7px;margin-bottom:7px;margin-left:25px;margin-top:auto;margin-bottom:auto;padding:0 0 0 0 ">
		    <span style="font-family:Symbol;font-size:13px">·&nbsp;</span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">其他方使用我们的服务时所提供有关您的共享信息。</span></span>
		</p>
		<h4 style="margin-top:10px;margin-bottom:10px">
		    <strong><span style="font-family: Helvetica;font-size: 18px">我们获取的您的信息</span></strong>
		</h4>
		<p>
		    <span style=";font-family:宋体;font-size:16px"><span style="font-family:宋体">您使用服务时我们可能收集如下信息：</span>&nbsp;</span>
		</p>
		<p style="margin-top:7px;margin-bottom:7px;margin-left:25px;margin-top:auto;margin-bottom:auto">
		    <span style="font-family:Calibri;font-weight:bold;font-size:16px">1.&nbsp;</span><strong><span style="font-family: Calibri;font-size: 14px"><span style="font-family:宋体">日志信息</span></span></strong><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">，指您使用我们的服务时，系统可能通过</span>cookies<span style="font-family:宋体">、</span><span style="font-family:Calibri">web beacon</span><span style="font-family:宋体">或其他方式自动采集的技术信息，包括：</span></span>
		</p>
		<p style="margin-top:7px;margin-bottom:7px;margin-left:25px;margin-top:auto;margin-bottom:auto">
		    <span style="font-family:Calibri;font-weight:bold;font-size:16px">2.&nbsp;</span><strong><span style="font-family: Calibri;font-size: 14px"><span style="font-family:宋体">设备或软件信息</span></span></strong><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">，例如您的移动设备、网页浏览器或用于接入我们服务的其他程序所提供的配置信息、您的</span>IP<span style="font-family:宋体">地址和移动设备所用的版本和设备识别码；</span></span>
		</p>
		<p style="margin-top:7px;margin-bottom:7px;margin-left:25px;margin-top:auto;margin-bottom:auto">
		    <span style="font-family:Calibri;font-size:16px">3.&nbsp;</span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">在使用我们服务时搜索或浏览的信息，例如您使用的网页搜索词语、访问的社交媒体页面</span>url<span style="font-family:宋体">地址，以及您在使用我们服务时浏览或要求提供的其他信息和内容详情；</span></span>
		</p>
		<p style="margin-top:7px;margin-bottom:7px;margin-left:25px;margin-top:auto;margin-bottom:auto">
		    <span style="font-family:Calibri;font-size:16px">4.&nbsp;</span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">有关您曾使用的移动应用（</span>APP<span style="font-family:宋体">）和其他软件的信息，以及您曾经使用该等移动应用和软件的信息；</span></span>
		</p>
		<p style="margin-top:7px;margin-bottom:7px;margin-left:25px;margin-top:auto;margin-bottom:auto">
		    <span style="font-family:Calibri;font-weight:bold;font-size:16px">5.&nbsp;</span><strong><span style="font-family: Calibri;font-size: 14px"><span style="font-family:宋体">位置信息</span></span></strong><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">，指您开启设备定位功能并使用我们基于位置提供的相关服务时，收集的有关您位置的信息，包括：</span></span>
		</p>
		<p style="margin-top:7px;margin-bottom:7px;margin-left:25px;margin-top:auto;margin-bottom:auto">
		    <span style="font-family:Calibri;font-size:16px">6.&nbsp;</span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">您通过具有定位功能的移动设备使用我们的服务时，通过</span>GPS<span style="font-family:宋体">或</span><span style="font-family:Calibri">WiFi</span><span style="font-family:宋体">等方式收集的您的地理位置信息；</span></span>
		</p>
		<p style="margin-top:7px;margin-bottom:7px;margin-left:25px;margin-top:auto;margin-bottom:auto">
		    <span style="font-family:Calibri;font-size:16px">7.&nbsp;</span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">您或其他用户提供的包含您所处地理位置的实时信息，例如您提供的账户信息中包含的您所在地区信息，您或其他人上传的显示您当前或曾经所处地理位置的共享信息；</span></span>
		</p>
		<p style="margin-top:7px;margin-bottom:7px;margin-left:25px;margin-top:auto;margin-bottom:auto">
		    <span style="font-family:Calibri;font-size:16px">8.&nbsp;</span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">您可以通过关闭定位功能，停止对您的地理位置信息的收集。</span></span>
		</p>
		<h4 style="margin-top:10px;margin-bottom:10px">
		    <strong><span style="font-family: Helvetica;font-size: 18px">我们可能如何使用信息</span></strong>
		</h4>
		<p>
		    <span style=";font-family:宋体;font-size:16px"><span style="font-family:宋体">我们可能将在向您提供服务的过程之中所收集的信息用作下列用途：</span>&nbsp;</span>
		</p>
		<p style="margin-top:7px;margin-bottom:7px;margin-left:25px;margin-top:auto;margin-bottom:auto">
		    <span style="font-family:Calibri;font-size:16px">1.&nbsp;</span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">向您提供服务；</span></span>
		</p>
		<p style="margin-top:7px;margin-bottom:7px;margin-left:25px;margin-top:auto;margin-bottom:auto">
		    <span style="font-family:Calibri;font-size:16px">2.&nbsp;</span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">在我们提供服务时，用于身份验证、客户服务、安全防范、诈骗监测、存档和备份用途，确保我们向您提供的产品和服务的安全性；</span></span>
		</p>
		<p style="margin-top:7px;margin-bottom:7px;margin-left:25px;margin-top:auto;margin-bottom:auto">
		    <span style="font-family:Calibri;font-size:16px">3.&nbsp;</span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">帮助我们设计新服务，改善我们现有服务；</span></span>
		</p>
		<p style="margin-top:7px;margin-bottom:7px;margin-left:25px;margin-top:auto;margin-bottom:auto">
		    <span style="font-family:Calibri;font-size:16px">4.&nbsp;</span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">使我们更加了解您如何接入和使用我们的服务，从而针对性地回应您的个性化需求，例如语言设定、位置设定、个性化的帮助服务和指示，或对您和其他用户作出其他方面的回应；</span></span>
		</p>
		<p style="margin-top:7px;margin-bottom:7px;margin-left:25px;margin-top:auto;margin-bottom:auto">
		    <span style="font-family:Calibri;font-size:16px">5.&nbsp;</span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">向您提供与您更加相关的广告以替代普遍投放的广告；</span></span>
		</p>
		<p style="margin-top:7px;margin-bottom:7px;margin-left:25px;margin-top:auto;margin-bottom:auto">
		    <span style="font-family:Calibri;font-size:16px">6.&nbsp;</span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">评估我们服务中的广告和其他促销及推广活动的效果，并加以改善；</span></span>
		</p>
		<p style="margin-top:7px;margin-bottom:7px;margin-left:25px;margin-top:auto;margin-bottom:auto">
		    <span style="font-family:Calibri;font-size:16px">7.&nbsp;</span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">软件认证或管理软件升级；</span></span>
		</p>
		<p style="margin-top:7px;margin-bottom:7px;margin-left:25px;margin-top:auto;margin-bottom:auto">
		    <span style="font-family:Calibri;font-size:16px">8.&nbsp;</span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">让您参与有关我们产品和服务的调查。</span></span>
		</p>
		<p style="margin-top:7px;margin-bottom:7px;margin-left:25px;margin-top:auto;margin-bottom:auto">
		    <!-- <span style="font-family:Calibri;font-size:16px">9.&nbsp;</span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">为了让您有更好的体验、改善我们的服务或您同意的其他用途，在符合相关法律法规的前提下，我们可能将通过某一项服务所收集的信息，以汇集信息或者个性化的方式，用于我们的其他服务。例如，在您使用我们的一项服务时所收集的信息，可能在另一服务中用于向您提供特定内容，或向您展示与您相关的、非普遍推送的信息。如果我们在相关服务中提供了相应选项，您也可以授权我们将该服务所提供和储存的信息用于我们的其他服务。</span></span> -->
		    <span style="font-family:Calibri;font-size:16px">9.&nbsp;</span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">为了让您有更好的体验、改善我们的服务或您同意的其他用途，在符合相关法律法规的前提下，我们可能将通过某一项服务所收集的信息，例如上传照片，拨打电话等权限。</span></span>
		</p>
		<p style="margin-top:7px;margin-bottom:7px;margin-left:25px;margin-top:auto;margin-bottom:auto">
		    <span style="font-family:Calibri;font-size:16px">10.&nbsp;</span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">我们将尽一切可能采取适当的技术手段，保证您可以访问、更新和更正自己的注册信息或使用我们的服务时提供的其他个人信息。在访问、更新、更正和删除前述信息时，我们可能会要求您进行身份验证，以保障账户安全。</span></span>
		</p>
		<p>
		    <span style=";font-family:宋体;font-size:15px"><span style="font-family:宋体">我们可能分享的信息，</span></span><span style=";font-family:宋体;font-size:16px"><span style="font-family:宋体">除以下情形外，未经您同意，我们不会与任何第三方分享您的个人信息：</span>&nbsp;</span>
		</p>
		<p style="margin-top:7px;margin-bottom:7px;margin-left:25px;margin-top:auto;margin-bottom:auto">
		    <span style="font-family:Calibri;font-size:16px">1.&nbsp;</span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">我们可能将您的个人信息与第三方服务供应商、承包商及代理（例如代表我们发出电子邮件或推送通知的通讯服务提供商、为我们提供位置数据的地图服务供应商）分享（他们可能并非位于您所在的法域），用作下列用途：</span></span>
		</p>
		<p style="margin-top:7px;margin-bottom:7px;margin-left:25px;margin-top:auto;margin-bottom:auto">
		    <span style="font-family:Calibri;font-size:16px">2.&nbsp;</span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">向您提供我们的服务；</span></span>
		</p>
		<p style="margin-top:7px;margin-bottom:7px;margin-left:25px;margin-top:auto;margin-bottom:auto">
		    <span style="font-family:Calibri;font-size:16px">3.&nbsp;</span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">实现</span>“<span style="font-family:宋体">我们可能如何使用信息</span><span style="font-family:Calibri">”</span><span style="font-family:宋体">部分所述目的；</span></span>
		</p>
		<p style="margin-top:7px;margin-bottom:7px;margin-left:25px;margin-top:auto;margin-bottom:auto">
		    <span style="font-family:Calibri;font-size:16px">4.&nbsp;</span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">履行我们在本《隐私政策》中的义务和行使我们的权利；</span></span>
		</p>
		<p style="margin-top:7px;margin-bottom:7px;margin-left:25px;margin-top:auto;margin-bottom:auto">
		    <span style="font-family:Calibri;font-size:16px">5.&nbsp;</span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">理解、维护和改善我们的服务。</span></span>
		</p>
		<p style="margin-top:7px;margin-bottom:7px;margin-left:25px;margin-top:auto;margin-bottom:auto">
		    <span style="font-family:Calibri;font-size:16px">6.&nbsp;</span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">如我们与任何上述第三方分享您的个人信息，我们将努力确保该等第三方在使用您的个人信息时遵守本《隐私政策》及我们要求其遵守的其他适当的保密和安全措施。</span></span>
		</p>
		<p style="margin-top:7px;margin-bottom:7px;margin-left:25px;margin-top:auto;margin-bottom:auto">
		    <span style="font-family:Calibri;font-size:16px">7.&nbsp;</span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">随着我们业务的持续发展，我们有可能进行合并、收购、资产转让或类似的交易，您的个人信息有可能作为此类交易的一部分而被转移。我们将在转移前通知您。</span></span>
		</p>
		<p>
		    <span style=";font-family:宋体;font-size:16px"><span style="font-family:宋体">我们还可能为以下需要而保留、保存或披露您的个人信息：</span>&nbsp;</span>
		</p>
		<p style="margin-top:7px;margin-bottom:7px;margin-left:25px;margin-top:auto;margin-bottom:auto">
		    <span style="font-family:Calibri;font-size:16px">1.&nbsp;</span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">遵守适用的法律法规；</span></span>
		</p>
		<p style="margin-top:7px;margin-bottom:7px;margin-left:25px;margin-top:auto;margin-bottom:auto">
		    <span style="font-family:Calibri;font-size:16px">2.&nbsp;</span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">遵守法院命令或其他法律程序的规定；</span></span>
		</p>
		<p style="margin-top:7px;margin-bottom:7px;margin-left:25px;margin-top:auto;margin-bottom:auto">
		    <span style="font-family:Calibri;font-size:16px">3.&nbsp;</span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">遵守相关政府机关的要求；</span></span>
		</p>
		<p style="margin-top:7px;margin-bottom:7px;margin-left:25px;margin-top:auto;margin-bottom:auto">
		    <span style="font-family:Calibri;font-size:16px">4.&nbsp;</span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">为遵守适用的法律法规、维护社会公共利益，或保护我们的客户、我们、其他用户的人身和财产安全或合法权益所合理必需的用途</span></span>
		</p>
		<h4 style="margin-top:10px;margin-bottom:10px">
		    <strong><span style="font-family: Helvetica;font-size: 18px">信息安全</span></strong>
		</h4>
		<p style="margin-top:7px;margin-bottom:7px;margin-left:25px;margin-top:auto;margin-bottom:auto">
		    <span style="font-family:Calibri;font-size:16px">1.&nbsp;</span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">我们仅在本《隐私政策》所述目的所必需的期间和法律法规要求的时限内保留您的个人信息。</span> <span style="font-family:宋体">我们使用各种安全技术和程序，以防信息的丢失、不当使用、未经授权阅览或披露。例如，在某些服务中，我们将利用加密技术（例如</span>SSL<span style="font-family:宋体">）来保护您提供的个人信息。但请您理解，由于技术的限制以及可能存在的各种恶意手段，在互联网行业，即便竭尽所能加强安全措施，也不可能始终保证信息百分之百的安全。您需要了解，您接入我们的服务所用的系统和通讯网络，有可能因我们可控范围外的因素而出现问题。</span></span>
		</p>
		<p style="margin-top:7px;margin-bottom:7px;margin-left:25px;margin-top:auto;margin-bottom:auto">
		    <span style="font-family:Calibri;font-size:16px">2.&nbsp;</span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">您分享的信息</span></span>
		</p>
		<p style="margin-top:7px;margin-bottom:7px;margin-left:25px;margin-top:auto;margin-bottom:auto">
		    <span style="font-family:Calibri;font-size:16px">3.&nbsp;</span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">我们的多项服务，可让您不仅与自己的社交网络，也与使用该服务的所有用户公开分享您的相关信息，例如，您在我们的服务中所上传或发布的信息（包括您公开的个人信息、您建立的名单）、您对其他人上传或发布的信息作出的回应，以及包括与这些信息有关的位置数据和日志信息。使用我们服务的其他用户也有可能分享与您有关的信息（包括位置数据和日志信息）。特别是，我们的社交媒体服务，是专为使您与世界各地的用户共享信息而设计，您可以使共享信息实时、广泛地传递。只要您不删除共享信息，有关信息会一直留存在公共领域；即使您删除共享信息，有关信息仍可能由其他用户或不受我们控制的非关联第三方独立地缓存、复制或储存，或由其他用户或该等第三方在公共领域保存。</span></span>
		</p>
		<p style="margin-top:7px;margin-bottom:7px;margin-left:25px;margin-top:auto;margin-bottom:auto">
		    <span style="font-family:Calibri;font-size:16px">4.&nbsp;</span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">因此，请您谨慎考虑通过我们的服务上传、发布和交流的信息内容。在一些情况下，您可通过我们某些服务的隐私设定来控制有权浏览您共享信息的用户范围。如要求从我们的服务中删除您的相关信息，请通过该等特别服务条款提供的方式操作。</span></span>
		</p>
		<h4 style="margin-top:10px;margin-bottom:10px">
		    <strong><span style="font-family: Helvetica;font-size: 18px">您分享的敏感个人信息</span></strong>
		</h4>
		<p style="margin-top:7px;margin-bottom:7px;margin-left:25px;margin-top:auto;margin-bottom:auto">
		    <span style="font-family:Calibri;font-size:16px">1.&nbsp;</span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">某些个人信息因其特殊性可能被认为是敏感个人信息，例如您的种族、宗教、个人健康和医疗信息等。相比其他个人信息，敏感个人信息受到更加严格的保护。</span></span>
		</p>
		<p style="margin-top:7px;margin-bottom:7px;margin-left:25px;margin-top:auto;margin-bottom:auto">
		    <span style="font-family:Calibri;font-size:16px">2.&nbsp;</span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">请注意，您在使用我们的服务时所提供、上传或发布的内容和信息（例如有关您社交活动的照片等信息），可能会泄露您的敏感个人信息。您需要谨慎地考虑，是否在使用我们的服务时披露相关敏感个人信息。</span></span>
		</p>
		<p style="margin-top:7px;margin-bottom:7px;margin-left:25px;margin-top:auto;margin-bottom:auto">
		    <span style="font-family:Calibri;font-size:16px">3.&nbsp;</span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">您同意按本《隐私政策》所述的目的和方式来处理您的敏感个人信息。</span></span>
		</p>
		<h4 style="margin-top:10px;margin-bottom:10px">
		    <strong><span style="font-family: Helvetica;font-size: 18px">我们可能如何收集信息</span></strong>
		</h4>
		<p style="margin-top:7px;margin-bottom:7px;margin-left:25px;margin-top:auto;margin-bottom:auto">
		    <span style="font-family:Calibri;font-size:16px">1.&nbsp;</span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">我们或我们的第三方合作伙伴，可能通过</span>cookies<span style="font-family:宋体">和</span><span style="font-family:Calibri">web beacon</span><span style="font-family:宋体">收集和使用您的信息，并将该等信息储存为日志信息。</span></span>
		</p>
		<p style="margin-top:7px;margin-bottom:7px;margin-left:25px;margin-top:auto;margin-bottom:auto">
		    <span style="font-family:Calibri;font-size:16px">2.&nbsp;</span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">我们使用自己的</span>cookies<span style="font-family:宋体">和</span><span style="font-family:Calibri">web beacon</span><span style="font-family:宋体">，目的是为您提供更个性化的用户体验和服务，并用于以下用途：</span></span>
		</p>
		<p style="margin-top:7px;margin-bottom:7px;margin-left:25px;margin-top:auto;margin-bottom:auto">
		    <span style="font-family:Calibri;font-size:16px">3.&nbsp;</span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">记住您的身份。例如：</span>cookies<span style="font-family:宋体">和</span><span style="font-family:Calibri">web beacon</span><span style="font-family:宋体">有助于我们辨认您作为我们的注册用户的身份，或保存您向我们提供的有关您的喜好或其他信息；</span></span>
		</p>
		<p style="margin-top:7px;margin-bottom:7px;margin-left:25px;margin-top:auto;margin-bottom:auto">
		    <span style="font-family:Calibri;font-size:16px">4.&nbsp;</span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">分析您使用我们服务的情况。例如，我们可利用</span>cookies<span style="font-family:宋体">和</span><span style="font-family:Calibri">web beacon</span><span style="font-family:宋体">来了解您使用我们的服务进行什么活动，或哪些网页或服务最受您的欢迎；</span></span>
		</p>
		<h4 style="margin-top:10px;margin-bottom:10px">
		    <strong><span style="font-family: Helvetica;font-size: 18px">广告优化</span></strong>
		</h4>
		<p style="margin-top:7px;margin-bottom:7px;margin-left:25px;margin-top:auto;margin-bottom:auto">
		    <span style="font-family:Calibri;font-size:16px">1.&nbsp;</span><span style=";font-family:Calibri;font-size:14px">Cookies<span style="font-family:宋体">和</span><span style="font-family:Calibri">web beacon</span><span style="font-family:宋体">有助于我们根据您的信息，向您提供与您相关的广告而非进行普遍的广告投放。</span></span>
		</p>
		<p style="margin-top:7px;margin-bottom:7px;margin-left:25px;margin-top:auto;margin-bottom:auto">
		    <span style="font-family:Calibri;font-size:16px">2.&nbsp;</span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">我们为上述目的使用</span>cookies<span style="font-family:宋体">和</span><span style="font-family:Calibri">web beacon</span><span style="font-family:宋体">的同时，可能将通过</span><span style="font-family:Calibri">cookies</span><span style="font-family:宋体">和</span><span style="font-family:Calibri">web beacon</span><span style="font-family:宋体">收集的非个人身份信息，经统计加工后提供给广告商或其他合作伙伴，用于分析用户如何使用我们的服务，并用于广告服务。</span></span>
		</p>
		<p style="margin-top:7px;margin-bottom:7px;margin-left:25px;margin-top:auto;margin-bottom:auto">
		    <span style="font-family:Calibri;font-size:16px">3.&nbsp;</span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">我们的产品和服务上可能会有广告商或其他合作方放置的</span>cookies<span style="font-family:宋体">和</span><span style="font-family:Calibri">web beacon</span><span style="font-family:宋体">。这些</span><span style="font-family:Calibri">cookies</span><span style="font-family:宋体">和</span><span style="font-family:Calibri">web beacon</span><span style="font-family:宋体">可能会收集与您相关的非个人身份信息，以用于分析用户如何使用该等服务、向您发送您可能感兴趣的广告，或用于评估广告服务的效果。这些第三方</span><span style="font-family:Calibri">cookies</span><span style="font-family:宋体">和</span><span style="font-family:Calibri">web beacon</span><span style="font-family:宋体">收集和使用该等信息，不受本《隐私政策》约束，而是受相关使用者的隐私政策约束，我们不对第三方的</span><span style="font-family:Calibri">cookies</span><span style="font-family:宋体">或</span><span style="font-family:Calibri">web beacon</span><span style="font-family:宋体">承担责任。</span></span>
		</p>
		<p style="margin-top:7px;margin-bottom:7px;margin-left:25px;margin-top:auto;margin-bottom:auto">
		    <span style="font-family:Calibri;font-size:16px">4.&nbsp;</span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">您可以通过浏览器设置拒绝或管理</span>cookies<span style="font-family:宋体">或</span><span style="font-family:Calibri">web beacon</span><span style="font-family:宋体">。但请注意，如果停用</span><span style="font-family:Calibri">cookies</span><span style="font-family:宋体">或</span><span style="font-family:Calibri">web beacon</span><span style="font-family:宋体">，您有可能无法享受最佳的服务体验，某些服务也可能无法正常使用。同时，您还会收到同样数量的广告，但这些广告与您的相关性会降低。</span></span>
		</p>
		<h4 style="margin-top:10px;margin-bottom:10px">
		    <strong><span style="font-family: Helvetica;font-size: 18px">广告服务</span></strong>
		</h4>
		<p>
		    <span style=";font-family:宋体;font-size:16px"><span style="font-family:宋体">我们可能使用您的相关信息，向您提供与您更加相关的广告。</span>&nbsp;</span><span style=";font-family:宋体;font-size:16px"><br/></span><span style=";font-family:宋体;font-size:16px"><span style="font-family:宋体">我们也可能使用您的信息，通过我们的服务、电子邮件或其他方式向您发送营销信息，提供或推广我们或第三方的如下商品和服务：</span>&nbsp;</span>
		</p>
		<p style="margin-top:7px;margin-bottom:7px;margin-left:25px;margin-top:auto;margin-bottom:auto">
		    <span style="font-family:Calibri;font-size:16px">1.&nbsp;</span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">我们的服务，我们的关联公司和合作伙伴的商品或服务，包括即时通讯服务、网上媒体服务、互动娱乐服务、社交网络服务、付款服务、互联网搜索服务、位置和地图服务、应用软件和服务、数据管理软件和服务、网上广告服务、互联网金融，以及其他社交媒体、娱乐、电子商务、资讯和通讯软件或服务（统称</span>“<span style="font-family:宋体">互联网服务</span><span style="font-family:Calibri">”</span><span style="font-family:宋体">）；</span></span>
		</p>
		<p style="margin-top:7px;margin-bottom:7px;margin-left:25px;margin-top:auto;margin-bottom:auto">
		    <span style="font-family:Calibri;font-size:16px">2.&nbsp;</span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">第三方互联网服务供应商，以及与下列有关的第三方商品或服务：食物和餐饮、体育、音乐、电影、电视、现场表演及其他艺术和娱乐、书册、杂志和其他刊物、服装和配饰、珠宝、化妆品、个人健康和卫生、电子、收藏品、家用器皿、电器、家居装饰和摆设、宠物、汽车、酒店、交通和旅游、银行、保险及其他金融服务、会员积分和奖励计划，以及我们认为可能与您相关的其他商品或服务。</span></span>
		</p>
		<p>
		    <span style=";font-family:宋体;font-size:16px"><span style="font-family:宋体">如您不希望我们将您的个人信息用作前述广告用途，您可以通过我们在广告中提供的相关提示，或在特定服务中提供的指引，要求我们停止为上述用途使用您的个人信息。</span></span>
		</p>
		<h4 style="margin-top:10px;margin-bottom:10px">
		    <strong><span style="font-family: Helvetica;font-size: 18px">我们可能向您发送的邮件和信息</span></strong>
		</h4>
		<p>
		    <span style=";font-family:宋体;font-size:16px"><span style="font-family:宋体">邮件和信息推送</span></span>
		</p>
		<p style="margin-top:7px;margin-bottom:7px;margin-left:25px;margin-top:auto;margin-bottom:auto;padding:0 0 0 0 ">
		    <span style="font-family:Symbol;font-size:13px">·&nbsp;</span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">您在使用我们的服务时，我们可能使用您的信息向您的设备发送电子邮件、新闻或推送通知。如您不希望收到这些信息，可以按照我们的相关提示，在设备上选择取消订阅。</span></span>
		</p>
		<p>
		    <span style=";font-family:宋体;font-size:16px"><span style="font-family:宋体">与服务有关的公告</span></span>
		</p>
		<p style="margin-top:7px;margin-bottom:7px;margin-left:25px;margin-top:auto;margin-bottom:auto;padding:0 0 0 0 ">
		    <span style="font-family:Symbol;font-size:13px">·&nbsp;</span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">我们可能在必要时（例如因系统维护而暂停某一项服务时）向您发出与服务有关的公告。您可能无法取消这些与服务有关、性质不属于推广的公告。</span></span>
		</p>
		<h4 style="margin-top:10px;margin-bottom:10px">
		    <strong><span style="font-family: Helvetica;font-size: 18px">隐私政策的适用例外</span></strong>
		</h4>
		<p>
		    <span style=";font-family:宋体;font-size:16px"><span style="font-family:宋体">我们的服务可能包括或链接至第三方提供的社交媒体或其他服务（包括网站）。例如：</span>&nbsp;</span>
		</p>
		<p style="margin-top:7px;margin-bottom:7px;margin-left:25px;margin-top:auto;margin-bottom:auto;padding:0 0 0 0 ">
		    <span style="font-family:Symbol;font-size:13px">·&nbsp;</span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">您利用</span> “<span style="font-family:宋体">分享</span><span style="font-family:Calibri">”</span><span style="font-family:宋体">键将某些内容分享到我们的服务，或您利用第三方连线服务登录我们的服务。这些功能可能会收集您的相关信息（包括您的日志信息），并可能在您的电脑装置</span><span style="font-family:Calibri">cookies</span><span style="font-family:宋体">，从而正常运行上述功能；</span></span>
		</p>
		<p style="margin-top:7px;margin-bottom:7px;margin-left:25px;margin-top:auto;margin-bottom:auto;padding:0 0 0 0 ">
		    <span style="font-family:Symbol;font-size:13px">·&nbsp;</span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">我们通过广告或我们服务的其他方式向您提供链接，使您可以接入第三方的服务或网站。</span></span>
		</p>
		<p style="margin-top:7px;margin-bottom:7px;margin-left:25px;margin-top:auto;margin-bottom:auto;padding:0 0 0 0 ">
		    <span style="font-family:Symbol;font-size:13px">·&nbsp;</span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">该等第三方社交媒体或其他服务可能由相关的第三方或我们运营。您使用该等第三方的社交媒体服务或其他服务（包括您向该等第三方提供的任何个人信息），须受该第三方的服务条款及隐私政策（而非《通用服务条款》或本《隐私政策》）约束，您需要仔细阅读其条款。本《隐私政策》仅适用于我们所收集的信息，并不适用于任何第三方提供的服务或第三方的信息使用规则，我们对任何第三方使用由您提供的信息不承担任何责任。</span></span>
		</p>
		<h4 style="margin-top:10px;margin-bottom:10px">
		    <strong><span style="font-family: Helvetica;font-size: 18px">未成年人使用我们的服务</span></strong>
		</h4>
		<p>
		    <span style=";font-family:宋体;font-size:16px"><span style="font-family:宋体">我们鼓励父母或监护人指导未满十八岁的未成年人使用我们的服务。我们建议未成年人鼓励他们的父母或监护人阅读本《隐私政策》，并建议未成年人在提交的个人信息之前寻求父母或监护人的同意和指导。</span></span>
		</p>
		<h4 style="margin-top:10px;margin-bottom:10px">
		    <strong><span style="font-family: Helvetica;font-size: 18px">隐私政策的适用范围</span></strong>
		</h4>
		<p style="margin-top:7px;margin-bottom:7px;margin-left:25px;margin-top:auto;margin-bottom:auto">
		    <span style="font-family:Calibri;font-size:16px">1.&nbsp;</span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">除某些特定服务外，我们所有的服务均适用本《隐私政策》。这些特定服务将适用特定的隐私政策。针对某些特定服务的特定隐私政策，将更具体地说明我们在该等服务中如何使用您的信息。该特定服务的隐私政策构成本《隐私政策》的一部分。如相关特定服务的隐私政策与本《隐私政策》有不一致之处，适用该特定服务的隐私政策。</span></span>
		</p>
		<p style="margin-top:7px;margin-bottom:7px;margin-left:25px;margin-top:auto;margin-bottom:auto">
		    <span style="font-family:Calibri;font-size:16px">2.&nbsp;</span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">请您注意，本《隐私政策》不适用于以下情况：</span></span>
		</p>
		<p style="margin-top:7px;margin-bottom:7px;margin-left:25px;margin-top:auto;margin-bottom:auto">
		    <span style="font-family:Calibri;font-size:16px">3.&nbsp;</span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">通过我们的服务而接入的第三方服务（包括任何第三方网站）收集的信息；</span></span>
		</p>
		<p style="margin-top:7px;margin-bottom:7px;margin-left:25px;margin-top:auto;margin-bottom:auto">
		    <span style="font-family:Calibri;font-size:16px">4.&nbsp;</span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">通过在我们服务中进行广告服务的其他公司或机构所收集的信息。</span></span>
		</p>
		<h4 style="margin-top:10px;margin-bottom:10px">
		    <strong><span style="font-family: Helvetica;font-size: 18px">变更</span></strong>
		</h4>
		<p style="margin-top:7px;margin-bottom:7px;margin-left:25px;margin-top:auto;margin-bottom:auto;padding:0 0 0 0 ">
		    <span style="font-family:Symbol;font-size:13px">·&nbsp;</span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">我们可能适时修订本《隐私政策》的条款，该等修订构成本《隐私政策》的一部分。如该等修订造成您在本《隐私政策》下权利的实质减少，我们将在修订生效前通过在主页上显著位置提示或向您发送电子邮件或以其他方式通知您。在该种情况下，若您继续使用我们的服务，即表示同意受经修订的本《隐私政策》的约束。</span></span>
		</p>
		<p>
		    <span style=";font-family:宋体;font-size:16px"><span style="font-family:宋体">【完】</span></span>
		</p>
		<p>
		    <span style=";font-family:Calibri;font-size:14px">&nbsp;</span>
		</p>
		<p>
		    <span style=";font-family:Calibri;font-size:14px">&nbsp;</span>
		</p>
		<p>
		    <br/>
		</p>
	</view>
	<view style="line-height: 48rpx;padding: 20rpx;">
		<!-- <view>隐私政策</view> -->
		
		 
		
		<view>本应用尊重并保护所有使用服务用户的个人隐私权。为了给您提供更准确、更有个性化的服务，本应用会按照本隐私权政策的规定使用和披露您的个人信息。但本应用将以高度的勤勉、审慎义务对待这些信息。除本隐私权政策另有规定外，在未征得您事先许可的情况下，本应用不会将这些信息对外披露或向第三方提供。本应用会不时更新本隐私权政策。 您在同意本应用服务使用协议之时，即视为您已经同意本隐私权政策全部内容。本隐私权政策属于本应用服务使用协议不可分割的一部分。</view>
		
		 
		
		<view>1. 适用范围</view>
		
		<view>a) 在您注册本应用帐号时，您根据本应用要求提供的个人注册信息；</view>
		
		<view>b) 在您使用本应用网络服务，或访问本应用平台网页时，本应用自动接收并记录的您的浏览器和计算机上的信息，包括但不限于您的IP地址、浏览器的类型、使用的语言、访问日期和时间、软硬件特征信息及您需求的网页记录等数据；</view>
		
		<view>c) 本应用通过合法途径从商业伙伴处取得的用户个人数据。</view>
		
		<view>您了解并同意，以下信息不适用本隐私权政策：</view>
		
		<view>a) 您在使用本应用平台提供的搜索服务时输入的关键字信息；</view>
		
		<view>b) 本应用收集到的您在本应用发布的有关信息数据，包括但不限于参与活动、成交信息及评价详情；</view>
		
		<view>c) 违反法律规定或违反本应用规则行为及本应用已对您采取的措施。</view>
		
		 
		
		<view>2. 信息使用</view>
		
		<view>a) 本应用不会向任何无关第三方提供、出售、出租、分享或交易您的个人信息，除非事先得到您的许可，或该第三方和本应用（含本应用关联公司）单独或共同为您提供服务，且在该服务结束后，其将被禁止访问包括其以前能够访问的所有这些资料。</view>
		
		<view>b) 本应用亦不允许任何第三方以任何手段收集、编辑、出售或者无偿传播您的个人信息。任何本应用平台用户如从事上述活动，一经发现，本应用有权立即终止与该用户的服务协议。</view>
		
		<view>c) 为服务用户的目的，本应用可能通过使用您的个人信息，向您提供您感兴趣的信息，包括但不限于向您发出产品和服务信息，或者与本应用合作伙伴共享信息以便他们向您发送有关其产品和服务的信息（后者需要您的事先同意）。</view>
		
		 
		
		<view>3. 信息披露</view>
		
		<view>在如下情况下，本应用将依据您的个人意愿或法律的规定全部或部分的披露您的个人信息：</view>
		
		<view>a) 经您事先同意，向第三方披露；</view>
		
		<view>b) 为提供您所要求的产品和服务，而必须和第三方分享您的个人信息；</view>
		
		<view>c) 根据法律的有关规定，或者行政或司法机构的要求，向第三方或者行政、司法机构披露；</view>
		
		<view>d) 如您出现违反中国有关法律、法规或者本应用服务协议或相关规则的情况，需要向第三方披露；</view>
		
		<view>e) 如您是适格的知识产权投诉人并已提起投诉，应被投诉人要求，向被投诉人披露，以便双方处理可能的权利纠纷；</view>
		
		<view>f) 在本应用平台上创建的某一交易中，如交易任何一方履行或部分履行了交易义务并提出信息披露请求的，本应用有权决定向该用户提供其交易对方的联络方式等必要信息，以促成交易的完成或纠纷的解决。</view>
		
		<view>g) 其它本应用根据法律、法规或者网站政策认为合适的披露。</view>
		
		 
		
		<view>4. 信息存储和交换</view>
		
		<view>本应用收集的有关您的信息和资料将保存在本应用及（或）其关联公司的服务器上，这些信息和资料可能传送至您所在国家、地区或本应用收集信息和资料所在地的境外并在境外被访问、存储和展示。</view>
		
		 
		
		<view>5. Cookie的使用</view>
		
		<view>a) 在您未拒绝接受cookies的情况下，本应用会在您的计算机上设定或取用cookies ，以便您能登录或使用依赖于cookies的本应用平台服务或功能。本应用使用cookies可为您提供更加周到的个性化服务，包括推广服务。</view>
		
		<view>b) 您有权选择接受或拒绝接受cookies。您可以通过修改浏览器设置的方式拒绝接受cookies。但如果您选择拒绝接受cookies，则您可能无法登录或使用依赖于cookies的本应用网络服务或功能。</view>
		
		<view>c) 通过本应用所设cookies所取得的有关信息，将适用本政策。</view>
		
		 
		
		<view>6. 信息安全</view>
		
		<view>a) 本应用帐号均有安全保护功能，请妥善保管您的用户名及密码信息。本应用将通过对用户密码进行加密等安全措施确保您的信息不丢失，不被滥用和变造。尽管有前述安全措施，但同时也请您注意在信息网络上不存在“完善的安全措施”。</view>
		
		<view>b) 在使用本应用网络服务进行网上交易时，您不可避免的要向交易对方或潜在的交易对方披露自己的个人信息，如联络方式或者邮政地址。请您妥善保护自己的个人信息，仅在必要的情形下向他人提供。如您发现自己的个人信息泄密，尤其是本应用用户名及密码发生泄露，请您立即联络本应用客服，以便本应用采取相应措施。</view>
	</view>
	</view>
</template>

<script>
	import { getMerchantLst,collectDel } from '@/api/store.js'
	export default{
		data(){
			return {
				storeList:[],
				isScroll:true,
				page:1,
				limit:20
			}
		},
		onLoad() {
			this.getList()
		},
		methods:{
			// 后退
			returns: function() {
				uni.redirectTo({
					url:'/pages/users/user_info/index'
				})
				
			},
			goStore(item){
				uni.navigateTo({
					url:`/pages/store/home/index?id=${item.merchant.mer_id}`
				})
			},
			getList(){
				if(!this.isScroll) return
				getMerchantLst({
					page:this.page,
					limit:this.limit
				}).then(res=>{
					this.isScroll = res.data.list.length>=this.limit
					this.storeList = this.storeList.concat(res.data.list)
					this.page+=1
				})
			},
			// 删除收藏
			bindDetele(item,index){
				collectDel({
					type:10,
					type_id:item.type_id
				}).then(res=>{
					uni.showToast({
						title:'已取消',
						icon:'none'
					})
					this.storeList.splice(index,1)
				})
			}
		},
		onReachBottom() {
			this.getList()
		}
	}
</script>

<style lang="scss">
	.fh{
		height: 70rpx;
		line-height: 70rpx;
		border-bottom: 5rpx solid #eee;
	}
.user_store_attention{
	padding: 10px;
	p{
		margin-left: 0!important;
		text-indent: 0;
		line-height: 27px;
		
	}
	.item{
		position: relative;
		display: flex;
		padding: 30rpx 20rpx;
		background-color: #fff;
		&::after{
			content: ' ';
			position: absolute;
			bottom: 0;
			left: 30rpx;
			right: 0;
			height: 1px;
			background: #f0f0f0;
		}
		image{
			width: 88rpx;
			height: 88rpx;
			border-radius: 50%;
		}
		.info{
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			margin-left: 20rpx;
			position: relative;
			.name{
				width: 410rpx;
				font-weight: bold;
			}
			.des{
				color: #666666;
				font-size: 22rpx;
			}
			.btn{
				display: flex;
				align-items: center;
				justify-content: center;
				position: absolute;
				right: 0;
				top: 50%;
				width:150rpx;
				height:50rpx;
				transform: translateY(-50%);
				border:1px solid #BBBBBB;
				border-radius:25rpx;
				font-size: 26rpx;
			}
		}
	}
}

</style>
