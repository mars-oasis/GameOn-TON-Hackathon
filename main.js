import App from './App'

// // #ifndef VUE3
// import Vue from 'vue'
// import * as buffer from "buffer"; //引入buffer
// import './uni.promisify.adaptor'
// Vue.config.productionTip = false
// App.mpType = 'app'
// const app = new Vue({
// 	...App
// })
// app.$mount()
// // #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
// import { createPinia } from 'pinia';
import * as buffer from "buffer"; //引入buffer
import * as Pinia from "pinia";
import {
	createUnistorage
} from "@/uni_modules/pinia-plugin-unistorage/index.js";

if (typeof(window).Buffer === "undefined") { 
	(window).Buffer = buffer.Buffer; 
}

import tools from '@/utils/tools.js'

import cn from '@/locales/zh-CN.js'
import en from '@/locales/en-US.js'
import {
	createI18n
} from 'vue-i18n'
// import *as VueI18n from 'vue-i18n'
// import VueI18n from 'vue-i18n';

let locale = tools.getSession('locale')
console.log("locale:", locale)
if (!locale) {
	locale = 'zh-CN'
	tools.setSession('locale', 'zh-CN')
}
// let locale = 'zh-CN'
const i18n = createI18n({
	locale,
	messages: {
		'zh-CN': cn, 
		'en-US': en
	}
})

export function createApp() {
	const app = createSSRApp(App)
	const store = Pinia.createPinia();
	app.use(i18n)
	
	
	store.use(createUnistorage());

	app.use(store);
	return {
		app,
		Pinia
	}
}
// #endif
