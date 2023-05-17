const env = process.env.NODE_ENV // 环境变量

let MYSQL_CONF
let REDIS_CONF

if (env === 'development') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    port: '3306',
    password: '123456',
    database: 'myblog',
    waitForConnections: true
  }
  REDIS_CONF = {
    host: 'localhost',
    port: '6379'
  }
}
if (env === 'production') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    port: '3306',
    password: '123456',
    database: 'myblog'
  }
  REDIS_CONF = {
    host: 'localhost',
    port: '6379'
  }
}

module.exports = {
  MYSQL_CONF,
  REDIS_CONF
}
