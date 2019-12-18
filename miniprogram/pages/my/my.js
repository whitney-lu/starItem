Page({
  data: {
    userInfo: '',
    isShow: true,
    flag: false
  },
  // 点击登录按钮
  load(e) {
    console.log(e)
    wx.setStorageSync('userinfo', e.detail.userInfo)
    this.setData({
      userInfo: e.detail.userInfo,
      flag: true,
      isShow: false
    })
  },
  // 页面进来加载
  onLoad: function (options) {
    let userinfo = wx.getStorageSync('userinfo')
    if (userinfo) {
      this.setData({
        userInfo: userinfo,
        isShow: false,
        flag: true
      })
    }
  },
  // 添加用户信息
  addInformation() {
    let userinfo = wx.getStorageSync('userinfo')
    if(userinfo){
      wx.navigateTo({
        url: '/pages/addInfo/addInfo',
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '请先登录',
      })
    }
  },
  // 点击历史信息
  historyInfo(){
    let userinfo = wx.getStorageSync('userinfo')
    console.log('2212')
    if (userinfo) {
      wx.navigateTo({
        url: '/pages/history/history'
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '请先登录',
      })
    }
  }
})