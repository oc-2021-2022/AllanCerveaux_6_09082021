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

    const style = document.createElement('style')
    style.type = 'text/css'
    style.appendChild(document.createTextNode(styles))
    this.shadow.prepend(style)
  }

  disconnectCallback () {
    this.shadow.querySelector('#next').removeEventListener('click')
    this.shadow.querySelector('#previous').removeEventListener('click')
    this.shadow.querySelector('#close').removeEventListener('click')
  }

  setElementEvent () {
    this.shadow.querySelector('#next').addEventListener('click', this.navigationControls)
    this.shadow.querySelector('#previous').addEventListener('click', this.navigationControls)
    this.shadow.querySelector('#close').addEventListener('click', this.close)
  }

  mediaViewer (name) {
    const photographerMedia = images[this.photographer.name.split(' ').shift()][name]
    if (photographerMedia.includes('.mp4')) {
      return /* html */`
      <video controls src="${photographerMedia}" width="250">
      </video>
      `
    }
    return /* html */`<img src="${photographerMedia}" alt="" width="250"/>`
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
      <section>
        <button id="close">Close</button>
        ${this.mediaViewer(this.selectedMedia.image ?? this.selectedMedia.video)}
        <h3>${this.selectedMedia.title}</h3>
        <button id="previous">previous</button>
        <button id="next">next</button>
      </section>
    `
    this.setElementEvent()
  }
}

customElements.define('lightbox-component', Lightbox)
