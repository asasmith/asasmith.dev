---
title: Cloud Resume Challenge Week 1
tags: ["aws", "cdk", "typescirpt"]
date: "3/8/2025"
---

Recently I across the [Cloud Resume Challenge](https://cloudresumechallenge.dev/docs/the-challenge/aws/), and it immediately caught my attention. I’ve been looking for opportunities to get more hands-on experience with AWS, but I haven’t had a structured way to approach it. This challenge seemed like the perfect opportunity—a real-world, end-to-end cloud project that touches multiple AWS services. So, I decided to jump in.

This post is a brain dump of why I’m doing this, what I hope to get out of it, and my progress so far.

## Why I'm Doing the Cloud Resume Challenge

For majority of my career I've focused solely on front end development. I've done some backend work with node/express and one time I built a data collection tool in Go. But AWS has, for the most part, been a total black box to me. I know what an s3 bucket is and I have a grasp of iam roles. I can even dig through logs in cloudwatch to try to find errors but that's been the extent of my exposure. but I’ve never actually built something from the ground up using AWS infrastructure as code, IAM roles, API Gateway, Lambda, and DynamoDB.  
So I'm doing this challenge for a few reasons:
- To get hands-on AWS experience—I learn best by doing, and this is as close to a real-world project as it gets.
- To force myself out of my comfort zone—I know enough AWS to be dangerous, but I'd like to actually understand it.
- To document my progress and mistakes—I want to write about this experience as I go, partly to help others, partly to remind future me what I did when I inevitably forget.

## Week 1: What I've Done So far
Even though this project is relatively simple I want to be mindful of creating an architecture that is representative of real world applications. So while it might be overkill for this I knew I wanted to create three repos for code organization.
- `cloud-resume-infra`
- `cloud-resume-frontend`
- `cloud-resume-backend`

One of the requirements is to not use the AWS console to create any of the necessary resources. I have completed a Frontend Masters course that used AWS CDK (cloud deployment kit) with GO so I already had some exposure to the tool. I chose to use typescript for this project. AWS SAM (serverless application model) templates are another route you could go but since I've never used these before I decided to not use them here. Documentation for CDK can be found [here](https://docs.aws.amazon.com/cdk/v2/guide/home.html) along with a guide for install/setup [here](https://docs.aws.amazon.com/cdk/v2/guide/getting_started.html). 
CDK, as I understand it so far, allows you to write code to define different aws resources. Initializing a project is simple. Just run the following commands in your terminal:
```bash
// create a new empty directory for the project
mkdir cloud-resume-infra && cd cloud-resume-infra 

// initialize new cdk app specifying typescript as the language
cdk init app --language typescript
```
A CDK app is composed of several differnt units. The smallest units are constructs. Constructs are pieced together to create Stacks. Stacks are pieced together to create Apps. The CDK cli tool takes your code an converts it into CloudFormation templates that are deployed from the command line.

The first thing I did was create my `S3Stack`. All I've done is create an s3 bucket to store my static website files. 

```javascript
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as s3 from "aws-cdk-lib/aws-s3";

export class S3Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new s3.Bucket(this, "CloudResumeInfraBucket", {
      bucketName: `cloud-resume-${this.account}-${this.region}`,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });
  }
}
```

Then I've updated the `bin/cloud-resume-infra.ts` file to the following:
```javascript
#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { S3Stack } from "../lib";

const app = new cdk.App();
const product = 'cloud-resume';

new S3Stack(app, `${product}-s3-stack`); 

app.synth();
```

Once I've saved both files I need to run `npm run build` to build out the javascript files and then run `cdk deploy` to deploy my s3 bucket.

## What's Steps

Now that I have the initial CDK setup and an S3 bucket, my next steps are:

- Set up IAM roles and policies – I need to make sure my GitHub Actions workflow has the right permissions to deploy site updates.
- Automate frontend deployments – I’ll configure GitHub Actions to upload new frontend files to S3 whenever I push to main.
- Start planning the backend – I’ll be working on API Gateway, Lambda, and DynamoDB next.

For future posts, I’ll break things down further—IAM setup, GitHub Actions workflows, API design, and more. But for now, this is a solid start.

Here is my `cloud-resume-infra` [repo](https://github.com/asasmith/cloud-resume-infra) for reference.
