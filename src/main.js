import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router/router'
import store from './store/'
import { routerMode } from './config/env'
import './config/rem'
import FastClick from 'fastclick'
import VueTouch from "vue-touch"
Vue.use(VueTouch, { name: 'v-touch' })




//引入字体
import "./iconfont/iconfont.css";

if (process.env.NODE_ENV == 'development') {
  const VConsole = require('vconsole');
  let option = {
    maxLogNumber: 5000 // 超出上限的日志会被自动清除。
  };
  let vConsole = new VConsole(option);
  //显示 vConsole 主面板
  vConsole.show();
}

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    FastClick.attach(document.body);
  }, false);
}
Vue.prototype.formatDate = (date) => {
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate();
    if (month < 10) {
      month = '0' + String(month + 1);
    }
    if (day < 10) {
      day = '0' + String(day);
    }
    return year + '-' + month + '-' + day;
  }
  //引入地址插件
import addressPicker from "vue-address-picker";
Vue.use(addressPicker);

Vue.use(VueRouter)
const router = new VueRouter({
    routes,
    mode: routerMode,
    strict: process.env.NODE_ENV !== 'production',
    scrollBehavior: function(to, from, savedPosition) {
      return savedPosition || { x: 0, y: 0 }
    },
    // scrollBehavior(to, from, savedPosition) {
    //   if (savedPosition) {
    //     return savedPosition
    //   } else {
    //     if (from.meta.keepAlive) {
    //       from.meta.savedPosition = document.body.scrollTop;
    //     }
    //     return { x: 0, y: to.meta.savedPosition || 0 }
    //   }
    // }
  })
  //未登录只能路由到登录页
router.beforeEach((to, from, next) => {
  if (!sessionStorage.getItem('token') &&
    to.path !== "/login"
  ) {
    next({
      path: '/login'
    });
  } else {
    next()
  }
});
new Vue({
  router,
  store,
}).$mount('#app')
