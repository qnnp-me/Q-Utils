"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONNECT = exports.TRACE = exports.DELETE = exports.PUT = exports.POST = exports.HEAD = exports.GET = exports.OPTIONS = exports.REQUEST = exports.getType = exports.init = exports.app = void 0;
/// <reference path="types/IAppOption.ts" />
/// <reference path="types/WxError.ts" />
/// <reference path="types/WxRequest.ts" />
/// <reference path="types/WxResponse.ts" />
/// <reference path="types/RequestOption.ts" />
/// <reference path="common/helper.ts" />
exports.app = getApp();
var init = function (initApp) {
    if (initApp === void 0) { initApp = getApp(); }
    var _a = wx.getAccountInfoSync().miniProgram, envVersion = _a.envVersion, appId = _a.appId, version = _a.version; // 读取环境信息
    var menuButtonPosition = wx.getMenuButtonBoundingClientRect();
    var systemInfo = wx.getSystemInfoSync();
    exports.app = initApp;
    exports.app.appId = appId;
    exports.app.version = version;
    exports.app.env = { version: envVersion };
    exports.app.systemInfo = systemInfo;
    exports.app.safeArea = systemInfo.safeArea;
    exports.app.menuButtonPosition = menuButtonPosition;
    exports.app.update = selfUpdate;
    selfUpdate();
};
exports.init = init;
var selfUpdate = function () {
    var updateManager = wx.getUpdateManager();
    updateManager.onCheckForUpdate(function (res) {
        console.log("Check Update: ".concat(res.hasUpdate ? 'New Update' : 'No Update'));
    });
    updateManager.onUpdateReady(function () {
        wx.showModal({
            title: '更新提示',
            content: '新版本已经准备好，是否重启应用？',
            success: function (res) {
                if (res.confirm) {
                    updateManager.applyUpdate();
                }
            }
        });
    });
    updateManager.onUpdateFailed(function () {
        // 新版本下载失败
    });
};
exports.getType = getObjectType;
/**
 * 请求封装
 */
