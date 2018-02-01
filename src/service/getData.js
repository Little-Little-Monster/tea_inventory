import fetch from '../config/fetch'
import { getStore } from '../config/mUtils'

/**
 * 获取短信验证码
 */

export const mobile_code = phone => fetch('/v4/mobile/verify_code/send', {
  mobile: phone,
  scene: 'login',
  type: 'sms'
}, 'POST');


/**
 * 获取图片验证码
 */

export const get_captchas = () => fetch('/v1/captchas', {}, 'POST');

/**
 * 获取首页今日收益
 */

export const get_today_money = (userId) => fetch('/api/invoicing/settle/account/query/total', { userId });

/**
 * 设置菜单
 */

export const save_menu = (menu) => fetch('/api/invoicing/store/menu/show/handler', menu, "POST");

/**
 * 今日结余查询
 */

export const get_today_account = (userId) => fetch('/api/invoicing/settle/account/query/today', { userId });

/**
 * 今日结余账户对应明细
 */

export const get_today_account_detail = (info) => fetch('/api/invoicing/settle/account/query/detail', info);


/**
 * 手机号登录
 */

var send_login = (code, mobile, validate_token) => fetch('/v1/login/app_mobile', {
  code,
  mobile,
  validate_token
}, 'POST');

/**
 * 添加/更新门店列表
 */

export const store_handel = (store, userId) => fetch('/api/invoicing/store/' + userId + '/handler', store, 'post');

/**
 * 获取门店列表
 */

export const get_store_detail = (userId) => fetch('/api/invoicing/store/query/list', {
  userId
});

/**
 * 删除门店
 */

export const delete_store = (storeId, status) => fetch('/api/invoicing/store/update/status', {
  storeId,
  status
});

/**
 * 删除员工
 */

export const delete_worker = (id, status) => fetch('/api/invoicing/store/employee/infos/update', {
  id,
  status
});


/**
 * 获取员工列表
 */

export const get_worker_list = (userId) => fetch('/api/invoicing/' + userId + '/employee/query/list');

/**
 * 添加/保存员工
 */

export const worker_handel = (userId, worker) => fetch('/api/invoicing/' + userId + '/employee/handler', worker, 'POST');

/**
 * 获取员工详细信息
 */

export const get_employee = (userId, id) => fetch('/api/invoicing/' + userId + '/employee/query/edit', { id });



/**
 * 获取角色列表
 */

export const get_rolelist = (userId) => fetch('/api/invoicing/role/query/list', { userId });


/**
 * 获取供应商列表
 */

export const get_supplier = (userId, params) => fetch('/api/invoicing/supplier/query/list', {
  userId,
  params
});

/**
 * 添加/更新供应商
 */

export const supplier_handel = (userId, suppInfo) => fetch('/api/invoicing/supplier/' + userId + '/handler', suppInfo, 'POST');

/**
 * 获取仓库列表
 */

export const get_storehouse = (userId, params) => fetch('/api/invoicing/warehouse/query/list', { userId, params });
/**
 * 添加或更新仓库
 */

export const save_wirehouse = (wirehouse) => fetch('/api/invoicing/warehouse/handler', wirehouse, "POST");
/**
 * 删除仓库
 */

export const delete_warehouse = (id, status) => fetch('/api/invoicing/warehouse/update/status', {
  id,
  status
});

/**
 * 获取客户列表
 */

export const get_customer = (userId, params, page, pageSize) => fetch('/api/invoicing/customer/' + userId + '/list', {
  params,
  page,
  pageSize
});
/**
 * 获取客户分类列表
 */

export const get_customer_type = (userId) => fetch('/api/invoicing/customer/class/query/list', {
  userId
});
/**
 * 获取客户分类详情
 */

export const get_customer_type_detail = (id) => fetch('/api/invoicing/customer/class/query/edit', {
  id
});
/**
 * 添加客户分类
 */

export const save_customer_type = (userId, typeInfo) => fetch('/api/invoicing/customer/class/handler/' + userId, typeInfo, 'POST');

/**
 * 客户充值列表
 */

export const customer_charge = (id, amount, payType, accountId, operatorId) => fetch('/api/invoicing/customer/deposit/status', {
  id,
  amount,
  payType,
  accountId,
  operatorId
}, 'POST');

