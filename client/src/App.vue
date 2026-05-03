<template>
  <el-form
    label-width="auto"
    :model="formLabelAlign"
    style="max-width: 900px"
  >
    <el-form-item label="账号">
      <el-input v-model="formLabelAlign.username" />
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="formLabelAlign.password" />
    </el-form-item>
    <el-form-item label="验证码">
      <div class="flex">
        <el-input class="flex-1" v-model="formLabelAlign.code" />
        <img style="width: 100px; height: 30px;" :src="codeUrl" alt="" @click="refreshCaptcha">
      </div>
    </el-form-item>

    <el-button @click="login">登录</el-button>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
const codeUrl = ref(`/api/v1/user/captcha?${Date.now()}`)

const refreshCaptcha = () => {
  codeUrl.value = `/api/v1/user/captcha?${Date.now()}`
}

const formLabelAlign = reactive({
  username: '',
  password: '',
  code: '',
})

const login = () => {
  fetch('/api/v1/user/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formLabelAlign),
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        alert('登录成功')
      } else {
        alert('登录失败：' + data.message)
        // refreshCaptcha()
      }
    })
}
</script>

<style scoped>
.flex {
  display: flex;
}
.flex-1 {
  flex: 1;
  min-width: 0;
}
</style>
