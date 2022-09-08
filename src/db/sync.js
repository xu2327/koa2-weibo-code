/**
 * @description sequelize 同步数据库
 * @author 一抹晨曦
 */

const seq = require('./seq')

require('./model/index')

// 测试连接
seq.authenticate().then(() => {
    console.log('sync ok')
}).catch(() => {
    console.log('sync err')
})

// 执行同步
seq.sync({ force: true }).then(() => {
    console.log('sync ok')
    // 推出出去，不然会一直占用内存
    process.exit()
})