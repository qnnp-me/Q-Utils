/// <reference path="ref.d.ts" />
declare const _default: {
    getType: (target: any) => string;
    REQUEST: (options: Partial<WxRequestOption>, listen?: RequestListen) => Promise<any>;
    OPTIONS: MethodRequest;
    GET: MethodRequest;
    HEAD: MethodRequest;
    POST: MethodRequest;
    PUT: MethodRequest;
    DELETE: MethodRequest;
    TRACE: MethodRequest;
    CONNECT: MethodRequest;
    app: IAppOption;
    init: (initApp?: IAppOption) => Promise<IAppOption>;
};
export = _default;
