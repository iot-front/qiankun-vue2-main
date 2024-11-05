import { iotRequest } from '@/apis/api';
let basesys = '/api';

// 获取用户信息
export const apiGetUserInfo = () => {
	return iotRequest('post', '/sys/current-user/role/list', {
		hgAutoError: 0
	}, {}, {}, basesys);
};
// 同步用户空间权限
export const apiAsyncSpaceInfo = (params) => {
	return iotRequest('post', '/userSpaceInfo', params);
};
