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

const worker = r => require.ensure([], () => r(require('../page/workerManage/worker')), 'worker')
const workerOption = r => require.ensure([], () => r(require('../page/workerManage/workerOption')), 'workerOption')

const saleReport = r => require.ensure([], () => r(require('../page/reportManage/saleReport')), 'saleReport')
const buyReport = r => require.ensure([], () => r(require('../page/reportManage/buyReport')), 'buyReport')

const addGoods = r => require.ensure([], () => r(require('../page/goods/addGoods')), 'addGoods')
const goodsList = r => require.ensure([], () => r(require('../page/goods/goodsList')), 'goodsList')
const goodsAttrList = r => require.ensure([], () => r(require('../page/goods/goodsAttrList')), 'goodsAttrList')
const goodsAddAttr = r => require.ensure([], () => r(require('../page/goods/addAttr')), 'goodsAddAttr')


const supplierList = r => require.ensure([], () => r(require('../page/supplierManage/supplier-list')), 'supplierList')
const addEditUpplier = r => require.ensure([], () => r(require('../page/supplierManage/add-edit-upplier')), 'addEditUpplier')
const supplierDetail = r => require.ensure([], () => r(require('../page/supplierManage/supplier-detail')), 'supplierDetail')


const storehouseList = r => require.ensure([], () => r(require('../page/storehouseManage/storehouse-list')), 'storehouseList')
const addEditStorehouse = r => require.ensure([], () => r(require('../page/storehouseManage/add-edit-storehouse')), 'addEditStorehouse')

const addPurchase = r => require.ensure([], () => r(require('../page/purchase/add-purchase')), 'addPurchase')
const purchasedetail = r => require.ensure([], () => r(require('../page/purchase/purchase-detail')), 'purchasedetail')
const purchasehistory = r => require.ensure([], () => r(require('../page/purchase/purchase-history')), 'purchasehistory')
const choosegoods = r => require.ensure([], () => r(require('../page/purchase/choose-goods')), 'choosegoods')

const addSalePurchase = r => require.ensure([], () => r(require('../page/salePurchase/add-purchase')), 'addSalePurchase')
const salePurchasedetail = r => require.ensure([], () => r(require('../page/salePurchase/purchase-detail')), 'purchasedetail')
const salePurchasehistory = r => require.ensure([], () => r(require('../page/salePurchase/purchase-history')), 'purchasehistory')
const saleChoosegoods = r => require.ensure([], () => r(require('../page/salePurchase/choose-goods')), 'saleChoosegoods')

const accountManage = r => require.ensure([], () => r(require('../page/accountManage/accountManage')), 'accountManage')
const balanceAccount = r => require.ensure([], () => r(require('../page/accountManage/balanceAccount')), 'balanceAccount')
const accountType = r => require.ensure([], () => r(require('../page/accountManage/accountType')), 'accountType')
const addBalanceAccount = r => require.ensure([], () => r(require('../page/accountManage/addBalanceAccount')), 'addBalanceAccount')

const customerManage = r => require.ensure([], () => r(require('../page/customer/customer-list')), 'customer')
const addCustomer = r => require.ensure([], () => r(require('../page/customer/add-customer')), 'addCustomer')
const customerType = r => require.ensure([], () => r(require('../page/customer/customer-type')), 'customerType')
const addCustomerType = r => require.ensure([], () => r(require('../page/customer/add-customer-type')), 'addCustomerType')

const inventoryQuery = r => require.ensure([], () => r(require('../page/inventory/inventoryQuery')), 'inventoryQuery')
const inventoryFlow = r => require.ensure([], () => r(require('../page/inventory/inventoryFlow')), 'inventoryFlow')

const roleManage = r => require.ensure([], () => r(require('../page/roleManage/roleManage')), 'roleManage')
const roleOption = r => require.ensure([], () => r(require('../page/roleManage/roleOption')), 'roleOption')

const warehouseStock = r => require.ensure([], () => r(require('../page/stock/warehouseStock')), 'warehouseStock')
const stockOption = r => require.ensure([], () => r(require('../page/stock/stockOption')), 'stockOption')
const stockGoods = r => require.ensure([], () => r(require('../page/stock/choose-goods')), 'stockGoods')

