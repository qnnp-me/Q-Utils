/*
 Copyright (c) 2023. qnnp <qnnp@qnnp.me> https://qnnp.me
 */

export let app: IAppOption = getApp()
const _this = this
export const init = (initApp: IAppOption = getApp()) => {
  const {
    miniProgram: {envVersion, appId, version}
  } = wx.getAccountInfoSync() // 读取环境信息
  const menuButtonPosition = wx.getMenuButtonBoundingClientRect()
  const systemInfo = wx.getSystemInfoSync()
  // @ts-ignore
  _this.app = initApp
  // @ts-ignore
  _this.app.appId = appId
  // @ts-ignore
  _this.app.version = version
  // @ts-ignore
  _this.app.env = {version: envVersion}
  // @ts-ignore
  _this.app.systemInfo = systemInfo
  // @ts-ignore
  _this.app.safeArea = systemInfo.safeArea
  // @ts-ignore
  _this.app.menuButtonPosition = menuButtonPosition
  // @ts-ignore
  _this.app.update = selfUpdate
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
