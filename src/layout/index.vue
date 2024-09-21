<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <div
      class="layout_slider"
      :class="{ fold: LayoutSettingStore.fold ? true : false }"
    >
      <Logo v-show="LayoutSettingStore.fold ? false : true"></Logo>
      <!-- 滚动组件 -->
      <el-scrollbar class="scrollbar">
        <!-- 菜单 -->
        <el-menu
          background-color="#e6f6fc"
          text-color="#8697c4"
          active-color="#f9c5d2"
          :default-active="$route.path"
          :collapse="LayoutSettingStore.fold ? true : false"
        >
          <Menu :menuList="useStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航 -->
    <div
      class="layout_tabbar"
      :class="{ fold: LayoutSettingStore.fold ? true : false }"
    >
      <!-- 封装组件 -->
      <Tabbar></Tabbar>
    </div>
    <!-- 内容展示区域 -->
    <div
      class="layout_main"
      :class="{ fold: LayoutSettingStore.fold ? true : false }"
    >
      <Main></Main>
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from "./logo/Logo.vue";
import Menu from "./menu/index.vue";
import useUserStore from "../store/modules/user";
import Main from "../layout/main/index.vue";
import { useRoute } from "vue-router";
import Tabbar from "../layout/tabbar/index.vue";
import useLayOutSettingStore from "../store/modules/setting";
let LayoutSettingStore = useLayOutSettingStore();
let useStore = useUserStore();
let $route = useRoute();
</script>

<script lang="ts">
export default {
  name: "Layout",
};
</script>

<style scoped lang="scss">
@import "../styles/variable.scss";
.layout_container {
  width: 100%;
  height: 100vh;
  .layout_slider {
    width: $base-menu-width;
    height: 100vh;
    background-color: $base-menu-color;
    transition: all 0.35s;
    .scrollbar {
      position: relative;
      width: $base-menu-width;
      top: $base-logo-height - 50px;
      height: calc(100vh - $base-logo-height);
      .el-menu {
        border: none;
      }
    }
    &.fold {
      width: $base-menu-min-width;
    }
  }
}
.layout_tabbar {
  position: fixed;
  width: calc(100% - $base-menu-width);
  height: $base-tabbar-height;
  background: linear-gradient(
    135deg,
    #ebf5ee,
    #92d5c6,
    #00c9a7,
    #0088a9,
    #ebf5ee
  );
  top: 0px;
  left: $base-menu-width;
  transition: all 0.35s;
  &.fold {
    left: $base-menu-min-width;
    width: calc(100vw - $base-menu-min-width);
  }
}
.layout_main {
  box-sizing: border-box;
  position: absolute;
  width: calc(100% - $base-menu-width);
  height: calc(100vh - $base-tabbar-height);
  background-color: #bcf5d2;
  left: $base-menu-width;
  top: $base-tabbar-height;
  padding: 15px;
  overflow: auto;
  transition: all 0.35s;
  &.fold {
    left: $base-menu-min-width;
    width: calc(100vw - $base-menu-min-width);
  }
}
</style>
