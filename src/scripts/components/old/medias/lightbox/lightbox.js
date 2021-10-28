import stylesheet from 'bundle-text:./_lightbox.scss'
import { Component } from '../../../lib/Component'
import { PhotographerService } from '../../photographers'
import '../media-viewer/media-viewer'
export class Lightbox extends Component {
  styles = stylesheet
  constructor (id, media) {
    super()
    this.id = id
    this.media = media
    this.selectedMedia = this.media.find(({ id }) => id === parseInt(this.id))
    this.photographer_service = new PhotographerService()
  }

  async data () {
    this.photographer = await this.photographer_service.getById(this.selectedMedia.photographerId)
  }

  setEvents () {
    this.shadow.querySelector('.lightbox').focus()
    this.shadow.querySelector('.lightbox').addEventListener('keydown', this.navigationControls)
    this.shadow.addEventListener('click', this.close)
    this.shadow.querySelector('#next').addEventListener('click', this.navigationControls)
    this.shadow.querySelector('#previous').addEventListener('click', this.navigationControls)
    this.shadow.querySelector('#close').addEventListener('click', this.close)
  }

  removeEvents () {
    this.shadow.removeEventListener('click', this.close)
    this.shadow.querySelector('#next').removeEventListener('click', this.navigationControls)
    this.shadow.querySelector('#previous').removeEventListener('click', this.navigationControls)
    this.shadow.querySelector('#close').removeEventListener('click', this.navigationControls)
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
    this.shadow.querySelector('media-viewer').setAttribute('media', this.selectedMedia.video ?? this.selectedMedia.image)
    this.shadow.querySelector('h3').setAttribute('aria-label', this.selectedMedia.title)
    this.shadow.querySelector('h3').textContent = this.selectedMedia.title
  }

  close = (event) => {
    const { className, id } = event.target
    if ((className !== 'media' && id !== 'previous' && id !== 'next') || id === 'close') this.remove()
  }

  render () {
    this.shadow.innerHTML = /* html */`
      <section class="lightbox" tabindex="0" aria-label="image closeup view">
        <div class="lightbox-media">
          <a tabindex="3" aria-label="Previous image" href="#" id="previous">&lsaquo;</a>
          <media-viewer media="${this.selectedMedia.video ?? this.selectedMedia.image}" photographer='${JSON.stringify(this.photographer)}'></media-viewer>
          <a aria-label="Close dialog" href="#" id="close">&times;</a>
          <a aria-label="Next image" href="#" id="next">&rsaquo;</a>
        </div>
        <h3 tabindex="2" aria-label="${this.selectedMedia.title}" class="title">${this.selectedMedia.title}</h3>
      </section>
    `
  }
}

customElements.define('lightbox-component', Lightbox)
