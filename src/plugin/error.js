import { onload, getLastEvent, getFirstPaintTime } from '../utils.js'

export const Errors = (cb) => {
  // js 运行时的错误捕获
  window.addEventListener(
    'error',
    (event) => {
      const lastEvent = getLastEvent() // 获取最后一个交互事件
      if (event.target && (event.target.src || event.target.href || e.target.currentSrc)) {
        resolve({
          error_listener: {
            filename: event.target.src || event.target.href || e.target.currentSrc,
            tagName: event.target.tagName,
            message: event.target.localName + ' is load error',
            selector: event.target,
            time: Date.now(),
          }
        })
      } else {
        cb({
          error_listener: {
            filename: event.filename, // 报错文件
            position: `${event.lineno}:${event.colno}`, // 行列位置
            message: event.message,
            selector: lastEvent || lastEvent.path,
            time: Date.now(),
          }
        })
      }
    },
    true
  )

  window.onerror = function (event, source, lineno, colno, error) {
    setTimeout(() => {
      colno = colno || (window.event && window.event.errorCharacter) || 0
      const result = {
        filename: source,
        position: `${lineno}:${colno}`,
        message: error && error.stack ? error.stack.toString() : event,
        time: Date.now(),
      }
      cb({ window_onerror: result })
    }, 0)
  }

  // 当Promise 被 reject 且没有 reject 处理器的时候，会触发 unhandledrejection 事件
  window.addEventListener(
    'unhandledrejection',
    (event) => {
      const lastEvent = getLastEvent()
      const result = {
        message: error.message,
        filename: '',
        position: '',
        stack: null,
      }
      result.message = typeof event.reason === 'string' ? event.reason : event.reason.message
      if (typeof event.reason === 'object') {
        if (event.reason.stack) {
          const match = event.reason.stack.match(/at\s+(.+):(\d+):(\d+)/)
          result.filename = match[1]
          result.position = `${match[2]}:${match[3]}`
        }
        stack = getLines(event.reason.stack)
      }
      cb({
        promise_error: {
          ...result,
          selector: lastEvent ? lastEvent.path : '',
        }
      })
    },
    true
  )
}

function getLines(stack) {
  return stack
    .split('\n')
    .slice(1)
    .map((item) => item.replace(/^\s+at\s+/g, ''))
    .join('^')
}
