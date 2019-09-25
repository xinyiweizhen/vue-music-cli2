<template>
  <div class="music-list">
    <div class="back" @click="back">
      <i class="icon-back"></i>
    </div>
    <h1 class="title" v-html="title"></h1>
    <div class="music-bg" ref="BgImage" :style="ListBgStyle">
      <div class="play-wrapper">
        <div class="play-btn"
             ref="playBtn"
             @click="randomPlay"
             v-show="songs.length > 0" >
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div class="filter" ref="filter"></div>
    </div>
    <!--往上滑的遮罩-->
    <div class="music-layer" ref="layer"></div>
    <scroll class="song-list" ref="list"
            :data="songs"
            :probe-type="probeType"
            :is-listen-scroll="IsListenScroll"
            @scroll="scroll">
      <div class="song-list-wrapper">
        <song-list :songs="songs" @select="SelectedSong" ></song-list>
      </div>
      <!-- <div class="loading-container" v-show="!songs.length">
        <loading></loading>
      </div> -->
    </scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
import Loading from 'components/common/loading/Loading'
import SongList from 'components/common/songlist/SongList'

import { prefixStyle } from 'common/dom'

import { mapActions } from 'vuex'

// 标题的高度
const RESERVED_HEIGHT = 40

const transform = prefixStyle('transform')
// const BackDropFilter = prefixStyle('backdrop-filter')

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
    ListBackground: {
      type: String,
      default: ''
    },
    // 标题
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      scrollY: 0, // songlist偏移量
      minTransalteY: 0 // bglayer滚动的最大高度
    }
  },
  computed: {
    // 设置样式
    ListBgStyle() {
      return `background-image : url(${this.ListBackground})`
    }
  },
  created() {
    this.probeType = 3
    this.IsListenScroll = true
  },
  mounted() {
    // 记录歌手图片的高度
    this.imageHeight = this.$refs.BgImage.clientHeight
    // songlist可移动的最小距离   减去图片高度 + 标题高度
    this.minTransalteY = -this.imageHeight + RESERVED_HEIGHT
    this.$refs.list.$el.style.top = this.imageHeight + 'px'
  },
  methods: {
    // 返回的方法
    back() {
      this.$router.back()
    },
    // Scroll组件派发的scroll事件
    scroll(pos) {
      this.scrollY = pos.y
    },
    randomPlay() {
    },
    SelectedSong(song, index) {
      this.selectPlay({
        list: this.songs,
        index
      })
    },
    ...mapActions({
      selectPlay: 'selectPlay'
    })
  },
  watch: {
    scrollY(newY) {
      // 不管怎么滚动都返回一个可移动的范围
      let translateY = Math.max(this.minTransalteY, newY)
      // 缩放倍数
      let scale = 1
      // 背景图片的z-index值
      let zIndex = 0
      // 高斯模糊的值
      // let blur = 0
      // 往下拉时图片的放大比例
      let percent = Math.abs(newY / this.imageHeight)
      // newY大于0,说明时往下拉
      if (newY > 0) {
        scale = 1 + percent
        zIndex = 10
      } else {
      // 模糊值最大20
        // blur = Math.min(20, percent * 20)
      }
      // bglayer层跟着歌曲向上滑动
      this.$refs.layer.style[transform] = `translate3d(0,${translateY}px,0)`
      // 当向上滑动超出屏幕时，把背景图片的z-index设大，盖住歌词，图片个高度固定死
      if (newY < this.minTransalteY) {
        zIndex = 10
        this.$refs.BgImage.style.paddingTop = 0
        this.$refs.BgImage.style.height = `${RESERVED_HEIGHT}px`
        // 上拉到顶部，把随机播放隐藏
        this.$refs.playBtn.style.display = 'none'
      } else { // 下拉还原原来的样式
        this.$refs.BgImage.style.paddingTop = '70%'
        this.$refs.BgImage.style.height = 0
        // // 正常情况下，按钮显示
        this.$refs.playBtn.style.display = ''
      }
      this.$refs.BgImage.style[transform] = `scale(${scale})`
      this.$refs.BgImage.style.zIndex = zIndex
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
      left 10px
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
