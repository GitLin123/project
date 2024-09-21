//商品分类全局组件的小仓库
import { defineStore } from "pinia";
import { reqC1, reqC2, reqC3 } from "../../api/product/attr";
let useCategoryStore = defineStore("Category", {
  state: (): any => {
    return {
      //存储一级分类的数据
      c1Arr: [],
      //存储一级分类的id
      c1Id: "",
      //存储二级分类的数据
      c2Arr: [],
      //存储二级分类的id
      c2Id: "",
      //存储三级分类的数据
      c3Arr: [],
      //存储三级分类的id
      c3Id: "",
    };
  },

  actions: {
    //获取category1的数据
    async getC1() {
      let result: any = await reqC1();
      if (result.code == 200) {
        this.c1Arr = result.data;
      } else {
      }
    },
    //获取categoryc2的数据
    async getC2() {
      let result: any = await reqC2(this.c1Id);
      if (result.code == 200) {
        this.c2Arr = result.data;
      } else {
      }
    },
    //获取categoryc3的数据
    async getC3() {
      let result: any = await reqC3(this.c2Id);
      if (result.code == 200) {
        this.c3Arr = result.data;
      } else {
      }
    },
  },
  getters: {},
});
export default useCategoryStore;