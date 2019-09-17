import axios from 'axios'
// eslint-disable-next-line no-unused-vars
import { commonParams } from '../common/networkConfig'

/**
 * 获取歌手列表数据
 * @returns {Promise<AxiosResponse<T>>}
 */
export function getSingerList () {
  const url = '/api/getSingerList'
  const data = {
    'comm': {
      'ct': 24,
      'cv': 0 },
    'singerList': {
      'module': 'Music.SingerListServer',
      'method': 'get_singer_list',
      'param': {
        'area': -100,
        'sex': -100,
        'genre': -100,
        'index': -100,
        'sin': 0,
        'cur_page': 1}
    }
  }
  const reqdata = Object.assign({}, commonParams, {
    '-': 'getUCGI04007902830541732',
    g_tk: 1091597660,
    hostUin: 0,
    format: 'json',
    platform: 'yqq.json',
    needNewCode: 0,
    data: JSON.stringify(data)
  })
  return axios.get(url, {
    params: reqdata
  }).then(res => {
    return Promise.resolve(res.data)
  }).catch(err => {
    console.log(err)
  })
}

/**
 * 获取歌手详情数据
 * @param singerId  歌手的singermid  必须
 * @param num 歌曲数量  默认值是20条   非必须
 * @returns {Promise<AxiosResponse<T>>}
 */
export function getSingerDetail (singerId, num = 20) {
  const url = '/api/getSingerDetail'
  const data = {
    'comm': {
      'ct': 24,
      'cv': 0 },
    'singer': {
      'method': 'get_singer_detail_info',
      'param': {
        'sort': 5,
        'singermid': singerId,
        'sin': 0,
        num
      },
      'module': 'music.web_singer_info_svr'
    }
  }
  const reqdata = Object.assign({}, commonParams, {
    '-': 'getUCGI04007902830541732',
    g_tk: 1091597660,
    hostUin: 0,
    format: 'json',
    platform: 'yqq.json',
    needNewCode: 0,
    data: JSON.stringify(data)
  })
  return axios.get(url, {
    params: reqdata
  }).then(res => {
    return Promise.resolve(res)
  }).catch(err => {
    console.log(err)
  })
}
