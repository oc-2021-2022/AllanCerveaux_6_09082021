import * as images from 'url:../../../resources/images/**/*'
import { Component } from '../../lib'

export class MediaViewer extends Component {
  constructor (photographer, media) {
    super()
    this.media = media
    this.photographer = photographer
    this.mediaSelector()
  }

  mediaSelector () {
    const currentMedia = images[this.photographer.split(' ').shift()][this.media.src]
    if (this.media.src.includes('.mp4')) {
      return /* html */`<video id="player" src="${currentMedia}" alt="${this.photographer} - ${this.media.title} ${this.media.date}" tabindex="0">
      </video>`
    }
    return /* html */`<img src="${currentMedia}" alt="${this.photographer} - ${this.media.title} ${this.media.date}" width="250" tabindex="0"/>`
  }

  template = () => /* html */`${this.mediaSelector()}`
}
