import styles from 'bundle-text:./_photographer_card.scss'
import * as portraits from 'url:../../../../resources/images/portraits/*.jpg'

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

    const style = document.createElement('style')
    style.type = 'text/css'
    style.appendChild(document.createTextNode(styles))
    this.shadow.prepend(style)
  }

  render () {
    this.shadow.innerHTML = /* html */`
      <article class="card" tabindex="1" aria-label="Photographer Card">
        <div class="card-header">
          <a href="/photographer/${this.photographer.id}/" aria-label="${this.photographer.name}" tabindex="2">
            <img class="card-image rounded" src="${portraits[this.photographer.portrait.replace('.jpg', '')]}" alt=""/>
            <h3 class="title text-lg">
              ${this.photographer.name}
            </h3>
          </a>
        </div>
        <div class="card-content">
          <span class="city" tabindex="3">${this.photographer.city}, ${this.photographer.country}</span>
          <p class="tagline" tabindex="4">${this.photographer.tagline.replace('&', "'")}</p>
          <span class="price" tabindex="5">${this.photographer.price}&euro;/jour</span>
        </div>
        <div class="card-footer" tabindex="7">
          <tag-filter type="tag" filter_data='${JSON.stringify(this.photographer.tags)}'></tag-filter>
        <div>
      </article>
    `
  }
}

customElements.define('photographer-card', PhotographerCard)
