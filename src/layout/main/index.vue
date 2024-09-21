<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <!-- 渲染一级组件的子路由 -->
      <component :is="Component" v-if="flag"> </component>
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { nextTick, ref, watch } from "vue";
import useLayOutSettingStore from "../../store/modules/setting";
let layOutSettingStore = useLayOutSettingStore();
//监听仓库内数据是否发生变化，如果发生变化，说明用户点击了刷新按钮
let flag = ref(true);
watch(
  () => layOutSettingStore.refsh,
  () => {
    flag.value = false; //销毁组件
    nextTick(() => {
      //重建组件
      flag.value = true;
    });
  },
);
</script>

<script lang="ts">
export default {
  name: "Main",
};
</script>

<style scoped>
.fade-enter-from {
  opacity: 0;
  transform: scale(0);
}
.fade-enter-active {
  transition: all 0.5s;
}
.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>
