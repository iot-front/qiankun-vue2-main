import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/components/base/svgIcon/index.js'
import '@/assets/css/iconfonts/iconfont.css';
import "@/assets/css/iconfonts/iconfont.js";
import '@/assets/css/base.css';

Vue.prototype.$store = store;
new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#main-app');
