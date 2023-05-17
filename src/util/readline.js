const fs = require('fs')
const path = require('path')
const readline = require('readline')

// 文件名
const filename = path.resolve(__dirname, '../../log/access.log')
// 创建read stream
const readStream = fs.createReadStream(filename)
// 创建readline对象
const rl = readline.createInterface({
  input: readStream
})
let chromeNum = 0
let sum = 0
// 逐行读取
rl.on('line', (lineData) => {
  if (!lineData) {
    return
  }
  // 记录总数
  sum++
  const arr = lineData.split(' -- ')
  if (arr[2]?.indexOf('Chrome') > 0) {
    // 累加Chrome数量
    chromeNum++
  }
})
// 监听读取完成
rl.on('close', () => {
  console.log('chrome占比： ' + chromeNum / sum)
})
