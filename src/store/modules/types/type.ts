//定义小仓库数据类型
import type { RouteRecordRaw } from "vue-router";
import { CategoryObj } from "../../../api/product/attr/type";
export interface UserState {
  token: string | null;
  menuRoutes: RouteRecordRaw[];
  username: string;
  avatar: string;
}

export interface CategoryState {
  c1Arr: CategoryObj[];
  c1Id: string | number;
  c2Arr: CategoryObj[];
  c2Id: string | number;
  c3Arr: CategoryObj[];
  c3Id: string | number;
}
