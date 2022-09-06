/**
 * @description test demo
 * @author 一抹晨曦
 */

function sum(a,b) {
    return a+b;
}

test('10 + 20 应该等于 30',() => {
    const res = sum(10,20)
    expect(res).toBe(30)
})
