import { haigeekRequest } from 'haigeek-axios';
import { Message } from 'element-ui';
import { loading } from 'haier-methods';


const env = process.env.NODE_ENV;
const envApi = process.env.VUE_APP_BASE_API;
export let baseapi = '';

if (env === 'development') {
	if (envApi === 'dev') {
		baseapi = '/Apitest';
	} else if (envApi === 'prod') {
		baseapi = '/Apiprod';
	}
}
/**
 * @description: 封装请求类
 * @param {method} method 请求方式
 * @param {path} path 请求路径
 * @param {params} params 参数
 * @param {headers} headers 请求头
 */
export const iotRequest = (method, path, params, headers, other, baseurl='/api/kmp/knowledge-manager', baseapi2 = baseapi) => {
	if (!headers) {
		headers = {};
	}
	if (path.indexOf('http://') === 0 || path.indexOf('https://') === 0) {
		baseapi2 = '';
		baseurl = '';
	}
	return haigeekRequest(
		method,
		baseapi2 + baseurl + path,
		params,
		{
			hgUrlPrefix: baseapi2,
			hgLoading: true,
			hgAutoError: '1',
			hgSuccessCode: 200,
			hgLoginCode: '10103014',
			fnShowError: fnShowError,
			fnStartLoading: fnStartLoading,
			fnEndLoading: fnEndLoading,
			fnLogin: fnLogin
		},
		{
			// 'Access-Token': localStorage.getItem('tokeniam') || '',
			...headers
		},
		other
	)
};
const fnStartLoading = () => {
	loading.start();
};
const fnEndLoading = () => {
	loading.end();
};
const fnShowError = msg => {
	Message.error(msg);
};
export const fnLogin = () => {
	// 过期登录
};