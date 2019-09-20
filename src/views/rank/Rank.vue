<template>
  <div class="rank" ref="rank">
    <scroll ref="rankScroll" class="rank-list">
      <ul>
        <li class="item">
          <div class="rank-icon">
            <img src="" alt="" width="100" height="100">
          </div>
          <ul class="song-list">
            <li class="song">
              <span></span>
              <span></span>
            </li>
          </ul>
        </li>
      </ul>
    </scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
export default {
  name: 'Rank',
  components: {Scroll}
}
</script>

<style lang="stylus" scoped>
  @import "~assets/stylus/variable"
  @import "~assets/stylus/mixin"
  .rank
    position fixed
    width 100%
    top 88px
    bottom 0
    .rank-list
      height 100%
      overflow hidden
      .item
        display flex
        margin 0 20px
        padding-top 20px
        height 100px
        &:last-child
          padding-bottom 20px
        .rank-icon
          flex 0 0 100px
          width 100px
          height 100px
        .song-list
          flex 1
          display flex
          flex-direction column
          justify-content center
          padding 0 20px
          height 100px
          overflow hidden
          background $color-highlight-background
          color $color-text-d
          font-size $font-size-small
          .song
            no-wrap()  /*mixin定义的css函数*/
            line-height 26px

</style>
