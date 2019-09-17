import jsonp from 'common/jsonp'
import axios from 'axios'
// eslint-disable-next-line no-unused-vars
import { commonParams, option } from '../common/networkConfig'

/**
 * 获取轮播图数据
 * @private
 */
export function getSliderImg () {
  // qq音乐轮播图地址
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  // 合并请求参数对象
  // eslint-disable-next-line no-unused-vars
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })
  return jsonp(url, data, option)
}

/**
 * 获取歌单信息
 */
export function getDissList () {
  const url = '/api/getDiscList'
  const data = Object.assign({}, commonParams, {
    picmid: 1,
    rnd: Math.random(),
    hostUin: 0,
    format: 'json',
    platform: 'yqq.json',
    needNewCode: 0,
    categoryId: 10000000,
    sortId: 5,
    sin: 0,
    ein: 19
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
export function getSongList (disstid) {
  const url = '/api/getCdInfo'
  const data = Object.assign({}, commonParams, {
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    new_format: 1,
    disstid,
    hostUin: 0,
    format: 'json',
    platform: 'yqq.json',
    needNewCode: 0
  })
  return axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  })
}
