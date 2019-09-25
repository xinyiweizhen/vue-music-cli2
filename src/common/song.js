
/**
 * 歌曲类
 */
export default class Song {
  constructor({id, mid, singer, name, album, duration, cover, url}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.cover = cover
    this.url = url
  }
}

/**
 * 获取歌手的歌曲
 * @param songData 请求返回的歌曲对象
 * @returns {Song}
 */
export function creacteSong(songData) {
  return new Song({
    id: songData.id,
    mid: songData.mid,
    type: songData.type,
    singer: songData.singer[0].name,
    name: songData.name,
    album: songData.album.name,
    duration: songData.interval,
    cover: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${songData.album.mid}.jpg?max_age=2592000`,
    url: songData.url
  })
}
