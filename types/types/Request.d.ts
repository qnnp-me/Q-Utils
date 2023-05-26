/// <reference path="../ref.d.ts" />
/// <reference types="miniprogram-api-typings" />
type RequestOption = Omit<WxRequestOption, 'url'>;
type RequestListen = (task: WechatMiniprogram.RequestTask) => void;
type MethodRequest = (url: string, data?: WxRequestOption['data'], options?: RequestOption, listen?: RequestListen) => Promise<RequestResult>;
type RequestResult = WxResponse<any>['data'];
