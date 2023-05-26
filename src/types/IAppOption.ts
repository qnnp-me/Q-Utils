/*
 Copyright (c) 2023. qnnp <qnnp@qnnp.me> https://qnnp.me
 */

/// <reference path="../ref.ts" />

type  API_URL = `http${'s' | ''}://${string}/`

declare interface IAppOption {
  appId?: WechatMiniprogram.MiniProgram['appId']
  version?: WechatMiniprogram.MiniProgram['version']
  config?: {
    token?: string
    authType?: 'cookie' | 'header'
    authKey?: string | 'token'
    /*正式环境 API 服务器地址*/
    API_HOST: API_URL
    /*开发环境 API 服务器地址*/
    DEV_API_HOST?: API_URL
    /*体验环境 API 服务器地址*/
    TRIAL_API_HOST?: API_URL
    /*默认请求选项*/
    requestDefaultOptions?: RequestOption
    beforeRequestMiddleware?: <T extends RequestOption>(options: T) => T
    /*请求成功中间件，必须执行 resolve 或者 reject*/
    requestSuccessMiddleware?:
      <RES extends WxResponse<any>, R extends (data: any) => void, E extends (err: any) => void>
      (
        res: RES,
        resolve: R,
        reject: E
      ) => void
    /*请求失败中间件，必须执行 reject*/
    requestFailMiddleware?:
      <ER extends WxErr, E extends (err: any) => void>
      (err: ER, reject: E) => void
  },
  globalData: {
    userInfo?: WechatMiniprogram.UserInfo
    [key: string]: any
  }
  env?: {
    version: WechatMiniprogram.MiniProgram['envVersion']
  }
  update?: () => void
  systemInfo?: WechatMiniprogram.SystemInfo
  safeArea?: WechatMiniprogram.SystemInfo['safeArea']
  menuButtonPosition?: WechatMiniprogram.ClientRect

  [key: string]: any
}
