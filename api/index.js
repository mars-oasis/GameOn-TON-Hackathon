import http  from '../utils/request/http.js'
// 首页获取数据
export const getHomeData = (data) => http.GET(`/api/user/home/data`,data)
// 获取商品列表
export const getGoodsData = (data) => http.GET(`/api/good/list`,data)
// 根据能量去购买商品
export const paymentEnergy = (data) => http.POST(`/api/good/buy`,data)
// 使用商品
export const useGoods = (data) => http.POST(`/api/good/use`,data)
// 升级树
export const upGradeTree = (data) => http.POST(`/api/good/tree/upgrade`,data)
// 获取好友列表
export const getFriend = (data) => http.GET(`/api/friend/list`,data)
// 获取好友家园
export const getFriendCircle = (data) => http.GET(`/api/friend/home`,data)
// 搜索好友
export const searchFriend = (data) => http.GET(`/api/friend/search`,data)
// 添加好友
export const addFriend = (data) => http.POST(`/api/friend/new/add`,data)
// 好友请求列表
export const getNewFriendList = (data) => http.GET(`/api/friend/new/list`,data)
// 同意或者拒绝朋友
export const agreeFriendAdd = (data) => http.POST(`/api/friend/new/agree`,data)
// 删除好友
export const removeFriend = (data) => http.POST(`/api/friend/delete`,data)
// 浇水
export const getWater = (data) => http.POST(`/api/energys/waltering/go`,data)
// 收取能量(别人给我浇水或者链上交易获得的能量球)
export const receiveWater = (data) => http.POST(`/api/energys/receive`,data)
// 偷取能量
export const stealEnergy = (data) => http.POST(`/api/energys/tx/steal`,data)

// 我的任务
export const taskList = (data) => http.GET(`/api/task/list`,data)
// 领取任务能量
export const receiveTask = (data) => http.POST(`/api/task/receive`,data)
// 完成任务
export const completedTask = (data) => http.POST(`/api/task/completed`,data)

// 链上交易记录
export const txsList = (data) => http.GET(`/api/txs/list`,data)
// 我的邀请列表
export const invatedList = (data) => http.GET('/api/user/invated/list', data)
// 链接钱包
export const connectWallet = (data) => http.POST('/api/user/wallet_login', data)
// 邀请好友记录
export const myinvatedList = (data) => http.GET('/api/user/invated/list', data)