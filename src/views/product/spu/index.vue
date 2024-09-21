<template>
  <Category :scene="scene"></Category>
  <el-card style="margin-top :10px">
    <div v-show="scene == 0">
      <el-button type="primary" @click="addSpu" icon="Plus" :disabled="categoryStore.c3Id ? false : true">添加SPU</el-button>
      <el-table style="margin: 10px 0px" border :data="records">
        <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
        <el-table-column label="SPU名称" prop="spuName"></el-table-column>
        <el-table-column label="SPU描述" prop="description"></el-table-column>
        <el-table-column label="操作">
          <template #="{ row, $index }">
            <el-button icon = "Plus" title = "添加sku"></el-button>
            <el-button icon = "Edit" title = "修改spu" @click="updateSpu"></el-button>
            <el-button icon = "View" title=  "查看sku"></el-button>
            <el-button icon = "Delete" title = "删除spu"></el-button>
          </template>
        </el-table-column> 
      </el-table>
      <el-pagination v-model:current-page="pageNo" :page-sizes="[3, 5, 7, 9]" v-model:page-size="pageSize"
        layout="prev, pager, next, jumper, ->, total, sizes" :total="total" :background="true"
        @current-change="getHasSpu" @size-change="changSize" />
    </div>
    <!-- 添加修改spu -->
    <spuForm v-show="scene == 1" @changeScene="changeScene"></spuForm>
    <!-- 添加sku -->
    <spuForm v-show="scene == 2"></spuForm>
  </el-card>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import Category from '../../../components/Category/index.vue'
import useCategoryStore from "../../../store/modules/category";
import { reqHasSpu } from "../../../api/product/spu";
import { HasSpuResponseData } from "../../../api/product/spu/types";
import { Records } from "../../../api/product/trademark/type";
import spuForm from "./spuForm.vue";
let categoryStore = useCategoryStore();
let scene = ref<number>(0);//0显示已有的spu，1添加或修改已有的spu
let pageNo = ref<number>(1);
let pageSize = ref<number>(3);
let total = ref<number>(0);
//存储已有的SPU的数据
let records = ref<Records>([]);
watch(() => categoryStore.c3Id, () => {
  getHasSpu();
});

const getHasSpu = async (pager = 1) => {
  pageNo.value = pager;
  let result: HasSpuResponseData = await reqHasSpu(pageNo.value, pageSize.value, categoryStore.c3Id);
  if (result.code == 200) {
    records.value = result.data.records;
    total.value = result.data.total;
  }
}

//分页器下拉菜单变话
const changSize = () => {
  getHasSpu();
}

//添加新的spu按钮的回调
const addSpu = () => {
  scene.value = 1
}

//修改已有的SPU的回调
const updateSpu = () => {
  scene.value = 1
}

//子组件SpuForm绑定的自定义事件
const changeScene = (num: number) => {
  //子组件spuform点击取消回去
  scene.value = num;
}
</script>

<style scoped></style>
