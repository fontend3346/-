<template>
  <!-- 登陆页 -->
  <div class="login-page">
    <div class="login-header">
      <div class="title">精化分析服务平台</div>
      <!-- <div class="title">某数据处理中心应用系统定制软件</div> -->
    </div>
    <!-- 登陆框 -->
    <div class="login-plane">
      <!-- 内层容器 -->
      <div class="login-plane-container">
        <div class="login-plane-title">欢迎登录</div>
        <el-form class="login-form" ref="formRef" v-model="loginForm">
          <el-form-item prop="user">
            <el-input
              placeholder="用户名 / 账号"
              type="text"
              v-model="loginForm.username"
              :prefix-icon="UserFilled"
              class="username-input"
            ></el-input>
          </el-form-item>
          <el-form-item prop="pass">
            <el-input
              placeholder="密码"
              type="password"
              v-model="loginForm.password"
              :prefix-icon="Lock"
              class="password-input"
            ></el-input>
          </el-form-item>
        </el-form>
        <!-- 按钮 -->
        <!-- <el-input type="checkbox" id="remember">记住密码</el-input> -->
        <div class="two-button">
          <el-button
            class="login"
            type="primary"
            @click="loginSubmit"
            :loading="isDisabled"
            >登录</el-button
          >
          <!-- <el-button class="register" type="primary">注册</el-button> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted, toRefs, getCurrentInstance, ref } from "vue";
import { UserFilled, Lock } from "@element-plus/icons-vue";
import md5 from "js-md5";
import http from "@/api";
import { useRouter } from "vue-router";
import store from "@/store";
import { ElMessage } from "element-plus";
// 路由实例
const router = useRouter();
const loginForm = reactive({
  username: "",
  password: "",
});
let isDisabled = ref(false);
// 登录
const loginSubmit = () => {
  // 表单验证
  if (!loginForm.username || !loginForm.password) {
    ElMessage({
      message: "账号、密码或验证码不能为空!",
      type: "warning",
    });
    return;
  } else {
    isDisabled.value = true;
    let params = {
      loginAccount: loginForm.username,
      password: md5(loginForm.password),
    };
    http.login.getList(params).then((res: any) => {
      const data = res;
      if (data.code == "0") {
        ElMessage({
          message: "登陆成功",
          type: "success",
        });
        store.commit("SET_USERINFO", data.data);
        router.push({ path: "/" });
        if (data.data.teamInfoResp.length > 1) {
          let roleInfo = {
            level: 1,
          };
          store.commit("SET_ROLEINFO", roleInfo);
        } else {
          let param = {
            teamId: res.data.teamInfoResp[0].teamId,
            userId: res.data.userId,
          };
          http.roleManage.getRolesByUserId(param).then((result: any) => {
            if (result.code == 0) {
              store.commit("SET_ROLEINFO", result.data.roles[0]);
              console.log(result.data, "info");
            } else {
              ElMessage.error(result.message);
            }
          });
        }
        //登录后台网或者台站的信息
        if (res.data.userId) {
          let params = {
            userId: res.data.userId,
          };
          http.dutyManage.stationList(params).then((resultStation: any) => {
            if (resultStation.code == 0) {
              const data = resultStation;
              if (data && data.data && data.data.length > 0) {
                store.commit("STAT_INFO", data.data);
              } else {
                ElMessage.error(resultStation.message);
              }
            } else {
              ElMessage.error(resultStation.message);
            }
          });
        }
      } else {
        isDisabled.value = false;
        ElMessage({
          message: data.message,
          type: "error",
        });
      }
    });
  }
};
</script>

<style lang="less" scoped>
.login-page {
  height: 100%;
  width: 100%;
  position: relative;
  background: url(../assets/image/login.png);
  background-size: 100% 100%;
  // background-image: linear-gradient(
  //   to top,
  //   #1e3c72 0%,
  //   #1e3c72 1%,
  //   #2a5298 100%
  // );
}
.login-header {
  position: absolute;
  top: 200px;
  left: 50%;
  transform: translateX(-50%);
  .title {
    // width: 800px;
    // height: 50px;
    // background-image: radial-gradient(#020407fd, #065085f5);
    text-align: center;
    // line-height: 50px;
    font-size: 40px;
    color: @main-font-color;
    font-weight: 400;
    letter-spacing: 10px;
  }
}
.login-plane {
  width: 500px;
  background: url(../assets/image/loginBorder.png);
  background-size: 100% 100%;
  // background-image: radial-gradient(#020407fd, #065085f5);
  // background-image: linear-gradient(#065085f5, #020407fd);
  opacity: 0.95;
  height: 400px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  box-sizing: border-box;
  .login-plane-container {
    width: 100%;
    height: 100%;
    .login-plane-title {
      height: 100px;
      width: 100%;
      line-height: 120px;
      // font-weight: bold; /*加粗*/
      text-align: center; /* 水平居中 */
      font-size: 24px;
      color: #66c5fd;
    }
    .login-form {
      margin: 0 auto;
      width: 300px;
      height: 150px;
      .username-input,
      .password-input {
        width: 100%;
        border-radius: 10px;
        height: 50px;
        background: transparent;
        margin-bottom: 25px;
        box-sizing: border-box;
      }
    }
    .two-button {
      margin: 0 auto;
      width: 300px;
      :deep(.el-button) {
        width: 300px;
        height: 50px!important;
        font-size: 20px;
        font-weight: 500;
        border: 0;
        border-radius: 5px;
      }
      .login {
        color: @main-font-color;
        background: #0495d5!important;
        // background: rgba(17, 42, 111, 0.7);
        // background-image: radial-gradient(#41605fa3, #32aed4);
      }
      .register {
        background-image: radial-gradient(#41605fa3, #2ac4bf);
      }
    }
  }
  :deep(.el-input__prefix) {
    color: @main-font-color;
  }
}
</style>
