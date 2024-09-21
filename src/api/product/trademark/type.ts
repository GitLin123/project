export interface ResponseData {
  code: number;
  message: string;
  ok: string;
}

//定义已有品牌的ts数据类型
export interface TradeMark {
  id?: number;
  tmName: string;
  logoUrl: string;
}

//定义所有品牌的数据类型
export type Records = TradeMark[];

//定义获取的已有的品牌的数据类型
export interface TradeMarkResponse extends ResponseData {
  data: {
    records: Records;
    total: number;
    size: number;
    current: number;
    searchCount: boolean;
    pages: number;
  };
}
