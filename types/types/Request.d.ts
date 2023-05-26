/// <reference path="../ref.d.ts" />
/// <reference types="miniprogram-api-typings" />
/// <reference types="miniprogram-api-typings" />
type RequestOption = Omit<WxRequestOption, 'url'>;
type RequestListen = (task: WechatMiniprogram.RequestTask) => void;
type RequestSuccess = (res: WxResponse) => Promise<WxResponse>;
type RequestFail = (err: WxErr) => void;
type MethodRequest = (url: string, data?: WxRequestOption['data'], options?: RequestOption, listen?: RequestListen) => Promise<WxResponse>;
type RequestResult = WxResponse['data'];
type test = Optional<any>;
