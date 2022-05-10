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



### 使用

vue项目 在 `main.js` 中引入

```js
import Performance from 'xxx'

new Performance()

```

普通脚本写法: 

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Performance</title>
  <script src="./dist/index.js"></script>
  <script>
    new Performance()
  </script>
</head>
</html>
```

通过 `window.performance_information` 可以获取所有有用的数据信息