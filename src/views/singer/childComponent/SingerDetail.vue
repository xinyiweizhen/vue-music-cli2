<template>
  <transition name="slide">
    <!-- 传入三个prop -->
    <music-list :songs="songs" :rank="false" :title="title" :list-background="listBackground"></music-list>
  </transition>
</template>

<script>
import MusicList from 'components/content/musiclist/MusicList'

import { getSingerDetail } from 'network/singer'
import { mapGetters } from 'vuex'
import { RES_OK } from 'common/networkConfig'
import {creacteSong} from 'common/song'

export default {
  name: 'SingerDetail',
  components: {
    MusicList
  },
  data() {
    return {
      songs: []
    }
  },
  computed: {
    title() {
      return this.singer.name
    },
    listBackground() {
      return this.singer.avatar
    },
    ...mapGetters(['singer'])
  },
  created () {
    this._getSingerDetail()
  },
  methods: {
    _getSingerDetail() {
      // 限制不能直接点击歌手详情页
      if (!this.singer.id) {
        this.$router.push('/singer')
        return
      }
      getSingerDetail(this.singer.id, 50).then((res) => {
        if (RES_OK === res.code) {
          console.log(res)
          this.songs = this._normalizeSongs(res.singer.data.songlist)
          // console.log(this._normalizeSongs(res.singer.data.songlist))
        }
      })
    },
    // 封装歌曲数据
    _normalizeSongs(list) {
      let songs = []
      list.forEach((item) => {
        if (item) {
          songs.push(creacteSong(item))
        }
      })
      return songs
    }
  }
}
</script>

<style lang="stylus" scoped>
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
