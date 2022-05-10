import { Timing } from './plugin/timing.js'
import { Resources } from './plugin/resource.js'
import { Navigation } from './plugin/navigation.js'
import { Memory } from './plugin/memory.js'
import { Paint } from './plugin/paint.js'
import { Errors } from './plugin/error.js'
import { PageView } from './plugin/pv.js'
import { BlankScreen } from './plugin/blank.js'

import { FirstInput, LongTask } from './plugin/data.js'

import { onload, formatMs } from './utils.js'


function Performance(options) {
  this.options = options || {}
  this._init()
}

Performance.prototype = {
  constructor: Performance,

  _init() {
    window.performanceInfo = {
      domain: encodeURIComponent(document.domain),
      href: window.location.href.toLowerCase(),
      path: encodeURIComponent(window.location.pathname.toLowerCase().replace(/\//g, '_')),
    }
    onload(() => {
      Errors((obj) => {
        Object.assign(window.performanceInfo, obj)
      })
      Promise.all([Timing(), Resources(), Navigation(), Memory(), Paint(), PageView(), BlankScreen()]).then(list => {
        list.forEach(item => {
          Object.assign(window.performanceInfo, item)
        })
        this._handleTiming()
      })
    })
  },
  _handleTiming() {
    console.log(window.performanceInfo)
  }
}

export default Performance
