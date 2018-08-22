const isProd = (process.env.NODE_ENV || 'development') === 'production';
const defaultCouponId = isProd ? 'sF09Q9VB': 'vVTIn0Rg';
const shankCouponId = isProd ? 'wYuuwWnC' : 'EkiqBoJW';

module.exports = {
  "lee": {
    "name": "Lee Brower",
    "wistia": "acwk9r7r88",
    "CTA": "Get $50 off when you sign up for Leverage!",
    "coupon": defaultCouponId,
  },
  "shankminds": {
    "name": "Peter Shankman",
    "wistia": "r4wbv3qsb9",
    "CTA": "Your first 2 months free when you sign up for Leverage!",
    "coupon": shankCouponId,
  },
  "chris": {
    "name": "Chris Prefontaine",
    "wistia": "rheh4b04ze",
    "CTA": "Get $50 off when you sign up for Leverage!",
    "coupon": defaultCouponId,
  },
  "morris": {
    "name": "Morris Sutton",
    "wistia": "khwvzazlxb",
    "CTA": "Get $50 off when you sign up for Leverage!",
    "coupon": defaultCouponId,
  }
};
