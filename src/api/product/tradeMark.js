// 这个模块主要获取品牌管理的数据模块
import request from '@/utils/request';
// 获取品牌列表的接口
// /admin/product/baseTrademark/{page}/{limit}
export const reqTradeMarkList = (page,limit)=> request({url:`/admin/product/baseTrademark/${page}/${limit}`,method:'get'})