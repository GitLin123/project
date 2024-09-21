//创建用户相关的小仓库
import { defineStore } from "pinia";
import { reqLogin, reqUserInfo, reqLogOut } from "../../api/user";
import type { UserState } from "./types/type.ts";
import { constantRoute } from "../../router/routes.ts";
//引入持久化存储token方法
import { GET_TOKEN, REMOVE_TOKEN, SET_TOKEN } from "../../utils/token.ts";
import {
  loginFormData,
  loginResponseData,
  userInfoResponseData,
} from "../../api/user/type.ts";
let useUserStore = defineStore("User", {
  //数据
  state: (): UserState => {
    return {
      token: GET_TOKEN(), //获取本地token
      username: "",
      avatar: "",
      menuRoutes: constantRoute, //仓库存储生成菜单需要的数组
    };
  },
  actions: {
    //用户登录的方法
    async userLogin(data: loginFormData) {
      let result: loginResponseData = await reqLogin(data);
      //登录成功200->token 失败201->失败错误的信息
      if (result.code == 200) {
        //pinia仓库存储token
        this.token = result.data as string;
        //持久化存储token
        SET_TOKEN(result.data as string);
        return "ok";
      } else {
        return Promise.reject(new Error(result.data.message));
      }
    },
    async userInfo() {
      //获取用户信息进行储存仓库当中[用户头像,名字]
      let result: userInfoResponseData = await reqUserInfo();
      if (result.code == 200) {
        this.username = result.data.name;
        this.avatar = result.data.avatar;
        return "ok";
      } else {
        return Promise.reject(new Error(result.message));
      }
    },
    //退出登录的函数
    async userLogOut() {
      let result: any = await reqLogOut();
      if (result.code == 200) {
        this.token = "";
        this.username = "";
        this.avatar = "";
        REMOVE_TOKEN(); //清除本地token
        return "ok";
      } else {
        return Promise.reject(new Error(result.message));
      }
    },
  },
  getters: {},
});
//暴漏这个方法
export default useUserStore;
