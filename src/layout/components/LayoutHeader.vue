<template>
  <div class="navbar">
    <el-button type="text" class="hamburger" @click="onCollapse" :icon="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></el-button>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>

    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar
          shape="square"
          :size="40"
          :src="userInfo.portrait || 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'"
        ></el-avatar>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>{{ userInfo.userName }}</el-dropdown-item>
        <el-dropdown-item @click.native="singOut" divided>退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import User from '@/engin/User'

const LayoutIndex = Vue.extend({
  props: {
    isCollapse: Boolean
  }
})

@Component
export default class LayoutHeader extends LayoutIndex {
  userInfo = {}
  async created (): Promise<void> {
    const { content } = await User.getUserInfo()
    this.userInfo = content
  }

  onCollapse (): void {
    this.$emit('onCollapse', !this.isCollapse)
  }

  async singOut (): Promise<void> {
    try {
      await this.$confirm('确认退出吗？', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
      this.$store.dispatch('singOut')
      this.$message.success('已退出')
      this.$router.push({ name: 'login' })
    } catch (e) {
      this.$message.info('已取消')
    }
  }
}
</script>
<style lang="less" scoped>
.navbar {
  height: 100%;
  display: flex;
  align-items: center;
  // justify-content: space-between;

  .hamburger {
    border: 0;
    font-size: 20px;
    margin-right: 10px;
    padding: 15px;
    border-radius: 0;
    color: #40586f;
  }

  .el-dropdown {
    margin-left: auto;
  }
}
</style>
