<template>
  <div class="login">
    <a-row type="flex" justify="center">
      <div class="user-login">
        <div class="login-header">
          <h2>猪猪新闻</h2>
          <p>v1.0.0</p>
        </div>

        <a-input v-model:value="form.email" placeholder="请输入邮箱" size="large"/>
        <br/>
        <br/>
        <a-input-password v-model:value="form.password" placeholder="请输入密码" size="large"/>

        <br><br><br>
        <a-row :gutter="[16,0]">
          <a-col :span="12" style="text-align: center">
            <a-button type="primary" style="width: 80%">登录</a-button>
          </a-col>
          <a-col :span="12" style="text-align: center">
            <a-button style="width: 80%">注册</a-button>
          </a-col>
        </a-row>


        <div class="login-footer">
          <p>©2021 Created by Stupid Pig</p>
        </div>
      </div>
    </a-row>
  </div>
</template>

<script>
import { reactive } from "vue"

export default {
  name: "Login",
  setup() {
    const form = reactive({
      email: "",
      password: ""
    })
    return { form }
  }
}
</script>

<style lang="less" scoped>
.login {
  background-color: #f2f2f2;
  background-size: 100%;
  height: 100vh;

  .user-login {
    width: 335px;
    padding: 110px 0;
    min-height: 100%;
    box-sizing: border-box;
  }

  .login-header {
    text-align: center;
    padding: 20px;

    h2 {
      margin-bottom: 10px;
      font-weight: 400;
      font-size: 30px;
      color: #000;
    }

    p {
      font-weight: 300;
      color: #999;
    }
  }

  .login-footer {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    line-height: 30px;
    padding: 15px;
    text-align: center;
    color: rgba(0, 0, 0, .5);
    font-size: 14px;
    box-sizing: border-box;
    background-color: #f2f2f2;
  }
}


</style>