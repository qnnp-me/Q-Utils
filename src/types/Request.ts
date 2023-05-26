/*
 Copyright (c) 2023. qnnp <qnnp@qnnp.me> https://qnnp.me
 */

/// <reference path="../ref.ts" />

type RequestOption = Omit<WxRequestOption, 'url'>
type RequestListen = (task: WechatMiniprogram.RequestTask) => void
type RequestSuccess = (res: WxResponse) => Promise<WxResponse>
type RequestFail = (err: WxErr) => void
type MethodRequest = (url: string, data?: WxRequestOption['data'], options?: RequestOption, listen?: RequestListen) => Promise<RequestResult>
type RequestResult = WxResponse['data']

type test = Optional<any>
