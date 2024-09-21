//封装本地存储数据与读取数据方法
//本地存储token数据
export const SET_TOKEN = (token: string) => {
  localStorage.setItem("TOKEN", token);
};
//获取token数据
export const GET_TOKEN = () => {
  return localStorage.getItem("TOKEN");
};
export const REMOVE_TOKEN = () => {
  localStorage.removeItem("TOKEN");
};
