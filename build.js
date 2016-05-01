"use strict"

// Configuration languages, need to create a folder first
const languages = ['zh-CN']

const handlebars = require('handlebars')
const marked = require('marked')
const fs = require('fs')
const path = require('path')

const isMarkdown = /\.md/i

const baseTemplate = handlebars.compile(fs.readFileSync(path.resolve(__dirname, 'base.hbs'), 'utf8'))
const eventTemplate = handlebars.compile(fs.readFileSync(path.resolve(__dirname, 'event.hbs'), 'utf8'))

const defaultTopContent = marked(fs.readFileSync(path.resolve(__dirname, 'top.md'), 'utf8'))
const defaultIndexContent = marked(fs.readFileSync(path.resolve(__dirname, 'index.md'), 'utf8'))
const defaultEventsFiles = fs.readdirSync(path.join(__dirname, 'events')).filter(isMarkdown.test.bind(isMarkdown))

// Build English site
function buildDefault() {
  fs.writeFileSync(path.resolve(__dirname, 'index.html'), baseTemplate({
    content: defaultIndexContent,
    top: defaultTopContent,
    lang: 'en'
  }))

  defaultEventsFiles.forEach(function (file) {
    const filePath = path.resolve(__dirname, 'events', file)
    const eventContent = eventTemplate({content: marked(fs.readFileSync(filePath, 'utf8'))})
    fs.writeFileSync(filePath.replace('.md', '.html'), baseTemplate({
      content: eventContent,
      top: defaultTopContent,
      lang: 'en'
    }))
  })
}

/**
 * Build a specific language
 *
 * @param {String} A language identification code, such as zh-CN, ja, de, etc.
 *        See http://www.metamodpro.com/browser-language-codes
 * @returns {undefined} Write files while executing, no returns.
 */
function buildLocalization(language) {
  if (typeof language !== 'string') return
  const lang = language.trim()
  if (lang !== language) return
  if (lang.length === 0) return
  const langDirPath = path.resolve(__dirname, language)
  if (!fs.existsSync(langDirPath)) return

  let indexContent = defaultIndexContent;
  const indexFilePath = path.resolve(langDirPath, 'index.md')
  if (fs.existsSync(indexFilePath)) {
    indexContent = marked(fs.readFileSync(indexFilePath, 'utf8'))
  }

  let topContent = defaultTopContent;
  const topFilePath = path.resolve(langDirPath, 'top.md')
  if (fs.existsSync(topFilePath)) {
    topContent = marked(fs.readFileSync(topFilePath, 'utf8'))
  }

  fs.writeFileSync(path.resolve(langDirPath, 'index.html'), baseTemplate({
    content: indexContent,
    top: topContent,
    lang: language
  }))

  defaultEventsFiles.forEach(function (file) {
    let srcFilePath = path.resolve(langDirPath, 'events', file)
    const destFilePath = srcFilePath.replace('.md', '.html')
    if (!fs.existsSync(srcFilePath)) {
      srcFilePath = path.resolve(__dirname, 'events', file)
    }
    const eventContent = eventTemplate({content: marked(fs.readFileSync(srcFilePath, 'utf8'))})
    fs.writeFileSync(destFilePath, baseTemplate({
      content: eventContent,
      top: topContent,
      lang: language
    }))
  })
}

module.exports = function() {
  buildDefault()
  languages.forEach(buildLocalization)
}

if (require.main === module) {
  module.exports()
}
