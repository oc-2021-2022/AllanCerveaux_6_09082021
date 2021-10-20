import stylesheet from 'bundle-text:./_media-card.scss'
import * as images from 'url:../../../../resources/images/**/*'
import { Component } from '../../../lib/Component'
import { PhotographerService } from '../../photographers'
import '../media-like/media-like'
export class MediaCard extends Component {
  styles = stylesheet
  static get observedAttribute () {
    return ['media']
  }

  constructor () {
    super()
    this.photographer_service = new PhotographerService()
  }

  async data () {
    this.media = JSON.parse(this.getAttribute('media'))
    this.photographer = await this.photographer_service.getById(this.media.photographerId)
  }

  setEvents () {
    const likes = this.shadow.querySelectorAll('media-like')
    likes.forEach(like => like.addEventListener('on-like', ({ target, detail }) => {
      const likes = parseInt(target.getAttribute('likes'))
      target.setAttribute('liked', detail)
      target.setAttribute('likes', likes + 1)
    }))

    this.shadow.querySelector('.card-header').addEventListener('click', () => this.dispatchEvent(new CustomEvent('on-click-media', {})))
  }

  mediaViewer (name) {
    const photographerMedia = images[this.photographer.name.split(' ').shift()][name]
    if (photographerMedia.includes('.mp4')) {
      return /* html */`
        <video src="${photographerMedia}">
        </video>
      `
    }
    return /* html */`<img src="${photographerMedia}" alt=""/>`
  }

  render () {
    this.shadow.innerHTML = /* html */`
      <article class="card">
        <div class="card-header">
          ${this.mediaViewer(this.media.image ?? this.media.video)}
        </div>
        <div class="card-content">
          <h3 class="title">${this.media.title}</h3>
          <media-like likes="${this.media.likes}"></media-like>
        </div>
      </article>
    `
  }
}

customElements.define('media-card', MediaCard)
