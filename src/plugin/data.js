export function getTiming() {
  let timing = {}

  if (!window.performance.timing && !window.PerformanceNavigationTiming) {
    console.error('Performance Error: this browser does not support performance timing')
    return {}
  }

  if (window.performance.timing) {
    timing = window.performance.timing
  }

  // 优先使用 navigation v2  https://www.w3.org/TR/navigation-timing-2/
  if (typeof window.PerformanceNavigationTiming === 'function') {
    try {
      const nt2Timing = performance.getEntriesByType('navigation')[0]
      if (nt2Timing) timing = nt2Timing
    } catch (err) {
      //
    }
  }

  if (timing.loadEventEnd - timing.navigationStart < 0) {
    console.info('Page is still loading')
  }
  return timing
}

export const getEntries = (...entryTypes) =>
  new Promise((resolve, reject) => {
    try {
      if (!window.performance) {
        reject(new Error('Performance Error: Performance API is not supported'))
        return
      }

      if (!entryTypes.length) {
        reject(
          new TypeError(
            'Performance Error: A Performance Observer must have a non-empty entryTypes attribute'
          )
        )
        return
      }

      const getEntryMethod = window.performance.getEntriesByType
        ? 'getEntriesByType'
        : window.performance.webkitGetEntriesByType
        ? 'webkitGetEntriesByType'
        : ''

      const entries = getEntryMethod
        ? [].concat(...entryTypes.map((entryType) => window.performance[getEntryMethod](entryType)))
        : []

      if (entries.length) {
        resolve(entries)
        return
      }

      if (typeof window.PerformanceObserver !== 'function') {
        reject(new Error('Performance Error: PerformanceObserver is not supported'))
        return
      }

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
