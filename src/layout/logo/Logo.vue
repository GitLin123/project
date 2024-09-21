<template>
  <div class="logo">
    <img src="../../assets/logo/logo1.png" alt="" />
  </div>
</template>

<script setup lang="ts"></script>

<script lang="ts">
export default {
  name: "Logo",
};
</script>

<style scoped lang="scss">
@import "../../styles/variable.scss";
.logo {
  width: 100%;
  height: 50px;
  //在这里修改logo尺寸
  img {
    position: relative;
    left: 15%;
    width: $base-menu-width - 100px;
    height: $base-logo-height;
  }
}
</style>