/**
 * 添加/更新客户
 */

export const customer_handel = (userId, customerInfo) => fetch('/api/invoicing/customer/' + userId + '/handler', customerInfo, 'POST');
/**
 * 删除客户
 */

export const delete_customer = (id, status) => fetch('/api/invoicing/customer/update/status', {
  id,
  status
});

/**
/**
 * 编辑客户时获取客户详细信息
 */

export const get_customer_detail = (id) => fetch('/api/invoicing/customer/query/edit', { id });

/**
 * 获取商品类别
 */

export const get_goods_type = (userId) => fetch('/api/invoicing/goods/classification/query/list', { userId });

/**
 * 获取商品列表
 */

export const get_goods_list = (userId, goodsClassId, priceFlag, page, pageSize) => fetch('/api/invoicing/goods/query/list', {
  userId,
  goodsClassId,
  priceFlag,
  page,
  pageSize
});

/**
 * 获取商品(名字模糊查询)
 */

export const get_goods_by_name = (userId, goodsName) => fetch('/api/invoicing/goods/query/like', {
  userId,
  goodsName
});

/**
 * 采购时根据仓库以及分类获取商品列表
 */

export const get_warehouse_goods_list = (params, userId, goodsClassId, warehouseId, page, pageSize) => fetch('/api/invoicing/goods/class/query/list', {
  params,
  userId,
  goodsClassId,
  warehouseId,
  page,
  pageSize
});

/**
 * 获取商品详情
 */

export const get_goods_info = (id) => fetch('/api/invoicing/goods/edit', {
  id
});

/**
 * 创建/更新商品
 */

export const save_goods = (userId, goodsInfo) => fetch('/api/invoicing/goods/handler/' + userId, goodsInfo, "POST");
/**
 * 创建/更新商品类别
 */

export const save_goods_type = (userId, info) => fetch('/api/invoicing/goods/classification/handler/' + userId, info, "POST");

/**
 * 创建/更新商品单位
 */

export const delete_goods_type = (id) => fetch('/api/invoicing/goods/classification/query/delete', { id });

/**
 * 创建/更新商品单位
 */

export const save_goods_unit = (userId, info) => fetch('/api/invoicing/goods/unit/handler/' + userId, info, "POST");

/**
 * 创建/更新商品品牌
 */

export const save_goods_brand = (userId, info) => fetch('/api/invoicing/goods/brand/handler/' + userId, info, "POST");

/**
 * 删除商品品牌
 */

export const delete_goods_brand = (id) => fetch('/api/invoicing/goods/brand/query/delete', { id });


/**
 * 获取商品单位
 */

export const get_goods_unit = (userId) => fetch('/api/invoicing/goods/unit/query/list', { userId });

/**
 * 删除商品单位
 */

export const delete_goods_unit = (id) => fetch('/api/invoicing/goods/unit/query/delete', { id });


/**
 * 获取商品品牌
 */

export const get_goods_brand = (userId) => fetch('/api/invoicing/goods/brand/query/list', { userId });

/**
 * 添加/更新采购单
 */

export const save_buy_order = (userId, buyOrder) => fetch('/api/invoicing/' + userId + '/buy/trade/handler', buyOrder, 'POST');

/**
 * 采购历史查询
 */

export const get_buy_history = (userId, page, pageSize, status, type) => fetch('/api/invoicing/' + userId + '/buy/trade/query/list', {
  page,
  pageSize,
  status,
  type
});

/**
 * 编辑采购单，获取采购单详细信息
 */
export const get_buy_order = (id) => fetch('/api/invoicing/buy/trade/query/edit', {
  id
});
/**
 * 删除采购单（草稿）
 */

export const delete_buy_order = (id) => fetch('/api/invoicing/buy/trade/query/delete', {
  id
});
/**
 * 撤销采购单（已采购）
 */

export const cancel_buy_order = (userId, id) => fetch('/api/invoicing/cancel/goods/buy/' + userId, {
  id
});



/**
 * 添加/更新销售单
 */

export const save_sale_order = (userId, saleOrder) => fetch('/api/invoicing/' + userId + '/sale/trade/handler', saleOrder, 'POST');

/**
 * 销售历史查询
 */
