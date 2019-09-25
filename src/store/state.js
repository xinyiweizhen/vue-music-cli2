import {Config} from 'common/playConfig'

const state = {
  // 歌手的详细信息
  singer: {},
  // 播放状态
  playStatus: false,
  // 播放器是全屏还是收起
  isFullScreen: true,
  // 播放列表
  playList: [],
  // 循环列表
  sequenceList: [],
  // 播放模式
  palyMode: Config.playMode.sequence,
  // 当前播放索引
  currentIndex: -1
}
export default state
