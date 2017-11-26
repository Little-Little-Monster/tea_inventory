import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex)

const state = {
    userInfo: null, //用户信息
    headTitle: "茶叶进销存管理系统",
    storeGoodsInfo: {}
}

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
})