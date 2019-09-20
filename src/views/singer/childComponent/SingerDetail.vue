<template>
  <transition name="slide">
    <!-- 传入三个prop -->
    <music-list></music-list>
  </transition>
</template>

<script>
import MusicList from 'components/content/musiclist/MusicList'
export default {
  name: 'SingerDetail',
  components: {
    MusicList
  },
  created () {
    this._getSingerDetail()
  },
  methods: {
    _getSingerDetail() {
    }
  }
}
</script>

<style scoped>

</style>
