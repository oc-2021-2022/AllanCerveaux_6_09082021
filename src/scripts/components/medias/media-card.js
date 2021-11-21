import { Component } from '../../lib'
import { MediaViewer } from './media-viewer'

export class MediaCard extends Component {
  constructor (name, media) {
    super()
    this.media = media
    this.name = name
  }

  onLiked () {
    this.$('.like-icon')
      .on('click', this.like)
      .on('keydown', (event) => {
        if (event.keyCode === 32 || event.key === 'Enter') this.like(event)
      })
  }

  like = ({ target }) => {
    const parent = this.$(target).parent()
    if (!this.$(parent).hasAttribute('data-liked')) {
      this.$(parent).setAttribute('data-liked', true)

      const counter = this.$(target.previousElementSibling)
      const like = parseInt(counter.element.textContent)
      counter.html(like + 1)

      this.$('.like-total').text(parseInt(this.$('.like-total').element.textContent) + 1)

      this.$(target).addClass('liked')
    }
  }

  openModal () {
    this.$('.media-header>img, .media-header>video')
      .on('click', ({ target }) => this.eventDispatch(target))
      .on('keydown', ({ keyCode, key, target }) => {
        if (keyCode === 32 || key === 'Enter') {
          this.eventDispatch(target)
        }
      })
  }

  eventDispatch (target) {
    document.dispatchEvent(new CustomEvent('open-modal', {
      detail: {
        data: {
          id: this.$(target).parent().getAttribute('data-id'),
          name: this.name
        },
        type: 'lightbox'
      }
    }))
  }

  template = async () => /* html */`
  <article class="media" tabindex="0">
    <div class="media-header" data-id="${this.media.id}">
      ${await new MediaViewer(this.name, {
        src: this.media.image ?? this.media.video,
        title: this.media.title,
        date: this.media.date
      }).render()}
    </div>
    <div class="media-content" role="banner">
      <h3 class="title" tabindex="0">${this.media.title}</h3>
      <div class="like">
        <span class="like-counter" tabindex="0">${this.media.likes}</span>
        <span class="like-icon" tabindex="0" aria-checked="false">&#x2764;</span>
      </div>
    </div>
  </article>
  `
}
