'use strict'

const DateFormat = require('date-fns/format')

exports.plugin = {
  pkg: require('../package.json'),

  register: (server, options) => {
    server.events.on('log', (event, tags) => {
      console.log('[%s] [%s] %s', DateFormat(event.timestamp, 'YY-MM-DD H:m:s'), event.tags, event.data)
    })
  }
}
