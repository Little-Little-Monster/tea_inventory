import fetch from '../config/fetch'
import { getStore } from '../config/mUtils'

/**
 * 获取短信验证码
 */

export const mobileCode = phone => fetch('/v4/mobile/verify_code/send', {
    mobile: phone,
    scene: 'login',
    type: 'sms'
}, 'POST');


/**
 * 获取图片验证码
 */

export const getcaptchas = () => fetch('/v1/captchas', {}, 'POST');


/**
 * 手机号登录
 */

var sendLogin = (code, mobile, validate_token) => fetch('/v1/login/app_mobile', {
    code,
    mobile,
    validate_token
}, 'POST');

/**
 * 添加/更新门店列表
 */

export const storehandel = (store, userId) => fetch('/api/invoicing/store/' + userId + '/handler', store, 'post');

/**
 * 获取门店列表
 */

export const getStoreDetail = (userId) => fetch('/api/invoicing/store/query/list', {
    userId
});

/**
 * 获取员工列表
 */

export const getWorkerList = (userId) => fetch('/api/invoicing/' + userId + '/employee/query/list');

/**
 * 添加/保存员工
 */

export const workerhandel = (userId, worker) => fetch('/api/invoicing/' + userId + '/employee/handler', worker, 'POST');

/**
 * 获取员工详细信息
 */

export const getemployee = (userId, id) => fetch('/api/invoicing/' + userId + '/employee/query/edit', { id });



/**
 * 获取角色列表
 */

export const getrolelist = (userId) => fetch('/api/invoicing/role/query/list', { userId });

/**
 * 获取供应商列表
 */

export const getsupplier = (userId, params) => fetch('/api/invoicing/supplier/query/list', {
    userId,
    params
});

/**
 * 添加/更新供应商
 */

export const supphandel = (userId, suppInfo) => fetch('/api/invoicing/supplier/' + userId + '/handler', suppInfo, 'POST');

/**
 * 获取仓库列表
 */

export const getstorehouse = (userId) => fetch('/api/invoicing/warehouse/query/list', { userId });
/**
 * 添加或更新仓库
 */

export const savewirehouse = (wirehouse) => fetch('/api/invoicing/warehouse/handler', wirehouse, "POST");

/**
 * 获取商品类别
 */

export const getgoodstype = (userId) => fetch('/api/invoicing/goods/classification/query/list', { userId });

/**
 * 获取商品列表
 */

export const getgoodslist = (userId, goodsClassId, priceFlag, page, pageSize) => fetch('/api/invoicing/goods/query/list', {
    userId,
    goodsClassId,
    priceFlag,
    page,
    pageSize
});

/**
 * 采购时根据仓库以及分类获取商品列表
 */

export const getwarehousegoodslist = (userId, goodsClassId, warehouseId, page, pageSize) => fetch('/api/invoicing/goods/class/query/list', {
    userId,
    goodsClassId,
    warehouseId,
    page,
    pageSize
});

/**
 * 获取商品详情
 */

export const getgoodsinfo = (id) => fetch('/api/invoicing/goods/edit', {
    id
});

/**
 * 创建/更新商品
 */

export const savegoods = (userId, goodsInfo) => fetch('/api/invoicing/goods/handler/' + userId, goodsInfo, "POST");
/**
 * 创建/更新商品类别
 */

export const savegoodstype = (userId, info) => fetch('/api/invoicing/goods/classification/handler/' + userId, info, "POST");

/**
 * 创建/更新商品单位
 */

export const savegoodsunit = (userId, info) => fetch('/api/invoicing/goods/unit/handler/' + userId, info, "POST");

/**
 * 创建/更新商品品牌
 */

export const savegoodsbrand = (userId, info) => fetch('/api/invoicing/goods/brand/handler/' + userId, info, "POST");


/**
 * 获取商品单位
 */

export const getgoodsunit = (userId) => fetch('/api/invoicing/goods/unit/query/list', { userId });

/**
 * 获取商品品牌
 */

export const getgoodsbrand = (userId) => fetch('/api/invoicing/goods/brand/query/list', { userId });

/**
 * 添加/更新采购单
 */

export const savebuyorder = (userId, buyOrder) => fetch('/api/invoicing/' + userId + '/buy/trade/handler', buyOrder, 'POST');

/**
 * 采购历史查询
 */

export const getbuyhistory = (userId, page, pageSize, status, type) => fetch('/api/invoicing/' + userId + '/buy/trade/query/list', {
    page,
    pageSize,
    status,
    type
});

/**
 * 编辑采购单，获取采购单详细信息
 */

export const getbuyorder = (id) => fetch('/api/invoicing/buy/trade/query/edit', {
    id
});
/**
 * 删除采购单（草稿）
 */

export const deletebuyorder = (id) => fetch('/api/invoicing/buy/trade/query/delete', {
    id
});
/**
 * 撤销采购单（已采购）
 */

export const cancelbuyorder = (userId, id) => fetch('/api/invoicing/cancel/goods/buy/' + userId, {
    id
});



/**
 * 账号密码登录
 */
export const accountLogin = (account, password) => fetch('/api/invoicing/user/login', { account, password }, 'POST');


/**
 * 退出登录
 */
export const signout = () => fetch('/v2/signout');


/**
 * 改密码
 */
export const changePassword = (username, oldpassWord, newpassword, confirmpassword, captcha_code) => fetch('/v2/changepassword', { username, oldpassWord, newpassword, confirmpassword, captcha_code }, 'POST');