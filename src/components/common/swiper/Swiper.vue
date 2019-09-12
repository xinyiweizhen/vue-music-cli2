<template>
  <div class="slider" ref="slider">
      <div class="slider-group">
          <slot></slot>
      </div>
      <div class="dots">
          <span class="dot" v-for="(item, index) in dots" :key="index" :class="{active: currentPageIndex === index}"></span>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Swiper',
  props: {
    isLoop:{    // 是否可以轮播
        type: Boolean,
        default: true
    },
    autoPlay:{  // 自动轮播
        type: Boolean,
        default: true
    },
    interval: { // 自动录播间隔
        type: Number,
        default: 3000
      }
  },
  data(){
    return {
      dots: [],
      currentPageIndex: 0
    }
  },
  mounted(){
      setTimeout(() => {
        this._setSliderWidth()// 横向滚动，要先设置slider的宽度
          
      }, 20);
  },
  methods: {
      /**
       * 设置slider的宽度
       */
      _setSliderWidth(isResize) {
        // 获取sliderGroup下children的dom,注意作用域是本组件this
        this.children = this.$refs.sliderGroup.children
        console.log(this.$refs.sliderGroup);
        
        let sliderWidth = 0
        // 轮播图宽度是一屏，slider的宽度=所有轮播图宽度之和
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
        if (this.loop && !isResize) {
          sliderWidth += 2 * clientWidth
        }
        this.$refs.sliderGroup.style.width = sliderWidth + 'px'
      },
      /**
       * 初始化better-scroll
       */
      _initSlider() {
        this.slider = new BetterScroll(this.$refs.slider, {
          scrollX: true, // 横向滚动
          scrollY: false, // 不允许纵向滚动
          momentum: false, // 当快速滑动时是否开启滑动惯性
          snap: {
            loop: this.loop, // 是否可以无缝循环轮播
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

        this.slider.on('beforeScrollStart', () => {
          if (this.autoPlay) {
            clearTimeout(this.timer)
          }
        })
      },
      _onScrollEnd () {
        let pageIndex = this.slider.getCurrentPage().pageX
        // 滚动到第几个图片，从0开始，与index对应
        this.currentPageIndex = pageIndex
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

</style>