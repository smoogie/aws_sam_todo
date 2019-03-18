process.env['DB_HOST']='dbhost';
process.env['DB_USER']='dbuser';
process.env['DB_PASSWORD']='dbpassword';
process.env['DB_NAME']='dbname';

const pathBuilder = require('../../src/utils/db_connection');
jest.mock('mysql2/promise', () => { return {
    createConnection: jest.fn((params) => {
        return new Promise((resolve, reject) => {
            resolve(params);
        })
    })
}});

describe('DbConnect', () => {
    test('check connection', async () => {
        const connection = await pathBuilder.connect();
        expect(connection.host).toBe('dbhost');
    });
});