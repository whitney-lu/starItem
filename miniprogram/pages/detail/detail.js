const db = wx.cloud.database()
Page({
  data: {
    detail: {},
    userInfo: {}
  },
  onLoad: function (e) {
    //接收参数
    let id = e.id
    //根据id查询数据，渲染到页面
    db.collection("head").doc(id).get()
      .then(res => {
        this.setData({
          detail: res.data
        })
      })
      .catch(err => {
        console.log(err)
      })
  }
})