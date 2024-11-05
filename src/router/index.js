import Vue from 'vue';
import VueRouter from 'vue-router';

// 路由守卫跳转报错处理
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
	if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
	return originalPush.call(this, location).catch(err => err)
}
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function push(location, onResolve, onReject) {
	if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
	return originalReplace.call(this, location).catch(err => err)
}
Vue.use(VueRouter);
const router = new VueRouter({
	mode: 'hash',
	routes: [
		{
			path: '/404',
			name: 'pageNotFound',
			meta: {
				title: '404',
				publicPage: true,
			},
			component: () => import(/* webpackChunkName: "publicPage" */ '@/views/public/404.vue'),
		},
	]
});

export default router;
