/**
 *  通用的请求参数
 * @type {{}}
 */
export const commonParams = {
  g_tk: 1117927041,
  inCharset: 'utf-8',
  outCharset: 'utf-8',
  notice: 0,
  format: 'jsonp'
}
/**
 * jsonp函数的配置参数
 * @type {{param: string, prefix: string}}
 */
export const option = {
  param: 'jsonpCallback', // 跟qq音乐后端的参数一致
  prefix: 'jp'
}
// 定义响应常量
export const RES_OK = 0
