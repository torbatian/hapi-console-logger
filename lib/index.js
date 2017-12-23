'use strict'

const DateFormat = require('date-fns/format')

exports.plugin = {
  pkg: require('../package.json'),

  register: (server, options) => {
    server.events.on('log', (event, tags) => {
      console.log('[%s] [%s] %s', DateFormat(event.timestamp, 'YY-MM-DD H:m:s'), event.tags, event.data)
    })
    server.events.on('response', (event) => {
      if (event.response._error) {
        console.log('[%s] [%s] %s : %s', DateFormat(new Date(), 'YY-MM-DD H:m:s'), 'response error', event.response.request.url.path, event.response._error.stack)
      } else {
        console.log('[%s] [%s] %s : %s', DateFormat(new Date(), 'YY-MM-DD H:m:s'), 'response', event.response.request.url.path, event.response._payload._data)
      }
    })
  }
}
