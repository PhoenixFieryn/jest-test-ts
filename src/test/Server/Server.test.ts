import { Server } from '../../app/Server/Server';
import { LoginHandler } from '../../app/Handlers/LoginHandler';
import { Authorizer } from '../../app/Authorization/Authorizer';
import { DataHandler } from '../../app/Handlers/DataHandler';
import { UsersDBAccess } from '../../app/Data/UsersDBAccess';

jest.mock('../../app/Handlers/LoginHandler');
jest.mock('../../app/Authorization/Authorizer');
jest.mock('../../app/Handlers/DataHandler.ts');
jest.mock('../../app/Data/UsersDBAccess');

const requestMock = {
	url: '',
};
const responseMock = {
	end: jest.fn(),
};
const listenMock = {
	listen: jest.fn(),
};

jest.mock('http', () => ({
	createServer: (cb: any) => {
		cb(requestMock, responseMock);
		return listenMock;
	},
}));

describe('Server test suite', () => {
	test('should create server on port 8080', () => {
		new Server().startServer();
		expect(listenMock.listen).toHaveBeenCalledWith(8080);
		expect(responseMock.end).toHaveBeenCalled();
	});

	test('should handle login requests', () => {
		requestMock.url = 'http://localhost:8080/login';
		new Server().startServer();
		const handleRequestSpy = jest.spyOn(LoginHandler.prototype, 'handleRequest');
		expect(handleRequestSpy).toHaveBeenCalled();
		expect(LoginHandler).toBeCalledWith(requestMock, responseMock, expect.any(Authorizer));
	});
});
