
export class PhotographerCard extends HTMLElement {
  static get observedAttributes () {
    return []
  }

  constructor (data) {
    super()
  }

  attributeChangedCallback () {

  }

  async connectedCallback () {
    this.shadow = this.attachShadow({ mode: 'closed' })
  }

  render () {
    return /* html */`
      <article></article>
    `
  }
}

customElements.define('photographer-card', PhotographerCard)
