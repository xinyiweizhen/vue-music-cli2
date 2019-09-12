<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
import { getSliderImg, getDissList, getSongList } from 'network/recommend'
import { getSingerList, getSingerDetail } from 'network/singer'

export default {
  name: 'App',
  created () {
    // this._getSliderImg()
    // this._getDissList()
    // this._getSongList()
    this._getSingerList()
    this._getSingerDetail()
  },
  methods: {
    _getSliderImg() {
      getSliderImg().then(res => {
        console.log(res)
      })
    },
    _getDissList() {
      getDissList().then(res => {
        console.log(res)
      })
    },
    _getSongList() {
      const disstid = '7195390135'
      getSongList(disstid).then(res => {
        console.log(res)
      })
    },
    _getSingerList() {
      getSingerList().then(res => {
        console.log(res)
      })
    },
    _getSingerDetail() {
      const singermid = '001fNHEf1SFEFN'
      getSingerDetail(singermid).then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style>
#app {
}
</style>
