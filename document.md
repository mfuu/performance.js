# 前端页面性能检测

## 背景

页面性能检测概述：页面性能检测是针对于页面性能优化而展开的一种性能测试，目的是对 Web 系统的页面进行测试以确认系统页面是否会影响系统的性能，并为页面的优化提供依据与建议，最终提升系统的整体性能表现，提高用户体验满意度。
Web 系统页面性能测试是相对 web 系统后台测试的另一种性能测试，是 web 系统性能测试的一个重要部分。

## 性能测试的必要性

相对于 C/S 架构的应用系统，web 应用系统所有数据都需要从服务器下载，虽然浏览器有缓存机制，但客户端每次访问仍需要下载大量的数据。特别是用户对系统要求越来越高，除了要求功能完备，对界面的美观、易用性也提出了更高的要求。越是美观的页面包含的脚本、样式表、图片、数据量等也就也大，这对 web 系统的性能也提出了很大的挑战。

## 前端性能相关知识

### 输入 URL 到页面展示发生了什么

当浏览器地址栏输入url按下回车，整个过程都发生了什么。性能优化基本也是围绕这个过程展开的。

首先浏览器接收到URL，到网络请求线程的开启，一个完整的HTTP请求发出，服务器接收到请求并转到具体的处理服务，前后台之间的HTTP交互和涉及的缓存机制，浏览器接收到数据包的关键渲染路径，js引擎的解析过程。大致就是这样一个过程。

#### DNS 解析

首先会查找浏览器的缓存，如果找不到就去查找系统自身的DNS缓存，在没有就去查找系统的hosts文件，再找不到就去本地域名服务器提供商查询根域名服务器，如果还是找不到就去查找com顶级域名服务器，最后会去权限域名服务器查找，都没有找到就返回报错信息。这就是DNS查找的过程，其中任何一个环节慢了都会影响后续的操作。

#### TCP

建立TCP链接，主要是为了通过http对数据进行请求和发送。

由于TCP是面向有链接的通信协议，所以在传输数据之前需要建立好客户端与服务间的链接，即通常所说的三次握手。

#### 浏览器缓存

基于HTTP的缓存分为强缓存和协商缓存。
强缓存就是当浏览器判断出本地缓存未过期时，直接取本地缓存，无需发起请求，此时的状态为200 from cache，在HTTP1.1版本后通过头部的cache-control max-age属性值规定的过期时长来判断缓存是否失效，这比之前使用expires过期时间更准确并且安全。
协商缓存则需要浏览器发起HTTP请求，来判断浏览器本地缓存的文件是否改变。


### 浏览器渲染机制：

1. 解析 HTML 构建 DOM 树：从 html 标签的解析开始，将各种标签解析为 dom 树中的各个节点，标签和 dom 树的结点一一对应
2. 构建渲染树：将 CSS 和 style 标签中的样式信息解析为渲染树，渲染树由一些包含有颜色和大小等属性的矩形组成，将按照正确的顺序显示到屏幕上。
3. 渲染树布局：确定每个节点在屏幕上的确切位置
4. 渲染树绘制：遍历渲染树并用 UI 后端层将每一个节点绘制出来

### 性能测试相关指标：

* HTTP 相关
  * http 请求数

* 时间相关
  * 白屏时间：用户首次看到网页有关内容的时间，即第一次渲染流程完成的时间
  * 首屏时间：用户看到第一屏，即整个网页顶部大小为当前窗口的区域，显示完整的时间
  * 首资源下载时间：从开始下载到第一个资源下载完成的时间，不包括页面绘制时间
  * 总资源下载时间：从开始下载到所有资源下载完成的时间，不包括页面绘制时间
  * 用户可操作时间：从页面开始加载到用户操作可相应的时间

* WebView相关
  * 内存：加载页面前后内存变化，可间接反映资源数量和大小
  * CPU：当页面中资源样式复杂，强调视觉效果时，可观察CPU占用率来反映页面绘制质量

## 部分性能检测功能的实现

### 加载时间

