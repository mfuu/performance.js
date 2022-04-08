// 白屏
export function BlankScreen() {
  onload(function () {
    let x, y
    for(let i = 0; i < 9; i++) {
      x = document.elementFromPoint((window.innerWidth * i) / 10, window.innerHeight / 2)
      y = document.elementFromPoint(window.innerWidth / 2, (window.innerHeight * i) / 10)

    }
  })
}