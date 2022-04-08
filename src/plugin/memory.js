import { checkNumber, formatKey } from '../utils'

const MEMORY_TYPES = [
  'jsHeapSizeLimit', // 内存大小限制
  'totalJSHeapSize', // 可使用的内存
  'usedJSHeapSize', // JS 对象（包括V8引擎内部对象）占用的内存
]

export function Memory(callback) {
  const { memory } = window.performance || {}

  if (!memory) return {}

  const result = Object.assign(
    ...MEMORY_TYPES.map((item) => ({ [formatKey(item)]: checkNumber(memory[item]) }))
  )

  callback(result)
}
