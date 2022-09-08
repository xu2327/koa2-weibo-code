/**
 * @description 存储配置
 * @author 一抹晨曦
 */

const { isProd } = require('../utils/env')


let REDIS_CONF = { 
    port:6379,
    host:'127.0.0.1'
}

let MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    paswords: '123456',
    port: '3306',
    database: 'koa2_weibo_db'
}

if(isProd) {
    REDIS_CONF = {
        // 线上的 redis 配置
        port:6379,
        host:'127.0.0.1'
    }

    MUSQL_CONF = {
        // 线上的 mysql 配置
        host: 'localhost',
        user: 'root',
        paswords: '123456',
        port: '3306',
        database: 'koa2_weibo_db'
    }
}


module.exports = {
    REDIS_CONF,
    MYSQL_CONF
}