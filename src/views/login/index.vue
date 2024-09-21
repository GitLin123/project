<template>
  <div class="login_container">
    <el-row>
      <!-- 页面缩小后仅仅展示表单 -->
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form
          class="login_form"
          :model="loginForm"
          :rules="rules"
          ref="loginForms"
        >
          <h1>好久不见！</h1>
          <h2>欢迎登陆后台管理系统！</h2>
          <el-form-item prop="username">
            <el-input
              :prefix-icon="User"
              v-model="loginForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              :prefix-icon="Lock"
              v-model="loginForm.password"
              :show-password="true"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              :loading="loading"
              class="login_btn"
              type="primary"
              size="default"
              @click="login"
            >
              登录</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { Lock, User } from "@element-plus/icons-vue";
import { reactive, ref } from "vue";
import useUserStore from "../../store/modules/user";
import { useRouter, useRoute } from "vue-router";
import { ElNotification } from "element-plus";
import { defineComponent } from "vue";
//引入回去时间函数
import { getTime } from "../../utils/time";
let useStore = useUserStore();
let $router = useRouter();
let $route = useRoute();
//获取el-form组件示例
let loginForms = ref();
let loading = ref(false);
let loginForm = reactive({ username: "admin", password: "111111" });
//处理登录请求
const login = async () => {
  //保证全部表单校验通过才发请求
  await loginForms.value.validate();
  //去仓库去数据
  //成功跳转首页展示数据 失败展示提示信息
  loading.value = true;
  try {
    await useStore.userLogin(loginForm);
    let redirect = $route.query.redirect; //回到退出前的路由
    $router.push({ path: redirect || "/" });
    //登录成功的提示信息
    ElNotification({
      type: "success",
      message: "登录成功！",
      title: `欢迎回来！${getTime()}好！`,
    });
    loading.value = false;
  } catch (error) {
    //失败提示信息
    ElNotification({
      type: "error",
      message: "账号或密码错误！",
    });
  } finally {
    //关闭登录加载状态
    loading.value = false;
  }
};
//定义表单校验规则
//required 字段必须要校验
//min max 文本最大最多少位
//message 错误提示信息
//trigger 触发时机 change文本变化发生  blur失去焦点触发
const validateUserName = (rule, value, callback) => {
  //rule是校验规则对象
  //value是表单文本内容
  //函数：符合，放行 不符合，注入错误提示信息
  if (value.length < 5) {
    callback(new Error("账号长度至少为5位"));
  } else if (value.length > 10) {
    callback(new Error("账号长度不能超过10位"));
  } else {
    callback();
  }
};
const validatePassword = (rule, value, callback) => {
  if (value.length < 6) {
    callback(new Error("密码长度至少为6位"));
  } else if (value.length > 10) {
    callback(new Error("密码长度不能超过10位"));
  } else {
    callback();
  }
};
const rules = {
  username: [
    // {required: true,message:'账号不能为空',trigger: 'blur'},
    // {required:true, min: 5, max:10, message:'账号长度至少为5位', trigger:'change'}
    { validator: validateUserName, trigger: "change" },
  ],
  password: [
    // {required:true,message:'密码不能为空',trigger:'blur'},
    { validator: validatePassword, trigger: "change" },
  ],
};
</script>

<style scoped lang="scss">
//登录的背景图片的设置
.login_container {
  width: 100%;
  height: 100vh;
  background: url(../../assets/bg_img/login_img3.jpg) no-repeat center center;
  background-size: cover;
}

//表单的样式
.login_form {
  width: 60%;
  top: 18vh;
  position: relative;
  background-color: #87d8a8c7;
  border-radius: 14px;
  padding: 40px;

  h1 {
    color: #ef8e8e;
    font-size: 40px;
    font-family: fangsong;
  }

  h2 {
    color: white;
    margin: 20, 0;
    font-size: 20px;
    font-family: fangsong;
  }

  .login_btn {
    width: 100%;
  }
}
</style>
