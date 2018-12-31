export default (method, options) => {
    return new Promise((resolve, reject) => {
        wx[method](Object.assign({}, options, {
            success: resolve,
            fail: reject,
        }))
    })
}