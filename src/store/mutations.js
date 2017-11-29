import {
    CHANGE_HEADER,
    RECORD_USERINFO,
    RECORD_GOODSINFO,
    RECORD_BUYORDER
} from './mutation-types.js'

import { setStore, getStore } from '../config/mUtils'

import { localapi, proapi } from 'src/config/env'

export default {
    [CHANGE_HEADER](state, headTitle) {
        state.headTitle = headTitle;
    },
    [RECORD_USERINFO](state, userInfo) {
        setStore('userInfo', userInfo.user);
        setStore('token', userInfo.user.token);
        setStore('menu', userInfo.menus);
    },
    [RECORD_GOODSINFO](state, goodsInfo) {
        state.storeGoodsInfo = goodsInfo;
    },
    [RECORD_BUYORDER](state, buyorder) {
        state.buyOrder = buyorder;
    }
}