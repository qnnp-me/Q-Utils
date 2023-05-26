"use strict";
/*
 Copyright (c) 2023. qnnp <qnnp@qnnp.me> https://qnnp.me
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = exports.app = void 0;
exports.app = getApp();
var init = function (initApp) {
    if (initApp === void 0) { initApp = getApp(); }
    exports.app = initApp;
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
