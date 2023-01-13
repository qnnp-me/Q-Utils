# Q-Utils

---
## 简介 Introduction
这是一个开发微信小程序（后期可能支持其他平台）的实用工具封装
### 目前有的：
- 请求封装，提供 `REQUEST` `GET` 等小程序支持的请求方法封装
    - `REQUEST` 请求封装还提供文件小程序不具备的批量上传能力
- `getType: string` 函数，用于获取给定目标的类型信息，返回值如：`function` `object` `array` 等

## 安装 Install

``` text
npm i @qnnp/q-utils
```

## 使用 Usage
### 基本
``` typescript
// app.ts
import { init } from '@qnnp/q-utils'
App<IAppOption>({
  onLaunch () {
    // 初始化工具会自动检查小程序更新并获取相关环境信息储存至全局
    init(this)
    GET('userinfo')
      .then(...)
      .catch(...)
  },
  globalData: {},
  config    : {
    // 认证使用的 Token 类值
    token: 'the token'
    // 项目将要用到的认证方式和认证 key 名
    authType: 'cookie', // 还可为 header
    authKey : 'PHPSID',
    // 以上设置示例将会在每次请求时自动带上 cookie 头
    // cookie: PHPSID=the%20token; 
    // 如果设置 authType 为 header 则会携带头信息
    // PHPSID: the%20token
    
    // 默认 API 服务器地址
    API_HOST: 'https://example.com/api/',
    // 开发版 API 服务器地址 (optional)
    DEV_API_HOST: 'https://dev.example.com/api/',
    // 体验版 API 服务器地址 (optional)
    TRIAL_API_HOST: 'https://trial.example.com/api/',
    // 开发版和体验版未设置时默认使用 API_HOST
    // 设置 API_HOST 之后每次请求可以使用绝对地址可相对地址
    // 如 GET('/test') 会请求 https://example.com/test
    // 如 GET('test') 会请求 https://example.com/api/test
    
    // 请求成功中间件，必须执行 resolve 或者 reject 对应成功或者失败
    requestSuccessMiddleware (res, resolve, reject) {
      if (res.statusCode < 400) {
        resolve(res)
      } else {
        reject({ errno: res.statusCode, errMsg: res.errMsg })
      }
    },
    // 请求失败中间件，必须调用 reject
    requestFailMiddleware (err, reject) {
      reject(err)
    }
  },
})
```
### 基本请求封装
``` typescript
REQUEST(
  options: WxRequestOption,
  listen?: RequestListen
): Promise<WxResponse>
```

基本使用方法可以查看 [微信文档：wx.request(options: WxRequestOption)](https://developers.weixin.qq.com/miniprogram/dev/api/network/request/wx.request.html) 与微信原版不同的是工具提供的 `REQUEST` 可以实现同一个方法传参同时上传多个文件。
当需要携带文件时仅需在 `options.data` 中增加一个数组字段即可，`options.data` 示例如下：
``` typescript
const options: WxRequestOption = {
  url: 'upload',
  header : {
    'content-type': 'multipart/form-data'
  },
  data: {
    field_1: 'value',
    field_2: 'value',
    file_1: ['fileName.exc', 'http://tmp/...tmpName.png'],
    file_2: ['fileName.exc', 'http://tmp/...tmpName.png'],
  },
  timeout: 60000 // 上传需要设置超时时长，避免操作超时
}
```
`listen` 为传递 `wx.request` 所产生的 `RequestTask` 对象的 callback
### 请求方法再封装
```
GET( // OPTIONS | HEAD | POST | PUT | DELETE | TRACE | CONNECT
  url: string,
  data?: object,
  options?: RequestOption,
  listen?: RequestListen
)
```
调用方法和 `REQUEST` 差不多，只是单独拉出 `url` `data` 两个参数方便调用。
