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
