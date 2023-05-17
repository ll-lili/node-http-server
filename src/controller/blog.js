const { exec } = require('../db/mysql2')
// 获取blog列表
exports.list = async (req, res) => {
  const { author, keyword } = req.query
  let sql = 'select * from blogs where 1=1 '
  if (author) {
    sql += `and author='${author}' `
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `
  }
  sql += `order by createtime desc;`
  try {
    return await exec(sql)
  } catch (error) {
    return error
  }
}
// 获取blog详细
exports.detail = async (req) => {
  const { id } = req.query
  let sql = 'select * from blogs where 1=1 '
  if (id) {
    sql += `and id = '${id}';`
    const res = await exec(sql)
    return res.length ? res[0] : '什么都没查到'
  }
  return '请传入查询id'
}
// 创建blog
exports.createBlog = async (req) => {
  const { title, content } = req.bodyData
  const author = req.session.username
  console.log(author)
  if (!author) {
    return '请先登录！'
  }
  if (title && content) {
    const sql = `insert into blogs (title, content, author, createtime)
      values ('${title}', '${content}', '${author}', ${Date.now()});
    `
    return await exec(sql)
  }
  return '缺少必要的参数或者参数为空!'
}
// 修改
exports.update = async (req) => {
  const { id, title, content } = req.bodyData
  const author = req.session.username
  if (!author) {
    return '请先登录！'
  }
  if (!id) {
    return '请传入id!'
  }
  if (!title || !content) {
    return '缺少必要的参数或者参数为空!'
  }
  const sql = `update blogs set title = '${title}', content = '${content}' where id = ${id} and author = '${author}';`
  return await exec(sql)
}
// 删除
exports.delete = async (req) => {
  const { id } = req.bodyData
  const author = req.session.username
  if (!author) {
    return '请先登录！'
  }
  if (!id) {
    return '请传入id!'
  }
  const sql = `delete from blogs where id = ${id} and author = '${author}';`
  return await exec(sql)
}
