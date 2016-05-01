;(function () {

  var ul = document.getElementById('languages')
  var currentLang = document.documentElement.lang

  // Set current language link to gray
  var currentLangNode = ul.querySelector('[data-lang=' + currentLang + ']')
  if (currentLangNode) {
    currentLangNode.style.color = '#606c76'
    currentLangNode.style.cursor = 'default'
  }

  // delegate language ul
  ul.addEventListener('click', function (event) {
    var targetLang = event.target.dataset.lang
    if (!targetLang) return
    if (targetLang === currentLang) return
    var currentPathname = location.pathname
    var newPathname
    if (currentLang === 'en') {
      newPathname = '/' + targetLang + currentPathname
    } else {
      if (targetLang === 'en') {
        newPathname = currentPathname.replace(/^\/[^\/]*/, '')
      } else {
        newPathname = currentPathname.replace(/^\/[^\/]*/, '/' + targetLang)
      }
    }
    var newUrl = location.origin + newPathname
    location.href = newUrl
  })

})()
