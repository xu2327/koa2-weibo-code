/**
 * @description 数据模型入口文件
 * @author 一抹晨曦
 */

const User = require('./User')
const Blog = require('./Blog')

Blog.belongsTo(User, {
    foreignKey: 'userId'
})

module.exports = {
    User,
    Blog
}