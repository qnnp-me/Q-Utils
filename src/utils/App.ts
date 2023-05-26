/*
 Copyright (c) 2023. qnnp <qnnp@qnnp.me> https://qnnp.me
 */

export let app: IAppOption = getApp()
const _this = this
export const init = (initApp: IAppOption = getApp()) => {
  // @ts-ignore
  _this.m.exports.app = initApp
  const {
    miniProgram: {envVersion, appId, version}
  } = wx.getAccountInfoSync() // 读取环境信息
  const menuButtonPosition = wx.getMenuButtonBoundingClientRect()
  const systemInfo = wx.getSystemInfoSync()
  initApp.appId = appId
  initApp.version = version
  initApp.env = {version: envVersion}
  initApp.systemInfo = systemInfo
  initApp.safeArea = systemInfo.safeArea
  initApp.menuButtonPosition = menuButtonPosition
  initApp.update = selfUpdate
  selfUpdate()
}
const selfUpdate = () => {
  const updateManager = wx.getUpdateManager()
  updateManager.onCheckForUpdate(function (res) {
    console.log(`Check Update: ${res.hasUpdate ? 'New Update' : 'No Update'}`)
  })
  updateManager.onUpdateReady(function () {
    wx.showModal({
      title: '更新提示',
      content: '新版本已经准备好，是否重启应用？',
      success(res) {
        if (res.confirm) {
          updateManager.applyUpdate()
        }
      }
    })
  })
  updateManager.onUpdateFailed(function () {
    // 新版本下载失败
  })
}
