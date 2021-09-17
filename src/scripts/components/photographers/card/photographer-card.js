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
      <article class="card">
        <div class="card-header">
          <a href="#">
            <img class="card-image rounded" src="${portraits[this.photographer.portrait.replace('.jpg', '')]}" alt=""/>
          </a>
          <h3 class="title text-lg">
            <a href="#">${this.photographer.name}</a>
          </h3>
        </div>
        <div class="card-content">
          <span class="city">${this.photographer.city}, ${this.photographer.country}</span>
          <p class="tagline">${this.photographer.tagline.replace('&', "'")}</p>
          <span class="price">${this.photographer.price}&euro;/jour</span>
        </div>
        <div class="card-footer">
          ${this.photographer.tags.map(tag => /* html */`<span class="tags">#${tag}</span>`).join(' ')}
        <div>
      </article>
    `
  }
}

customElements.define('photographer-card', PhotographerCard)
