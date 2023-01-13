"use strict";
/*
 * Copyright (c) 2023. qnnp <qnnp@qnnp.me>
 */
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONNECT = exports.TRACE = exports.DELETE = exports.PUT = exports.POST = exports.HEAD = exports.GET = exports.OPTIONS = exports.REQUEST = void 0;
var helpers_1 = require("./helpers");
var App_1 = require("./App");
/**
 * 请求封装
 */
var REQUEST = function (options, listen) { return (new Promise(function (resolve, reject) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, authType, authKey, TRIAL_API_HOST, DEV_API_HOST, requestSuccessMiddleware, requestFailMiddleware, API_HOST, token, requestDefaultOptions, env, task, fail, base_url, absolute, _b;
    var _c;
    var _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _a = App_1.app.config, authType = _a.authType, authKey = _a.authKey, TRIAL_API_HOST = _a.TRIAL_API_HOST, DEV_API_HOST = _a.DEV_API_HOST, requestSuccessMiddleware = _a.requestSuccessMiddleware, requestFailMiddleware = _a.requestFailMiddleware, API_HOST = _a.API_HOST, token = _a.token, requestDefaultOptions = _a.requestDefaultOptions, env = App_1.app.env;
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
                if (!App_1.app.config.token) {
                    App_1.app.config.token = token;
                }
                if (!authType || authType === 'cookie') {
                    options.header = __assign(__assign({}, options.header), { cookie: "".concat(authKey || 'token', "=").concat(token, "; ").concat(((_d = options.header) === null || _d === void 0 ? void 0 : _d.cookie) || '') });
                }
                else if (authType === 'header') {
                    options.header = __assign((_c = {}, _c[authKey || 'Authorization'] = token, _c), options.header);
                }
                fail = function (err) {
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
                        return [2 /*return*/];
                    }
                    base_url = API_HOST;
                    absolute = options.url.match(/^\//);
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
                if (!options.data) return [3 /*break*/, 2];
                _b = options;
                return [4 /*yield*/, prepareRequestData(options)
                    // 请求前中间件
                ];
            case 1:
                _b.data = _e.sent();
                _e.label = 2;
            case 2:
                // 请求前中间件
                if (App_1.app.config.beforeRequestMiddleware)
                    options = App_1.app.config.beforeRequestMiddleware(options);
                task = wx.request(options);
                listen && listen(task);
                return [2 /*return*/];
        }
    });
}); })); };
exports.REQUEST = REQUEST;
var OPTIONS = function (url, data, options, listen) { return (0, exports.REQUEST)(__assign(__assign({}, options), { method: 'OPTIONS', url: url, data: data }), listen); };
exports.OPTIONS = OPTIONS;
var GET = function (url, data, options, listen) { return (0, exports.REQUEST)(__assign(__assign({}, options), { method: 'GET', url: url, data: data }), listen); };
exports.GET = GET;
var HEAD = function (url, data, options, listen) { return (0, exports.REQUEST)(__assign(__assign({}, options), { method: 'HEAD', url: url, data: data }), listen); };
exports.HEAD = HEAD;
var POST = function (url, data, options, listen) { return (0, exports.REQUEST)(__assign(__assign({}, options), { method: 'POST', url: url, data: data }), listen); };
exports.POST = POST;
var PUT = function (url, data, options, listen) { return (0, exports.REQUEST)(__assign(__assign({}, options), { method: 'PUT', url: url, data: data }), listen); };
exports.PUT = PUT;
var DELETE = function (url, data, options, listen) { return (0, exports.REQUEST)(__assign(__assign({}, options), { method: 'DELETE', url: url, data: data }), listen); };
exports.DELETE = DELETE;
var TRACE = function (url, data, options, listen) { return (0, exports.REQUEST)(__assign(__assign({}, options), { method: 'TRACE', url: url, data: data }), listen); };
exports.TRACE = TRACE;
var CONNECT = function (url, data, options, listen) { return (0, exports.REQUEST)(__assign(__assign({}, options), { method: 'CONNECT', url: url, data: data }), listen); };
exports.CONNECT = CONNECT;
var Multipart = require('Multipart.min');
var prepareRequestData = function (options) { return __awaiter(void 0, void 0, void 0, function () {
    var data, formData, name, value;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                data = options.data;
                if (!(!((_a = options.method) === null || _a === void 0 ? void 0 : _a.match(/GET|HEAD/))
                    && ((_b = options.header) === null || _b === void 0 ? void 0 : _b['content-type']) === 'multipart/form-data'
                    && typeof data === 'object'
                    && (0, helpers_1.getType)(data) === 'object')) return [3 /*break*/, 2];
                formData = new Multipart({ files: [], fields: [] });
                for (name in data) {
                    value = data[name];
                    if ((0, helpers_1.getType)(value) === 'array') {
                        formData.file({ name: name, filename: value[0], filePath: value[1] });
                    }
                    else {
                        formData.field({ name: name, value: value });
                    }
                }
                options.header['content-type'] = 'multipart/form-data; boundary=' + formData.getBoundary();
                return [4 /*yield*/, formData.convertToBuffer()];
            case 1:
                data = _c.sent();
                _c.label = 2;
            case 2: return [2 /*return*/, data];
        }
    });
}); };
