"use strict"

const build = require('./build')()
const st = require('st')
const http = require('http')
const path = require('path')
const mount = st({
  path: __dirname,
  cache: false,
  index: 'index.html'
})

http.createServer(
  function (req, res) { mount(req, res) }
).listen(8080,
  function () { console.log('http://localhost:8080') }
)
