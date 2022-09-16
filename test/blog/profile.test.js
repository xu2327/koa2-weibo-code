/**
 * @description 个人主页 test
 * @author 一抹晨曦
 */

const server = require('../server')
const { COOKIE,USER_NAMW } = require('../testUserinfo')

test('个人主页，加载第一页数据，应该成功',async () => {
    const res = await server
    .get(`/api/profile/loadMore/${USER_NAMW}/0`)
    .set('cookie',COOKIE)

    expect(res.body.errno).toBe(0)

    const data = res.body.data
    expect(data).toHaveProperty('isEmpty')
    expect(data).toHaveProperty('blogList')
    expect(data).toHaveProperty('pageSize')
    expect(data).toHaveProperty('pageIndex')
    expect(data).toHaveProperty('count')
})