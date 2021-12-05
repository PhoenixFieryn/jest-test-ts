import { SessionTokenDBAccess } from '../../app/Authorization/SessionTokenDBAccess';
import * as Nedb from 'nedb';
import { SessionToken } from '../../app/Models/ServerModels';
jest.mock('nedb');

describe('SessionTokenDBAccess', () => {
	let sessionTokenDBAccess: SessionTokenDBAccess;

	const nedbMock = {
		loadDatabase: jest.fn(),
		insert: jest.fn(),
		find: jest.fn(),
	};

	const someToken: SessionToken = {
		accessRights: [],
		expirationTime: new Date(),
		tokenId: '123',
		userName: 'user',
		valid: true,
	};

	beforeEach(() => {
		sessionTokenDBAccess = new SessionTokenDBAccess(nedbMock as any);
		expect(nedbMock.loadDatabase).toBeCalled();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	test('store sessionToken without any error', async () => {
		nedbMock.insert.mockImplementationOnce((someToken: SessionToken, cb: any) => {
			cb();
		});
		await sessionTokenDBAccess.storeSessionToken(someToken);
		expect(nedbMock.insert).toBeCalledWith(someToken, expect.any(Function));
	});

	test('store sessionToken with error', async () => {
		nedbMock.insert.mockImplementationOnce((someToken: SessionToken, cb: any) => {
			cb(new Error('something went wrong'));
		});
		await expect(sessionTokenDBAccess.storeSessionToken(someToken)).rejects.toThrow(
			'something went wrong'
		);
		expect(nedbMock.insert).toBeCalledWith(someToken, expect.any(Function));
	});
});
