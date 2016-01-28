"use strict"
const build = require('./build')
const chokidar = require('chokidar')
const st = require('st')
const http = require('http')
const path = require('path')
const mount = st({
  path: __dirname,
  cache: false,
  index: 'index.html'
})

const opts = {
  persistent: true,
  ignoreInitial: true,
  followSymlinks: true,
  usePolling: true,
  alwaysStat: false,
  depth: undefined,
  interval: 100,
  ignorePermissionErrors: false,
  atomic: true
}
const watcher = chokidar.watch(__dirname, opts)
watcher.on('change', build)
watcher.on('add', function (p) { watcher.add(p); build() })

build()

http.createServer(
  function (req, res) { mount(req, res) }
).listen(8080,
  function () { console.log('http://localhost:8080') }
)