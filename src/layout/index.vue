<template>
  <div>
    <el-container>
      <el-aside style="width: auto">
        <layout-aside :isCollapse="isCollapse" />
      </el-aside>
      <el-container>
        <el-header>
          <layout-header :isCollapse="isCollapse" @onCollapse="onCollapse" />
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>

</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import LayoutAside from './components/LayoutAside.vue'
import LayoutHeader from './components/LayoutHeader.vue'

@Component({
  components: {
    LayoutAside,
    LayoutHeader
  }
})
export default class LayoutIndex extends Vue {
  isCollapse = false
  onCollapse (isCollapse: boolean): void {
    this.isCollapse = isCollapse
  }
}
</script>

<style lang="less" scoped>
.el-container {
  min-height: 100vh;
}

.el-aside {
  background: #d3dce6;
}

.el-header {
  background: #fff;
}

.el-main {
  background: #e9eef3;
}
</style>
