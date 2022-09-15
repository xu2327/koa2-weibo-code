/**
 * @description 首页 test
 * @author 一抹晨曦
 */

const server = require('../server')
const { COOKIE } = require('../testUserinfo')

// 存储微博 id
let BLOG_ID = ''

test('创建一条微博，应该成功',async () => {
    const content = '单元测试自动创建的微博_'+ Date.now()
    const image = '/xxx.jpg'

    // 开始测试
    const res = await server.post('/api/blog/create').send({
        content,
        image
    }).set('cookie',COOKIE)
    expect(res.body.errno).toBe(0)
    expect(res.body.data.content).toBe(content)
    expect(res.body.data.image).toBe(image)

    // 记录ID
    BLOG_ID = res.body.data.id
})