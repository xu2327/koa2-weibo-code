const router = require('koa-router')()

// ? 前缀 要访问后面的 要把前缀加上
router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

router.post('/login',async (ctx,next) => {
  const { userName,password } = ctx.request.body
  ctx.body = {
    userName,
    password
  }
})


module.exports = router
