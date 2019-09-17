<template>
  <scroll class="listview" ref="listview"
          :IsListenScroll="IsListenScroll"
          :probeType="probeType"
          @scroll="scrollContent">
    <ul>
      <li>
        <h2 class="list-group-title"></h2>
        <ul>
          <li class="list-group-item">
            <img src="" alt="" class="singer-avatar">
            <span class="singer-name"></span>
          </li>
        </ul>
      </li>
    </ul>
    <!--右边的字母列表-->
    <div class="list-shortcut" >
      <ul>
        <li class="shortcut-item">
        </li>
      </ul>
    </div>
    <!--列表顶部标题吸顶部分-->
    <div class="listtitle-fixed">
      <h1></h1>
    </div>
    <!--正在载入-->
    <div class="loading">
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
  created () {
    this.IsListenScroll = true// 设置监听better-scroll滚动组件的滚动
    this.probeType = 3
  },
  methods: {
    scrollContent() {

    }
  }
}
</script>

<style scoped>

</style>
