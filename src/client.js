var dom = require('dom-events')
var domready = require('domready')
var ClassList = require('class-list')

var intercom = require('intercom')
var analytics = require('analytics')
var youtube = require('youtube')
var wistia = require('wistia')

var url = function () {
  var u = window.location.pathname
  if (u[u.length - 1] === '/') return u.slice(0, -1)
  return u
}

function mobile () {
  var $nav = document.querySelector('#mobile-nav')
  var bodyCL = ClassList(document.body)

  if (!$nav) return

  dom.on($nav, 'change', function (event) {
    bodyCL[$nav.checked ? 'add' : 'remove']('no-scroll')
  })
}

function main () {
  mobile()
  youtube()
  wistia()

  switch (url()) {
    case '': require('home')(); break
    case '/subscribe': require('subscribe')(); break
    case '/subscribe/complete': require('complete')(); break
  }
}

analytics()
intercom()
domready(main)

window.onerror = function (e) {
  if (!window.gtag) return

  window.gtag('event', 'js error', {
    message: e.message,
    source: e.filename + ':' + e.lineno
  })
}
