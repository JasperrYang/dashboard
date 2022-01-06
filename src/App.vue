<template>
  <div id="app">
    <h1 class="text">home</h1>
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
