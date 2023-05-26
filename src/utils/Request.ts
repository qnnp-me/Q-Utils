/*
 Copyright (c) 2023. qnnp <qnnp@qnnp.me> https://qnnp.me
 */

import {getType} from './helpers'
import {app} from './App'

const Multipart = require('Multipart.min')
/**
 * 默认请求封装
 */
export const REQUEST = (options: Partial<WxRequestOption>, listen?: RequestListen): Promise<RequestResult> => {
  let task: WechatMiniprogram.RequestTask
  options = prepareRequestOptions(options)
  return new Promise((resolve, reject) => {
    const {env, config} = app

    let {
      API_HOST,
      DEV_API_HOST,
      TRIAL_API_HOST,
      requestSuccessMiddleware,
      requestFailMiddleware
    } = config

    // 根据不同运行环境使用不同服务器
    if (env?.version === 'develop' && DEV_API_HOST) { // 开发版配置
      API_HOST = DEV_API_HOST
    } else if (env?.version === 'trial' && TRIAL_API_HOST) { // 体验版配置
      API_HOST = TRIAL_API_HOST
    }

    /**
     * 请求失败或者配置错误调用
     */
    const fail = (err: WxErr) => {
      if (requestFailMiddleware && requestFailMiddleware.length === 2) {
        requestFailMiddleware(err, reject)
      } else {
        reject(err)
      }
    }
    const success = (res: WxResponse) => {
      if (requestSuccessMiddleware && requestSuccessMiddleware.length === 3) {
        requestSuccessMiddleware(res, resolve, fail)
      } else if (res.statusCode < 400) {
        resolve(res)
      } else {
        fail({errno: res.statusCode, errMsg: res.errMsg})
      }
    }
    /**
     * 已配置 API_HOST 情况下 相对和绝对路径 url 处理
     */
    if (!options.url.match(/^http/)) {
      if (!API_HOST) {
        fail({errno: 0, errMsg: 'API_HOST 未设置'})
        return
      }
      let base_url: string = API_HOST
      const absolute = options.url.match(/^\//)
      if (absolute) {
        base_url = API_HOST.split('/').slice(0, 3).join('/')
      }
      options.url = base_url + options.url
    }
    options = {...options, success, fail}
    const finaly = (options) => {
      // 请求前中间件
      if (app.config.beforeRequestMiddleware) options = app.config.beforeRequestMiddleware(options)
      task = wx.request(options)
      listen && listen(task)
    }
    // 处理请求的数据，如 multipart/form-data 是需要特殊处理的
    if (options.data) {
      prepareRequestFormData(options)
        .then(data => {
          options.data = data
          finaly(options)
        })
    } else {
      finaly(options)
    }
  })
}
export const OPTIONS: MethodRequest = (url, data, options, listen) => REQUEST({
  ...options,
  method: 'OPTIONS',
  url,
  data,
}, listen)
export const GET: MethodRequest = (url, data, options, listen) => REQUEST(
  {
    ...options,
    method: 'GET',
    url,
    data,
  },
  listen
)
export const HEAD: MethodRequest = (url, data, options, listen) => REQUEST(
  {
    ...options,
    method: 'HEAD',
    url,
    data,
  },
  listen
)
export const POST: MethodRequest = (url, data, options, listen) => REQUEST(
  {
    ...options,
    method: 'POST',
    url,
    data,
  },
  listen
)
export const PUT: MethodRequest = (url, data, options, listen) => REQUEST(
  {
    ...options,
    method: 'PUT',
    url,
    data,
  },
  listen
)
export const DELETE: MethodRequest = (url, data, options, listen) => REQUEST(
  {
    ...options,
    method: 'DELETE',
    url,
    data,
  },
  listen
)
export const TRACE: MethodRequest = (url, data, options, listen) => REQUEST(
  {
    ...options,
    method: 'TRACE',
    url,
    data,
  },
  listen
)
export const CONNECT: MethodRequest = (url, data, options, listen) => REQUEST(
  {
    ...options,
    method: 'CONNECT',
    url,
    data,
  },
  listen
)
/**
 * 检查准备请求选项
 */
const prepareRequestOptions = <T>(options): T => {  // 取值
  let {
    config: {
      authType,
      authKey,
      token,
      requestDefaultOptions,
    },
  } = app
  // 加载默认请求配置
  options = {
    method: 'GET',
    dataType: 'json',
    timeout: 10000,
    enableCache: false,
    header: {},
    ...requestDefaultOptions,
    ...options
  }
  /**
   * Token 相关处理
   */
  // 获取 Token ，不管后端如何实现类似值全统称 Token
  token = token || wx.getStorageSync('token')
  // 将 Token 储存到 app
  if (!app.config.token) {
    app.config.token = token
  }
  if (!authType || authType === 'cookie') {
    options.header = {
      ...options.header,
      cookie: `${authKey || 'token'}=${token}; ${options.header?.cookie || ''}`,
    }
  } else if (authType === 'header') {
    options.header = {
      [authKey || 'Authorization']: token,
      ...options.header,
    }
  }

  return options
}
/**
 * 处理 FormData
 */
const prepareRequestFormData = async (options: RequestOption) => {
  let data: RequestOption['data'] & any = options.data
  if (
    !options.method?.match(/GET|HEAD/)
    && options.header?.['content-type'] === 'multipart/form-data'
    && typeof data === 'object'
    && getType(data) === 'object'
  ) {
    const formData = new Multipart({files: [], fields: []})
    for (const name in data) {
      const value = data[name]
      if (getType(value) === 'array') {
        formData.file({name, filename: value[0], filePath: value[1]})
      } else {
        formData.field({name, value})
      }
    }
    options.header['content-type'] = 'multipart/form-data; boundary=' + formData.getBoundary()
    data = await formData.convertToBuffer()
  }
  return data
}
