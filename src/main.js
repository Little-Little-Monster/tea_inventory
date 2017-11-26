import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router/router'
import store from './store/'
import { routerMode } from './config/env'
import './config/rem'
import FastClick from 'fastclick'
import VueTouch from "vue-touch"
Vue.use(VueTouch);
//引入字体
import "./iconfont/iconfont.css";

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}

Vue.use(VueRouter)
const router = new VueRouter({
        routes,
        mode: routerMode,
        strict: process.env.NODE_ENV !== 'production',
        scrollBehavior(to, from, savedPosition) {
            if (savedPosition) {
                return savedPosition
            } else {
                if (from.meta.keepAlive) {
                    from.meta.savedPosition = document.body.scrollTop;
                }
                return { x: 0, y: to.meta.savedPosition || 0 }
            }
        }
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