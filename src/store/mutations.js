import {
    CHANGE_HEADER,
    RECORD_USERINFO
} from './mutation-types.js'

import { setStore, getStore } from '../config/mUtils'

import { localapi, proapi } from 'src/config/env'

export default {
    [CHANGE_HEADER](state, headTitle) {
        state.headTitle = headTitle;
    },
    [RECORD_USERINFO](state, userInfo) {
        setStore('userInfo', userInfo);
        setStore('token', userInfo.token);
        setStore('menu', userInfo.menus);
    }


}