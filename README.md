# AWS AppsFlow Custom Connector Lambda Handler

_Developed for Node.js and JavaScript_

Currently, there is no dedicated Node.js SDK available for managing AppsFlow Custom Connectors. This project aims to address this gap by offering a straightforward attempt to reverse-engineer the AppsFlow Python/Java SDK.

The implementation utilizes node-lambda for local deployment, providing insight into running it within your environment. The code serves as a fundamental guide on constructing your own AppFlow connector in JavaScript.

Tested with:

* nodejs 20.v13
* node_lambda 1.2.1

## Lambda Policies:

1. Ensure your Lambda function has assigned following policy

```json
{
  "Version": "*2012-10-17*",
  "Id": "default",
  "Statement": [
    {
      "Sid": "*appflow-example-01*",
      "Effect": "Allow",
      "Principal": {
        "Service": "appflow.amazonaws.com"
      },
      "Action": "lambda:InvokeFunction",
      "Resource": "arn:aws:lambda:*us-east-1*:123456789012:function:*my-function*",
      "Condition": {
        "StringEquals": {
          "AWS:SourceAccount": "*123456789012*"
        },
        "ArnLike": {
          "AWS:SourceArn": "arn:aws:appflow:*us-east-1*:*123456789012*:*"
        }
      }
    }
  ]
}
```

2. Ensure your Lambda has IAM permissions to `secretsmanager:GetSecretValue`
