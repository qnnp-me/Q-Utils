/// <reference types="miniprogram-api-typings"/>
//  AUTO REF
/// <reference path="types/getType.ts" />
/// <reference path="types/IAppOption.ts" />
/// <reference path="types/Request.ts" />
//  AUTO REF
//  noinspection ES6UnusedImports

type WxRequestOption = WechatMiniprogram.RequestOption
type WxErr = WechatMiniprogram.Err

declare interface WxResponse<T> extends WechatMiniprogram.RequestSuccessCallbackResult<T> {
  data: any | T
}
