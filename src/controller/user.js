const { exec, escape } = require('../db/mysql2')

exports.login = async (req) => {
  const { username, password } = req.bodyData
  const sql = `select username, realname from users where username = ${escape(
    username
  )} and password = ${escape(password)};`
  console.log(sql)
  return await exec(sql)
}
