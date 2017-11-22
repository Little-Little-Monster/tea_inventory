import {
    CHANGE_HEADER,
} from './mutation-types.js'

import { setStore, getStore } from '../config/mUtils'

import { localapi, proapi } from 'src/config/env'

export default {
    [CHANGE_HEADER](state, headTitle) {
        state.headTitle = headTitle;
    }


}