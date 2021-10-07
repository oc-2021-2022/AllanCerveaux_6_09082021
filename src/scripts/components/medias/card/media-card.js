import styles from 'bundle-text:./_media-card.scss'
import * as images from 'url:../../../../resources/images/**/*'
import { PhotographerService } from '../../photographers'

export class MediaCard extends HTMLElement {
  static get observedAttributes () {
    return ['media']
  }

  constructor () {
    super()
    this.photographer_service = new PhotographerService()
  }

  async connectedCallback () {
    this.shadow = this.attachShadow({ mode: 'closed' })
    this.media = JSON.parse(this.getAttribute('media'))
    this.photographer = await this.photographer_service.getById(this.media.photographerId)
    this.render()
    const style = document.createElement('style')
    style.type = 'text/css'
    style.appendChild(document.createTextNode(styles))
    this.shadow.prepend(style)
  }

  mediaViewer (name) {
    const photographerMedia = images[this.photographer.name.split(' ').shift()][name]
    if (photographerMedia.includes('.mp4')) {
      return /* html */`
        <video src="${photographerMedia}" width="250">
        </video>
      `
    }
    return /* html */`<img src="${photographerMedia}" alt="" width="250"/>`
  }

  render () {
    this.shadow.innerHTML = /* html */`
      <article>
        ${this.mediaViewer(this.media.image ?? this.media.video)}
        <h3>${this.media.title} - ${this.media.date}</h3>
        <span>${this.media.likes} <i class="fas fa-heart"></i></span>
      </article>
    `
  }
}

customElements.define('media-card', MediaCard)
