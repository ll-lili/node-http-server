const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const url = require('url')
const { redis } = require('./src/db/ioredis')
const { access } = require('./src/util/log')

// 获取body数据
function getBodyData(req) {
  return new Promise((resolve, reject) => {
    if (req.headers['content-type'] !== 'application/json') {
      resolve({})
      return
    }
    let bodyData = ''
    req.on('data', (chunk) => {
      bodyData += chunk.toString()
    })
    req.on('end', () => {
      let json = ''
      try {
        json = resolve(JSON.parse(bodyData))
      } catch {
        json = {}
      }
      bodyData ? resolve(json) : resolve({})
    })
  })
}
// 设置cookie过期时间
const getCookieExpires = () => {
  const d = new Date()
  d.setTime(d.getTime() + 1000 * 60 * 60 * 24)
  return d.toGMTString()
}

async function serverhandle(req, res) {
  // 记录日志
  access(
    `${req.method} -- ${req.url} -- ${
      req.headers['user-agent']
    } -- ${new Date()}`
  )
  // 设置返回数据格式：JSON
  res.setHeader('Content-type', 'application/json')
  // 设置path
  req.path = req.url.split('?')[0]
  // 解析设置query
  req.query = url.parse(req.url, true).query
  // 设置bodyData
  req.bodyData = await getBodyData(req)
  // 设置cookie
  req.cookie = {}
  const cookieStr = req.headers.cookie || ''
  if (cookieStr.trim()) {
    cookieStr.split(';').forEach((item) => {
      const arr = item.trim().split('=')
      req.cookie[arr[0]] = arr[1]
    })
  }
  // 设置session
  let needSetCookie = false
  let userId = req.cookie.userId
  if (!userId) {
    userId = `${Date.now()}_${Math.random()}`
    needSetCookie = true
  }
  req.sessionId = userId
  const sessionData = await redis.hgetall(req.sessionId)
  sessionData ? (req.session = sessionData) : (req.session = {})
  // 处理路由
  const blogData = await handleBlogRouter(req, res)
  if (blogData) {
    if (needSetCookie) {
      res.setHeader(
        'Set-Cookie',
        `userId=${userId};path=/;httpOnly; expires=${getCookieExpires()}`
      )
    }
    res.end(JSON.stringify(blogData))
    return
  }
  const userData = await handleUserRouter(req, res)
  if (userData) {
    if (needSetCookie) {
      res.setHeader(
        'Set-Cookie',
        `userId=${userId};path=/;httpOnly; expires=${getCookieExpires()}`
      )
    }
    res.end(JSON.stringify(userData))
    return
  }
  // 404处理
  res.writeHead(404)
  res.end(
    JSON.stringify({
      error: '404 Not Found!'
    })
  )
}

module.exports = serverhandle
