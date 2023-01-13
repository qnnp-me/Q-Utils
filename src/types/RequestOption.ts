/*
 * Copyright (c) 2023. qnnp <qnnp@qnnp.me> https://qnnp.me
 */

/// <reference path="../ref.ts" />
interface RequestOption<T extends string | WechatMiniprogram.IAnyObject | ArrayBuffer = | string | WechatMiniprogram.IAnyObject | ArrayBuffer> {
  url?: string
  /** 设置请求的 header，header 中不能设置 Referer。
   *
   * `content-type` 默认为 `application/json` */
  header?: {
    cookie?: string
    'content-type'?: string | 'application/json' | 'application/x-www-form-urlencoded' | 'multipart/form-data'
  }
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  complete?: WechatMiniprogram.RequestCompleteCallback
  /**
   * 请求的参数 <br/>
   * 文件字段格式为 { field: [fileName, filePath] }
   */
  data?: string | WechatMiniprogram.IAnyObject | ArrayBuffer
  /** 返回的数据格式
   *
   * 可选值：
   * - 'json': 返回的数据为 JSON，返回后会对返回的数据进行一次 JSON.parse;
   * - '其他': 不对返回的内容进行 JSON.parse; */
  dataType?: 'json' | '其他'
  /** 需要基础库： `2.10.4`
   *
   * 开启 cache */
  enableCache?: boolean
  /** 需要基础库： `2.20.2`
   *
   * 开启 transfer-encoding chunked。 */
  enableChunked?: boolean
  /** 需要基础库： `2.10.4`
   *
   * 开启 http2 */
  enableHttp2?: boolean
  /** 需要基础库： `2.19.1`
   *
   * 是否开启 HttpDNS 服务。如开启，需要同时填入 httpDNSServiceId 。 HttpDNS 用法详见
   * [移动解析HttpDNS](https://developers.weixin.qq.com/miniprogram/dev/framework/ability/HTTPDNS.html) */
  enableHttpDNS?: boolean
  /** 需要基础库： `2.10.4`
   *
   * 开启 quic */
  enableQuic?: boolean
  /** 接口调用失败的回调函数 */
  fail?: WechatMiniprogram.RequestFailCallback
  /** 需要基础库： `2.21.0`
   *
   * wifi下使用移动网络发送请求 */
  forceCellularNetwork?: boolean
  /** 需要基础库： `2.19.1`
   *
   * HttpDNS 服务商 Id。 HttpDNS 用法详见
   * [移动解析HttpDNS](https://developers.weixin.qq.com/miniprogram/dev/framework/ability/HTTPDNS.html) */
  httpDNSServiceId?: string
  /** HTTP 请求方法
   *
   * 可选值：
   * - 'OPTIONS': HTTP 请求 OPTIONS;
   * - 'GET': HTTP 请求 GET;
   * - 'HEAD': HTTP 请求 HEAD;
   * - 'POST': HTTP 请求 POST;
   * - 'PUT': HTTP 请求 PUT;
   * - 'DELETE': HTTP 请求 DELETE;
   * - 'TRACE': HTTP 请求 TRACE;
   * - 'CONNECT': HTTP 请求 CONNECT; */
  method?: | 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT'
  /** 需要基础库： `1.7.0`
   *
   * 响应的数据类型
   *
   * 可选值：
   * - 'text': 响应的数据为文本;
   * - 'arraybuffer': 响应的数据为 ArrayBuffer; */
  responseType?: 'text' | 'arraybuffer'
  /** 接口调用成功地回调函数 */
  success?: WechatMiniprogram.RequestSuccessCallback<T>
  /** 需要基础库： `2.10.0`
   *
   * 超时时间，单位为毫秒。默认值为 60000 */
  timeout?: number
}
