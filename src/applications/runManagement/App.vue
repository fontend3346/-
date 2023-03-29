<template>
  <div id="app">
    <transition name="fade-transform" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>
<script lang='ts'>
import * as echarts from 'echarts'
import { provide } from 'vue'
 
export default {
  name: 'App',
  setup(){
    provide('echarts',echarts)               //provide
  },
  components: {
  }
}
</script>


<style >
html,
body,
#app {
  padding: 0;
  margin: 0;
  height: 100%;
  min-width: 1200px;
}
</style>
