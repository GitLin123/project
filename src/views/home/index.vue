<template>
  <div>
    <img :src="userStore.avatar" alt="" style="width: 20%; height: 20%" />
    <h3>欢迎 {{ userStore.username }} 进入系统！</h3>
  </div>
</template>

<script setup lang="ts">
import useUserStore from "../../store/modules/user";
let userStore = useUserStore();
</script>

<style scoped lang="scss"></style>
