const db = wx.cloud.database();
const app = getApp();
Page({
  data: {
    region: ['陕西省','西安市','新城区'],
    localImage: '',
    list: []
  },
  // 选择本地图片
  addImg() {
    wx.chooseImage({
      count: 1,
      success: (res) => {
        // console.log(res)
        this.setData({
          localImage: res.tempFilePaths[0]
        })
      }
    })
  },
  myRegion(e) {
    this.setData({
      region: e.detail.value
    })
  },
  // 提交表单
  mySubmit(e) {
    wx.showLoading({
      title: "正在添加",
      mask: true,
    })
    var localImage = e.detail.value.localImage;
    let ext = /\.\w+$/.exec(localImage)[0];
    // 上传图片，获取图片云存储的地址（fileID）
    wx.cloud.uploadFile({
      // 上传到云端的路径
      cloudPath:new Date().getTime()+ext,
      // 小程序临时文件的路径
      filePath:localImage,
      success:res=>{
        // 返回文件的ID
        // e.detail.value.localImage = res.fileID;
        //整理表单数据
        let newDetail = e.detail.value;
        newDetail.fileID = res.fileID;
        delete(newDetail.localImage);
        // 添加用户信息
        newDetail.avatarUrl = app.globalData.userInfo.avatarUrl;
        newDetail.nickName = app.globalData.userInfo.nickName;
        newDetail.time = new Date().getTime();

        db.collection("head").add({
          data: newDetail,
          success:res=>{
            wx.hideLoading();
            wx.switchTab({
              url: '/pages/index/index'
            })
          }
        })
      }
    })
  },
  // 成功提示弹框
  popSuccessTest(){
    wx.wx.showToast({
      title: '提交成功',
      icon: 'success',
      duration:2000
    })
  }
})