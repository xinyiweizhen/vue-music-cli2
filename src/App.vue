<template>
  <div id="app">
    <nav-tab></nav-tab>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>

import NavTab from 'components/content/navtab/NavTab'
export default {
  name: 'App',
  components: {
    NavTab
  }
}
</script>

<style>
#app {
}
</style>
