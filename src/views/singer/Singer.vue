<template>
  <div class="singer">
      <list-view :list-data="singers" ref="list" @select="selectSinger"></list-view>
      <router-view></router-view>
  </div>
</template>

<script>
import ListView from 'components/content/listview/ListView'

import {getSingerList} from 'network/singer'

import {RES_OK} from 'common/networkConfig'
import Singer from 'common/Singer'

import Pinyin from 'pinyin'
import { mapMutations } from 'vuex'

const HOT_NAME = '热门'
const HOT_SINGER_LENGTH = 10

export default {
  name: 'Singer',
  components: {
    ListView
  },
  data() {
    return {
      singers: []
    }
  },
  created () {
    this._getSingerList()
  },
  methods: {
    selectSinger(singer) {
      this.$router.push({
        path: `/singer/${singer.id}`
      })
      this.setSinger(singer)
    },
    _getSingerList() {
      getSingerList().then(res => {
        if (RES_OK === res.code) {
          // console.log(res)
          this.singers = this._initSingersData(res.singerList.data.singerlist)
        }
      })
    },
    _initSingersData(list) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      }
      let hasIndexList = []
      list.forEach((item, index) => {
        if (index < HOT_SINGER_LENGTH) {
          map.hot.items.push(new Singer({
            id: item.singer_mid,
            name: item.singer_name
          }))
        }
        const name = item.singer_name.substring(0, 1)
        // 引入汉语转拼音的库对每个item的歌手名称进行首字母的转换
        let indexName = Pinyin(name, {
          style: Pinyin.STYLE_FIRST_LETTER,
          heteronym: true
        })[0][0]
        item.index = indexName.toUpperCase()
        hasIndexList.push(item)
      })
      hasIndexList.forEach((item, index) => {
        const key = item.index
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push(new Singer({
          id: item.singer_mid,
          name: item.singer_name
        }))
      })
      // 对map对象进行排序处理
      let rent = []
      let hot = []
      for (let key in map) {
        let val = map[key]
        if (!/[a-z][A-Z]/.test(val.title)) {
          rent.push(val)
        } else if (val.title === HOT_NAME) {
          hot.push(val)
        }
      }
      // 排序
      rent.sort((a, b) => {
        return a.title.charAt(0).localeCompare(b.title.charAt(0))
      })
      return hot.concat(rent)
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
  }
}
</script>

<style lang="stylus" scoped>
  .singer
    position fixed
    top 88px
    bottom 0
    width 100%
</style>
