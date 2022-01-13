<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class AppIndex extends Vue {}
</script>

<style lang="less" scope>

.text {
  color: @success-color;
}
</style>
