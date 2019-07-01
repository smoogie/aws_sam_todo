const merger = require('merge-yaml-cli');
const yamlinc = require('yamlinc/src/yamlinc');
const fs = require('fs');
const path = require('path');

class YamlBuilder {
  otherYaml(root) {
    if (!fs.existsSync('dist/other')) {
      fs.mkdirSync('dist/other');
    }
    fs.copyFileSync(`resources/other/${root}.yaml`, `dist/other/${root}.yaml`);
    console.log(`dist/other/${root}.yaml was published`);
  }

  withPartialYaml(root) {
    if (!fs.existsSync(`dist/${root}`)) {
      fs.mkdirSync(`dist/${root}`);
    }
    const merged = merger.merge([
      `resources/${root}/main.yaml`,
      `resources/${root}/partials/*.yaml`
    ]);
    fs.writeFileSync(`dist/${root}/main.yaml`, merged);
    console.log(`dist/${root}/main.yaml was published`);
  }

  mergeLambda(folder) {
    if(!fs.existsSync(`resources/lambdas/${folder}/functions`)) {
      return 0;
    }
    const apiExists = fs.existsSync(`resources/lambdas/${folder}/api`);
    let sourceFolders = [
      `resources/lambdas/${folder}/main.yaml`,
      `resources/lambdas/${folder}/functions/*.yaml`
    ];
    if (!fs.existsSync('dist/lambdas')) {
      fs.mkdirSync('dist/lambdas');
    }
    if (!fs.existsSync(`dist/lambdas/${folder}`)) {
      fs.mkdirSync(`dist/lambdas/${folder}`);
    }
    if (!fs.existsSync('tmp/lambdas')) {
      fs.mkdirSync('tmp/lambdas');
    }
    if (!fs.existsSync(`tmp/lambdas/${folder}`)) {
      fs.mkdirSync(`tmp/lambdas/${folder}`);
    }

    if(apiExists) {
      if (!fs.existsSync(`tmp/lambdas/${folder}/api`)) {
        fs.mkdirSync(`tmp/lambdas/${folder}/api`);
      }
      const mergedApi = merger.merge([
        `resources/lambdas/${folder}/api/swagger/*.yaml`,
      ]);
      fs.writeFileSync(`resources/lambdas/${folder}/api/api.yaml`, mergedApi);
      console.log(`resources/lambdas/${folder}/api/api.yaml was published`);

      yamlinc.run([
        '--output',
        `tmp/lambdas/${folder}/api/resource.yaml`,
        `resources/lambdas/${folder}/api/resource.yaml`
      ]);
      console.log(`tmp/lambdas/${folder}/api/resource.yaml was published`);

      sourceFolders.push(`tmp/lambdas/${folder}/api/resource.yaml`);
    }
    const mergedLambda = merger.merge(sourceFolders);
    fs.writeFileSync(`dist/lambdas/${folder}/main.yaml`, mergedLambda);
    console.log(`dist/lambdas/${folder}/main.yaml was published`);
    if(apiExists) {
      fs.unlinkSync(`resources/lambdas/${folder}/api/api.yaml`);
      fs.unlinkSync(`tmp/lambdas/${folder}/api/resource.yaml`);
    }
  }

  initFolders() {
    if (!fs.existsSync('tmp')) {
      fs.mkdirSync('tmp');
    }
    if (!fs.existsSync('dist')) {
      fs.mkdirSync('dist');
    }
  }

  mainYaml() {
    yamlinc.run(['--output', 'dist/main.yaml', 'resources/main.yaml']);
    console.log(`dist/main.yaml was published`);
  }

  networkYaml() {
    this.otherYaml('network');
  }

  sqsYaml() {
    this.otherYaml('sqs');
  }

  rdsYaml() {
    this.otherYaml('rds');
  }

  layersYaml() {
    this.otherYaml('layers');
  }

  s3Yaml() {
    this.withPartialYaml('s3');
  }

  policiesYaml() {
    this.withPartialYaml('policies');
  }

  migrationsYaml() {
    this.withPartialYaml('migrations');
  }

  getLambdasDirs() {
    const root = 'resources/lambdas';
    const allElements = fs.readdirSync(root);
    const dirs = allElements.filter(f => fs.statSync(path.join(root, f)).isDirectory());
    return dirs;
  }

  lambdas(){
    const dirs = this.getLambdasDirs();
    dirs.forEach(this.mergeLambda);
  }

  run() {
    this.initFolders();
    this.mainYaml();
    this.layersYaml();
    this.networkYaml();
    this.sqsYaml();
    this.rdsYaml();
    this.s3Yaml();
    this.policiesYaml();
    this.migrationsYaml();
    this.lambdas();
  }
}

module.exports = YamlBuilder;