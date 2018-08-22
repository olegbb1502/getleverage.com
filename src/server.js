'use strict'

const send = require('send-promised')

const serve = (req, res) =>
  send(req, res, {
    root: `${__dirname}/../static/`
  })

module.exports = async (req, res) => {
  //
  // Static files
  //
  if (await serve(req, res)) return

  //
  // Not Found
  //
  res.statusCode = 404
  res.end('Not Found')
}
