export function PageView(callback) {
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
