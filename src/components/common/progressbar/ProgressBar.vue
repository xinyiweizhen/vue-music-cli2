<template>
  <div class="progress-bar" ref="progressBar" @click="progressBarClick">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-bar-wrapper"
        @touchstart="progressTouchStart"
        @touchmove="progressTouchMove"
        @touchend="progressTouchEnd">
        <div class="progress-btn" ref="progressBtn"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { prefixStyle } from 'common/dom'

const transform = prefixStyle('transform')
// 样式中定义了进度条按钮的width为16px
const progressBtnClientWidth = 16

export default {
  name: 'ProgressBar',
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      touch: {} // 进度条拖动的当前状态
    }
  },
  methods: {
    // 开始拖动
    progressTouchStart(event) {
      // 为touch设置状态
      this.touch.inited = true
      // 拖动开始的x轴
      this.touch.startX = event.touches[0].pageX
      // 进度条的长度
      this.touch.left = this.$refs.progress.clientWidth
    },
    // 拖动中
    progressTouchMove(event) {
      if (!this.touch.inited) {
        return
      }
      // 拖动的距离
      const differX = event.touches[0].pageX - this.touch.startX
      // 总的偏移量
      const offsetWidth = Math.min(this.$refs.progressBar.clientWidth, Math.max(0, differX + this.touch.left))
      this._doOffset(offsetWidth)
    },
    // 拖动完成
    progressTouchEnd() {
      this.touch.inited = false
      // 这个时候，歌曲的实际进度还没有改变，那么派发一个改变当前进度百分比的事件给外面调用
      this._triggerPercent()
    },
    setProgressOffset(percent) {
      // 在拖动过程中不要监听percent的变化
      if (percent >= 0 && !this.touch.inited) {
        const barWidth = this.$refs.progressBar.clientWidth - progressBtnClientWidth
        const offsetWidth = barWidth * percent
        this._doOffset(offsetWidth)
      }
    },
    progressBarClick(event) {
      console.log(event)
      // 获取一个el的矩形属性，rect 是一个具有四个属性left、top、right、bottom的DOMRect对象
      // DOMRect 对象包含了一组用于描述边框的只读属性——left、top、right和bottom，
      // 单位为像素。除了 width 和 height 外的属性都是相对于视口的左上角位置而言的
      const rect = this.$refs.progressBar.getBoundingClientRect()
      // 偏移量是点击的点到左窗口的距离减去，进度条这个矩形离左窗口的距离
      const offsetWidth = event.pageX - rect.left
      // 设置样式
      this._doOffset(offsetWidth)
    },
    _doOffset(offsetWidth) {
      // 进度条的偏移
      this.$refs.progress.style.width = `${offsetWidth}px`
      // 按钮的偏移
      this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px,0,0)`
    },
    // 派发一个事件给外边调用
    _triggerPercent() {
      this.$emit('percentChange', this._getPercent())
    },
    _getPercent() {
      // 求出进度条的width
      const barWidth = this.$refs.progressBar.clientWidth - progressBtnClientWidth
      // 算出百分比并return
      return this.$refs.progress.clientWidth / barWidth
    }
  },
  watch: {
    // 歌曲播放百分比
    percent(newPercent) {
      this.setProgressOffset(newPercent)
    }
  }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
  @import "~assets/stylus/variable"

  .progress-bar
    height 30px
    .bar-inner
      position relative
      top 13px
      height 4px
      background rgba(0, 0, 0, 0.3)
      .progress
        position absolute
        height 100%
        background $color-theme
      .progress-bar-wrapper
        position absolute
        left -8px
        top -13px
        width 30px
        height 30px
        .progress-btn
          position relative
          top 7px
          left 7px
          box-sizing border-box
          width 16px
          height 16px
          border 3px solid $color-text
          border-radius 50%
          background $color-theme
</style>