import App from '../App'

const login = r => require.ensure([], () => r(require('../page/login/login')), 'login')
const forget = r => require.ensure([], () => r(require('../page/forget/forget')), 'forget')

const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')
const msite = r => require.ensure([], () => r(require('../page/home/children/msite')), 'msite')
const wirehouse = r => require.ensure([], () => r(require('../page/home/children/wirehouse')), 'wirehouse')
const sensus = r => require.ensure([], () => r(require('../page/home/children/sensus')), 'sensus')
const sale = r => require.ensure([], () => r(require('../page/home/children/sale')), 'sale')
const basic = r => require.ensure([], () => r(require('../page/home/children/basic')), 'basic')


const store = r => require.ensure([], () => r(require('../page/storeManage/store')), 'store')
const storeOption = r => require.ensure([], () => r(require('../page/storeManage/storeOption')), 'storeOption')




export default [{
    path: '/',
    component: App, //顶层路由，对应index.html
    children: [ //二级路由。对应App.vue
        //地址为空时跳转login页面
        {
            path: '',
            redirect: '/login'
        },
        //登录注册页
        {
            path: '/login',
            component: login
        },
        //修改密码页
        {
            path: '/forget',
            component: forget
        },
        //主界面
        {
            path: '/home',
            component: home,
            children: [
                //首页（主菜单）
                {
                    name: 'msite',
                    path: 'msite',
                    component: msite
                },
                //库存查看（主菜单）
                {
                    name: 'wirehouse',
                    path: 'wirehouse',
                    component: wirehouse
                },
                //统计查看（主菜单）
                {
                    name: 'sensus',
                    path: 'sensus',
                    component: sensus
                },
                //销售查看（主菜单）
                {
                    name: 'sale',
                    path: 'sale',
                    component: sale
                },
                //基础查看（主菜单）
                {
                    name: 'basic',
                    path: 'basic',
                    component: basic
                }
            ]
        },
        {
            path: '/store',
            name: 'store',
            component: store
        },
        {
            path: '/storeOption',
            name: 'storeOption',
            component: storeOption
        }
    ]
}]