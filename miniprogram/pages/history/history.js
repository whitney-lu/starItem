const db = wx.cloud.database()
const app = getApp();
Page({
  data: {
    historyList: []
  },
  //列表读取
  onLoad: function () {
    //获取openid
    let _openid = app.globalData.openid;
    //根据openid，读取用户所添加的记录
    db.collection("head").where({ _openid }).get()
      .then(res => {
        this.setData({
          historyList: res.data
        })
      })
      .catch(err => {
        console.log(err)
      })
  },
  //删除
  del(e) {
    var index = e.currentTarget.dataset.index
    var id = e.currentTarget.id
    wx.showModal({
      title: '提示',
      content: '是否删除本条数据？',
      success: res => {
        if (res.confirm) {
          //删除数据库中的记录
          db.collection('head').doc(id).remove({
            success: (res) => {
              wx.showToast({
                title: '已删除',
                icon: 'success',
                duration: 2000,
                success: (res) => {
                  //在页面中删除当前记录
                  this.data.historyList.splice(index, 1)
                  this.setData({
                    historyList: this.data.historyList
                  })
                }
              })
            }
          })
        } else if (res.cancel) {
          console.log('取消')
        }
      }
    })
  }
})