/**
 * 为元素添加类名
 * @param el  dom元素
 * @param className  类名
 */
export function addClass (el, className) {
  el.classList.add(className)
}

/**
 * 判断元素是否包含类名
 * @param el  dom元素
 * @param className  类名
 * @returns {boolean}
 */
export function hasClass (el, className) {
  return el.classList.contains(className)
}

/**
 * 获取元素的属性值
 * @param el dom元素
 * @param name 属性名
 * @param value 属性值。   不传入就是获取值，传入就是赋值
 * @returns {*|ASTNode|string}
 */
export function getEleData (el, name, value) {
  const prefix = 'data-'
  name = prefix + name
  if (value) {
    return el.getAttribute(name, value)
  } else {
    return el.getAttribute(name)
  }
}

/**
 * 解决浏览器添加一些样式需要加前缀的问题
 */
let elementStyle = document.createElement('div').style
// 自检测
let vendor = (() => {
  // 各个浏览器厂商的前缀
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }

  for (const key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }

  // 如果都不满足，那这个浏览器肯定有毛病
  return false
})()

/**
 * css3属性添加前缀
 * @export
 * @param {any} style 样式
 * @returns 前缀+style
 */
export function prefixStyle(style) {
  if (vendor === false) {
    return false
  }

  if (vendor === 'standard') {
    return style
  }

  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}