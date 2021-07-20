// #ifdef H5
import Jsbridge from "@/plugin/jsbridge/jsbridge-mini.js";

class Adjsbridge {

	constructor() {
		this.instance = Jsbridge;
		Jsbridge.yilan.init({
		  //必须，字符串类型，accessKey
		  accessKey   : "ylg4t55zzt9g",
		  //必须，字符串类型，accessToken
		  accessToken : "vvj9nt0jx0bszxtn29n8vftdjpz0dff7",
		  //渠道号，仅用于 iOS
		  sid: "",
		  //用户ID，仅用于 iOS
		  uid: "user_abc",
		  //可选，UI配置
		  uiPreference: {
		    //是否显示小视频点赞
		    littleLikeShow: true,
		    //是否显示小视频分享
		    littleShareShow: true,
		    //小视频评论展现形式: 0 DISMISS_COMMENT, 1 SHOW_COMMENT_LIST, 2 SHOW_COMMENT_ALL
		    littleComment: 2,
		    //是否显示短视频点赞
		    shortLikeShow: true,
		    //是否显示短视频分享
		    shortShareShow: true,
		    //短视频评论展现形式: 0 DISMISS_COMMENT, 1 SHOW_COMMENT_LIST, 2 SHOW_COMMENT_ALL
		    shortComment: 2,
		    //是否显示关注按钮
		    followAvailable: true,
		    //是否在频道页面展示关注
		    followChannelAvailable: true,
		    //短视频头像是否可以点击
		    feedAvatarClickable: true
		  }
		}, function(succ, data) {
		  console.log(succ + "\n" + JSON.stringify(data));   
		});

	}
	
}

export default new Adjsbridge();
// #endif
