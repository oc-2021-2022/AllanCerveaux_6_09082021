
export class PhotographerCard extends HTMLElement {
  static get observedAttributes () {
    return ['photographer']
  }

  constructor (data) {
    super()
    this.image_path = './static/images'
  }

  connectedCallback () {
    this.shadow = this.attachShadow({ mode: 'closed' })
    this.photographer = JSON.parse(this.getAttribute('photographer'))
    this.render()
  }

  render () {
    this.shadow.innerHTML = /* html */`
      <article class="card">
        <div class="card-header">
          <img src="${this.image_path}/portraits/${this.photographer.portrait}" width="250"/>
          <h3>${this.photographer.name}</h3>
        </div>
        <div class="card-content">
          <span>${this.photographer.city}, ${this.photographer.country}</span>
          <p>${this.photographer.tagline.replace('&', "'")}</p>
          <span>${this.photographer.price}</span>
        </div>
        <div class="card-footer">
          ${this.photographer.tags.map(tag => /* html */`<span>#${tag}</span>`).join(' ')}
        <div>
      </article>
    `
  }
}

customElements.define('photographer-card', PhotographerCard)
