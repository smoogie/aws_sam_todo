const merger = require('merge-yaml-cli');
const yamlinc = require('yamlinc/src/yamlinc');
const fs = require('fs');

if (!fs.existsSync('tmp')){
    fs.mkdirSync('tmp');
}

const mergedApi = merger.merge(['resources/api/swagger/main.yaml', 'resources/api/swagger/*/*.yaml']);
fs.writeFileSync('resources/api/api.yaml', mergedApi);
console.log(`api.yaml was published`);

yamlinc.run(['--output', 'tmp/api_resource.yaml', 'resources/api/resource.yaml']);
console.log(`api_resource.yaml was published`);

yamlinc.run(['--output', 'tmp/main_merged.yaml', 'resources/main.yaml']);
console.log(`main_merged.yaml was published`);


const mergedTemplate = merger.merge([
    'tmp/main_merged.yaml',
    'resources/other/*.yaml',
    'resources/migration/*.yaml',
    'resources/lambdas/*.yaml',
    'tmp/api_resource.yaml'
]);
fs.writeFileSync('build.yaml', mergedTemplate);
console.log(`build.yaml was published`);

fs.unlinkSync('resources/api/api.yaml');
fs.unlinkSync('tmp/api_resource.yaml');
fs.unlinkSync('tmp/main_merged.yaml');
console.log(`Finished cleaning`);