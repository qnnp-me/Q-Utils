"use strict";
/*
 Copyright (c) 2023. qnnp <qnnp@qnnp.me> https://qnnp.me
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = exports.app = void 0;
exports.app = getApp();
var _this = this;
var init = function (initApp) {
    if (initApp === void 0) { initApp = getApp(); }
    var _a = wx.getAccountInfoSync().miniProgram, envVersion = _a.envVersion, appId = _a.appId, version = _a.version; // 读取环境信息
    var menuButtonPosition = wx.getMenuButtonBoundingClientRect();
    var systemInfo = wx.getSystemInfoSync();
    // @ts-ignore
    _this.app = initApp;
    // @ts-ignore
    _this.app.appId = appId;
    // @ts-ignore
    _this.app.version = version;
    // @ts-ignore
    _this.app.env = { version: envVersion };
    // @ts-ignore
    _this.app.systemInfo = systemInfo;
    // @ts-ignore
    _this.app.safeArea = systemInfo.safeArea;
    // @ts-ignore
    _this.app.menuButtonPosition = menuButtonPosition;
    // @ts-ignore
    _this.app.update = selfUpdate;
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
