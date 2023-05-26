/*
 Copyright (c) 2023. qnnp <qnnp@qnnp.me> https://qnnp.me
 */

/// <reference path="../ref.ts" />

type RequestOption = Omit<WxRequestOption, 'url'>
type RequestListen = (task: WechatMiniprogram.RequestTask) => void
type RequestSuccess = <T extends WxResponse>(res: T) => void
type RequestFail = (err: WxErr) => void
type MethodRequest = (url: string, data: WxRequestOption['data'], options: RequestOption, listen: RequestListen) => void
type RequestResult = WxResponse['data']

type test = Optional<any>
