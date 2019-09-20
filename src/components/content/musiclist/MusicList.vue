<template>
  <div class="music-list">
    <div class="back">
      <i></i>
    </div>
    <h1 class="title" v-html="title"></h1>
    <div class="music-bg" ref="ListBg" :style="ListBgStyle">
      <div class="play-wrapper">
        <div class="play-btn"
             ref="playBtn"
             @click="randomPlay"
             v-show="songs.length > 0" >
          <i class="icon-play"></i>
          <sapn class="text">随机播放全部</sapn>
        </div>
      </div>
      <div class="filter"></div>
    </div>
    <!--往上滑的遮罩-->
    <div class="music-layer"></div>
    <scroll class="song-list" ref="list">
      <div class="song-list-wrapper">
        <song-list @select="SelectedSong" :rank="rank" :songs="songs"></song-list>
      </div>
      <div class="loading-container">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
import Loading from 'components/common/loading/Loading'

import SongList from 'components/common/songlist/SongList'
export default {
  name: 'MusicList',
  components: {
    SongList,
    Loading,
    Scroll
  },
  props: {
    // 是否是排行榜
    rank: {
      type: Boolean,
      default: false
    },
    // 歌曲列表数据
    songs: {
      type: Array,
      default() {
        return []
      }
    },
    // 列表顶部的背景图ref名称
    ListBg: {
      type: String,
      default: ''
    },
    // 标题
    title: {
      type: String,
      default: ''
    }
  },
  computed: {
    // 设置样式
    ListBgStyle() {
      return `background-image: url(${this.ListBg})`
    }
  },
  methods: {
    randomPlay() {
    },
    SelectedSong(song, index) {
    }
  }

}
</script>

<style lang="stylus" scoped>
  @import "~assets/stylus/variable"
  @import "~assets/stylus/mixin"

  .music-list
    position fixed
    top 0
    bottom 0
    left 0
    right 0
    z-index 100
    background $color-background
    .back
      position absolute
      top 0
      z-index 50
      left 60px
      .icon-back
        display block
        padding 10px
        font-size $font-size-large-x
        color $color-theme
    .title
      position absolute
      top 0
      left 10%
      z-index 40
      width 80%
      no-wrap()
      text-align center
      line-height 40px
      font-size $font-size-large
      color $color-text
    .music-bg
      position relative
      width 100%
      height: 0
      padding-top: 70%
      transform-origin: top
      background-size: cover
      .play-wrapper
        position absolute
        bottom 20px
        z-index 50
        width 100%
        .play-btn
          box-sizing border-box
          width: 135px
          padding: 7px 0
          margin: 0 auto
          text-align: center
          border: 1px solid $color-theme
          color: $color-theme
          border-radius: 100px
          font-size: 0
          .icon-play
            display: inline-block
            vertical-align: middle
            margin-right: 6px
            font-size: $font-size-medium-x
          .text
            display: inline-block
            vertical-align: middle
            font-size: $font-size-small
      .filter
        position: absolute;
        top 0
        left: 0
        width: 100%
        height: 100%
        background: rgba(7, 17, 27, 0.4)
    .music-layer
      position: relative
      height: 100%
      background: $color-background
    .song-list
      position: fixed
      top: 0
      bottom: 0
      width: 100%
      background: $color-background
      .song-list-wrapper
        padding: 20px 30px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
