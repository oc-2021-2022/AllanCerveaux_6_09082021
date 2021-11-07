import { Component } from '../../lib'
import { MediaViewer } from './media-viewer'

export class MediaCard extends Component {
  constructor (name, media) {
    super()
    this.media = media
    this.name = name
  }

  template = async () => /* html */`
  <article class="media">
    <div class="media-header">
      ${await new MediaViewer(this.name, this.media.image ?? this.media.video).render()}
    </div>
    <div class="media-content">
      <h3 class="title">${this.media.title}</h3>
      <div class="like">
        ${this.media.likes}
        <span>&#x2764;</span>
      </div>
    </div>
  </article>
  `
}
