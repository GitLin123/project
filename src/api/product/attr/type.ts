//定义商品分类的ts类型  
export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}
//分类
export interface CategoryObj {
  id: number | string;
  name: string;
  category1Id?: number;
  category2Id?: number;
}

//对用的分类接口返回的数据类型
export interface CategoryResponseData extends Response {
  data: CategoryObj[];
}

//属性与属性值的接口
//属性值ts类型
export interface AttrValue {
  id?: number,
  valueName: string,
  attrId?: number,
  flag:true
}

//属性值的数组类型
export type AttrValueList = AttrValue[];

//属性对象
export interface Attr {
  id?: number,
  attrName: string,
  categoryId: number|string,
  categoryLevel: number,
  attrValueList: AttrValueList
}

//存储每一个属性对象的数组类型
export type AttrList = Attr[];
//属性接口返回的数据的类型
export interface AttrResponseData extends ResponseData {
  data: Attr[];
}