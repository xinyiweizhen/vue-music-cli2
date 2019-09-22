
export const singer = state => state.singer

export const playStatus = state => state.playStatus

export const isFullScreen = state => state.isFullScreen

export const playList = state => state.playList

export const sequenceList = state => state.sequenceList

export const mode = state => state.mode

export const currentIndex = state => state.currentIndex

export const currentSong = (state) => {
  // 取不到就设一个空对象
  return state.playList[state.currentIndex] || {}
}
