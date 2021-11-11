import * as portraits from 'url:../../../resources/images/portraits/*.jpg'
import { Component } from '../../lib/Component'
import { Filter } from '../shared/filter/filter-component'

export class PhotographerCard extends Component {
  constructor (photographer) {
    super()
    this.photographer = photographer
  }

  async init () {
    this.filter = await new Filter('tag', this.photographer.tags).render()
  }

  template = () => /* html */`
    <article class="card" aria-label="Photographer Card" data-tags="${this.photographer.tags}">
      <div class="card-header" role="banner">
        <a href="#" data-id="${this.photographer.id}" aria-label="${this.photographer.name}" >
          <img class="card-image rounded" src="${portraits[this.photographer.portrait.replace('.jpg', '')]}" alt=""/>
          <h2 class="title text-lg">
            ${this.photographer.name}
          </h2>
        </a>
      </div>
      <div class="card-content">
        <span class="city" >${this.photographer.city}, ${this.photographer.country}</span>
        <p class="tagline" >${this.photographer.tagline.replace('&', "'")}</p>
        <span class="price" >${this.photographer.price}&euro;/jour</span>
      </div>
      <div class="card-footer" >
        ${this.filter}
      <div>
    </article>
  `
}
