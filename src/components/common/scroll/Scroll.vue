<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'Scroll',
  props: {
    // 实时监听滚动事件
    probeType: {
      type: Number,
      default: 0
    },
    // 手动派发滚动事件
    click: {
      type: Boolean,
      default: true
    },
    // 是否开启上拉加载
    pullup: {
      type: Boolean,
      default: false
    },
    // 滚动方向
    // 是否监听滚动事件
    IsListenScroll: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    this._initBscroll()
  },
  methods: {
    _initBscroll() {
      if (!this.$refs.wrapper) {
        return null
      }
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click,
        pullup: this.pullup
      })
      if (this.IsListenScroll) {
        // position:{Object} {x, y} 滚动的实时坐标
        this.scroll.on('scroll', (position) => {
          this.$emit('scroll', position) // 向外派发滚动事件
        })
      }
    },
    ScrollTo(x, y, time = 400) {
      this.scroll && this.scroll.scrollTo(x, y, time)
    },
    Refresh() {
      this.scroll && this.scroll.refresh()
    }
  }
}
</script>

<style scoped>

</style>
