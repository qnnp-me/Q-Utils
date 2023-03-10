/// <reference path="../ref.d.ts" />
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
        beforeRequestMiddleware: <T extends RequestOption>(options: T) => T;
        requestSuccessMiddleware?(res: WxResponse, resolve: (value: WxResponse | WxResponse['data']) => void, reject: (err: WxErr | object) => void): void;
        requestFailMiddleware?(err: WxErr, reject: (err: WxErr | object) => void): void;
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
