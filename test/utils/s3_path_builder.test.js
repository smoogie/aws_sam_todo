process.env['S3_PUBLIC_DATA']='s3_public';
const pathBuilder = require('../../src/utils/s3_path_builder');

describe('s3PathBuilder', () => {
    test('return correct bucket', () => {
        expect(pathBuilder.bucket).toBe('s3_public');
    });
});