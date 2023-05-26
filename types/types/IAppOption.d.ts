/// <reference path="../ref.d.ts" />
/// <reference types="miniprogram-api-typings" />
type API_URL = `http${'s' | ''}://${string}/`;
declare interface IAppOption {
    appId?: WechatMiniprogram.MiniProgram['appId'];
    version?: WechatMiniprogram.MiniProgram['version'];
    config?: {
        token?: string;
        authType?: 'cookie' | 'header';
        authKey?: string | 'token';
        API_HOST: API_URL;
        DEV_API_HOST?: API_URL;
        TRIAL_API_HOST?: API_URL;
        requestDefaultOptions?: RequestOption;
        beforeRequestMiddleware?: <T extends RequestOption>(options: T) => T;
        requestSuccessMiddleware?: <RES extends WxResponse, R extends (data: any) => void, E extends (err: any) => void>(res: RES, resolve: R, reject: E) => void;
        requestFailMiddleware?: <ER extends WxErr, E extends (err: any) => void>(err: ER, reject: E) => void;
    };
    globalData: {
        userInfo?: WechatMiniprogram.UserInfo;
        [key: string]: any;
    };
    env?: {
        version: WechatMiniprogram.MiniProgram['envVersion'];
    };
    update?: () => void;
    systemInfo?: WechatMiniprogram.SystemInfo;
    safeArea?: WechatMiniprogram.SystemInfo['safeArea'];
    menuButtonPosition?: WechatMiniprogram.ClientRect;
    [key: string]: any;
}
