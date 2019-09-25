<template>
    <ul>
      <li v-for="(item,index) in songs" :key="item.mid" class="item" @click="selectedItem(item, index)">
        <div class="rank" v-show="rank">
          <span :class="addClass(index)">{{rankNum(index)}}</span>
        </div>
        <div class="content">
          <h2 class="name">{{item.name}}</h2>
          <p class="desc">{{SongDesc(item)}}</p>
        </div>
      </li>
    </ul>
</template>

<script>
export default {
  name: 'SongList',
  props: {
    songs: {
      type: Array,
      default() {
        return []
      }
    },
    rank: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    addClass(index) {
      if (index < 3) {
        return `icon icon-${index}`
      } else {
        return `text`
      }
    },
    rankNum(index) {
      if (index > 2) {
        return index + 1
      }
    },
    SongDesc(item) {
      return `${item.singer}-${item.album}`
    },
    selectedItem(item, index) {
      this.$emit('select', item, index)
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~assets/stylus/variable"
  @import "~assets/stylus/mixin"
  .item
    display flex
    align-items center
    box-sizing border-box
    height: 64px
    font-size $font-size-medium
    .rank
      flex 0 0 25px
      width 25px
      margin-right 30px
      text-align center
      .icon
        display inline-block
        width 25px
        height: 25 px
        background-size 25px
        &.icon-0
          bg-image(first)
        &.icon-1
          bg-image(second)
        &.icon-2
          bg-image(third)
      .text
        color: $color-theme
        font-size: $font-size-large
    .content
      flex 1
      line-height 20px
      overflow hidden
      .name
        no-wrap()
        color $color-text
      .desc
        no-wrap()
        margin-top 5px
        color $color-text-d
</style>
