/// <reference path="types/getType.d.ts" />
/// <reference path="types/IAppOption.d.ts" />
/// <reference path="types/Request.d.ts" />
/// <reference types="miniprogram-api-typings" />
type WxRequestOption = WechatMiniprogram.RequestOption;
type WxErr = WechatMiniprogram.Err;
declare interface WxResponse<T> extends WechatMiniprogram.RequestSuccessCallbackResult<T> {
    data: any | T;
}
