/* This file contains the environment that is passed to the pug
 * compiler. For example, the Stripe public key differs between
 * development and production. */
const isProd = (process.env.NODE_ENV || 'development') === 'production';

let stripeKey, endpoint;

if (isProd) {
  endpoint = 'https://api2.getleverage.com'
  stripeKey = 'pk_live_F2H3MG5G5pExq9WpvJAjwunJ'
}
else {
  endpoint = 'https://staging-api.getleverage.com'
  stripeKey = 'pk_test_tWYTvPMCwmjNQBA1ki94XOip'
}

module.exports = {
  endpoint,
  stripeKey,
};