export const get_sale_history = (userId, page, pageSize, status, type) => fetch('/api/invoicing/' + userId + '/sale/trade/query/list', {
  page,
  pageSize,
  status,
  type
});

/**
 * 编辑销售单，获取销售单单详细信息
 */

export const get_sale_order = (id) => fetch('/api/invoicing/sale/trade/query/edit', {
  id
});
/**
 * 删除销售单（草稿）
 */

export const delete_sale_order = (id) => fetch('/api/invoicing/sale/trade/query/delete', {
  id
});
/**
 * 撤销销售单（已采购）
 */

export const cancel_sale_order = (userId, id, payType) => fetch('/api/invoicing/cancel/goods/sale/' + userId, {
  id,
  payType
});

/**
 * 结算账户查询
 */
export const get_balance_account_list = (userId) => fetch('/api/invoicing/settle/account/query/list', { userId });

/**
 * 编辑时查询结算账户详细信息
 */
export const get_balance_account_detail = (id) => fetch('/api/invoicing/settle/account/query/edit', { id });

/**
 * 添加/更新结算账户
 */
export const balance_account_handel = (account) => fetch('/api/invoicing/settle/account/handler', account, "POST");

/**
 * 删除结算账户
 */
export const balance_account_delete = (id) => fetch('/api/invoicing/settle/account/query/delete', { id });

/**
 * 获取今日销售量和金额接口
 */
export const get_sale_total_today = (userId) => fetch('/api/invoicing/sale/report/query/day', { userId });

/**
 * 获取今日采购量和金额接口
 */
export const get_buy_total_today = (userId) => fetch('/api/invoicing/buy/report/query/day', { userId });

/**
 * 库存查询
 */
export const get_inventory_query = (searchInfo) => fetch('/api/invoicing/stock/query/list', searchInfo);

/**
 * 库存流水
 */
export const get_inventory_flow = (searchInfo) => fetch('/api/invoicing/stock/detail/query/list', searchInfo);


/**
 * 获取角色列表
 */
export const get_role_list = (userId) => fetch('/api/invoicing/role/query/list', { userId });

/**
 * 获取角色资源列表
 */

export const get_role_resource = (userId, roleId) => fetch('/api/invoicing/query/resource/' + userId + '/' + roleId);
/**
 * 创建或者更新角色
 */

export const role_handel = (userId, roleInfo) => fetch('/api/invoicing/role/' + userId + '/handler', roleInfo, "POST");
/**
 * 删除角色
 */
export const delete_role = (id) => fetch('/api/invoicing/role/delete/' + id);

/**
 * 获取盘点单详情
 */
export const get_stock_info = (id) => fetch('/api/invoicing/inventory/edit', { id });

/**
 * 删除草稿盘点单
 */
export const delete_stock = (id) => fetch('/api/invoicing/inventory/delete', { id });

/**
 * 获取盘点列表
 */
export const get_stock_list = (userId, status, page, pageSize) => fetch('/api/invoicing/inventory/list', {
  userId,
  status,
  page,
  pageSize
});


/**
 * 添加更新盘点单
 */
export const stock_handel = (userId, stockInfo) => fetch('/api/invoicing/' + userId + '/inventory/handler', stockInfo, "POST");




/**
 * 销售报表查询
 */
export const get_sale_report = (userId, storeId, goodsId, startDate, endDate, page, pageSize) => fetch('/api/invoicing/sale/report/query', {
  userId,
  storeId,
  goodsId,
  startDate,
  endDate,
  page,
  pageSize
});

/**
 * 采购报表查询
 */
export const get_buy_report = (userId, storeId, goodsId, startDate, endDate, page, pageSize) => fetch('/api/invoicing/buy/report/query', {
  userId,
  storeId,
  goodsId,
  startDate,
  endDate,
  page,
  pageSize
});

/**
 * 账号密码登录
 */
export const account_login = (mobile, password) => fetch('/api/invoicing/user/login', { mobile, password }, 'POST');


/**
 * 退出登录
 */
export const signout = () => fetch('/v2/signout');


/**
 * 改密码
 */
export const change_password = (username, oldpassWord, newpassword, confirmpassword, captcha_code) => fetch('/v2/changepassword', { username, oldpassWord, newpassword, confirmpassword, captcha_code }, 'POST');
