import { getLastEvent } from '../utils.js'

export const getTiming = () => {
  return new Promise((resolve, reject) => {
    let timing = {}

    if (!window.performance.timing && !window.PerformanceNavigationTiming) {
      reject(new Error('Performance Error: this browser does not support performance timing'))
    }

    if (window.performance.timing) timing = window.performance.timing
    
    // 优先使用 navigation v2  https://www.w3.org/TR/navigation-timing-2/
    if (typeof window.PerformanceNavigationTiming === 'function') {
      try {
        const nt2Timing = performance.getEntriesByType('navigation')[0]
        if (nt2Timing) timing = nt2Timing
      } catch (err) {
        reject(new Error(`Performance Error: ${err}`))
      }
    }
    resolve(timing)
  })
}

export const getEntries = (...entryTypes) => {
  return new Promise((resolve, reject) => {
    try {
      if (!window.performance) 
        reject(new Error('Performance Error: Performance API is not supported'))
      
      if (!entryTypes.length) 
        reject(
          new TypeError(
            'Performance Error: A Performance Observer must have a non-empty entryTypes attribute'
          )
        )
      
      const getEntryMethod = window.performance.getEntriesByType
        ? 'getEntriesByType'
        : window.performance.webkitGetEntriesByType
        ? 'webkitGetEntriesByType'
        : ''

      const entries = getEntryMethod
        ? [].concat(...entryTypes.map((entryType) => window.performance[getEntryMethod](entryType)))
        : []

      if (entries.length) resolve(entries)

      if (typeof window.PerformanceObserver !== 'function') 
        reject(new Error('Performance Error: PerformanceObserver is not supported'))

      const observer = new window.PerformanceObserver((entryList, observer) => {
        resolve(entryList.getEntries())
        observer.disconnect()
      })

      try {
        observer.observe({ entryTypes })
      } catch (e) {
        observer.disconnect()
        reject(e)
      }
    } catch (e) {
      reject(e)
    }
  })
}

export const FirstInput = () => {
  return new Promise((resolve, reject) => {
    try {
      if (typeof window.PerformanceObserver !== 'function') 
        reject(new Error('Performance Error: PerformanceObserver is not supported'))
      // 观察首次交互
      new PerformanceObserver((entryList, observer) => {
        const firstInput = entryList.getEntries()[0]
        if (firstInput) {
          // 处理延迟 = 开始处理的时间 - 开始点击的时间
          const inputDelay = firstInput.processingStart - firstInput.startTime
          const duration = firstInput.duration // 处理的耗时
          if (inputDelay > 0 || duration > 0) {
            const data = {
              first_input_delay: inputDelay,
              first_input_duration: duration,
              first_input_start_time: firstInput.startTime, // 开始处理的时间
            }
            resolve(data)
          }
        }
        observer.disconnect()
      }).observe({ type: 'first-input', buffered: true })
    } catch(err) {
      reject(err)
    }
  })
}

export const LongTask = () => {
  return new Promise((resolve, reject) => {
    try {
      if (typeof window.PerformanceObserver !== 'function') 
        reject(new Error('Performance Error: PerformanceObserver is not supported'))

      new PerformanceObserver((entryList, observer) => {
        entryList.getEntries().forEach((entry) => {
          if (entry.duration > 100) {
            const lastEvent = getLastEvent()
            requestIdleCallback(() => {
              resolve({
                long_task_event_type: lastEvent.type,
                long_task_start_time: entry.startTime,
                long_task_duration: entry.duration,
                selector: lastEvent ? lastEvent.path || lastEvent.target : '',
              })
            })
          }
        })
        observer.disconnect()
      }).observe({ entryTypes: ['longtask'] })
    } catch (err) {
      reject(err)
    }
  })
}