var REQUEST = function (options) { return (new Promise(function (resolve, reject) {
    var _a;
    var _b;
    // 取值
    var _c = exports.app.config, authType = _c.authType, authKey = _c.authKey, TRIAL_API_HOST = _c.TRIAL_API_HOST, DEV_API_HOST = _c.DEV_API_HOST, requestSuccessMiddleware = _c.requestSuccessMiddleware, requestFailMiddleware = _c.requestFailMiddleware, API_HOST = _c.API_HOST, token = _c.token, requestDefaultOptions = _c.requestDefaultOptions, env = exports.app.env;
    // 加载默认请求配置
    options = __assign(__assign({ method: 'GET', dataType: 'json', timeout: 10000, enableCache: false, header: {} }, requestDefaultOptions), options);
    // 根据不同运行环境使用不同服务器
    if ((env === null || env === void 0 ? void 0 : env.version) === 'develop' && DEV_API_HOST) { // 开发版配置
        API_HOST = DEV_API_HOST;
    }
    else if ((env === null || env === void 0 ? void 0 : env.version) === 'trial' && TRIAL_API_HOST) { // 体验版配置
        API_HOST = TRIAL_API_HOST;
    }
    // 获取 Token ，不管后端如何实现类似值全统称 Token
    token = token || wx.getStorageSync('token');
    // 将 Token 储存到 app
    if (!exports.app.config.token) {
        exports.app.config.token = token;
    }
    if (!authType || authType === 'cookie') {
        options.header = __assign(__assign({}, options.header), { cookie: "".concat(authKey || 'token', "=").concat(token, "; ").concat(((_b = options.header) === null || _b === void 0 ? void 0 : _b.cookie) || '') });
    }
    else if (authType === 'header') {
        options.header = __assign((_a = {}, _a[authKey || 'Authorization'] = token, _a), options.header);
    }
    var fail = function (err) {
        if (requestFailMiddleware && requestFailMiddleware.length === 2) {
            requestFailMiddleware(err, reject);
        }
        else {
            reject(err);
        }
    };
    // 已配置 API_HOST 情况下 相对和绝对路径 url 处理
    if (!options.url.match(/^http/)) {
        if (!API_HOST) {
            fail({ errno: 0, errMsg: 'API_HOST 未设置' });
            return;
        }
        var base_url = API_HOST;
        var absolute = options.url.match(/^\//);
        if (absolute) {
            base_url = API_HOST.split('/').slice(0, 3).join('/');
        }
        options.url = base_url + options.url;
    }
    options = __assign(__assign({}, options), { success: function (res) {
            if (requestSuccessMiddleware && requestSuccessMiddleware.length === 3) {
                requestSuccessMiddleware(res, resolve, fail);
            }
            else if (res.statusCode < 400) {
                resolve(res);
            }
            else {
                fail({ errno: res.statusCode, errMsg: res.errMsg });
            }
        }, fail: fail });
    // 处理请求的数据，如 multipart/form-data 是需要特殊处理的
    if (options.data)
        options.data = prepareRequestData(options);
    wx.request(options);
})); };
exports.REQUEST = REQUEST;
var OPTIONS = function (url, data, options) { return (0, exports.REQUEST)(__assign(__assign({}, options), { method: 'OPTIONS', url: url, data: data })); };
exports.OPTIONS = OPTIONS;
var GET = function (url, data, options) { return (0, exports.REQUEST)(__assign(__assign({}, options), { method: 'GET', url: url, data: data })); };
exports.GET = GET;
var HEAD = function (url, data, options) { return (0, exports.REQUEST)(__assign(__assign({}, options), { method: 'HEAD', url: url, data: data })); };
exports.HEAD = HEAD;
var POST = function (url, data, options) { return (0, exports.REQUEST)(__assign(__assign({}, options), { method: 'POST', url: url, data: data })); };
exports.POST = POST;
var PUT = function (url, data, options) { return (0, exports.REQUEST)(__assign(__assign({}, options), { method: 'PUT', url: url, data: data })); };
exports.PUT = PUT;
var DELETE = function (url, data, options) { return (0, exports.REQUEST)(__assign(__assign({}, options), { method: 'DELETE', url: url, data: data })); };
exports.DELETE = DELETE;
var TRACE = function (url, data, options) { return (0, exports.REQUEST)(__assign(__assign({}, options), { method: 'TRACE', url: url, data: data })); };
exports.TRACE = TRACE;
var CONNECT = function (url, data, options) { return (0, exports.REQUEST)(__assign(__assign({}, options), { method: 'CONNECT', url: url, data: data })); };
exports.CONNECT = CONNECT;
var prepareRequestData = function (options) {
    var _a, _b;
    var data = options.data;
    if (!((_a = options.method) === null || _a === void 0 ? void 0 : _a.match(/GET|HEAD/))
        && ((_b = options.header) === null || _b === void 0 ? void 0 : _b['content-type']) === 'multipart/form-data'
        && typeof data === 'object'
        && (0, exports.getType)(data) === 'object') {
        var formData = new FormData();
        for (var label in data) {
            var value = data[label];
            if ((0, exports.getType)(value) === 'array') {
                formData.appendFile(label, value[1], value[0]);
            }
            else {
                formData.append(label, value);
            }
        }
        data = formData.getData().buffer;
        options.header['content-type'] = formData.getData().contentType;
    }
    return data;
};
var FormData = /** @class */ (function () {
    function FormData() {
        var FormData = require('./../../node_modules/@zlyboy/wx-formdata/formData.js');
        this.FormData = new FormData();
        return this.FormData;
    }
    FormData.prototype.getData = function () {
        return this.FormData.getData();
    };
    FormData.prototype.appendFile = function (name, path, fileName) {
        return this.FormData.appendFile(name, path, fileName);
    };
    FormData.prototype.append = function (name, value) {
        return this.FormData.append(name, value);
    };
    return FormData;
}());
