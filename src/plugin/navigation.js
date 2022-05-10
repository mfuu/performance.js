import { getEntries } from './data.js'

const NAVIGATION_TYPES = {
  0: 'navagate', // 网页通过点击链接、地址栏输入、表单提交、脚本操作等方式加载
  1: 'reload', // 用户通过刷新，包括JS调用刷新接口等方式访问页面
  2: 'history', // 用户通过后退按钮访问本页面
  255: 'unknown', // 任何其他来源的加载，相当于常数performance.navigation.TYPE_RESERVED
}

export async function Navigation() {
  const { connection } = window.navigator || {}

  const result = {}

  const [{ navigation = performance.navigation } = {}] = await getEntries('navigation')

  result.navigation_type =
    typeof navigation.type === 'number' ? NAVIGATION_TYPES[navigation.type] : navigation.type

  if (connection) {
    Object.assign(result, {
      redirect_count: navigation.redirectCount, // 重定向的数量（只读），但是这个接口有同源策略限制，即仅能检测同源的重定向；
      connection_type: connection.type,
      connection_effective_type: connection.effectiveType,
    })
  }

  return result
}
