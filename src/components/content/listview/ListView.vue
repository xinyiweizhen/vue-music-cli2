<template>
  <scroll class="listview" ref="listview"
          :is-listen-scroll="IsListenScroll"
          :probe-type="probeType"
          @scroll="scrollContent"
          :data="listData">
      <ul>
        <li v-for="group in listData" class="list-group" ref="listGroup" :key="group.title" >
          <h2 class="list-group-title">{{group.title}}</h2>
          <ul>
            <li class="list-group-item" v-for="singer in group.items" :key="singer.id" @click="selectItem(singer)">
              <img v-lazy="singer.avatar" :alt="singer.name" class="singer-avatar">
              <span class="singer-name">{{singer.name}}</span>
            </li>
          </ul>
        </li>
      </ul>
      <!--右边的字母列表-->
      <div class="list-shortcut" >
        <ul>
          <li class="shortcut-item" v-for="(item,index) in shortcutlist" :key="index" :class="{current: currentIndex===index }">
            {{item}}
          </li>
        </ul>
      </div>
      <!--列表顶部标题吸顶部分-->
      <div class="listtitle-fixed">
        <h1></h1>
      </div>
      <!--正在载入-->
      <div class="loading" v-if="!listData.length">
        <loading></loading>
      </div>
  </scroll>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
import Loading from 'components/common/loading/Loading'

export default {
  name: 'ListView',
  components: {
    Loading,
    Scroll
  },
  props: {
    listData: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  computed: {
    shortcutlist() {
      return this.listData.map((group) => {
        return group.title.substring(0, 1)
      })
    }
  },
  created () {
    this.IsListenScroll = true// 设置监听better-scroll滚动组件的滚动
    this.probeType = 3
  },
  methods: {
    scrollContent() {

    },
    selectItem(singer) {
      this.$emit('select', singer)
    },
    _calculateHeight() {
    }
  },
  watch: {
    listData() {
      setTimeout(() => {
        this._calculateHeight()
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~assets/stylus/variable"
  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .singer-avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .singer-name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 1
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .shortcut-item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
</style>
