<template>
  <div class="singer">
      <list-view></list-view>
  </div>
</template>

<script>
import ListView from 'components/content/listview/ListView'

import {getSingerList} from 'network/singer'

import {RES_OK} from 'common/networkConfig'
import Singer from 'common/Singer'

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
    _getSingerList() {
      getSingerList().then(res => {
        if (RES_OK === res.code) {
          console.log(res)
          // this.singers =
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
      list.forEach((item, index) => {
        if (index < HOT_SINGER_LENGTH) {
          map.hot.items.push(new Singer({
            id: item.singer_mid,
            name: item.singer_name
          }))
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
