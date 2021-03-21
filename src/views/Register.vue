<template>
  <div class="login">
    <a-row type="flex" justify="center">
      <div class="user-login">
        <div class="login-header">
          <h2>注册新用户</h2>
          <p>猪猪新闻</p>
        </div>
        <a-alert v-if="showErr" :message="errMsg" type="error" show-icon/>
        <br v-if="showErr"/>
        <a-input v-model:value="form.email" placeholder="请输入邮箱" size="large" allowClear/>
        <br/>
        <br/>
        <a-input v-model:value="form.username" placeholder="请输入用户名" size="large" allowClear/>
        <br/>
        <br/>
        <a-input-password v-model:value="form.password" placeholder="请输入密码" size="large"/>
        <br/>
        <br/>
        <a-input-password v-model:value="passwordRepeat" placeholder="请再次输入密码" size="large"/>

        <br><br><br>
        <div style="text-align: center">
          <a-button type="primary" style="width: 80%" :loading="loading" @click="register">注册</a-button>
        </div>

        <div class="login-footer">
          <p>©2021 Created by Stupid Pig</p>
        </div>
      </div>
    </a-row>
  </div>
</template>

<script>
import { reactive, ref } from "vue"
import axios from 'axios'
import { handleToken } from "@/lib/token";
import { useRouter } from "vue-router"

export default {
  name: "Register",
  setup() {
    const router = useRouter()
    const baseURL = process.env.NODE_ENV === "production" ? "" : "http://127.0.0.1:5000"
    const showErr = ref(false)
    const loading = ref(false)
    const errMsg = ref("")
    const passwordRepeat = ref("")
    const form = reactive({
      email: "",
      username: "",
      password: ""
    })

    const register = async () => {
      if (form.email === "") {
        showErr.value = true
        errMsg.value = "邮箱不能为空"
        return
      }
      if (form.password === "" || form.username === "") {
        showErr.value = true
        errMsg.value = "用户名或者密码不能为空"
        return
      }
      if (form.passwordRepeat === "") {
        showErr.value = true
        errMsg.value = "再次输入密码不能为空"
        return
      }
      if (passwordRepeat.value !== form.password) {
        showErr.value = true
        errMsg.value = "两次输入的密码不一致"
        return
      }

      loading.value = true
      const { data } = await axios.post(`${baseURL}/oauth/register`, form)
      if (data.code === 200) {
        handleToken(data.data)
        await router.push("/login")
      } else {
        showErr.value = true
        errMsg.value = data.msg
      }
      loading.value = false
    }
    return { form, showErr, loading, errMsg, passwordRepeat, register }
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