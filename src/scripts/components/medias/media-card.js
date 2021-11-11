import { Component } from '../../lib'
import { MediaViewer } from './media-viewer'

export class MediaCard extends Component {
  constructor (name, media) {
    super()
    this.media = media
    this.name = name
  }

  onLiked () {
    this.$('.like-icon').on('click', ({ target }) => {
      const parent = this.$(target).parent()
      if (!this.$(parent).hasAttribute('data-liked')) {
        this.$(parent).setAttribute('data-liked', true)

        const counter = this.$(target.previousElementSibling)
        const like = parseInt(counter.element.textContent)
        counter.html(like + 1)

        this.$('.like-total').text(parseInt(this.$('.like-total').element.textContent) + 1)
      }
    })
  }

  openModal () {
    this.$('.media-header').on('click', ({ target }) => {
      console.log('click')
      document.dispatchEvent(new CustomEvent('open-modal', {
        detail: {
          data: {
            id: this.$(target).parent().getAttribute('data-id'),
            name: this.name
          },
          type: 'lightbox'
        }
      }))
    })
  }

  template = async () => /* html */`
  <article class="media" tabindex="0">
    <div class="media-header" data-id="${this.media.id}">
      ${await new MediaViewer(this.name, this.media.image ?? this.media.video).render()}
    </div>
    <div class="media-content" role="banner">
      <h3 class="title">${this.media.title}</h3>
      <div class="like">
        <span class="like-counter">${this.media.likes}</span>
        <span class="like-icon">&#x2764;</span>
      </div>
    </div>
  </article>
  `
}
