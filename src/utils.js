/**
 * @type {string}
 */
const IMAGES = 'images'

/**
 * @type {string}
 */
const CSS = 'css'

/**
 * @type {string}
 */
const JAVASCRIPT = 'javascript'

/**
 * @type {string}
 */
const VIDEO = 'video'

/**
 * @type {string}
 */
const OTHERS = 'others'

const eventList = ['click', 'touchstart', 'mousedown', 'keydown', 'mouseover']

const isNaN = Number.isNaN || window.isNaN
const isFinite = Number.isFinite || window.isFinite
const parseFloat = Number.parseFloat || window.parseFloat
const { MAX_SAFE_INTEGER = 9007199254740991 } = Number

const handleAddEventListener = (type, fn) => {
  if (window.addEventListener) {
    window.addEventListener(type, fn, { once: true })
  } else {
    window.attachEvent('on' + type, fn, { once: true })
  }
}

export function getLastEvent() {
  let lastEvent
  eventList.forEach((eventType) => {
    document.addEventListener(
      eventType,
      (event) => {
        lastEvent = event
      },
      {
        capture: true, // 是在捕获阶段还是冒泡阶段执行
        passive: true, // 默认不阻止默认事件
      }
    )
  })
  return lastEvent
}

export function onload(callback) {
  if (document.readyState === 'complete') {
    callback()
  } else {
    handleAddEventListener('load', callback)
  }
}

export function getFirstPaintTime(timing) {
  let firstPaintTime = 0
  if (window.chrome && typeof window.chrome.loadTimes === 'function') {
    firstPaintTime = window.chrome.loadTimes().firstPaintTime * 1000
  } else if (typeof timing.msFirstPaint === 'number') {
    firstPaintTime = timing.msFirstPaint
  }
  return Math.round(firstPaintTime)
}

export function formatMs(ms, readable = true) {
  if (!ms) ms = 0
  let ret = `${ms.toFixed(2)} ms`
  if (!readable) return ret
  const ONE_SECOND = 1000
  const ONE_MINUTE = 60 * ONE_SECOND
  const ONE_HORE = 60 * ONE_MINUTE
  // 小于1秒，那么用毫秒为单位
  if (ms >= ONE_SECOND && ms < ONE_MINUTE) {
    // 大于一秒小于一分钟，用秒作为单位
    ret = `${(ms / 1000).toFixed(2)} s`
  } else if (ms >= ONE_MINUTE && ms < ONE_HORE) {
    // 大于一分钟，小于一小时，用分钟作单位
    ret = `${(ms / 1000 / 60).toFixed(2)} m`
  } else if (ms >= ONE_HORE) {
    // 大于一个小时，用小时作单位
    ret = `${(ms / 1000 / 60 / 60).toFixed(2)} h`
  }
  return ret
}

export function checkNumber(number) {
  if (typeof number !== 'number') return

  const value = parseFloat(number)

  if (isNaN(value)) return

  if (value < 0) return

  if (!isFinite(value)) return

  if (value > MAX_SAFE_INTEGER) return MAX_SAFE_INTEGER

  return value
}

export function checkResourceType(name) {
  if (/\.(gif|jpg|jpeg|png|webp|svg)/i.test(name)) {
    return IMAGES
  }
  if (/\.(js)/i.test(name)) {
    return JAVASCRIPT
  }
  if (/\.(css)/i.test(name)) {
    return CSS
  }
  if (/\.(mp4|rm|rmvb|mkv|avi|flv|ogv|webm)/i.test(name)) {
    return VIDEO
  }
  return OTHERS
}

export function formatKey(key) {
  return key
    .replace(/([A-Z])/g, '_$1')
    .replace(/-/g, '_')
    .toLowerCase()
    .replace(/_j_s_/g, '_js_')
}

export function deepClone(args) {
  return JSON.parse(JSON.stringify(args))
}
