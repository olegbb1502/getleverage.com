const test = require('tape')
const https = require('https')
const body = require('../body')
const config = require('rc')('server')

const extend = require('xtend')

function request (data, cb) {
  const opts = {
    hostname: 'lessdoists.chargify.com',
    // hostname: 'lessdoists-clone.chargify.com',
    port: 443,
    path: '/subscriptions.json',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization':
        'Basic ' + Buffer.from(config.chargify.secret).toString('base64')
        // 'Basic ' + new Buffer('1nD3ANDgakK2o70rgpbQSIYyzEaAQrOLG05OsCobgw:x').toString('base64')
    }
  }

  https
    .request(opts, res => body(res)(cb))
    .end(JSON.stringify(data))
}

const defaultPayload = {
  product_handle: 'waiting149',
  subscription: {
    customer_attributes: {
      first_name: 'Firstname',
      last_name: 'Lastname',
      email: 'test@getleverage.com',
      phone: '111-111-1111',
      organization: 'Org'
    },
    credit_card_attributes: {
      first_name: 'Firstname',
      last_name: 'Lastname',
      full_number: '1234 1234 1234 1234',
      expiration_month: '12',
      expiration_year: '20',
      cvv: '123'
    }
  }
}

test('fail to create account, invalid credit card number and invalid product', assert => {
  const payload = extend({}, defaultPayload)
  payload.subscription.credit_card_attributes.full_number = '1'
  delete payload.product_handle

  request(payload, (err, data) => {
    assert.ok(!err)
    assert.equal(data.errors[0], 'Credit card number: must be a valid credit card number.')
    assert.equal(data.errors[1], 'Product must be specified and be a valid product provided by the seller.')
    assert.end()
  })
})

test('failed to create an account, the credit card was invalid', assert => {
  const payload = extend({}, {}, defaultPayload)

  request(payload, (err, data) => {
    assert.ok(!err)
    assert.equal(data.errors[0], 'Credit card number: must be a valid credit card number.')
    assert.end()
  })
})

test('the cvc/cvv was invalid', assert => {
  const payload = extend({}, {}, defaultPayload)
  console.log(defaultPayload)
  payload.subscription.credit_card_attributes.cvv = '1'

  request(payload, (err, data) => {
    assert.ok(!err)
    assert.equal(data.errors[0], 'CVV must be 3 or 4 characters long')
    assert.end()
  })
})

test('failed to create a new account, first name was not provided', assert => {
  const payload = extend({}, defaultPayload)
  payload.subscription.customer_attributes.first_name = ''

  request(payload, (err, data) => {
    assert.ok(!err)
    assert.equal(data.errors[0], 'First name: cannot be blank.')
    assert.end()
  })
})

test('failed to create a new account, last name was not provided', assert => {
  const payload = extend({}, {}, defaultPayload)
  payload.subscription.customer_attributes.last_name = ''
  console.log(payload)

  request(payload, (err, data) => {
    assert.ok(!err)
    assert.equal(data.errors[0], 'Last name: cannot be blank.')
    assert.end()
  })
})
