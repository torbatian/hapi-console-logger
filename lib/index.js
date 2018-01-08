'use strict'

const DateFormat = require('date-fns/format')
const Chalk = require('chalk')

exports.plugin = {
  pkg: require('../package.json'),

  register: (server, options) => {
    server.events.on('log', (event, tags) => {
      console.log('[%s] [%s] %s',
      Chalk.yellowBright(DateFormat(event.timestamp, 'YY-MM-DD H:m:s')),
      Chalk.greenBright(event.tags),
      event.data)
    })
    server.events.on('response', (event) => {
      if (event.response._error) {
        console.log('[%s] [%s] [%s] %s : %s',
        Chalk.yellowBright(DateFormat(new Date(), 'YY-MM-DD H:m:s')),
        Chalk.redBright('response error'),
        Chalk.greenBright(event.response.request.method.toUpperCase()),
        Chalk.cyanBright(event.response.request.url.path),
        event.response._error.stack)
      } else {
        console.log('[%s] [%s] [%s] %s : %s',
        Chalk.yellowBright(DateFormat(new Date(), 'YY-MM-DD H:m:s')),
        Chalk.blueBright('response'),
        Chalk.greenBright(event.response.request.method.toUpperCase()),
        Chalk.cyanBright(event.response.request.url.path),
        event.response._payload._data)
      }
    })
  }
}
