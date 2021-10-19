export class Component extends HTMLElement {
  styles = ''
  shadow = this.attachShadow({ mode: 'closed' })
  data () {}

  async connectedCallback () {
    await this.data()
    await this.render()
    await this.setStyle()
    await this.setEvents()
  }

  async attributeChangedCallback (name, oldValue, newValue) {
    if (oldValue !== newValue) this[name] = newValue
    await this.data()
    await this.render()
    await this.setStyle()
    await this.setEvents()
  }

  disconnectCallback () {
    this.removeEvents()
  }

  setStyle () {
    const style = document.querySelector('style') !== null ? document.querySelector('style') : document.createElement('style')
    style.type = 'text/css'
    style.appendChild(document.createTextNode(this.styles))
    this.shadow.prepend(style)
  }

  removeEvents () { }
  setEvents () { }
}
