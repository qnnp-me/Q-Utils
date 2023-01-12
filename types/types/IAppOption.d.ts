/// <reference types="wx" />
declare interface IAppOption {
    appId?: WechatMiniprogram.MiniProgram['appId'];
    version?: WechatMiniprogram.MiniProgram['version'];
    config: {
        token?: string;
        authType?: 'cookie' | 'header';
        authKey?: string | 'token';
        API_HOST: `https://${string}/`;
        DEV_API_HOST?: `https://${string}/`;
        TRIAL_API_HOST?: `https://${string}/`;
        requestDefaultOptions?: RequestOption;
        requestSuccessMiddleware?(res: WxResponse, resolve: (value: WxResponse) => void, reject: (err: WxError) => void): void;
        requestFailMiddleware?(err: WxError, reject: (err: WxError) => void): void;
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
