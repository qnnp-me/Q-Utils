/// <reference path="types/IAppOption.d.ts" />
/// <reference path="types/WxError.d.ts" />
/// <reference path="types/WxRequest.d.ts" />
/// <reference path="types/WxResponse.d.ts" />
/// <reference path="types/RequestOption.d.ts" />
/// <reference path="common/helper.d.ts" />
/// <reference types="wx" />
/// <reference types="wx" />
/// <reference types="wx" />
/// <reference types="wx" />
/// <reference types="wx" />
/// <reference types="wx" />
/// <reference types="wx" />
export declare let app: IAppOption;
export declare const init: (initApp?: IAppOption) => void;
export declare const getType: (target: any) => string;
/**
 * 请求封装
 */
export declare const REQUEST: (options: WechatMiniprogram.RequestOption) => Promise<WxResponse>;
export declare const OPTIONS: (url: string, data?: object, options?: RequestOption) => Promise<WxResponse>;
export declare const GET: (url: string, data?: object, options?: RequestOption) => Promise<WxResponse>;
export declare const HEAD: (url: string, data?: object, options?: RequestOption) => Promise<WxResponse>;
export declare const POST: (url: string, data?: object, options?: RequestOption) => Promise<WxResponse>;
export declare const PUT: (url: string, data?: object, options?: RequestOption) => Promise<WxResponse>;
export declare const DELETE: (url: string, data?: object, options?: RequestOption) => Promise<WxResponse>;
export declare const TRACE: (url: string, data?: object, options?: RequestOption) => Promise<WxResponse>;
export declare const CONNECT: (url: string, data?: object, options?: RequestOption) => Promise<WxResponse>;
