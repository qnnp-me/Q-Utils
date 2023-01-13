/// <reference path="types/IAppOption.ts" />
/// <reference path="types/RequestOption.ts" />
/// <reference path="types/RequestListen.ts" />
/// <reference path="types/WxError.ts" />
/// <reference path="types/WxRequest.ts" />
/// <reference path="types/WxResponse.ts" />
/// <reference path="types/WxRequestTask.ts" />
import { getObjectType } from './common/helper'
const Multipart            = require('./common/Multipart.min')
export let app: IAppOption = getApp()
export const init          = (initApp: IAppOption = getApp()) => {
  const {
          miniProgram: { envVersion, appId, version }
        }                  = wx.getAccountInfoSync() // 读取环境信息
  const menuButtonPosition = wx.getMenuButtonBoundingClientRect()
  const systemInfo         = wx.getSystemInfoSync()
  app                      = initApp
  app.appId                = appId
  app.version              = version
  app.env                  = { version: envVersion }
  app.systemInfo           = systemInfo
  app.safeArea             = systemInfo.safeArea
  app.menuButtonPosition   = menuButtonPosition
  app.update               = selfUpdate
  selfUpdate()
}
const selfUpdate           = () => {
  const updateManager = wx.getUpdateManager()
  updateManager.onCheckForUpdate(function (res) {
    console.log(`Check Update: ${res.hasUpdate ? 'New Update' : 'No Update'}`)
  })
  updateManager.onUpdateReady(function () {
    wx.showModal({
      title  : '更新提示',
      content: '新版本已经准备好，是否重启应用？',
      success (res) {
        if (res.confirm) {
          updateManager.applyUpdate()
        }
      }
    })
  })
  updateManager.onUpdateFailed(function () {
    // 新版本下载失败
  })
}
export const getType       = getObjectType
/**
 * 请求封装
 */
export const REQUEST       = (options: WxRequest, listen?: RequestListen) => (
  new Promise(async (resolve: (value: WxResponse) => void, reject: (reason: WxError) => void) => {
    // 取值
    let {
          config: {
            authType,
            authKey,
            TRIAL_API_HOST,
            DEV_API_HOST,
            requestSuccessMiddleware,
            requestFailMiddleware,
            API_HOST,
            token,
            requestDefaultOptions,
          },
          env
        }   = app
    let task: WechatMiniprogram.RequestTask
    // 加载默认请求配置
    options = {
      method     : 'GET',
      dataType   : 'json',
      timeout    : 10000,
      enableCache: false,
      header     : {},
      ...requestDefaultOptions,
      ...options
    }
    // 根据不同运行环境使用不同服务器
    if (env?.version === 'develop' && DEV_API_HOST) { // 开发版配置
      API_HOST = DEV_API_HOST
    } else if (env?.version === 'trial' && TRIAL_API_HOST) { // 体验版配置
      API_HOST = TRIAL_API_HOST
    }
    // 获取 Token ，不管后端如何实现类似值全统称 Token
    token = token || wx.getStorageSync('token')
    // 将 Token 储存到 app
    if (!app.config.token) {app.config.token = token}
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
    const fail = (err: WxError) => {
      if (requestFailMiddleware && requestFailMiddleware.length === 2) {
        requestFailMiddleware(err, reject)
      } else {
        reject(err)
      }
    }
    // 已配置 API_HOST 情况下 相对和绝对路径 url 处理
    if (!options.url.match(/^http/)) {
      if (!API_HOST) {
        fail({ errno: 0, errMsg: 'API_HOST 未设置' })
        return
      }
      let base_url: string = API_HOST
      const absolute       = options.url.match(/^\//)
      if (absolute) {
        base_url = API_HOST.split('/').slice(0, 3).join('/')
      }
      options.url = base_url + options.url
    }
    options = {
      ...options,
      success (res: WxResponse) {
        if (requestSuccessMiddleware && requestSuccessMiddleware.length === 3) {
          requestSuccessMiddleware(res, resolve, fail)
        } else if (res.statusCode < 400) {
          resolve(res)
        } else {
          fail({ errno: res.statusCode, errMsg: res.errMsg })
        }
      },
      fail
    }
    // 处理请求的数据，如 multipart/form-data 是需要特殊处理的
    if (options.data) options.data = await prepareRequestData(options)
    // 请求前中间件
    if (app.config.beforeRequestMiddleware) options = app.config.beforeRequestMiddleware(options)
    task = wx.request(options)
    listen && listen(task)
  })
)
export const OPTIONS       = (url: string, data?: object, options?: RequestOption, listen?: RequestListen) => REQUEST({
  ...options,
  method: 'OPTIONS',
  url,
  data,
}, listen)
export const GET           = (url: string, data?: object, options?: RequestOption, listen?: RequestListen) => REQUEST({
  ...options,
  method: 'GET',
  url,
  data,
}, listen)
export const HEAD          = (url: string, data?: object, options?: RequestOption, listen?: RequestListen) => REQUEST({
  ...options,
  method: 'HEAD',
  url,
  data,
}, listen)
export const POST          = (url: string, data?: object, options?: RequestOption, listen?: RequestListen) => REQUEST({
  ...options,
  method: 'POST',
  url,
  data,
}, listen)
export const PUT           = (url: string, data?: object, options?: RequestOption, listen?: RequestListen) => REQUEST({
  ...options,
  method: 'PUT',
  url,
  data,
}, listen)
export const DELETE        = (url: string, data?: object, options?: RequestOption, listen?: RequestListen) => REQUEST({
  ...options,
  method: 'DELETE',
  url,
  data,
}, listen)
export const TRACE         = (url: string, data?: object, options?: RequestOption, listen?: RequestListen) => REQUEST({
  ...options,
  method: 'TRACE',
  url,
  data,
}, listen)
export const CONNECT       = (url: string, data?: object, options?: RequestOption, listen?: RequestListen) => REQUEST({
  ...options,
  method: 'CONNECT',
  url,
  data,
}, listen)
const prepareRequestData   = async (options: RequestOption) => {
  let data: RequestOption['data'] & any = options.data
  if (
    !options.method?.match(/GET|HEAD/)
    && options.header?.['content-type'] === 'multipart/form-data'
    && typeof data === 'object'
    && getType(data) === 'object'
  ) {
    const formData = new Multipart({ files: [], fields: [] })
    for (const name in data) {
      const value = data[name]
      if (getType(value) === 'array') {
        formData.file({ name, filename: value[0], filePath: value[1] })
      } else {
        formData.field({ name, value })
      }
    }
    options.header['content-type'] = 'multipart/form-data; boundary=' + formData.getBoundary()
    data                           = await formData.convertToBuffer()
  }
  return data
}
