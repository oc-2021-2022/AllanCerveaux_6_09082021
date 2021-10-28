import stylesheet from 'bundle-text:./_photographer-profile.scss'
import logo from 'url:../../../../resources/images/logo.svg'
import * as portraits from 'url:../../../../resources/images/portraits/*.jpg'
import { Contact, PhotographerService } from '..'
import { Component } from '../../../lib/Component'
import { Lightbox } from '../../medias'
export class PhotographerProfile extends Component {
  styles = stylesheet
  constructor () {
    super()
    this.id = parseInt(window.location.pathname.match(/\d+/g))
    this.photographer_service = new PhotographerService()
  }

  removeEvents () {
    this.mediaComponent.removeEventListener('toggle-ligthbox')
    this.contact.removeEventListener('click')
  }

  setEvents () {
    this.mediaComponent = this.shadow.querySelector('media-component')
    this.contact = this.shadow.querySelector('#contact')
    if (this.mediaComponent !== null && this.contact !== null) {
      this.mediaComponent.addEventListener('toggle-lightbox', (event) => this.displayLightbox(event.detail.id, event.detail.media))
      this.contact.addEventListener('click', this.displayContact)
    }
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

  async render () {
    this.photographer = await this.photographer_service.getById(this.id)
    this.shadow.innerHTML = /* html */`
      <nav>
        <a href="/"> 
          <img src="${logo}" alt="Fisheye Home page"/>
        </a>
      </nav>
      <section class="profile">
        <div class="profile-info">
          <h1 class="name">${this.photographer.name}</h1>
          <h2 class="city">${this.photographer.city}, ${this.photographer.country}</h2>
          <p class="tagline">${this.photographer.tagline}</p>
          <filter-component type="tag" filter_data='${JSON.stringify(this.photographer.tags)}'></filter-component>
        </div>
        <button class="button" id="contact">Contactez-moi</button>
        <img src="${portraits[this.photographer.portrait.replace('.jpg', '')]}" alt="" width="250"/>
      </section>
      <media-component photographer-id="${this.photographer.id}"></media-component>
    `
  }
}
customElements.define('photographer-profile', PhotographerProfile)
