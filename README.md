# aws_sam_todo repo
This repo contain example of simple to do serverless app on AWS. This repo present general configuration for serverless app (monolithic app) and how to connect pieces, it is not focused on javascript code and logic... 

This repo is not build to present best practice in code or even best use case for services. It is build to present example code for solutions which I used in much bigger and more complex app, which required specific solutions. In many cases you can build it in simpler way, but presented here example may help you with few problems...

This repo does not contain front-end for the app. In most cases (for me) frontend is kept on separate repo. In folder src I would have frontend source code. Deploy/build scripts include building distribution code from src folder and sending whole dist folder to S3 bucket which contain page. S3 bucket is readable publicly and is assigned to domain on route 53 (or connected with CloudFront, which is connected with Route 53). 
# services
Infrastructure is build with [AWS CloudFormation](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/gettingstarted.templatebasics.html) with [AWS SAM](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-template-basics.html) template.

App will use few AWS services:
* [AWS Lambda](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html) - for application logic
* [AWS API Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html) - for API, routing etc.
* [AWS RDS (MySQL)](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_GettingStarted.CreatingConnecting.MySQL.html) - for DB
* [AWS S3](https://docs.aws.amazon.com/AmazonS3/latest/dev/Welcome.html) - for files
* [AWS SQS](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html) - for task's queue
* [AWS Route 53](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/Welcome.html) - for domains management
* [AWS IAM](https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html) - to manage access for services
* [AWS CloudWatch](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html) - for monitoring and scheduling
* [AWS VPC](https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html)  - for virtual network
* [AWS EC2](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html) - for access to db in vpc
* [AWS Secrets Manager](https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html) - to manage credentials and secrets used by our app
* [AWS Key Management System](https://docs.aws.amazon.com/kms/latest/developerguide/overview.html)- for ssh keys for ec2

There will be few services outside AWS:
* google - google login
* sendgrid - for transactional e-mail

# app concept
Each todo list is connected with specific user. User can login with Google account or can register new user and login with e-mail and password saved in system. User can add, edit, delete positions on the list. User can attach files to positions.

System will support few languages.

We use custom authorizer and own user pool with lambda/db instead of cognito. Cognito has a lot out of the box, but in few projects I found, that I've got additional walkrounds, webhooks, integrations etc. to get what I need. This is why, in some project we use custom authorizer.

### If you want to test it keep in mind that part of service used in here require payment and are not included in aws free tier.

# deploy + update
AWS CLI use one file as input for Cloud Formation, in our code you'll see multiple files. I prefer to keep code in context of specific functionality, it is easier to find and manage. I hate long files with thousands of lines, which are hard to maintain. This is why I separate code to multpile files and added script which concat them to one yaml file, which is used by Cloud Formation. 
You can thing of folder `resources` as source for yaml templates for Cloud Formation. When you run script, folder `dist` is created with files ready for deployment. 

We already created some shorthands for deployment cmd. We separate stack init and update. You can use specific scripts to make it work.

Also you'll see that we use nested stacks - we need this because of Cloud Formation limits.

Before first deployment you'll need to setup few things in aws console and in your local environment. Part of system will be set through console instead of template, because not all is possible with CloudFormation. This is why sometimes you'll need to login to aws console and adjust few elements by a hand.

We use 3 stage of application: dev (for developers to test and work), test (preview for client), production. It is good idea to use separate region for each to make it easier to manage.

### preconfiguration
1. [Create account on aws](https://portal.aws.amazon.com/billing/signup#/start) or [login to existing one](https://signin.aws.amazon.com/signin)
2. Decide, which region you'll use. All services must be at the same region!
3. [Create S3 bucket](https://s3.console.aws.amazon.com/s3/home) which you will use for keeping code and templates.
4. Go to EC2 settings and find option "[Key Pairs](https://console.aws.amazon.com/ec2/v2/home#KeyPairs:sort=keyName)" under "Network & Security". Create key Pair, save file with public key. We'll use it to get access to EC2 proxy for DB. Also remember (or note) name which you used for key pair - it is our aws_dev_dbssh/aws_test_dbssh/aws_production_dbssh in .npmrc
5. We [registered domains](https://console.aws.amazon.com/route53/home#DomainListing:) in AWS services and we used [Hosted zone in Route 53](https://console.aws.amazon.com/route53/home#hosted-zones:). If you want use other service for domains, you'll need to configure it to work with AWS service.
6. In API Gateway you'll need to [create custom domain](https://console.aws.amazon.com/apigateway/home#/custom-domain-names) for which you'll need to [create certificate with Certificate Manager](https://console.aws.amazon.com/acm/home). Make sure that your certificate be created for the same region, where you will deploy app. First time we waited over 1 day for certificate, but now we wait ~10 minutes before it is approved (if we setup everything correctly). You can create custom domain in API Gateway, certificate in CM and setup domains in Route 53 before deployment or after. If you'll do it before, you can include api base mapping in cloud formation template. If not you'll need to do it by a hand after deployment (this is how we did it - we setup domain and mapping after deployment)
7. Locally on your work machine install node.js in version 10 (when this example was created it was the newest version in aws lambda and you want to make sure that your local env is as close as possible to aws lambda env). Install python in version 3. Install docker. Install aws cli.
8. Configure aws cli to use specific credentials: `aws configure`
9. Pull from git correct branch from our repo. On root folder run: `npm install`
10. Create and configure project in firebase, configure sendgrid
10. Copy .npmrc.example to .npmrc and setup all variables

Now you are ready to deploy.
###  first deploy
Here I assume that you try to deploy dev stage, if not - you'll need to adjust cmd
1. Get to root folder of project
2. Run `npm run init:dev` or if you're windows user `npm run init:dev:w`
3. When stack will be build (you can check progress in [aws console in cloud formation service](https://console.aws.amazon.com/cloudformation/home#/)), then open aws console on API Gateway and setup base path mapping for your custom domain. You need to do this if you want one domain for whole API.

### Update stack
Steps are almost the same as for first deployment. Here I assume that you try to deploy dev stage, if not - you'll need to adjust cmd
1. Get to root folder of project
2. Run `npm run update:dev` or if you're windows user `npm run update:dev:w`
3. When stack will be updated (you can check progress in [aws console in cloud formation service](https://console.aws.amazon.com/cloudformation/home#/)), then open aws console on API Gateway and setup any new base path mapping for your custom domain or change it if you changed it in template. You need to do this if you want one domain for whole API.

### DB and S3
Code include example for db migration and seeding db. Code does not contain exmaple of rolling back seeds/migrations. Sometimes something may go wrong and deployment will crash. If deploy crash before migration or seeder run, then crash will not impact db. If even part of migration/seeding will run db will be "poisoned by this changes", which should be reverted. To make sure everytnihg is fine you should do two things:
1. In seeders and migrations, you need to create down function. 
2. You need to track which seeds/migrations are run in specific deployment (date stamps + id of deployment). This data should be used in migration/seeder lambda, when triggered event as rollback of stack.

In some project we need to import lot of data. There are three solutions which we use:
- Add import code in seeder. We put file on s3 with code. Seeder function read file and parse it and add items to db.
- We create lambda function for import:
    - we create API gateway for import, this way we can import additional data whenever we want. You need to put additional security here!
    - we create custom resource (like we did with migration and seeding)

Support for auto deployment of S3 resources is not added in example code. In some project we need to put some default images/files on S3. You can do it with cmd. You can create folder s3assets in root and after app is deployed run aws cli to push whole folder to s3.

# npm shorthands for aws cmds 
#### Before you'll use it, copy .npmrc.example to .npmrc and fill with correct data
- npm run init:dev - initialize dev stack
- npm run update:dev - update dev stack
- npm run init:test - initialize test stack
- npm run update:test - update test stack
- npm run init:production - initialize production stack
- npm run update:production - update production stack

#### If you use Windows add :w at the end of command (the command "npm run yaml" is the exception). E.g. npm run init:test:w