export default [{
    path: '/',
    component: App, //顶层路由，对应index.html
    children: [
        //二级路由。对应App.vue
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
            path: '/worker',
            name: 'worker',
            component: worker
        },
        {
            path: '/workerOption',
            name: 'workerOption',
            component: workerOption
        },
        {
            path: '/storeOption',
            name: 'storeOption',
            component: storeOption
        },
        {
            path: '/addGoods',
            name: 'addGoods',
            component: addGoods
        },
        {
            path: '/goods',
            name: 'goodsManage',
            component: goodsList
        },
        {
            path: '/goods/attr',
            name: 'goodsAttrList',
            component: goodsAttrList
        },
        {
            path: '/goods/addAttr',
            name: 'goodsAddAttr',
            component: goodsAddAttr
        },
        {
            path: '/supplierList',
            name: 'supplierList',
            component: supplierList
        },
        {
            path: '/addEditUpplier',
            name: 'addEditUpplier',
            component: addEditUpplier
        },
        {
            path: '/supplierDetail',
            name: 'supplierDetail',
            component: supplierDetail
        },
        {
            path: '/storehouseList',
            name: 'storehouseList',
            component: storehouseList
        },
        {
            path: '/addEditStorehouse',
            name: 'addEditStorehouse',
            component: addEditStorehouse
        },
        {
            path: '/addPurchase',
            name: 'buyTrade',
            component: addPurchase
        },
        {
            path: '/backPurchase',
            name: 'buyBack',
            component: addPurchase
        },
        {
            path: '/purchasedetail',
            name: 'purchasedetail',
            component: purchasedetail
        },
        {
            path: '/purchasehistory',
            name: 'buyHistory',
            component: purchasehistory
        },
        {
            path: '/buyBackHistory',
            name: 'buyBackHistory',
            component: purchasehistory
        },
        {
            path: '/choosegoods',
            name: 'choosegoods',
            component: choosegoods
        },
        {
            path: '/addSalePurchase',
            name: 'saleTrade',
            component: addSalePurchase
        },
        {
            path: '/backSalePurchase',
            name: 'saleBack',
            component: addSalePurchase
        },
        {
            path: '/saleDetail',
            name: 'salePurchasedetail',
            component: salePurchasedetail
        },
        {
            path: '/salehistory',
            name: 'saleHistory',
            component: salePurchasehistory
        },
        {
            path: '/sale/back/history',
            name: 'saleBackHistory',
            component: salePurchasehistory
        },
        {
            path: '/saleChoosegoods',
            name: 'saleChoosegoods',
            component: saleChoosegoods
        },

        {
            path: '/accountManage',
            name: 'accountManage',
            component: accountManage
        },
        {
            path: '/accountType',
            name: 'accountType',
            component: accountType
        },
        {
            path: '/balanceAccount',
            name: 'balanceAccount',
            component: balanceAccount
        },
        {
            path: '/balance/add',
            name: 'addBalanceAccount',
            component: addBalanceAccount
        },

        {
            path: '/customer',
            name: 'customerManage',
            component: customerManage
        },
        {
            path: '/add/customer',
            name: 'addCustomer',
            component: addCustomer
        },
        {
            path: '/type/customer',
            name: 'customerType',
            component: customerType
        },
        {
            path: '/type/add/customer',
            name: 'addCustomerType',
            component: addCustomerType
        },
        //报表
        {
            path: '/sale/report',
            name: 'saleReport',
            component: saleReport
        },
        {
            path: '/buy/report',
            name: 'buyReport',
            component: buyReport
        },
        //库存
        {
            path: '/inventory/query',
            name: 'inventoryQuery',
            component: inventoryQuery
        },
        {
            path: '/inventory/flow',
            name: 'inventoryFlow',
            component: inventoryQuery
        },
        //角色管理
        {
            path: '/roleManage',
            name: 'roleManage',
            component: roleManage
        },
        {
            path: '/addRole',
            name: 'addRole',
            component: roleOption
        },
        {
            path: '/editRole',
            name: 'editRole',
            component: roleOption
        },
        //仓库盘点单
        {
            path: '/stock',
            name: 'warehouseStock',
            component: warehouseStock
        },
        {
            path: '/add/stock',
            name: 'addStock',
            component: stockOption
        },
        {
            path: '/edit/stock',
            name: 'editStock',
            component: stockOption
        },
        {
            path: '/stock/goods',
            name: 'stockGoods',
            component: stockGoods
        }
    ],
}];