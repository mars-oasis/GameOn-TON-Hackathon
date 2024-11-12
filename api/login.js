// import config from '../utils/request/config.js'
import http  from '../utils/request/http.js'

// 获取进入程勋的时间戳
export const getComeDappTimestamp = (data) => http.GET(`/api/timestamp`,data)
// 电报登录
export const login = (data) => http.POST(`/api/user/tg_login`,data)