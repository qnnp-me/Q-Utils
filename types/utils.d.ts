/// <reference path="ref.d.ts" />
/// <reference types="miniprogram-api-typings" />
declare const _default: {
    getType: (target: any) => string;
    REQUEST: (options: Partial<WxRequestOption>, listen?: RequestListen) => Promise<string | WechatMiniprogram.IAnyObject | ArrayBuffer>;
    OPTIONS: MethodRequest;
    GET: MethodRequest;
    HEAD: MethodRequest;
    POST: MethodRequest;
    PUT: MethodRequest;
    DELETE: MethodRequest;
    TRACE: MethodRequest;
    CONNECT: MethodRequest;
    app: IAppOption;
    init: (initApp?: IAppOption) => void;
};
export = _default;
