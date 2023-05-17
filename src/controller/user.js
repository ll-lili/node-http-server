const { exec } = require('../db/mysql2')

exports.login = async (req) => {
  const { username, password } = req.bodyData
  const sql = `select username, realname from users where username = '${username}' and password = '${password}';`
  return await exec(sql)
}
