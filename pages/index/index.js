// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    isShowCamera: false,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onReady: function () {
    // 显示摄像头
    this.setData({
      isShowCamera: true
    });
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  /**
   * 扫码事件
   */
  scanCodeEvent: function(){
    var that = this;
    wx.scanCode({
      onlyFromCamera: true,// 只允许从相机扫码
      success(res){
        console.log("扫码成功："+JSON.stringify(res));
        console.log("识别数据："+res.result);
        // 扫码成功后  在此处理接下来的逻辑
        wx.request({
          url: res.result, //接口地址

          header: {
            'content-type': 'application/text' // 默认值
          },
          success (res) {}
        });
        wx.vibrateShort(); // 手机震动提示
        
      }
    })
  },
  scanCode: function (e) {
    // 扫码成功，处理识别到的二维码数据
    console.log('扫码结果：', e.detail.result);
    
    // 继续扫码
    wx.scanCode({
      success: (res) => {
        console.log('扫码结果：', res.result);
        wx.vibrateShort(); // 手机震动提示
        
        // 继续调用扫码方法
        this.scanCode();
      },
      fail: (res) => {
        console.log('扫码失败：', res.errMsg);
      }
    });
  },
  cameraError: function (e) {
    // 处理摄像头错误
    console.log('摄像头错误：', e.detail.errMsg);
  }

})
