/*
 * Copyright (c) 2023. qnnp <qnnp@qnnp.me>
 */

/// <reference path="references.d.ts" />
/// <reference types="miniprogram-api-typings" />
declare const _default: {
    getType: (target: any) => string;
    REQUEST: (options: WxRequest, listen?: RequestListen) => Promise<WxResponse>;
    OPTIONS: (url: string,
      data?: object,
      options?: RequestOption<string | WechatMiniprogram.IAnyObject | ArrayBuffer>,
      listen?: RequestListen) => Promise<WxResponse>;
    GET: (url: string,
      data?: object,
      options?: RequestOption<string | WechatMiniprogram.IAnyObject | ArrayBuffer>,
      listen?: RequestListen) => Promise<WxResponse>;
    HEAD: (url: string,
      data?: object,
      options?: RequestOption<string | WechatMiniprogram.IAnyObject | ArrayBuffer>,
      listen?: RequestListen) => Promise<WxResponse>;
    POST: (url: string,
      data?: object,
      options?: RequestOption<string | WechatMiniprogram.IAnyObject | ArrayBuffer>,
      listen?: RequestListen) => Promise<WxResponse>;
    PUT: (url: string,
      data?: object,
      options?: RequestOption<string | WechatMiniprogram.IAnyObject | ArrayBuffer>,
      listen?: RequestListen) => Promise<WxResponse>;
    DELETE: (url: string,
      data?: object,
      options?: RequestOption<string | WechatMiniprogram.IAnyObject | ArrayBuffer>,
      listen?: RequestListen) => Promise<WxResponse>;
    TRACE: (url: string,
      data?: object,
      options?: RequestOption<string | WechatMiniprogram.IAnyObject | ArrayBuffer>,
      listen?: RequestListen) => Promise<WxResponse>;
    CONNECT: (url: string,
      data?: object,
      options?: RequestOption<string | WechatMiniprogram.IAnyObject | ArrayBuffer>,
      listen?: RequestListen) => Promise<WxResponse>;
    app: IAppOption;
    init: (initApp?: IAppOption) => void;
}
export = _default;
