<template>
  <!-- 顶部左侧动态 -->
  <el-icon style="margin-right: 5px; cursor: pointer" @click="changeIcon">
    <component :is="LayOutSettingStore.fold ? 'Fold' : 'Expand'"></component>
  </el-icon>
  <el-breadcrumb separator="->">
    <!-- 动态展示  -->
    <el-breadcrumb-item
      v-for="(item, index) in $route.matched"
      :key="index"
      v-show="item.meta.title"
      :to="item.path"
    >
      <!-- 图标 -->
      <el-icon style="margin-right: 4px">
        <component :is="item.meta.icon"></component>
      </el-icon>
      <span style="font-size: small">{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import useLayOutSettingStore from "../../../store/modules/setting";
let LayOutSettingStore = useLayOutSettingStore();
const changeIcon = () => {
  LayOutSettingStore.fold = !LayOutSettingStore.fold;
};
</script>
<script lang="ts">
export default {
  name: "面包屑",
};
</script>

<style scoped></style>
