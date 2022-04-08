import { getTiming } from './data'
import { getLastEvent, getFirstPaintTime } from '../utils'

export function Timing(callback) {
  const timing = getTiming()
  const startTime = timing.navigationStart || timing.fetchStart
  const result = {
    // 重定向时间
    redirect_time: timing.redirectEnd - timing.redirectStart,

    // dns查询耗时
    dns_time: timing.domainLookupEnd - timing.domainLookupStart,

    // TTFB 读取页面第一个字节的时间
    ttfb_time: timing.responseStart - startTime,

    // DNS 缓存时间
    appcache_time: timing.domainLookupStart - startTime,

    // 卸载页面的时间
    unload_time: timing.unloadEventEnd - timing.unloadEventStart,

    // tcp连接耗时
    tcp_time: timing.connectEnd - timing.connectStart,

    // request请求耗时
    request_time: timing.responseEnd - timing.responseStart,

    // 解析dom树耗时
    analysis_time: timing.domComplete - timing.domInteractive,

    // 白屏时间
    blank_time: (timing.domInteractive || timing.domLoading) - startTime,

    // 首屏时间
    firstPaint_time: getFirstPaintTime() - startTime,

    // domReadyTime
    dom_ready_time: timing.domContentLoadedEventEnd - startTime,

    // 页面加载完成的时间
    page_loaded_time: timing.loadEventEnd - startTime,

    // 开始加载文档到文档资源全部加载完毕的时间
    processing_time: timing.loadEventStart - timing.domLoading,

    // 执行 onload 回调函数的时间
    onload_time: timing.loadEventEnd - timing.loadEventStart,

    redirectStart: timing.redirectStart ? timing.redirectStart - startTime : 0,
    AppCacheStart: timing.fetchStart - startTime,
    dnsStart: timing.domainLookupStart ? timing.domainLookupStart - startTime : 0,
    connectStart: timing.connectStart - startTime,
    sslStart: timing.secureConnectionStart ? timing.secureConnectionStart - startTime : 0,
    requestStart: timing.requestStart - startTime,
    downloadStart: timing.responseStart - startTime,
    processingStart: timing.responseEnd - startTime,
    domLoadingStart: timing.domLoading - startTime,
    loadEventStart: timing.loadEventStart - startTime,

    firstByteTime: timing.responseStart - timing.requestStart,
    domInteractiveTime: timing.domInteractive - startTime,
    domCompleteTime: timing.domComplete - startTime,
    pageLoadTime: timing.loadEventStart - startTime,
    visualCompleteTime: timing.visualCompleteTime - startTime,

    redirectTime: timing.redirectEnd - timing.redirectStart,
    appCacheTime: timing.domainLookupStart - timing.fetchStart,
    dnsTime: timing.domainLookupEnd - timing.domainLookupStart,
    // connectTime and sslTime time depend on whether secureConnectionStart has a value > 0
    connectTime: (timing.secureConnectionStart || timing.connectEnd) - timing.connectStart,
    sslTime: timing.connectEnd - (timing.secureConnectionStart || timing.connectEnd),
    downloadTime: timing.responseEnd - timing.responseStart,
    processingTime: timing.loadEventStart - timing.responseEnd,
    loadingTime: timing.loadEventEnd - timing.loadEventStart,
  }
  for (const key in result) {
    // 删除无用数据，避免干扰(小于等于0或大于两分钟)
    if (result[key] <= 0 || result[key] >= 120000) delete result[key]
  }
  callback(result)
}

export async function FirstInput(callback) {
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
        callback(data)
      }
    }
    observer.disconnect()
  }).observe({ type: 'first-input', buffered: true })
}

export function LongTask(callback) {
  new PerformanceObserver((entryList, observer) => {
    entryList.getEntries().forEach((entry) => {
      if (entry.duration > 100) {
        const lastEvent = getLastEvent()
        requestIdleCallback(() => {
          callback({
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
}
