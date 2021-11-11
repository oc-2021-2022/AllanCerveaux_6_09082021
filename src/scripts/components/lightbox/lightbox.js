import Plyr from 'plyr'
import { Component } from '../../lib'
import { MediaViewer } from '../medias/media-viewer'

export class Lightbox extends Component {
  constructor (id, name, media) {
    super()
    this.id = id
    this.media = media
    this.name = name
    this.selectedMedia = media.find(({ id }) => id === parseInt(this.id))
  }

  navigationEvent () {
    this.$('#next').click(this.navigationControls)
    this.$('#previous').click(this.navigationControls)
    this.$('.lightbox')
      .keydown(this.navigationControls)
  }

  navigationControls = (event) => {
    document.querySelector('.lightbox').focus()
    if (event.key === 'ArrowRight' || event.target.id === 'next') this.switchMedia('next')
    else if (event.key === 'ArrowLeft' || event.target.id === 'previous') this.switchMedia('previous')
    else if (event.key === 'Escape') this.close()
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
    this.$('.media-viewer>img, .media-viewer>.plyr').remove()
    this.setMedia()
  }

  onClose = () => {
    this.$('#close').click(({ target }) => {
      if ((target.className !== 'media' && target.id !== 'previous' && target.id !== 'next') || target.id === 'close') {
        this.close()
      }
    })
  }

  close = () => {
    this.$('.lightbox').remove()
    this.$('.modal-container').hide()
  }

  async setMedia () {
    const media = new MediaViewer(this.name, this.selectedMedia.image ?? this.selectedMedia.video)
    media.render().then(template => {
      this.$('.media-viewer').append(template)
      this.setPlayer()
    })
    this.$('h3').setAttribute('aria-label', this.selectedMedia.title)
    this.$('h3').text(this.selectedMedia.title)
  }

  setPlayer = () => {
    if (this.$('.media-viewer>video').element) {
      this.$('.media-viewer>video').addClass('lightbox-player')
      const player = new Plyr('.lightbox-player')
    }
  }

  template = async () => /* html */`
    <section class="lightbox" tabindex="0" aria-label="image closeup view">
      <div class="lightbox-media">
        <a tabindex="3" aria-label="Previous image" href="#" id="previous">&lsaquo;</a>
        <div class="media-viewer">
          ${await new MediaViewer(this.name, this.selectedMedia.image ?? this.selectedMedia.video).render()}
          <h3 tabindex="2" aria-label="${this.selectedMedia.title}" class="title">${this.selectedMedia.title}</h3>
        </div>
        <a aria-label="Close dialog" href="#" id="close">&times;</a>
        <a aria-label="Next image" href="#" id="next">&rsaquo;</a>
      </div>
    </section>
  `
}
