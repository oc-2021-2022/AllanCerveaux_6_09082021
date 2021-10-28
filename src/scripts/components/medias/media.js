import stylesheet from 'bundle-text:./_media.scss'
import { MediaService } from '.'
import { Component } from '../../lib/Component'
import { FilterService } from '../filters'
import { PhotographerService } from '../photographers'
export class Media extends Component {
  styles = stylesheet
  static get observedAttributes () {
    return ['photographer-id']
  }

  constructor () {
    super()
    this.media_service = new MediaService()
    this.filter_service = new FilterService()
    this.photographer_service = new PhotographerService()
    this.tag_selected = null
    this.reversed = false
  }

  async data () {
    const photographerId = this.getAttribute('photographer-id')
    this.photographer = await this.photographer_service.getById(photographerId)
    this.media = await this.media_service.getPhotographerMedia(photographerId)
    this.likeTotal = this.media.map(media => media.likes).reduce((acc, cur) => acc + cur)
  }

  async connectedCallback () {
    this.shadow = this.attachShadow({ mode: 'closed' })
    await this.updateCardList()
    this.render()
  }

  setListener () {
    this.mediaCard = this.shadow.querySelectorAll('media-card')
    this.mediaCard.forEach(elm => elm.addEventListener('on-click-media', this.handleClick))
    this.mediaCard.forEach(elm => elm.addEventListener('update-total-like', this.updateTotalLike))

    this.tagFilter = this.shadow.querySelector('filter-component')
    this.tagFilter.addEventListener('selected-tag', ({ detail }) => this.updateFilterValue(detail.tag))
  }

  async updateFilterValue (tag) {
    if (this.tag_selected !== tag) {
      this.reversed = false
    } else {
      this.reversed = !this.reversed
    }
    this.tag_selected = tag
    //@TODO: not good solution but work for moment
    this.shadow.querySelector('.cards').innerHTML = await this.updateCardList(tag)
    this.setListener()
  }

  async updateCardList (filter = '') {
    const filterMedia = await this.media_service.filterOption(filter, this.media, this.reversed)
    let cardList = ``
    filterMedia.forEach(media => {
      cardList += /* html */`<media-card media='${JSON.stringify(media)}'></media-card>`
    })
    return cardList
  }

  updateTotalLike = () => {
    const elm = this.shadow.querySelector('div.information>div.likes>span.like-total')
    const total = parseInt(elm.textContent)
    elm.textContent = total + 1
  }

  handleClick = async (event) => {
    const openLightboxEvent = new CustomEvent('toggle-lightbox', { bubbles: true, detail: { id: event.target.media.id, media: this.media } })
    this.dispatchEvent(openLightboxEvent)
  }

  async render () {
    this.shadow.innerHTML = /* html */`
      <section>
        <div class="filter">
          <span>Trier par</span> <filter-component type="select" filter_data='${JSON.stringify(['popularity', 'date', 'title'])}'></filter-component>
        </div>
        <div class="cards">
          ${await this.updateCardList()}
        </div>
        <div class="information">
          <div class="likes">
            <span class="like-total">${this.likeTotal}</span>
            <span class="heart-icon">&#x2764;</span>
          </div>
          <span class="price">
            ${this.photographer.price} &euro; / jour
          </span>
        </div>
      </section>
    `
  }
}

customElements.define('media-component', Media)