字段                         | 含义                                                                                                                         |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| navigationStart            | 初始化页面，在同一个浏览器上下文中前一个页面unload的时间戳，如果没有前一个页面的unload,则与fetchStart值相等                                                          |
| redirectStart              | 第一个HTTP重定向发生的时间,有跳转且是同域的重定向,否则为0                                                                                           |
| redirectEnd                | 最后一个重定向完成时的时间,否则为0                                                                                                         |
| fetchStart                 | 浏览器准备好使用http请求获取文档的时间,这发生在检查缓存之前                                                                                           |
| domainLookupStart          | DNS域名开始查询的时间,如果有本地的缓存或keep-alive则时间为0                                                                                      |
| domainLookupEnd            | DNS域名结束查询的时间                                                                                                               |
| connectStart               | TCP开始建立连接的时间,如果是持久连接,则与`fetchStart`值相等                                                                                     |
| secureConnectionStart      | https 连接开始的时间,如果不是安全连接则为0                                                                                                  |
| connectEnd                 | TCP完成握手的时间，如果是持久连接则与`fetchStart`值相等                                                                                        |
| requestStart               | HTTP请求读取真实文档开始的时间,包括从本地缓存读取                                                                                                |
| requestEnd                 | HTTP请求读取真实文档结束的时间,包括从本地缓存读取                                                                                                |
| responseStart              | 返回浏览器从服务器收到（或从本地缓存读取）第一个字节时的Unix毫秒时间戳                                                                                      |
| responseEnd                | 返回浏览器从服务器收到（或从本地缓存读取，或从本地资源读取）最后一个字节时的Unix毫秒时间戳                                                                            |
| unloadEventStart           | 前一个页面的unload的时间戳 如果没有则为0                                                                                                   |
| unloadEventEnd             | 与`unloadEventStart`相对应，返回的是`unload`函数执行完成的时间戳                                                                              |
| domLoading                 | 返回当前网页DOM结构开始解析时的时间戳,此时`document.readyState`变成loading,并将抛出`readyStateChange`事件                                             |
| domInteractive             | 返回当前网页DOM结构结束解析、开始加载内嵌资源时时间戳,`document.readyState` 变成`interactive`，并将抛出`readyStateChange`事件(注意只是DOM树解析完成,这时候并没有开始加载网页内的资源) |
| domContentLoadedEventStart | 网页domContentLoaded事件发生的时间                                                                                                  |
| domContentLoadedEventEnd   | 网页domContentLoaded事件脚本执行完毕的时间,domReady的时间                                                                                  |
| domComplete                | DOM树解析完成,且资源也准备就绪的时间,`document.readyState`变成`complete`.并将抛出`readystatechange`事件                                            |
| loadEventStart             | load 事件发送给文档，也即load回调函数开始执行的时间                                                                                             |
| loadEventEnd               | load回调函数执行完成的时间


代码实现：

```js
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
  }
  for (const key in result) {
    // 删除无用数据，避免干扰(小于等于0或大于两分钟)
    if (result[key] <= 0 || result[key] >= 120000) delete result[key]
  }
  callback(result)
}
```

### 性能指标

| 指标 | 名称 | 解释 |
| --------- | ----- | ----- |
| FP | First-Paint 首次渲染 |表示浏览器从开始请求网站到屏幕渲染第一个像素点的时间|
| FCP | First-Contentful-Paint 首次内容渲染| 表示浏览器渲染出第一个内容的时间，这个内容可以是文本、图片或SVG元素等等，不包括iframe和白色背景的canvas元素|
| SI | Speed Index 速度指数| 表明了网页内容的可见填充速度|
| LCP | Largest Contentful Paint 最大内容绘制 | 标记了渲染出最大文本或图片的时间|
| TTI | Time to Interactive 可交互时间 | 页面从开始加载到主要子资源完成渲染，并能够快速、可靠的响应用户输入所需的时间|
| TBT | Total Blocking Time 总阻塞时间 | 测量 FCP 与 TTI 之间的总时间，这期间，主线程被阻塞的时间过长，无法作出输入响应|
| FID | First Input Delay 首次输入延迟 | 测量加载响应度的一个以用户为中心的重要指标|
| CLS | Cumulative Layout Shift 累积布局偏移 | 测量的是整个页面生命周期内发生的所有意外布局偏移中最大一连串的布局偏移分数|
| DCL | DOMContentLoaded | 当初始的 HTML 文档被完全加载和解析完成之后，DOMContentLoaded 事件被触发，而无需等待样式表、图像和子框架的完成加载|
| L | Load | 检测一个完全加载的页面，页面的html、css、js、图片等资源都已经加载完之后才会触发 load 事件|

代码实现：

```js
export async function FirstInput(callback) {
  new PerformanceObserver((entryList, observer) => {
    const firstInput = entryList.getEntries()[0]
    if (firstInput) {
      const inputDelay = firstInput.processingStart - firstInput.startTime
      const duration = firstInput.duration
      if (inputDelay > 0 || duration > 0) {
        const data = {
          first_input_delay: inputDelay,
          first_input_duration: duration,
          first_input_start_time: firstInput.startTime,
        }
        callback(data)
      }
    }
    observer.disconnect()
  }).observe({ type: 'first-input', buffered: true })
}

export async function Paint(callback) {
  const entries = await getEntries('paint')

  const result = Object.assign(
    {},
    ...[].concat(...entries.map(({ name, startTime }) => ({ [name]: checkNumber(startTime) })))
  )

  callback(result)
}
```

### longTask

entry.duration > 100 判断大于100ms，即可认定为长任务

代码实现：

```js
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
```

### 页面访问量

PV(page view) 是页面浏览量，只要访问一次页面就算一次

代码实现：

```js
export function Pv(callback) {
  const connection = navigator.connection
  callback({
    pv: {
      effectiveType: connection.effectiveType, //网络环境
      rtt: connection.rtt, //往返时间
      screen: `${window.screen.width}x${window.screen.height}`, //设备分辨率
    },
  })
  const startTime = Date.now()
  window.addEventListener(
    'unload',
    () => {
      const stayTime = Date.now() - startTime
      callback({ pv_stay_time: stayTime })
    },
    false
  )
}

```

### 内存监控

