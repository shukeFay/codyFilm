// 使用 promise 来封装异步请求
let myrequest = function(option){
    return new Promise((resolve,reject)=>{
        //执行逻辑代码
        wx.request({
            url:option.url,
            method: option.method ||'get',
            header: option.header || {},
            data: option.data || {},
            success: function (res){
                resolve(res);
            },
            fail: function(res){
                reject(res);
            }
        })
    })
}
//暴露出去
export default myrequest