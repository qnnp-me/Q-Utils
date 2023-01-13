/*
 * !
 * Copyright (c) 2023. qnnp <qnnp@qnnp.me>
 *
 */

/// <reference path="RequestOption.d.ts" />
/// <reference path="WxRequest.d.ts" />
/// <reference path="WxResponse.d.ts" />
/// <reference path="WxError.d.ts" />
/// <reference types="miniprogram-api-typings" />
type URL = `http${'s' | ''}://${string}/`;
interface IAppOption {
    appId?: WechatMiniprogram.MiniProgram['appId'];
    version?: WechatMiniprogram.MiniProgram['version'];
    config: {
        token?: string;
        authType?: 'cookie' | 'header';
        authKey?: string | 'token';
        API_HOST: URL;
        DEV_API_HOST?: URL;
        TRIAL_API_HOST?: URL;
        requestDefaultOptions?: RequestOption;
        beforeRequestMiddleware? (options: WxRequest): WxRequest;
        requestSuccessMiddleware? (res: WxResponse,
          resolve: (value: WxResponse) => void,
          reject: (err: WxError) => void): void;
        requestFailMiddleware? (err: WxError, reject: (err: WxError) => void): void;
    };
    globalData: {
        userInfo?: WechatMiniprogram.UserInfo;
    };
    env?: {
        version: WechatMiniprogram.MiniProgram['envVersion'];
    };
    update?: () => void;
    systemInfo?: WechatMiniprogram.SystemInfo;
    safeArea?: WechatMiniprogram.SystemInfo['safeArea'];
    menuButtonPosition?: WechatMiniprogram.ClientRect;
}
