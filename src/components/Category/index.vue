<template>
  <el-card>
    <el-form style="display: flex">
      <el-form-item label="一级分类" ds style="margin-left: 10px">
        <el-select :disabled="scene?true:false" style="width: 200px" v-model="categoryStore.c1Id" @change="handler">
          <el-option :value="c1.id" v-for="(c1, index) in categoryStore.c1Arr" :key="c1.id"
            :label="c1.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类" style="margin-left: 15px">
        <el-select :disabled="scene?true:false" style="width: 200px" v-model="categoryStore.c2Id" @change="handler1">
          <el-option :value="c2.id" v-for="(c2, index) in categoryStore.c2Arr" :key="c2.id"
            :label="c2.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类" style="margin-left: 15px">
        <el-select :disabled="scene?true:false" style="width: 200px" v-model="categoryStore.c3Id">
          <el-option :value="c3.id" v-for="(c3, index) in categoryStore.c3Arr" :key="c3.id"
            :label="c3.name"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import useCategoryStore from "../../store/modules/category";
defineProps(['scene']);
let categoryStore: any = useCategoryStore();
//全局组件挂载完毕，到仓库取数据
onMounted(() => {
  getC1();
});

//仓库获取c1数据
const getC1 = () => {
  categoryStore.getC1();
};

//一级分类的下啦菜单的change事件
const handler = () => {
  //通知仓库获取二级仓库数据
  categoryStore.getC2();
  //清空数据
  categoryStore.c2Id = "";
  categoryStore.c3Arr = [];
  categoryStore.c3Id = "";
};
//二级下拉change事件
const handler1 = () => {
  //通知仓库获取三级仓库数据
  categoryStore.getC3();
  //清空数据
  categoryStore.c3Id = "";
};
</script>

<style scoped></style>