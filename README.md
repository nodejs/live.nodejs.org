# Node.js Live Website

## Contributing

Checkout the git repo and get started:

```
npm install
npm start
```

This fires up a server that reloads/rebuilds on file changes, located at http://localhost:8080.

All content is in markdown. The main page is `index.md` and all the individual event
pages are in `events/`

If you have any questions about the events or the website log an Issue :)

### Localization

You are welcome to translate this site to your language, especially when the event is in your country.

For example, please visit [Node.js Live @ Beijing](http://live.nodejs.org/zh-CN/events/beijing.html)

Follow these steps to add another language:

1. Create a folder which names your language, such as `zh-CN`, `ja`, `de`, etc. See http://www.metamodpro.com/browser-language-codes
2. Add your language to the beginning of build script `build.js`
3. Add your language to `base.hbs`, search `ul` which `id` is `"languages"`

## Interested in Speaking?

If you live or plan to be near one of the Node.js Live events and are interested in
speaking please log an issue on this repository with your talk, title and description
and don't forget to tell us which event it is for.

Because Node.js Live is an event series for local communities we do not have travel
assistance available :(
