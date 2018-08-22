# DEVELOPMENT
Run locally with `npm run watch`. The local server runs on port 9090 by default.

# DEPLOYMENT SETUP

1. Ensure you have the AWS CLI tools available globally (or installed to an
activated virtualenv).

2. Obtain a set of AWS API keys and save them in ~/.aws/credentials under the
profile name of `leverage`.

# DEPLOYMENT

Build, push to S3 and invalidate the Cloudfront cache with one of:

`npm run publish:staging`, `npm run publish:production` or `npm run publish:dev`
