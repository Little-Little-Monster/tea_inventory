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
 * 获取门店列表
 */

export const getStoreDetail = (userId) => fetch('/api/invoicing/store/query/list');


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