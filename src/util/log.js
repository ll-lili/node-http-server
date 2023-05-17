const fs = require('fs')
const path = require('path')

// 创建writeStream
function createWriteStream(filename) {
  const fullFileName = path.join(__dirname, '../../log', filename)
  const writeStream = fs.createWriteStream(fullFileName, {
    flags: 'a'
  })
  return writeStream
}

// 写入日志
function writeLog(writeStream, log) {
  writeStream.write(log + '\n')
}

// 写入access日志
exports.access = (log) => {
  const accessWriteStream = createWriteStream('access.log')
  writeLog(accessWriteStream, log)
}
