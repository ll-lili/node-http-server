const controller = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

async function handleBlogRouter(req, res) {
  const method = req.method
  // 列表
  if (method === 'GET' && req.path === '/api/blog/list') {
    const data = await controller.list(req, res)
    if (Object.prototype.toString.call(data) === '[object Error]') {
      return new ErrorModel(data)
    }
    return new SuccessModel(data)
  }
  // 详细
  if (method === 'GET' && req.path === '/api/blog/detail') {
    const data = await controller.detail(req, res)
    return typeof data === 'string'
      ? new ErrorModel(data)
      : new SuccessModel(data)
  }
  // 新增
  if (method === 'POST' && req.path === '/api/blog/new') {
    const data = await controller.createBlog(req)
    if (typeof data === 'string') {
      return new ErrorModel(data)
    }
    return new SuccessModel({
      id: data.insertId // 新增id
    })
  }
  // 修改
  if (method === 'POST' && req.path === '/api/blog/update') {
    const data = await controller.update(req)
    if (typeof data === 'string') {
      return new ErrorModel(data)
    }
    return data.affectedRows > 0
      ? new SuccessModel('修改成功')
      : new ErrorModel('修改失败，id不存在或者缺少权限！')
  }
  // 删除
  if (method === 'POST' && req.path === '/api/blog/del') {
    const data = await controller.delete(req)
    if (typeof data === 'string') {
      return new ErrorModel(data)
    }
    return data.affectedRows > 0
      ? new SuccessModel('删除成功')
      : new ErrorModel('删除失败，id不存在或者缺少权限！')
  }
}

module.exports = handleBlogRouter
