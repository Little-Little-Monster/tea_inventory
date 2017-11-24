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
 * 获取商品类别
 */

export const getgoodstype = (userId) => fetch('/api/invoicing/goods/brand/query/list', { userId });

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