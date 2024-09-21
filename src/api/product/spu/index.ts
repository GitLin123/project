import request from "../../../utils/request";
import { HasSpuResponseData } from "./types";

enum API {
    //获取已有的SPU的数据
    HASSPU_URL = '/admin/product/'
}

export const reqHasSpu = (page:number,limit:number,category3Id:string|number) => request.get<any,HasSpuResponseData>(API.HASSPU_URL+`${page}/${limit}?category3Id=${category3Id}`);