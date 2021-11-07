import stylesheet from 'bundle-text:./_media_viewer.scss'
import * as images from 'url:../../../../resources/images/**/*'
import { Component } from '../../../../lib/Component'

export class MediaViewer extends Component {
  styles = stylesheet
  static get observedAttributes () {
    return ['media', 'photographer']
  }

  viewer () {
    const photographerMedia = images[JSON.parse(this.photographer).name.split(' ').shift()][this.media]
    if (photographerMedia.includes('.mp4')) {
      return /* html */`
      <video tabindex="1" class="media" controls src="${photographerMedia}">
      </video>
      `
    }
    return /* html */`<img tabindex="1" class="media" src="${photographerMedia}" alt=""/>`
  }

  render () {
    this.shadow.innerHTML = /* html */`${this.viewer()}`
  }
}
customElements.define('media-viewer', MediaViewer)
