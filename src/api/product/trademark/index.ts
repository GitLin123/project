//接口定义
import request from "../../../utils/request";
import { TradeMark, TradeMarkResponse } from "./type";
//定义API
enum API {
  //获取品牌
  TRADEMARK_URL = "/admin/product/baseTrademark/",
  //添加品牌
  ADDTRADEMARK_URL = "/admin/product/baseTrademark/save",
  //修改品牌
  UPDATETRADEMARK_URL = "/admin/product/baseTrademark/update",
  //删除品牌
  DELETETRADEMARK_URL = "/admin/product/baseTrademark/remove/",
}
//默认导出接口
//导出获取品牌的接口
export const reqHasTradeMark = (page: number, limit: number) =>
  request.get<any, TradeMarkResponse>(API.TRADEMARK_URL + `${page}/${limit}`);
//导出对应的添加以及修改的接口
export const reqAddUpdateTradeMark = (data: TradeMark) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATETRADEMARK_URL, data);
  } else {
    return request.post<any, any>(API.ADDTRADEMARK_URL, data);
  }
};
//导出删除的业务接口
export const reqDeleteTradeMark = (id: number) =>
  request.delete<any, any>(API.DELETETRADEMARK_URL + id);
