import http  from '../utils/request/http.js'

export const getHomeData = (data) => http.GET(`/api/user/home/data`,data)

export const getGoodsData = (data) => http.GET(`/api/good/list`,data)

export const paymentEnergy = (data) => http.POST(`/api/good/buy`,data)

export const useGoods = (data) => http.POST(`/api/good/use`,data)

export const upGradeTree = (data) => http.POST(`/api/good/tree/upgrade`,data)

export const getFriend = (data) => http.GET(`/api/friend/list`,data)

export const getFriendCircle = (data) => http.GET(`/api/friend/home`,data)

export const searchFriend = (data) => http.GET(`/api/friend/search`,data)

export const addFriend = (data) => http.POST(`/api/friend/new/add`,data)

export const getNewFriendList = (data) => http.GET(`/api/friend/new/list`,data)

export const agreeFriendAdd = (data) => http.POST(`/api/friend/new/agree`,data)

export const removeFriend = (data) => http.POST(`/api/friend/delete`,data)

export const getWater = (data) => http.POST(`/api/energys/waltering/go`,data)

export const receiveWater = (data) => http.POST(`/api/energys/receive`,data)

export const stealEnergy = (data) => http.POST(`/api/energys/tx/steal`,data)

export const taskList = (data) => http.GET(`/api/task/list`,data)

export const receiveTask = (data) => http.POST(`/api/task/receive`,data)

export const completedTask = (data) => http.POST(`/api/task/completed`,data)

export const txsList = (data) => http.GET(`/api/txs/list`,data)

export const invatedList = (data) => http.GET('/api/user/invated/list', data)

export const connectWallet = (data) => http.POST('/api/user/wallet_login', data)

export const myinvatedList = (data) => http.GET('/api/user/invated/list', data)
