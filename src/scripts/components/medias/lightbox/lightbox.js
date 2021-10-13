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

  setElementEvent() {
    this.shadow.querySelector('#next').addEventListener('click', this.navigationControls)
    this.shadow.querySelector('#previous').addEventListener('click', this.navigationControls)
    this.shadow.querySelector('#close').addEventListener('click', this.close)
  }

  mediaViewer (name) {
    const photographerMedia = images[this.photographer.name.split(' ').shift()][name]
    if (photographerMedia.includes('.mp4')) {
      return /* html */`
      <video class="media" controls src="${photographerMedia}">
      </video>
      `
    }
    return /* html */`<img class="media" src="${photographerMedia}" alt=""/>`
  }

  navigationControls = ({ target }) => {
    const currentMedia = this.media.indexOf(this.selectedMedia)
    let selectedControlToSwitchMedia = target.id === 'next' ? currentMedia + 1 : currentMedia - 1
    if (selectedControlToSwitchMedia < 0) {
      selectedControlToSwitchMedia = this.media.length - 1
    } else if (selectedControlToSwitchMedia > this.media.length - 1) {
      selectedControlToSwitchMedia = 0
    }
    const newMedia = this.media[selectedControlToSwitchMedia]
    this.selectedMedia = newMedia
    this.render()
  }

  close = () => {
    this.remove()
  }

  render () {
    this.shadow.innerHTML = /* html */`
      <section class="lightbox">
        <div class="lightbox-media">
          <a href="#" id="previous">&lsaquo;</a>
          ${this.mediaViewer(this.selectedMedia.image ?? this.selectedMedia.video)}
          <a href="#" id="close">&times;</a>
          <a href="#" id="next">&rsaquo;</a>
        </div>
        <h3 class="title">${this.selectedMedia.title}</h3>
      </section>
    `
    this.setStyles()
    this.setElementEvent()
  }
}

customElements.define('lightbox-component', Lightbox)
