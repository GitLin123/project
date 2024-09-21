//小仓库：layout组件相关配置的仓库
import { defineStore } from "pinia";

let useLayOutSettingStore = defineStore("SettingStore", {
  state: () => {
    return {
      fold: false, //用户控制菜单折叠还是收起
      refsh: false, //控制刷新效果
    };
  },
});
export default useLayOutSettingStore;
