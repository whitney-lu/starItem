const db = wx.cloud.database()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    userInfo:{}
  },
  // 跳转详情页面
  DetailPage(e){
    let id = e.currentTarget.id
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    db.collection("head").where({}).orderBy('time', 'desc').get()
    .then(res=>{
      this.setData({
        list: res.data
      })
    })
    .catch(err=>{
      console.log(err)
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showLoading({
      title: '刷新页面',
    })
    this.setData({
      userInfo:wx.getStorageSync('userInfo')
    })
    wx.collection("head").where({}).get()
    .then(res=>{
      wx.hideLoading();
      this.setData({
        list: res.data.itemInfo
      })
    })
    .catch(err=>{
      console.log(err)
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('页面触底了')
  }
})