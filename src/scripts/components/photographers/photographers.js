export class Photographers extends HTMLElement {
  static get observedAttributes () {
    return []
  }

  constructor (data) {
    super()
  }

  attributeChangedCallback (attrName, oldValue, newValue) {
    if (oldValue !== newValue) {
      this[attrName] = newValue
    }
  }

  async connectedCallback () {
    this.shadow = this.attachShadow({ mode: 'closed' })
  }

  render () {
    return /* html */`
      <section></section>
    `
  }
}

customElements.define('photographer-component', Photographers)
