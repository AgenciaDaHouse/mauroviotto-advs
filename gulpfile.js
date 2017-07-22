/**
 * tasks
 */
require('./gulp/build')
require('./gulp/clean')
require('./gulp/css')
require('./gulp/env')
require('./gulp/font')
require('./gulp/img')
require('./gulp/js')
require('./gulp/minify')

// dev only
if (process.env.NODE_ENV !== 'production') {
  require('./gulp/server')
}
