/// <reference types="miniprogram-api-typings" />
/// <reference types="miniprogram-api-typings" />
interface RequestOption<T extends string | WechatMiniprogram.IAnyObject | ArrayBuffer = string | WechatMiniprogram.IAnyObject | ArrayBuffer> {
  url?: string;
  header?: {
    cookie?: string;
    'content-type'?: string | 'application/json' | 'application/x-www-form-urlencoded' | 'multipart/form-data';
  };
  complete?: WechatMiniprogram.RequestCompleteCallback;
  data?: string | WechatMiniprogram.IAnyObject | ArrayBuffer;
  dataType?: 'json' | '其他';
  enableCache?: boolean;
  enableChunked?: boolean;
  enableHttp2?: boolean;
  enableHttpDNS?: boolean;
  enableQuic?: boolean;
  fail?: WechatMiniprogram.RequestFailCallback;
  forceCellularNetwork?: boolean;
  httpDNSServiceId?: string;
  method?: 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT';
  responseType?: 'text' | 'arraybuffer';
  success?: WechatMiniprogram.RequestSuccessCallback<T>;
  timeout?: number;
}
