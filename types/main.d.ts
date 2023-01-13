/*
 * Copyright (c) 2023. qnnp <qnnp@qnnp.me>
 */

/// <reference path="types/IAppOption.d.ts" />
/// <reference path="types/RequestOption.d.ts" />
/// <reference path="types/RequestListen.d.ts" />
/// <reference path="types/WxError.d.ts" />
/// <reference path="types/WxRequest.d.ts" />
/// <reference path="types/WxResponse.d.ts" />
/// <reference path="types/WxRequestTask.d.ts" />
export declare let app: IAppOption;
export declare const init: (initApp?: IAppOption) => void;
export declare const getType: (target: any) => string;
/**
 * 请求封装
 */
export declare const REQUEST: (options: WxRequest, listen?: RequestListen) => Promise<WxResponse>;
export declare const OPTIONS: (url: string, data?: object, options?: RequestOption, listen?: RequestListen) => Promise<WxResponse>;
export declare const GET: (url: string, data?: object, options?: RequestOption, listen?: RequestListen) => Promise<WxResponse>;
export declare const HEAD: (url: string, data?: object, options?: RequestOption, listen?: RequestListen) => Promise<WxResponse>;
export declare const POST: (url: string, data?: object, options?: RequestOption, listen?: RequestListen) => Promise<WxResponse>;
export declare const PUT: (url: string, data?: object, options?: RequestOption, listen?: RequestListen) => Promise<WxResponse>;
export declare const DELETE: (url: string, data?: object, options?: RequestOption, listen?: RequestListen) => Promise<WxResponse>;
export declare const TRACE: (url: string, data?: object, options?: RequestOption, listen?: RequestListen) => Promise<WxResponse>;
export declare const CONNECT: (url: string, data?: object, options?: RequestOption, listen?: RequestListen) => Promise<WxResponse>;
