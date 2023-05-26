/// <reference path="../ref.d.ts" />
/// <reference types="miniprogram-api-typings" />
/// <reference types="miniprogram-api-typings" />
type RequestOption = Omit<WxRequestOption, 'url'>;
type RequestListen = (task: WechatMiniprogram.RequestTask) => void;
type RequestSuccess = <T extends WxResponse>(res: T) => void;
type RequestFail = (err: WxErr) => void;
type MethodRequest = (url: string, data?: WxRequestOption['data'], options?: RequestOption, listen?: RequestListen) => void;
type RequestResult = WxResponse['data'];
type test = Optional<any>;
