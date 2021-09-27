import * as portraits from 'url:../../../../resources/images/portraits/*.jpg'
import { PhotographerService } from '..'
import '../../medias'
export class PhotographerProfile extends HTMLElement {
  constructor () {
    super()
    this.id = parseInt(window.location.pathname.match(/\d+/g))
    this.photographer_service = new PhotographerService()
  }

  async connectedCallback () {
    this.shadow = this.attachShadow({ mode: 'closed' })
    this.photographer = await this.photographer_service.getById(this.id)
    console.log(this.photographer.tags)
    this.render()
  }

  render () {
    this.shadow.innerHTML = /* html */`
      <section class="profile">
        <div class="profile-info">
          <h1>${this.photographer.name}</h1>
          <h2>${this.photographer.city}, ${this.photographer.country}</h2>
          <p>${this.photographer.tagline}<p>
          <tag-filter type="tag" filter_data='${JSON.stringify(this.photographer.tags)}'></tag-filter>
        </div>
        <button>Contactez-moi</button>
        <img src="${portraits[this.photographer.portrait.replace('.jpg', '')]}" alt="" width="250"/>
      </section>
      <media-component photographer-id="${this.photographer.id}"></media-component>
    `
  }
}
customElements.define('photographer-profile', PhotographerProfile)
