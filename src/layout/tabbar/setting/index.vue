<template>
  <el-button
    type="primary"
    size="medium"
    :icon="Refresh"
    circle="true"
    @click="updateRefsh"
  ></el-button>
  <el-button
    type="primary"
    size="medium"
    :icon="FullScreen"
    circle="true"
    @click="fullScreen"
  ></el-button>
  <el-button
    type="primary"
    size="medium"
    :icon="Setting"
    circle="true"
  ></el-button>
  <img
    :src="userStore.avatar"
    style="
      width: 32px;
      height: 32px;
      color: #409eff;
      margin-left: 8px;
      margin-right: 8px;
      border-radius: 50%;
    "
  />
  <!-- 下拉菜单 -->
  <el-dropdown style="margin-right: 8px">
    <span class="el-dropdown-link">
      {{ userStore.username }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logOut">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { FullScreen, Refresh, Setting } from "@element-plus/icons-vue";
import useLayOutSettingStore from "../../../store/modules/setting";
import useUserStore from "../../../store/modules/user";
import { nextTick } from "vue";
import { useRouter, useRoute } from "vue-router";
let $router = useRouter();
let $route = useRoute();
let userStore = useUserStore();
let LayOutSettingStore = useLayOutSettingStore();
const updateRefsh = () => {
  LayOutSettingStore.refsh = !LayOutSettingStore.refsh;
};
const fullScreen = () => {
  //document的一个属性，用来判断是否全屏，全屏true反之false
  let full = document.fullscreenElement;
  if (!full) {
    //实现全屏模式
    document.documentElement.requestFullscreen();
  } else {
    //退出全屏模式
    document.exitFullscreen();
  }
};
const logOut = async () => {
  //第一件事情：需要向服务器发送请求[退出登录请求]
  //第二件事情：清空仓库中用户的信息[token\username\avatar]
  //第三件事：跳转到登录界面
  await userStore.userLogOut();
  nextTick(() => {
    $router.push({ path: "/login", query: { redirect: $route.path } });
  });
};
</script>
<script lang="ts">
export default {
  name: "Setting",
};
</script>

<style scoped></style>
