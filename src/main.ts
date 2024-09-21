import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
//@ts-expect-error dddd
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import "virtual:svg-icons-register";
import axios from "axios";
import router from "./router/index.ts";
import pinia from "./store/index.ts";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "./permisstion.ts";
const app = createApp(App);
app.use(axios);
//将element-plus提供的图标注册为全局组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(router);
app.use(pinia);
app.use(ElementPlus, {
  locale: zhCn,
});
app.mount("#app");
