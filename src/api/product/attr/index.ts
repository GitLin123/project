//定义属性相关的API文件
import request from "../../../utils/request";

//属性相关的地址
enum API {
  //获取统一一级分类的地址
  C1_URL = "/admin/product/getCategory1",
  //获取二级分类的地址
  C2_URL = "/admin/product/getCategory2/",
  //获取三级分类的地址
  C3_URL = "/admin/product/getCategory3/",
  //获取分类下一有的属性值和接口
  ATTR_URL = "/admin/product/attrInfoList/",
  //修改以及新增属性值接口url
  UPDATEANDCHANGE_URL = "/admin/product/saveAttrInfo", 
  //删除接口
  DELETEATTR_URL = "/admin/product/deleteAttr/"
}

export const reqC1 = () => request.get<any,any>(API.C1_URL);
export const reqC2 = (category1Id: number | string) =>
  request.get<any, any>(API.C2_URL + category1Id);
export const reqC3 = (category2Id: number | string) =>
  request.get<any, any>(API.C3_URL + category2Id);
//导出获取属性值
export const reqAttr = (
  category1Id: string | number,
  category2Id: string | number,
  category3Id: string | number,
) =>
  request.get<any,any>(
    API.ATTR_URL + `${category1Id}/${category2Id}/${category3Id}`,
  );

export const reqAddOrUpdateAttr = (data:any) => request.post<any,any>(API.UPDATEANDCHANGE_URL,data);

//删除
export const reqRemoveAttr = (attrId:number) => request.delete<any,any>(API.DELETEATTR_URL + attrId);