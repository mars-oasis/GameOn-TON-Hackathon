// import config from '../utils/request/config.js'
import http  from '../utils/request/http.js'

export const getComeDappTimestamp = (data) => http.GET(`/api/timestamp`,data)

export const login = (data) => http.POST(`/api/user/tg_login`,data)
