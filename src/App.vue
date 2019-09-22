<template>
  <div id="app">
    <nav-tab></nav-tab>
    <keep-alive>
      <router-view/>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>

import NavTab from 'components/content/navtab/NavTab'
import Player from './components/content/player/Player'
export default {
  name: 'App',
  components: {
    NavTab,
    Player
  }
}
</script>

<style>
</style>
