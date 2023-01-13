/// <reference path="RequestOption.ts" />
/// <reference path="WxResponse.ts" />
/// <reference path="WxError.ts" />
interface IAppOption {
  appId?: WechatMiniprogram.MiniProgram['appId']
  version?: WechatMiniprogram.MiniProgram['version']
  config: {
    token?: string
    authType?: 'cookie' | 'header'
    authKey?: string | 'token'
    /*正式环境 API 服务器地址*/
    API_HOST: `https://${string}/`
    /*开发环境 API 服务器地址*/
    DEV_API_HOST?: `https://${string}/`
    /*体验环境 API 服务器地址*/
    TRIAL_API_HOST?: `https://${string}/`
    /*默认请求选项*/
    requestDefaultOptions?: RequestOption
    beforeRequestMiddleware? (options: WxRequest): WxRequest
    /*请求成功中间件，必须执行 resolve 或者 reject*/
    requestSuccessMiddleware? (res: WxResponse,
      resolve: (value: WxResponse) => void,
      reject: (err: WxError) => void
    ): void
    /*请求失败中间件，必须执行 reject*/
    requestFailMiddleware? (
      err: WxError,
      reject: (err: WxError) => void
    ): void
  },
  globalData: {
    userInfo?: WechatMiniprogram.UserInfo
  }
  env?: {
    version: WechatMiniprogram.MiniProgram['envVersion']
  }
  update?: () => void
  systemInfo?: WechatMiniprogram.SystemInfo
  safeArea?: WechatMiniprogram.SystemInfo['safeArea']
  menuButtonPosition?: WechatMiniprogram.ClientRect
}
