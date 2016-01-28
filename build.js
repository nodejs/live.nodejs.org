"use strict"
const handlebars = require('handlebars')
const marked = require('marked')
const fs = require('fs')
const path = require('path')

let baseTemplate = handlebars.compile(fs.readFileSync(path.join(__dirname, 'base.hbs')).toString())
let eventTemplate = handlebars.compile(fs.readFileSync(path.join(__dirname, 'event.hbs')).toString())
let index = fs.readFileSync(path.join(__dirname, 'index.md'))

module.exports = function () {
  fs.writeFileSync(path.join(__dirname, 'index.html'), baseTemplate({content:index}))

  let isMarkdown = /\.md/i

  fs.readdirSync(path.join(__dirname, 'events')).forEach(function (file) {
    if (!isMarkdown.test(file)) return // not a markdown file
    let f = path.join(__dirname, 'events', file)
    let s = eventTemplate({content: marked(fs.readFileSync(f).toString())})
    fs.writeFileSync(f.replace('.md', '.html'), baseTemplate({content:s}))
  })
}

if (require.main === module) {
  module.exports()
}