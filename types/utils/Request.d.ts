/*
 * Copyright (c) 2023. qnnp <qnnp@qnnp.me>
 */

export declare const REQUEST: (options: WxRequest, listen?: RequestListen) => Promise<WxResponse>
export declare const OPTIONS: (url: string,
  data?: object,
  options?: RequestOption,
  listen?: RequestListen) => Promise<WxResponse>
export declare const GET: (url: string,
  data?: object,
  options?: RequestOption,
  listen?: RequestListen) => Promise<WxResponse>
export declare const HEAD: (url: string,
  data?: object,
  options?: RequestOption,
  listen?: RequestListen) => Promise<WxResponse>
export declare const POST: (url: string,
  data?: object,
  options?: RequestOption,
  listen?: RequestListen) => Promise<WxResponse>
export declare const PUT: (url: string,
  data?: object,
  options?: RequestOption,
  listen?: RequestListen) => Promise<WxResponse>
export declare const DELETE: (url: string,
  data?: object,
  options?: RequestOption,
  listen?: RequestListen) => Promise<WxResponse>
export declare const TRACE: (url: string,
  data?: object,
  options?: RequestOption,
  listen?: RequestListen) => Promise<WxResponse>
export declare const CONNECT: (url: string,
  data?: object,
  options?: RequestOption,
  listen?: RequestListen) => Promise<WxResponse>
