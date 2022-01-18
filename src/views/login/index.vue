<template>
  <div class="login">
    <el-form class="login-form" ref="form" :rules="rules" label-position="top" label-width="40px" :model="loginForm">
      <el-form-item label="账号" prop="phone">
        <el-input v-model="loginForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="loginForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="login-btn" type="primary" :loading="isLoading" @click="submitForm('loginForm')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import User from '@/engin/User'
import { Form } from 'element-ui'

@Component
export default class LoginIndex extends Vue {
  loginForm = {
    phone: '',
    password: ''
  }

  rules = {
    phone: [
      { required: true, message: '手机号必填', trigger: 'blur' },
      { pattern: /^1\d{10}$/, message: '请输入正确手机号', trigger: 'blur' }
    ],
    password: [
      { required: true, message: '密码必填', trigger: 'blur' },
      { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
    ]
  }

  isLoading = false

  async submitForm (): Promise<void> {
    try {
      await (this.$refs.form as Form).validate()
      this.isLoading = true
      const result = await User.login(this.loginForm)
      if (result.state !== 1) {
        this.$message.error(result.message)
      } else {
        this.$message.success('登录成功')
        this.$router.push({ name: 'home' })
      }
      this.isLoading = false
    } catch (e) {
      this.$message.error('登录失败, 请重新尝试')
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .login-form {
    width: 300px;
    background: #fff;
    padding: 20px;
    border-radius: 5px
  }

  .login-btn {
    background-color: #425874;
    border: none;
    width: 100%;
  }
}
</style>
