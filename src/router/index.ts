//通过vue-router插件实现模板路由的配置
import { createRouter, createWebHistory } from "vue-router";
import { constantRoute } from "./routes";
//创建路由器
let router = createRouter({
  routes: constantRoute,
  history: createWebHistory(),
  //滚动行为
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    };
  },
});

export default router;
