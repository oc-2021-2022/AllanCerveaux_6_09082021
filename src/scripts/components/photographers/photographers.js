import styles from 'bundle-text:./_photographer.scss'
import { FilterService } from '../filters'
export class Photographers extends HTMLElement {
  static get observedAttributes () {
    return ['photographers', 'filter']
  }

  constructor (data) {
    super()
    this.filter_service = new FilterService()
  }

  async attributeChangedCallback (attrName, oldValue, newValue) {
    if (oldValue !== newValue) {
      this[attrName] = newValue
      await this.updateCardList(this.filter)
    }
  }

  async connectedCallback () {
    this.shadow = this.attachShadow({ mode: 'closed' })
    await this.updateCardList()
    this.render()

    const style = document.createElement('style')
    style.type = 'text/css'
    style.appendChild(document.createTextNode(styles))
    this.shadow.prepend(style)
  }

  async updateCardList (filter = null) {
    const filteredPhotographers = await this.filter_service.sortByTagsName(JSON.parse(this.photographers), filter)
    this.cardList = ``
    filteredPhotographers.forEach(photographer => {
      this.cardList += /* html */`<photographer-card photographer='${JSON.stringify(photographer)}'></photographer-card>`
    })
    this.render()
  }

  render () {
    this.shadow.innerHTML = /* html */`${this.cardList}`
  }
}

customElements.define('photographer-component', Photographers)
