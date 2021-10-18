export class Component extends HTMLElement {
  styles = ''
  shadow = this.attachShadow({ mode: 'closed' })

  connectedCallback () {
    if (!this.rendered) {
      this.render()
      this.setEvents()
      this.setStyle()
      this.rendered = true
    }
  }

  attributeChangedCallback (name, oldValue, newValue) {
    if (oldValue !== newValue) this[name] = newValue
    this.render()
    this.setEvents()
    this.setStyle()
  }

  disconnectCallback () {
    this.removeEvents()
  }

  setStyle () {
    const style = document.createElement('style')
    style.type = 'text/css'
    style.appendChild(document.createTextNode(this.styles))
    this.shadow.prepend(style)
  }

  removeEvents () { }
  setEvents () { }
}
