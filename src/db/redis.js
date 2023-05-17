const { createClient } = require('redis')
const { REDIS_CONF } = require('../conf/db')
const { user, password, host, port } = REDIS_CONF

const PASSWORD = password ? `:${password}@` : ''
const PORT = port ? `:${port}` : ''
// 创建客户端
const redisClient = createClient({
  url: `redis://${user}${PASSWORD}${host}${PORT}`
})

// 监听错误
redisClient.on('error', (err) => console.log('Redis Client Error', err))

// 建立链接
redisClient.connect().then(() => {
  console.log('redis connect!')
})
module.exports = redisClient
