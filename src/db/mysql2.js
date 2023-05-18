const mysql2 = require('mysql2')
const { MYSQL_CONF } = require('../conf/db')

// 创建一个数据库连接
const connection = mysql2.createConnection(MYSQL_CONF)

// 统一执行sql的函数
function exec(sql) {
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, results) => {
      if (err) {
        return reject(err)
      }
      resolve(results)
    })
  })
}

module.exports = {
  exec,
  escape: mysql2.escape
}
