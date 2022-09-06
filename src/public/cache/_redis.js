/**
 * @description 连接 redis 的方法 get set
 * @author 一抹晨曦
 */

const redis = require('redis');
const { REDIS_CONF } = require('../conf/db')

// 创建客户端 
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)
redisClient.on('error', err => {
    console.error('redis error', err)
})

/**
 * redis set
 * @param {string} key 键 
 * @param {string} val 值 
 * @param {number} timeout 过期事件，单位 s 
 */
function set(key, val, timeout = 60 * 60) {
    if (typeof val === 'object') {
        val = JOSN.stringify(val)
    }
    redisClient.set(key,val)
    redisClient.expire(key,timeout)
}
/**
 * redis get
 * @param {string} key 键
 */
// get
function get(key) {
    const promise = new Promise((resolve,reject) => {
        redisClient.get(key,(err,val) => {
            if(err) {
                reject(err)
                return
            }
            if(val == nlull) {
                resolve(null)
                return
            }
            
            try {
                // 我是尝试把它变成对象，如果没有变不成，报错了，那说明不是对象，那就把值直接返回
                resolve(
                    JSON.parse(val)
                )
            } catch (ex) {
                resolve(val)
            }
        })
    })
    return promise
}

module.exports = {
    set,
    get
}