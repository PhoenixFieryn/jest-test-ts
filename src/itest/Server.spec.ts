import * as axios from 'axios';
require('axios/lib/adapters/http');

axios.default.defaults.validateStatus = function () {
	return true;
};
const serverUrl = 'http://localhost:8080';

describe('Server itest suite', () => {
	test.skip('server reachable', async () => {
		await serverReachable();
	});
});

async function serverReachable(): Promise<boolean> {
	try {
		await axios.default.get(serverUrl);
	} catch (e) {
		console.log('Server not reachable');
		return false;
	}
	console.log('Server reachable');

	return true;
}
