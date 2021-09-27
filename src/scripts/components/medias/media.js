import styles from 'bundle-text:./_media.scss'
import { MediaService } from '.'

export class Media extends HTMLElement {
  static get observedAttributes () {
    return ['photographer-id']
  }

  constructor () {
    super()
    this.media_service = new MediaService()
  }

  async connectedCallback () {
    this.shadow = this.attachShadow({ mode: 'closed' })
    const photographerId = this.getAttribute('photographer-id')
    this.media = await this.media_service.getPhotographerMedia(photographerId)
    console.log(this.media)
    this.render()

    const style = document.createElement('style')
    style.type = 'text/css'
    style.appendChild(document.createTextNode(styles))
    this.shadow.prepend(style)
  }

  render () {
    this.shadow.innerHTML = /* html */`
      <div class="filter">
        <span>Trier par</span> <tag-filter type="select" filter_data='${JSON.stringify(['popularity', 'date', 'title'])}'><tag-filter>
      </div>
      <p>Medias<p>
    `
  }
}

customElements.define('media-component', Media)
