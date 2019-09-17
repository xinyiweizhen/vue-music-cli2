<template>
  <div class="recommend">
    <scroll ref="scroll" class="recommend-content">
      <div class="swiper-wrapper" v-if="banners.length">
        <swiper ref="swiper" >
          <div v-for="item in banners" :key="item.id">
            <a :href="item.linkUrl">
              <img :src="item.picUrl" alt="" @load="loadImg"/>
            </a>
          </div>
        </swiper>
      </div>
      <div class="recommends-list">
        <h1 class="list-title" >热门歌单推荐</h1>
        <ul>
          <li v-for="item in dissList" :key="item.dissid" class="item">
            <div class="diss-img">
              <img v-lazy="item.imgurl" :alt="item.dissname" width="60" height="60">
            </div>
            <div class="diss-text">
              <h2 class="name">{{item.dissname}}</h2>
              <p class="desc"></p>
            </div>
          </li>
        </ul>
      </div>
      <!--loading-->
      <div class="loading" v-show="!dissList.length">
        <Loading></Loading>
      </div>
    </scroll>
  </div>
</template>

<script>
import Swiper from 'components/common/swiper/Swiper'
import Scroll from 'components/common/scroll/Scroll'
import Loading from 'components/common/loading/Loading'

import {getSliderImg, getDissList} from 'network/recommend'
import {RES_OK} from 'common/networkConfig'

export default {
  name: 'Recommend',
  components: {
    Scroll,
    Swiper,
    Loading
  },
  data() {
    return {
      banners: [],
      dissList: [],
      checkLoaded: false
    }
  },
  created () {
    this._getSliderImg()
    this._getDissList()
  },
  methods: {
    _getSliderImg() {
      getSliderImg().then(res => {
        // console.log(res)
        if (RES_OK === res.code) {
          this.banners = res.data.slider
        }
      })
    },
    _getDissList() {
      getDissList().then(res => {
        if (RES_OK === res.code) {
          // console.log(res)
          this.dissList = res.data.list
        }
      })
    },
    loadImg() {
      // 一张图片渲染就行了
      if (!this.checkLoaded) {
        this.$refs.scroll && this.$refs.scroll.Refresh()
        this.checkLoaded = true
      }
    }

  }
}
</script>

<style lang="stylus" scoped>
  @import "~assets/stylus/variable"
  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .swiper-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommends-list
        .list-title
          height 65px
          line-height 65px
          text-align center
          font-size $font-size-medium
          color $color-theme
        .item
          display flex
          align-items center
          padding 0 20px 20px 20px
          box-sizing border-box
          .diss-img
            flex-basis 60px
            width 60px;
            padding-right 20px
          .diss-text
            display flex
            flex-direction column
            justify-content center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading
        position absolute
        width 100%
        top 50%
        transform translateY(-50%)
</style>
