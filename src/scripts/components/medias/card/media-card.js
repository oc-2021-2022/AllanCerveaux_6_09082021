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
  }

  setElementEvent () {
    const likes = this.shadow.querySelectorAll('.like')
    likes.forEach(like => like.addEventListener('click', this.addLike))
  }

  setStyle () {
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

  addLike = (event) => {
    if (!this.media.liked) this.media.likes += 1
    this.media.liked = true
    this.render()
  }

  render () {
    this.shadow.innerHTML = /* html */`
      <article class="card">
        <div class="card-header">
          ${this.mediaViewer(this.media.image ?? this.media.video)}
        </div>
        <div class="card-content">
          <h3 class="title">${this.media.title}</h3>
          <div class="like">${this.media.likes} <i class="fas fa-heart"></i></div>
        </div>
      </article>
    `
    this.setElementEvent()
    this.setStyle()
  }
}

customElements.define('media-card', MediaCard)
