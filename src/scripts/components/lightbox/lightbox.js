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
    this.$('#modal, #modal-lightbox')
      .keydown(this.navigationControls)
  }

  navigationControls = (event) => {
    if (event.key === 'Escape') this.close()
    else if (event.key === 'ArrowRight' || event.target.id === 'next') this.switchMedia('next')
    else if (event.key === 'ArrowLeft' || event.target.id === 'previous') this.switchMedia('previous')
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
    this.$('.modal-container')
      .hide()
      .setAttribute('data-focus', false)
  }

  setMedia () {
    const media = new MediaViewer(this.name, {
      src: this.selectedMedia.image ?? this.selectedMedia.video,
      title: this.selectedMedia.title,
      date: this.selectedMedia.date
    })
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
    <section id="modal-lightbox" class="lightbox" aria-label="image closeup view" tabindex="-1">
      <div class="lightbox-media">
        <a aria-label="Previous image" tabindex="0" href="#" id="previous">&lsaquo;</a>
        <div class="media-viewer">
          ${await new MediaViewer(this.name, {
            src: this.selectedMedia.image ?? this.selectedMedia.video,
            title: this.selectedMedia.title,
            date: this.selectedMedia.date
          }).render()}
          <h3 tabindex="0" aria-label="${this.selectedMedia.title}" class="title">${this.selectedMedia.title}</h3>
        </div>
        <a aria-label="Close dialog" href="#" id="close" tabindex="0">&times;</a>
        <a aria-label="Next image" href="#" id="next" tabindex="0">&rsaquo;</a>
      </div>
    </section>
  `
}
