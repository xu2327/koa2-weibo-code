/**
 * @description 广场 API 路由
 * @author 一抹晨曦
 */

const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/loginChecks')
const { getSquareBlogList } = require('../../controller/blog-square')
const { gerBlogListStr } = require('../../utils/blog')

router.prefix('/api/square')

// 加载更多
router.get('/loadMore/:pageIndex', loginCheck, async (ctx, next) => {
    let { pageIndex } = ctx.params
    pageIndex = parseInt(pageIndex)  // 转换 number 类型
    const result = await getSquareBlogList(pageIndex)

    // 渲染成 html 字符串
    result.data.blogListTpl = gerBlogListStr(result.data.blogList)

    ctx.body = result
})

module.exports = router