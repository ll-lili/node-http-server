const Redis = require('ioredis')
const { REDIS_CONF } = require('../conf/db')

const redis = new Redis(REDIS_CONF)

exports.set = function (key, val) {
  if (typeof val === 'object') {
    val = JSON.stringify(val)
  }
  redis
    .set(key, val)
    .then((res) => {
      console.log(`set ${key} ${res}`)
    })
    .catch((err) => {
      console.log(err)
    })
}
exports.redis = redis
