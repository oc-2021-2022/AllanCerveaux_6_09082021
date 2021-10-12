import styles from 'bundle-text:./_photographer-profile.scss'
import * as portraits from 'url:../../../../resources/images/portraits/*.jpg'
import { Contact, PhotographerService } from '..'
import { Lightbox } from '../../medias'
export class PhotographerProfile extends HTMLElement {
  constructor () {
    super()
    this.id = parseInt(window.location.pathname.match(/\d+/g))
    this.photographer_service = new PhotographerService()
  }

  async connectedCallback () {
    this.shadow = this.attachShadow({ mode: 'closed' })
    this.photographer = await this.photographer_service.getById(this.id)
    this.render()

    this.mediaComponent = this.shadow.querySelector('media-component')
    this.mediaComponent.addEventListener('toggle-lightbox', (event) => this.displayLightbox(event.detail.id, event.detail.media))

    this.contact = this.shadow.querySelector('#contact')
    this.contact.addEventListener('click', this.displayContact)

    const style = document.createElement('style')
    style.type = 'text/css'
    style.appendChild(document.createTextNode(styles))
    this.shadow.prepend(style)
  }

  disconnectCallback () {
    this.mediaComponent.removeEventListener('toggle-ligthbox')
    this.contact.removeEventListener('click')
  }

  displayContact = () => {
    const contact = new Contact(this.photographer.name)
    this.shadow.prepend(contact)
  }

  displayLightbox (id, media) {
    const lightbox = new Lightbox(id, media)
    if (!this.shadow.querySelector('lightbox-component')) {
      this.shadow.prepend(lightbox)
    }
  }

  render () {
    this.shadow.innerHTML = /* html */`
      <section class="profile">
        <div class="profile-info">
          <h1 class="name">${this.photographer.name}</h1>
          <h2 class="city">${this.photographer.city}, ${this.photographer.country}</h2>
          <p class="tagline">${this.photographer.tagline}</p>
          <tag-filter type="tag" filter_data='${JSON.stringify(this.photographer.tags)}'></tag-filter>
        </div>
        <button class="button" id="contact">Contactez-moi</button>
        <img src="${portraits[this.photographer.portrait.replace('.jpg', '')]}" alt="" width="250"/>
      </section>
      <media-component photographer-id="${this.photographer.id}"></media-component>
    `
  }
}
customElements.define('photographer-profile', PhotographerProfile)
