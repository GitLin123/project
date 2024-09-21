//服务器全部接口返回的数据类型
export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}

//SPU数据类型
export interface SpuData {
  id?: number;
  spuName: string;
  description: string;
  category3Id: string | number;
  tmId: number;
  spuSaleAttrList: null;
  spuImageList: null;
  tmName:string;
  logoUrl:string;
}

export type Records = SpuData[];

export interface HasSpuResponseData  extends ResponseData{
  data: {
    total: number;
    size: number;
    current: number;
    searchCount: boolean;
    pages: number;
    records: Records;
  };
}
