import request from "@/utils/request.js";

/**
 * 获取产品详情
 * @param int id
 * 
*/
export function getProductDetail(id){
  return request.get('store/product/detail/' + id, {}, { noAuth : true });
}

/**
 * 获取夺宝详情
 * @param int id
 * 
*/
export function getLootDetail(id){
  return request.get('store/product/lootdetail/' + id, {}, { noAuth : true });
}


/**
 * 产品分享二维码 推广员
 * @param int id
*/
// #ifndef MP
export function getProductCode(id){
  return request.get('store/product/qrcode/' + id, {type:'wechat'});
}
// #endif
// #ifdef MP
export function getProductCode(id){
  return request.get('store/product/qrcode/' + id, {type:'routine'});
}
// #endif

/**
 * 添加收藏
 * @param int id
 * @param string category product=普通产品,product_seckill=秒杀产品
*/
export function collectAdd(data){
  return request.post('user/relation/create', data);
}

/**
 * 删除收藏产品
 * @param int id
 * @param string category product=普通产品,product_seckill=秒杀产品
*/
export function collectDel(data) {
  return request.post('user/relation/delete', data);
}

/**
 * 购车添加
 * 
*/
export function postCartAdd(data) {
  return request.post('user/cart/create', data);
}

/**
 * 获取分类列表
 * 
*/
export function getCategoryList(){
  return request.get('store/product/category/lst', {}, { noAuth:true});
}

/**
 * 获取产品列表
 * @param object data
*/
export function getProductslist(data){
  return request.get('store/product/lst',data,{noAuth:true});
}

/**
 * 获取夺宝列表
 * @param object data
*/
export function getLootlist(data){
  return request.get('store/product/lootlst',data,{noAuth:true});
}

/**
 * 获取品牌列表
 * @param object data
*/
export function getBrandlist(data){
  return request.get('store/product/brand/lst',data,{noAuth:true});
}


/**
 * 获取推荐产品
 * 
 */
export function getProductHot(page,limit) {
  return request.get("store/product/recommend/lst", { 
    page: page === undefined ? 1 : page, 
    limit:limit === undefined ? 10 :limit
  },{noAuth:true});
}
export function getScoreList(page,limit) {
  return request.get("store/product/score/lst", { 
    page: page === undefined ? 1 : page, 
    limit:limit === undefined ? 10 :limit
  },{noAuth:true});
}
export function getShopList(page,limit) {
  return request.get("store/product/shop/lst", { 
    page: page === undefined ? 1 : page, 
    limit:limit === undefined ? 10 :limit
  },{noAuth:true});
}
/**
 * 批量收藏
 * 
 * @param object id
 * @param string category 
*/
export function collectAll(data) {
  return request.post('user/relation/batch/create', data);
}

/**
 * 首页产品的轮播图和产品信息
 * @param int type 
 * 
*/
export function getGroomList(type,data){
  return request.get('store/product/hot/'+type,data,{noAuth:true});
}

/**
 * 获取商品收藏列表
 * @param object data
*/
export function getCollectUserList(data) {
  return request.get('user/relation/product/lst', data)
}


/**
 * 获取产品评论
 * @param int id
 * @param object data
 * 
*/
export function getReplyList(id,data){
  return request.get('store/product/reply/lst/'+id,data)
}

/**
 * 产品评价数量和好评度
 * @param int id
*/
export function getReplyConfig(id){
  return request.get('reply/config/'+id);
} 

/**
 * 获取搜索关键字获取
 * 
*/
export function getSearchKeyword(){
  return request.get('common/hot_keyword',{},{noAuth:true});
}

/**
 * 门店列表
 * @returns {*}
 */
export function storeListApi(data) {
  return request.get("store_list", data,{ noAuth : true });
}

/**
 * 商户列表
 * @returns {*}
 */
export function storeMerchantList(data) {
  return request.get("store/merchant/lst", data,{ noAuth : true });
}

/**
 * 获取商铺详情
 * @param {Object} id 商铺id
 * @param {Object} data 商铺数据
 */
export function getStoreDetail(id, data) {
	return request.get("store/merchant/detail/" + id, data, { noAuth : true });
}

/**
 * 获取商铺商品列表
 * @param {Object} id 商铺 id
 * @param {Object} data 商铺商品列表数据
 */
export function getStoreGoods(id, data) {
	return request.get("store/merchant/product/lst/" + id, data, { noAuth : true });
}

/**
 * 获取商铺分类列表
 * @param {Object} id 商铺 id
 * @param {Object} data
 */
export function getStoreCategory(id, data) {
	return request.get("store/merchant/category/lst/" + id, data, { noAuth : true });
}

/**
 * 关注商铺
 * @param {Object} type_id 商铺 id
 */
export function followStore(type_id) {
	return request.post("user/relation/create", {type: 10, type_id: type_id});
}

/**
 * 取消商铺关注
 * @param {Object} type_id 商铺 id
 */
export function unfollowStore(type_id) {
	return request.post("user/relation/delete", {type: 10, type_id: type_id});
}

/**
 * 获取商铺优惠券
 * @param {Object} id
 */
export function getStoreCoupon(id) {
	return request.get("coupon/store/" + id, { noAuth : true });
}

/**
 * 获取商铺优惠券
 */
export function getMerchantLst(data) {
	return request.get("user/relation/merchant/lst",data, { noAuth : true });
}

/**
 * 物流信息
 */
export function express(id) {
	return request.post("ordero/express/"+id, { noAuth : true });
}

/**
 * 子集分类
 * @returns {*}
 */
export function storeCategory(pid) {
  return request.get("store/product/category", pid);
}

/**
 * 分销说明
 * @returns {*}
 */
export function bagExplain() {
  return request.get("store/product/bag/explain");
}

/**
 * 分销礼包推荐列表
 * @returns {*}
 */
export function bagRecommend() {
  return request.get("store/product/bag/recommend");
}

/**
 * 分销礼包列表
 * @returns {*}
 */
export function productBag(data) {
  return request.get("store/product/bag",data);
}

/**
 * 商铺二维码
 * @returns {*}
 */
export function merchantQrcode(id) {
  return request.get("store/merchant/qrcode/"+id);
}

/**
 * 推荐商品
 * @returns {*}
 */
export function merchantProduct(id,data) {
  return request.get("store/merchant/product/lst/"+id,data);
}

/**
 * 推荐商品banner
 * @returns {*}
 */
export function getHotBanner(type) {
  return request.get("common/hot_banner/"+type);
}

/**
 * 商户入驻表单
 * @returns {*}
 */
export function create(data) {
  return request.post("intention/create", data);
}
/**
 * 商户入驻短信验证码
 * @returns {*}
 */
export function verify(data) {
  return request.post("auth/verify", data);
}


