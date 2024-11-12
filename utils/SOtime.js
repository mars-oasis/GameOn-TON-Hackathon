

function getNowTimestamp(){
	return new Date().getTime()
}


function getDateData(timestamp){
	var date = new Date(timestamp)
	var dateData = {
		year:date.getFullYear(),
		month:date.getMonth()+1<10?'0'+(date.getMonth()+1):(date.getMonth()+1),
		day:date.getDate()<10?'0'+date.getDate():date.getDate(),
		hour:date.getHours()<10?'0'+date.getHours():date.getHours(),
		minute:date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes(),
		second:date.getSeconds()<10?'0'+date.getSeconds():date.getSeconds(),
		week:week[date.getDay()]
	}
	var data = {
		date: `${dateData.year}-${dateData.month}-${dateData.day}`,
		time: `${dateData.hour}:${dateData.minute}:${dateData.second}`,
		data: dateData
	}
	return data
}


const getTimestamp = ()=>{
	return getNowTimestamp()
}


const getDateTime = ()=>{
	var data = timestampToDate(getNowTimestamp())
	return data
}

const timestampToDate = (timestamp)=>{
	var dateData = getDateData(timestamp)
	var data = `${dateData.date} ${dateData.time}`
	
	return data
}

const dateToTimestamp = (DateTime)=>{
	DateTime = DateTime.replaceAll('-','/')
	return new Date(DateTime).getTime()
}


const timeDistance = (timestamp)=>{
	
	var m = 60*1000
	var h = 60*m   
	var d = 24*h
	var M = 30*d    
	var y = 12*M   
	
	var now = getNowTimestamp()		
	var distance = null				
	var flag = null					
	if(now>timestamp){				
		distance = now - timestamp
		flag = "front"
	}else{							
		distance = timestamp - now
		flag = "back"
	}
	
	var data = null
	
	switch(true){
		case distance > y:
			data = getDateData(timestamp).date
		break
		case distance > M:
			data = `${parseInt(distance/M)}月${flag}`
		break
		case distance > d:
			data = `${parseInt(distance/d)}天${flag}`
		break
		case distance > h:
			data = `${parseInt(distance/h)}小时${flag}`
		break
		case distance > m:
			data = `${parseInt(distance/m)}分钟${flag}`
		break
		case distance < m:
			data = flag=='front'?'just now':'1'
		break
	}
	return data
}


const timeAbbreviated = (timestamp)=>{
	var dateData = getDateData(timestamp)										
	var nowDateData = getDateData(getNowTimestamp())							
	var today = dateToTimestamp(`${nowDateData.date} 00:00:00`)					
	var yesterday = today-24*60*60*1000											
	var threeDays = today-24*60*60*1000*3										
	var thisYear =  dateToTimestamp(`${nowDateData.data.year}-01-01 00:00:00`)		
	switch(true){
		case timestamp >= today:
			data = `${dateData.data.hour}:${dateData.data.minute}`
		break
		case timestamp >= yesterday:
			data = 'yesterday'
		break
		case timestamp >= threeDays:
			data = dateData.data.week
		break
		case timestamp >= thisYear:
			data = `${dateData.data.month}月${dateData.data.day}日`
		break
		case timestamp < thisYear:
			data = `${dateData.data.year}年${dateData.data.month}月${dateData.data.day}日`
		break
	}
	
	return data
}




const countdown = (start,end)=>{
	start = parseInt(start/1000)
	end = parseInt(end/1000)
	var distance = end - start 
	var data = {
		day:0,
		hour:0,
		minute:0,
		second:0
	}
	switch(true){
		case distance < 60:
			data.second = distance
		break
		case distance < 3600:
			data.second = distance % 60
			data.minute = (distance-data.second)/60
		break
		case distance < 3600*24:
			data.hour = parseInt(distance/60/60)
			data.minute = parseInt((distance-data.hour*60*60)/60)
			data.second = distance % 60
		break
		case distance >= 3600*24:
			data.day = parseInt(distance/60/60/24)
			data.hour = parseInt((distance-data.day*24*60*60)/60/60)
			data.minute = parseInt((distance-data.day*24*60*60-data.hour*60*60)/60)
			data.second = distance % 60
		break
	}
	return data
}


 
export default {
	getTimestamp,
	getDateTime,
	timestampToDate,
	dateToTimestamp,
	timeDistance,
	timeAbbreviated,
	countdown
}
