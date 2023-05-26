/// <reference path="../ref.d.ts" />
/// <reference types="miniprogram-api-typings" />
type URL = `http${'s' | ''}://${string}/`;
interface IAppOption {
    appId?: WechatMiniprogram.MiniProgram['appId'];
    version?: WechatMiniprogram.MiniProgram['version'];
    config?: {
        token?: string;
        authType?: 'cookie' | 'header';
        authKey?: string | 'token';
        API_HOST: URL;
        DEV_API_HOST?: URL;
        TRIAL_API_HOST?: URL;
        requestDefaultOptions?: RequestOption;
        beforeRequestMiddleware?: <T extends RequestOption>(options: T) => T;
        requestSuccessMiddleware?: <RES extends WxResponse, R, E>(res: RES, resolve: R, reject: E) => void;
        requestFailMiddleware?: <ER extends WxErr, E extends RequestFail>(err: ER, reject: E) => void;
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
