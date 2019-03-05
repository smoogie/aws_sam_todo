# aws_sam_todo
This repo contain example of simple to do serverless app on AWS.

Infrastructure is build with [AWS CloudFormation](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/gettingstarted.templatebasics.html) with [AWS SAM](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-template-basics.html) template.

App will use few AWS services:
* [AWS Lambda](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html) - for application logic
* [AWS Cognito](https://docs.aws.amazon.com/cognito/latest/developerguide/what-is-amazon-cognito.html) - for authorization
* [AWS CloudWatch](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html) - for monitoring and scheduling 
* [AWS RDS (MySQL)](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_GettingStarted.CreatingConnecting.MySQL.html) - for DB
* [AWS S3](https://docs.aws.amazon.com/AmazonS3/latest/dev/Welcome.html) - for files
* [AWS CloudFormation]((https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/Welcome.html)) - to manage services
* [AWS IAM](https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html) - to manage access for services

Each todo list is connected with specific user. User can login with Google account or can register new user wand login with e-mail and password saved in system.\
User can add, edit, delete positions on the list. User can attach files to positions.\
System will support few languages.

This repo is not build to present best practice in code or even best use case for services. It is build to present example code for solution which I used in much bigger and more complex app, which required specific solutions. In many cases you can build it in simpler way, but presented here example may help you with few problems...

Most user data will be kept on MySQL DB. When we want to search data based on data from user profile, we do not need to request users from AWS Cognito, we can do it with one SQL request. E.g. if we want to create report how many todo items come form NY we can create one SQL query and join users with todo.

# deploy + update
When you update stack remember to make DB backup and verify/reproduce DB after deployment. You need to change DB Instance Name. For more info check : https://aws.amazon.com/premiumsupport/knowledge-center/cloudformation-custom-name/

# npm shorthands for aws cmds 
#### Before you'll use it, copy .npmrc.example to .npmrc and fill with correct data
- npm run yaml:test - build final yaml template
- npm run pack:test - pack current app version
- npm run init:stack:test - init stack on aws
- npm run update:stack:test - update stack on aws
- npm run describe:test - get stack information
- npm run init:test - yaml:test + pack:test + init:stack:test
- npm run update:test - yaml:test + pack:test + update:stack:test

#### If you use Windows add :w at the end of command (the command "npm run yaml:test" is the exception). E.g. npm run init:test:w

# aws cmds
create package.yaml
- aws --region *$region* cloudformation package --template-file template.yaml --s3-bucket *$code_bucket* --output-template-file package.yaml

deploy app
- aws --region *$region* cloudformation deploy --template-file package.yaml --stack-name *$your-stack-name* --capabilities CAPABILITY_IAM --parameter-overrides DBUser=*$db-user* DBName=*$db-name* DBPassword=*$db-password*

update app
- aws --region *$region* cloudformation deploy --template-file package.yaml --stack-name *$your-stack-name* --capabilities CAPABILITY_IAM

get stack information
- aws --region *$region* cloudformation describe-stacks --stack-name  *$your-stack-name* 