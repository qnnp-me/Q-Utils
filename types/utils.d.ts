/// <reference path="ref.d.ts" />
/// <reference types="miniprogram-api-typings" />
/// <reference types="miniprogram-api-typings" />
/// <reference types="miniprogram-api-typings" />
declare const _default: {
    getType: (target: any) => string;
    REQUEST: (options: WxRequestOption<string | WechatMiniprogram.IAnyObject | ArrayBuffer>, listen?: RequestListen) => Promise<unknown>;
    OPTIONS: (url: string, data?: object, options?: Optional<WxRequestOption<string | WechatMiniprogram.IAnyObject | ArrayBuffer>>, listen?: RequestListen) => Promise<unknown>;
    GET: (url: string, data?: object, options?: Optional<WxRequestOption<string | WechatMiniprogram.IAnyObject | ArrayBuffer>>, listen?: RequestListen) => Promise<unknown>;
    HEAD: (url: string, data?: object, options?: Optional<WxRequestOption<string | WechatMiniprogram.IAnyObject | ArrayBuffer>>, listen?: RequestListen) => Promise<unknown>;
    POST: (url: string, data?: object, options?: Optional<WxRequestOption<string | WechatMiniprogram.IAnyObject | ArrayBuffer>>, listen?: RequestListen) => Promise<unknown>;
    PUT: (url: string, data?: object, options?: Optional<WxRequestOption<string | WechatMiniprogram.IAnyObject | ArrayBuffer>>, listen?: RequestListen) => Promise<unknown>;
    DELETE: (url: string, data?: object, options?: Optional<WxRequestOption<string | WechatMiniprogram.IAnyObject | ArrayBuffer>>, listen?: RequestListen) => Promise<unknown>;
    TRACE: (url: string, data?: object, options?: Optional<WxRequestOption<string | WechatMiniprogram.IAnyObject | ArrayBuffer>>, listen?: RequestListen) => Promise<unknown>;
    CONNECT: (url: string, data?: object, options?: Optional<WxRequestOption<string | WechatMiniprogram.IAnyObject | ArrayBuffer>>, listen?: RequestListen) => Promise<unknown>;
    app: IAppOption;
    init: (initApp?: IAppOption) => void;
};
export = _default;
