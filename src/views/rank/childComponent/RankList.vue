<template>
  <transition name="slide">
    <music-list></music-list>
  </transition>
</template>

<script>
import MusicList from 'components/content/musiclist/MusicList'
export default {
  name: 'RankList',
  components: {
    MusicList
  }
}
</script>

<style lang="stylus" scoped>
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s ease
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
