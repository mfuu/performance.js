import { Timing, FirstInput } from './plugin/timing'
import { Resources } from './plugin/resource'
import { Navigation } from './plugin/navigation'
import { Memory } from './plugin/memory'
import { Paint } from './plugin/paint'
import { Errors } from './plugin/error'
import { PageView } from './plugin/pv'
import { BlankScreen } from './plugin/blank'

import { onload, formatMs } from './utils'

class Performance {
  constructor(options) {
    this.options = options || {}
    // requestAnimationFrame(this.init.bind(this))
    // this._addEventListener()
    this.init()
  }

  init() {
    window.performance_information = {
      domain: encodeURIComponent(document.domain),
      path: encodeURIComponent(window.location.pathname.toLowerCase().replace(/\//g, '_')),
    }
    onload(() => {
      Timing(this._callback)
      FirstInput(this._callback)
      Resources(this._callback)
      Navigation(this._callback)
      BlankScreen(this._callback, this.options.wrapperElements)
      Memory(this._callback)
      Paint(this._callback)
      Errors(this._callback)
      PageView(this._callback)
    })
  }

  _callback(data) {
    window.performance_information = window.performance_information || {}
    Object.assign(window.performance_information, data)
    console.log(window.performance_information)
    console.log('DNS查询耗时：', formatMs(window.performance_information.dnsTime))
    console.log('TCP连接耗时:', formatMs(window.performance_information.tcpTime))
    console.log('解析dom树耗时:', formatMs(window.performance_information.analysisTime))
    console.log('白屏时间:', formatMs(window.performance_information.blankTime))
    console.log('重定向耗时:', formatMs(window.performance_information.redirectTime))
    console.log('读取页面第一个字节耗时:', formatMs(window.performance_information.ttfbTime))
    console.log('DOM Ready耗时:', formatMs(window.performance_information.domReadyTime))
    console.log('DNS 缓存时间:', formatMs(window.performance_information.appcacheTime))
    console.log('执行 onload 回调函数耗时:', formatMs(window.performance_information.onload))
    console.log('页面完全加载耗时:', formatMs(window.performance_information.loadPage))
    console.log(
      'js文件加载总耗时：',
      formatMs(window.performance_information.resources_javascript_duration)
    )
  }

  _print(result) {
    const table = document.createElement('table')
    table.innerHTML = Object.entries(result)
      .map(([key, value]) => `<tr><td>${key}</td><td>${value}</td></tr>`)
      .join('')

    document.body.appendChild(table)
  }

  _addEventListener() {
    // document.addEventListener('popstate', this.init())
    // document.addEventListener('hashchange', this.init())
  }
}


if (typeof require === 'function' && typeof exports === "object" && typeof module === "object") {
  module.exports = Performance
} else {
  window.Performance = Performance
}
