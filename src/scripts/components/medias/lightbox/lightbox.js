import styles from 'bundle-text:./_lightbox.scss'
import * as images from 'url:../../../../resources/images/**/*'
import { PhotographerService } from '../../photographers'

export class Lightbox extends HTMLElement {
  constructor (id, media) {
    super()
    this.id = id
    this.media = media
    this.selectedMedia = this.media.find(({ id }) => id === parseInt(this.id))
    this.photographer_service = new PhotographerService()
  }

  async connectedCallback () {
    this.shadow = this.attachShadow({ mode: 'closed' })
    this.photographer = await this.photographer_service.getById(this.selectedMedia.photographerId)
    this.render()
  }

  disconnectCallback () {
    this.shadow.removeEventListener('click')
    this.shadow.querySelector('#next').removeEventListener('click')
    this.shadow.querySelector('#previous').removeEventListener('click')
    this.shadow.querySelector('#close').removeEventListener('click')
  }

  setStyles () {
    const style = document.createElement('style')
    style.type = 'text/css'
    style.appendChild(document.createTextNode(styles))
    this.shadow.prepend(style)
  }

  setElementEvent () {
    this.shadow.querySelector('.lightbox').focus()
    this.shadow.querySelector('.lightbox').addEventListener('keydown', this.navigationControls)
    this.shadow.addEventListener('click', this.close)
    this.shadow.querySelector('#next').addEventListener('click', this.navigationControls)
    this.shadow.querySelector('#previous').addEventListener('click', this.navigationControls)
    this.shadow.querySelector('#close').addEventListener('click', this.close)
  }

  navigationControls = (event) => {
    if (event.key === 'ArrowRight' || event.target.id === 'next') this.switchMedia('next')
    else if (event.key === 'ArrowLeft' || event.target.id === 'previous') this.switchMedia('previous')
    else if (event.key === 'Escape') this.remove()
  }

  switchMedia = (payload) => {
    const currentMedia = this.media.indexOf(this.selectedMedia)
    let selectedControlToSwitchMedia = payload === 'next' ? currentMedia + 1 : currentMedia - 1
    if (selectedControlToSwitchMedia < 0) {
      selectedControlToSwitchMedia = this.media.length - 1
    } else if (selectedControlToSwitchMedia > this.media.length - 1) {
      selectedControlToSwitchMedia = 0
    }
    const newMedia = this.media[selectedControlToSwitchMedia]
    this.selectedMedia = newMedia
    this.render()
  }

  close = (event) => {
    const { className, id } = event.target
    if ((className !== 'media' && id !== 'previous' && id !== 'next') || id === 'close') this.remove()
  }

  mediaViewer (name) {
    const photographerMedia = images[this.photographer.name.split(' ').shift()][name]
    if (photographerMedia.includes('.mp4')) {
      return /* html */`
      <video tabindex="1" class="media" controls src="${photographerMedia}">
      </video>
      `
    }
    return /* html */`<img tabindex="1" class="media" src="${photographerMedia}" alt=""/>`
  }

  render () {
    this.shadow.innerHTML = /* html */`
      <section class="lightbox" tabindex="0" aria-label="image closeup view">
        <div class="lightbox-media">
          <a tabindex="3" aria-label="Previous image" href="#" id="previous">&lsaquo;</a>
          ${this.mediaViewer(this.selectedMedia.image ?? this.selectedMedia.video)}
          <a aria-label="Close dialog" href="#" id="close">&times;</a>
          <a aria-label="Next image" href="#" id="next">&rsaquo;</a>
        </div>
        <h3 tabindex="2" aria-label="${this.selectedMedia.title}" class="title">${this.selectedMedia.title}</h3>
      </section>
    `
    this.setStyles()
    this.setElementEvent()
  }
}

customElements.define('lightbox-component', Lightbox)
