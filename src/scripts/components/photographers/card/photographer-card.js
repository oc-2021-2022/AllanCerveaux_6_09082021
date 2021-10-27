import stylesheet from 'bundle-text:./_photographer_card.scss'
import * as portraits from 'url:../../../../resources/images/portraits/*.jpg'
import { Component } from '../../../lib/Component'

export class PhotographerCard extends Component {
  styles = stylesheet
  static get observedAttributes () {
    return ['photographer']
  }

  setEvents () {
    this.shadow.querySelector('filter-component')
      .addEventListener('selected-tag', (event) => this.dispatchEvent(new CustomEvent('selected-tag', { detail: event.detail })))
  }

  render () {
    const photographer = JSON.parse(this.photographer)
    this.shadow.innerHTML = /* html */`
      <article class="card" tabindex="1" aria-label="Photographer Card">
        <div class="card-header">
          <a href="/photographer/${photographer.id}/" aria-label="${photographer.name}" tabindex="2">
            <img class="card-image rounded" src="${portraits[photographer.portrait.replace('.jpg', '')]}" alt=""/>
            <h3 class="title text-lg">
              ${photographer.name}
            </h3>
          </a>
        </div>
        <div class="card-content">
          <span class="city" tabindex="3">${photographer.city}, ${photographer.country}</span>
          <p class="tagline" tabindex="4">${photographer.tagline.replace('&', "'")}</p>
          <span class="price" tabindex="5">${photographer.price}&euro;/jour</span>
        </div>
        <div class="card-footer" tabindex="7">
          <filter-component type="tag" filter_data='${JSON.stringify(photographer.tags)}'></filter-component>
        <div>
      </article>
    `
  }
}

customElements.define('photographer-card', PhotographerCard)
