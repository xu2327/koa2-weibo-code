/**
 * @description 微博 service
 * @author 一抹晨曦
 */

const { Blog, User } = require('../db/model/index')
const { formatUser,formatBlog } = require('./_format')

/**
 * 创建微博
 * @param {Object} param0 创建微博的数据  { userId, content, image }
 */
async function createBlog({ userId, content, image }) {
    const result = await Blog.create({
        userId,
        content,
        image
    })
    return result.dataValues
}

/**
 * 根据用户获取微博列表
 * @param {Object} param0 查询参数  { userName, pageIndex = 0, pageSize = 10 }
 */
async function getBlogListByUser({ userName, pageIndex = 0, pageSize = 10 }) {
    // 拼接查询条件
    const userwhereOpts = {}
    if (userName) {
        userwhereOpts.userName = userName
    }

    // 执行查询
    const result = await Blog.findAndCountAll({
        limit: pageSize, // 每页多少条
        offset: pageSize * pageIndex, // 跳过多少条
        order: [
            ['id', 'desc']
        ],
        include: [
            {
                model: User,
                attributes: ['userName', 'nickName', 'picture'],
                where: userwhereOpts
            }
        ]
    })
    // result.count 总数，跟分页无关
    // result.rows 查询结果，数组

    // 获取 dataValues
    let blogList = result.rows.map(row => formatBlog(row.dataValues))

    blogList = blogList.map(blogItem => {
        const user = blogItem.user.dataValues
        blogItem.user = formatUser(user)
        return blogItem
    })
    return {
        count: result.count,
        blogList
    }
}

/**
 * 获取关注着的微博列表（首页）
 * @param {Object} param0 查询条件 { userId, pageIndex = 0, pageSize = 10 }
 */
async function getFollowersBlogList({ userId, pageIndex = 0, pageSize = 10 }) {
    const result = await Blog.findAndCountAll({
        limit: pageSize, // 每页多少条
        offset: pageSize * pageIndex, // 跳过多少条
        order: [
            ['id', 'desc']
        ],
        include: [
            {
                model: User,
                attributes: ['userName', 'nickName', 'picture']
            }
        ]
    })
    console.log(result.rows)
    // 格式化数据
    let blogList = result.rows.map(row => formatBlog(row.dataValues))
    
    blogList = blogList.map(blogItem => {
        blogItem.user = formatUser(blogItem.user.dataValues)
        return blogItem
    })
    return {
        count: result.count,
        blogList
    }
}



module.exports = {
    createBlog,
    getBlogListByUser,
    getFollowersBlogList
}