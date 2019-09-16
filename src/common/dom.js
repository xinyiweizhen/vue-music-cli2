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
