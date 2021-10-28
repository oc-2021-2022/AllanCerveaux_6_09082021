/**
 *
 * @property {HTMLElement | HTMLElement[]} element - HTMLElement selected by y
 * @export
 * @class Creator
 */
export class Creator {
  constructor (selector) {
    this.element = null
    this.selector(selector)
  }

  /**
   *
   *
   * @param {string} elm
   * @return {Creator}
   * @memberof Creator
   */
  selector (elm) {
    if (elm.includes('.')) {
      this.element = document.querySelectorAll(elm)
      return this
    }
    this.element = document.querySelector(elm)
    return this
  }

  createElement (elm) {
    this.element = document.createElement(elm)
    return this
  }

  text (text) {
    this.element.innerText = text
    return this
  }

  html (template) {
    this.element.innerHTML = template
    return this
  }

  append (elm) {
    this.element.append(elm)
    return this
  }

  prepend (element) {
    this.element.prepend(element)
    return this
  }

  before (element) {
    this.element.before(element)
    return this
  }

  after (element) {
    this.element.after(element)
    return this
  }

  remove () { }
  toggle () { }
  hide () { }
  show () { }
  parent () { }
  addClass () { }
  removeClass () { }
  toggleClass () { }

  on () { }
  click () { }
  focus () { }
  focusIn () { }
  focusOut () { }
  hover () { }
  keypress () { }
  submit () { }

  static createElement (tag) {
    this.element = document.createElement(tag)
    return Creator
  }
}
