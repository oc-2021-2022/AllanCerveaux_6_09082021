/**
 *
 * @property {HTMLElement | HTMLElement[]} element - HTMLElement selected by y
 * @export
 * @class Manipulator
 */
export class Manipulator {
  constructor () {
    this.element = null
    this.elementHide = false
    this.elementDefaultDisplay = null
  }

  selector (elm) {
    if (elm.includes('.')) {
      this.setElement(document.querySelectorAll(elm))
      return this
    }
    this.setElement(document.querySelector(elm))
    return this
  }

  setElement (elm) {
    this.element = elm.length < 2 ? elm[0] : elm
    return this
  }

  create (tag) {
    const elm = document.createElement(tag)
    this.element = elm
    return this
  }

  text (text) {
    this.element.innerText = text
    return this
  }

  parent = () => this.setElement(this.element.parentElement)

  children = () => this.element.children

  each (cb) {
    Array.from(this.element).forEach(elm => cb(elm))
    return this
  }

  html (template) {
    this.element.innerHTML = template
    return this
  }

  append (elm) {
    if (typeof elm === 'string') {
      this.element.innerHTML += elm
    } else {
      this.element.append(elm)
    }
    return this
  }

  prepend (element) {
    if (typeof element === 'string') {
      this.element.innerHTML += element
    } else {
      this.element.prepend(element)
    }
    return this
  }

  before(element) {
    this.element.before(element)
    return this
  }

  after (element) {
    this.element.after(element)
    return this
  }

  remove () {
    this.element.remove()
    return this
  }

  defaultDisplay (element) {
    this.elementDefaultDisplay = window.getComputedStyle(element, null).display
  }

  toggle () {}

  hide () {
    const elm = this.element.length < 2 ? this.element[0] : this.element
    this.defaultDisplay(elm)
    elm.style.display = 'none'
    this.elementHide = true
    return this
  }

  show () {
    this.element.style.display = this.elementDefaultDisplay
    this.elementHide = false
    return this
  }

  addClass (...arg) {
    Array.isArray(arg) ? arg.forEach(str => this.element.classList.add(str)) : this.element.classList.add(arg)
    return this
  }

  removeClass (...arg) {
    Array.isArray(arg) ? arg.forEach(str => this.element.classList.remove(str)) : this.element.classList.remove(arg)
    return this
  }

  hasClass (arg) {
    return this.element.classList.contains(arg)
  }

  toggleClass (arg) {
    this.element.classList.toggle(arg)
  }

  getAttribute (key) {
    return this.element.getAttribute(key)
  }

  setAttribute (key, value) {
    this.element.setAttribute(key, value)
    return this
  }

  removeAttribute (key) {
    this.element.removeAttribute(key)
    return this
  }

  hasAttribute (key) {
    return this.element.hasAttribute(key)
  }

  on (eventName, handler) {
    if (this.element.length) {
      this.element.forEach(elm => elm.addEventListener(eventName, (event) => handler(event)))
    } else {
      this.element.addEventListener(eventName, (event) => handler(event))
    }
    return this
  }

  click (handler) {
    this.element.addEventListener('click', (event) => handler(event))
    return this
  }

  focus (handler) {
    this.element.addEventListener('focus', (event) => handler(event))
    return this
  }

  focusIn () { }
  focusOut() { }

  hover (handler) {
    this.element.addEventListener('hover', (event) => handler(event))
    return this
  }

  keydown (handler) {
    this.element.addEventListener('keydown', (event) => handler(event))
    return this
  }

  submit (handler) {
    this.element.addEventListener('submit', (event) => handler(event))
    return this
  }
}
