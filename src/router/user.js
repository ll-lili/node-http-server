const controller = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { redis } = require('../db/ioredis')
async function handleUserRouter(req, res) {
  const method = req.method
  // 登录
  if (method === 'POST' && req.path === '/api/user/login') {
    const data = await controller.login(req)
    if (data.length) {
      const user = data[0]
      redis.hset(req.sessionId, user) // 用户信息添加到redis
      return new SuccessModel(user)
    }
    return new ErrorModel('用户名或密码不正确！')
  }
}

module.exports = handleUserRouter
