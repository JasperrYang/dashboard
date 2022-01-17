<template>
  <div class="header">
    <div class="nav">
      <span @click="onCollapse">
        <i :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold' "></i>
      </span>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>活动管理</el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar
          shape="square"
          :size="40"
          src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
        ></el-avatar>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>用户ID</el-dropdown-item>
        <el-dropdown-item divided>退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

const LayoutIndex = Vue.extend({
  props: {
    isCollapse: Boolean
  }
})

@Component
export default class LayoutHeader extends LayoutIndex {
  onCollapse (): void {
    this.$emit('onCollapse', !this.isCollapse)
  }
}
</script>
<style lang="less" scoped>
.header {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 22px;
  .nav {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
}
</style>
