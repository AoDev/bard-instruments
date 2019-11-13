interface dictionnary {
  [key: string]: any
}

/**
 * Inject css rules into the document head
 * @param {String} id - identifies the set of rules so that it can be removed later
 * @param {String} css - the rules to add
 * @param {*} options
 * @param {Boolean} options.prepend - influence CSS priority. Add it as first/last element of <head>
 */
function injectCSS (id: string, css: string, options: dictionnary = {prepend: true}) : void {
  const head = document.querySelector('head')
  const styleId = `#style-${id}`
  const styleElement = document.getElementById(styleId)

  if (styleElement) {
    // replace content
    styleElement.textContent = css
  }
  else {
    // new element
    const newStyle = document.createElement('style')
    newStyle.setAttribute('type', 'text/css')
    newStyle.setAttribute('id', styleId)
    newStyle.textContent = css

    if (options.prepend) {
      head.insertBefore(newStyle, head.childNodes[0])
    }
    else {
      head.appendChild(newStyle)
    }
  }
}

export default injectCSS