```js
export function Memory(callback) {
  const { memory } = window.performance || {}

  if (!memory) return {}

  const result = Object.assign(
    ...MEMORY_TYPES.map((item) => ({ [formatKey(item)]: checkNumber(memory[item]) }))
  )

  callback(result)
}
```

### 文件资源分类处理

```js
export async function Resources(callback) {
  const resources = await getEntries('resource')
  if (!resources.length) return

  const result = {}
  resources.forEach((item) => {
    const type = checkResourceType(item.name)
    add(result, type, 'count', 1)
    add(result, type, 'duration', item.duration)
    add(result, type, 'size', item.decodedBodySize)
    result[`${RESOURCES}_${type}_source`] = result[`${RESOURCES}_${type}_source`] || []
    result[`${RESOURCES}_${type}_source`].push(item)
  })
  callback(result)
}
```

### 错误监控

#### 资源加载错误 + js执行错误

```js
window.addEventListener(
    'error',
    (event) => {
      const lastEvent = getLastEvent() // 获取最后一个交互事件
      if (event.target && (event.target.src || event.target.href || e.target.currentSrc)) {
        callback({
          error_listener: {
            filename: event.target.src || event.target.href || e.target.currentSrc,
            tagName: event.target.tagName,
            message: event.target.localName + ' is load error',
            selector: event.target,
            time: Date.now(),
          },
        })
      } else {
        callback({
          error_listener: {
            filename: event.filename, // 报错文件
            position: `${event.lineno}:${event.colno}`, // 行列位置
            message: event.message,
            selector: lastEvent || lastEvent.path,
            time: Date.now(),
          },
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
      callback({ window_onerror: result })
    }, 0)
  }
```

#### promise 错误记录

```js
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
      callback({
        promise_error: {
          ...result,
          selector: lastEvent ? lastEvent.path : '',
        },
      })
    },
    true
  )
```

## 前端性能优化方法

### 网络加载

#### 减少请求和相应的往返次数

HTTP 缓存是最好的减少客户端和服务器之间往返次数的方法。缓存提供了一种机制来保证客户端或者代理能够存储资源，这些资源会在 HTTP 响应中用到，这样就不用让文件再次跨越整个网络了。

当客户端需要一个资源文件时，一般有3种可能的动作：

* 发送一个 HTTP 请求到服务器，请求这个资源文件
* 发送一个有条件的 HTTP 请求到服务器，条件就是与本地的缓存版本不同
* 如果缓存文件可用，直接使用缓存的资源文件
  
#### 减少请求往返的字节大小

* 将CSS压缩到一个文件中
* 将所有的脚本压缩到一个JS文件中
* 使用HTTP压缩

#### 将 CSS 或 JavaScript 放到外部文件中，避免使用 style 或 script 标签直接引入

在 HTML 文件上引用外部资源可以有效利用浏览器的静态资源缓存，但有时在移动端页面 CSS 或 JavaScript 比较简单的情况下为了减少请求，也会将 CSS 或 JavaScript 直接写道 HTML 里，具体根据业务场景和文件大小来分析。

如果 CSS 或 JavaScript 文件内容较多，业务逻辑复杂，建议放到外部文件引入

```js
<link rel="stylesheet" href="/css/xxx.css">
<script type="text/javascript" src="//cdn.domain.com/path/xxx.js"></script>
```

#### 避免使用空的 href 和 src

当 `<link>` 标签的 href 属性为空，或 `<script>、<img>、<iframe>` 标签的 src 属性为空时，浏览器在渲染过程中仍会将 href 属性或者 src 属性中的空内容进行加载，直至加载失败，这样就阻塞了页面中其他资源的下载进程，而且最终加载到的内容是无效的，因此要尽量避免。

#### 减少页面重定向

页面每次重定向都会延长页面内容返回的等待延时，一次重定向大约需要 200ms 不等，为了保证用户尽快看到内容，要尽量避免页面的重定向

#### 避免使用 CSS import 引入 CSS

CSS 中的 `@import` 可以从另一个样式文件中引入样式，但这会增加 CSS 资源加载的关键路径长度，带有 `@impport` 的 CSS 样式需要在 CSS 文件串行解析到 `@impport` 时才会加载另外的 CSS 文件，大大延后了 CSS 渲染完的时间


### 页面渲染

#### 尽量预先设定图片大小

在加载大量的图片元素时，尽量预先限定图片的尺寸大小，否则在图片加载过程中会更新图片的排版信息，产生大量的重排

#### 不要在 HTML 中直接缩放图片

在HTML中直接缩放图片会导致页面内容的重排重绘，此时可能会使页面中的其他操作产生卡顿，因此要尽量减少在页面中直接进行图片缩放

#### 减少 DOM 元素数量和深度

HTML中标签元素越多，标签的层级越深，浏览器解析DOM并绘制到浏览器中所花的时间就越长，所以应尽可能保持DOM元素简洁和层级较少

#### 减少 JS 动画，尽量用 CSS 代替

JS直接操作DOM极容易引起页面的重排。尽量使用CSS3的translate、scale属性代替top、left和height、width，避免大量的重排计算