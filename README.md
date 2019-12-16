# AuthorsClient

This is the front end repository hosted with the domain "https://authorsandblogs.com".

The app is using Okta Authentication to authenticate the user and return the JWT.

Okta Credentials:
Username: zbadker@yahoo.com
Password: Authors123

1) The project is deployed through AWS Elastic Beanstalk using Docker running on Amazon Linux.
2) An SSL certificate was created for "*.authorsandblogs.com" through AWS Certificate Manager.
3) A CloudFront distribution, with a CNAME of "authorsandblogs.com", is redirecting HTTP requests to the Beanstalk URL to HTTPS.
4) Route 53 was used to set the A record for my domain "authorsandblogs.com" to the URL of the CloudFront distribution.
