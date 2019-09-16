<template>
  <div class="slider" ref="slider">
      <div class="slider-group" ref="sliderGroup">
          <slot></slot>
      </div>
      <div class="dots">
          <span class="dot" v-for="(item, index) in dots" :key="index" :class="{active: currentPageIndex === index}"></span>
      </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import {addClass} from 'common/dom'

export default {
  name: 'Swiper',
  props: {
    isLoop: { // 是否可以轮播
      type: Boolean,
      default: true
    },
    autoPlay: { // 自动轮播
      type: Boolean,
      default: true
    },
    interval: { // 自动录播间隔
      type: Number,
      default: 3000
    }
  },
  data() {
    return {
      dots: [],
      currentPageIndex: 0
    }
  },
  mounted() {
    setTimeout(() => {
      this._setSliderWidth(false)// 横向滚动，要先设置slider的宽度
      this._initDots()
      this._initSlider()
      if (this.autoPlay) {
        this._play()
      }
    }, 20)
    window.addEventListener('resize', () => {
      if (!this.slider || !this.slider.enabled) {
        return
      }
      clearTimeout(this.resizeTimer)
      this.resizeTimer = setTimeout(() => {
        // 判断当前 scroll 是否处于滚动动画过程中
        if (this.slider.isInTransition) {
          this._onScrollEnd()
        } else {
          if (this.autoPlay) {
            this._play()
          }
        }
        this.refresh()
      }, 60)
    })
  },
  // keep-alive 组件激活时，slider再次被激活，并归于初始化状态
  activated() {
    if (this.slider) {
      this.slider.enable()
      let pageIndex = this.slider.getCurrentPage().pageX
      this.slider.goToPage(pageIndex, 0, 0)
      this.currentPageIndex = pageIndex
      if (this.autoPlay) {
        this._play()
      }
    }
  },
  deactivated() {
    this.slider.disable()
    clearTimeout(this.timer)
  },
  beforeDestroy() {
    this.slider.disable()
    clearTimeout(this.timer)
  },
  methods: {
    /**
       * 设置slider的宽度
       */
    _setSliderWidth(isResize) {
      // 获取sliderGroup下children的dom,注意作用域是本组件this
      this.children = this.$refs.sliderGroup.children
      let sliderWidth = 0
      // 轮播图宽度是一屏，slider的宽度=所有轮播图宽度之和  可是窗口的宽度
      let clientWidth = this.$refs.slider.clientWidth
      // 计算整个轮播的视口应该有多宽
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i]
        // 轮播组件设置样式，让img自适应宽度
        addClass(child, 'slider-item')
        child.style.width = clientWidth + 'px'
        sliderWidth += clientWidth
      }

      // 因为bscroll为了无缝切换轮播，会前后克隆一个child，所以我们算宽度要加两个，如果是窗口改变，那么不增加，之前已经加过了
      if (this.isLoop && !isResize) {
        sliderWidth += 2 * clientWidth
      }
      this.$refs.sliderGroup.style.width = sliderWidth + 'px'
      console.log(sliderWidth)
    },
    /**
       * 初始化better-scroll
       */
    _initSlider() {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true, // 横向滚动
        scrollY: false, // 不允许纵向滚动
        momentum: false, // 当快速滑动时是否开启滑动惯性
        snap: {
          loop: this.isLoop, // 是否可以无缝循环轮播
          threshold: 0.3, // 手动切换时的阈值
          speed: 400
        }
      })

      // 每次轮播图滚动完毕的时候触发
      this.slider.on('scrollEnd', this._onScrollEnd)

      this.slider.on('touchend', () => {
        if (this.autoPlay) {
          this._play()
        }
      })
      // 监听滚动开始之前  把定时器清楚了
      this.slider.on('beforeScrollStart', () => {
        if (this.autoPlay) {
          clearTimeout(this.timer)
        }
      })
    },
    _onScrollEnd () {
      let pageIndex = this.slider.getCurrentPage().pageX
      // 滚动到第几个图片，从0开始，与index对应
      this.currentPageIndex = pageIndex // 设置dots的index
      if (this.autoPlay) {
        this._play()
      }
    },
    _initDots() {
      this.dots = new Array(this.children.length) // 一个长度为5的空数组
    },
    _play() {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        // 滚动到下一页
        this.slider.next()
      }, this.interval)
    },
    refresh() {
      if (this.slider) {
        this._setSliderWidth(true)
        this.slide.refresh()
      }
    }

  }
}
</script>

<style lang="stylus" scoped>
  @import "~assets/stylus/variable"
  .slider
    min-height: 1px
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>
