import App from '../App'

const msite = r => require.ensure([], () => r(require('../page/msite/msite')), 'msite')
const login = r => require.ensure([], () => r(require('../page/login/login')), 'login')
const forget = r => require.ensure([], () => r(require('../page/forget/forget')), 'forget')
const wirehouse = r => require.ensure([], () => r(require('../page/wireHouse/wirehouse')), 'wirehouse')
const sensus = r => require.ensure([], () => r(require('../page/sensus/sensus')), 'sensus')
const sale = r => require.ensure([], () => r(require('../page/sale/sale')), 'sale')
const basic = r => require.ensure([], () => r(require('../page/basic/basic')), 'basic')



export default [{
    path: '/',
    component: App, //顶层路由，对应index.html
    children: [ //二级路由。对应App.vue
        //地址为空时跳转login页面
        {
            path: '',
            redirect: '/login'
        },
        //项目首页
        {
            path: '/msite',
            component: msite,
            meta: { keepAlive: true },
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
        //库存查看（主菜单）
        {
            path: '/wirehouse',
            component: wirehouse
        },
        //统计查看（主菜单）
        {
            path: '/sensus',
            component: sensus
        },
        //销售查看（主菜单）
        {
            path: '/sale',
            component: sale
        },
        //基础查看（主菜单）
        {
            path: '/basic',
            component: basic
        },
    ]
}]