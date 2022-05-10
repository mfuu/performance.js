import { getTiming } from './data.js'
import { getFirstPaintTime } from '../utils.js'

export async function Timing() {
  const timing = await getTiming()
  const startTime = timing.navigationStart || timing.fetchStart
  const result = {
    redirect_time: timing.redirectEnd - timing.redirectStart, // 重定向时间
    dns_time: timing.domainLookupEnd - timing.domainLookupStart, // dns查询耗时
    ttfb_time: timing.responseStart - startTime, // TTFB 读取页面第一个字节的时间
    appcache_time: timing.domainLookupStart - startTime, // DNS 缓存时间
    unload_time: timing.unloadEventEnd - timing.unloadEventStart, // 卸载页面的时间
    tcp_time: timing.connectEnd - timing.connectStart, // tcp连接耗时
    request_time: timing.responseEnd - timing.responseStart, // request请求耗时
    analysis_time: timing.domComplete - timing.domInteractive, // 解析dom树耗时
    blank_time: (timing.domInteractive || timing.domLoading) - startTime, // 白屏时间
    firstPaint_time: getFirstPaintTime() - startTime, // 首屏时间
    dom_ready_time: timing.domContentLoadedEventEnd - startTime, // domReadyTime
    page_loaded_time: timing.loadEventEnd - startTime, // 页面加载完成的时间
    processing_time: timing.loadEventStart - timing.domLoading, // 开始加载文档到文档资源全部加载完毕的时间
    onload_time: timing.loadEventEnd - timing.loadEventStart, // 执行 onload 回调函数的时间
  }
  for (const key in result) {
    // 删除无用数据，避免干扰(小于等于0或大于两分钟)
    if (result[key] <= 0 || result[key] >= 120000) delete result[key]
  }
  return result
}
