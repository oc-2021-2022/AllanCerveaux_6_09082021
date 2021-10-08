import styles from 'bundle-text:./_media.scss'
import { MediaService } from '.'
import { FilterService } from '../filters'
export class Media extends HTMLElement {
  static get observedAttributes () {
    return ['photographer-id']
  }

  constructor () {
    super()
    this.media_service = new MediaService()
    this.filter_service = new FilterService()
    this.tag_selected = null
    this.reversed = false
  }

  async connectedCallback () {
    this.shadow = this.attachShadow({ mode: 'closed' })

    const photographerId = this.getAttribute('photographer-id')
    this.media = await this.media_service.getPhotographerMedia(photographerId)

    await this.updateCardList()

    this.render()
  }

  setStyle () {
    const style = document.createElement('style')
    style.type = 'text/css'
    style.appendChild(document.createTextNode(styles))
    this.shadow.prepend(style)
  }

  setElementEvent () {
    this.mediaCard = this.shadow.querySelectorAll('media-card')
    this.mediaCard.forEach(elm => elm.addEventListener('click', this.handleClick))

    this.tagFilter = this.shadow.querySelector('tag-filter')
    this.tagFilter.addEventListener('selected-tag', ({ detail }) => this.updateFilterValue(detail.tag))
  }

  disconnectCallback () {
    this.mediaCard.removeEventListener('click')
    this.tagFilter.removeEventListener('selected-tag', this.updateFilterValue)
  }

  async updateFilterValue (tag) {
    if (this.tag_selected !== tag) {
      this.reversed = false
    } else {
      this.reversed = !this.reversed
    }
    this.tag_selected = tag
    const filterMedia = await this.media_service.filterOption(tag, this.media, this.reversed)
    this.updateCardList(filterMedia)
  }

  async updateCardList (filter = this.media) {
    this.cardList = ``
    filter.forEach(media => {
      this.cardList += /* html */`<media-card media='${JSON.stringify(media)}'></media-card>`
    })
    this.render()
  }

  handleClick = (event) => {
    const openLightboxEvent = new CustomEvent('toggle-lightbox', { bubbles: true, detail: { id: event.target.media.id, media: this.media } })
    this.dispatchEvent(openLightboxEvent)
  }

  render () {
    this.shadow.innerHTML = /* html */`
      <section>
        <div class="filter">
          <span>Trier par</span> <tag-filter type="select" filter_data='${JSON.stringify(['popularity', 'date', 'title'])}'><tag-filter>
        </div>
        <div class="cards">
          ${this.cardList}
        </div>
      </section>
    `
    this.setStyle()
    this.setElementEvent()
  }
}

customElements.define('media-component', Media)
