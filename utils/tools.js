import SQtime from './SOtime.js'
console.log('SQtime', SQtime)
let timeout = null
let flag = false
let timer = null
export default {
	...SQtime,
	debounce(func, wait = 500, immediate = false) {
	
	    if (timeout !== null) clearTimeout(timeout)

	    if (immediate) {
	        const callNow = !timeout
	        timeout = setTimeout(() => {
	            timeout = null
	        }, wait)
	        if (callNow) typeof func === 'function' && func()
	    } else {

	        timeout = setTimeout(() => {
	            typeof func === 'function' && func()
	        }, wait)
	    }
	},
	throttle(func, wait = 500, immediate = true) {
	    if (immediate) {
	        if (!flag) {
	            flag = true
	
	            typeof func === 'function' && func()
	            timer = setTimeout(() => {
	                flag = false
	            }, wait)
	        }
	    } else if (!flag) {
	        flag = true

	        timer = setTimeout(() => {
	            flag = false
	            typeof func === 'function' && func()
	        }, wait)
	    }
	},

	getDate(date, AddDayCount = 0) {
		if (!date) {
			date = new Date()
		}
		if (typeof date !== 'object') {
			date = date.replace(/-/g, '/')
		}
		const dd = new Date(date)
	
		dd.setDate(dd.getDate() + AddDayCount) 
	
		const y = dd.getFullYear()
		const m = dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1 
		const d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate() 
		return {
			fullDate: y + '-' + m + '-' + d,
			year: y,
			month: m,
			date: d,
			day: dd.getDay()
		}
	},
	
	setSession(key, value) {
	  if (typeof value == 'object') {
	
	    value = window.JSON.stringify(value)
	  }
	  sessionStorage.setItem(key, value)
	},
	getSession(key) {
	  let value = sessionStorage.getItem(key) 
	  if (value) {
	    try {
	      let json = window.JSON.parse(value) 
	
	      if (typeof json == 'object' && json) {
	       
	        return json
	      }
	      return value
	    } catch (e) {
	      return value
	    }
	  } else {
	    return value
	  }
	}
}
