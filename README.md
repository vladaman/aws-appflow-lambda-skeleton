# AWS AppsFlow Custom Connector Lambda Handler

_For nodejs and javascript_

As of now there is no SDK for NodeJS to handle AppsFlow Custom Connector. This project is simple attempt to
reverse-engineer AppsFlow Python/Java SDK.

Project uses `node-lambda` for local deployment but you get the idea how to run it in your enviroment. Code shows basic
usage how to build your own AppFlow connector in Javascript.

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
