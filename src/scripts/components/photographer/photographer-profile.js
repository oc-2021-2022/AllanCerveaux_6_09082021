import * as portraits from 'url:../../../resources/images/portraits/*.jpg'
import { Component } from '../../lib/Component'
import { Filter } from '../filter'

export class PhotographerProfile extends Component {
  constructor (photographer) {
    super()
    this.photographer = photographer
  }

  async init () {
    this.filter = await new Filter('tag', this.photographer.tags).render()
  }

  onClick () {
    this.$('#contact').click(() => document.dispatchEvent(new CustomEvent('open-modal', { detail: { type: 'contact', data: { name: this.photographer.name } } })))
  }

  template = () => /* html */`
    <div class="profile-info">
      <h1 class="name" tabindex="0">${this.photographer.name}</h1>
      <h2 class="city" tabindex="0">${this.photographer.city}, ${this.photographer.country}</h2>
      <p class="tagline" tabindex="0">${this.photographer.tagline}</p>
      ${this.filter}
    </div>
    <button class="button" id="contact">Contactez-moi</button>
    <img src="${portraits[this.photographer.portrait.replace('.jpg', '')]}" class="profile-avatar" alt="${this.photographer.name}" tabindex="0" />
  `
}
