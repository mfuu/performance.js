const ELEMENTS = ['html', 'body']

// 白屏
export const BlankScreen = (wrapperElements = []) => {
  return new Promise((resolve, reject) => {
    try {
      const elements = [...ELEMENTS, ...wrapperElements]

      let emptyPoints = 0

      function isWrapper(element) {
        let selector = getSelector(element)
        if (elements.indexOf(selector) !== -1) {
          emptyPoints++
        }
      }
      let x, y
      for(let i = 0; i < 9; i++) {
        x = document.elementFromPoint((window.innerWidth * i) / 10, window.innerHeight / 2)
        y = document.elementFromPoint(window.innerWidth / 2, (window.innerHeight * i) / 10)
        isWrapper(x[0])
        isWrapper(y[0])
      }
      if (emptyPoints > 0) {
        const centerElements = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2)
        resolve({
          blank_screen: {
            emptyPoints: emptyPoints,
            screen: window.screen.width + 'X' + window.screen.height,
            viewPoint: window.innerWidth + 'X' + window.innerHeight,
            selector: centerElements[0]
          }
        })
      } else {
        resolve({})
      }
    } catch(err) {
      reject(err)
    }
  })
}

function getSelector(element) {
  const { id, className, nodeName } = element || {}
  if (id) {
    return "#" + id
  } else if (className) {
    // 过滤空白符 + 拼接
    return (
      "." +
      className
        .split(" ")
        .filter((item) => !!item)
        .join(".")
    )
  } else {
    return nodeName?.toLowerCase()
  }
}